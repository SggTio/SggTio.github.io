# Modelo de información — Un Santajaro

Fecha: 2026-08-06
Fase 2. Documento de diseño: no implementa nada.
Depende de `docs/site-restructure-audit.md`.

## Decisiones que lo sustentan

| Decisión | Valor | Cuándo |
|---|---|---|
| Build | **GitHub Actions**, Jekyll 4.x | Fase 1 |
| Tema | **dual claro/oscuro** | Fase 1 |
| Estructura de lo escrito | **tres colecciones reencuadradas** | Fase 2 |
| Taxonomía | **dos ejes**: área y género | Fase 2 |
| Notas | **notas y ensayos**, dos géneros bajo un techo | Fase 2 |
| Lo literario | se muda a **`/letras/`**, rótulo **Letras** | Fase 2 |
| Áreas | **tres** en taxonomía; las cinco de portada son otra cosa | Fase 2 |

Que el build pase a Actions levanta la restricción de safe mode: `jekyll-archives`
y `jekyll-redirect-from` están disponibles. El modelo los usa donde aportan y
prescinde de ellos donde el enfoque sin plugin es mejor.

---

## 1. NAVEGACIÓN

### El conflicto de `/escritos/`

El modelo C conserva las tres colecciones. Pero la navegación objetivo pide una
entrada llamada **Escritos**, y `/escritos/` **ya estaba ocupada** por la
colección literaria. No pueden ser la misma cosa: una es un contenedor de tres
espacios y la otra es uno de esos tres.

Dato que lo desbloquea, del §10 de la auditoría: **`/escritos/` no tenía una sola
pieza de contenido real.** Sus cinco documentos son dos placeholders y tres
plantillas de desarrollo. Era la única de las tres colecciones que se podía mover
sin tocar nada que importe.

**Resolución:** `/escritos/` pasa a ser la página que agrupa los tres espacios.
Lo literario se muda a `/letras/`.

Nadie pierde una URL: `/escritos/` sigue respondiendo, y mejor que antes.

### Navegación principal — cinco entradas

    Inicio · Proyectos · Investigación · Escritos · Sobre mí

Cinco entradas es lo que soporta un masthead de texto sin envolverse en móvil.

### Escritos como página concentradora

`/escritos/` presenta los tres espacios y lo más reciente de cada uno:

| Espacio | Ruta | Qué contiene | Colección |
|---|---|---|---|
| **Mates** | `/mates/` | escritura técnica: matemáticas, computación, IA, charlas | `_mates` |
| **Notas** | `/notas/` | notas cortas y ensayos largos | `_notas` |
| **Letras** | `/letras/` | cuentos y poemas | `_escritos` |

El nombre de carpeta `_escritos` se mantiene aunque publique en `/letras/`.
Renombrar la carpeta rompería el historial de git de esos archivos sin ganar nada.

### Sobre los rótulos

- **Mates** se queda. Es informal, sí, pero es de Santiago, la ruta lleva años
  viva y es donde vive todo el contenido real. Cambiarlo por «Matemáticas» sería
  más correcto y menos verdadero.
- **Notas** se queda. Su página ya declara qué es.
- **Letras** para lo literario. «Escritos» quedó inutilizable como rótulo de este
  espacio porque ahora nombra al conjunto.

### Navegación secundaria

En el pie, no en el masthead:

    Ahora · CV · Archivo · Etiquetas · Feed

`/archivo/` y `/etiquetas/` existen hoy y no están enlazadas desde ningún sitio
(§9 de la auditoría). El pie las rescata sin cargar la navegación principal.

`/ahora/` y `/cv/` se enlazan además desde *Sobre mí*, con presencia visible.

### Qué pasa con Mates y Notas — justificación

**Mates sobrevive como espacio propio, con su ruta intacta.** Tres razones:

1. Es donde está el 100% del contenido real del sitio.
2. La charla `laplacianos_tumores` tiene `permalink` fijo bajo `/mates/charlas/`
   y `layout: none`. Es la pieza más frágil del repositorio (§13) y la que menos
   conviene tocar.
