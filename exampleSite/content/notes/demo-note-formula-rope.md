+++
title = "Rotary Position Embedding (formula)"
date = 2026-09-21T15:12:00+09:00
tags = ["Demo", "Formula", "Geometry"]
mathTitle = "Rotary Position Embedding"
mathCategory = "Formulas"
mathAliases = ["RoPE", "Rotary Positional Encoding"]
mathSummary = "Encodes position by rotating query and key vectors, so attention scores depend on relative distance rather than absolute index."
math = true
showTitle = true
+++

**Demo note.** This note demonstrates what the **SciDraft** Hugo theme can do
for academic and scientific publishing — for research institutions, researchers
and students. Its content is demonstration material only: readers should ignore
whether the demo content is correct.

Position information has to enter attention somewhere, and one way is to rotate the query
and key vectors by a position-dependent angle. The formula is appealing because the effect
on the score depends only on the difference of the two positions.

That property is what the notation is chosen to display: a rotation preserves lengths and
turns an inner product between rotated vectors into a function of the angle between
them.

**Formula (rotary embedding).** Split a head vector \(x \in \mathbb{R}^{d_h}\) into
\(d_h/2\) pairs \((x_{2i-1}, x_{2i})\). At position \(m\) and frequency \(\theta_i\),
the rotated vector \(R_{\Theta, m} x\) has, in each pair,

$$
\begin{pmatrix} \tilde{x}_{2i-1} \\ \tilde{x}_{2i} \end{pmatrix} =
\begin{pmatrix} \cos(m\theta_i) & -\sin(m\theta_i) \\ \sin(m\theta_i) & \cos(m\theta_i) \end{pmatrix}
\begin{pmatrix} x_{2i-1} \\ x_{2i} \end{pmatrix},
\qquad
\theta_i = 10000^{-2(i-1)/d_h} .
$$

Rotating both the query at position \(m\) and the key at position \(n\) gives an inner
product that depends on \(m - n\) rather than on either position alone, because a
rotation by \(m\theta\) composed with the inverse rotation by \(n\theta\) is a rotation
by \((m-n)\theta\).

The price of the construction is that it encodes relative position only through rotation:
a query and a key at the same position are unaffected, so the scheme says nothing about
absolute location, which is either a feature or a limitation depending on the task.
