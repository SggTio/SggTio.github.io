---
title: "Cuatro métodos clásicos contra un tumor que realza en anillo"
description: "Segmentar el realce tumoral en resonancia con métodos clásicos, sin aprendizaje profundo, para saber exactamente dónde se rompen."
area: ciencias-computacionales
dominio: ["Imágenes médicas", "Software y señales"]
tipo: experimento
estado: terminado
anio: 2026
destacado: false
draft: false
published: true
autoria: "Trabajo de un equipo de tres personas"
nota_autoria: "El núcleo numérico de varias etapas adapta funciones del paquete propio de limpieza y segmentación; el módulo de registro y la capa de lectura de datos son aporte del resto del equipo."
math: true
tecnologias: [Python, SimpleITK, "Three.js"]

problema: |
  Segmentar automáticamente el **tumor realzante** sobre la modalidad T1c de
  una resonancia, usando solo métodos clásicos de procesamiento de imagen: sin
  aprendizaje profundo, sin red que entrenar.

  La pregunta no era ganar una competición, sino la contraria: **hasta dónde
  llegan estos métodos y dónde exactamente se rompen.**

motivacion: |
  Un método nuevo se justifica mejor enseñando dónde duele que argumentando
  elegancia. Este trabajo produce ese «aquí duele» de forma empírica y
  medida — y es la clase de resultado que hace falta antes de proponer que la
  topología o la geometría aporten algo.

contribucion: |
  Un pipeline de seis módulos sobre BraTS 2024 GLI post-tratamiento, cada uno
  con sus salidas y su informe propio:

  <section class="two-col" markdown="1">

  ### Preparar

  **Análisis exploratorio** para caracterizar geometría, intensidades y
  separabilidad del realce frente al tejido sano, y elegir los casos
  demostrativos.

  **Limpieza** de T1c: denoising, corrección de campo de sesgo y normalización
  por percentiles.

  **Registro** rígido, demostrado perturbando un volumen de forma conocida y
  midiendo si se recupera.

  ### Segmentar y ver

  **Segmentación** con cuatro métodos clásicos comparados: umbralización de
  Otsu, crecimiento de regiones, watershed y mezcla de gaussianas multimodal.

  **Visualización** en mosaicos de tres vistas centrados en la lesión.

  **Reconstrucción 3D** de las mallas, predicha frente a la verdad, con un
  visor web que funciona sin conexión.

  </section>

enfoque_matematico: |
  Cada método clásico trae su propio supuesto sobre la imagen, y el interés del
  trabajo está en ver cuál de esos supuestos falla:

  - **Otsu** supone que el histograma tiene dos modos separables. En T1c no los
    tiene: es unimodal, y ahí se acaba el método.
  - **Crecimiento de regiones** supone que la lesión es homogénea y conexa
    desde una semilla.
  - **Watershed** supone que los bordes de la lesión son crestas del gradiente.
  - **Mezcla de gaussianas** supone que las clases de tejido son gaussianas en
    el espacio de intensidades.

  El registro usa información mutua de Mattes con una transformación rígida
  Euler 3D, en esquema multi-resolución. Las mallas salen por *marching cubes*,
  y su volumen se contrasta con el del análisis exploratorio para validar que
  la escala física es correcta.

enfoque_computacional: |
  SimpleITK como motor de imagen. Los volúmenes se leen **directamente desde
  los ZIP del dataset**, extrayendo cada caso a un temporal y borrándolo
  después: nunca se descomprime el archivo completo.

  Rutas con `pathlib` ancladas a la raíz, nada codificado a mano. Cada módulo
  deja tres cosas: volúmenes, figuras sueltas y un informe HTML autocontenido
  con nombre propio.

  El visor 3D es autocontenido de verdad: sirve su librería desde una carpeta
  local, así que funciona sin internet — pensado para exponer en una sala donde
  la wifi puede fallar.

resultados: |
  **Los métodos clásicos por intensidad son insuficientes para el realce.**
  Ninguno de los cuatro alcanza un solapamiento aceptable. Las cifras están en
  el informe del proyecto; esta ficha cuenta qué se comparó y qué se aprendió.

  El patrón de fallos es más informativo que el ranking:

  - **Otsu falla por construcción**, no por mal ajuste: el histograma de T1c es
    unimodal y el método necesita dos modos.
  - **La mezcla de gaussianas sobre-segmenta.** Es la más sensible de las
    cuatro y a la vez la peor en solapamiento: encuentra el realce y también
    todo lo demás.
  - **El crecimiento de regiones es el menos malo**, y solo después de
    resolverle un problema que no es de parámetros.

  ### El detalle que lo explica todo

  En realce post-tratamiento, el tumor forma un **anillo alrededor de la
  cavidad de resección**, que es oscura. Así que el **centroide de la lesión
  cae en tejido oscuro** — y sembrar ahí el crecimiento de regiones lo
  arruinaba.

  La solución fue sembrar en el vóxel más brillante de la lesión y crecer por
  ventana de brillo. Es un cambio de una línea que reordena los resultados, y
  dice algo sobre la geometría del problema: **la forma del realce no es una
  mancha, es un anillo**, y los métodos que suponen manchas no lo ven.

limitaciones: |
  **La segmentación es semi-automática, no automática.** La verdad de campo
  aporta la ubicación de la semilla. La máscara final sale del crecimiento
  sobre la imagen, no de la etiqueta, pero la inicialización no es ciega y eso
  acota lo que el resultado puede afirmar.

  **Es un subconjunto demostrativo**, no la cohorte completa.

  **No hay adjudicación clínica** de los falsos positivos.

aprendizajes: |
  Separar el núcleo numérico en **funciones puras** fue lo que permitió
  reutilizarlo aquí. La capa de entrada y salida se reescribió entera para leer
  desde los ZIP, y aun así los algoritmos se movieron sin tocarlos.

  Es el argumento a favor de escribir la parte matemática sin que sepa de dónde
  vienen los datos.

visualizaciones:
  - id: viz-anillo-resection
    titulo: "Por qué el centroide cae en el sitio equivocado"
    seccion: resultados
    tipo: figura
    estado: pendiente
    que_muestra: |
      Corte sintético con la cavidad de resección oscura y el realce en anillo
      alrededor. Marcado el centroide, que cae dentro de la cavidad, y el vóxel
      más brillante, que cae en el anillo. Al lado, el crecimiento de regiones
      partiendo de cada uno.
    ensena: |
      El hallazgo central del proyecto, y por qué un cambio de una línea
      reordena los resultados.

  - id: viz-histograma-unimodal
    titulo: "Otsu necesita dos modos"
    seccion: enfoque_matematico
    tipo: interactiva
    estado: pendiente
    que_muestra: |
      Un histograma con un control que va de bimodal a unimodal. El umbral de
      Otsu se recalcula en vivo y se ve cómo, al fundirse los modos, el umbral
      deja de significar nada aunque el método siga devolviendo un número.
    ensena: "Que un método puede fallar por su supuesto, no por su ajuste."

  - id: viz-cuatro-metodos
    titulo: "Los cuatro métodos sobre el mismo corte"
    seccion: resultados
    tipo: interactiva
    estado: pendiente
    que_muestra: |
      Cuatro paneles sincronizados sobre un fantasma sintético con realce en
      anillo. Se ve la sobre-segmentación de la mezcla de gaussianas y el
      recorte excesivo del watershed. Demostración del algoritmo, no medición
      sobre datos reales.
    ensena: "En qué se equivoca cada uno, que es distinto de cuánto se equivoca."
---
