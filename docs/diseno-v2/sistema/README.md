Sistema de diseño de **Un Santajaro** (sggtio.github.io), el sitio personal de Santiago Gil Gallego: matemáticas, computación, cuentos y poesía. Conserva la paleta del sitio y cambia la tipografía y la manera de mostrar la información. Todo lo que sigue son reglas para quien construya con él.

## Principios

**Dos voces, una casa.** El sitio tiene dos registros y cada uno tiene su tipografía: la *voz de lectura* (Literata) para Mates, Escritos y Sobre mí; la *voz técnica* (IBM Plex Sans) para Proyectos y Notas. Plex Mono es el hilo que las une: fechas, rótulos, numeración, metadatos y código se ven iguales en las dos voces. Lo que cambia por voz son exactamente tres cosas: la familia del cuerpo, la medida con su interlineado, y el acento. Todo lo demás (paleta, navegación, espaciado, listas, mono) es común.

**Una columna de margen, tres temperamentos.** A la derecha del texto hay siempre una columna de `margen` (17rem). En Mates es *aparato*: índice, ideas clave, analogías, pies de figura, con rótulos y una regla de color. En Escritos es *susurro*: cursiva gris al 62 % de opacidad, sin rótulos. En Proyectos es *ficha*: estado, año, stack, código. La estructura es una; lo que cambia es cuánto se deja ver.

**Listas, no tarjetas.** Nada va en cajas con borde. Índices, portada y proyectos son listas tipográficas con reglas finas de 1px. El único bloque con regla de color es «Idea clave».

**La portada es un mosaico.** Ocho tiles sobre una retícula de 12 columnas; la foto de la fachada es lo único grande y todo lo demás es pequeño y tipográfico: las tres frases, las tres últimas entradas, las cuatro puertas de sección.

**Guiños 8 bits, no un sitio 8 bits.** Hay cuatro primitivas de píxel (rótulos en Silkscreen, viñetas, iconos 8×8, regla punteada y barras) y viven solo en lo que hace de índice, de ficha o de puerta: el índice «En esta entrada», la ficha de personaje de Sobre mí, los tiles del mosaico, las listas de Sobre mí y Notas. El cuerpo, los títulos, la navegación, el código y Escritos no llevan ninguno.

## Contenido

Escribe en español, en primera persona, con el tono conversacional que ya tiene el sitio («Imaginemos que es 1943»; «podés manipular para ver las ideas operar»). Las fichas de proyecto responden tres preguntas en este orden: qué problema había, qué hice, qué salió mal por el camino. Las fechas van en español y en mono: `12 · jul · 2026` (día, mes abreviado en minúscula sin punto, año); nunca «Jul 12, 2026». El estado de un proyecto es una palabra: `activo`, `terminado`, `pausado`. Las etiquetas van en minúscula separadas por punto medio: `laplacianos · segmentación · charla`. No uses emoji ni iconos; donde haría falta un icono, usa una palabra en mono. Mayúsculas solo en los rótulos `rotulo`.

Las tres frases del autor se reproducen exactamente: «Estudié matemáticas, porque quiero ser poeta.» · «Quisiera ser psiquiatra de máquinas, para interpretar sus sueños.» · «Me sueño con una panadería.»

## Color

La paleta es la del sitio y no se cambia: `fondo` (hsl 200 3% 12%), `superficie`, `tinta`, y tres acentos: `azulgris`, `crema`, `verde`. Dos temas: `oscuro` es el principal y `claro` existe con los mismos nombres.

Usa `tinta` para el texto principal; `tinta-quieta` para resúmenes, margen técnico y navegación inactiva; `tinta-tenue` para metadatos, pies y numeración, y nunca un gris más claro que ese para texto (es el límite de 4,5:1 sobre `fondo` en los dos temas). `regla` es la única línea decorativa: 1px, bajo la navegación, entre filas, alrededor del código.

Cada sección tiene un acento y el acento se hereda como `--acento` desde la clase de sección en `body`: `azulgris` en Mates; `crema` en Escritos, Notas y Sobre mí; `verde` en Proyectos. El acento se usa como señal, nunca como relleno: la línea bajo la sección activa del nav, el color de los H2, el subrayado de un enlace al pasar el cursor, la selección de texto, la regla de «Idea clave» o de la ficha, el rótulo de sección en las listas de la portada. Un fondo de color, un botón de color o una tarjeta de color están fuera del sistema. `crema` tiene un segundo papel: el párrafo de entrada de un artículo de Mates.

