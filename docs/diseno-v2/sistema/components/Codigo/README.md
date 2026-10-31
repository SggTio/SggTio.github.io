# Codigo

Bloques de código y código en línea, iguales en las tres voces: Plex Mono es el hilo común del sitio.

**Qué provee el sitio:** los bloques `pre.highlight` que genera Rouge en Jekyll; el tema de Rouge se mapea a cuatro colores de token y nada más.

**Reglas.** Bloque: `codigo` (14,5px, interlineado 1,55) en `tinta` sobre `codigo-fondo`, borde de 1px `regla`, `radio-1`, padding 14px `espacio-4`, scroll horizontal en vez de ajuste de línea. Sintaxis con tres colores: comentarios en `codigo-comentario` (tinta-tenue), palabras clave en `codigo-palabra` (azulgris), cadenas y números en `codigo-cadena` (verde); todo lo demás en `tinta`. Código en línea: `code` a 0,92em en `crema`, sin fondo. Un bloque dentro de la columna de texto respeta la medida; un bloque largo (más de 80 columnas) puede ir en una figura `ancho`.

**No hacer:** no usar temas de sintaxis de seis o más colores; no numerar líneas por defecto; no poner botón de copiar con icono (si se añade, en texto mono: «copiar»).
