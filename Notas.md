---
layout: page
title: Notas e ideas
permalink: /blog/
custom_color: "#8A1B1D"
---

Estas es la sección de notas e ideas!

{% for post in site.categories.blog %}
- [{{ post.title }}]({{ post.url }})
{% endfor %}
