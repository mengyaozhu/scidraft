+++
title = "The Gram Matrix Is Positive Semi-Definite (property)"
date = 2026-09-21T08:52:00+09:00
tags = ["Demo", "Property", "Linear Algebra"]
mathTitle = "The Gram Matrix Is Positive Semi-Definite"
mathCategory = "Properties"
mathAliases = ["Gram Matrix PSD", "Positive Semi-Definite Kernel Matrix", "Gram Matrix Property"]
mathSummary = "Shows that any Gram matrix is positive semi-definite, so its eigenvalues are non-negative and it defines an inner product."
math = true
showTitle = true
+++

**Demo note.** This note demonstrates what the **SciDraft** Hugo theme can do
for academic and scientific publishing — for research institutions, researchers
and students. Its content is demonstration material only: readers should ignore
whether the demo content is correct.

The matrix of pairwise inner products of a set of vectors has a property that constrains
what similarity patterns are possible: it is symmetric and positive semi-definite, so its
eigenvalues are non-negative and its diagonal entries are the squared lengths of the
vectors.

The property is used in both directions. Forward, it says that a kernel matrix computed from
a feature map is automatically a valid Gram matrix; backward, it says that an arbitrary
table of similarities is not necessarily realisable by any embedding.

**Property.** For vectors \(x_1, \dots, x_n \in \mathbb{R}^{d}\), the Gram matrix
\(G_{ij} = \langle x_i, x_j \rangle\) satisfies

$$
G = X X^{\top} \succeq 0, \qquad G_{ii} = \lVert x_i \rVert^{2} ,
$$

for the matrix \(X\) with rows \(x_i\). Positive semi-definiteness follows from
\(u^{\top} G u = \lVert X^{\top} u \rVert^{2} \geq 0\) for every \(u\), and it implies
that every eigenvalue of \(G\) is non-negative and that \(\lvert G_{ij} \rvert \leq
\sqrt{G_{ii} G_{jj}}\) by Cauchy-Schwarz.

The self-attention score matrix \(Q Q^{\top}\) is an instance: it records the similarity of
each query with each other query, and its diagonal is the squared norm of each query.

Because the property is a constraint, it also serves as a test: a similarity table whose
eigenvalues include a clearly negative one cannot have come from inner products of real
vectors, so the feature map that supposedly produced it is mis-specified.
