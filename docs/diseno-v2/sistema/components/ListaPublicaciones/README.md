# ListaPublicaciones

Lista tipográfica que reemplaza la rejilla de tarjetas en la portada, en los índices de sección (Mates, Notas, Escritos) y en Archivo. Cada fila: fecha en `meta` en una columna de 8,5rem, título en `titulo-lista`, una línea de resumen en `linea-resumen` y, opcionalmente, etiquetas y tiempo de lectura en `meta` separados por punto medio.

**Qué provee el sitio:** por entrada, `date`, `title`, `url`, `excerpt` (una frase; sin excerpt la fila queda en dos líneas), `tags` y `section`. Las fechas se formatean en español: `%d · %b · %Y` con el mes en minúscula y sin punto (`12 · jul · 2026`).

**Reglas.** Filas separadas por `regla` de 1px, con 14px de padding vertical; la primera fila lleva regla arriba y la última también abajo. Sin fondo, sin radio, sin sombra. El título es el único enlace de la fila y se colorea con el acento al pasar el cursor. En la portada, donde conviven secciones, cada fila lleva su sección en `rotulo` con el color de su acento (`mates` azulgris, `escritos` y `notas` crema, `proyectos` verde); dentro de un índice de sección ese rótulo sobra. El encabezado de la lista va en `lista-titulo` (mono, mayúsculas, `tinta-tenue`): «Últimas publicaciones», «Mates · 2026».

**No hacer:** no centrar nada; no mostrar la fecha en inglés; no poner chips con fondo para las etiquetas; no truncar el resumen con puntos suspensivos, mejor escribir uno corto.
