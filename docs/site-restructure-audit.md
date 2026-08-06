# Auditoría técnica y de contenido — Un Santajaro

Fecha: 2026-08-06
Rama: `restructure/1-auditoria`
Commit base: `691e984`
Tag de retorno: `pre-restructure`

Documento de solo lectura. Ningún archivo del sitio fue modificado para producirlo.

---

## 0. Ubicación real del repositorio

El repositorio git no está en la raíz del directorio de trabajo:

    Desktop/blog/                        (no es un repo)
    └── blog_website/
        ├── CLAUDE.md                    (original)
        └── SggTio.github.io/            <-- REPO GIT
            └── CLAUDE.md                (copia, sin seguimiento)

- Rama por defecto: `master`. No existe `main`.
- Remoto: `origin` → https://github.com/SggTio/SggTio.github.io.git
- El repo es un **fork de `artemsheludko/flexible-jekyll`** (GPL-3.0). El código
  actual ya no es ese tema, pero GitHub sigue mostrando la relación de fork.
- `core.autocrlf` activo: cada commit avisa de conversión LF→CRLF.

---

## TÉCNICO

### 1. Jekyll, tema y gemas

| Qué | Local | Producción |
|---|---|---|
| Jekyll | **4.4.1** (Gemfile: `~> 4.3`) | **3.10.0** (gem `github-pages`) |
| Ruby | 3.3.11 | el de Pages |
| Bundler | 2.5.22 | — |

Verificado en producción con `<meta name="generator" content="Jekyll v3.10.0" />`
en https://sggtio.github.io/ y contra https://pages.github.com/versions/.

**Esta divergencia es el hallazgo técnico más importante de la auditoría.**
El `Gemfile` no incluye el gem `github-pages`, así que nada obliga a que lo que
funciona en local funcione publicado. Ya ocurrió al menos una vez: el commit
`973e577` («fix: where_exp encadenado para compatibilidad con jekyll 3») es
exactamente ese bug.

Gemas declaradas en `Gemfile`:

    jekyll        ~> 4.3
    jekyll-seo-tag
    tzinfo, tzinfo-data   (solo Windows/JRuby)