3. `/mates/2026-04-14-fundamentos-redes-neuronales/` está enlazada **desde dentro
   del cuerpo** del post de avances. Moverla rompe un enlace interno que ningún
   sistema de redirección detecta como roto.

**Notas sobrevive con contenido nuevo, no con el actual.** Sus dos placeholders
se retiran en la Fase 7 como ítem aprobable aparte. Lo que se conserva es la
página: el epígrafe de Zurita, «Política, retazos e ideas vagas» y la línea del
lema de Yoneda. Esa página describe una intención que todavía no tiene textos
debajo; el modelo le da dos géneros — `nota` y `ensayo` — para llenarla.

---

## 2. COLECCIONES

### Existentes, reencuadradas

| Colección | Ruta de salida | Layout por defecto | Cambio |
|---|---|---|---|
| `_mates` | `/mates/:name/` | `post` | ninguno |
| `_notas` | `/notas/:name/` | `nota` | ninguno |
| `_escritos` | **`/letras/:name/`** | `escrito` | cambia el permalink |

### Nuevas

| Colección | Ruta de salida | Layout | Para qué |
|---|---|---|---|
| `_proyectos` | `/proyectos/:name/` | `proyecto` | fichas de proyecto |
| `_investigacion` | `/investigacion/:name/` | `linea-investigacion` | líneas de investigación |
| `_series` | `/series/:name/` | `serie` | índice y descripción de cada serie |

`_series` como colección, no como generación automática: una serie tiene título,
descripción, estado y orden propios. Un archivo por serie no es deuda, es el sitio
donde vive esa información.

### Defaults

```yaml
defaults:
  - scope: { path: "", type: "mates" }
    values:
      section: mates
      layout: post
      area: matematicas
      genero: articulo
      nivel: intermedio

  - scope: { path: "", type: "notas" }
    values:
      section: notas
      layout: nota
      genero: nota
      nivel: divulgativo

  - scope: { path: "", type: "escritos" }
    values:
      section: letras
      layout: escrito
      genero: cuento

  - scope: { path: "", type: "proyectos" }
    values:
      section: proyectos
      layout: proyecto
      estado: en-desarrollo
      draft: true          # nace en borrador, se publica a mano

  - scope: { path: "", type: "investigacion" }
    values:
      section: investigacion
      layout: linea-investigacion

  - scope: { path: "", type: "series" }
    values:
      section: escritos
      layout: serie
```

Dos apuntes:

- `section` sigue siendo el eje del color de acento y de la navegación activa
  (§13.3 de la auditoría). `_escritos` declara `section: letras`, lo que exige
  una entrada `body.section-letras` en el CSS. Sin ella, esas páginas se quedan
  sin `--accent-color` — el fallo descrito en §13.5.
- `draft: true` por defecto en proyectos es deliberado: cumple la regla de
  CLAUDE.md §2 de que ningún `TODO(santiago)` llegue a producción. Un proyecto
  se publica cuando Santiago quita la marca, no por olvido.

---

## 3. ESQUEMA DE PROYECTO

### Colisión con Jekyll — resuelta

La especificación original pedía `titulo` y `resumen`. **Jekyll y
`jekyll-seo-tag` esperan `title` y `description`.** Con los nombres en español:

- `jekyll-seo-tag` emitiría `<title>` y `<meta description>` vacíos en cada
  proyecto;
- `page.title` estaría vacío en cualquier plantilla genérica;
- el feed y el sitemap perderían el título.

**Decisión:** `title` y `description` en inglés, por ser interfaz del framework,
y **todo lo demás en español**, por ser de Santiago. Es la frontera natural: lo
que lee Jekyll va en su idioma, lo que lee Santiago va en el suyo.

`resumen` sí existe, pero separado de `description`: uno es el gancho de una
frase para tarjetas y buscadores, otro es el párrafo narrativo de apertura.

### Campos

**Obligatorios**

