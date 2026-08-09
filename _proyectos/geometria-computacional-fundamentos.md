---
title: "Cuadernos de geometría computacional"
description: "Triangulación de polígonos, programación lineal geométrica, grafos duales y envolventes convexas: el andamiaje que hace posible el resto."
area: ciencias-computacionales
dominio: ["Geometría computacional"]
tipo: software
estado: terminado
anio: 2026
destacado: false
autoria: "Santiago Gil Gallego"
math: true
tecnologias: ["C++", CGAL]

contribucion: |
  Trabajo de base del curso de geometría computacional: triangulación de
  polígonos, programación lineal geométrica, grafos duales en CGAL, y un
  estudio de envolventes convexas que cubre los algoritmos principales, sus
  complejidades, la cota inferior $\Omega(n \log n)$ en dos dimensiones, y cómo
  CGAL los implementa mediante clases de *traits* y *kernels*.

motivacion: |
  Es el andamiaje que hace posible la
  [reconstrucción 3D de tumores entre cortes]({{ '/proyectos/interpolacion-contornos/' | relative_url }}).
  Delaunay, Voronoi y los ejes mediales que allí se aplican se aprendieron
  aquí.

  Como proyecto público funciona mejor como **material didáctico** que como
  portafolio: no resuelve un problema propio, enseña las piezas.

proximos_pasos: |
  TODO(santiago): decidir el destino final de este material — ficha de
  proyecto, serie de notas en Escritos, o ambas cosas enlazadas.

visualizaciones:
  - id: viz-envolvente-convexa
    titulo: "Envolventes convexas, algoritmo a algoritmo"
    seccion: contribucion
    tipo: animacion
    estado: pendiente
    que_muestra: |
      Nube de puntos editable y los algoritmos principales resolviéndola paso a
      paso, seleccionables. Un contador de operaciones al lado deja ver la
      diferencia de complejidad en vivo, y por qué la cota inferior es
      $\Omega(n \log n)$.
    ensena: "Que la complejidad no es una fórmula: se puede contar mirando."

  - id: viz-triangulacion-poligono
    titulo: "Triangular un polígono"
    seccion: contribucion
    tipo: interactiva
    estado: pendiente
    que_muestra: |
      Polígono simple dibujable con el ratón, incluidos casos con concavidades.
      La triangulación se calcula en vivo y se puede recorrer el algoritmo paso
      a paso.
    ensena: "Por qué un polígono cóncavo es mucho más difícil que uno convexo."

  - id: viz-grafo-dual
    titulo: "Un grafo y su dual"
    seccion: contribucion
    tipo: interactiva
    estado: pendiente
    que_muestra: |
      Una subdivisión planar y su grafo dual superpuesto, con capas
      conmutables. Al mover un vértice se ve cómo responde el dual.
    ensena: "Qué significa dualidad, que en texto suena a definición vacía."
---
