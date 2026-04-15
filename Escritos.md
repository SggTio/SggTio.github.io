---
layout: page
title: Escritos
permalink: /escritos/
section: escritos
---

<div class="centered-quote">
  "La palabra es la muerte de la cosa.
  <br />
  <small>
  (Es decir: con el símbolo queda anulado lo indefinido de algo real y luego con esa muerte de la cosa [de la cual la palabra es memoria] aparece el objeto sustituyéndola).
  </small>
  <br />
  — <em>Jacques Lacan</em>
</div>

<div class="intro-grid">
  <div class="intro-block">
    Cuentos, poesía y cosas que leo.
  </div>
  <div class="intro-block">
    Soy el agrupamiento de todas las multitudes que me contienen en eterna contradicción. Un uróboro.
  </div>
</div>

<h2 class="posts-heading">Últimos escritos</h2>

{% assign escritos_posts = site.escritos | sort: 'date' | reverse %}
{% if escritos_posts.size > 0 %}
<div class="posts-grid">
  {% for post in escritos_posts limit:3 %}
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

<h3 class="posts-subheading">Otros escritos</h3>

<ul class="posts-list">
  {% for post in escritos_posts offset:3 %}
    <li><a href="{{ post.url | relative_url }}">{{ post.title }}</a> <small>({{ post.date | date: "%Y-%m-%d" }})</small></li>
  {% endfor %}
</ul>
