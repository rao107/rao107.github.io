---
layout: post
title:  "Yelling about subtlties"
date:   2023-08-06 18:05:52 -0700
category: blog
tags: math "linear algebra" proof
---

Oh my god, I immediately forgot about this blog thing after I created it. Hi again LOL. Hope you've been doing well. I'm a grad student now! Isn't that exciting? Anyways, I decided to learn a little bit of linear algebra from the book [Linear Algebra Done Right](https://linear.axler.net/). It's a really good book with a ton of exercises.

I couldn't understand what was wrong with my proof since it *seemed* right on first glance. It took me a long time to figure out what was wrong and it's pretty subtle! So I want to talk about it here for other people to look at. The problems are questions 11 and 12 from Chapter 5 Section B of the previously mentioned Linear Algebra Done Right, the first of which is paraphrased here:

Let 𝘛 be an operator on a vector space 𝘝 over the complex numbers, 𝘱 be a complex polynomial, and α be a complex number. We'll only consider the field of complex numbers. Show that α is an eigenvalue of 𝘱(𝘛) if and only if α = 𝘱(λ) for some eigenvalue λ of 𝘛.

I showed that this was true by setting up a long chain of equalities showing that the two statements are equivalent. That meant that the equality went both ways so the if condition and the only if condition could both be satisfied in one fell swoop. However, that also hid a small assumption I didn't consciously make.

We start with α being an eigenvalue for 𝘱(𝘛):

α𝘷 = 𝘱(𝘛)𝘷

We then subsitute the definition of a polynomial on an operator:

𝘱(𝘛)𝘷 = (𝘢₀ 𝘐 + 𝘢₁ 𝘛 + ... + 𝘢ₘ 𝘛ᵐ)𝘷

The definition of addition on linear maps gives us our next equality:

(𝘢₀ 𝘐 + 𝘢₁ 𝘛 + ... + 𝘢ₘ 𝘛ᵐ)𝘷 = (𝘢₀ 𝘐)𝘷 + (𝘢₁ 𝘛)𝘷 + ... + (𝘢ₘ 𝘛ᵐ)𝘷

Scalar multiplication on linear maps gives us:

(𝘢₀ 𝘐)𝘷 + (𝘢₁ 𝘛)𝘷 + ... + (𝘢ₘ 𝘛ᵐ)𝘷 = 𝘢₀ (𝘐 𝘷) + 𝘢₁ (𝘛 𝘷) + ... + 𝘢ₘ (𝘛ᵐ 𝘷)

Let λ be some eigenvalue of 𝘛. Apply the definition of an eigenvalue again and multiply out (𝘐 𝘷) to 𝘷:

𝘢₀ (𝘐 𝘷) + 𝘢₁ (𝘛 𝘷) + ... + 𝘢ₘ (𝘛ᵐ 𝘷) = 𝘢₀ 𝘷 + 𝘢₁ (λ 𝘷) + ... + 𝘢ₘ (λᵐ 𝘷)

Use the distributive property now:

𝘢₀ 𝘷 + 𝘢₁ (λ 𝘷) + ... + 𝘢ₘ (λᵐ 𝘷) = (𝘢₀ + 𝘢₁ λ + ... + 𝘢ₘ λᵐ)𝘷

The definition of a polynomial is now used:

(𝘢₀ + 𝘢₁ λ + ... + 𝘢ₘ λᵐ)𝘷 = 𝘱(λ)𝘷

Using these equalities, we find that α𝘷 = 𝘱(λ)𝘷 implying α = 𝘱(λ) completing the proof.

Now, this proof is correct as long as the we are only considering complex vector spaces. However, question 12 expands on this and asks us to show that this DOES NOT WORK for real vector spaces.

Now, when I first saw this question, my immediate thought was to look through my proof and find any equality that doesn't hold when we look at real vector spaces. But all of the equalities are still solid even when we change ℂ to ℝ. So what gives? Why the hell wouldn't this work for real vector spaces? I'll give you some space to think here. Scroll down once you think you've found an answer!




\[SPACE FOR YOU TO THINK\]




The part of the proof that is not satisfied anymore is:

Let λ be some eigenvalue of 𝘛.

What? How would just *letting* λ be an eigenvalue of 𝘛 break going from complex to real vector spaces?

As it turns out, operators on real vector spaces DO NOT NECESSARILY have an eigenvalue. If you want an example, the linear map represented by rotating by 90 degrees in ℝ² does not have an eigenvalue since all nonzero vectors will never equal a multiple of itself when rotated. However, complex operators will always have an eigenvalue. I had forgotten about this lemma because usually it's assumed that we work in complex vector spaces in linear algebra so I didn't *thoroughly* interrogate my assumptions. It ended up taking me longer than I would like to admit to catch this lol. Take this as a cautionary warning to watch out for the assumptions you make without thinking.



<!--
Just for the sake of clarity and as a little refresher, I'll take some time to explain some of these terms.

An operator is a specific kind of linear map which are functions where 𝘧(𝘹 + 𝘺) = 𝘧(𝘹) + 𝘧(𝘺) and 𝘧(𝘤𝘹) = 𝘤 𝘧(𝘹) (FYI these two conditions are called additivity and homogeneity respectively). The only thing different with an operator is that the input vector space is the same as the output vector space. In other words, if you apply 𝘛 on a complex number, you get another complex number.

A complex polynomial is
-->
