---
title: "Los cimientos de la inteligencia artificial"
description: "Serie de divulgación que recorre la historia y la matemática de las redes neuronales, con visualizaciones interactivas."
area: ia
dominio: ["Divulgación", "Historia de la ciencia"]
tipo: divulgacion
estado: activo
anio: 2026
destacado: false
autoria: "Santiago Gil Gallego"
tecnologias: [JavaScript, MathJax]

resumen: |
  Esta ficha es el **índice de la serie**, no el contenido. Los textos viven en
  Escritos; aquí está el plan y su estado.

contribucion: |
  **Post 01 — De la neurona lógica al MLP.** Publicado:
  [Los cimientos de la inteligencia artificial]({{ '/mates/2026-04-14-fundamentos-redes-neuronales/' | relative_url }}).

  Cuatro secciones: el contexto del siglo XIX —teoría celular, la tinción de
  plata de Golgi, la doctrina de la neurona de Cajal, la sinapsis de
  Sherrington, el Nobel compartido de 1906—; McCulloch-Pitts frente a Turing
  como predecesores del perceptrón, a dos columnas; perceptrón y MLP con
  visualizaciones interactivas que sincronizan ecuación, arquitectura y flujo
  de datos; y una sección de analogías a dos columnas para lectores no
  técnicos.

  **Post 02 — Del invierno al amanecer del deep learning.** Escrito y guardado
  en el repositorio, **todavía sin publicar**. Cubre los dos inviernos de la
  IA, el redescubrimiento de backpropagation, las primeras CNN y RNN, y la
  convergencia de datos, GPU y algoritmos hasta 2010.

  Le faltan tres visualizaciones: explorador de backpropagation, convolución
  paso a paso, y el gráfico de convergencia de 2012. Sus bloques ya están en el
  texto, marcados como pendientes.

enfoque_computacional: |
  Decisiones de diseño de la serie:

  - Visualizaciones en HTML, CSS y JavaScript, sin dependencias pesadas.
  - MathJax para las fórmulas.
  - *Mobile-first*: las secciones a dos columnas se apilan en pantalla estrecha.
  - Texto alternativo en las visualizaciones y controles accesibles por teclado.

proximos_pasos: |
  Publicar el post 02, una vez estén sus tres visualizaciones.

  Post 03, comenzando en AlexNet.

  TODO(santiago): decidir si la serie continúa hacia el territorio de la tesis.

visualizaciones:
  - id: viz-backprop-explorer
    titulo: "Explorador de backpropagation"
    seccion: contribucion
    tipo: interactiva
    estado: pendiente
    que_muestra: |
      Red configurable donde se elige arquitectura y conjunto de datos, y se
      avanza paso a paso: hacia delante, hacia atrás, actualización. Cada paso
      resalta qué se está calculando en la ecuación y en el diagrama a la vez.
      Es el bloque `viz-backprop` que ya existe vacío en el post 02.
    ensena: "Qué hace realmente backpropagation, en vez de citar la regla de la cadena."

  - id: viz-convolucion
    titulo: "Convolución, píxel a píxel"
    seccion: contribucion
    tipo: interactiva
    estado: pendiente
    que_muestra: |
      Una imagen pequeña, un filtro 3×3 y la salida calculándose en tiempo
      real, con la ventana desplazándose. Filtros preparados de un clic:
      detector de bordes, desenfoque, realce. Es el bloque `viz-convolution`
      del post 02.
    ensena: "Qué es una convolución antes de que aparezca la palabra «CNN»."

  - id: viz-convergencia-2012
    titulo: "La convergencia de 2012"
    seccion: contribucion
    tipo: figura
    estado: pendiente
    que_muestra: |
      Tres curvas en el tiempo —tamaño de los conjuntos de datos, cómputo
      disponible por dólar, y publicaciones sobre aprendizaje profundo— con el
      cruce de 2012 marcado. Es el bloque `viz-convergence` del post 02.
    ensena: |
      Que en 2012 no hizo falta ninguna idea nueva: lo que cambió fueron los
      otros dos lados del triángulo.
---
