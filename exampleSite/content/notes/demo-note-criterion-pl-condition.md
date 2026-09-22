+++
title = "The Polyak-Lojasiewicz Criterion (criterion)"
date = 2026-09-21T11:42:00+09:00
tags = ["Demo", "Criterion", "Optimization"]
mathTitle = "The Polyak-Lojasiewicz Criterion"
mathCategory = "Criteria"
mathAliases = ["Polyak-Łojasiewicz Inequality", "PL Condition", "Gradient Domination"]
mathSummary = "Gives the gradient-domination condition under which gradient descent converges linearly even when the objective is not convex."
math = true
showTitle = true
+++

**Demo note.** This note demonstrates what the **SciDraft** Hugo theme can do
for academic and scientific publishing — for research institutions, researchers
and students. Its content is demonstration material only: readers should ignore
whether the demo content is correct.

A criterion is a condition that decides whether an argument or a method applies, and this
one is the usual substitute for convexity in the analysis of gradient descent: it bounds the
loss by the size of its gradient, so a small gradient implies a small excess loss.

The criterion is attractive because it is weaker than strong convexity and still sufficient
for linear convergence, and because it is stated in a form a training run can be checked
against by measuring both quantities.

**Criterion (Polyak-Lojasiewicz).** Let \(L\) be differentiable with minimum
\(L^{\star} = \min_\theta L(\theta)\). The PL criterion holds with constant \(\mu \gt 0\)
when

$$
\frac{1}{2} \lVert \nabla L(\theta) \rVert^{2}
\geq \mu \left(L(\theta) - L^{\star}\right)
\qquad \text{for every } \theta .
$$

If \(L\) is also \(L_s\)-smooth, gradient descent with step \(\eta = 1 / L_s\) satisfies

$$
L(\theta_t) - L^{\star} \leq \left(1 - \frac{\mu}{L_s}\right)^{t}
\left(L(\theta_0) - L^{\star}\right),
$$

so the excess loss decays geometrically and the ratio \(\mu / L_s\) sets the rate.

The criterion is a condition to be checked rather than assumed: both \(L(\theta) -
L^{\star}\) and \(\lVert \nabla L(\theta) \rVert\) are measurable during training, so the
inequality can be tested on a run and its constant estimated from the data.
