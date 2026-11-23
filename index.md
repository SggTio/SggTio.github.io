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
  listar: false) · una fila de cinco tiles de categoría (.tile-fila, R2):
  Mates, IA, Investigaciones, Notas y Escritos, cada uno con una línea que
  dice qué hay o qué está en preparación (no un contador vacío). Debajo,
  en una línea de meta, el texto de presentación de la portada anterior (D9).
  El <h1> existe para la estructura de la página pero no se ve: el
  nombre del sitio ya está en la cabecera.
{%- endcomment -%}
{%- include publicaciones.html -%}
{%- assign _ini_secciones = "mates,ia,proyectos,notas,escritos" | split: "," %}
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
      <li><span class="fecha">{% include fecha.html fecha=_ini_p.date %} <span class="sec seccion-{{ _ini_p.section }}">{{ _ini_p.section }}</span></span><a href="{{ _ini_p.url | relative_url }}">{{ _ini_p.title }}</a></li>
      {%- endfor %}
    </ol>
    {%- else %}
    <p class="vacia">aún sin entradas</p>
    {%- endif %}
  </div>
  <div class="tile-fila">
  {%- for _ini_s in _ini_secciones -%}
    {%- case _ini_s -%}
      {%- when "mates" -%}
        {%- assign _ini_px = "px-sigma" -%}{%- assign _ini_nombre = "Mates" -%}
        {%- capture _ini_cuenta -%}{% if n_mates_explorar == 0 and n_mates_cuadernos == 0 %}Explorar · Cuadernos en preparación{% elsif n_mates == 1 %}1 entrada{% else %}{{ n_mates }} entradas{% endif %}{%- endcapture -%}
      {%- when "ia" -%}
        {%- assign _ini_px = "px-ia" -%}{%- assign _ini_nombre = "Inteligencia artificial" -%}
        {%- capture _ini_cuenta -%}{% if n_ia == 0 %}Explorar · en preparación{% elsif n_ia == 1 %}Explorar · 1 artículo{% else %}Explorar · {{ n_ia }} artículos{% endif %}{%- endcapture -%}
      {%- when "proyectos" -%}
        {%- assign _ini_px = "px-caja" -%}{%- assign _ini_nombre = "Investigaciones" -%}
        {%- capture _ini_cuenta -%}{% if n_proyectos == 0 %}aún sin fichas{% elsif n_proyectos == 1 %}1 ficha{% else %}{{ n_proyectos }} fichas{% endif %}{%- endcapture -%}
      {%- when "notas" -%}
        {%- assign _ini_px = "px-marca" -%}{%- assign _ini_nombre = "Notas" -%}
        {%- capture _ini_cuenta -%}{% if n_notas == 0 %}Reflexiones · en preparación{% elsif n_notas == 1 %}Reflexiones · 1 entrada{% else %}Reflexiones · {{ n_notas }} entradas{% endif %}{%- endcapture -%}
      {%- when "escritos" -%}
        {%- assign _ini_px = "px-pluma" -%}{%- assign _ini_nombre = "Escritos" -%}
        {%- capture _ini_cuenta -%}{% if n_escritos == 0 %}Cuentos y poesía · en preparación{% elsif n_escritos == 1 %}Cuentos y poesía · 1 entrada{% else %}Cuentos y poesía · {{ n_escritos }} entradas{% endif %}{%- endcapture -%}
    {%- endcase -%}
    {%- capture _ini_url -%}/{{ _ini_s }}/{%- endcapture %}
  <a class="tile seccion {{ _ini_s }}" href="{{ _ini_url | relative_url }}"><span class="px {{ _ini_px }} px-grande" aria-hidden="true"></span><span class="nombre">{{ _ini_nombre }}</span><span class="cuenta">{{ _ini_cuenta }}</span></a>
  {%- endfor %}
  </div>
</div>

{%- comment -%}
  Resumen de Sobre mí: bajo el mosaico, una segunda retícula con el
  retrato, la ficha de personaje y el mapa de intereses de /sobre/. Nada
  se escribe aquí: la ficha sale del front matter de about.md (la misma
  que pinta _layouts/sobre.html) y el mapa de _data/intereses.yml. Acento
  crema (seccion-sobre), como en /sobre/. El <h2> «Sobre mí» existe para
  la estructura y no se ve: cada tile lleva su rótulo. Estilos en
  _sass/_ajustes-inicio.scss.
{%- endcomment -%}
{%- assign _ini_sobre = site.pages | where: "url", "/sobre/" | first %}
<section class="mosaico resumen-sobre seccion-sobre" aria-labelledby="resumen-sobre-titulo">
  <h2 class="visualmente-oculto" id="resumen-sobre-titulo">Sobre mí</h2>
  <div class="tile retrato">
    <img class="foto-decorativa" src="{{ '/assets/profile.jpg' | relative_url }}" width="1201" height="1600" loading="lazy" decoding="async" alt="Santiago Gil Gallego bebiendo de una taza de cerámica verde y blanca que le tapa media cara, mirando a la cámara">
  </div>
  <div class="tile personaje">
    {% include ficha-personaje.html ficha=_ini_sobre.ficha %}
    <p class="mas"><a href="{{ '/sobre/' | relative_url }}">Más en Sobre mí</a></p>
  </div>
  <div class="tile intereses">
    {% include mapa-intereses.html nivel="h3" %}
  </div>
</section>

<dl class="meta presentacion">
  <div><dt>¿Qué es este sitio?</dt> <dd>Escribo sobre lo que me gusta: matemáticas, computación, cuentos y poesía.</dd></div>
  <div><dt>Formas</dt> <dd>Se mezcla lo visual con lo abstracto.</dd></div>
</dl>
