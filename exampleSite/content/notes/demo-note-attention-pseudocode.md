+++
title = "Attention Mechanism: Pseudocode"
date = 2026-09-21T16:15:00+09:00
tags = ["Demo", "Attention", "Pseudo-Algorithm"]
math = true
showTitle = true
+++

**Demo note.** This note demonstrates what the **SciDraft** Hugo theme can do
for academic and scientific publishing — for research institutions, researchers
and students. Its content is demonstration material only: readers should ignore
whether the demo content is correct.

Attention lets a model decide, for each position it is processing, which
other positions to draw information from. This note states the **scaled
dot-product** form as an algorithm rather than as an equation, so the
sequence of operations — and the shape of each intermediate result — is
explicit.

The scaling by \( \sqrt{d_k} \) matters: without it, the dot products grow
with the key dimension, the softmax saturates, and the weights collapse onto
a single position.

```pseudo-algorithm
\begin{algorithm}[H]
\caption{Scaled Dot-Product Attention}
\begin{algorithmic}[1]

\Require Query matrix \(Q \in \mathbb{R}^{n \times d_k}\)
\Require Key matrix \(K \in \mathbb{R}^{m \times d_k}\)
\Require Value matrix \(V \in \mathbb{R}^{m \times d_v}\)

\Ensure Weighted output \(O \in \mathbb{R}^{n \times d_v}\)

\State Compute the similarity between every query and every key:
\State \hspace{0.5cm} \(S \leftarrow Q K^{\top}\) with \(S \in \mathbb{R}^{n \times m}\)

\State Scale the scores to keep the softmax in a stable range:
\State \hspace{0.5cm} \(S \leftarrow S / \sqrt{d_k}\)

\State Convert scores into weights that sum to one over the keys:
\State \hspace{0.5cm} \(A \leftarrow \mathrm{softmax}(S)\) rowwise

\State Read out a weighted combination of the values:
\State \hspace{0.5cm} \(O \leftarrow A V\)

\Return \(O\)

\end{algorithmic}
\end{algorithm}
```

**Reading the algorithm.** Steps 1–2 build the score matrix, where row \(i\)
holds the compatibility of query \(i\) with every key; step 3 turns each row
into a probability distribution, so a high score for one key means its value
dominates that output row; step 4 mixes the values accordingly. Every row of
the output therefore draws on a *different* combination of the same value
matrix, which is what makes attention content-adaptive rather than fixed — at
a cost of \(O(nm)\) for forming \(S\), the pressure behind the approximate
and sparse variants.
