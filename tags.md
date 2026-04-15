---
layout: page
title: Etiquetas
permalink: /etiquetas/
section: etiquetas
---

{% assign all_items = site.mates | concat: site.notas | concat: site.escritos %}
{% assign tag_list = "" | split: "" %}
{% for item in all_items %}
  {% for tag in item.tags %}
    {% unless tag_list contains tag %}
      {% assign tag_list = tag_list | push: tag %}
    {% endunless %}
  {% endfor %}
{% endfor %}
{% assign tag_list = tag_list | sort %}

<h2>Etiquetas</h2>
<ul>
  {% for tag in tag_list %}
    {% assign tagged = all_items | where_exp: "item", "item.tags contains tag" %}
    <li>
      <a href="#{{ tag }}">{{ tag }}</a> ({{ tagged.size }})
    </li>
  {% endfor %}
</ul>

{% for tag in tag_list %}
  <h3 id="{{ tag }}">{{ tag }}</h3>
  <ul>
    {% assign tagged = all_items | where_exp: "item", "item.tags contains tag" %}
    {% for item in tagged %}
      <li><a href="{{ item.url | relative_url }}">{{ item.title }}</a></li>
    {% endfor %}
  </ul>
{% endfor %}
