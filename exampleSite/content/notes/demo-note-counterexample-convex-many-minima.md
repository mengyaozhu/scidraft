+++
title = "A Convex Function with Many Minima (counterexample)"
date = 2026-09-21T07:02:00+09:00
tags = ["Demo", "Counterexample", "Optimization"]
math = true
showTitle = true
+++

**Demo note.** This note demonstrates what the **SciDraft** Hugo theme can do
for academic and scientific publishing — for research institutions, researchers
and students. Its content is demonstration material only: readers should ignore
whether the demo content is correct.

Convexity is often described as the property that guarantees a unique optimum, and the
statement is false as written: convex functions can have a whole interval of minimisers.
The counterexample is a flat-bottomed function, convex everywhere and constant on a
segment.

The distinction that survives is between convex and strictly convex, and it matters in
practice because a flat region is exactly where a gradient method stalls without having
found an isolated point.

**Counterexample.** Define \(f : \mathbb{R} \to \mathbb{R}\) by

$$
f(x) = \max(0,\, \lvert x \rvert - 1) .
$$

The function is convex, as a maximum of convex functions composed with the convex
\(\lvert x \rvert\), and it is zero on the whole interval \([-1, 1]\). Every point of
that interval is a global minimiser, so the minimiser set has more than one element;
gradient descent started inside the interval sees \(f'(x) = 0\) and stops at whichever
point it reached first.

Strict convexity rules this out: if \(f\) were strictly convex with a minimiser, that
minimiser would be unique.

For a trained model the flat region is a shape to look for rather than a pathology: it
means many parameter settings are equally good on the objective, and any preference among
them has to come from regularisation rather than from the loss.
