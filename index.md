---
layout: default
title: Inicio
permalink: /
section: inicio
---
{%- comment -%}
  Portada (rediseño v2; componente Portada): mosaico de 12 columnas.
  foto 7×2 · frases 5×1 (las tres frases protegidas, literales, D8) ·
  «Últimas» 5×1 (las tres publicaciones más recientes, sin draft ni
  listar: false) · cuatro tiles de sección con su cuenta. Debajo, en una
  línea de meta, el texto de presentación de la portada anterior (D9).
  El <h1> existe para la estructura de la página pero no se ve: el
  nombre del sitio ya está en la cabecera.
{%- endcomment -%}
{%- include publicaciones.html -%}
{%- assign _ini_secciones = "mates,notas,escritos,proyectos" | split: "," %}
<h1 class="visualmente-oculto">{{ site.title }}</h1>

<div class="mosaico">
  <div class="tile foto">
    <img class="foto-decorativa" src="{{ '/assets/home-banner-1600.jpg' | relative_url }}" srcset="{{ '/assets/home-banner-800.jpg' | relative_url }} 800w, {{ '/assets/home-banner-1600.jpg' | relative_url }} 1600w" sizes="(max-width: 960px) 100vw, 620px" width="1600" height="1200" alt="Banner de Un Santajaro" fetchpriority="high">
  </div>
  <div class="tile frases">
    <p>Estudié matemáticas, porque quiero ser poeta.</p>
    <p>Quisiera ser psiquiatra de máquinas, para interpretar sus sueños.</p>
    <p>Me sueño con una panadería.</p>
  </div>
  <div class="tile ultimas">
    <h2 class="rotulo cursor">Últimas</h2>
    {%- if publicaciones.size > 0 %}
    <ol>
      {%- for _ini_p in publicaciones limit: 3 %}
      <li><span class="fecha">{% include fecha.html fecha=_ini_p.date %} <span class="sec seccion-{{ _ini_p.collection }}">{{ _ini_p.collection }}</span></span><a href="{{ _ini_p.url | relative_url }}">{{ _ini_p.title }}</a></li>
      {%- endfor %}
    </ol>
    {%- else %}
    <p class="vacia">aún sin entradas</p>
    {%- endif %}
  </div>
  {%- for _ini_s in _ini_secciones -%}
    {%- case _ini_s -%}
      {%- when "mates" -%}{%- assign _ini_n = n_mates -%}{%- assign _ini_px = "px-sigma" -%}{%- assign _ini_nombre = "Mates" -%}
      {%- when "notas" -%}{%- assign _ini_n = n_notas -%}{%- assign _ini_px = "px-marca" -%}{%- assign _ini_nombre = "Notas" -%}
      {%- when "escritos" -%}{%- assign _ini_n = n_escritos -%}{%- assign _ini_px = "px-pluma" -%}{%- assign _ini_nombre = "Escritos" -%}
      {%- when "proyectos" -%}{%- assign _ini_n = n_proyectos -%}{%- assign _ini_px = "px-caja" -%}{%- assign _ini_nombre = "Proyectos" -%}
    {%- endcase -%}
    {%- if _ini_s == "proyectos" -%}
      {%- assign _ini_uno = "ficha" -%}{%- assign _ini_varios = "fichas" -%}
    {%- else -%}
      {%- assign _ini_uno = "entrada" -%}{%- assign _ini_varios = "entradas" -%}
    {%- endif -%}
    {%- capture _ini_url -%}/{{ _ini_s }}/{%- endcapture %}
  <a class="tile seccion {{ _ini_s }}" href="{{ _ini_url | relative_url }}"><span class="px {{ _ini_px }} px-grande" aria-hidden="true"></span><span class="nombre">{{ _ini_nombre }}</span><span class="cuenta">{% if _ini_n == 0 %}aún sin {{ _ini_varios }}{% elsif _ini_n == 1 %}1 {{ _ini_uno }}{% else %}{{ _ini_n }} {{ _ini_varios }}{% endif %}</span></a>
  {%- endfor %}
</div>

<dl class="meta presentacion">
  <div><dt>¿Qué es este sitio?</dt> <dd>Escribo sobre lo que me gusta: matemáticas, computación, cuentos y poesía.</dd></div>
  <div><dt>Formas</dt> <dd>Se mezcla lo visual con lo abstracto.</dd></div>
</dl>
