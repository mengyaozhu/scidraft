+++
title = "Power Iteration with a Convergence Check (pseudocode)"
date = 2026-09-21T08:39:00+09:00
tags = ["Demo", "Pseudocode", "Linear Algebra"]
renderingTitle = "Power Iteration"
renderingCategory = "Pseudo-algorithm"
renderingAliases = ["Power Iteration", "Power Method", "Dominant Eigenvector Algorithm"]
renderingSummary = "Computes a matrix's dominant eigenvector by repeated multiplication, the method behind spectral norm estimation."
math = true
showTitle = true
+++

**Demo note.** This note demonstrates what the **SciDraft** Hugo theme can do
for academic and scientific publishing — for research institutions, researchers
and students. Its content is demonstration material only: readers should ignore
whether the demo content is correct.

The largest singular value of a weight matrix is one of the numbers used to
judge how a layer transforms its input, and it is usually estimated rather than
computed: repeated multiplication by the matrix makes any starting vector align
with the leading eigenvector, after which the Rayleigh quotient gives the value.

This note uses the loop style of the pseudocode environment — a `while` with a
stopping test and per-line comments. The stopping test compares the residual to
the current eigenvalue estimate rather than to a fixed constant, so the same
tolerance works at any scale of matrix.

```pseudo-algorithm
\begin{algorithm}[H]
\footnotesize
\caption{Power iteration for the leading eigenvalue}
\begin{algorithmic}[1]
\Require symmetric matrix \(A\), start vector \(v\), tolerance \(\tau\)
\State \(v \gets v / \lVert v \rVert\) \Comment{any direction will do}
\State \(w \gets A v\); \(\lambda \gets \lVert w \rVert\) \Comment{first Rayleigh estimate}
\While{\(\lVert w - \lambda v \rVert \gt \tau \, \lambda\)}
    \State \(v \gets w / \lambda\) \Comment{renormalise, or the vector overflows}
    \State \(w \gets A v\); \(\lambda \gets \lVert w \rVert\)
\EndWhile
\Return \(\lambda, v\)
\end{algorithmic}
\end{algorithm}
```

The loop is written without a step limit, which is honest about the mathematics
and optimistic in practice: the convergence rate is the ratio of the two largest
eigenvalues, so an ill conditioned matrix can need many iterations, and an
implementation normally adds a maximum step count to the stopping test for that
reason.
