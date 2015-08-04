---
title: Subnet Sum with Fixed Constituent Size
date: 2015-06-24 15:40
description: One way to tackle this NP-complete problem.
tags: [algorithms, JavaScript, Subnet Sum]
cta: Read about an NP-Complete problem.
subject: Algorithms
layout: post
---

On recently applying for a UX position at [Elastic](https://www.elastic.co/)
for their product [Kibana](https://www.elastic.co/products/kibana), I was given this complex yet
intriguing challenge:

> In javascript: Write a function that, given an array of 
> integers (x), and an integer (y), returns true if any two of 
> the integers in x add up to y. (Optional) Now, write a 
> function that, given the above arguments and an additional 
> integer (z), returns true if any z of the integers in x add 
> up to y.


While not the most optimal solution, my solution based
off of this Quora [answer](http://www.quora.com/I-need-to-write-an-algorithm-How-should-I-approach-the-following-problem/answer/Ivan-Krpelnik) works:

{%gist charandas/5fb5189ce1239c807afd %}

Another possible solution could be to not brute force the iteration between the start and stop positions, and instead compute all the permutations of the bitmasks that have `z` `1's`. That one could take some more work, using this [jsbin](http://jsbin.com/eXefawe/2/edit?html,js,output).

I was trying to keep it simple. But if you come across other solutions, feel free to share.