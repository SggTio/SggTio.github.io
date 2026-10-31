# NotaMargen

La columna de margen es la misma en todo el sitio (`margen` = 17rem a la derecha del texto, separada por `hueco-margen`) y cambia de temperamento con la voz. Cada nota es un `<aside class="margen …">` colocado en el Markdown justo después del párrafo que la origina; el CSS la flota a la derecha a esa altura. No es una barra lateral.

**Qué provee el sitio:** el `aside` con su clase de tipo y, en Mates, un `<span class="rotulo">` con el nombre del tipo.

**Tipos en Mates (aparato), `margen-sans` en `tinta-quieta`:** `indice` («En esta entrada», al inicio, numerado en `numero`, regla superior `regla`); `idea` («Idea clave», regla izquierda de 2px en `azulgris` y sangría `espacio-3`, el único bloque con color, úsalo con moderación: una o dos por artículo); `analogia` («Analogía», en `analogia`, Literata cursiva en `tinta`, sin regla). Los pies de figuras en columna también viven aquí (ver `Figura`).

**En Escritos (susurro), `susurro`:** sin clase de tipo, sin rótulo. Literata cursiva, `tinta-tenue`, opacidad `susurro` en reposo y `susurro-activo` con el cursor sobre el artículo. Contenido: fecha y lugar de escritura, variantes y notas del autor, epígrafes y dedicatorias.

**En Proyectos y Notas (ficha):** `ficha`, una vez por página, tras el resumen: regla superior en `verde`, lista de definiciones con rótulos en `rotulo` `tinta-tenue`.

**Regla editorial:** como máximo una nota de margen por párrafo; si dos caen cerca, la segunda se desplaza hacia abajo y pierde a su párrafo. Por debajo de `pliegue-margen` (960px) cada nota vuelve a la columna de texto justo después de su párrafo, como bloque sobre `superficie` con `radio-1` (en Escritos, sin fondo). El contenido nunca se oculta en móvil.
