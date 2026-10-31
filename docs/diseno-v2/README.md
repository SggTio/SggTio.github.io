# Diseño v2 · cómo está aplicado en el sitio

> **Aviso: datos inventados en `sistema/`.** Los `preview.html` de `sistema/components/` traen
> datos de ejemplo **que no son reales**: repositorios, tecnologías (PyTorch…), métricas, tiempos
> de lectura, atributos 0–10, fechas y títulos. **Nunca se copian al sitio** (CLAUDE.md §2,
> «Prohibido inventar»). Algunos README de componente, además, piden datos que el sitio no tiene
> o descartó (atributos 0–10, fila de repositorio): manda §9. De las previews se toman estructura
> y clases; el contenido sale siempre del front matter o del texto del repositorio.
> Las previews tampoco se comportan como el sitio: piden las fuentes a Google Fonts y usan
> `data-theme="claro"`/`"oscuro"`, que aquí no existen (§4).

Documento para quien mantenga el código (Santiago o un agente). Fecha: 2026-10-31, rama
`restructure/5-diseno-v2`. Si algo de aquí no coincide con el código, manda el código:
corrige este documento. Las cabeceras de los parciales y de algunos includes citan
«CONTRATO.md» o las «fases» A/B: era el contrato de trabajo del rediseño, que no está en el
repositorio; este documento recoge su estado final.

| Ruta | Qué es |
|---|---|
| `sistema/` | Copia literal del sistema de diseño «Un Santajaro» v2 (exportado el 2026-10-30): `README.md` (las reglas), `LEEME.txt`, `tokens.json`, `tokens.css`, `design-system.json`, `components/bundle.css` y, por componente, `README.md` + `preview.html` (`Cover` es la ilustración de portada del propio sistema y solo trae preview). No se edita: es la referencia contra la que se miden las desviaciones (§9–§10). |
| `README.md` | Este documento. |
| `skill-frontend.md` | Cambios propuestos (no aplicados) a la skill `santajaro-frontend` para que no contradiga v2. |

`docs/` está en `exclude` de `_config.yml`: nada de esta carpeta llega al sitio publicado.

---

## 1. Reglas para tocar estilos

1. Colores, espacios, medidas y familias: solo `var(--token)` (§3). Ningún hex nuevo en los
   parciales. (Excepción documentada: los cuatro `--lienzo-*`, fondo y textos del lienzo de las visualizaciones, fijos en los dos temas.)
2. Lo genérico va en un parcial `_v2-*`; lo de una sección, en su `_ajustes-*`, siempre acotado
   (`body.section-mates …`, `body.layout-poema …`, `.voz-escritos …`, `.sobre …`). No contéis
   con el orden de importación para ganar: acotad.
3. Tema: `:root:not([data-theme="light"]) …` para oscuro y `:root[data-theme="light"] …` para
   claro. Nunca `[data-theme="oscuro"]` ni `[data-theme="claro"]` (§4).
4. `--accent-color` nunca en `:root`/`html` (§5).
5. `_sass/_componentes.scss` no se editó en el rediseño (Santiago tenía cambios sin commitear en
   él). Sus reglas se sobrescriben desde `_v2-*` y `_ajustes-*`; si algún día se edita, revisad
   qué sobrescrituras sobran (§11).
6. `assets/posts/**` (JS de las nueve visualizaciones y sus `post.css`) y el cuerpo de los posts
   reales no se tocan: lo que haya que corregir se corrige desde Sass.
7. `_mates/charlas/laplacianos_tumores.html` (`layout: none`) no carga `styles.css` y tiene su
   paleta propia: ningún cambio de estilos le afecta, y así debe seguir.
8. Un cursor parpadeante por pantalla como máximo (D5). El CSS no lo impone.

---

## 2. Parciales Sass y su orden

`styles.scss` los importa en este orden. A igual especificidad gana el último.

| Grupo | Parcial | Contenido |
|---|---|---|
| 1 · fuentes y tokens | `_fuentes` | 10 `@font-face` locales (`/assets/fonts/…`, `font-display: swap`, `unicode-range` latino). |
| | `_tokens` | Tokens de `tokens.css` (colores de los dos temas, escalas, familias), la mezcla `tokens-claros` (tema claro y, al imprimir, también el oscuro), los cuatro `--lienzo-*` y las 27 clases tipográficas literales (`.frase-apertura` … `.marcador-pixel`). |
| | `_compat` | Alias de nombres viejos → tokens, en `:root` (§3.5). |
| 2 · base neutral | `_base` | Reinicio, `html/body`, enlaces, `::selection`, `img/video`, `hr`, `:focus-visible` global, tablas, `mark`, `abbr`. |
| | `_type` | Tipografía fuera de las voces: h1–h6, p, listas, `dl`, `blockquote`, `.lead` genérico, notas al pie de kramdown. |
| | `_code` | Bloques de código (componente Codigo), envoltorios de Rouge neutralizados, código en línea en crema, `.viz pre`, `font-synthesis-weight: none` en mono. |
| | `_syntax` | Sintaxis Rouge a tres colores (§10). |
| | `_entornos` | `.entorno` (regla izquierda 2px en acento, sin caja), `.entorno-etiqueta`, `.qed`, `.capa-2` (entre dos reglas) + impresión. |
| 3 · heredado | `_componentes` | **No editado en el rediseño.** Insignias, etiquetas, tarjetas, meta-proyecto, línea de tiempo, viz-pendiente… (versión de master; casi todo sobrescrito más abajo). |
| | `_heredado` | Marcado viejo aún vivo (§11). No se escribe CSS nuevo aquí. |
| 4 · sistema v2 | `_v2-esqueleto` | Acento por sección (`--acento` y `--accent-color` en `body.section-*`), `.seccion-*`, `.saltar`, `.contenedor`, `.masthead`, `.pie`, `.alternador-tema`. Va tras `_componentes` para sustituir sus reglas de pie y alternador. |
| | `_v2-articulo` | `@property --texto/--ancho`, `.articulo` (clearfix, `> h1` a todo el ancho), `.margen`, `.meta`, `.rotulo`, las tres voces con índice/idea/analogía/ecuación, epígrafe/poema/cuento/separador/susurro, ficha; pliegues por voz. |
| | `_v2-figura` | `figure`, `figcaption`, `.encolumna`, `.ancho`, `.completo`, `.lienzo`, vídeo e iframe, desaturación de fotos decorativas, MathJax en display sin `min-width`. |
| | `_v2-listas` | `.lista`, `.lista.proyectos`, `.lista-titulo`, `.lista-vacia`, quiebre ≤480px; `.lista-etiquetas` e `.insignia` como palabras en mono. |
| | `_v2-mosaico` | `.apertura` y `.mosaico` con sus tiles; pliegue a 960px y ≤480px. |
| | `_v2-sobre` | `.sobre .intro`, `.retrato`, `details.hoja`, `.ficha-personaje`, `.mapa`. |
| | `_v2-pixel` | Primitivas `.px-*`, rótulos Silkscreen, `.regla-pixel`, `.cursor`, `ul.pixel`. |
| 5 · utilidades | `_utilidades` | `.one-col`, `.two-col`, `.visualmente-oculto`. |
| 6 · ajustes | `_ajustes-mates` · `_ajustes-proyectos` · `_ajustes-listas` · `_ajustes-escritos` · `_ajustes-sobre` | Uno por área, en este orden. La cabecera de cada archivo dice su ámbito. |