El código usa tres colores de sintaxis derivados de los acentos (`codigo-palabra` = azulgris, `codigo-cadena` = verde, `codigo-comentario` = tinta-tenue) sobre `codigo-fondo`.

## Tipografía

Tres familias, todas libres (SIL OFL) y autoalojadas en el sitio como woff2 con subconjunto latino: **Literata** (variable, con ejes de peso y tamaño óptico, regular y cursiva), **IBM Plex Sans** (400, 500, 600 y cursiva 400) e **IBM Plex Mono** (400 y 500). Las previsualizaciones de este sistema las cargan de Google Fonts; el sitio no hace peticiones a Google.

Voz de lectura en Mates: cuerpo en `cuerpo-mates` (18px, 1,65), H1 en `titulo-mates` (peso 500, no semibold), H2 en `subtitulo-mates` color del acento, H3 en `apartado-mates` (cursiva, para que la jerarquía venga del estilo y no solo del tamaño), entrada en `entrada-mates` color `crema`. Ajusta el eje óptico de Literata al tamaño (`opsz` 18 en cuerpo, 40 en títulos).

Voz de lectura en Escritos y Sobre mí: cuerpo en `cuerpo-escritos` (19px, 1,75), H1 en `titulo-escritos` (cursiva, peso 400), epígrafes en `epigrafe`, margen en `susurro`.

Voz técnica: cuerpo en `cuerpo-tecnico` (17px, 1,6), H1 en `titulo-tecnico` (600), resumen en `resumen-tecnico`, H2 en `subtitulo-tecnico` color del acento, listas en `titulo-lista` y `linea-resumen`, nav en `navegacion`, margen en `margen-sans`.

Mono en todas partes: `meta` para fechas y metadatos, `rotulo` para rótulos en mayúsculas con tracking de 0,1em, `numero` para numeración y ecuaciones, `pie-figura` para pies, `codigo` para código. La marca «Un Santajaro» va siempre en `nombre-sitio` (Literata 500) y las frases en `frase-apertura` (en el mosaico, a 20px).

Píxel: **Silkscreen** (OFL, autoalojada, 400 y 700) solo en `rotulo-pixel` (índice, ficha, tiles), `numero-pixel` (numeración del índice y de Proyectos) y `marcador-pixel` (cifras de la ficha). A 11px no cae en su retícula nativa de 8px, y está bien: es un guiño, no un emulador.

Convivencia con MathJax: las fórmulas se renderizan con fuentes de tradición TeX, serif; por eso Mates va en Literata. No pongas fórmulas en línea dentro de la voz técnica.

## Guiños 8 bits

El píxel del sitio es `pixel` (2px); toda forma retro se dibuja en múltiplos de 2px, con `box-shadow` sobre un cuadrado de 2px en `currentColor`, nunca con imágenes: así hereda el acento de la sección y funciona en los dos temas. Las primitivas son `px-vineta` y `px-abierta` (5×5, listas `ul.pixel` y marcador de las hojas), los iconos `px-sigma`, `px-marca`, `px-pluma`, `px-caja` (8×8, solo en los tiles del mosaico, a 3px por píxel con `px-grande`), `regla-pixel` (puntos de 2px cada 6px, sustituye a `regla` en índice, ficha y tiles), las barras de atributos de la ficha, y el cursor de bloque `cursor` que parpadea con periodo `parpadeo` tras «En esta entrada», «Últimas» y «Ahora», detenido con `prefers-reduced-motion`. Un cursor por pantalla como máximo. Nada de scanlines, sprites, rejillas de fondo ni sonidos. Catálogo y reglas en `GuinosPixel`.

## La columna de margen

