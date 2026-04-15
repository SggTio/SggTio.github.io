---
layout: page
title: Mates
permalink: /mates/
section: mates
---

<div class="centered-quote">
  "Escribo por la misma razón que respiro, porque si no lo hiciera moriría"
  — <em>Isaac Asimov</em>
</div>

<div class="intro-grid">
  <div class="intro-block">
    Cosas relacionadas con las matemáticas computacionales que me gustan y que aprendo, así como reflexiones sobre la computación.
  </div>
  <div class="intro-block">
    Quisiera algún día poder ser el psiquiatra de una máquina.
  </div>
</div>

<h2 class="posts-heading">Redes Neuronales</h2>

{% assign nn_posts = site.mates | where: "subsection", "redes-neuronales" | sort: 'date' | reverse %}
{% if nn_posts.size > 0 %}
<div class="posts-grid">
  {% for post in nn_posts %}
    <div class="posts-card">
      <a href="{{ post.url | relative_url }}">
        <h3>{{ post.title }}</h3>
        <p><small>{{ post.date | date: "%B %Y" }}</small></p>
        {% if post.description %}<p><small>{{ post.description }}</small></p>{% endif %}
      </a>
    </div>
  {% endfor %}
</div>
{% else %}
<p class="posts-empty"><em>Próximamente...</em></p>
{% endif %}

<h2 class="posts-heading">Geometría Computacional</h2>

{% assign geo_posts = site.mates | where: "subsection", "geometria-computacional" | sort: 'date' | reverse %}
{% if geo_posts.size > 0 %}
<div class="posts-grid">
  {% for post in geo_posts %}
    <div class="posts-card">
      <a href="{{ post.url | relative_url }}">
        <h3>{{ post.title }}</h3>
        <p><small>{{ post.date | date: "%B %Y" }}</small></p>
        {% if post.description %}<p><small>{{ post.description }}</small></p>{% endif %}
      </a>
    </div>
  {% endfor %}
</div>
{% else %}
<p class="posts-empty"><em>Próximamente...</em></p>
{% endif %}

<h3 class="posts-subheading">Otras notas</h3>

{% assign other_posts = site.mates | where_exp: "item", "item.subsection != 'geometria-computacional' and item.subsection != 'redes-neuronales'" | sort: 'date' | reverse %}
<ul class="posts-list">
  {% for post in other_posts %}
    <li><a href="{{ post.url | relative_url }}">{{ post.title }}</a> <small>({{ post.date | date: "%Y-%m-%d" }})</small></li>
  {% endfor %}
</ul>
