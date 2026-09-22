+++
title = "Proof: Attention Outputs Lie in the Convex Hull (proof)"
date = 2026-09-21T09:52:00+09:00
tags = ["Demo", "Proof", "Attention"]
math = true
showTitle = true
+++

**Demo note.** This note demonstrates what the **SciDraft** Hugo theme can do
for academic and scientific publishing — for research institutions, researchers
and students. Its content is demonstration material only: readers should ignore
whether the demo content is correct.

The statement that attention outputs are convex combinations follows from two facts
about the softmax and one line of the triangle inequality, and the proof shows exactly
where each is used.

Writing it out also shows what would break it. Remove the normalisation of the weights, or
allow them to be negative, and the argument fails at the first step — the outputs are then
free to leave the hull, which is what happens in attention variants that drop the
softmax.

**Proof.** Let \(A\) be the row-stochastic matrix of attention weights, so \(A_{ij} \geq
0\) and \(\sum_{j} A_{ij} = 1\) for every \(i\), and let \(o_i = \sum_j A_{ij} v_j\).

Step one, the weights form a distribution: both properties follow from the definition of
the softmax together with the fact that exponentials are strictly positive.

Step two, the output is a convex combination: a sum of the form \(\sum_j A_{ij} v_j\) with
non-negative coefficients adding to one is the definition of a convex combination, so
\(o_i\) lies in the convex hull of the value vectors by definition of the hull.

Step three, the norm bound: by the triangle inequality and \(\sum_j A_{ij} = 1\),

$$
\lVert o_i \rVert = \Bigl\lVert \sum_j A_{ij} v_j \Bigr\rVert
\leq \sum_j A_{ij} \lVert v_j \rVert
\leq \Bigl(\max_j \lVert v_j \rVert\Bigr) \sum_j A_{ij}
= \max_j \lVert v_j \rVert .
$$

Equality in the last step requires a single non-zero weight on a maximal vector, which
is the limit of a fully peaked attention row.

The proof is short because the softmax does the work up front: any normalisation that
produces non-negative weights summing to one gives the same conclusion, which is why the
hull argument is quoted for attention without inspecting the score function at all.
