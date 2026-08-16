---
title: "Tres filtros de ruido sobre volúmenes de resonancia"
description: "Implementación y comparación de tres filtros de denoising sobre volúmenes de resonancia magnética, con evaluación por nivel de ruido."
area: ciencias-computacionales
dominio: ["Imágenes médicas", "Software y señales"]
tipo: software
estado: terminado
anio: 2026
destacado: false
autoria: "Santiago Gil Gallego"
math: true
tecnologias: [Python, ITK, NumPy, SciPy]

visualizaciones:
  - id: viz-mediana
    titulo: "La mediana, vóxel a vóxel"
    seccion: enfoque_matematico
    tipo: interactiva
    estado: pendiente
    que_muestra: |
      Rejilla con ruido de sal y pimienta. Al pasar el ratón se resalta la
      vecindad, se ven sus valores ordenados y cuál gana. Control deslizante
      para el radio. Al lado, un borde recto: la mediana lo respeta, la media
      lo emborrona.
    ensena: "Por qué mediana y no promedio."

  - id: viz-wiener-varianza
    titulo: "El estimador de varianza de Wiener"
    seccion: enfoque_matematico
    tipo: interactiva
    estado: pendiente
    que_muestra: |
      Imagen sintética con zona lisa, textura y un borde. Encima, el mapa de
      varianzas locales. Un deslizador de ruido: al subirlo se ve cómo todas
      las varianzas locales suben en la misma cantidad, y cómo su promedio
      estima esa cantidad.
    ensena: |
      Es la afirmación de esta ficha, demostrada en pantalla. Hoy esa
      afirmación no es trazable a ninguna de las tres vías de CLAUDE.md §2;
      esta visualización la convierte en la opción (c), código ejecutable
      que la verifica.

  - id: viz-comparacion-filtros
    titulo: "Los tres filtros sobre un fantasma"
    seccion: resultados
    tipo: interactiva
    estado: pendiente
    que_muestra: |
      Fantasma sintético de estilo cerebral —discos concéntricos, no un corte
      real—, un deslizador de ruido, y los tres filtros aplicándose en vivo
      junto al original. El pie debe decir que es una demostración del
      algoritmo, no una medición sobre datos reales.
    ensena: "Qué le cuesta a cada filtro la reducción de ruido, en bordes y detalle."

problema: |
  El ruido en resonancia degrada todo lo que venga después. Cada filtro compra
  reducción de ruido a un precio distinto en bordes y detalle.

contribucion: |
  Implementación y comparación de tres filtros —entre ellos mediana y filtro de
  Wiener adaptativo— sobre volúmenes del dataset BrainWeb, con evaluación por
  nivel de ruido.

enfoque_matematico: |
  El filtro adaptativo de Wiener estima la varianza de ruido $\nu^2$ como el
  promedio de todas las varianzas locales del volumen.

  La justificación: en presencia de ruido, las varianzas locales están infladas
  exactamente en $\nu^2$ respecto de las del tejido limpio, así que promediar
  sobre todo el volumen da un estimador estable.

enfoque_computacional: |
  Python 3 con ITK, NumPy y SciPy. Arquitectura común a los tres filtros:
  lectura con `itk.imread()` a `itk.Image[itk.F, 3]`, conversión a array NumPy
  `(Z, Y, X)` float32, filtrado con NumPy/SciPy, reconstrucción con
  `itk.image_from_array()` copiando Spacing, Origin y Direction del volumen
  original, salida NIfTI más PNG de comparación. ITK se usa para I/O; los
  algoritmos van en NumPy/SciPy.

  La mediana se vectoriza con `numpy.lib.stride_tricks.sliding_window_view`: se
  extrae la vecindad $(2r+1)^3$ de cada vóxel, se elimina el vóxel central y se
  sustituye por la mediana de los demás. Radio 1 por defecto. Evita un bucle de
  Python sobre los millones de vóxeles que tiene un volumen T1.

resultados: |
  El trabajo produjo un informe con tablas de propiedades y de desempeño por
  nivel de ruido, contrastado con los valores de PSNR publicados en la
  literatura. Las cifras concretas viven en el informe, no aquí: esta ficha
  explica qué se comparó y por qué, no reporta mediciones.

aprendizajes: |
  Un detalle de ingeniería que merece contarse: la capa C++ de ITK no procesa
  rutas con caracteres no ASCII en Windows, y el proyecto vivía en una carpeta
  llamada «imágenes médicas». Todos los scripts copian el archivo a un
  directorio temporal con ruta ASCII, lo procesan allí y trasladan el
  resultado.

  Es el tipo de fricción que nunca aparece en los papers y que se lleva una
  tarde entera.
---
