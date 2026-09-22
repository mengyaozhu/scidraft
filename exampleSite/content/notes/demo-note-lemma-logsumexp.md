+++
title = "Log-Sum-Exp Bounds (lemma)"
date = 2026-09-21T12:02:00+09:00
tags = ["Demo", "Lemma", "Probability"]
math = true
showTitle = true
+++

**Demo note.** This note demonstrates what the **SciDraft** Hugo theme can do
for academic and scientific publishing — for research institutions, researchers
and students. Its content is demonstration material only: readers should ignore
whether the demo content is correct.

The log-partition function appears wherever a normalising constant is needed, and it is
trapped between two elementary bounds that are enough for most arguments: the largest term
below, the largest term plus the log of the number of terms above.

The bounds are used for more than estimates. They are the reason the log-partition is
Lipschitz with constant one in the maximum norm, which is what makes it safe to compute in
log space in the first place.

**Lemma (bounds on the log-sum-exp).** For \(z \in \mathbb{R}^{n}\),

$$
\max_i z_i \leq \log \sum_{i=1}^{n} e^{z_i} \leq \max_i z_i + \log n .
$$

The lower bound is the largest term alone; the upper bound follows because every term is
at most \(e^{\max_i z_i}\). Both bounds are attained: the lower one when the other terms
vanish, the upper one when all terms are equal.

A gap of at most \(\log n\) is what makes the log-partition usable as a normaliser even
when the individual terms differ by hundreds of nats, since the bounds do not depend on
that spread.
