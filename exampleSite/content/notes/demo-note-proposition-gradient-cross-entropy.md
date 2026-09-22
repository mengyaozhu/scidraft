+++
title = "The Gradient of Cross-Entropy Through Softmax (proposition)"
date = 2026-09-21T09:32:00+09:00
tags = ["Demo", "Proposition", "Gradients"]
mathTitle = "The Gradient of Cross-Entropy Through Softmax"
mathCategory = "Propositions"
mathAliases = ["Softmax Gradient Proposition", "Cross-Entropy Gradient", "Softmax-Cross-Entropy Derivative"]
mathSummary = "Gives the gradient of cross-entropy through softmax as the difference between predicted and true distributions."
math = true
showTitle = true
+++

**Demo note.** This note demonstrates what the **SciDraft** Hugo theme can do
for academic and scientific publishing — for research institutions, researchers
and students. Its content is demonstration material only: readers should ignore
whether the demo content is correct.

A proposition is a proved statement of moderate weight; this one is the reason the
training loss needs no special treatment in the backward pass. Composing softmax with
negative log-likelihood, the Jacobian of the softmax and the derivative of the logarithm
cancel almost completely.

What survives is an expression that can be read in one line: the gradient with respect to
the scores is the predicted distribution minus the observed one.

**Proposition.** Let \(p = \operatorname{softmax}(z)\) for a score vector \(z \in
\mathbb{R}^{V}\), and let the loss be the negative log-likelihood of a target token
\(y\), so that \(L = -\log p_y\). Then

$$
\frac{\partial L}{\partial z} = p - e_y ,
$$

where \(e_y\) is the one-hot vector of the target. For a batch of \(N\) positions, the mean
loss has gradient \((p - e_y) / N\) at each of them.

The expression is what makes the backward pass through a language-model head cheap,
since the gradient at every position is already available as the forward pass output, and
it is the quantity a finite-difference check is normally used to verify.
