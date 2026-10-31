---
layout: seccion
title: Etiquetas
permalink: /etiquetas/
section: etiquetas
# La página escribe sus propias listas: una por etiqueta, con su ancla
# (#slug-de-la-etiqueta, al que enlaza _includes/lista-etiquetas.html).
# Filas compactas (fecha, título, sección): la etiqueta ya agrupa, y el
# resumen y la lectura están en el índice de cada sección.
lista: false
---
{%- include publicaciones.html -%}
{%- assign _et_lista = "" | split: "" -%}
{%- for _et_item in publicaciones -%}
  {%- for _et_t in _et_item.tags -%}
    {%- unless _et_lista contains _et_t -%}{%- assign _et_lista = _et_lista | push: _et_t -%}{%- endunless -%}
  {%- endfor -%}
{%- endfor -%}
{%- assign _et_lista = _et_lista | sort -%}
{%- if _et_lista.size > 0 %}
<nav class="indice-etiquetas" aria-label="Índice de etiquetas">
<ul class="lista-etiquetas">
{%- for _et_t in _et_lista -%}
{%- assign _et_con = publicaciones | where_exp: "item", "item.tags contains _et_t" %}
<li><a href="#{{ _et_t | slugify }}">{{ _et_t }}</a> ({{ _et_con.size }})</li>
{%- endfor %}
</ul>
</nav>
{%- for _et_t in _et_lista -%}
{%- assign _et_con = publicaciones | where_exp: "item", "item.tags contains _et_t" %}
<h2 class="lista-titulo" id="{{ _et_t | slugify }}">{{ _et_t }}</h2>
<ul class="lista">
{%- for _et_item in _et_con %}
{% include fila-publicacion.html post=_et_item seccion=true resumen=false etiquetas=false lectura=false %}
{%- endfor %}
</ul>
{%- endfor %}
{%- else %}
<p class="lista-vacia">aún sin entradas</p>
{%- endif %}
