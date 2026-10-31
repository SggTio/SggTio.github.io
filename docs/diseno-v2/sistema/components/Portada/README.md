# Portada

La portada es un mosaico minimalista de ocho tiles sobre una retícula de 12 columnas (`mosaico-columna`) y filas de `mosaico-fila` (200px). Lo único grande es la foto: la fachada azul de `home-banner.jpg` ocupa 7 columnas × 2 filas, a sangre dentro de su tile. Todo lo demás es pequeño y tipográfico.

**Qué provee el sitio:** la foto; las tres frases en su orden; las tres últimas entradas (fecha, título, url); y, por sección, el nombre y el número de entradas. Opcionalmente un tile «Ahora» (`.ahora`, 4 columnas) con dos líneas de lo que el autor está haciendo, que sustituye a uno de los tiles de sección en una fila extra.

**Los tiles.** `foto` (7×2). `frases` (5×1): las tres frases en Literata 300 cursiva a 20px, una debajo de otra, con los mismos colores de siempre (tinta, azulgris, crema). `ultimas` (5×1): rótulo «Últimas» en `rotulo-pixel` con cursor que parpadea, y tres filas fecha + título separadas por `regla`. Cuatro `seccion` (3×1 cada uno): un icono de 8×8 píxeles dibujado con el `pixel` del sitio (`px-sigma` Mates, `px-marca` Notas, `px-pluma` Escritos, `px-caja` Proyectos) en el color del acento de la sección, el nombre en Plex Sans 500 y la cuenta en `meta`. Todo el tile es el enlace.

**Reglas.** Los tiles no son tarjetas: no tienen borde ni radio ni sombra; lo que los separa es el grout de 1px en `regla` (el `gap` de la retícula deja ver el fondo `regla`) y un contorno de 1px alrededor del mosaico. Sin fondo distinto por tile. La foto se desatura con `imagen-oscuro` en el tema oscuro como cualquier imagen. Debajo del mosaico no hay nada más: la lista larga de publicaciones vive en Archivo y en cada sección. Por debajo de 960px el mosaico pasa a 6 columnas: foto a lo ancho, frases y últimas a lo ancho, secciones de dos en dos.

**No hacer:** no añadir más de un tile de texto largo; no poner la foto en un tile pequeño; no usar iconos que no sean los cuatro de 8×8; no animar los tiles al pasar el cursor, basta con que el nombre tome el acento.
