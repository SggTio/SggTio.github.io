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
      Este blog es un proyecto personal donde comparto cosas que me interesan,
      mezclando divulgación, matemáticas y literatura. No hay una sola línea: solo una mente curiosa escribiendo.
    </p>
  </div>
  <div class="intro-block">
    <h2>📅 Frecuencia y estilo</h2>
    <p>
      Publico de forma semi-regular. A veces es una nota matemática, otras un ensayo
      o una reflexión breve. El contenido es bilingüe, visual, y personal.
    </p>
  </div>
</div>

<hr />

<h2>🧩 Últimas publicaciones</h2>
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