| Campo | Tipo | Notas |
|---|---|---|
| `title` | string | interfaz de Jekyll |
| `description` | string | ≤ 160 car. Tarjetas, SEO, Open Graph |
| `anio` | int | año de inicio; ordena el índice |
| `estado` | enum | `idea` `en-desarrollo` `activo` `terminado` `archivado` |
| `tipo` | enum | `investigacion` `software` `experimento` `visualizacion` `infraestructura` `divulgacion` |
| `area` | enum | `matematicas` `ciencias-computacionales` `ia` |
| `autoria` | string | **quién hizo el proyecto.** Se renderiza bajo el título, nunca en un pie de nota |

**Narrativos — opcionales, y su ausencia oculta la sección**

| Campo | Tipo | Pregunta que responde |
|---|---|---|
| `resumen` | markdown | ¿De qué va esto, en un párrafo? |
| `problema` | markdown | ¿Qué problema existe en el mundo? |
| `motivacion` | markdown | ¿Por qué es interesante? |
| `contribucion` | markdown | ¿Qué hizo **Santiago**? |
| `enfoque_matematico` | markdown | ¿Qué matemáticas usa? |
| `enfoque_computacional` | markdown | ¿Cómo se implementó? |
| `resultados` | markdown | ¿Qué se obtuvo? |
| `limitaciones` | markdown | ¿Qué no funciona? |
| `aprendizajes` | markdown | ¿Qué se aprendió? |
| `proximos_pasos` | markdown | ¿Qué falta? |

Ningún campo narrativo es obligatorio y **las secciones vacías no se renderizan**.
Un proyecto con solo `problema` y `contribucion` produce una página honesta y
corta, no una llena de encabezados huecos.

**Estructurados — opcionales**

```yaml
tecnologias: [Python, PyTorch, CGAL, C++]

anio_fin: 2026            # ausente = en curso

enlaces:
  repo: https://github.com/…
  demo: https://…
  publicacion: https://doi.org/…
  paper: https://arxiv.org/abs/…

imagenes:
  - src: /assets/proyectos/<slug>/portada.svg
    alt: "descripción de qué muestra, no 'figura 1'"
    caption: "opcional"
    principal: true       # la que va en la tarjeta

investigacion: [geometria-aprendizaje]   # slugs de _investigacion
escritos_relacionados: [2026-04-14-fundamentos-redes-neuronales]

nota_autoria: "…"         # frase entera cuando hace falta delimitar quién hizo qué
dominio: ["Imágenes médicas", "Topología aplicada"]   # texto legible, no slugs

destacado: false          # true ⇒ candidato a portada
draft: true               # true ⇒ aviso en desarrollo, filtrado en listados
published: false          # Jekyll: la página NO se genera. Garantía dura.
orden: 0                  # desempata entre proyectos del mismo año

visualizaciones:          # plan visual; se construyen en una fase posterior
  - id: viz-algo
    titulo: "…"
    seccion: problema     # dónde se ancla, ver más abajo
    tipo: interactiva     # interactiva | figura | animacion
    estado: pendiente     # pendiente | hecha
    que_muestra: |
      Descripción en markdown.
    ensena: "Una frase: qué debe entender el lector al verla."
```

### Trampa: Liquid NO se evalúa dentro del front matter

Jekyll procesa Liquid en el **cuerpo** del documento, no en los valores YAML.
Un `{{ '/ruta/' | relative_url }}` escrito dentro de un campo como `motivacion`
o `resultados` **se imprime literalmente** en la página.

Como este sitio tiene `baseurl: ""`, la solución es escribir la ruta absoluta
tal cual: `[texto](/proyectos/slug/)`. Si algún día hubiera `baseurl`, habría
que revisar todos esos enlaces.

Lo mismo aplicará a `_data/cv.yml` y `_data/ahora.yml` en la Fase 8.

### `draft` y `published`: dos interruptores, a propósito

`draft` es campo nuestro: lo leen las plantillas para pintar el aviso y filtrar
listados. **Jekyll lo ignora**, así que por sí solo no impide que la página se
genere con sus `TODO(santiago)` dentro.

`published: false` sí es de Jekyll: la página no existe. Es la garantía dura de
CLAUDE.md §2. Ambos están en los defaults de la colección; para revisar las
fichas en local, `bundle exec jekyll serve --unpublished`.

