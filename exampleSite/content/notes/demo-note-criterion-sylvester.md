+++
title = "Sylvester's Criterion for Positive Definiteness (criterion)"
date = 2026-09-21T09:42:00+09:00
tags = ["Demo", "Criterion", "Linear Algebra"]
mathTitle = "Sylvester's Criterion for Positive Definiteness"
mathCategory = "Criteria"
mathAliases = ["Sylvester's Criterion", "Leading Principal Minors Test", "Positive Definiteness Test"]
mathSummary = "Decides positive definiteness by checking the signs of a matrix's leading principal minors rather than inspecting its eigenvalues."
math = true
showTitle = true
+++

**Demo note.** This note demonstrates what the **SciDraft** Hugo theme can do
for academic and scientific publishing — for research institutions, researchers
and students. Its content is demonstration material only: readers should ignore
whether the demo content is correct.

Positive definiteness is the condition that decides whether a quadratic form curves
upwards, and Sylvester's criterion turns it into a finite computation: look at the
determinants of the leading blocks of the matrix, from the top left outwards.

The criterion is used wherever a second-order quantity has to be checked — a Hessian for a
local minimum, a covariance for a Gaussian density, a preconditioner for a second-order
optimiser — and each of those settings inherits the same test.

**Criterion (Sylvester).** A symmetric matrix \(M \in \mathbb{R}^{n \times n}\) is
positive definite if and only if every leading principal minor is positive:

$$
\det M_k \gt 0, \qquad M_k = \left(M_{ij}\right)_{1 \leq i, j \leq k},
\qquad k = 1, \dots, n .
$$

Two checks worth keeping alongside it: a positive definite matrix has all eigenvalues
positive and hence a non-zero determinant, so the criterion is consistent with the spectral
definition; and replacing \(\gt\) by \(\geq\) gives the test for positive
semi-definiteness, where the minors need not all be positive, which is why the two cases are
stated separately.

For a machine-learning problem the criterion is mostly used to diagnose failure: a Hessian
whose minors change sign marks a saddle rather than a minimum, which is what makes the
distinction visible in a computed matrix even when the loss curve is flat.
