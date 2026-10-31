---
# PLANTILLA · cuento (layout escrito, voz de lectura con el margen como susurro)
# Cópiala a _escritos/slug.md → URL /escritos/slug/ (o _escritos/AAAA-MM-DD-slug.md;
# elige una convención y mantenla: el nombre del archivo ES la URL).
# Obligatorios: title, date. Opcionales: epigrafe y epigrafe_fuente, description, tags.
# Sin tiempo de lectura ni etiquetas en la página: es un texto literario.
title: "TODO(santiago): título del cuento"
date: 2026-01-01        # TODO(santiago): fecha de publicación
genero: cuento          # default de _escritos; sale en la meta
epigrafe: "TODO(santiago): la cita del epígrafe (borra esta línea y la siguiente si no hay)"
epigrafe_fuente: "TODO(santiago): autor y obra, sin la raya (la pone el layout)"
description: "TODO(santiago): una frase para las listas; en la página no sale."
# tags: []              # en minúscula; no salen en la página, sí en las listas y en /etiquetas/

# ---- Borrador -------------------------------------------------------------
# Mientras quede un TODO(santiago) en el archivo, deja estas dos líneas:
draft: true             # fuera de /escritos/, «Últimas», el feed y /etiquetas/; en local, aviso «Borrador»
published: false        # Jekyll no genera la página: nada de esto llega a producción.
                        # Para verla en local: bundle exec jekyll serve --unpublished
# Para publicar, borra las dos. No confundir con:
# listar: false         # página publicada en su URL pero fuera de toda lista (solo marcadores, D10)
---
{%- comment -%}
  CUENTO · cómo se arma (layout _layouts/escrito.html)
  (Este comentario no lleva líneas en blanco a propósito: si las llevara,
  Jekyll avisaría «Excerpt modified» en cada build.)
  · El layout pone el título en cursiva, la meta (fecha · cuento) y el
    epígrafe con su fuente. El epígrafe es texto plano: el Markdown no se
    procesa ahí (para cursiva, <em>…</em>).
  · En el cuerpo:
    - párrafos separados por una línea en blanco: se ven con sangría y sin
      espacio entre ellos, como en un libro (el primero, sin sangría);
    - *** en su propia línea, con una línea en blanco antes y después:
      separador «· · ·» entre escenas (nunca --- pegado a un párrafo: lo
      convertiría en título);
    - susurro al margen tras su párrafo (fecha y lugar de escritura, una
      variante, una dedicatoria): una nota como mucho por párrafo, cursiva
      tenue, sin rótulo. El margen puede quedar vacío. Por debajo de 1040px
      de ventana vuelve al texto tras su párrafo;
    - ## solo si el cuento tiene partes con nombre (cursiva, en tinta).
  · Borra los bloques que no uses, con su comentario.
{%- endcomment -%}
TODO(santiago): el primer párrafo del cuento.

TODO(santiago): el segundo párrafo: de él sale el susurro de abajo.

{% comment %} Susurro al margen, tras su párrafo. Sin tipo ni rótulo. {% endcomment %}
{% capture susurro %}TODO(santiago): la nota al margen.{% endcapture %}
{% include margen.html cuerpo=susurro %}

TODO(santiago): el tercer párrafo.

***

TODO(santiago): el primer párrafo de la escena siguiente (sin sangría, tras el separador).

TODO(santiago): el último párrafo.
