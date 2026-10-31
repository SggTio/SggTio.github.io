# Poema

Plantilla de Escritos (poema y cuento) y de Sobre mí: la voz de lectura en `voz-escritos` (Literata 19px, interlineado 1,75, medida `medida-escritos`) con la columna de margen en su temperamento de susurro. Los versos del ejemplo son de relleno.

**Qué provee el sitio:** `title`, el tipo (`poema`, `cuento`) y el año en `meta`; un epígrafe opcional con su fuente; el texto, y las notas de margen como `<aside class="margen">` tras la estrofa o párrafo al que pertenecen. Para un poema, el cuerpo va en `.poema` con `white-space: pre-line`, una estrofa por párrafo; para un cuento, en `.cuento` con sangría de primera línea y sin espacio entre párrafos.

**Reglas.** `titulo-escritos` en cursiva y peso 400; el epígrafe en `epigrafe` color `tinta-quieta`, con su fuente en `meta` debajo. El margen va en `susurro`: cursiva, `tinta-tenue`, opacidad `susurro` (0,62) que sube a `susurro-activo` (0,9) cuando el cursor está sobre el artículo. Ahí caben fecha y lugar de escritura, variantes y notas del autor, dedicatorias. Sin rótulos, sin reglas, sin color: el margen puede quedar vacío y ese vacío es parte del diseño. El bloque de texto se desplaza algo hacia la derecha (unos 64px) para que el conjunto texto + margen quede centrado ópticamente en el contenedor. Separador entre secciones de un cuento: «· · ·» en `tinta-tenue` con espaciado de 1em.

**No hacer:** no justificar; no usar letra capital; no poner tiempo de lectura; no colorear el H2 (un cuento rara vez lo necesita; si lo tiene, va en `tinta`, cursiva).
