---
layout: default
title: blog
permalink: /blog/
---

<h1>blog</h1>

<ul>
  {% for post in site.posts %}
    {% unless post.tags contains "puzzle" %}
    <li>
      <h2><a href="{{ post.url }}">{{ post.title }}</a></h2>
      {{ post.excerpt }}
    </li>
    {% endunless %}
  {% endfor %}
</ul>
