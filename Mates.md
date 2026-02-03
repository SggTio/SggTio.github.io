---
layout: page
title: Mates
permalink: /math/
custom_color: "#8A1B1D"
---

Bienvenidos a la sección de mates!

{% for post in site.categories.math %}
- [{{ post.title }}]({{ post.url }})
{% endfor %}
