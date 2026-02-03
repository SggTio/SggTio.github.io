---
layout: page
title: Escritos
permalink: /escritos/
section: escritos
custom_color: "#8A1B1D"
---

Bienvenidos a mis escritos!

{% for post in site.categories.escritos %}
- [{{ post.title }}]({{ post.url }})
{% endfor %}