Ámbito de cada ajuste:

| Parcial | Ámbito |
|---|---|
| `_ajustes-mates` | `_layouts/post.html`, los dos posts reales y sus `.viz`, índice «En esta entrada». |
| `_ajustes-proyectos` | `_layouts/proyecto.html`, `proyectos.md`, ficha e índice; además, donde aparezcan, `.meta-proyecto`, `.tarjeta-proyecto`, `.proyecto-destacado`, `.viz-pendiente`, `.aviso-borrador` (sustituyen la caja de `_componentes`). |
| `_ajustes-listas` | `index.md` (mosaico), índices de Mates/Notas/Escritos, `archive.md`, `tags.md`, `404.html`, layout `seccion`; además `.posts-card`, `.encabezado-seccion`, `.linea-tiempo`, `.enlaces-sociales` (hoy solo en /desarrollo/). |
| `_ajustes-escritos` | Layouts `escrito`, `poema`, `nota`. |
| `_ajustes-sobre` | `about.md`, layout `sobre`. |

Retirados en el rediseño: `_variables`, `_layout`, `_toc`, `_message`, `_pagination`,
`_masthead`, `_posts`, `_custom`. Su contenido útil vive en `_tokens`/`_compat` (variables),
`_v2-esqueleto` (acentos, cabecera), `_utilidades` (una y dos columnas) y `_heredado`.

---

## 3. Tokens

Todos en `_sass/_tokens.scss`, en `:root`.

### 3.1 Color (cambia con el tema)

| Token | Oscuro | Claro | Uso |
|---|---|---|---|
| `--fondo` | `#1e1f20` | `#ffffff` | fondo de página |
| `--superficie` | `#1c1c1c` | `#f1f3f5` | notas de margen plegadas, `figure .lienzo`, vídeo |
| `--tinta` | `#d9d9d9` | `#212529` | texto principal |
| `--tinta-quieta` | `#a9adb2` | `#495057` | resúmenes, margen técnico, nav inactiva, susurro |
| `--tinta-tenue` | `#8a8f95` | `#5c636a` | meta, pies, numeración; el gris más claro permitido para texto; subrayado de enlaces |
| `--regla` | `#ffffff24` | `#dee2e6` | la única línea decorativa (1px) |
| `--azulgris` | `#8d99ab` | `#627084` | acento de Mates y por defecto |
| `--crema` | `#e5d6c7` | `#8d6741` | acento de Escritos, Notas, Sobre mí; entrada de Mates; código en línea |
| `--verde` | `#95c9a0` | `#447b4b` | acento de Proyectos; bloque «Ahora» |
| `--codigo-fondo` | `#161718` | `#f8f9fa` | fondo de `pre` |
| `--codigo-comentario` · `--codigo-palabra` · `--codigo-cadena` | tinta-tenue · azulgris · verde | ídem | sintaxis |
| `--acento` | según sección (§5) | ídem | señal: H2, línea del nav activo, hover, selección, foco. Nunca relleno. |

### 3.2 Lienzo de las visualizaciones (fijo)

| Token | Valor en los dos temas | Uso |
|---|---|---|
| `--lienzo-fondo` | `#0f1216` | fondo de `.viz-stage` (el que dan por hecho los scripts) |
| `--lienzo-tinta` | `#d9d9d9` | texto que el sitio recolorea sobre `.viz-stage` |
| `--lienzo-tinta-tenue` | `#8a8f95` | ídem, secundario (años de eje, rótulos de era) |
| `--lienzo-azulgris` | `#8d99ab` | ídem, en azulgris |

El lienzo `.viz-stage` de los posts de Mates es oscuro en los dos temas (sus scripts dibujan con
colores fijos para fondo oscuro). Estos tokens **no** se redefinen en claro ni al imprimir, y solo
se usan ahí (`_ajustes-mates`). Fuera de `.viz-stage`, tokens normales. La base del lienzo (fondo,
relleno, borde, SVG al ancho) y de la fila de mandos la pone `_ajustes-mates` con `:where()`, sin
peso: los `post.css` de los dos posts la sustituyen con sus mismos valores, y una entrada nueva sin
hoja propia ya sale bien. Al imprimir, `.viz-stage` lleva `print-color-adjust: exact`: el lienzo sale
oscuro con su dibujo, aunque el navegador no imprima fondos.

### 3.3 Escalas (fijas)

