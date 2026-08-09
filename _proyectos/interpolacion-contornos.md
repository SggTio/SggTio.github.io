---
title: "Reconstrucción 3D de tumores entre cortes"
description: "El tumor entre dos cortes de resonancia es una inferencia geométrica, no un dato. Tres algoritmos de interpolación comparados, y por qué interpolar la forma gana a interpolar la etiqueta."
area: ciencias-computacionales
dominio: ["Geometría computacional", "Imágenes médicas"]
tipo: software
estado: terminado
anio: 2026
destacado: true
autoria: "Proyecto de Abel Albuez Sanchez, en colaboración con Santiago Gil Gallego y Jesús Alberto"
nota_autoria: "TODO(santiago): delimitar exactamente qué parte hiciste tú, para que esta ficha lo diga sin ambigüedad."
math: true
tecnologias: ["C++", CGAL, Plotly, "reveal.js", KaTeX]
bibliografia: [raya1990]

problema: |
  Una resonancia da cortes axiales discretos. El tumor entre dos cortes es una
  **inferencia geométrica, no un dato**.

  Interpolar mal la superficie cambia el volumen estimado, que es lo que se usa
  clínicamente para decidir.

motivacion: |
  Interpolar directamente las etiquetas binarias produce artefactos de
  *morphing*. Interpolar el campo de distancia con signo funciona.

  Ese contraste es una lección geométrica limpia y visualmente demostrable: el
  mismo par de contornos, dos formas de rellenar el hueco, dos resultados que
  no se parecen.

contribucion: |
  Tres algoritmos de interpolación comparados:

  <section class="two-col" markdown="1">

  ### M1 · Lineal con correspondencia de vértices

  Se emparejan vértices entre contornos consecutivos y se interpola en línea
  recta. Es el punto de partida y el que más sufre cuando la topología del
  contorno cambia entre cortes.

  ### M2 · Series de splines cúbicos naturales

  Suaviza la transición en la dirección axial. Gana continuidad respecto de M1,
  pero sigue operando sobre la etiqueta.

  </section>

  <section class="one-col" markdown="1">

  ### M3 · Basado en forma, sobre campo de distancia con signo

  En vez de interpolar la etiqueta, interpola el campo de distancia con signo y
  extrae después el contorno. Es el que evita los artefactos de *morphing*.

  </section>

  Seguidos de reconstrucción de superficie de Poisson y una batería de
  métricas: volumen, simetría reflectiva, curvatura media discreta, y
  validación cruzada dejando fuera un corte.

enfoque_matematico: |
  Triangulación de Delaunay, diagramas de Voronoi, ejes mediales y curvatura,
  cada uno mapeado a su papel en una etapa concreta del pipeline.

  La referencia central del método basado en forma es Raya y Udupa (1990).

enfoque_computacional: |
  CGAL en C++. Datos: BraTS 2024 GLI.

  La salida es un visor 3D interactivo autocontenido en Plotly, de unos 20 MB,
  con la malla y la librería embebidas. La presentación va en reveal.js con
  KaTeX.

aprendizajes: |
  Durante la verificación del informe se detectaron **una referencia inexistente
  y una cita mal atribuida** a Bentley–Ottmann.

  Esa auditoría es parte del proyecto y merece decirse en voz alta: es
  exactamente la práctica que este sitio predica. Una bibliografía no se hereda,
  se comprueba.

visualizaciones:
  - id: viz-entre-cortes
    titulo: "Lo que hay entre dos cortes"
    seccion: problema
    tipo: interactiva
    estado: pendiente
    que_muestra: |
      Dos contornos apilados con espacio entre ellos y un deslizador que mueve
      un plano intermedio. Se ve que ahí no hay dato: hay una decisión. Un
      contador muestra cómo cambia el volumen estimado según lo que se decida.
    ensena: "Que la interpolación no es un detalle técnico: mueve el volumen."

  - id: viz-etiqueta-vs-distancia
    titulo: "Interpolar la etiqueta o interpolar la forma"
    seccion: motivacion
    tipo: interactiva
    estado: pendiente
    que_muestra: |
      El mismo par de contornos, resuelto de las dos maneras, lado a lado. A la
      izquierda los artefactos de morphing de la interpolación binaria; a la
      derecha el resultado del campo de distancia con signo. Un deslizador
      recorre la posición intermedia.
    ensena: |
      La lección central del proyecto, y la más difícil de transmitir en texto.

  - id: viz-m1-m2-m3
    titulo: "Los tres algoritmos sobre el mismo caso"
    seccion: contribucion
    tipo: interactiva
    estado: pendiente
    que_muestra: |
      Tres paneles sincronizados, uno por algoritmo, sobre el mismo par de
      contornos sintéticos. Deslizador común de posición axial.
    ensena: "En qué se diferencian de verdad, más allá del nombre."

  - id: viz-delaunay-voronoi
    titulo: "Delaunay, Voronoi y el eje medial"
    seccion: enfoque_matematico
    tipo: interactiva
    estado: pendiente
    que_muestra: |
      Nube de puntos editable con el ratón. Capas conmutables: triangulación de
      Delaunay, diagrama de Voronoi, eje medial. Se ve la dualidad entre las dos
      primeras y de dónde sale la tercera.
    ensena: "Tres objetos que se explican mucho mejor moviéndolos que leyéndolos."
---
