# ArticuloMates

Plantilla de artículo de Mates: la voz de lectura (`voz-mates`, Literata a 18px, medida `medida-mates`) con la columna de margen en su temperamento de aparato. Las fórmulas de MathJax conviven con la serif sin salto visible.

**Qué provee el sitio:** `title`, `date`, `tags`, tiempo de lectura; el cuerpo en Markdown; y, como `<aside class="margen …">` colocados justo después del párrafo al que pertenecen, las notas de margen (ver `NotaMargen`). El índice «En esta entrada» se genera de los H2.

**Estructura.** `titulo-mates` → línea de `meta` (fecha · sección en el acento · etiquetas · minutos) → índice al margen → párrafo de entrada en `entrada-mates` color `crema` → cuerpo. H2 en `subtitulo-mates` color `azulgris`, numerados a mano en el texto («1. Dos preguntas en 1943»). H3 en `apartado-mates`, cursiva, sin numerar. Las ecuaciones en display llevan su número y una etiqueta de dos o tres palabras en `numero` en el margen, no entre paréntesis a la derecha.

**Reglas.** Como máximo una nota de margen por párrafo: dos seguidas se desplazan y la segunda pierde a su párrafo. Las figuras en columna llevan el pie al margen (`Figura`); las visualizaciones interactivas, gifs y vídeos van en `ancho`. Enlaces en el cuerpo con subrayado `regla` que pasa a `azulgris`. Nada de cajas: la única regla de color es la de «Idea clave».

**No hacer:** no usar negrita para destacar frases enteras, para eso está la idea clave; no poner más de un párrafo de entrada; no mezclar sans en el cuerpo.
