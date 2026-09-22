+++
title = "Layer Normalisation Written as a Function (pseudocode)"
date = 2026-09-21T08:15:00+09:00
tags = ["Demo", "Pseudocode", "Normalisation"]
renderingTitle = "Layer Normalization"
renderingCategory = "Pseudo-algorithm"
renderingAliases = ["Layer Normalisation", "LayerNorm Procedure", "Per-Sample Normalisation"]
renderingSummary = "Gives layer normalisation as pseudocode, normalising each sample across its features and then rescaling with learned parameters."
math = true
showTitle = true
+++

**Demo note.** This note demonstrates what the **SciDraft** Hugo theme can do
for academic and scientific publishing — for research institutions, researchers
and students. Its content is demonstration material only: readers should ignore
whether the demo content is correct.

Layer normalisation rescales each token's activations using statistics computed
across the features of that token alone, which is what separates it from batch
normalisation: nothing in the computation depends on the other examples in the
batch.

This note uses the function style of the pseudocode environment, with a named
procedure, a parameter list and an explicit return. The mathematical content is
three lines — a mean, a variance and an affine map — and the interesting part is
the placement of the constant \(\epsilon\), which sits inside the square root so
that a zero-variance input cannot divide by zero.

```pseudo-algorithm
\begin{algorithm}[H]
\footnotesize
\caption{Layer normalisation of one token's activations}
\begin{algorithmic}[1]
\Function{LayerNorm}{\(x, \gamma, \beta, \epsilon\)}
    \State \(\mu \gets \frac{1}{d} \sum_{i=1}^{d} x_i\)
    \State \(\sigma^{2} \gets \frac{1}{d} \sum_{i=1}^{d} (x_i - \mu)^{2}\)
    \State \(\hat{x} \gets (x - \mu) / \sqrt{\sigma^{2} + \epsilon}\)
    \Return \(\gamma \odot \hat{x} + \beta\)
\EndFunction
\end{algorithmic}
\end{algorithm}
```

Two properties follow from the three lines. The mean and variance of
\(\hat{x}\) are \(0\) and approximately \(1\) by construction, up to the effect of
\(\epsilon\); and the learned scale and shift mean the layer as a whole can undo
the normalisation if that is what the loss prefers, so the operation removes
scale information only from the intermediate representation.
