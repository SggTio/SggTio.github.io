# Plantillas de entrada

Una plantilla por tipo de texto, lista para copiar. Viven en `docs/`, que no
entra en el build: tenerlas aquí no publica nada. Cada una explica, en su
front matter y en el comentario de debajo, dónde va, qué campos son
obligatorios y cómo se escribe cada bloque. Donde va tu texto pone
`TODO(santiago): …` con lo que hay que escribir.

## Qué plantilla, dónde va, cómo se ve

| Tipo | Plantilla | Cópiala a | Layout | Voz |
|---|---|---|---|---|
| Artículo de Mates | `mates.md` | `_mates/AAAA-MM-DD-slug.md` | `post` | Mates: Literata 18px, 66 caracteres; el margen como aparato (índice, idea clave, analogía, número de ecuación, pie de figura) |
| Nota técnica | `nota.md` | `_notas/slug.md` | `nota` | técnica: Plex Sans 17px, 72 caracteres; notas al margen sin rótulo |
| Ensayo | `ensayo.md` | `_notas/slug.md` | `nota` con `genero: ensayo` | lectura (la de Escritos): Literata 19px, 58 caracteres; el margen como susurro |
| Cuento | `cuento.md` | `_escritos/slug.md` | `escrito` (default) | lectura; susurro |
| Poema | `poema.md` | `_escritos/slug.md` | `poema` (hay que escribirlo) | lectura; susurro |
| Proyecto | `proyecto.md` | `_proyectos/slug.md` | `proyecto` (default) | técnica; ficha al margen |

El nombre del archivo es la URL: `_notas/slug.md` → `/notas/slug/`. En Mates
va con la fecha delante, como las dos entradas reales. En Notas y Escritos aún
no hay convención (con fecha o sin ella): elige una y mantenla. Un proyecto no
lleva fecha: su año va en `anio`.

Pasos: copiar y renombrar · escribir cada `TODO(santiago)` · borrar los
bloques que no uses (con su comentario) · previsualizar · publicar.

## Campos comunes

| Campo | Qué hace |
|---|---|
| `title` | el título (H1) y el `<title>`. Obligatorio. |
| `date` | fecha de la meta y orden de las listas, `AAAA-MM-DD`. Obligatoria en Mates, Notas y Escritos: sin ella Jekyll pone la hora del build. |
| `description` | una frase para listas, feed y buscadores. En Notas sale bajo la meta; en un proyecto es la entrada. |
| `tags` | en minúscula. Mates y Notas: en la meta, enlazadas a `/etiquetas/`. Escritos: solo en listas y `/etiquetas/`. |
| `math: true` | carga MathJax (fórmulas y `ecuacion.html`). |
| `draft: true` | fuera de listas, «Últimas», feed, `/etiquetas/` y conteos. **La página se genera igual** (y entra en `sitemap.xml`) si no lleva también `published: false`. Aviso «Borrador» en local en todos los layouts (Mates, Notas, Escritos, Proyectos); en Mates, Notas y Escritos el aviso dice además si falta `published: false`. |
| `published: false` | Jekyll no genera la página: la garantía de que ningún `TODO(santiago)` llega a producción (CLAUDE.md §2). Para verla en local, `--unpublished`. |
| `listar: false` | página publicada en su URL pero fuera de toda lista: solo para marcadores de posición (D10), no para borradores. |

Las plantillas nacen con `draft: true` y `published: false`. Los proyectos ya
los tienen por defecto en `_config.yml`.

## Bloques del cuerpo

Cada bloque va en su propia línea, con una línea en blanco antes y después. Las
notas al margen van **justo después** del párrafo que las origina, una por
párrafo como mucho.

```liquid
{% capture nota %}Texto en Markdown.{% endcapture %}
{% include margen.html tipo="idea" cuerpo=nota %}
```
Nota al margen. `tipo`: `idea` («Idea clave», una o dos por artículo) o
`analogia`, solo en Mates; sin `tipo`, nota sin rótulo (susurro en la voz de
lectura). `titulo="…"` le pone rótulo.

```liquid
{% include ecuacion.html tex="y = \sum_i w_i x_i" numero="1" etiqueta="dos o tres palabras" %}
```
Ecuación numerada, con el número al margen (Mates, con `math: true`).
Opcionales: `id` (para enlazarla), `ancho=true` (más ancha que el texto). TeX
largo o con comillas: con `capture`. Sin `%` de TeX.

