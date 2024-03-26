---
layout: post
title:  "Incorrect Exercise in Introduction to Topology by Bert Mendelson"
date:   2024-03-26 07:07:30 -0700
category: blog
tags: "set theory" topology lean
---

A while back, I picked up a book on topology called ["Introduction to Topology" by Bert Mendelson](https://archive.org/details/introduction-to-topology-by-mendelson-bert/). I decided it would be nice to learn a little bit more about topology even if I might not necessarily use it. I ended up not sticking with it and it has been collecting dust since then. Recently, I thought I would try to go through it again. The first chapter is some set theory fundamentals and I thought it would be a bit boring to go through them again. To spice it up, I thought it would be cool to try and formalize those problems in [Lean](https://leanprover-community.github.io/).

It turns out, formalizing mathematics is a bit more involved than constructing a proof. I didn't have any familiarity with Lean beforehand so it took a while to figure out how to use Mathlib effectively (and I'm probably not very efficient at it either) but now I can at least prove some theorems. The hardest part about proving these problems actually seems to be deciding on how to convert the problem from the text to Lean which I would not have expected.

In this first chapter on set theory, I started doing the problems in the section introducing products of sets. The first problem seemed straight forward but after writing the problem in Lean and taking a few steps, it seemed like it wasn't actually possible? The problem asks "Let X ⊆ A, Y ⊆ B. Prove that C(X × Y) = A × C(Y) ∪ C(X) × B". After some tweaking, I ended up proving that the original statement only true if and only if A or B is the universal set. That is, A or B contains every element.

To see my code, you can check it out on my Github [here](https://github.com/rao107/incorrect_exercises)!




