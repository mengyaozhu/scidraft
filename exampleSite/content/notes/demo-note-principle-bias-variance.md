+++
title = "The Bias-Variance Trade-Off (principle)"
date = 2026-09-21T11:22:00+09:00
tags = ["Demo", "Principle", "Statistics"]
mathTitle = "The Bias-Variance Trade-Off"
mathCategory = "Principles"
mathAliases = ["Bias-Variance Trade-Off", "Bias-Variance Decomposition", "Capacity Trade-Off"]
mathSummary = "States that expected error decomposes into bias and variance, so added capacity trades one against the other."
math = true
showTitle = true
+++

**Demo note.** This note demonstrates what the **SciDraft** Hugo theme can do
for academic and scientific publishing — for research institutions, researchers
and students. Its content is demonstration material only: readers should ignore
whether the demo content is correct.

A principle is a guide to design rather than a result about a particular model, and this
one is the oldest in statistics: expected error splits into a term from the model being too
simple, a term from it being too sensitive to the sample, and a term that no model can
remove.

Read as a design principle, it says that capacity and regularisation are two ends of one
dial, and that a change which reduces one term usually pays in the other. That reading is
what makes early stopping, weight decay and dataset size comparable interventions.

**Principle (bias-variance decomposition).** For an estimator \(\hat{f}\) of a target
\(f\) at an input \(x\), with expectation taken over training samples,

$$
\mathbb{E}\!\left[\left(\hat{f}(x) - f(x)\right)^{2}\right] =
\underbrace{\left(\mathbb{E}[\hat{f}(x)] - f(x)\right)^{2}}_{\text{bias}^{2}} +
\underbrace{\operatorname{Var}\!\left(\hat{f}(x)\right)}_{\text{variance}} +
\underbrace{\sigma^{2}}_{\text{noise}} .
$$

The principle is the reading of the identity: increasing capacity tends to lower the bias
term and raise the variance term, and the noise term is fixed by the data.

In a large model the two terms are usually discussed under different names — underfitting
and overfitting — and the practical consequence of the decomposition is that neither can be
diagnosed from the training loss alone, since the variance term is only visible on data the
model has not seen.