```liquid
{% include figura.html src="/assets/posts/SLUG/NOMBRE.svg" alt="qué muestra" pie="Pie." numero="1" ancho="encolumna" %}
```
`ancho`: `encolumna` (pie al margen), `ancho` (texto + margen: gráficas con
detalle, vídeo, gifs como `.mp4`/`.webm`) o `completo` (1056px). `alt`
obligatorio: sin él el build se detiene. Opcionales: `decorativa=true` (solo
fotos de ambiente), `ancho_px`/`alto_px`, `poster`, `controles=false`.

```liquid
{% capture detalle %}Markdown, fórmulas, código.{% endcapture %}
{% include capa2.html titulo="La demostración" cuerpo=detalle %}
```
Capa 2: plegada en un `details`; se abre al imprimir.

```liquid
{% capture enunciado %}Markdown.{% endcapture %}
{% include entornos/teorema.html numero="1" titulo="Nombre" id="thm-slug" cuerpo=enunciado %}
```
Entornos: `definicion`, `teorema`, `proposicion`, `observacion`,
`demostracion` (lleva el cuadrado de cierre).

En Markdown, sin include:

- `{: .lead}` en la línea de debajo de un párrafo: la entrada de Mates (una).
- `***` en su propia línea: separador «· · ·» en ensayos, cuentos y poemas.
- `<section class="two-col" markdown="1">` … `</section>`: dos columnas; cada
  `###` abre una. `one-col`: una columna estrecha.
- Código entre tres comillas invertidas con el lenguaje (`python`, `cpp`…).
- En un poema, `&emsp;` al principio de un verso lo sangra.
- Una visualización interactiva: el bloque `.viz` de `mates.md` y su
  `<script>` al final (ver `docs/guia-visualizaciones.md`).

## Previsualizar en local

En PowerShell, en la carpeta del repositorio:

```powershell
$env:JEKYLL_ENV = 'development'
bundle exec jekyll serve --unpublished --livereload
```

Abre `http://localhost:4000/` y la URL de la entrada. `--unpublished` hace
falta para ver lo que lleva `published: false`. En desarrollo se ven además el
aviso «Borrador» y los recuadros de visualización pendiente de los proyectos.
`$env:JEKYLL_ENV` dura lo que la ventana: si antes pusiste `production`,
vuelve a `development`.

Para ver lo que se publicaría:

```powershell
$env:JEKYLL_ENV = 'production'
bundle exec jekyll build
```

Con `published: false` la página no debe aparecer en `_site/`.

## Publicar

1. Ningún `TODO(santiago)` en el archivo:
   `git grep -n "TODO(santiago)" -- _mates _notas _escritos _proyectos`.
2. Borra `draft: true` y `published: false`. En un proyecto, cámbialos a
   `draft: false` y `published: true`; si tiene coautores, solo con su permiso
   (CLAUDE.md §9).
3. Build de producción en local sin errores (arriba) y una mirada a la página
   en los dos temas y en el teléfono.
4. Commit y push a `master`: `.github/workflows/pages.yml` construye con
   `JEKYLL_ENV=production` y despliega. Las ramas `restructure/**` construyen
   pero no despliegan.

## Trampas

- **Front matter sin Liquid.** En los campos de un proyecto, `{{ … }}` sale
  tal cual: los enlaces internos, con la ruta escrita (`/mates/…/`).
- **Liquid dentro del código.** Un bloque de código con `{{` o `{%` se
  ejecuta como Liquid: envuélvelo en `{% raw %}` … `{% endraw %}`.
- **El comentario de cabecera, sin líneas en blanco.** Si las lleva, Jekyll
  avisa «Excerpt modified» en cada build.
- **Versos que parecen otra cosa.** Un verso que empieza por `-`, `*`, `+`,
  `>`, `#` o `1. ` se lee como lista, cita o título: escapa el primer carácter
  con `\`. Un `---` justo debajo de un verso lo convierte en título: usa `***`
  entre líneas en blanco.
- **Figuras.** Toda figura matemática sale de un script en
  `scripts/figuras/SLUG/` (CLAUDE.md §3); SVG mejor que PNG.
