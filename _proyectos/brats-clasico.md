---
title: "Dónde fallan los métodos clásicos en glioma post-tratamiento"
description: "Caracterizar los modos de fallo de la segmentación clásica en glioma tratado, para saber exactamente dónde duele antes de proponer métodos nuevos."
area: matematicas
dominio: ["Imágenes médicas", "Topología aplicada"]
tipo: investigacion
estado: activo
anio: 2026
destacado: true
autoria: "Santiago Gil Gallego"
math: true
tecnologias: [Python, GUDHI]

problema: |
  En glioma post-tratamiento, el realce en T1c no distingue por sí solo tumor
  residual de los efectos del tratamiento.

  Los métodos clásicos de segmentación inundan la máscara de falsos positivos,
  y no estaba caracterizado dónde exactamente fallan ni por qué.

motivacion: |
  Cada modo de fallo caracterizado es la motivación empírica de un método de la
  tesis: sirve como el «aquí duele» que justifica traer topología y geometría,
  en vez de proponerlas por elegancia.

contribucion: |
  Estudio multifase sobre BraTS-2024 GLI post-tratamiento.

  **Fase 1:** poda de métodos.

  **Fase 2:** comparación de cuatro regímenes de *priors*, homología persistente
  cúbica genuina con GUDHI, y evaluación basada en superficie.

  Sobre los resultados de la fase 2 se montó después una capa de rigor:
  unidades físicas, intervalos de confianza por bootstrap agrupado por caso,
  análisis de sensibilidad a fuga de datos, y una tabla canónica de puntos de
  operación con estados `locked`, `post_hoc` y `exploratory`.

enfoque_matematico: |
  Homología persistente $H_0$ sobre complejos cúbicos.

  Filtración por superconjuntos de nivel del campo de realce, obtenida negando
  el campo. La persistencia es la diferencia entre muerte y nacimiento.

enfoque_computacional: |
  GUDHI, `CubicalComplex` y `cc.persistence`.

  El campo de realce es la parte positiva de T1c − T1n, escalada a un percentil
  alto y recortada al intervalo unidad. Recortes enmascarados por componente.
  La clase esencial se capa en el fondo.

  Los intervalos de confianza salen de un bootstrap agrupado por paciente, no
  por componente: agrupar por caso es lo que evita que un paciente con muchos
  componentes domine el intervalo.

resultados: |
  **En revisión.** Este trabajo está redactado como artículo para SIPAIM 2026 y
  no ha sido aceptado; las cifras viven ahí y no se reproducen en esta ficha.

  Lo que sí se puede contar es el hallazgo, que es cualitativo y es lo
  interesante:

  **La polaridad estaba invertida.** Los *confounds* del tratamiento resultaron
  ser **más** persistentes que el tumor residual realzado, no menos. La
  hipótesis de partida —que el tumor residual sería lo más persistente— era
  exactamente del revés.

  Ese único hecho explica dos cosas a la vez:

  - por qué la separación con la polaridad ingenua parecía un fracaso rotundo,
    cuando en realidad era una señal fuerte leída al revés;
  - por qué el filtro de «quedarse con los $k$ componentes más persistentes» no
    reduce la inundación de falsos positivos: al quedarse con los más
    persistentes, retiene preferentemente *confounds*.

limitaciones: |
  Van con el mismo énfasis que los resultados, porque acotan lo que el trabajo
  puede afirmar.

  **Lo que se mide no es topología multiescala.** Como la clase esencial se capa
  en el fondo, la persistencia $H_0$ máxima se reduce **por construcción** a una
  prominencia de pico normalizada. Mide cuán brillante y aislado es cada
  componente, no estructura topológica multiescala. Dicho sin adornos: aquí no
  hay topología sofisticada, hay un descriptor de prominencia bien fundamentado.

  **No hay adjudicación clínica de los falsos positivos.**

  **No hay validación fuera de esta cohorte.**

  **Sobre los casos excluidos:** los casos efectivos salen de descartar unos
  pocos con tumor realzado presente cuyo componente cae bajo el piso mínimo de
  vóxeles. No es fuga de datos.

aprendizajes: |
  Un resultado que parece negativo puede ser un resultado positivo con la
  polaridad al revés.

  Y la capa de rigor —unidades físicas, intervalos de confianza, análisis de
  sensibilidad— no cambió el experimento: cambió lo que el experimento decía.

proximos_pasos: |
  Validación externa congelada.

  TODO(santiago): estado de generación de figuras y consolidación de reportes.

visualizaciones:
  - id: viz-inundacion
    titulo: "La inundación de falsos positivos"
    seccion: problema
    tipo: figura
    estado: pendiente
    que_muestra: |
      Esquema sintético de un corte con realce: tumor residual, efectos del
      tratamiento, y la máscara que produce un método clásico encima. Se ve
      cuánto de la máscara es confound. Figura didáctica, no un caso real.
    ensena: "Qué significa «inundar la máscara» y por qué T1c no basta."

  - id: viz-filtracion-cubica
    titulo: "Filtración cúbica sobre un campo de realce"
    seccion: enfoque_matematico
    tipo: animacion
    estado: pendiente
    que_muestra: |
      Campo escalar sintético en 2D. Un deslizador recorre el umbral por
      superconjuntos de nivel; se ven las componentes naciendo y fundiéndose,
      y al lado su código de barras. Se marca dónde está el nacimiento y dónde
      la muerte de cada una.
    ensena: "Qué es exactamente la persistencia que se está midiendo."

  - id: viz-polaridad
    titulo: "La polaridad invertida"
    seccion: resultados
    tipo: figura
    estado: pendiente
    que_muestra: |
      Dos distribuciones sintéticas superpuestas —residual y confound— y un
      umbral deslizante. Se ve que al asumir la polaridad ingenua la separación
      parece pésima, y que al invertirla es buena. Sin datos reales: ilustra el
      efecto, no reporta la medición.
    ensena: "Cómo un buen separador puede parecer un mal separador."

  - id: viz-prominencia
    titulo: "Prominencia de pico, no topología multiescala"
    seccion: limitaciones
    tipo: figura
    estado: pendiente
    que_muestra: |
      Un perfil 1D con varios picos. Se muestra qué mide la persistencia
      $H_0$ cuando la clase esencial se capa en el fondo: la altura de cada
      pico sobre su collado. Al lado, un caso que la topología multiescala sí
      distinguiría y este descriptor no.
    ensena: |
      Exactamente qué se está midiendo y qué no. Es la limitación central del
      trabajo, y merece verse en vez de solo leerse.
---
