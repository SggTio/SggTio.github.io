---
layout: page
title: Notas e ideas
permalink: /blog/
section: blog
---

<div class="centered-quote">
  “Toda declaración de amor es urgente, porque vamos a morir"
  — <em>Raúl Zurita</em>
</div>

<div class="escritos-intro-grid">
  <div class="escrito-block">
    Política, retazos e ideas vagas.
  </div>
  <div class="escrito-block">
    El contraejemplo más conocido al lema de Yoneda soy yo, que no estoy a la altura de mis amigos.
  </div>
</div>

<h2 style="text-align:center;"> Últimas notas e ideas</h2>
<div class="escritos-post-grid">
  {% assign notas_posts = site.notas | sort: 'date' | reverse %}
  {% for post in notas_posts limit:3 %}
    <div class="escrito-card">
      <a href="{{ post.url }}">{{ post.title }}</a><br>
        <p><small>{{ post.date | date: "%B %Y" }}</small></p>
    </div>
  {% endfor %}
</div>

<h3 style="margin-top:2rem;"> Otras notas y blog</h3>
<ul class="escritos-list">
  {% for post in notas_posts offset:3 %}
    <li><a href="{{ post.url }}">{{ post.title }}</a> <small>({{ post.date | date: "%Y-%m-%d" }})</small></li>
  {% endfor %}
</ul>

