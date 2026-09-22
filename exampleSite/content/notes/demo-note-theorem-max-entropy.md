+++
title = "Maximum Entropy Gives the Softmax (theorem)"
date = 2026-09-21T09:22:00+09:00
tags = ["Demo", "Theorem", "Statistics"]
mathTitle = "Maximum Entropy Gives the Softmax"
mathCategory = "Theorems"
mathAliases = ["Maximum Entropy Principle", "MaxEnt Derivation of Softmax", "Entropy-Maximising Distribution"]
mathSummary = "Derives the softmax distribution as the unique maximiser of entropy subject to matching expected scores."
math = true
showTitle = true
+++

**Demo note.** This note demonstrates what the **SciDraft** Hugo theme can do
for academic and scientific publishing — for research institutions, researchers
and students. Its content is demonstration material only: readers should ignore
whether the demo content is correct.

The exponential form of a language model's output is not a design choice made for
convenience; it is forced by an optimisation over distributions. Maximise entropy subject
to matching a set of expected features, and the solution is always of the form
\(\exp(\theta^{\top} f(x))\), normalised.

For a token distribution constrained only by the scores, that form is the softmax. The
theorem is the reason the softmax keeps reappearing in places that look unrelated to
classification.

**Theorem (maximum entropy).** Among distributions \(q\) on a finite set that satisfy
\(\mathbb{E}_q[f] = \bar{f}\) for a given feature map \(f\), the one maximising the
entropy \(H(q) = -\sum_v q_v \log q_v\) has the form

$$
q_v = \frac{\exp\!\left(\theta^{\top} f(v)\right)}{Z(\theta)}, \qquad
Z(\theta) = \sum_{v} \exp\!\left(\theta^{\top} f(v)\right),
$$

for some parameter vector \(\theta\) chosen so the constraints hold. With \(f(v) = z_v\)
and \(\theta = 1\), this is exactly the softmax of the scores.

Read backwards, the theorem says what a softmax commits to: it is the smoothest
distribution consistent with the scores, so any structure beyond them — sparsity, hard
constraints — has to be imposed deliberately rather than falling out of the
parameterisation.
