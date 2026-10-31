# Navegacion

Cabecera y pie comunes a todo el sitio: la marca «Un Santajaro» en `nombre-sitio` (Literata), los cinco enlaces en `navegacion` (Plex Sans) y, debajo, una regla `regla` de 1px.

**Qué provee el sitio:** la clase de sección en `body` (`section-mates`, `section-escritos`, `section-notas`, `section-proyectos`, `section-sobre`, `section-inicio`), que fija `--acento`; y la clase `activa` en el enlace de la sección actual.

**Reglas.** Los enlaces inactivos van en `tinta-quieta` y pasan a `tinta` al pasar el cursor; el activo va en `tinta` con una línea inferior de 2px en el acento de la sección: ese cambio de color es la única señal de «en qué cuarto estoy» y basta. No hay fondo, no hay botón de tema en el nav (va en el pie, en mono). El pie lleva Archivo, Etiquetas, Feed y el copyright con nombre, todo en `meta`. En portada (`section-inicio`) ningún enlace está activo.

**No hacer:** no usar el acento como fondo del enlace activo; no añadir iconos; no abreviar «Sobre mí».
