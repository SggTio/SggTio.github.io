---
layout: page
title: Mates
permalink: /math/
section: math
---

<div class="centered-quote">
  “Escribo por la misma razón que respiro, porque si no lo hiciera moriría"
  — <em>Isaac Asimov</em>
</div>

<div class="escritos-intro-grid">
  <div class="escrito-block">
    Cosas relacionadas con las matemáticas computacionales que me gustan y que aprendo, así como reflexiones sobre la computación
  </div>
  <div class="escrito-block">
    Quisiera algún día poder ser el psiquiatra de una máquina
  </div>
</div>

<h2 style="text-align:center;"> Últimas notas</h2>
<div class="escritos-post-grid">
  {% assign mates_posts = site.mates | sort: 'date' | reverse %}
  {% for post in mates_posts limit:3 %}
    <div class="escrito-card">
      <a href="{{ post.url }}">{{ post.title }}</a><br>
        <p><small>{{ post.date | date: "%B %Y" }}</small></p>
    </div>
  {% endfor %}
</div>

<h3 style="margin-top:2rem;"> Otras notas</h3>
<ul class="escritos-list">
  {% for post in mates_posts offset:3 %}
    <li><a href="{{ post.url }}">{{ post.title }}</a> <small>({{ post.date | date: "%Y-%m-%d" }})</small></li>
  {% endfor %}
</ul>
