+++
title = "Matrix Products Do Not Commute (counterexample)"
date = 2026-09-21T12:12:00+09:00
tags = ["Demo", "Counterexample", "Linear Algebra"]
math = true
showTitle = true
+++

**Demo note.** This note demonstrates what the **SciDraft** Hugo theme can do
for academic and scientific publishing — for research institutions, researchers
and students. Its content is demonstration material only: readers should ignore
whether the demo content is correct.

A counterexample is the cheapest way to kill a plausible statement, and the one worth
having ready concerns the order of matrix multiplication. The tempting assertion that
\(AB = BA\) fails for almost every pair of matrices, and it fails on the smallest possible
example.

The consequence for models is concrete: two linear layers composed in one order compute a
different function from the same two layers in the other order, so the order in a
transformer block is a modelling decision rather than a coding detail.

**Counterexample.** Take

$$
A = \begin{pmatrix} 1 & 1 \\ 0 & 1 \end{pmatrix}, \qquad
B = \begin{pmatrix} 1 & 0 \\ 1 & 1 \end{pmatrix} .
$$

Then

$$
AB = \begin{pmatrix} 2 & 1 \\ 1 & 1 \end{pmatrix}, \qquad
BA = \begin{pmatrix} 1 & 1 \\ 1 & 2 \end{pmatrix},
$$

which are different matrices, so \(AB \neq BA\). Both products are invertible with
determinant one, so this is not a degenerate case in any respect.

What is true, and sometimes confused with commutation, is that ranks and traces of
products are order-independent when the shapes allow both orders: \(\operatorname{tr}(AB) =
\operatorname{tr}(BA)\) holds even here, with both equal to three.

The example also shows why reordering two projections with different roles — queries and
keys, say — changes the model rather than merely the notation.