| Token | Valor |
|---|---|
| `--pixel` | 2px |
| `--espacio-1` … `--espacio-9` | 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96px |
| `--radio-0` · `--radio-1` · `--radio-2` | 0 · 2px (código, imágenes, lienzos) · 4px (solo el retrato) |
| `--contenedor` | 1120px (gutter 32px; 16px ≤480px) |
| `--medida-mates` · `--medida-escritos` · `--medida-tecnica` | 66ch · 58ch · 72ch |
| `--margen` · `--hueco-margen` | 17rem · 3rem |
| `--ancho-figura-completa` | 1056px |
| `--pliegue-margen` | 960px — informativo: el mosaico y la cabecera pliegan a 960px literal; el artículo pliega por voz (§5) |
| `--mosaico-columna` · `--mosaico-fila` | 80px · 200px (mínimo de fila) |
| `--susurro` · `--susurro-activo` | **0.8 · 1** (el sistema trae 0.62 · 0.9, §10) |
| `--imagen-oscuro` | 0.85 (saturación de fotos decorativas en oscuro) |
| `--parpadeo` | 1.1s |
| `--font-serif` · `--font-sans` · `--font-mono` · `--font-pixel` | Literata · IBM Plex Sans · IBM Plex Mono · Silkscreen (con respaldos del sistema) |

### 3.4 Medidas dentro de un artículo

Dentro de `.articulo`: `--texto` (medida de la voz) y `--ancho` (texto + hueco + margen). Están
registradas con `@property` como `<length>` (`_v2-articulo`): sus `ch` se resuelven una vez, con
la letra del artículo, y los hijos heredan píxeles. Fuera de un artículo valen 0px. Si un bloque
necesita otra medida, dale su propio `max-width`; no redeclares `--texto` en un hijo.

`.articulo > *` se limita a `--texto`, salvo `> h1` (texto + margen). `.ancho` = `--ancho`;
`.completo` = 1056px.

### 3.5 Alias de compatibilidad (`_compat.scss`, en `:root`)

Existen para `_componentes.scss`, `_entornos`, `_heredado` y las hojas de propuestas de la copia
de Santiago. **No escribáis CSS nuevo con estos nombres.**

| Alias viejo | Token |
|---|---|
| `--body-bg` | `--fondo` |
| `--body-color`, `--heading-color` | `--tinta` |
| `--surface` | `--superficie` |
| `--border-color`, `--surface-border` | `--regla` |
| `--code-bg` | `--codigo-fondo` |
| `--text-quiet` | `--tinta-quieta` |
| `--text-muted` | `--tinta-tenue` |
| `--accent-azulgris` · `--accent-crema` · `--accent-verde` | `--azulgris` · `--crema` · `--verde` |
| `--body-font` | `--font-sans` |
| `--code-font` | `--font-mono` |
| `--border-radius` | `--radio-1` (2px; antes 4px) |
| `--spacer` · `--spacer-2` · `--spacer-3` | `--espacio-4` · `--espacio-5` · `--espacio-7` |
| `--accent-color` | **no es alias de `:root`**: vive en `body.section-*` (§5) |

Retirados sin alias: `--link-color`, `--link-hover-color`, `--nav-color`, `--on-accent`,
`--shadow-*`, `--gray-*`, `--dark-poole-*`, `--red`…`--orange`, `--blue-300/400`,
`--yellow-100`, `--code-color`, `--body-font-size`, `--body-line-height`. (La hoja de propuestas
grafo-dual de la copia de Santiago usa `--orange`: está fuera del build y no se resuelve.)

---

## 4. Tema

| | |
|---|---|
| Oscuro | sin atributo en `<html>`. Es el de todo el mundo, también sin JavaScript. |
| Claro | `data-theme="light"` en `<html>`, solo si el lector lo pide. |
| Memoria | `localStorage`, clave `tema`, valores `light`/`dark`. |
| Pre-pintado | script al principio de `_includes/head.html`: aplica el claro antes de pintar. |
| Alternador | `#alternador-tema` en el pie (`_includes/alternador-tema.html`): una palabra en mono con el tema de destino («claro»/«oscuro»), `aria-label` «Cambiar a tema …», sin `aria-pressed`, nace `hidden` y lo revela el script. |
| `prefers-color-scheme` | No interviene: oscuro por defecto es identidad. |
| `color-scheme` | No se declara: cambiaría los controles nativos de las visualizaciones. |

Traducción de los selectores del sistema: `[data-theme="oscuro"]` → `:root:not([data-theme="light"])`;
`[data-theme="claro"]` → `:root[data-theme="light"]`. El atributo y sus valores no cambian porque
los scripts de los posts observan mutaciones de `data-theme` en `<html>`.

**Impresión.** Los navegadores no imprimen fondos por defecto: en oscuro salía tinta clara sobre papel
blanco (≈1,4:1, también en master). Con `@media print` el tema oscuro toma los valores del claro
(mezcla `tokens-claros` de `_tokens.scss`) y las fotos decorativas no se desaturan. Los `--lienzo-*`
no cambian (ver §3.2).

Desaturación en oscuro (`saturate(var(--imagen-oscuro))`) **solo** en fotos decorativas:
`class="foto-decorativa"` (en la `img` o su contenedor; `figura.html decorativa=true` la pone),
`.mosaico .foto img` y `.retrato`. Nunca en figuras de datos ni médicas.

---

## 5. Acento y voz por sección

**Acento**: `default.html` emite en `body` `section-{{ page.section | default: 'default' }}`,
`layout-*` y, con `wide: true`, `layout-wide` (que ya no cambia anchos). `_v2-esqueleto`
define en esas clases `--acento` y, en el mismo selector, `--accent-color: var(--acento)`.
`--accent-color` no está en `:root` a propósito: el JS de las visualizaciones de avances lo lee
de `document.documentElement`, no lo encuentra y usa su respaldo `#e5d6c7`, pensado para su
lienzo oscuro.

**Voz**: clase en el mismo `article` que `.articulo` (no en `body`). `{% include voz.html %}` deja
`voz` en el ámbito y el layout escribe `<article class="articulo {{ voz }}">`.

