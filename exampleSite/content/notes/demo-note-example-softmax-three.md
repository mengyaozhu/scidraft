+++
title = "Softmax of Three Scores (example)"
date = 2026-09-21T13:12:00+09:00
tags = ["Demo", "Example", "Softmax"]
math = true
showTitle = true
+++

**Demo note.** This note demonstrates what the **SciDraft** Hugo theme can do
for academic and scientific publishing — for research institutions, researchers
and students. Its content is demonstration material only: readers should ignore
whether the demo content is correct.

An example is where a formula stops being notation, and this one is small enough to check
by hand: three scores, one softmax, three probabilities that must sum to one.

The numbers below are the ones the companion snippet prints, so the arithmetic here and
the output of a few lines of code can be compared directly.

**Example.** Take the score vector \(z = (2.0,\, 1.0,\, 0.1)\). Exponentiating and
normalising,

$$
(e^{2.0},\, e^{1.0},\, e^{0.1}) = (7.389,\, 2.718,\, 1.105), \qquad
\sum_i e^{z_i} = 11.212 ,
$$

so the probabilities are

$$
p = (0.659,\, 0.242,\, 0.099),
$$

which sum to one to the precision shown. The largest score, only twice the smallest, still
receives more than six times its probability, because the exponential amplifies ratios
rather than differences.

Two things become visible at this size that are hard to see in general form: the ordering
of the scores is preserved exactly by the softmax, and the gap between the first and second
probability is much wider than the gap between the first two scores.
