+++
title = "The Chain Rule (rule)"
date = 2026-09-21T16:02:00+09:00
tags = ["Demo", "Rule", "Gradients"]
mathTitle = "The Chain Rule"
mathCategory = "Rules"
mathAliases = ["Chain Rule", "Composite Differentiation Rule", "Chain Rule of Calculus"]
mathSummary = "States that the derivative of a composition is the product of the derivatives of its parts, the basis of backpropagation."
math = true
showTitle = true
+++

**Demo note.** This note demonstrates what the **SciDraft** Hugo theme can do
for academic and scientific publishing — for research institutions, researchers
and students. Its content is demonstration material only: readers should ignore
whether the demo content is correct.

A rule is a procedure applied so often that it stops looking like a theorem, and the
chain rule is the extreme case: every backward pass through a stacked model is one long
application of it.

Stated for compositions of two functions and applied left to right through a network, it
converts the derivative of the loss with respect to the inputs into a product of local
derivatives, each computed at the activations that were stored during the forward pass.

**Rule (chain rule).** If \(f\) is differentiable at \(g(x)\) and \(g\) is
differentiable at \(x\), then the composition is differentiable and

$$
\frac{d}{dx} f(g(x)) = f'(g(x)) \, g'(x).
$$

For \(n\) composed functions \(y = f_n(f_{n-1}(\cdots f_1(x)\cdots))\) the rule is applied
in turn, giving

$$
\frac{dy}{dx} = \prod_{k=1}^{n} f_k'\!\left(f_{k-1}(\cdots f_1(x)\cdots)\right).
$$

Each factor is evaluated at the intermediate value the forward pass produced, which is why
backpropagation stores activations rather than recomputing them.

The product form also explains a failure mode: when the factors are consistently below
one in magnitude, the product shrinks geometrically with depth, which is the mechanism
behind vanishing gradients in a recurrent or very deep model.
