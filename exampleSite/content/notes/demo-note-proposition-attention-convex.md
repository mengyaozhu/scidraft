+++
title = "Attention Outputs Are Convex Combinations (proposition)"
date = 2026-09-21T10:22:00+09:00
tags = ["Demo", "Proposition", "Attention"]
mathTitle = "Attention Outputs Are Convex Combinations"
mathCategory = "Propositions"
mathAliases = ["Attention Convexity Proposition", "Convex Combination Proposition", "Attention Weights Sum to One"]
mathSummary = "States that attention weights are non-negative and sum to one, so each output is a convex combination of the values."
math = true
showTitle = true
+++

**Demo note.** This note demonstrates what the **SciDraft** Hugo theme can do
for academic and scientific publishing — for research institutions, researchers
and students. Its content is demonstration material only: readers should ignore
whether the demo content is correct.

Attention is often drawn as a lookup, and the proposition below says what kind of lookup
it is: a convex combination of the value vectors, with weights that are non-negative and
sum to one because they came out of a softmax.

The statement constrains the output geometry before any training happens, and it is the
reason an attention output cannot be extrapolated outside the region its value vectors
span — no matter how extreme the queries become.

**Proposition.** Let \(A \in \mathbb{R}^{T \times T}\) be the row-stochastic matrix
produced by the softmax in attention, so that \(A_{ij} \geq 0\) and \(\sum_j A_{ij} = 1\)
for every row \(i\). Then each output row \(o_i = \sum_j A_{ij} v_j\) lies in the convex
hull of the value vectors \(v_1, \dots, v_T\).

A one-line consequence is a bound on the output,

$$
\lVert o_i \rVert_2 \leq \max_j \lVert v_j \rVert_2 ,
$$

by the triangle inequality and \(\sum_j A_{ij} = 1\).

The bound is inherited rather than learned: making attention more confident moves the
output towards a vertex of the hull, and no amount of training can move it outside.
