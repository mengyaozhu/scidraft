+++
title = "Scaled Dot-Product Attention (definition)"
date = 2026-09-21T09:12:00+09:00
tags = ["Demo", "Definition", "Attention"]
mathTitle = "Scaled Dot-Product Attention"
mathCategory = "Definitions"
mathAliases = ["Softmax Attention", "Query-Key-Value Attention"]
mathSummary = "Fixes the notation for attention: three projections, one score matrix, and a softmax-weighted average over the values."
math = true
showTitle = true
+++

**Demo note.** This note demonstrates what the **SciDraft** Hugo theme can do
for academic and scientific publishing — for research institutions, researchers
and students. Its content is demonstration material only: readers should ignore
whether the demo content is correct.

Definitions in this subject fix notation rather than prove anything, and attention is
the clearest case: three projections, one score matrix, one weighted average. Every
implementation, diagram and proof in the rest of the literature is written against this
one paragraph of notation.

The definition below is stated for a single sequence without the batch dimension. The
softmax is taken over the keys, so each row of the score matrix becomes a distribution
over the positions a token may read from.

**Definition (scaled dot-product attention).** Let \(Q, K, V\) be matrices of shape
\(T \times d_h\), called queries, keys and values. The attention output is

$$
\operatorname{softmax}\!\left(\frac{QK^{\top}}{\sqrt{d_h}}\right) V ,
$$

where the softmax is applied to every row of the \(T \times T\) score matrix
\(QK^{\top} / \sqrt{d_h}\), and \(\sqrt{d_h}\) is a fixed rescaling that keeps the scores
of comparable size as the head width grows.

Two details in the definition carry most of the consequences: the softmax is over the
keys rather than the values, which makes the output a weighted average of value vectors,
and the \(\sqrt{d_h}\) factor makes the score variance independent of the head width under
the usual initialisation.
