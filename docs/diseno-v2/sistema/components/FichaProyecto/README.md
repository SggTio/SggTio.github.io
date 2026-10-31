# FichaProyecto

Plantilla de ficha de proyecto y de nota técnica: la voz técnica (`voz-tecnica`, Plex Sans 17px, medida `medida-tecnica`) con la columna de margen como ficha. Las tres preguntas que ya organizan las fichas del sitio (qué problema había, qué hice, qué salió mal por el camino) son los H2.

**Qué provee el sitio:** `title`, un `resumen` de una frase (máximo 52 caracteres de medida), `status`, `year`, `area`, `stack`, `repo`, tiempo de lectura; el cuerpo en Markdown. La ficha se genera del front matter como `<aside class="margen ficha">` con una lista de definiciones, colocada justo después del resumen.

**Reglas.** `titulo-tecnico` → `resumen-tecnico` en `tinta-quieta` → ficha al margen → cuerpo. La ficha lleva una regla superior de 1px en `verde`, rótulos en `rotulo` color `tinta-tenue` y valores en `margen-sans`; el estado va en mono y en `verde`. H2 en `subtitulo-tecnico` color `verde`. Las figuras, gifs y vídeos siguen las reglas de `Figura`; las notas de margen libres («Idea clave») también están disponibles aquí, pero debajo de la ficha. Para una Nota (lectura, reseña, apunte) la ficha se reduce a lo que aplique: fuente, año, lectura.

**No hacer:** no repetir en la prosa lo que ya dice la ficha; no usar chips para el stack; no poner iconos de GitHub, el enlace en texto basta.
