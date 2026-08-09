---
title: "Laplacianos en biología de tumores"
description: "Exposición sobre laplacianos, geometría y segmentación de tumores: del gradiente del cálculo vectorial a las semillas de Witten."
area: matematicas
dominio: ["Geometría espectral", "Imágenes médicas", "Divulgación"]
tipo: divulgacion
estado: terminado
anio: 2026
destacado: false
autoria: "Santiago Gil Gallego"
math: true
tecnologias: [MathJax]

resumen: |
  La charla ya está publicada:
  [Laplacianos en biología de tumores]({{ '/mates/charlas/laplacianos_tumores/' | relative_url }}).
  Esta ficha la sitúa dentro del trabajo, no la duplica.

contribucion: |
  Exposición sobre laplacianos, geometría y segmentación de tumores.

  TODO(santiago): dónde se presentó, ante qué audiencia, duración, y si hay
  diapositivas o grabación enlazables. Sin eso, esta sección se queda en una
  línea.

motivacion: |
  Conecta directamente con el
  [mapa del terreno entre topología, geometría y aplicaciones]({{ '/proyectos/paisaje-tda-dg/' | relative_url }}),
  donde el **laplaciano persistente** aparece como la dirección de mayor
  apalancamiento para la tesis, precisamente por el trabajo previo en
  topología.

  La charla es la versión divulgativa de ese hilo: por qué un operador que se
  estudia en cálculo vectorial acaba sirviendo para separar tejido.

visualizaciones:
  - id: viz-laplaciano-difusion
    titulo: "El laplaciano como difusión"
    seccion: motivacion
    tipo: animacion
    estado: pendiente
    que_muestra: |
      Un campo escalar sobre una malla, evolucionando por la ecuación del
      calor. Se ve cómo el laplaciano suaviza, y qué estructuras sobreviven más
      tiempo. Control de velocidad y de paso temporal.
    ensena: |
      Por qué un operador diferencial dice algo sobre la forma de un objeto, no
      solo sobre su valor.

  - id: viz-modos-espectrales
    titulo: "Los primeros modos del laplaciano"
    seccion: motivacion
    tipo: interactiva
    estado: pendiente
    que_muestra: |
      Las primeras funciones propias del laplaciano sobre una forma sencilla,
      seleccionables una a una. Se ve cómo los modos bajos capturan la
      geometría gruesa y los altos el detalle.
    ensena: "De dónde sale la idea de que el espectro describe la forma."
---
