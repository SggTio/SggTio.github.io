---
layout: default
title: Archivo
permalink: /archivo/
section: archivo
---

# Archivo

Una navegación de todas las publicaciones por fecha.

{% assign all_items = site.mates | concat: site.notas | concat: site.escritos | sort: 'date' | reverse %}
{% assign items_by_month = all_items | group_by_exp: "item", "item.date | date: '%B %Y'" %}
{% for group in items_by_month %}
  <h2>{{ group.name }}</h2>
  <ul>
    {% for item in group.items %}
      <li><a href="{{ item.url | relative_url }}">{{ item.title }}</a></li>
    {% endfor %}
  </ul>
{% endfor %}
