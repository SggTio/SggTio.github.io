---
# PLANTILLA · ensayo (layout nota con genero: ensayo → voz de lectura, D12)
# Cópiala a _notas/slug.md → URL /notas/slug/ (o _notas/AAAA-MM-DD-slug.md,
# con la misma convención que el resto de Notas: el nombre del archivo ES la URL).
# Obligatorios: title, date, genero: ensayo. Recomendados: description, tags.
title: "TODO(santiago): título del ensayo"
date: 2026-01-01        # TODO(santiago): fecha de publicación
genero: ensayo          # imprescindible: sin él la nota sale en la voz técnica
description: "TODO(santiago): una frase. Sale bajo la meta, en tinta quieta, y en las listas."
tags:                   # en minúscula; salen en la línea de meta y en /etiquetas/
  - "TODO(santiago): etiqueta"

# ---- Borrador -------------------------------------------------------------
# Mientras quede un TODO(santiago) en el archivo, deja estas dos líneas:
draft: true             # fuera de /notas/, «Últimas», el feed y /etiquetas/; en local, aviso «Borrador»
published: false        # Jekyll no genera la página: nada de esto llega a producción.
                        # Para verla en local: bundle exec jekyll serve --unpublished
# Para publicar, borra las dos. No confundir con:
# listar: false         # página publicada en su URL pero fuera de toda lista (solo marcadores, D10)
---
{%- comment -%}
  ENSAYO · cómo se arma (layout _layouts/nota.html, voz de Escritos)
  (Este comentario no lleva líneas en blanco a propósito: si las llevara,
  Jekyll avisaría «Excerpt modified» en cada build.)
  · Igual que una nota, pero se lee: Literata 19px, 58 caracteres por
    línea, y el margen como susurro (cursiva tenue, sin rótulo). La meta
    lleva fecha · ensayo · etiquetas · minutos de lectura; `description`
    sale debajo.
  · En el cuerpo:
    - párrafos separados por una línea en blanco;
    - *** en su propia línea, con una línea en blanco antes y después:
      separador «· · ·» entre partes (nunca --- pegado a un párrafo: lo
      convertiría en título);
    - ## si el ensayo tiene partes con nombre: van en cursiva y en tinta,
      sin color;
    - citas con > al principio de la línea;
    - susurro al margen tras su párrafo: una nota como mucho por párrafo.
      Por debajo de 1040px de ventana vuelve al texto tras su párrafo.
  · Borra los bloques que no uses, con su comentario.
{%- endcomment -%}
TODO(santiago): el primer párrafo del ensayo.

TODO(santiago): el segundo párrafo: de él sale el susurro de abajo.

{% comment %} Susurro al margen, tras su párrafo: una fuente, un matiz, una fecha. Sin tipo ni rótulo. {% endcomment %}
{% capture susurro %}TODO(santiago): la nota al margen.{% endcapture %}
{% include margen.html cuerpo=susurro %}

TODO(santiago): el párrafo siguiente.

> TODO(santiago): una cita, si hace falta (con su autor y obra en el texto).

***

## TODO(santiago): título de la segunda parte (opcional)

TODO(santiago): el párrafo que abre la segunda parte.

TODO(santiago): el cierre.
