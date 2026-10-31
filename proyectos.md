---
layout: page
title: Proyectos
permalink: /proyectos/
section: proyectos
---

{%- comment -%}
  Índice de proyectos (componente IndiceProyectos): una lista numerada por
  área, no una rejilla de tarjetas. Cada fila la pinta
  _includes/fila-proyecto.html.

  La navegación son anclas en una línea de meta: funciona sin una línea de
  JavaScript, sobrevive al botón «atrás» y se puede compartir un enlace a un
  área concreta (#matematicas, #ciencias-computacionales, #ia, #dominios).

  Orden estable: por área (en el orden de `areas`), dentro de cada área por
  año descendente y, a igual año, por slug (el nombre del archivo, único).
  La numeración es continua en toda la página, no reinicia por área, para
  que un proyecto pueda citarse por su número. Se calcula sobre lo que se
  publica, así que cambia cuando se publica un borrador.

  Borradores: las fichas sin `published: true` ni siquiera se generan
  (default de la colección en _config.yml; para verlas en local hace falta
  `jekyll serve --unpublished`). En producción, además, se filtran las que
  lleven `draft: true`. En desarrollo se listan con su aviso de borrador.
{%- endcomment -%}

{%- assign todos = site.proyectos -%}
{%- if jekyll.environment == "production" -%}
  {%- assign todos = todos | where_exp: "p", "p.draft != true" -%}
{%- endif -%}

{%- assign areas = "matematicas|Matemáticas,ciencias-computacionales|Ciencias computacionales,ia|Inteligencia artificial" | split: "," -%}

{%- comment -%}
  Orden de la página, calculado una vez: `ordenados` guarda los proyectos en
  el orden en que se pintan; su posición (1, 2, 3…) es el número de cada uno.
{%- endcomment -%}
{%- assign ordenados = "" | split: "" -%}
{%- for a in areas -%}
  {%- assign par = a | split: "|" -%}
  {%- assign del_area = todos | where: "area", par[0] -%}
  {%- assign anios = del_area | map: "anio" | compact | uniq | sort | reverse -%}
  {%- for y in anios -%}
    {%- assign del_anio = del_area | where: "anio", y | sort: "slug" -%}
    {%- assign ordenados = ordenados | concat: del_anio -%}
  {%- endfor -%}
  {%- assign sin_anio = del_area | where_exp: "p", "p.anio == nil" | sort: "slug" -%}
  {%- assign ordenados = ordenados | concat: sin_anio -%}
{%- endfor -%}

<div class="indice-proyectos">

<div class="resumen">
  <p>Investigación, software y experimentos. Cada ficha cuenta qué problema
  había, qué hice, y qué salió mal por el camino.</p>
  <p>Las matemáticas se convierten en métodos computacionales, y los métodos en
  software que se puede leer.</p>
</div>

{%- if ordenados.size > 0 %}

<nav class="meta indice-areas-linea" aria-label="Áreas de proyecto">
  {%- assign primera = true -%}
  {%- for a in areas -%}
    {%- assign par = a | split: "|" -%}
    {%- assign del_area = ordenados | where: "area", par[0] -%}
    {%- if del_area.size > 0 -%}
      {%- unless primera %}<span class="sep" aria-hidden="true"> · </span>{% endunless -%}
      <a href="#{{ par[0] }}">{{ par[1] }}</a>
      {%- assign primera = false -%}
    {%- endif -%}
  {%- endfor -%}
</nav>

{%- for a in areas -%}
  {%- assign par = a | split: "|" -%}
  {%- assign del_area = ordenados | where: "area", par[0] -%}
  {%- if del_area.size > 0 %}
<section class="area-proyectos" aria-labelledby="{{ par[0] }}">
  <h2 class="lista-titulo" id="{{ par[0] }}">{{ par[1] }}</h2>
  <ul class="lista proyectos">
    {%- for p in ordenados -%}
      {%- if p.area == par[0] %}
    {% include fila-proyecto.html proyecto=p numero=forloop.index %}
      {%- endif -%}
    {%- endfor %}
  </ul>
</section>
  {%- endif -%}
{%- endfor %}

{%- comment -%}
  Índice por dominio: el eje de aplicación, transversal a las áreas. Un
  proyecto puede aparecer en varios, porque toca varios. Son enlaces con el
  número del proyecto, no filas completas, para que se lea como un índice y
  no compita con las listas de arriba.
{%- endcomment -%}
{%- assign dominios = "" | split: "" -%}
{%- for p in ordenados -%}
  {%- for d in p.dominio -%}
    {%- unless dominios contains d -%}
      {%- assign dominios = dominios | push: d -%}
    {%- endunless -%}
  {%- endfor -%}
{%- endfor -%}
{%- assign dominios = dominios | sort -%}

{%- if dominios.size > 0 %}

<section class="dominios-proyectos" aria-labelledby="dominios">
  <h2 class="lista-titulo" id="dominios">Por dominio</h2>
  <p class="dominios-descripcion">El eje de aplicación, transversal a las áreas. Un proyecto puede estar en varios.</p>
  <div class="indice-dominios">
    {%- for d in dominios %}
    <section class="indice-dominio">
      <h3>{{ d }}</h3>
      <ul>
        {%- for p in ordenados -%}
          {%- if p.dominio contains d %}
        <li><span class="num">{% if forloop.index < 10 %}0{% endif %}{{ forloop.index }}</span> <a href="{{ p.url | relative_url }}">{{ p.title }}</a></li>
          {%- endif -%}
        {%- endfor %}
      </ul>
    </section>
    {%- endfor %}
  </div>
</section>

{%- endif -%}

{%- else %}

<p class="lista-vacia">aún sin entradas</p>

{%- endif %}

</div>
