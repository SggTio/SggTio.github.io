---
# PLANTILLA · poema (layout poema, voz de lectura con el margen como susurro)
# Cópiala a _escritos/slug.md → URL /escritos/slug/ (o _escritos/AAAA-MM-DD-slug.md;
# la misma convención que los cuentos: el nombre del archivo ES la URL).
# Obligatorios: layout: poema (sin él sale como cuento), title, date.
# Opcionales: epigrafe y epigrafe_fuente, description, tags. Sin tiempo de lectura.
layout: poema
title: "TODO(santiago): título del poema"
date: 2026-01-01        # TODO(santiago): fecha de publicación
genero: poema           # para el modelo de contenido; la meta ya dice «poema»
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
  POEMA · cómo se arma (layout _layouts/poema.html)
  (Este comentario no lleva líneas en blanco a propósito: si las llevara,
  Jekyll avisaría «Excerpt modified» en cada build.)
  · El layout pone el título en cursiva, la meta (fecha · poema) y el
    epígrafe con su fuente (texto plano: para cursiva, <em>…</em>).
  · Contrato de escritura:
    - cada salto de línea es un verso; una línea en blanco separa estrofas;
    - un verso que no cabe en la línea se parte con sangría francesa (no se
      confunde con el verso siguiente);
    - para sangrar un verso a propósito, empiézalo con &emsp; (una sangría
      de una letra eme; dos seguidos, el doble). Los espacios normales al
      principio no cuentan, y cuatro o más lo convierten en código;
    - un verso que empiece por - + * > # o por un número seguido de punto
      («1. ») se lee como lista, cita o título: escapa el primer carácter con
      una barra invertida (\- , 1\. );
    - *** en su propia línea, entre líneas en blanco: separador «· · ·»
      entre partes. Nunca --- justo debajo de un verso: lo convertiría en
      título;
    - susurro al margen tras su estrofa (fecha y lugar de escritura, una
      variante, una dedicatoria): una nota como mucho por estrofa, cursiva
      tenue, sin rótulo. El margen puede quedar vacío. Por debajo de 1040px
      de ventana vuelve al texto tras su estrofa.
  · Borra los bloques que no uses, con su comentario.
{%- endcomment -%}
TODO(santiago): primer verso de la primera estrofa
TODO(santiago): segundo verso (cada salto de línea es un verso)
&emsp;TODO(santiago): verso sangrado (empieza con &amp;emsp;)

{% comment %} Susurro al margen, tras su estrofa. Sin tipo ni rótulo. {% endcomment %}
{% capture susurro %}TODO(santiago): la nota al margen.{% endcapture %}
{% include margen.html cuerpo=susurro %}

TODO(santiago): primer verso de la segunda estrofa (una línea en blanco separa estrofas)
TODO(santiago): segundo verso

***

TODO(santiago): primer verso de la parte siguiente (tras el separador, opcional)
TODO(santiago): último verso
