+++
title = "Masked Softmax Attention (algorithm)"
date = 2026-09-21T14:52:00+09:00
tags = ["Demo", "Algorithm", "Attention"]
math = true
showTitle = true
+++

**Demo note.** This note demonstrates what the **SciDraft** Hugo theme can do
for academic and scientific publishing — for research institutions, researchers
and students. Its content is demonstration material only: readers should ignore
whether the demo content is correct.

An algorithm is a procedure with a specification, and this one says how the attention
definition is executed on a machine: scale the scores, remove the positions that are not
allowed, normalise and mix.

The steps are written in the order they must be performed. Masking before the softmax is the
detail that matters — doing it afterwards would leave the removed positions contributing to
the normalising constant and change the result.

**Algorithm (masked softmax attention).** Given \(Q, K, V \in \mathbb{R}^{T \times
d_h}\) and a boolean mask \(M\), the steps are:

1. Compute the scaled scores \(S = QK^{\top} / \sqrt{d_h}\), of shape \(T \times T\).
2. Replace the scores that are not allowed to be attended to with \(-\infty\), that is
   \(S_{ij} \leftarrow -\infty\) wherever \(M_{ij}\) is true.
3. Subtract the row maximum: \(S_{ij} \leftarrow S_{ij} - \max_k S_{ik}\), which leaves the
   softmax unchanged and keeps the exponentials finite.
4. Exponentiate and normalise each row: \(A_{ij} = e^{S_{ij}} / \sum_k e^{S_{ik}}\).
5. Return \(A V\).

The cost is dominated by step one, which forms a \(T \times T\) matrix per head and
therefore grows quadratically in the sequence length. Steps three and four are the numerical
stabilisation from the log-sum-exp bounds.

Two of the five steps are present for reasons other than the mathematics: masking before
normalising keeps the definition exact, and subtracting the row maximum keeps the arithmetic
finite — the algorithm as written and the definition as stated compute the same function,
and only one of the two is executable.
