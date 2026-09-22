+++
title = "Cross-Entropy (definition)"
date = 2026-09-21T09:02:00+09:00
tags = ["Demo", "Definition", "Probability"]
math = true
showTitle = true
+++

**Demo note.** This note demonstrates what the **SciDraft** Hugo theme can do
for academic and scientific publishing — for research institutions, researchers
and students. Its content is demonstration material only: readers should ignore
whether the demo content is correct.

The training objective of a language model has a name and a formula, and both matter
when the loss curve is read: cross-entropy is the expected negative log-probability of
what actually happened, measured in nats.

The definition is written here for a single position, then specialised to the case a
language model is always in — a target distribution concentrated on one token.

**Definition (cross-entropy).** For two probability distributions \(p\) and \(q\) on the
same finite set, the cross-entropy of \(q\) relative to \(p\) is

$$
H(p, q) = -\sum_{v} p_v \log q_v ,
$$

with the convention \(0 \log 0 = 0\). When \(p\) is the one-hot distribution of the token
that actually came next, the sum collapses to a single term,

$$
H(p, q) = -\log q_{y},
$$

which is the quantity minimised at every position of a training sequence.

Writing the one-hot case separately is what makes the loss comparable across
vocabularies of different sizes: the generic form says what the objective is, and the
collapsed form says what is actually computed, per token, per position.
