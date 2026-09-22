+++
title = "Backpropagation Through a Dense Layer"
date = 2026-09-21T15:42:00+09:00
tags = ["Demo", "Pseudo-Algorithm", "Neural Networks", "Backpropagation"]
renderingTitle = "Backpropagation Pseudocode"
renderingCategory = "Pseudo-algorithm"
renderingAliases = ["Backpropagation Algorithm", "Reverse-Mode Differentiation", "Gradient Computation Pseudocode"]
renderingSummary = "States backpropagation as a two-pass procedure: a forward pass caching activations and a reverse pass accumulating gradients."
math = true
showTitle = true
+++

**Demo note.** This note demonstrates what the **SciDraft** Hugo theme can do
for academic and scientific publishing — for research institutions, researchers
and students. Its content is demonstration material only: readers should ignore
whether the demo content is correct.

Backpropagation computes, for one layer, three gradients: one for each parameter
of the layer and one to hand to the layer before it. The third is what makes deep
networks trainable — without it, error could not travel past the last layer. The
procedure below is the backward pass of a single dense layer.

The arithmetic follows from the chain rule. For \(Y = XW + b\), the gradient with
respect to the weights contracts the input with the incoming gradient,
\(\partial L/\partial W = X^{\top}\,\partial L/\partial Y\), while the bias
gradient is the incoming gradient summed over the batch. The gradient passed
backwards multiplies by the transposed weights,
\(\partial L/\partial X = \partial L/\partial Y\, W^{\top}\), so each layer
receives exactly the shape it produced during the forward pass.

```pseudo-algorithm
\begin{algorithm}[H]
\caption{Backward Pass Through a Dense Layer}
\begin{algorithmic}[1]

\Require Layer input \(X \in \mathbb{R}^{n \times d_{in}}\)
\Require Weights \(W \in \mathbb{R}^{d_{in} \times d_{out}}\), bias \(b \in \mathbb{R}^{d_{out}}\)
\Require Upstream gradient \(\frac{\partial L}{\partial Y} \in \mathbb{R}^{n \times d_{out}}\)

\Ensure Parameter gradients \(\frac{\partial L}{\partial W}\), \(\frac{\partial L}{\partial b}\) and the gradient \(\frac{\partial L}{\partial X}\)

\State Recover the cached forward quantity: \(Y \leftarrow XW + b\)
\State Weight gradient: contract the input with the incoming gradient
\State \hspace{0.5cm} \(\frac{\partial L}{\partial W} \leftarrow X^{\top} \frac{\partial L}{\partial Y}\)
\State Bias gradient: sum the incoming gradient over the batch
\State \hspace{0.5cm} \(\frac{\partial L}{\partial b} \leftarrow \sum_{i=1}^{n} \frac{\partial L}{\partial Y}[i, :]\)
\State Gradient for the previous layer: apply the chain rule once more
\State \hspace{0.5cm} \(\frac{\partial L}{\partial X} \leftarrow \frac{\partial L}{\partial Y} W^{\top}\)
\Return \(\frac{\partial L}{\partial W}\), \(\frac{\partial L}{\partial b}\), \(\frac{\partial L}{\partial X}\)

\end{algorithmic}
\end{algorithm}
```

**Reading the algorithm.** Step 1 is a reminder that the forward quantity must
have been cached: the backward pass reuses what the forward pass computed, which
is why training needs memory proportional to depth. Steps 2–3 are two matrix
multiplications — the same cost as the forward pass — and step 4 is the part that
propagates error to earlier layers. Note the asymmetry with the forward pass:
the forward pass multiplies by \(W\), the backward pass by \(W^{\top}\), and it is
that transposition which keeps the shapes consistent in both directions.
