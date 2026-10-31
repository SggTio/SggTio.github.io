# SobreMi

Plantilla de Sobre mí: voz de lectura con acento `crema`, una introducción corta en Literata con el retrato, la columna de margen ocupada por la ficha de personaje (`FichaPersonaje`), el resto del texto en hojas desplegables, y al final un mapa de intereses interactivo. Está pensada para crecer: la columna de margen acepta más bloques debajo de la ficha (Ahora, Lecturas, Charlas) y las hojas se añaden sin tocar el diseño.

**Qué provee el sitio:** la foto; dos párrafos de intro; las hojas, cada una con título, número de puntos y contenido; los datos de la ficha; y, para el mapa, la lista de nodos (id, nombre, posición, si es ancla) y de aristas, que el `include` convierte en SVG. El contenido de las hojas es el texto actual de la página, sin recortar: lo que cambia es que ya no se lee todo de corrido.

**Hojas (`details.hoja`).** Son `<details>` nativos: funcionan sin JavaScript, se imprimen abiertos (el sitio ya abre los `details` antes de imprimir) y son indexables. El `summary` lleva la viñeta pixel `px-vineta` que pasa a `px-abierta` al abrir, el título en Literata cursiva 21px y la cuenta de puntos en `numero-pixel`. La primera hoja abre por defecto. Dentro, las listas van en `ul.pixel` con viñetas de píxel en el acento; la prosa, en `cuerpo-mates`.

**Mapa de intereses.** Un SVG con nodos rectangulares (bordes `tinta-tenue`, anclas en el acento), aristas en `regla`, `shape-rendering: crispEdges` para que las líneas sean de píxel. Al pasar el cursor por un nodo se iluminan sus vecinos y sus aristas; sin JavaScript queda como diagrama estático. Cada nodo debería enlazar a la etiqueta o entrada correspondiente del sitio. Mantén entre 10 y 15 nodos; con más, el mapa deja de leerse.

**Reglas.** La intro no pasa de dos párrafos; el retrato va a 120px con `radio-2`, flotado a la izquierda. La línea de `meta` bajo el H1 lleva nombre y ciudad en minúscula. Las frases de identidad no se repiten aquí: viven en la portada. Columnas futuras: un bloque «Ahora» va al margen debajo de la ficha; una sección larga nueva (por ejemplo «Charlas») es una hoja más.

**No hacer:** no convertir las hojas en pestañas (ocultan contenido a los buscadores y al lector que imprime); no poner una línea de tiempo del CV, para eso está el enlace al CV en la ficha; no animar el mapa.
