+++
title = "Softmax Is Invariant to a Shift (lemma)"
date = 2026-09-21T10:52:00+09:00
tags = ["Demo", "Lemma", "Softmax"]
math = true
showTitle = true
+++

**Demo note.** This note demonstrates what the **SciDraft** Hugo theme can do
for academic and scientific publishing — for research institutions, researchers
and students. Its content is demonstration material only: readers should ignore
whether the demo content is correct.

A lemma is a small result proved on the way to something larger, and this one is proved
in two lines yet carries most of the numerical stability of a softmax: adding the same
constant to every score changes nothing.

The consequence is the implementation that is actually used — subtract the largest score
before exponentiating — and the reason no probability in the output can overflow to
infinity while another underflows to zero.

**Lemma (shift invariance).** For any vector \(z \in \mathbb{R}^{n}\) and any constant
\(c\),

$$
\operatorname{softmax}(z + c\mathbf{1}) = \operatorname{softmax}(z),
$$

where \(\mathbf{1}\) is the all-ones vector.

With \(c = -\max_i z_i\), the largest exponent becomes \(e^{0} = 1\), so every term of the
sum lies in \((0, 1]\) and the computation stays in range for scores of any magnitude.

The lemma is a statement about the exact function; floating-point arithmetic only
approximates it, which is why the shifted form is preferred in code — it is the version
whose rounding errors stay small for the range of scores a model actually produces.