| Sección (`page.section`) | Páginas | Layout | Voz | Acento | Pliegue del margen |
|---|---|---|---|---|---|
| `mates` | /mates/, `_mates/*` | `seccion`, `post` | `voz-mates` (Literata 18/1.65, 66ch) | azulgris | ≤1090px |
| `escritos` | /escritos/, `_escritos/*` | `seccion`, `escrito`, `poema` | `voz-escritos` (Literata 19/1.75, 58ch) | crema | ≤1040px |
| `notas` | /notas/, `_notas/*` | `seccion`, `nota` | `voz-tecnica`; con `genero: ensayo`, `voz-escritos` (D12) | crema | según voz |
| `sobre` | /sobre/ | `sobre` | `voz-escritos` | crema | ≤1040px |
| `proyectos` | /proyectos/, `_proyectos/*` | `page`, `proyecto` | `voz-tecnica` (Plex Sans 17/1.6, 72ch) | verde | ≤1140px |
| `inicio` | / | `default` (mosaico) | — | azulgris | mosaico a 960px |
| `archivo`, `etiquetas` | /archivo/, /etiquetas/ | `seccion` | `voz-tecnica` | azulgris | — |
| `desarrollo` | /desarrollo/ (solo en dev) | `page` | `voz-tecnica` | azulgris | ≤1140px |
| sin sección | 404 | `default` | `voz-escritos` (forzada en `404.html`) | azulgris | — |

Los índices del layout `seccion` (/mates/, /notas/, /escritos/, /archivo/, /etiquetas/) no son un
`.articulo`: van en `div.indice-seccion`, y la voz solo elige el estilo del `<h1>` y el tono
(`indice-lectura` o `indice-tecnica`).

Pliegue: por debajo de esos anchos cada nota de margen (y el pie de `.encolumna`, y el número de
`.ecuacion`) vuelve al texto tras su párrafo, sobre `--superficie` (en Escritos sin fondo).
`.completo` pasa a ocupar el ancho del artículo ≤1140px. Los números salen de `--ancho` medido con
las fuentes reales + 2 × 32px de gutter + barra de desplazamiento; si una voz cambia de medida, se
recalculan en `_v2-articulo.scss`, no desde un ajuste.

Para teñir un bloque suelto con el acento de otra sección: `.seccion-mates`, `.seccion-escritos`,
`.seccion-notas`, `.seccion-sobre`, `.seccion-proyectos` (solo cambian `--acento`).

El artículo de Mates conserva la clase `post` (`<article class="post articulo voz-mates">`): los
`post.css` de los dos posts reales acotan sus selectores a `.post` y las correcciones del sitio se
anclan en `body .post …` para ganarles. Sin la clase volverían cajas oscuras con texto del tema
(1,1:1 en claro).

---

## 6. Fuentes

`/assets/fonts/` (Fontsource 5.3.0, subconjunto latino, con su `OFL-*.txt`):

| Familia | Archivos | Uso |
|---|---|---|
| Literata (variable: opsz 7–72, wght 200–900) | `literata.woff2`, `literata-italic.woff2` | voz de lectura, marca «Un Santajaro», frases |
| IBM Plex Sans | `plex-sans-400`, `-500`, `-600`, `-400-italic` | voz técnica, nav, listas |
| IBM Plex Mono | `plex-mono-400`, `-500` | fechas, meta, rótulos, numeración, código |
| Silkscreen | `silkscreen-400`, `-700` | solo guiños píxel (índice, ficha, tiles, numeración) |

- `head.html` precarga `literata.woff2` y `plex-mono-400.woff2`. Las rutas son absolutas en
  `_fuentes.scss` y en el `preload`: si un día hay `baseurl`, se cambian en los dos sitios.
- No hay Plex Sans 700: `<strong>` usa la 600. No pidáis cursiva por encima de 400 en Plex Sans
  ni más de 500 en Plex Mono (el navegador fabricaría una negrita falsa; `pre, code, kbd, samp`
  llevan `font-synthesis-weight: none`).
- Cobertura: todo el español, « » · — – … y comillas. Ninguna familia trae → ↔ ↕, subíndices
  ₀₁₂₃, ✓ ✗ □ ∈ ⅑ ni griego suelto en el subconjunto latino: caen al respaldo del sistema. Para
  griego en la voz de lectura bastaría otro `@font-face` de Literata con su subconjunto griego y
  su `unicode-range` (no se ha añadido).

---

## 7. Includes y layouts

Cada include lleva su cabecera `{%- comment -%}` con Parámetros; esta tabla es el resumen.

### 7.1 Nuevos

| Include | Parámetros | Qué hace |
|---|---|---|
| `fecha.html` | `fecha` (obl.), `sin_time` | `<time datetime="2026-04-14">14 · abr · 2026</time>`; con `sin_time=true`, solo el texto. |
| `publicaciones.html` | — | No pinta: deja `publicaciones` (Mates + Notas + Escritos, sin `draft: true` ni `listar: false`, fecha desc) y `n_mates`, `n_notas`, `n_escritos`, `n_proyectos`. Proyectos no entra en «Últimas» (sin fecha). |
| `voz.html` | `seccion`, `genero` (por defecto los de `page`) | No pinta: deja `voz` (§5). |
| `minutos-lectura.html` | `contenido` (obl., HTML renderizado), `corto` | «N min de lectura» o «N min»: palabras / 200, mínimo 1. Mates y Notas, nunca Escritos. |
| `fila-publicacion.html` | `post` (obl.), `seccion`, `resumen`, `etiquetas`, `lectura` | `<li>` de `ul.lista`: fecha · título (único enlace) · `description` · etiquetas y lectura en mono. |
| `fila-proyecto.html` | `proyecto` (obl.), `numero` (obl.) | `<li>` de `ul.lista.proyectos` con número «01», estado, resumen, tecnologías y año. |
| `ficha-proyecto.html` | `proyecto` (obl., normalmente `page`) | `aside.margen.ficha` con `meta-proyecto.html`; una por página, tras el resumen. Sin fila de repositorio (D7). |
| `indice-entrada.html` | `contenido` (obl., `content`) | «En esta entrada» al margen si hay ≥2 `<h2 id>`; quita la numeración «N.»; lleva el cursor (D5); nombre de región en `aria-label`. |
| `margen.html` | `cuerpo` (obl., Markdown con `capture`), `tipo` (`idea`, `analogia`, `indice`; sin tipo = susurro), `titulo` | `aside.margen[.tipo]`; va en su propia línea, tras su párrafo. |
| `figura.html` | `src`, `alt` (obligatorios; sin `alt` el build falla a propósito), `pie`, `numero`, `ancho` (`encolumna`, `ancho`, `completo`), `decorativa`, `ancho_px`/`alto_px`, `poster`, `controles` | `figure` con imagen o vídeo; un `.mp4`/`.webm` sale como bucle tipo gif (autoplay muted loop, controles, quieto con reduced-motion). |
| `ecuacion.html` | `tex` (obl.), `numero`, `etiqueta`, `id`, `ancho` | `div.ecuacion` con `$$…$$` y el número al margen; la página necesita `math: true`. |
| `ficha-personaje.html` | `ficha` (por defecto `page.ficha`: `clase`, `nivel`, `inventario`) | `aside.margen.ficha-personaje` con `dl`; bloque «Ahora» solo si `_data/ahora.yml` trae datos. |
| `hoja.html` | `id`, `titulo`, `cuerpo` (obligatorios), `abierta`, `cuenta` | `details.hoja` con `<h2>` en el `summary`. |
| `mapa-intereses.html` | `mapa` (por defecto `site.data.intereses`) | `section.mapa`: SVG con un enlace por tema, leyenda y la lista en texto (sustituye al SVG ≤1040px y al imprimir). |

