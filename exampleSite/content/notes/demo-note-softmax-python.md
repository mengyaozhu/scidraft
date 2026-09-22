+++
title = "Numerically Stable Softmax in Python (starter)"
date = 2026-09-21T07:42:00+09:00
tags = ["Demo", "Python", "Softmax"]
math = true
showTitle = true
+++

**Demo note.** This note demonstrates what the **SciDraft** Hugo theme can do
for academic and scientific publishing — for research institutions, researchers
and students. Its content is demonstration material only: readers should ignore
whether the demo content is correct.

A language model ends in a softmax: the raw scores of the last layer become a
probability distribution over the vocabulary, and everything downstream — the
training loss, sampling, beam search — reads that distribution rather than the
scores themselves.

The snippet below is the smallest useful piece of that head: one function, one
short array, and two printed lines. The line to notice is the shift before the
exponential — subtracting the largest score leaves the distribution unchanged
but keeps `exp` in range, so a score of 800 gives the same answer as a score of
0 instead of overflowing to infinity.

```python
import numpy as np


def softmax(logits):
    """Turn a row of logits into a probability distribution."""
    shifted = logits - logits.max(axis=-1, keepdims=True)   # stays finite
    e = np.exp(shifted)
    return e / e.sum(axis=-1, keepdims=True)


logits = np.array([2.0, 1.0, 0.1])
p = softmax(logits)
print("probabilities", np.round(p, 3))
print("sum", p.sum())
```

Run as printed, it reports `[0.659 0.242 0.099]` and a sum of `1.0`. Dividing
the scores by a temperature before the softmax sharpens or flattens the same
distribution, which is the knob that sampling turns.
