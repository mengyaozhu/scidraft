+++
title = "Smoothness of the Loss (postulate)"
date = 2026-09-21T12:32:00+09:00
tags = ["Demo", "Postulate", "Optimization"]
mathTitle = "Smoothness of the Loss"
mathCategory = "Postulates"
mathAliases = ["Smoothness Assumption", "Lipschitz Gradient Assumption", "Bounded Curvature"]
mathSummary = "Assumes the loss has a bounded gradient Lipschitz constant, the condition most convergence proofs are stated under."
math = true
showTitle = true
+++

**Demo note.** This note demonstrates what the **SciDraft** Hugo theme can do
for academic and scientific publishing — for research institutions, researchers
and students. Its content is demonstration material only: readers should ignore
whether the demo content is correct.

Step sizes in deep learning are chosen as if the loss were smooth in its parameters, and
that is an assumption, not a theorem. It is the smoothness postulate: the gradient does
not change arbitrarily fast, so a small step in parameter space produces a predictable
change in loss.

The assumption is what turns a learning rate from a guess into a bound. Where it fails —
across a sharp loss barrier, or at a spike — the same learning rate produces the visible
training instabilities that motivate warmup and clipping.

**Postulate (L-smooth loss).** Let \(L(\theta)\) be the training loss as a function of
the parameters. The smoothness postulate assumes a constant \(L \gt 0\) with

$$
\lVert \nabla L(\theta) - \nabla L(\theta') \rVert \leq L \lVert \theta - \theta' \rVert
$$

for all parameter vectors, which is equivalent to the loss lying below its tangent
parabolas:

$$
L(\theta') \leq L(\theta) + \nabla L(\theta)^{\top}(\theta' - \theta) +
\frac{L}{2} \lVert \theta' - \theta \rVert^{2}.
$$

Reading the bound as a function of the step shows the largest safe step for descent is
\(1/L\).

Nothing about a transformer guarantees such a constant exists globally; the postulate is
used locally, inside a trust region where it is a fair description of the loss, which is
the same logic that motivates clipping and warmup in the first place.