**Tema:** no hay `remote_theme` ni gem de tema. Todos los layouts son propios,
derivados de [Poole](https://github.com/poole/poole) (MIT, @mdo) con la
adaptación [Dark Poole](https://github.com/chrisanthropic/dark-poole).
`LICENSE.md` declara MIT; el fork padre es GPL-3.0. Conviene aclararlo algún día.

### 2. Plugins y lista blanca

Declarado en `_config.yml`:

| Plugin | ¿Lista blanca de Pages? | Versión en Pages |
|---|---|---|
| `jekyll-seo-tag` | **sí** | 2.8.0 |

Activos implícitamente en el build nativo, sin declarar:

- `jekyll-github-metadata` — **importante**, ver §5 de riesgos
- `jekyll-coffeescript`, `jekyll-commonmark-ghpages`, `jekyll-gist`,
  `jekyll-relative-links`, `jekyll-optional-front-matter`,
  `jekyll-readme-index`, `jekyll-default-layout`, `jekyll-titles-from-headings`

Verificado contra https://pages.github.com/versions/ el 2026-08-06:

| Gem | Estado | Versión |
|---|---|---|
| `jekyll-seo-tag` | en lista | 2.8.0 |
| `jekyll-sitemap` | en lista | 1.4.0 |
| `jekyll-feed` | en lista | 0.17.0 |
| `jekyll-redirect-from` | en lista | 0.16.0 |
| `jekyll-paginate` | en lista | 1.1.0 |
| `jekyll-archives` | **NO** | — |
| `jekyll-scholar` | **NO** | — |

No hay `jekyll-sitemap` ni `jekyll-feed`. El feed existe pero es artesanal
(`atom.xml` escrito a mano). **No hay `sitemap.xml` ni `robots.txt`.**

### 3. Estructura de plantillas

`_layouts/` (6):

| Layout | Padre | Usado por |
|---|---|---|
| `default.html` | — | todos |
| `page.html` | default | Mates, Notas, Escritos, Sobre mí |
| `post.html` | default | colección `mates` (por defaults) |
| `escrito.html` | default | colección `escritos` (por defaults) |
| `nota.html` | default | colección `notas` (por defaults) |
| `poema.html` | default | opt-in por front matter |

`_includes/` (1): `head.html`. **No existe ningún componente reutilizable.**
La estructura de tarjeta de post está copiada literalmente **seis veces** entre
`index.md`, `Mates.md` (×3), `Notas.md` y `Escritos.md`. Es el mayor candidato a
extracción de la Fase 4.

`_sass/` (12 parciales, 982 líneas), importados en orden por `styles.scss`:
`variables, base, type, syntax, code, layout, masthead, posts, pagination,
message, toc, custom`. `_custom.scss` (368 líneas) concentra todo lo específico
del sitio; el resto es Poole casi intacto.

### 4. Colores y tipografías

**Buena noticia: ya están centralizados como CSS custom properties**
en `_sass/_variables.scss`. No hay que extraer casi nada.

Escala de grises (Open Color): `--gray-000: #f8f9fa` … `--gray-900: #212529`.

Dark Poole:

    --dark-poole-001:        hsl(200, 3%, 12%)
    --dark-poole-002:        hsl(0, 0%, 85%)
    --dark-poole-link-color: rgba(255,255,255,0.75)
    --dark-poole-link-hover: #fff

Acentos: `--red #fa5252`, `--pink #e64980`, `--grape #be4bdb`,
`--purple #7950f2`, `--indigo #4c6ef5`, `--blue #228be6`, `--cyan #15aabf`,
`--teal #12b886`, `--green #40c057`, `--yellow #fab005`, `--orange #fd7e14`,
`--blue-300 #74c0fc`, `--blue-400 #4dabf7`, `--yellow-100 #fff3bf`.

Tipografía — **totalmente variabilizada**, un solo punto de definición:

    --body-font: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
                 "Helvetica Neue", Arial, "Noto Sans", sans-serif, …
    --code-font: SFMono-Regular, Menlo, Monaco, Consolas, …
    --body-font-size: 20px
    --body-line-height: 1.5

Escala de encabezados (`_type.scss`): h1 `2rem`, h2 `1.5rem`, h3 `1.25rem`,
h4 `1rem`; todos `font-weight: 600`, `line-height: 1.25`.
`.lead`: `1.25rem` / `300`.

Espaciado: `--spacer: 1rem`, `--spacer-2: 1.5rem`, `--spacer-3: 3rem`.
`--border-radius: 0.25rem`.

**Acentos por sección** (`_custom.scss`, hardcodeados y fuera del sistema de
variables — son los únicos colores de identidad que no viven en `_variables.scss`):

    body.section-inicio, .section-default    → #8d99ab
    body.section-mates                       → #e5d6c7
    body.section-notas                       → #e5d6c7
    body.section-escritos                    → #e5d6c7
    body.section-sobre                       → #95c9a0
    body.section-archivo, .section-etiquetas → #8d99ab

**Grises hardcodeados fuera de variables** (14 apariciones, todos tonos oscuros):

    _custom.scss:   #1e1e1e (×2), #1c1c1c (×2), #444, #fff, #888, #aaa (×2),
                    rgba(0,0,0,0.3), rgba(0,0,0,0.4)
    _masthead.scss: #1f1f1f, rgba(255,255,255,0.15), #fff

Candidatos limpios a variabilizar en la Fase 3 sin cambiar un solo tono.

### 5. Modo oscuro

Hay **tres mecanismos superpuestos**, y solo uno gana:

1. `@media (prefers-color-scheme: dark)` en `_variables.scss` — define un tema
   oscuro completo.
2. `[data-theme="dark-poole"]` — otro tema oscuro, distinto.
3. `_layouts/default.html` línea 2: `<html … data-theme="dark-poole">`,
   **fijo en el marcado**.

Como el atributo está siempre presente, el selector `[data-theme]` gana por
especificidad sobre `:root`, y el bloque `prefers-color-scheme` **nunca tiene
efecto observable**. En la práctica: **el sitio es oscuro siempre**, para todo
el mundo, sin alternador y sin respetar la preferencia del sistema.

Los valores claros (`--body-bg: #fff`, `--body-color: var(--gray-700)`) están
definidos pero son código muerto.

Consecuencia para el rigor de CLAUDE.md §3 («las figuras deben ser legibles en
modo claro y oscuro»): hoy solo existe el oscuro. Decidir si eso es intencional
o si el modo claro debe revivirse es una decisión de diseño pendiente.

**Defecto de contraste relacionado:** `_sass/_syntax.scss` (65 líneas) es la
paleta Pygments **clara** completa — `#069` para keywords, `#999` para
comentarios, `#555` para operadores — aplicada sobre `--code-bg: var(--gray-900)`
(`#212529`). Todo el resaltado de sintaxis del sitio tiene contraste
insuficiente. No es un problema hoy porque ningún post publicado usa bloques de
código resaltados, pero lo será en cuanto los uses.

### 6. LaTeX

**MathJax 3**, salida **SVG**, desde CDN, en `_includes/head.html`:

    https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js   (async)

Cargado condicionalmente con `{% if page.math %}` — correcto, solo en páginas
que lo declaran. Configuración: `inlineMath` `$…$` y `\(…\)`, `displayMath`
`$$…$$` y `\[…\]`, `processEscapes: true`, `svg.fontCache: 'global'`.

Dos observaciones frente a CLAUDE.md §7 («MathJax con salida accesible activada»):

- **`enableAssistiveMml` no está configurado.** Con salida SVG y sin MathML
  asistivo, un lector de pantalla no lee las fórmulas.
- La charla `laplacianos_tumores.html` carga **su propia** instancia de MathJax
  con salida `chtml` y delimitadores distintos (solo `\(…\)` y `\[…\]`, sin
  `$…$`). Son dos configuraciones de LaTeX incompatibles conviviendo en el sitio.

### 7. Despliegue

**Build nativo de GitHub Pages.** Confirmado por triple vía:

- no existe `.github/` ni ningún workflow en el repo;
- `has_pages: true` en la API del repositorio;
- el HTML servido declara `Jekyll v3.10.0`, la versión del gem `github-pages`,
  no la del `Gemfile`.

Rama de publicación: `master`. Dominio: `sggtio.github.io`, sin `CNAME`.

### 8. Scripts, linters, tests

**No hay ninguno.** Sin CI, sin linter, sin tests, sin `htmlproofer`, sin
verificación de enlaces. `.editorconfig` existe (2 espacios, LF, UTF-8).
El README documenta `bundle exec jekyll serve --livereload`.

Dos archivos de log de un servidor de pruebas quedaron en el árbol
(`tmp_http_server.log`, `tmp_http_server.err.log`); están cubiertos por
`.gitignore` (`*.log`) pero **el build los copia a la salida**.

---

## CONTENIDO

### 9. Inventario de URLs

Build local verificado el 2026-08-06 (destino temporal, fuera del repo).

**Vivas hoy en producción** (lo que hay en `origin/master`):

    /
    /mates/
    /notas/
    /escritos/
    /sobre/
    /archivo/                                        (no enlazada desde la nav)
    /etiquetas/                                      (no enlazada desde la nav)
    /404.html
    /atom.xml
    /styles.css
    /mates/2026-04-14-fundamentos-redes-neuronales/
    /mates/charlas/laplacianos_tumores/
    /mates/file1/            /mates/file2/
    /notas/file1/            /notas/file2/
    /escritos/file1/         /escritos/file2/
    /assets/home-banner.jpg
    /assets/profile.jpg
    /assets/favicon.ico
    /assets/favicon______.ico
    /assets/apple-touch-icon-precomposed.png
    /assets/posts/fundamentos-redes-neuronales/{post.css,mcculloch-pitts.js,
        mlp.js,perceptron.js,timeline.js,turing.js}
    /assets/geo-comp/reporte-grafo-dual.html
    /assets/tg/neurons_1.html
    /assets/tg/reporte_experimento3.html

**Se añadirán al hacer push del commit `691e984`:**

    /mates/2026-04-15-avances-redes-neuronales/
    /escritos/plantilla-cuento/      <-- plantilla de desarrollo, pública
    /escritos/plantilla-poema/       <-- plantilla de desarrollo, pública
    /notas/plantilla-nota/           <-- plantilla de desarrollo, pública
    /assets/posts/avances-redes-neuronales/{post.css,ai-winters.js}
    /CLAUDE.md                       <-- reglas de trabajo, públicas
    /styles.css.map

Total tras el push: **22 páginas HTML** + assets.

### 10. Tabla de contenido

| Ruta | Título | Fecha | Real/placeholder | Categoría | Mates | Figuras |
|---|---|---|---|---|---|---|
| `_mates/2026-04-14-fundamentos-redes-neuronales.md` | Los cimientos de la inteligencia artificial: de la neurona lógica al MLP | 2026-04-14 | **real** (472 líneas) | mates / redes-neuronales | sí | 6 visualizaciones JS |
| `_mates/2026-04-15-avances-redes-neuronales.md` | Avances de las redes neuronales: del invierno al amanecer del deep learning | 2026-04-15 | **real** (352 líneas) | mates / redes-neuronales | sí | 4 declaradas, **1 existe** |
| `_mates/charlas/laplacianos_tumores.html` | Laplacianos en biología de tumores | 2026-07-12 | **real** (3258 líneas) | mates / charlas | sí (MathJax propio) | sí, incrustadas |
| `_mates/file1.md` | Un ensayo de prueba | 2025-01-01 | placeholder | mates | no | no |
| `_mates/file2.md` | otro ensayo de prueba | 2025-02-02 | placeholder | mates | no | no |
| `_notas/file1.md` | Un ensayo de prueba | 2025-01-01 | placeholder | notas | no | no |
| `_notas/file2.md` | otro ensayo de prueba | 2025-02-02 | placeholder | notas | no | no |
| `_escritos/file1.md` | Un ensayo de prueba | 2024-01-01 | placeholder | escritos | no | no |
| `_escritos/file2.md` | otro ensayo de prueba | 2024-02-02 | placeholder | escritos | no | no |
| `_escritos/plantilla-cuento.md` | Plantilla de cuento | 2026-01-01 | **plantilla de desarrollo** | escritos | no | no |
| `_escritos/plantilla-poema.md` | Plantilla de poema | 2026-01-01 | **plantilla de desarrollo** | escritos | no | no |
| `_notas/plantilla-nota.md` | Plantilla de nota | 2026-01-01 | **plantilla de desarrollo** | notas | no | no |

**Contenido real: 3 piezas.** Todo lo demás es andamiaje.

Las tres plantillas se comportan como contenido publicado: aparecen en la
portada, en las páginas de sección, en `/archivo/` y en el feed Atom.
Verificado en el build.

Las secciones de `Mates.md` («Geometría Computacional», «Charlas», «Otras
notas») dependen de `subsection`, un campo que solo usan los tres posts reales.
«Geometría Computacional» renderiza «Próximamente…» — está vacía.

### 11. Assets

**Referenciados y presentes (12):** `home-banner.jpg`, `profile.jpg`,
`favicon.ico`, `apple-touch-icon-precomposed.png`, y los 6 JS + `post.css` de
`fundamentos-redes-neuronales`, más `ai-winters.js` y `post.css` de
`avances-redes-neuronales`.

**Referenciados y AUSENTES (3) — enlaces rotos:**

    assets/posts/avances-redes-neuronales/backprop-explorer.js
    assets/posts/avances-redes-neuronales/convolution-playground.js
    assets/posts/avances-redes-neuronales/convergence-dashboard.js

Declarados en las líneas 350-352 de `_mates/2026-04-15-avances-redes-neuronales.md`.
El post cargará tres `<script>` que darán 404 y tres visualizaciones no
aparecerán. **Está dentro del commit `691e984`.**

**Huérfanos (4)** — presentes, servidos, sin ningún enlace entrante:

    assets/favicon______.ico                  (1 KB, nombre accidental)
    assets/geo-comp/reporte-grafo-dual.html
    assets/tg/neurons_1.html
    assets/tg/reporte_experimento3.html

Los tres HTML provienen de los commits `6b1e706` («despliegue de geo comp») y
`3ef9f28` («despliegue reporte»). Son reportes reales, accesibles por URL
directa, invisibles desde la navegación. Candidatos a convertirse en proyectos
en la Fase 5 — **no eliminar sin decisión explícita**.

---

## 12. DECISIÓN CRÍTICA — build nativo vs. GitHub Actions

### Lo que quieres construir

a. Páginas de categoría (7 categorías, conjunto cerrado)
b. Páginas de etiqueta (conjunto abierto, crece con cada post)
c. Páginas de serie (7 series iniciales, conjunto casi cerrado)
d. Bibliografía con citas

### ¿Es alcanzable en safe mode con Liquid puro?

**Sí, las cuatro.** Y hay prueba en el propio repo: `tags.md` ya agrega
etiquetas con Liquid puro (`where_exp` + `push`), y `archive.md` ya agrupa por
mes con `group_by_exp`. Funciona hoy, en Jekyll 3.10, sin plugins.

El único límite real de safe mode: **Liquid no puede crear archivos.** Puede
agregar y renderizar, pero no generar una página por término en su propia URL.

| Necesidad | Safe mode | Coste real |
|---|---|---|
| Categorías (7, cerrado) | archivo stub por categoría | 7 archivos, una vez |
| Series (7, casi cerrado) | colección `_series`, un archivo por serie | ninguno — la serie necesita descripción propia de todos modos |
| Etiquetas (abierto) | `/etiquetas/` con anclas (ya existe) **o** un stub por etiqueta | **aquí está la fricción** |
| Bibliografía | `_data/bibliografia.yml` + include | ninguno — `jekyll-scholar` aporta BibTeX y CSL, que no necesitas si escribes YAML |

Las series, de hecho, **quedan mejor como colección** que con `jekyll-archives`:
una serie tiene título, descripción, orden y estado propios. Un archivo por
serie no es deuda, es el modelo correcto.

La fricción está solo en (b): cada etiqueta nueva con URL propia exige un stub
de tres líneas. Con `/etiquetas/#topologia` ya funcionando, la pregunta es si
necesitas `/etiquetas/topologia/` de verdad.

### El argumento que no es sobre plugins

**Hoy tu local y tu producción son dos Jekyll distintos: 4.4.1 contra 3.10.0.**
Nada te avisa cuando escribes algo que funciona en uno y no en el otro. Ya te
pasó una vez (`973e577`). A medida que las plantillas se compliquen —y la
Fase 4 las va a complicar— esa divergencia produce bugs que solo ves publicado.

Ese, y no la taxonomía, es el motivo serio para considerar Actions.

### Opción A — Seguir con el build nativo

**Ganas:** cero infraestructura; despliegue que ya funciona; imposible romper el
pipeline; CLAUDE.md §4 satisfecho por defecto.

**Cuestas:** un stub por etiqueta con URL propia; sin `jekyll-scholar`
(irrelevante si escribes YAML); atado a Jekyll 3.10 mientras Jekyll 4 es el
presente; el `Gemfile` sigue mintiendo salvo que lo alinees a `github-pages`.

**Riesgo:** bajo hoy, **creciente**. La divergencia de versiones sigue ahí y
empeora con cada plantilla nueva.

**Trabajo:** ~0 h para seguir; ~1 h si alineas el `Gemfile` al gem `github-pages`
(recomendado si eliges A — hace que local sea igual a producción, al precio de
volver a Jekyll 3.10 en local).

### Opción B — Migrar a GitHub Actions

**Ganas:** local == producción, de verdad; Jekyll 4.x; cualquier plugin
(`jekyll-archives` genera categorías, etiquetas y series solo); un sitio donde
correr `htmlproofer` y detectar los tres scripts que faltan **antes** de
publicar; Sass moderno sin avisos de deprecación.

**Cuestas:** un workflow que mantener; cambiar el origen de Pages en los ajustes
del repo; minutos de Actions (gratis en repos públicos); una dependencia rota
puede bloquear el despliegue; CLAUDE.md §4 exige tu decisión explícita — esto
es esa decisión.

**Riesgo:** moderado y **reversible**. Volver a nativo es cambiar un
desplegable en Settings → Pages. El riesgo real no es la migración, es la
deriva de dependencias a lo largo de los años.

**Trabajo:** ~2-3 h. Workflow, alinear el `Gemfile`, primer despliegue,
verificar las 22 URLs.

### Recomendación

**Opción B, migrar a Actions** — pero por la razón correcta.

No la recomiendo por los plugins: safe mode cubre las cuatro necesidades, y para
series el enfoque sin plugin es incluso mejor. La recomiendo porque **la
divergencia 4.4.1 / 3.10.0 es un generador de bugs silenciosos**, y las ocho
fases que vienen consisten precisamente en escribir Liquid complejo. Descubrir
en producción que una plantilla no compila en Jekyll 3, después de aprobarla
en local, es el peor modo de fallo posible para este proyecto.

Añadido: Actions te da un sitio donde correr un verificador de enlaces. Los tres
scripts ausentes del §11 habrían saltado en CI.

**Si prefieres la Opción A** —y es defendible, minimiza piezas móviles— entonces
alinear el `Gemfile` al gem `github-pages` **no es opcional**. Sin eso, sigues
desarrollando contra un Jekyll que no es el tuyo.

Lo que **no** recomiendo: quedarte en nativo y dejar el `Gemfile` como está.
Es el statu quo, y es la única alternativa sin defensa.

*No se ha implementado ninguna de las dos.*

---

## 13. Riesgos

### Irrecuperable si se pierde

- `_mates/charlas/laplacianos_tumores.html` — 3258 líneas autocontenidas,
  escritas a mano. **Sin fuente fuera del repo.** El activo más valioso y frágil.
- Los 6 JS de `fundamentos-redes-neuronales` — visualizaciones hechas a mano.
- `_mates/2026-04-15-avances-redes-neuronales.md` — 352 líneas.
- `assets/geo-comp/` y `assets/tg/` — reportes de experimentos sin fuente
  visible en el repo.

Todo está a salvo bajo el tag `pre-restructure`.

### Rutas frágiles

| Ruta | Por qué |
|---|---|
| `/mates/charlas/laplacianos_tumores/` | `permalink` explícito + `layout: none`. **Ignora todo el sistema de plantillas.** Cualquier cambio global de diseño no la toca; cualquier cambio de rutas la rompe. |
| `/mates/:name/` | `:name` incluye la fecha del nombre de archivo. Renombrar un archivo cambia su URL. |
| `/archivo/`, `/etiquetas/` | vivas pero no enlazadas: fáciles de romper sin notarlo. |
| `/assets/tg/`, `/assets/geo-comp/` | HTML servido como asset estático; ningún enlace entrante que avise si se rompen. |

### Se puede romper en las fases siguientes

1. **`where_exp` encadenado y filtros de Liquid 4** — ya rompió una vez en
   Jekyll 3. Bloquea hasta resolver §12.
2. **Cambiar los `defaults` de colecciones** altera el layout de todo el
   contenido existente a la vez.
3. **`section:` es el eje de todo** — nav activa, color de acento y CSS de
   layout dependen de ese único campo. Renombrar una sección toca `_config.yml`,
   `_custom.scss` y el front matter de cada archivo.
4. **`data-theme="dark-poole"` fijo en el marcado** — quien intente arreglar
   `prefers-color-scheme` sin quitar ese atributo no verá ningún efecto.
5. **`--accent-color` sin valor por defecto en `:root`.** Una sección nueva sin
   entrada en `_custom.scss` deja enlaces y encabezados sin color declarado.

### Fugas a producción — hallazgos accionables ya

| # | Qué | Efecto |
|---|---|---|
| F1 | 3 scripts ausentes en `avances-redes-neuronales` | 3 × 404, 3 visualizaciones muertas |
| F2 | `CLAUDE.md` sin excluir | se publicará en `/CLAUDE.md` al hacer push |
| F3 | 3 `plantilla-*` publicadas | aparecen en portada, secciones, archivo y feed |
| F4 | 6 placeholders `file1`/`file2` | ocupan la portada y el feed |
| F5 | `tmp_http_server*.log` copiados al build | ruido, sin daño |
| F6 | Sin `sitemap.xml` ni `robots.txt` | peor indexación |
| F7 | `site.description` viene del campo *About* del repo | ver abajo |
| F8 | `_syntax.scss` claro sobre fondo oscuro | contraste insuficiente en código |
| F9 | MathJax SVG sin MathML asistivo | fórmulas ilegibles para lectores de pantalla |
| F10 | `docs/` sin excluir | este mismo documento se publicaría; ver abajo |

**Sobre F7 — corrige la premisa de la Fase 3 del plan.**
`_config.yml` **no tiene** clave `description`. Existió, y fue borrada. Sin
embargo, en producción se sirve:

    <meta name="description" content="una página de divulgación de políticas de
    tecnología, IA y cultura en colombia. A modo de blog." />

El texto no está en el repositorio: es la **descripción «About» del repositorio
en GitHub**, que `jekyll-github-metadata` inyecta en `site.description` cuando
`_config.yml` no la define. Consecuencias:

- Añadir `description:` a `_config.yml` **sí** arregla el sitio (tiene
  precedencia), pero **no** cambia lo que se lee en github.com/SggTio.
- Arreglarlo del todo son dos acciones, y una es fuera del repo.
- Ese mismo mecanismo inyecta más metadatos del repo en el sitio, sin que nada
  en el código lo indique.

**Sobre F10 — afecta a este documento.**
`_config.yml` no excluye `docs/`. Como el plan crea `docs/site-restructure-audit.md`,
`docs/content-model.md`, `docs/guia-rigor-divulgacion.md` y
`docs/content-backlog.md`, todos ellos se publicarían:

- en local (Jekyll 4, sin `jekyll-optional-front-matter`) se copian tal cual a
  `/docs/*.md`;
- en producción (Pages, con `jekyll-optional-front-matter` activo) se renderizan
  como páginas HTML en `/docs/*.html`.

Añadir `docs` a `exclude` es trabajo de la Fase 3, junto con F2 y F5.

---

## Preguntas antes de la Fase 2

**Bloqueantes**

1. **§12: ¿Opción A o B?** Todo el modelo de información depende de esto.
   Si A, ¿alineamos el `Gemfile` al gem `github-pages`?
2. **F1: los tres scripts ausentes.** ¿Existen en otro sitio, están a medio
   escribir, o hay que quitar sus `<script>`? Es contenido tuyo; no lo toco.
3. **Modo claro.** Hoy el sitio es oscuro siempre y el modo claro es código
   muerto. ¿Lo dejamos así, revivimos `prefers-color-scheme`, o añadimos
   alternador? Condiciona las figuras y el arreglo de `_syntax.scss`.
4. **Etiquetas: ¿URL propia por etiqueta, o basta `/etiquetas/#tag`?**
   Es la única fricción real de safe mode.

**Necesarias, no bloqueantes**

5. **F2:** ¿excluyo `CLAUDE.md` del build, o quieres que sea público?
6. **F3:** las tres `plantilla-*`, ¿`draft`, excluidas, o movidas fuera de las
   colecciones?
7. **F7:** ¿cambias tú la descripción «About» en GitHub? Yo no toco ajustes del
   repositorio.
8. **`/archivo/` y `/etiquetas/`** no están en la navegación. ¿Entran, o siguen
   ocultas?
9. **`assets/tg/` y `assets/geo-comp/`:** ¿son proyectos de la Fase 5, o
   material retirado?
10. **La charla `laplacianos_tumores`** ignora el sistema de plantillas.
    ¿Se queda tal cual —defendible, es una pieza autónoma— o se integra?
11. **Licencia:** `LICENSE.md` dice MIT (Poole); el fork padre es GPL-3.0.
    ¿Lo aclaramos?
