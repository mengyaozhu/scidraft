+++
title = "Gradient Descent with Momentum (algorithm)"
date = 2026-09-21T10:32:00+09:00
tags = ["Demo", "Algorithm", "Optimization"]
mathTitle = "Gradient Descent with Momentum"
mathCategory = "Algorithms"
mathAliases = ["Heavy Ball Method", "Momentum Optimisation", "EMA Gradient Descent"]
mathSummary = "Keeps a running average of past gradients so that descent accumulates speed along consistent directions and damps oscillation."
math = true
showTitle = true
+++

**Demo note.** This note demonstrates what the **SciDraft** Hugo theme can do
for academic and scientific publishing — for research institutions, researchers
and students. Its content is demonstration material only: readers should ignore
whether the demo content is correct.

The simplest optimiser with a memory is gradient descent with momentum: keep a running
velocity, add the gradient to it, and step in the direction of the velocity rather than the
gradient. The algorithm is short, and the behaviour it introduces is worth the two extra
lines.

The effect is an averaging of successive gradients, which cancels the oscillating part of the
noise and amplifies the consistent part. Its cost is a second state vector and one more
constant to set.

**Algorithm (heavy-ball momentum).** Given a differentiable loss \(L\), a step size
\(\eta \gt 0\), a momentum coefficient \(\beta \in [0, 1)\), an initial parameter
vector \(\theta_0\) and zero initial velocity \(v_0\), the steps are:

1. Sample or compute the gradient \(g_t = \nabla L(\theta_{t-1})\).
2. Update the velocity: \(v_t = \beta v_{t-1} + g_t\).
3. Update the parameters: \(\theta_t = \theta_{t-1} - \eta v_t\).

Unrolling the recursion shows that the update is a weighted sum of past gradients with
geometrically decaying weights,

$$
v_t = \sum_{k=1}^{t} \beta^{\,t-k} g_k ,
$$

so the effective number of gradients being averaged is \(1 / (1 - \beta)\): \(\beta =
0.9\) averages roughly the last ten steps.

The recursion also explains the pathology of a badly chosen coefficient: with \(\beta\) close
to one the effective averaging window is long enough for the direction to lag behind a
changing loss surface, and the momentum carries the parameters past the minimum it was
approaching.
