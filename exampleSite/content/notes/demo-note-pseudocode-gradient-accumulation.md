+++
title = "Gradient Accumulation with an Input and Output Contract (pseudocode)"
date = 2026-09-21T07:47:00+09:00
tags = ["Demo", "Pseudocode", "Optimization"]
renderingTitle = "Gradient Accumulation"
renderingCategory = "Pseudo-algorithm"
renderingAliases = ["Gradient Accumulation", "Micro-Batching", "Accumulated Update Procedure"]
renderingSummary = "Shows how to reach a large effective batch size by accumulating gradients over several micro-batches before stepping."
math = true
showTitle = true
+++

**Demo note.** This note demonstrates what the **SciDraft** Hugo theme can do
for academic and scientific publishing — for research institutions, researchers
and students. Its content is demonstration material only: readers should ignore
whether the demo content is correct.

Gradient accumulation is the standard way to train with a batch larger than
memory allows: several small batches are processed in turn and their gradients
added before any parameter moves. The gradient of a sum is the sum of the
gradients, so the result equals one step on the concatenated batch as long as the
per-batch losses are averaged.

This note writes the procedure in the contract style, stating what it requires
and what it guarantees before any step is listed. Diagrams of the same loop
usually omit the division by the number of micro-batches, which is the one detail
that makes the accumulated gradient comparable to a single large-batch gradient.

```pseudo-algorithm
\begin{algorithm}[H]
\footnotesize
\caption{Gradient accumulation over micro-batches}
\begin{algorithmic}[1]
\Require parameters \(\theta\), micro-batches \(B_1, \dots, B_k\), learning rate \(\eta\)
\Ensure parameters after one accumulated step
\State \(g \gets 0\)
\For{\(i = 1, \dots, k\)}
    \State evaluate the loss \(L_i\) on \(B_i\) with the current \(\theta\)
    \State \(g \gets g + \nabla_\theta L_i / k\)
\EndFor
\State \(\theta \gets \theta - \eta g\)
\Return \(\theta\)
\end{algorithmic}
\end{algorithm}
```

The contract is what makes the procedure checkable: the number of backward
passes equals the number of micro-batches, the parameters move exactly once, and
the accumulated gradient matches the mean gradient over the whole set of
micro-batches to within the arithmetic of the summation order.
