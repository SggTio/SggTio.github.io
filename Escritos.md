---
layout: page
title: Escritos
permalink: /escritos/
section: escritos
---

<div class="centered-quote">
  “La palabra es la muerte de la cosa.  
  <br />
  <small>
  (Es decir: con el símbolo queda anulado lo indefinido de algo real y luego con esa muerte de la cosa [de la cual la palabra es memoria] aparece el objeto sustituyéndola).
  </small>
  <br />
  — <em>Jacques Lacan</em>
</div>

<div class="escritos-intro-grid">
  <div class="escrito-block">
    Política, retazos e ideas vagas.
  </div>
  <div class="escrito-block">
    El contraejemplo más conocido al lema de Yoneda soy yo, que no estoy a la altura de mis amigos.
  </div>
</div>

<h2 style="text-align:center;"> Últimos escritos</h2>
<div class="escritos-post-grid">
  {% assign escritos_posts = site.categories.escritos | sort: 'date' | reverse %}
  {% for post in escritos_posts limit:3 %}
    <div class="escrito-card">
      <a href="{{ post.url }}">{{ post.title }}</a><br>
        <p><small>{{ post.date | date: "%B %Y" }}</small></p>
    </div>
  {% endfor %}
</div>

<h3 style="margin-top:2rem;"> Otros escritos</h3>
<ul class="escritos-list">
  {% for post in escritos_posts offset:3 %}
    <li><a href="{{ post.url }}">{{ post.title }}</a> <small>({{ post.date | date: "%Y-%m-%d" }})</small></li>
  {% endfor %}
</ul>
