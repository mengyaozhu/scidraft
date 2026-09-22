+++
title = "Softmax Cross-Entropy and Its Gradient in Python (advanced)"
date = 2026-09-21T12:52:00+09:00
tags = ["Demo", "Python", "Gradients"]
renderingTitle = "Cross-Entropy Gradient in Python"
renderingCategory = "Code"
renderingAliases = ["Cross-Entropy Gradient Code", "Softmax Gradient Implementation", "Log-Loss Backward Pass"]
renderingSummary = "Computes the cross-entropy gradient through softmax in Python, showing the predicted-minus-true form in code."
math = true
showTitle = true
+++

**Demo note.** This note demonstrates what the **SciDraft** Hugo theme can do
for academic and scientific publishing — for research institutions, researchers
and students. Its content is demonstration material only: readers should ignore
whether the demo content is correct.

The number a language model reports while training is the mean negative
log-likelihood of the token that actually came next: softmax cross-entropy over
the vocabulary at every position. Its backward pass has an unusually clean
closed form — the softmax Jacobian and the logarithm cancel, leaving the
probabilities minus the one-hot target, divided by the number of predictions.

The code below is the full training-side loop for that quantity: a forward pass
that keeps the probabilities its backward will need, the matching backward pass,
and a finite-difference check that compares the analytic gradient against
central differences one parameter at a time.

```python
import numpy as np


def softmax_cross_entropy(logits, targets):
    """Forward pass for next-token prediction.

    logits:  (B, T, V)  score for every vocabulary entry at each position
    targets: (B, T)     the token that actually came next
    Returns the mean negative log-likelihood and a cache for the backward.
    """
    shifted = logits - logits.max(axis=-1, keepdims=True)   # stays finite
    p = np.exp(shifted)
    p /= p.sum(axis=-1, keepdims=True)  # rows sum to 1

    B, T, V = logits.shape
    flat = p.reshape(B * T, V)
    picked = flat[np.arange(B * T), targets.reshape(-1)]
    return -np.log(picked).mean(), {"p": p, "targets": targets}


def softmax_cross_entropy_backward(cache):
    """dL/dlogits = (p - one_hot(target)) / (B * T).

    The softmax Jacobian and the logarithm cancel, so the gradient of
    the loss needs no extra matrix product.
    """
    p, targets = cache["p"], cache["targets"]
    B, T, V = p.shape
    grad = p.copy()
    flat = grad.reshape(B * T, V)  # a view: grad changes with it
    flat[np.arange(B * T), targets.reshape(-1)] -= 1.0
    return grad / (B * T)


def finite_difference(f, x, eps=1e-5):
    """Central-difference gradient, one parameter at a time."""
    grad = np.zeros_like(x)
    for index in np.ndindex(x.shape):
        original = x[index]
        x[index] = original + eps
        high = f(x)
        x[index] = original - eps
        low = f(x)
        x[index] = original
        grad[index] = (high - low) / (2 * eps)
    return grad


if __name__ == "__main__":
    rng = np.random.default_rng(0)
    logits = rng.normal(size=(2, 4, 7))
    targets = rng.integers(0, 7, size=(2, 4))

    loss, cache = softmax_cross_entropy(logits, targets)
    analytic = softmax_cross_entropy_backward(cache)
    numeric = finite_difference(
        lambda x: softmax_cross_entropy(x, targets)[0], logits.copy()
    )

    gap = np.abs(analytic - numeric).max()
    print(f"loss {loss:.4f}")
    print(f"max |analytic - numeric| = {gap:.2e}")
```

Run as printed, the loss is `2.0409` on random scores — just above
\(\ln 7 \approx 1.95\), the value of a uniform guess over seven tokens — and the
two gradients agree to `2.43e-11`, so the closed form is correct to the precision
of the step size. A check like this is the cheapest way to catch a wrong axis or
a missing division before a training run.
