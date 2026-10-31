---
# PLANTILLA · nota técnica (layout nota, voz técnica: Plex Sans, 72 caracteres)
# Cópiala a _notas/slug.md → URL /notas/slug/. Si prefieres la fecha en el
# nombre (_notas/AAAA-MM-DD-slug.md → /notas/AAAA-MM-DD-slug/), elige una
# convención y mantenla: el nombre del archivo ES la URL.
# Obligatorios: title, date. Recomendados: description, tags.
# Para un texto de lectura (argumento, opinión, reseña larga) usa ensayo.md.
title: "TODO(santiago): título de la nota"
date: 2026-01-01        # TODO(santiago): fecha de publicación
genero: nota            # nota → voz técnica. «ensayo» la pasa a la voz de lectura (D12)
description: "TODO(santiago): una frase. Sale bajo la meta como resumen y en las listas."
tags:                   # en minúscula; salen en la línea de meta y en /etiquetas/
  - "TODO(santiago): etiqueta"
# math: true            # solo si la nota lleva fórmulas (carga MathJax)

# ---- Borrador -------------------------------------------------------------
# Mientras quede un TODO(santiago) en el archivo, deja estas dos líneas:
draft: true             # fuera de /notas/, «Últimas», el feed y /etiquetas/; en local, aviso «Borrador»
published: false        # Jekyll no genera la página: nada de esto llega a producción.
                        # Para verla en local: bundle exec jekyll serve --unpublished
# Para publicar, borra las dos. No confundir con:
# listar: false         # página publicada en su URL pero fuera de toda lista (solo marcadores, D10)
---
{%- comment -%}
  NOTA TÉCNICA · cómo se arma (layout _layouts/nota.html)
  (Este comentario no lleva líneas en blanco a propósito: si las llevara,
  Jekyll avisaría «Excerpt modified» en cada build.)
  · El layout pone el título, la línea de meta (fecha · nota · etiquetas ·
    minutos de lectura) y `description` como resumen. Tú escribes el
    cuerpo: párrafos, secciones ## (en el acento crema), ### si hacen
    falta, listas (viñeta píxel), código, notas al margen y, si ayuda,
    columnas. No hay índice al margen: eso es de Mates.
  · Margen: como máximo UNA nota por párrafo, en su propia línea, justo
    DESPUÉS de su párrafo y con una línea en blanco antes y después. Sin
    `tipo` sale sin rótulo; titulo="…" le pone uno. Por debajo de 1140px
    de ventana vuelve al texto tras su párrafo.
  · Código: tres comillas invertidas y el lenguaje (python, cpp, bash,
    yaml…) para el resaltado. Liquid se ejecuta también dentro del código:
    si el código lleva dobles llaves o llave-porcentaje, envuélvelo en un
    bloque raw … endraw de Liquid.
  · Borra los bloques que no uses, con su comentario.
{%- endcomment -%}
TODO(santiago): el primer párrafo: de qué va la nota y por qué importa.

## TODO(santiago): título de la primera sección

TODO(santiago): el párrafo que origina la nota al margen.

{% comment %} Nota al margen, tras su párrafo. Sin tipo, sin rótulo. {% endcomment %}
{% capture nota %}TODO(santiago): la aclaración al margen: una precisión, una fuente, un matiz.{% endcapture %}
{% include margen.html cuerpo=nota %}

TODO(santiago): el párrafo siguiente. Lista, si hace falta:

- TODO(santiago): primer punto.
- TODO(santiago): segundo punto.

## TODO(santiago): título de la sección con código

TODO(santiago): el párrafo que presenta el código.

```python
# TODO(santiago): el código. Cambia «python» por su lenguaje.
```

TODO(santiago): el párrafo que comenta el código.

{% comment %}
  Dos columnas (opcional): para contrastar dos cosas. markdown="1" es
  obligatorio; cada ### abre una columna. Bajo 720px se apilan.
{% endcomment %}
<section class="two-col" markdown="1">

### TODO(santiago): título de la columna izquierda

TODO(santiago): el texto de la columna izquierda.

### TODO(santiago): título de la columna derecha

TODO(santiago): el texto de la columna derecha.

</section>

{% comment %} Capa 2 (opcional): el código entero o los detalles que se pueden saltar. {% endcomment %}
{% capture detalle %}
TODO(santiago): los detalles: el código completo, los casos borde.
{% endcapture %}
{% include capa2.html titulo="TODO(santiago): qué hay dentro" cuerpo=detalle %}

TODO(santiago): el cierre.
