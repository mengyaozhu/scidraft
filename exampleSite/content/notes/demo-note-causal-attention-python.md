+++
title = "Causal Multi-Head Attention in Python (intermediate)"
date = 2026-09-21T13:22:00+09:00
tags = ["Demo", "Python", "Attention"]
math = true
showTitle = true
+++

**Demo note.** This note demonstrates what the **SciDraft** Hugo theme can do
for academic and scientific publishing — for research institutions, researchers
and students. Its content is demonstration material only: readers should ignore
whether the demo content is correct.

Attention is the one place in a transformer where tokens exchange information:
every other block — the projections, the activations, the normalisations —
treats positions independently. That makes attention mostly shape bookkeeping,
and the shapes alone decide which products are legal.

The code below is a module-sized step up from the previous snippet: a helper
that splits the projected sequence into heads, the tensor operations of scaled
dot-product attention, an assertion that the head arithmetic divides evenly, and
a property check at the bottom. The mask is what makes the block usable as a
next-token predictor: position \(t\) may look at positions up to \(t\) and
nothing later.

```python
import numpy as np


def split_heads(x, n_heads, d_head):
    """(B, T, d_model) -> (B, H, T, d_head)."""
    B, T, _ = x.shape
    return x.reshape(B, T, n_heads, d_head).transpose(0, 2, 1, 3)


def causal_attention(X, Wq, Wk, Wv, n_heads):
    """Multi-head self-attention over a batch of sequences.

    X: (B, T, d_model)   Wq, Wk, Wv: (d_model, d_model)
    """
    B, T, d_model = X.shape
    assert d_model % n_heads == 0, "d_model must divide by n_heads"
    d_head = d_model // n_heads

    Q = split_heads(X @ Wq, n_heads, d_head)      # (B, H, T, d_head)
    K = split_heads(X @ Wk, n_heads, d_head)
    V = split_heads(X @ Wv, n_heads, d_head)

    scores = Q @ K.transpose(0, 1, 3, 2) / np.sqrt(d_head)  # (B,H,T,T)
    future = np.triu(np.ones((T, T), dtype=bool), k=1)
    scores = np.where(future, -np.inf, scores)

    weights = np.exp(scores - scores.max(axis=-1, keepdims=True))
    weights /= weights.sum(axis=-1, keepdims=True)  # rows sum to 1

    out = weights @ V  # (B, H, T, d_head)
    return out.transpose(0, 2, 1, 3).reshape(B, T, d_model)


if __name__ == "__main__":
    rng = np.random.default_rng(0)
    B, T, d_model, n_heads = 2, 5, 16, 4
    X = rng.normal(size=(B, T, d_model))
    W = rng.normal(size=(d_model, d_model)) / np.sqrt(d_model)

    P = causal_attention(X, W, W, W, n_heads)
    print("output shape", P.shape)

    # A position may not affect the ones before it: change the last token
    # and check that every earlier output is unchanged.
    X2 = X.copy()
    X2[:, -1] += 1.0
    P2 = causal_attention(X2, W, W, W, n_heads)
    same = np.allclose(P[:, :-1], P2[:, :-1])
    print("earlier positions unchanged:", same)
```

Run as printed, it reports the output shape `(2, 5, 16)` and `earlier positions
unchanged: True`. The check perturbs the last token and confirms that no earlier
output moves, which is the property the mask exists to guarantee. The scores
matrix costs \(T^2\) entries per head, which is why long-context variants trade
that term away.
