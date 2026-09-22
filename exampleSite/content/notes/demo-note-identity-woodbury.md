+++
title = "The Woodbury Identity (identity)"
date = 2026-09-21T14:42:00+09:00
tags = ["Demo", "Identity", "Linear Algebra"]
math = true
showTitle = true
+++

**Demo note.** This note demonstrates what the **SciDraft** Hugo theme can do
for academic and scientific publishing — for research institutions, researchers
and students. Its content is demonstration material only: readers should ignore
whether the demo content is correct.

The Woodbury identity rewrites the inverse of a matrix plus a low-rank correction in
terms of the inverse of the original matrix and a much smaller inverse. It is the algebraic
fact behind every method that updates a large system cheaply.

The sizes are what makes it useful: the correction inverse is of the order of the rank
rather than of the matrix, so an update of rank \(r\) costs \(r^{3}\) work instead of
\(n^{3}\).

**Identity (Woodbury).** Let \(A \in \mathbb{R}^{n \times n}\) be invertible, and let
\(U \in \mathbb{R}^{n \times r}\), \(C \in \mathbb{R}^{r \times r}\) and \(V \in
\mathbb{R}^{r \times n}\) with \(C\) and \(A + UCV\) invertible. Then

$$
\left(A + UCV\right)^{-1}
= A^{-1} - A^{-1} U \left(C^{-1} + V A^{-1} U\right)^{-1} V A^{-1},
$$

where the middle inverse is \(r \times r\). The identity is verified by multiplying the
right-hand side by \(A + UCV\) and collecting terms; the special case \(C = I\),
\(V = U^{\top}\) gives the update used when a low-rank term is added to a covariance.

In a model, the pattern shows up whenever a large linear system is modified by something
thin — a new adapter, a few constrained directions, a rank-limited edit — since the identity
turns the cost of the update from the size of the matrix into the size of the change.
