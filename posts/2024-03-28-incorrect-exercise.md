---
title: "Finding mistakes using Lean"
date:  2024-03-28 18:44:54
---

### This blog post may have been changed since its original publication during a blog migration.
<br/>

*TL;DR:* The definition of a set's complement in Mendelson's book was defined differently than the definition found in Mathlib causing headaches and pain. Below is how I found out about the apparent mistake and the steps to find its source.
<br/>

I picked up a book on topology called ["Introduction to Topology" by Bert Mendelson](https://archive.org/details/introduction-to-topology-by-mendelson-bert/), and it seems to ask me to prove something that isn't always true?

A couple of years ago, I decided it would be nice to learn a little bit more about topology because it seemed interesting. I ended up not sticking with it and the book has been collecting dust since then. Recently, I thought I would try to read it again. The first chapter is some set theory fundamentals, most of which I had already learned, but I didn't want to just skip over it. To make sure I was still engaging with the chapter, I thought it would be cool to try and formalize the problems in that chapter with [Lean](https://leanprover-community.github.io/).

It turns out, that formalizing mathematics is a bit more involved than constructing a proof. I didn't have too much familiarity with Lean beforehand so it took a while to figure out how to use Mathlib effectively (and I'm probably not very efficient at it either) but now I can at least prove some theorems. The hardest part about proving these problems seems to be (surprisingly) deciding on how to convert the problem from the text to Lean which I would not have expected. It turns out that translating human prose into a type system can be pretty difficult!

When I got to the exercises in Section 5, the first problem I encountered caused some difficulty. It reads, "Let X ⊂ A, Y ⊂ B. Prove that C(X × Y) = A × C(Y) ∪ C(X) × B". The text decides to define the symbol "⊂" to mean a set is a subset or equal to another set, the kind of idea that is usually reserved for "⊆". The Cartesian product of two sets X and Y is written as X × Y. Also, C(X) denotes the complement of the set X. Mendelson makes a unique decision when defining the complement by having it depend on a superset that contains the set we are taking the complement of. It's more similar to the definition of set minus than what I would think of as its complement. The text says, "The set S may be fixed throughout a given discussion, in which case the complement of A in S may simply be called the complement of A and be denoted by C(A)." It's an odd definition when Mendelson could have introduced the universal set and defined the complement of a set X as the elements not in X.

After writing this problem in Lean, I started encountering some troubles with the problem. No matter my approach, I would always encounter one of these sets being equal to "Set.univ", the universal set, which wouldn't make sense to be true. The proof was not getting discharged. I decided to think about it more and realized I could come up with a counter-example to show that the statement was not always true.

Consider an element outside A × B. This element would be in C(X × Y) since X and Y are subsets of A and B respectively. However, this element would **not** in A × C(Y) ∪ C(X) × B since it would be outside both A × C(Y) and C(X) × B. You can see this by noting that an element outside A × B would not be in A × anything nor would it be in anything × B.

So what do you do when a problem asks you to prove something that isn't true?

My answer was to prove that the statement holds if and only if another condition. After talking with my friend Bennett about this, we decided that the statement should hold when either A is a universal set or B is a universal set. From that, I spent some time proving this proposition and it worked really well. Plus, it has the added benefit that anyone else can see that the code compiles and that I can rigorously show my work to anyone without them needing to examine each statement carefully. It's super nice!

It also provides some cool insight about when the problem is actually true to understand what the author's intentions were behind the problem. The exercise is in fact very similar to a theorem that *is* always true. In the Mathlib library for Lean, its name is `Set.compl_prod_eq_union` and it looks like this: `(s ×ˢ t)ᶜ = sᶜ ×ˢ Set.univ ∪ Set.univ ×ˢ tᶜ`

The only difference between the exercise in the book and the above theorem is the universal set replacing A and B.

<br>

...wait.

What if A and B were "implied" to be universal sets?

Oh my god.

When Mendelson let X ⊂ A and Y ⊂ B, he might have been defining the sets that the reader would have to take the complement of. That means C(X) and C(Y) *actually means* A - X and B - Y respectively. Instead of creating a specific symbol to denote the universal set, Mendelson decides to use other sets instead. When defining the complement he says that the complement is always implied to be a complement of another set. Again, this is more like the definition of set minus. However, in this exercise it was *not* obvious to me what sets we were taking the complement of. Mendelson could have used other syntaxes for the complement that would *explicitly* show what superset we take the complement of like the ones he introduces in chapter 1 section 3.

This is a consistent problem I've encountered when attempting to formalize problems from this book.

Like I said before, writing Lean code to properly reflect the author's intentions for these problems is supremely difficult. Another example is in the next chapter covering metric spaces. The author gives the classic epsilon-delta definition of continuity and asks the reader to prove some functions are continuous with respect to some distance metric. It would be more true to the text to translate the text with the distance metric and write an epsilon-delta proof; However, Mathlib offers a different definition of continuity based on topological spaces which have not been introduced until the third chapter. While it hasn't been introduced yet, it is still a valid and general definition of continuity. Moreover, there is already a theorem in Mathlib to convert between the epThis is especially peculiar whensilon-delta and topological definitions of continuity. However, it is much easier to translate from the text to Lean by simply using the provided `Continuous` structure.

In the end, it's really up to us to decide what we want out of formalizing mathematics. Whether our code compiles is a reflection of our strength in formal proofs, but whether the statement proven in Lean properly reflects the problem we want to solve is up to us. In the end, I'm satisfied with my work and I'm still plenty happy with it. Whether you would be happy with it is up to you.

If you want to see how far along I get with proving all the exercises of this book, you can always find it [here](https://github.com/rao107/topo-book).