`margen.html`, `figura.html` y `ecuacion.html` todavía no los usa ningún texto: están listos
para escribir con ellos.

### 7.2 Existentes, reestilados

Siguen existiendo con su marcado (varios solo los usa `/desarrollo/`, que no se editó): `encabezado-seccion`,
`insignia-estado` (nuevo parámetro opcional `clase`), `tarjeta-proyecto`, `lista-etiquetas`,
`aviso-borrador` (nuevo parámetro opcional `pagina`: en el layout de la propia página dice si se publica o si
falta `published: false`), `tarjeta-post` (`formato_fecha` ahora es opcional: sin él, fecha en español con
`fecha.html`), `proyecto-destacado`, `meta-proyecto` (sin fila de repositorio), `linea-tiempo`,
`entornos/*`, `enlaces-sociales`, `capa2`, `visualizacion-pendiente`. `.lista-etiquetas` e
`.insignia` se ven como palabras en mono, sin píldora.

### 7.3 Layouts

| Layout | Lo usan | Marcado / front matter |
|---|---|---|
| `default` | todo | esqueleto: `.saltar`, `.contenedor`, `.masthead` (marca + nav), `main#contenido`, `.pie` (Archivo · Etiquetas · Feed, alternador, «© año autor»). La cabecera no lleva encabezado: cada página aporta un `<h1>` (la portada, `.visualmente-oculto`). `aria-current="page"` en el índice de la sección, `"true"` dentro. |
| `page` | `proyectos.md`, `desarrollo.md` | `<article class="articulo {{ voz }}"><h1>`. |
| `seccion` (nuevo) | Mates, Notas, Escritos, Archivo, Etiquetas | `title`, `coleccion`, `grupos` (lista de `{titulo, subseccion}`), `por_anio`, `lista_titulo`, `lista_limite`, `resto_titulo`, `lista: false` (la página escribe sus listas). Lista vacía → «aún sin entradas». |
| `post` | `_mates` | `article.post.articulo.voz-mates`: h1 → meta (fecha · sección · etiquetas · minutos) → aviso «Borrador» (con `draft: true`, solo en local) → índice al margen → cuerpo. Si el contenido trae `.viz-stage`, un oyente `focusin` en el documento desplaza el lienzo hasta mostrar el hito enfocado. |
| `nota` | `_notas` | meta: fecha · género · etiquetas · minutos; aviso «Borrador» (con `draft: true`, solo en local); `description` como resumen. |
| `escrito`, `poema` | `_escritos` | voz de lectura, sin tiempo de lectura ni guiños píxel; `epigrafe`, `epigrafe_fuente`; `***` → «· · ·»; aviso «Borrador» bajo la meta (con `draft: true`, solo en local). |
| `proyecto` | `_proyectos` | voz técnica, ficha al margen, las 8 secciones impersonales (D7). |
| `sobre` (nuevo) | `about.md` | `ciudad` (meta «nombre · ciudad»), `ficha` (ver `ficha-personaje.html`). |

---

## 8. Componentes del sistema → código

| Componente (`sistema/components/`) | Dónde vive |
|---|---|
| Navegacion | `_layouts/default.html`, `_v2-esqueleto` |
| Portada | `index.md`, `_v2-mosaico`, `_ajustes-listas` |
| ArticuloMates | `_layouts/post.html`, `indice-entrada.html`, `margen.html`, `ecuacion.html`, `_v2-articulo`, `_ajustes-mates` |
| NotaMargen | `margen.html`, `_v2-articulo` |
| Figura | `figura.html`, `_v2-figura` |
| Codigo | Markdown + Rouge, `_code`, `_syntax` |
| Poema | `_layouts/poema.html`, `_layouts/escrito.html`, `_ajustes-escritos` |
| FichaProyecto | `_layouts/proyecto.html`, `ficha-proyecto.html` + `meta-proyecto.html`, `_ajustes-proyectos`; la nota técnica en `_layouts/nota.html` |
| IndiceProyectos | `proyectos.md`, `fila-proyecto.html`, `_v2-listas`, `_ajustes-proyectos` |
| ListaPublicaciones | `_layouts/seccion.html`, `fila-publicacion.html`, `tags.md`, `_v2-listas`, `_ajustes-listas` |
| SobreMi | `_layouts/sobre.html`, `about.md`, `hoja.html`, `mapa-intereses.html`, `_data/intereses.yml`, `_v2-sobre`, `_ajustes-sobre` |
| FichaPersonaje | `ficha-personaje.html`, `_v2-sobre`, `_v2-pixel` |
| GuinosPixel | `_v2-pixel` |
| Cover | sin equivalente: es la ilustración de portada del sistema |

Guiños píxel solo en índice, ficha, tiles y listas de Sobre mí/Notas; nunca en cuerpo, títulos,
nav, código ni Escritos. El cursor (`<span class="rotulo cursor">`) está hoy en «En esta entrada»
(posts de Mates), «Últimas» (portada) y «Ahora» (ficha de Sobre mí, solo con datos).

---

## 9. Desviaciones deliberadas respecto al sistema

### 9.1 Por decisión de Santiago (2026-10-31)

