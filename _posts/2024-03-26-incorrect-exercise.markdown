---
layout: post
title:  "Incorrect Exercise"
date:   2024-03-26 07:07:30 -0700
category: blog
tags: topology lean
---

I picked up a book on topology called ["Introduction to Topology" by Bert Mendelson](https://archive.org/details/introduction-to-topology-by-mendelson-bert/) and it asked me to prove something that isn't always true.

A couple years ago, I decided it would be nice to learn a little bit more about topology because it seemed interesting. I ended up not sticking with it and the book has been collecting dust since then. Recently, I thought I would try to read it again. The first chapter is some set theory fundamentals, most of which I had already learned but I didn't want to just skip over it. To make sure I was still engaging with the chapter, I thought it would be cool to try and formalize the problems in that chapter with [Lean](https://leanprover-community.github.io/).

It turns out, formalizing mathematics is a bit more involved than constructing a proof. I didn't have any familiarity with Lean beforehand so it took a while to figure out how to use Mathlib effectively (and I'm probably not very efficient at it either) but now I can at least prove some theorems. The hardest part about proving these problems actually seems to be deciding on how to convert the problem from the text to Lean which I would not have expected. It turns out that translating human prose into a type system can be pretty difficult!

When I got to the exercises on Section 5, the first problem I encountered caused some difficulty. It reads, "Let X ⊂ A, Y ⊂ B. Prove that C(X × Y) = A × C(Y) ∪ C(X) × B". The text decides to define the symbol "⊂" to mean a set is a subset or equal to another set, the kind of idea that is usually reserved for "⊆". The Cartesian product of two sets X and Y is written as X × Y. Also, C(X) denotes the complement of the set X.

After writing this problem in Lean, I started encountering some troubles with the problem. No matter my approach, I would always encounter one of these sets being equal to "Set.univ", the universal set, which wouldn't make sense to be true. The proof was not getting discharged. I decided to think about it more and realized I could come up with a counter example to show that the statement was not always true.

Consider an element outside A × B. This element would be in C(X × Y) since X and Y are subsets of A and B respectively. However, this element would **not** in A × C(Y) ∪ C(X) × B since it would be outside of both A × C(Y) and C(X) × B. You can see this by noting that an element outside A × B would not be in A × anything nor would it be in anything × B.

So what do you do when a problem asks you to prove something that isn't true?

My answer was to prove that the statement holds if and only if another condition. After talking with my friend Bennett about this, we decided that the statement should hold when either A is a universal set or B is a universal set. From that, I spent some time proving this proposition and it worked really well. Plus, it has the added benefit that anyone else can see that the code compiles and that I can rigorously show my work to anyone without them needing to examine each statement carefully. It's super nice!

To see my code, you can check it out on my Github [here](https://github.com/rao107/incorrect_exercises)!
