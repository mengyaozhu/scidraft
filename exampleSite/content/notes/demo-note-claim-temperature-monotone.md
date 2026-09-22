+++
title = "Temperature Cannot Sharpen (claim)"
date = 2026-09-21T08:12:00+09:00
tags = ["Demo", "Claim", "Softmax"]
math = true
showTitle = true
+++

**Demo note.** This note demonstrates what the **SciDraft** Hugo theme can do
for academic and scientific publishing — for research institutions, researchers
and students. Its content is demonstration material only: readers should ignore
whether the demo content is correct.

A claim is a statement put forward as true and argued for, not yet established as a
theorem. The one here concerns temperature scaling: raising the temperature flattens a
distribution, and it cannot make the most probable token more probable than it already
was.

The claim is worth stating because the opposite is sometimes assumed — that a large
temperature might sharpen a peaky distribution. The argument below shows why the largest
probability is monotone in the temperature, so no setting of it can increase that
maximum.

**Claim.** Let \(z \in \mathbb{R}^{V}\) be a score vector and let \(p^{(T)} =
\operatorname{softmax}(z / T)\) for \(T \gt 0\). Writing \(M(T) = \max_v p^{(T)}_v\),
the claim is that

$$
M(T_2) \leq M(T_1) \qquad \text{whenever } T_2 \geq T_1 \gt 0 .
$$

The argument: the temperature enters only through the ratio \(z / T\), which shrinks the
spread of the scores as \(T\) grows, and the softmax is a monotone function of that
spread. Equivalently, for \(T \geq 1\) the transformed scores \(z/T\) lie in the convex
hull of the original scores and the origin, and the maximum probability of a distribution
is a convex function of its scores.

The claim quantifies a lever rather than a guarantee: temperature cannot create
confidence, it can only redistribute the confidence the scores already justify — which is
why sampling at high temperature does not make a model more accurate, only more
diverse.