| Decisión | El sistema dice | El sitio hace |
|---|---|---|
| D1 tipografía | fuentes de Google en las previews | Literata, Plex Sans, Plex Mono y Silkscreen autoalojadas con `unicode-range` latino (como pide el README del sistema). CLAUDE.md §1 dispensado. |
| D4 ficha de personaje | atributos 0–10 en barras de píxel | sin atributos ni barras (`.stat`/`.barra` no existen; CLAUDE.md §6). Solo hechos del repo: clase, nivel, inventario. |
| D5 cursor | parpadea con periodo `--parpadeo` | 4 ciclos (≈4,4 s) y queda encendido; estático con `prefers-reduced-motion` (WCAG 2.2.2). |
| D7 ficha de proyecto | H2 = las tres preguntas; ficha con stack y código/repo | se conservan las 8 secciones impersonales del layout; sin fila «Código»/repositorio. Campos del modelo de contenido (`estado`, `anio`, `tecnologias`…), no `status`/`year`/`stack`. |
| D8 frases | — | las tres frases protegidas, literales, en el tile «frases» de la portada. |
| D10 placeholders | — | `listar: false` saca de listas, feed, «Últimas», etiquetas y conteos; URL vivas. Lista vacía → «aún sin entradas». |
| D11 chips de Mates | — | etiquetas copiadas al front matter; fila `.post-meta-chips` oculta por CSS. |
| D12 Notas | voz técnica | voz técnica por defecto; `genero: ensayo` → voz de lectura. |
| D14 Sobre mí | ficha y mapa «desde `_data/`» | texto byte-idéntico en intro + 4 `details.hoja`; ficha desde el front matter de `about.md`; mapa desde `_data/intereses.yml` sin las aristas no rastreables. |
| Pie | — | «© {año del build} Santiago Gil Gallego»; Archivo · Etiquetas · Feed; alternador como palabra. |

### 9.2 Adaptaciones al sitio real

| Qué | Motivo |
|---|---|
| Selectores de tema traducidos (§4) | El atributo y sus valores no cambian: scripts de las viz, lectores que ya eligieron claro. |
| Subrayado de enlaces en `tinta-tenue` (no `regla`) | Con `color: inherit` el subrayado es la única señal y `regla` da 1,4:1. Nav, pie, listas, meta y tiles lo quitan, como en el sistema. |
| Desaturación solo en fotos decorativas | No alterar figuras de datos ni médicas. |
| `aria-current="page"` solo en el índice de la sección; `"true"` dentro | Un post no es la página /mates/. |
| Alternador: palabra de destino, sin `aria-pressed` | Un botón no debe cambiar a la vez de nombre y de estado. |
| Sin `color-scheme` | Cambiaría los controles nativos de las nueve visualizaciones. |
| `.lista-vacia`, `.seccion-notas`, `.seccion-sobre`, `.entorno`/`.capa-2` sin caja, `.lista-etiquetas`/`.insignia` como palabras, `mark` en crema | Huecos del sistema que el contenido real necesita, en su lenguaje. |
| `.lista-etiquetas`: «·» como `::after` e interlineado 2 | El punto abría la línea siguiente; objetivos a <24px entre líneas (WCAG 2.5.8). |
| Fechas con `fecha.html` (Liquid) | El sistema pide un filtro que traduzca el mes; sin plugins. |
| `body .post pre.highlight` y cajas de `post.css` (`.two-col > .col`, `.card`, `.analogy-grid .analogy`, tablas) devueltas al sistema; `.viz pre { color: inherit }` | `post.css` forzaba texto oscuro sobre casi negro en claro (1,1:1). |
| `mjx-container[display="true"]` sin `min-width`, desplazable; párrafos con fórmulas en línea largas desplazables (anillo de foco hacia dentro) | MathJax ensanchaba la página en móvil; el `overflow` recortaba el anillo. |
| `.two-col > * { min-width: 0 }`; `.two-col` en columnas CSS cuando empieza por `###`/`####` | Fórmulas desbordaban; sin envoltorio por columna la rejilla repartía en zigzag (también en master). |
| Esa `.two-col` (con encabezados) en flujo normal ≤720px, no en rejilla; en las fichas de proyecto, sus encabezados sin margen superior ≥721px (`_ajustes-proyectos`) | En la rejilla el `gap` se sumaba a los márgenes (párrafo → párrafo 32px, encabezado despegado de su texto); el h3/h4 de la ficha pesaba lo mismo que la regla común y la sección quedaba 26px más abajo que en una nota. |
| Impresión con los colores del tema claro; lienzos de las visualizaciones impresos con su fondo (§4, §3.2) | Sin fondos impresos, el tema oscuro salía en tinta clara sobre blanco y los dibujos de las visualizaciones, claros sobre blanco. |
| Base del lienzo `.viz-stage` y de `.viz-controls` en el sitio, sin peso (`:where()`) | Una entrada de Mates sin `post.css` propio tenía el lienzo transparente con texto claro encima. |
| Títulos de las voces un escalón menores ≤480px | Palabras largas a 40px no caben en 288px. |
| `.articulo > .meta` con 32px debajo y enlaces con subrayado punteado; `.margen p` a 8px | La meta de Notas quedaba en 16px; etiquetas enlazadas indistinguibles; notas de varios párrafos. |
| `figure video` 16:9 solo sin `width`+`height`; img/vídeo al 100% en `.ancho`/`.completo` | Los bucles tipo gif no son 16:9. |
| Leyenda del mapa en mono 13px (no Silkscreen 11px) | Es una frase; en Silkscreen a 11px no se lee. |
| Índice de Mates plegado con 10px arriba | El 0 de la versión píxel pegaba el rótulo al borde. |
| `--lienzo-*` y recoloreado por CSS de textos de las visualizaciones | Estaban por debajo de 4,5:1 sobre el lienzo oscuro (igual en master). |
| SVG de las dos líneas de tiempo con `overflow: visible` + oyente `focusin` en `post.html` | El SVG cortaba el anillo de los hitos; a ≤600px el lienzo no se desplazaba al hito enfocado. |
| Escritos: H2/H3 en tinta y cursiva, `***` como «· · ·», bloque texto + margen desplazado hasta 64px (`_ajustes-escritos`, no en `_v2-articulo`) | Propio de Escritos (el desplazamiento lo pide el README del sistema). Sobre mí comparte la voz pero sus `h2` son rótulos píxel o títulos de hoja y no lleva el desplazamiento. |

