# Figura

Toda imagen, gif, vídeo o visualización interactiva va en un `<figure>` que declara uno de tres anchos. El ancho es una decisión editorial por figura, no un valor por defecto del tema.

**Qué provee el sitio:** `<figure class="encolumna | ancho | completo">` con el medio dentro y un `<figcaption>`. Para las figuras en columna el pie empieza con `<b>Figura N</b>`.

**Los tres anchos.** `encolumna`: la medida del texto (66 caracteres en Mates); el pie se va al margen en `margen-sans`, alineado con el borde superior de la figura, con «Figura N» en `rotulo` color del acento; es el ancho de las imágenes estáticas y de los diagramas pequeños. `ancho`: texto + hueco + margen (unos 1000px); es el ancho de las visualizaciones interactivas (las `.viz` que ya existen), de los gifs y del vídeo; el pie va debajo en `pie-figura`. `completo`: `ancho-figura-completa` (1056px), rompe la columna a propósito; para un mapa, un campo vectorial o un panel de varias gráficas; pie debajo.

**Medios.** Los gifs se sirven como MP4 o WebM con `autoplay muted loop playsinline`, que pesan entre cinco y diez veces menos y se ven igual; un gif real solo si es diminuto. Vídeo propio con `<video controls>`; vídeo externo en un `<iframe>` con `aspect-ratio: 16 / 9` dentro de una figura `ancho`. Las imágenes a color llevan `filter: saturate(imagen-oscuro)` en el tema oscuro. Todas con `alt` y `loading="lazy"`; el borde es `regla` y el radio `radio-1`.

**Ecuaciones.** Una ecuación en display no es una figura: va en `.ecuacion`, centrada, con su número y etiqueta en `numero` al margen. Si una ecuación es más ancha que la medida, se envuelve en una figura `ancho` sin pie.

**No hacer:** no centrar figuras en columna con márgenes automáticos; no poner sombras; no pies de más de dos líneas al margen (si necesita más, va debajo).
