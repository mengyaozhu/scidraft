+++
title = "Proof of the Softmax Shift Lemma (proof)"
date = 2026-09-21T12:22:00+09:00
tags = ["Demo", "Proof", "Softmax"]
mathTitle = "Proof of the Softmax Shift Lemma"
mathCategory = "Proofs"
mathAliases = ["Softmax Shift Proof", "Translation Invariance Proof", "Max-Subtraction Correctness"]
mathSummary = "Proves the shift-invariance lemma by factoring the added constant out of numerator and denominator."
math = true
showTitle = true
+++

**Demo note.** This note demonstrates what the **SciDraft** Hugo theme can do
for academic and scientific publishing — for research institutions, researchers
and students. Its content is demonstration material only: readers should ignore
whether the demo content is correct.

A proof is the part of a note that cannot be skipped, and this one is short enough to
show the whole pattern: write the definition, factor out the constant, use that it cancels
between numerator and denominator.

The proof is worth writing out because it is the template for a family of invariance
arguments. The same move — factor a common term out of a normalised expression — proves
invariance to scale in other normalisations and shows where such invariances stop.

**Proof.** Let \(z \in \mathbb{R}^{n}\) and \(c \in \mathbb{R}\). By definition,

$$
\operatorname{softmax}(z + c\mathbf{1})_i
= \frac{e^{z_i + c}}{\sum_j e^{z_j + c}}
= \frac{e^{c} e^{z_i}}{e^{c} \sum_j e^{z_j}}
= \frac{e^{z_i}}{\sum_j e^{z_j}}
= \operatorname{softmax}(z)_i ,
$$

where the third equality uses \(e^{z_j + c} = e^{c} e^{z_j}\) and the factor \(e^{c}\),
which is positive and finite for every real \(c\), cancels. Since this holds for every
index \(i\), the two vectors are equal.

Two remarks on the hypotheses: the argument needs \(e^{c}\) to be a common factor, which
is why a shift by a constant vector works and a shift by different amounts per coordinate
does not; and it needs \(0 \lt e^{c} \lt \infty\), which fails in floating point once
\(c\) is large enough that the exponentials overflow.

That last remark is where the lemma stops being a statement about code: mathematically
the invariance is exact, while numerically it holds only for the range of \(c\) the
representation can express, which is the reason the shift is chosen as the negative of the
maximum rather than any other constant.