---

## 10. Defectos del sistema corregidos

Lo que `bundle.css`/`tokens.css` traen y **no se copió**. Si se vuelve a tomar CSS de `sistema/`,
no reintroducirlo.

| Defecto en el sistema | Consecuencia | Corrección |
|---|---|---|
| `pre .n` coloreado como número | En Rouge `.n` es Name: pintaba de verde cada identificador | Mapa completo de Rouge a tres colores: comentarios `.c .ch .cd .cm .cp .cpf .c1 .cs` → `--codigo-comentario`; palabras `.k .kc .kd .kn .kp .kr .kt .kv .ow` → `--codigo-palabra`; cadenas y números `.s* .dl .m* .il` → `--codigo-cadena`; el resto (incluidos `.n`, `.nb`, `.bp`) en tinta. Envoltorios `div.highlighter-rouge, div.highlight` neutralizados. |
| Sin `:focus-visible` | Foco invisible con teclado | Global: 2px en acento, offset 2px (enlaces, botones, `summary`); tiles del mosaico con `outline-offset: -4px` (los vecinos tapaban el anillo). |
| Nav y pie sin `flex-wrap` | Desbordaban a 320–360px | `flex-wrap` + `row-gap`; gutter 16px ≤480px. |
| Susurro a 0.62 sobre `tinta-tenue` | ≈2,8:1 (y 4,4:1 activo): no pasa AA | `tinta-quieta` a 0.8 en reposo (5,2:1 oscuro · 4,8:1 claro) y 1 activo; también con `:focus-within`. |
| `[data-theme="oscuro"] img { filter: saturate(…) }` | El selector no casa en el sitio, y si casara desaturaría figuras de datos y médicas | Solo `.foto-decorativa`, `.mosaico .foto img`, `.retrato`. |
| Filas del mosaico fijas a 200px | Recortaban contenido | `grid-auto-rows: minmax(var(--mosaico-fila), auto)`; «Últimas» a una columna ≤480px. |
| Listas sin quiebre por debajo de 480px | Filas ilegibles en teléfono | `.lista` a una columna ≤480px. |
| `--texto`/`--ancho` en `ch` sin registrar | Cada hijo resolvía `66ch` con su letra: meta mono estrecha, entrada y H2 metidos en el margen, notas plegadas más estrechas | `@property … <length>`; `.articulo > h1 { max-width: none }` para que el título siga abarcando texto + margen. |
| Pliegue único a 960px | Con las fuentes reales `--ancho` mide 959/1009/1054px: entre 961px y ~1140px el pie de `.encolumna` y el número de `.ecuacion` desbordaban | Pliegue por voz: ≤1040 Escritos, ≤1090 Mates, ≤1140 técnica. |
| `.completo` a 1056px fijos | Desbordaba hasta 1137px de ventana | ≤1140px: `width: auto; max-width: var(--ancho)`. |
| Notas flotantes sin contener | Una nota más alta que el cuerpo salía del artículo | Clearfix `.articulo::after` (no `flow-root`, que cambiaría el margen final en todas las páginas). |
| `.encolumna`/`.ecuacion` sin `clear` | Su pie o número (absolutos al margen) pisaban una nota anterior | `clear: right` dentro de un artículo. |
| `ul.pixel li::before` con sombras en el color del texto | Viñeta bicolor | `color: var(--acento); background: currentColor`. |
| `.rotulo` sin mayúsculas | El README las pide | `text-transform: uppercase`. |
| Rótulos Silkscreen a 11px | En pantallas de densidad 1 la C se cierra y se lee como O («FIOHA DE PERSONAJE», «OLASE»; las vistas previas del sistema muestran «SILKSOREEN», «PASA EL OURSOR»). Pasa a 10 y 11px; a 8, 9, 12 y 13px no, y a densidad 1,25, 1,5 o 2 tampoco | Rótulos Silkscreen a 12px (`_v2-pixel`). Los números Silkscreen siguen a 11px: las cifras no tienen el problema. |
| Rótulo de la nota «analogía» sin `font-style` | La analogía va en cursiva y el rótulo en Plex Mono, que no tiene cursiva cargada: el navegador fabricaba una oblicua | `.articulo .margen .rotulo { font-style: normal }`. |
| Negrita sintética | Solo hay Plex Mono 400/500: Chrome fabricaba negritas falsas en código dentro de `<strong>`, `th` o títulos | `font-synthesis-weight: none` en `pre, code, kbd, samp` (sale la 500 real). |

---

## 11. Marcado heredado aún vivo

| Bloque (`_heredado.scss`) | Lo usa | Nota |
|---|---|---|
| `.posts-grid` | `desarrollo.md` | se queda mientras /desarrollo/ la use |
| `.posts-card` | `tarjeta-post.html` (/desarrollo/) | aspecto v2 (sin caja) en `_ajustes-listas` |
| `body .post .two-col > .col`, `.analogy-grid .analogy`, `table` | los dos posts reales (cajas de `post.css`) | `_ajustes-mates` las lleva al sistema con más peso; esto queda como base |

En `_componentes.scss` quedan reglas muertas (`.tercet`, `.about-profile ~ .two-col`) y reglas
vivas pero sobrescritas desde `_ajustes-proyectos`/`_ajustes-listas`/`_v2-listas`
(`.meta-proyecto`, `.tarjeta-proyecto*`, `.proyecto-destacado*`, `.viz-pendiente*`,
`.aviso-borrador`, `.encabezado-seccion`, `.linea-tiempo`, `.enlaces-sociales`,
`.lista-etiquetas`, `.insignia*`). `.container` ya no existe.

---

## 12. Trampas conocidas

- **Oyentes de foco en SVG.** Chromium vuelve enfocable con el tabulador un elemento SVG con
  oyentes `focusin`/`focusout`/`focus`/`blur`. Los oyentes van en un contenedor HTML o en el
  documento (como en `post.html` y `mapa-intereses.html`).
