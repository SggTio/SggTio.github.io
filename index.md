---
layout: default
title: Inicio
permalink: /
section: inicio
---

<div class="homepage-banner">
  <img src="{{ '/assets/home-banner.jpg' | relative_url }}" alt="Banner de Un Santajaro" />
</div>

<div class="intro-grid">
  <div class="intro-block">
    <h2>¿Qué es este sitio?</h2>
    <p>Escribo sobre lo que me gusta: matemáticas, computación, cuentos y poesía.</p>
  </div>
  <div class="intro-block">
    <h2>Formas</h2>
    <p>Se mezcla lo visual con lo abstracto.</p>
  </div>
</div>

<hr />

<h2 class="posts-heading">Últimas publicaciones</h2>

{% assign all_posts = site.mates | concat: site.notas | concat: site.escritos | sort: 'date' | reverse %}
<div class="posts-grid">
  {% for post in all_posts limit:9 %}
    {% include tarjeta-post.html post=post descripcion=false %}
  {% endfor %}
</div>