### Visualizaciones pendientes

El campo `visualizaciones` declara el plan visual antes de que exista el
código. En desarrollo, `_includes/visualizacion-pendiente.html` pinta un
recuadro punteado en el punto exacto donde irá cada una, con su descripción.
En producción no aparece nada.

Anclas disponibles en `seccion`: `problema`, `motivacion`, `contribucion`,
`enfoque_matematico`, `enfoque_computacional`, `resultados`, `limitaciones`,
`aprendizajes`, `proximos_pasos`.

### Reglas

- `alt` obligatorio en toda imagen (CLAUDE.md §7).
- Ningún dato que no exista: `TODO(santiago): <qué falta>` y al
  `docs/content-backlog.md`. Nada de métricas, fechas ni enlaces inventados
  (CLAUDE.md §2).
- `destacado: true` no publica: solo marca. Un proyecto con `draft: true` y
  `destacado: true` **no** aparece en la portada.

---

## 4. ESQUEMA DE LÍNEA DE INVESTIGACIÓN

Una línea de investigación es más duradera que un proyecto y más concreta que un
interés. Agrupa proyectos, escritos y preguntas.

```yaml
title: "Geometría, topología y aprendizaje automático"
description: "…"          # ≤ 160 car.
slug: geometria-aprendizaje
estado: activa            # activa | latente | cerrada
desde: 2024

resumen: |
  Párrafo de apertura, en markdown.

preguntas_abiertas:
  - pregunta: "¿…?"
    estado: abierta       # abierta | en-progreso | respondida
    notas: "opcional"

metodos: [homología persistente, laplacianos, curvatura discreta]

repositorios:
  - nombre: tda-segunet
    url: https://github.com/…
    descripcion: "…"

referencias: [lee2018, carlsson2009]     # claves de _data/bibliografia.yml

destacada: false
draft: false
orden: 1
```

### Enlace bidireccional sin duplicar el dato

La Fase 6 pide que proyecto y línea se enlacen en ambos sentidos **sin escribir
la relación dos veces**.

**El dato vive en un solo lugar: el proyecto.** El proyecto declara
`investigacion: [slug, …]`. La línea **no** declara sus proyectos: los deduce.

```liquid
{% assign mios = site.proyectos
   | where_exp: "p", "p.investigacion contains page.slug" %}
```

Lo mismo para escritos: el post declara `investigacion:`, la línea consulta.

El dato vive en el proyecto y no en la línea porque los proyectos son muchos y
cambian; las líneas son pocas y estables. Al crear un proyecto se declara su
línea una vez y nunca hay que volver a editar la línea.

**Las preguntas abiertas son de Santiago.** Si no las aporta, van como
`TODO(santiago)` y al backlog. No se inventan (CLAUDE.md §2).

---

## 5. ESQUEMA DE POST

### Compatibilidad con la skill de divulgación

La skill `science-outreach-blog` produce:

```yaml
layout: post
title: "..."
date: YYYY-MM-DD
categories: [...]
tags: [...]
math: true
```

**Este archivo debe funcionar tal cual, sin editarlo.** Se logra así:

| Campo de la skill | Trato |
|---|---|
| `layout: post` | válido; los defaults lo confirman |
| `title`, `date` | nativos de Jekyll |
| `tags` | eje de etiquetas, sin cambios |
| `math: true` | ya funciona (§6 de la auditoría) |
| `categories` | **se conserva y se usa como respaldo**, ver abajo |

`categories` no se elimina ni se ignora. Se usa como fuente de `area` cuando
`area` no está declarada:

    area efectiva = page.area
                 || (primer valor de page.categories que sea un área conocida)
                 || el default de la colección

Así, un post que llega de la skill con `categories: [matematicas]` obtiene
`area: matematicas` sin tocar nada. Y si trae `categories: [topologia]`, que no
es un área, cae al default de la colección y `topologia` sigue disponible como
etiqueta.

**Ningún campo nuevo es obligatorio. Todos tienen default.**

### Campos nuevos