- **Mayúsculas por CSS en nombres accesibles.** Chrome pasa el `text-transform: uppercase` de
  `.rotulo` al nombre calculado: `aria-labelledby` hacia un rótulo da «EN ESTA ENTRADA». Para
  nombrar una región con un rótulo, `aria-label` en minúscula.
- **Leer el acento desde JS.** `--acento` vive en `body`, no en `<html>`: léelo con
  `getComputedStyle` del contenedor de la figura. Los tokens de color (`--tinta`…) sí están en
  `:root`.
- **Una nota por párrafo.** Dos `aside.margen` seguidos se empujan y el segundo pierde a su párrafo.
- **MathJax** (`head.html`): tex-svg, solo con `math: true`, MML asistivo, recompone al abrir un
  `details`, `beforeprint` abre todos los `details`. No cambiarlo.
- **Contenido nuevo**: probadlo en una copia del worktree, nunca con datos inventados en el repo.

Build de comprobación:

```powershell
$env:JEKYLL_ENV='production'; bundle exec jekyll build --disable-disk-cache --destination <dir>
$env:JEKYLL_ENV='development'; bundle exec jekyll build --disable-disk-cache --destination <dir>
```

Los avisos de deprecación de Sass (`@import`) son normales; un error de Liquid o Sass no.
/desarrollo/ (solo en desarrollo) es el banco de componentes.

---

## 13. Abierto y decisiones pendientes

Comprobado contra el código el 2026-10-31.

### 13.1 Decisiones de contenido para Santiago

- Etiqueta del área `ia`: hoy «Inteligencia artificial» (`meta-proyecto.html`, `proyectos.md`)
  frente a «IA».
- Orden de proyectos: el campo `orden` de `docs/content-model.md` («desempata entre proyectos del
  mismo año») no está implementado; `proyectos.md` ordena por área, año descendente y slug. La
  numeración es continua y cambia al publicar un borrador.
- Ficha de proyecto: ¿fila «Tipo»? (el sistema no la tiene); Año sin «– en curso» cuando no hay
  `anio_fin`; rótulo «Tecnologías» (el sistema dice «stack»); línea de filtros por área sin conteos.
- `bibliografia: [bauer2015]` de `tda-segunet` no se pinta (CLAUDE.md §10: verificar la
  referencia antes de publicarla).
- `alt` de la foto de portada: hoy «Banner de Un Santajaro», no describe la fachada.
- `description` de avances: larga para una línea de lista.
- «aún sin entradas» en lugar del «Próximamente...» de master: confirmar el texto.
- `sitemap: false` para los 9 placeholders `listar: false`: hoy siguen en `sitemap.xml` (ítem aparte).
- Sobre mí: textos escritos en el rediseño (leyenda del mapa, «vecinos: …», rótulos de la ficha),
  nombres de los temas y aristas del mapa (`_data/intereses.yml`); `_data/ahora.yml` solo tiene
  comentarios, así que el bloque «Ahora» no se pinta.

### 13.2 Contradicciones con documentos del repositorio

- **Movimiento automático.** `figura.html` reproduce solo los `.mp4`/`.webm` como bucle tipo gif
  (sin sonido, con controles, quieto con reduced-motion), como pide el componente Figura; y el
  cursor parpadea 4 ciclos (D5, aprobado). `docs/guia-visualizaciones.md` §4 dice «Cero
  autoplay» y la skill `santajaro-frontend` «no inicies movimiento automáticamente». Decidir si
  los bucles cortos son una excepción escrita o si `figura.html` deja de reproducir solo.
- **`figura.html` ya tiene dueño.** La guía de visualizaciones (§3) planea un `figura.html` como
  contenedor de visualización con etiqueta de honestidad; ese nombre lo ocupa ya el include v2 de
  imagen/vídeo. Cuando se construyan los componentes de la guía, otro nombre (p. ej.
  `figura-viz.html`) o ampliar el actual.
- **CLAUDE.md §1** sigue diciendo que la tipografía «se conserva»; la dispensa D1 vale para este
  rediseño. Actualizar la redacción es decisión de Santiago.
- **Skill `santajaro-frontend`** (`docs/skills/`, sin commitear en la copia principal): cita
  parciales retirados y anchos viejos. Ver `skill-frontend.md`.
- `_config.yml` (no editable en la rama) comenta que `section` de Escritos «pasa a "letras" en la
  Fase 7»; D13 fija que no hay /letras/. `docs/content-model.md` describe aún `/letras/` y
  `section: letras` (tabla de decisiones, §1, §2, §8): lleva una nota al principio que lo marca como
  plan descartado; reescribir esas secciones queda para cuando se cierre el rediseño.
- Convención de nombres en `_notas` y `_escritos` (con o sin fecha delante): el nombre del archivo es
  la URL. Las plantillas explican las dos opciones; elegir una es decisión de Santiago.

### 13.3 Fuera de alcance (`assets/posts` no se toca)

- Texto de `convolution-playground.js` encima de la imagen 10×10.
- Rótulos de hitos cercanos que se pisan en `timeline.js` y `ai-winters.js`.
- Diagramas MLP, McCulloch-Pitts, Turing y backprop pequeños en teléfono (se puede aplicar el
  patrón de scroll de las líneas de tiempo).
- El año dentro de una barra **encendida** de `#viz-convergence` a 3,7:1, como en master (ningún
  color de la paleta llega a 4,5:1 sobre ese tono; el mismo año se lee en el eje).
- Colores fuera de paleta `#5cb8ff`/`#ff6b6b` en los JS de fundamentos (y `#5cb8ff` en
  `ai-winters.js`): se mantienen (en fundamentos el texto los llama «azul» y «rojo»).

### 13.4 /desarrollo/ y `_componentes.scss` (no editables en la rama)

- `desarrollo.md` no tiene `math: true`: `$x^2 + y^2 = 1$` sale crudo (preexistente).
- Falta sumar al banco `ficha-proyecto.html` y `fila-proyecto.html`.
- Sus etiquetas de ejemplo enlazan a anclas de `/etiquetas/` que no existen (solo en desarrollo).
- Reglas sin uso en `_componentes.scss`: `.tercet`, `.about-profile ~ .two-col`.