Coloca cada nota como `<aside class="margen …">` justo después del párrafo que la origina; el CSS la flota a `margen` de ancho, separada por `hueco-margen`. Una nota por párrafo como máximo. En Mates hay tres tipos y no más: `indice` (al inicio), `idea` (una o dos por artículo) y `analogia`. En Escritos no hay tipos ni rótulos. En Proyectos hay una `ficha` tras el resumen. Por debajo de `pliegue-margen` (960px) cada nota vuelve a la columna de texto después de su párrafo, como bloque sobre `superficie` (en Escritos sin fondo); el contenido nunca se oculta en móvil. Detalles en `NotaMargen`.

## Composición y medidas

El contenedor mide `contenedor` (1120px) con gutter `espacio-6`. El texto no ocupa el contenedor: cada voz limita su columna a su medida (`medida-mates` 66ch, `medida-escritos` 58ch, `medida-tecnica` 72ch) y el espacio sobrante a la derecha es la columna de margen. En Escritos el bloque texto + margen se desplaza unos 64px a la derecha para quedar centrado ópticamente. El ritmo vertical usa la escala `espacio-1` a `espacio-9`; entre un H2 de Mates y el párrafo anterior hay 2,2em; bajo la apertura de portada, `espacio-9`.

Radios: `radio-0` para todo lo tipográfico, `radio-1` (2px) para código, imágenes y lienzos, `radio-2` (4px) solo para la foto de Sobre mí. No hay sombras.

## Sobre mí

Sobre mí es una página de la voz de lectura con acento `crema` y tres mecanismos propios: la ficha de personaje en el margen (`FichaPersonaje`: clase, nivel, atributos en barras de píxel, inventario, «Ahora»), el texto en hojas desplegables `details.hoja` con viñeta pixel (nativas, sin JavaScript, abiertas al imprimir), y un mapa de intereses en SVG con nodos de bordes rectos que ilumina a sus vecinos al pasar el cursor. Deja la columna de margen libre debajo de la ficha para bloques futuros («Ahora», «Lecturas», «Charlas»); una sección nueva es una hoja más. Detalles en `SobreMi`.

## Listas, no tarjetas

Índices de sección, Archivo y Proyectos usan `ListaPublicaciones` e `IndiceProyectos`: fecha o número en mono a la izquierda, título, una línea de resumen, metadatos en mono; filas separadas por `regla`. Sin fondos, sin bordes por fila, sin chips. Los filtros por área o etiqueta son enlaces en una línea de `meta`.

## Medios, ecuaciones y código

Cada figura declara su ancho: `encolumna` (pie al margen), `ancho` (visualizaciones interactivas, gifs como MP4/WebM en bucle, vídeo 16:9) o `completo` (`ancho-figura-completa`). Las imágenes a color se desaturan a `imagen-oscuro` en el tema oscuro. Las ecuaciones en display llevan número y etiqueta en `numero` al margen. Código según `Codigo`. Detalles en `Figura`.

## Tema claro

El tema `claro` se activa con `data-theme="claro"` en `html` y conserva todos los nombres; los acentos tienen su versión oscurecida (`azulgris` #627084, `crema` #8d6741, `verde` #447b4b) para seguir legibles como texto sobre blanco. No cambia la tipografía ni la composición. Sin JavaScript el sitio queda en oscuro.

## Iconografía

No hay iconos. Donde un sitio pondría un icono (estado, tema, feed, repositorio) este pone una palabra en `meta` o `rotulo`. Los separadores son el punto medio «·» y, entre secciones de un cuento, «· · ·». Los únicos iconos son los cuatro de 8×8 píxeles de los tiles de sección. La fachada azul de `home-banner.jpg` es la imagen de identidad y ocupa el tile grande del mosaico.

## Aplicación en Jekyll

`components/bundle.css` es la base del `styles.css` del sitio: cópialo tras `tokens.css` y sustituye el `@font-face` de Google por los archivos locales en `/assets/fonts/`. La voz se fija por la clase de sección que `body` ya lleva (`section-mates` → `voz-mates`, etc.); el acento se hereda de la misma clase. El `article` lleva `articulo` y la clase de voz; las notas de margen son `aside.margen` en el Markdown o en un `include`; la ficha de proyecto se genera del front matter. Las fechas se formatean con `%-d · %b · %Y` y un filtro que traduzca el mes. El `posts-grid` y las `posts-card` se sustituyen por `ul.lista`; la portada por `.mosaico`; Sobre mí por `SobreMi` con la ficha y el mapa generados desde datos en `_data/`.
