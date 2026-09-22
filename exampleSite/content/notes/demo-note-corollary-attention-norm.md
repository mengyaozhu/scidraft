+++
title = "A Bound on the Attention Output Norm (corollary)"
date = 2026-09-21T13:02:00+09:00
tags = ["Demo", "Corollary", "Geometry"]
math = true
showTitle = true
+++

**Demo note.** This note demonstrates what the **SciDraft** Hugo theme can do
for academic and scientific publishing — for research institutions, researchers
and students. Its content is demonstration material only: readers should ignore
whether the demo content is correct.

Reading a bound off a proposition is the standard use of a corollary, and the one worth
having here is a ceiling on how large an attention output can be. Since the output is a
convex combination of value vectors, its length can never exceed the longest of them.

The consequence is a stability statement that does not depend on the queries at all:
however sharp the attention distribution becomes, the outputs stay inside a ball whose
radius is set by the values.

**Corollary.** If the attention weights of row \(i\) form a probability distribution
\(A_{i\cdot}\) and \(o_i = \sum_j A_{ij} v_j\), then for any norm

$$
\lVert o_i \rVert \leq \max_j \lVert v_j \rVert ,
$$

with equality when the row is concentrated on a value vector of maximal norm.

The proof is the triangle inequality together with \(\sum_j A_{ij} = 1\):
\(\lVert \sum_j A_{ij} v_j \rVert \leq \sum_j A_{ij} \lVert v_j \rVert \leq \max_j
\lVert v_j \rVert\).

A bound of this kind is what licenses the common practice of normalising the value
projection rather than the output: controlling the radius of the value vectors controls
the radius of everything downstream.
