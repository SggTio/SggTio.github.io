---
layout: page
title: Proyectos
permalink: /proyectos/
section: proyectos
---

{%- comment -%}
  Índice de proyectos, agrupado por área.

  La navegación son anclas: funciona sin una línea de JavaScript, sobrevive al
  botón «atrás» y se puede compartir un enlace a un área concreta.

  En desarrollo se listan todos, incluidos los borradores, para poder
  revisarlos. En producción se filtran — y hoy, además, ninguna ficha se genera
  siquiera, porque la colección nace con `published: false`.
{%- endcomment -%}

{%- assign todos = site.proyectos -%}
{%- if jekyll.environment == "production" -%}
  {%- assign todos = todos | where_exp: "p", "p.draft != true" -%}
{%- endif -%}
{%- assign todos = todos | sort: "anio" | reverse -%}

{%- assign areas = "matematicas|Matemáticas,ciencias-computacionales|Ciencias computacionales,ia|Inteligencia artificial" | split: "," -%}

<div class="intro-grid">
  <div class="intro-block">
    Investigación, software y experimentos. Cada ficha cuenta qué problema
    había, qué hice, y qué salió mal por el camino.
  </div>
  <div class="intro-block">
    Las matemáticas se convierten en métodos computacionales, y los métodos en
    software que se puede leer.
  </div>
</div>

{%- if todos.size > 0 %}

<nav class="indice-areas" aria-label="Áreas de proyecto">
  <ul>
    {%- for a in areas -%}
      {%- assign par = a | split: "|" -%}
      {%- assign slug = par[0] -%}
      {%- assign nombre = par[1] -%}
      {%- assign del_area = todos | where: "area", slug -%}
      {%- if del_area.size > 0 %}
      <li><a href="#{{ slug }}">{{ nombre }} <span class="indice-areas-cuenta">{{ del_area.size }}</span></a></li>
      {%- endif -%}
    {%- endfor -%}
  </ul>
</nav>

{%- for a in areas -%}
  {%- assign par = a | split: "|" -%}
  {%- assign slug = par[0] -%}
  {%- assign nombre = par[1] -%}
  {%- assign del_area = todos | where: "area", slug -%}
  {%- if del_area.size > 0 %}

{% include encabezado-seccion.html titulo=nombre id=slug %}

<div class="posts-grid">
  {%- for p in del_area -%}
    {% include tarjeta-proyecto.html proyecto=p %}
  {%- endfor -%}
</div>

  {%- endif -%}
{%- endfor -%}

{%- comment -%}
  Índice por dominio: el eje de aplicación, transversal a las áreas. Un
  proyecto puede aparecer en varios, porque toca varios. Son enlaces, no
  tarjetas, para que se lea como un índice y no compita con las secciones
  de arriba.
{%- endcomment -%}
{%- assign dominios = "" | split: "" -%}
{%- for p in todos -%}
  {%- for d in p.dominio -%}
    {%- unless dominios contains d -%}
      {%- assign dominios = dominios | push: d -%}
    {%- endunless -%}
  {%- endfor -%}
{%- endfor -%}
{%- assign dominios = dominios | sort -%}

{%- if dominios.size > 0 %}

{% include encabezado-seccion.html titulo="Por dominio" id="dominios" descripcion="El eje de aplicación, transversal a las áreas. Un proyecto puede estar en varios." %}

<div class="indice-dominios">
  {%- for d in dominios -%}
    {%- assign del_dominio = todos | where_exp: "p", "p.dominio contains d" %}
  <section class="indice-dominio">
    <h3>{{ d }}</h3>
    <ul>
      {%- for p in del_dominio %}
      <li><a href="{{ p.url | relative_url }}">{{ p.title }}</a></li>
      {%- endfor %}
    </ul>
  </section>
  {%- endfor -%}
</div>

{%- endif -%}

{%- else %}

<p class="posts-empty"><em>Próximamente…</em></p>

{%- endif -%}
