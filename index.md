---
layout: default
title: Inicio
permalink: /
section: home
---

<div class="intro-grid">
  <div class="intro-block">
    <h2> ¿Qué es este sitio?</h2>
    <p>
      escribo sobre matemáticas, cuentos y poesía.
    </p>
  </div>
  <div class="intro-block">
    <h2>Frecuencia y estilo</h2>
    <p>
      Publico de forma semi-regular. A veces es una nota matemática, otras veces son cuentos. Se mezcla lo visual con lo abstracto.
    </p>
  </div>
</div>

<hr />

<h2> Últimas publicaciones</h2>
<div class="post-grid">
  {% assign sorted_posts = site.posts | sort: 'date' | reverse %}
  {% for post in sorted_posts limit:9 %}
    <div class="post-card">
      <a href="{{ post.url }}">
        <h3>{{ post.title }}</h3>
        <p>{{ post.date | date: "%b %d, %Y" }}</p>
      </a>
    </div>
  {% endfor %}
</div>
