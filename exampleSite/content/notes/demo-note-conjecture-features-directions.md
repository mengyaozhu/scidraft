+++
title = "Features Are Directions (conjecture)"
date = 2026-09-21T14:32:00+09:00
tags = ["Demo", "Conjecture", "Geometry"]
math = true
showTitle = true
+++

**Demo note.** This note demonstrates what the **SciDraft** Hugo theme can do
for academic and scientific publishing — for research institutions, researchers
and students. Its content is demonstration material only: readers should ignore
whether the demo content is correct.

The linear representation hypothesis conjectures that the concepts a network has
learned are encoded as directions in activation space, so that adding a concept vector to
an activation moves the computation in a meaningful way.

The evidence is a body of interventions that behave as the conjecture predicts: a single
direction can be amplified or suppressed with roughly monotone effects on the output, and
differences between activations carry information the probe can read linearly.

**Conjecture (linear representation).** For a concept \(c\) there exists a direction
\(u_c\) in the residual stream such that changing an activation \(h\) to \(h + \lambda
u_c\) changes the model's behaviour with respect to \(c\) in a way that is monotone in
\(\lambda\), and such that the projection \(u_c^{\top} h\) predicts the presence of the
concept across contexts.

Stated in that form the conjecture is falsifiable in the way a mathematical statement
should be: it predicts that the projection is a sufficient statistic for the concept, which
is a claim a probe can test against held-out contexts.

The conjecture is used constantly in practice — steering vectors, concept erasure and
activation arithmetic all assume it — which is a reminder that a useful assumption does not
have to be a proved one.
