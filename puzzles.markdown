---
layout: default
title: puzzles
permalink: /puzzles/
---

<h1>puzzles</h1>

<ul>
  {% for tag in site.tags %}
    {% if tag[0] == "puzzle" %}
      {% for puzzle in tag[1] %}
        <li>
          <h2><a href="{{ puzzle.url }}">{{ puzzle.title }}</a></h2>
          {{ puzzle.excerpt }}
        </li>
      {% endfor %}
    {% endif %}
  {% endfor %}
</ul>
