---
layout: page
title: Notas e ideas
permalink: /notas/
section: notas
---

<div class="centered-quote">
  "Toda declaración de amor es urgente, porque vamos a morir"
  — <em>Raúl Zurita</em>
</div>

<div class="intro-grid">
  <div class="intro-block">
    Política, retazos e ideas vagas.
  </div>
  <div class="intro-block">
    El contraejemplo más conocido al lema de Yoneda soy yo, que no estoy a la altura de mis amigos.
  </div>
</div>

<h2 class="posts-heading">Últimas notas e ideas</h2>

{% assign notas_posts = site.notas | sort: 'date' | reverse %}
{% if notas_posts.size > 0 %}
<div class="posts-grid">
  {% for post in notas_posts limit:3 %}
    <div class="posts-card">
      <a href="{{ post.url | relative_url }}">
        <h3>{{ post.title }}</h3>
        <p><small>{{ post.date | date: "%B %Y" }}</small></p>
      </a>
    </div>
  {% endfor %}
</div>
{% else %}
<p class="posts-empty"><em>Próximamente...</em></p>
{% endif %}

<h3 class="posts-subheading">Otras notas y blog</h3>

<ul class="posts-list">
  {% for post in notas_posts offset:3 %}
    <li><a href="{{ post.url | relative_url }}">{{ post.title }}</a> <small>({{ post.date | date: "%Y-%m-%d" }})</small></li>
  {% endfor %}
</ul>