```yaml
area: matematicas         # matematicas | computacion | ia
genero: articulo          # articulo | nota | ensayo | cuento | poema | charla

nivel: intermedio         # divulgativo | intermedio | tecnico
prerrequisitos: [homologia-persistente]    # slugs de _data/notacion.yml o posts

serie: laplacianos-espectrales    # slug de _series
orden_en_serie: 3

bibliografia: [lee2018, carlsson2009]      # claves de _data/bibliografia.yml
repositorio: https://github.com/…

figuras:
  - id: fig-toro
    src: /assets/posts/<slug>/toro.svg
    alt: "un toro con su descomposición en celdas resaltada en dos colores"
    script: scripts/figuras/toro.py
    caption: "opcional"

investigacion: [geometria-aprendizaje]
draft: false
```

### Defaults por colección

| Campo | `_mates` | `_notas` | `_escritos` |
|---|---|---|---|
| `area` | `matematicas` | — | — |
| `genero` | `articulo` | `nota` | `cuento` |
| `nivel` | `intermedio` | `divulgativo` | — |
| `layout` | `post` | `nota` | `escrito` |

Un poema declara `genero: poema` y `layout: poema`. Un ensayo en `_notas`
declara `genero: ensayo`. Todo lo demás hereda.

---

## 6. TAXONOMÍA

### Cuatro ejes independientes

| Eje | Campo | Cardinalidad | Valores |
|---|---|---|---|
| **Área** | `area` | una | `matematicas` `ciencias-computacionales` `ia` |
| **Dominio** | `dominio` | varios | texto legible: «Imágenes médicas», «Geometría computacional»… |
| **Género** | `genero` | uno | `articulo` `nota` `ensayo` `cuento` `poema` `charla` |
| **Etiquetas** | `tags` | muchas | libres |
| **Serie** | `serie` | una o ninguna | slug de `_series` |

Ninguno depende de otro. Un texto puede ser
`area: matematicas` + `genero: nota` + `serie: topologia-computacional` +
`tags: [persistencia, betti]` sin contradicción.

### Por qué dos ejes y no una lista

La lista original de siete categorías —Matemáticas, Computación, Inteligencia
artificial, Investigación, Notas, Ensayos, Cuentos y poemas— **mezclaba dos ejes
incomparables**. Las tres primeras dicen *de qué trata*; las cuatro últimas dicen
*qué tipo de texto es*.

Con la regla «una categoría principal», un post sobre laplacianos escrito como
nota de investigación obliga a elegir entre `Matemáticas` y `Notas`, y las dos
son verdad. La elección resulta arbitraria e inconsistente entre posts.

| Categoría original | Dónde queda |
|---|---|
| Matemáticas | `area: matematicas` |
| Computación | `area: computacion` |
| Inteligencia artificial | `area: ia` |
| **Investigación** | **sale de la taxonomía** — es una sección propia, `/investigacion/` |
| Notas | `genero: nota` |
| Ensayos | `genero: ensayo` |
| Cuentos y poemas | `genero: cuento` y `genero: poema`, separados |

«Cuentos y poemas» se parte porque tienen layouts distintos —`escrito` y
`poema`— y ritmos de lectura distintos. Unirlos en una categoría obligaría a la
plantilla a adivinar cuál es cuál.

### Las tres áreas de taxonomía y las cinco de portada

Son **dos cosas distintas**, deliberadamente.

| | Áreas de taxonomía | Áreas de trabajo |
|---|---|---|
| Cuántas | tres | cinco |
| Dónde | campo `area` del front matter | texto de la portada |
| Para qué | clasificar textos y proyectos | describir a qué se dedica Santiago |
| Cómo se editan | valores cerrados en `_config.yml` | prosa, a mano, en la Fase 8 |

Áreas de taxonomía: `matematicas`, `computacion`, `ia`.

Áreas de trabajo de la portada: Matemática computacional · Imágenes médicas ·
Inteligencia artificial · Sistemas de datos e infraestructura · Visualización y
divulgación matemática.

**No se cruzan y no deben cruzarse.** La taxonomía necesita pocos valores
estables, porque cada uno genera una página y aparece en cada archivo. La
portada necesita libertad editorial, porque describe una trayectoria que cambia.

