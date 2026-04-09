---
layout: page
title: Mates
permalink: /math/
section: math
---

"Escribo por la misma razón que respiro, porque si no lo hiciera moriría"
— *Isaac Asimov*

Cosas relacionadas con las matemáticas computacionales que me gustan y que aprendo, así como reflexiones sobre la computación

Quisiera algún día poder ser el psiquiatra de una máquina

---

## Geometría Computacional

Proyectos y reportes del curso de geometría computacional: triangulaciones, envolventes convexas, algoritmos de barrido y más.

{% assign geo_posts = site.mates | where: "subsection", "geometria-computacional" | sort: 'date' | reverse %}
{% for post in geo_posts %}
<div style="margin-bottom:16px; padding:12px 16px; border-left:3px solid #5cb8ff; background:#181820; border-radius:6px;">
  <a href="{{ post.url }}" style="font-size:1.1rem; font-weight:600;">{{ post.title }}</a><br>
  <small style="color:#a0a0b8;">{{ post.date | date: "%B %Y" }}</small>
  {% if post.description %}<br><small style="color:#a0a0b8;">{{ post.description }}</small>{% endif %}
</div>
{% endfor %}

{% if geo_posts.size == 0 %}
*Próximamente...*
{% endif %}

---

## Otras notas

{% assign other_posts = site.mates | where_exp: "item", "item.subsection != 'geometria-computacional'" | sort: 'date' | reverse %}
{% for post in other_posts limit:3 %}

[{{ post.title }}]({{ post.url }})  
{{ post.date | date: "%B %Y" }}

{% endfor %}

{% if other_posts.size > 3 %}
### Archivo
{% for post in other_posts offset:3 %}
* [{{ post.title }}]({{ post.url }}) ({{ post.date | date: "%Y-%m-%d" }})
{% endfor %}
{% endif %}
