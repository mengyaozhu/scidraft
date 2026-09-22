+++
title = "Cross-Entropy Is Convex in the Logits (property)"
date = 2026-09-21T08:02:00+09:00
tags = ["Demo", "Property", "Optimization"]
mathTitle = "Cross-Entropy Is Convex in the Logits"
mathCategory = "Properties"
mathAliases = ["Convexity of Cross-Entropy", "Log-Sum-Exp Convexity", "Convex Loss Property"]
mathSummary = "Establishes that cross-entropy is convex in the logits, which is why the training objective has no spurious local minima."
math = true
showTitle = true
+++

**Demo note.** This note demonstrates what the **SciDraft** Hugo theme can do
for academic and scientific publishing — for research institutions, researchers
and students. Its content is demonstration material only: readers should ignore
whether the demo content is correct.

Convexity of a loss in the parameters is rare in deep learning, but convexity in the
scores is not, and the cross-entropy of a softmax has it. The property is what guarantees
that the inner optimisation — fitting the output layer, probing a frozen representation —
has no local minima to fall into.

The property is stated with respect to the logits, not the weights. As soon as the logits
depend non-linearly on parameters, the composition need not be convex, which is exactly the
boundary the statement respects.

**Property.** For a fixed target distribution \(p\), the function

$$
z \mapsto H(p, \operatorname{softmax}(z)) = -\sum_v p_v \log \operatorname{softmax}(z)_v
$$

is convex on \(\mathbb{R}^{V}\), and strictly convex on the affine subspace where the
softmax is not constant. The derivative with respect to \(z\),

$$
\nabla_z H = \operatorname{softmax}(z) - p ,
$$

vanishes only where the predicted distribution equals the target, which is therefore the
unique minimiser up to the shift redundancy of the softmax.

The property is why logistic regression is a convex problem and why fitting a linear
probe on frozen features is reliable: in both cases the only non-convex part of the
computation has been frozen, leaving an objective with a single basin.