Si algún día «Imágenes médicas» acumula suficiente contenido propio, puede
promoverse a área de taxonomía. Es un cambio de una línea en `_config.yml` más
un `area:` en los archivos afectados. No hay que anticiparlo ahora.

### Páginas generadas

Con el build en Actions, `jekyll-archives` genera automáticamente:

| Eje | Ruta | Mecanismo |
|---|---|---|
| Área | `/area/:name/` | `jekyll-archives` |
| Género | `/genero/:name/` | `jekyll-archives` |
| Etiqueta | `/etiquetas/:name/` | `jekyll-archives` |
| Serie | `/series/:name/` | **colección `_series`**, no archives |

`/etiquetas/` (índice completo con anclas) se conserva: ya existe, funciona, y
sigue siendo la vista útil para ver todas las etiquetas de un vistazo.

### Series

Un archivo por serie en `_series/`:

```yaml
title: "Laplacianos y métodos espectrales"
slug: laplacianos-espectrales
description: "…"
estado: en-curso          # planeada | en-curso | completa | pausada
area: matematicas
nivel: intermedio
orden: 4                  # posición en el listado de series
```

El cuerpo del archivo es la introducción a la serie.

La página de serie lista sus posts:

```liquid
{% assign todos = site.mates | concat: site.notas | concat: site.escritos %}
{% assign entradas = todos
   | where: "serie", page.slug
   | sort: "orden_en_serie" %}
```

Un post declara `serie` y `orden_en_serie`; **no** declara la serie completa.
La navegación anterior/siguiente se calcula recorriendo esa lista ordenada.

Series iniciales, todas `estado: planeada` hasta que tengan una entrada:

    geometria-aprendizaje-automatico
    geometria-diferencial-visual
    imagenes-medicas-matematicas
    laplacianos-espectrales
    topologia-computacional
    construyendo-sistemas-ia
    notas-abiertas-investigacion

La última cruza a `_notas`; las otras seis viven en `_mates`. Que una serie pueda
cruzar colecciones es intencional: la serie es un eje independiente.

---

## 7. ESQUEMAS DE CV Y AHORA

### `_data/ahora.yml`

```yaml
actualizado: 2026-08-06

bloques:
  - titulo: "Qué estudio"
    items:
      - "Finalizando la maestría en Ingeniería de Sistemas y Computación."
      - "Preparando el inicio del doctorado en Matemáticas."

  - titulo: "Qué investigo"
    items:
      - "Geometría diferencial, análisis geométrico y topología aplicada."
      - "Imágenes médicas."

  - titulo: "Qué construyo"
  - titulo: "Qué escribo"
  - titulo: "Qué quiero aprender después"
```

Lista de bloques y no claves fijas: así se añade o se quita un bloque editando
solo el YAML, sin tocar la plantilla.

### `_data/cv.yml`

```yaml
actualizado: 2026-08-06
pdf: /assets/cv/santiago-gil-gallego.pdf    # opcional

perfil:
  nombre: Santiago Gil Gallego
  titulo: "Matemático computacional"
  resumen: "…"
  ubicacion: "TODO(santiago)"
  email: santiagogilgallego@gmail.com
  enlaces:
    github: https://github.com/SggTio
    orcid: "TODO(santiago)"

formacion:
  - titulo: "…"
    institucion: "…"
    desde: 2024
    hasta: null            # null = en curso
    estado: en-curso       # en-curso | completado
    notas: "…"

experiencia:
  - cargo: "…"
    organizacion: "…"
    desde: 2020
    hasta: 2023
    descripcion: "…"
    tecnologias: [...]

investigacion: []
proyectos_seleccionados: []      # slugs de _proyectos, no se duplica el texto
publicaciones: []                # claves de _data/bibliografia.yml
docencia: []
tecnologias:
  - grupo: "Lenguajes"
    items: [Python, C++, …]
idiomas:
  - idioma: Español
    nivel: nativo
```

**Reglas duras del CV** (CLAUDE.md §2):

