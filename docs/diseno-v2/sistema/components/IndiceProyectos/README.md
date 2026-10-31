# IndiceProyectos

El índice de Proyectos como lista numerada por área (Matemáticas, Ciencias computacionales, Inteligencia artificial), en lugar de la rejilla de fichas. Es `ListaPublicaciones` con tres columnas: número en `numero`, contenido, año en `meta` a la derecha.

**Qué provee el sitio:** por proyecto, `title`, `url`, `area`, `status` (`activo`, `terminado`, `pausado`), `year`, una frase de resumen y la lista de tecnologías.

**Reglas.** La numeración es continua a lo largo de toda la página, no reinicia por área, para que un proyecto pueda citarse por su número. El estado va como palabra en `rotulo` verde junto al título, nunca como chip con fondo. Las tecnologías van en `meta` separadas por punto medio. El encabezado de cada área va en `lista-titulo`. Los filtros por área que hoy son chips pasan a ser enlaces de ancla en una línea de `meta` bajo el título de la página: «Matemáticas · Ciencias computacionales · Inteligencia artificial».

**No hacer:** no usar fondos ni bordes por fila; no mostrar iconos de lenguaje; no abreviar el estado.