- No se inventa **ninguna** empresa, fecha, cargo, titulación ni publicación.
- Solo se recupera lo que ya exista en el repositorio. Hoy eso es: nombre, email,
  GitHub, Twitter e Instagram, de `about.md`. **Nada más.**
- Todo lo demás nace como `TODO(santiago)` y se lista en el backlog.
- **Sin barras de progreso, porcentajes ni rankings** (CLAUDE.md §6).
  `tecnologias` es una lista agrupada, sin nivel de dominio.
- `proyectos_seleccionados` guarda slugs, no texto: el CV lee de `_proyectos`.
  Un proyecto se describe una vez.

**Pendiente de Santiago:** qué parte del CV es pública. Decidir *antes* de la
Fase 8.

---

## 8. MAPA DE RUTAS

### Rutas que no cambian

| Ruta | Nota |
|---|---|
| `/` | portada, reconstruida en la Fase 8 |
| `/mates/` | contenido y ruta intactos |
| `/notas/` | ruta intacta, contenido nuevo |
| `/sobre/` | ampliada en la Fase 8 |
| `/archivo/` | se enlaza desde el pie |
| `/etiquetas/` | se conserva; se le añaden páginas por etiqueta |
| `/404.html` | se revisa |
| `/atom.xml` | se sustituye por `jekyll-feed`, conservando la ruta |
| `/mates/2026-04-14-fundamentos-redes-neuronales/` | **enlazada desde el cuerpo de otro post** |
| `/mates/2026-04-15-avances-redes-neuronales/` | — |
| `/mates/charlas/laplacianos_tumores/` | `permalink` fijo, `layout: none`. **No tocar.** |
| `/assets/**` | incluidos los tres reportes huérfanos del §11 |

### Rutas que cambian

| Ruta actual | Ruta nueva | Mecanismo |
|---|---|---|
| `/escritos/` | *cambia de significado*: pasa de listado literario a página de los tres espacios | ninguno: la URL sigue viva |
| `/escritos/file1/` | `/letras/file1/` | `redirect_from` |
| `/escritos/file2/` | `/letras/file2/` | `redirect_from` |
| `/escritos/plantilla-cuento/` | se retira de producción | Fase 7, ítem aparte |
| `/escritos/plantilla-poema/` | se retira de producción | Fase 7, ítem aparte |
| `/notas/plantilla-nota/` | se retira de producción | Fase 7, ítem aparte |

`jekyll-redirect-from` está en la lista blanca de Pages **y** disponible en
Actions: la compatibilidad no depende de la decisión de build.

### Rutas nuevas

    /proyectos/            /proyectos/:name/
    /investigacion/        /investigacion/:name/
    /letras/               /letras/:name/
    /series/               /series/:name/
    /area/:name/
    /genero/:name/
    /etiquetas/:name/
    /ahora/
    /cv/
    /sitemap.xml           (jekyll-sitemap)
    /feed.xml              (jekyll-feed, con /atom.xml conservado)
    /robots.txt

### Verificación

La Fase 9 recorre esta tabla y comprueba una por una. Con el build en Actions,
`html-proofer` puede hacerlo en CI antes de publicar — lo que habría detectado
los tres scripts ausentes del §11 de la auditoría.

---

## Lo que este documento NO decide

1. **Variante clara de los acentos.** Medido en la Fase 1: los tres acentos dan
   1,42:1 / 1,89:1 / 2,89:1 sobre blanco, y AA pide 4,5:1. Propuesta pendiente de
   aprobación: mismo hue y saturación, menor luminosidad —
   `#e5d6c7`→`#966e46`, `#95c9a0`→`#498351`, `#8d99ab`→`#68778d`.
   Se decide en la Fase 3.
2. **Acento de la sección `letras`.** Nueva sección, necesita su entrada en
   `_custom.scss`. Hoy `_escritos` usa `#e5d6c7`; lo natural es conservarlo.
3. **Retiro de los placeholders.** Fase 7, ítem aprobable aparte (CLAUDE.md §5).
4. **Qué parte del CV es pública.** De Santiago, antes de la Fase 8.
5. **Preguntas abiertas de cada línea de investigación.** De Santiago. Sin ellas,
   `TODO`.
