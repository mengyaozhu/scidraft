+++
title = "Perplexity Is at Least One (corollary)"
date = 2026-09-21T11:32:00+09:00
tags = ["Demo", "Corollary", "Statistics"]
mathTitle = "Perplexity Is at Least One"
mathCategory = "Corollaries"
mathAliases = ["Perplexity Lower Bound", "Perplexity ≥ 1", "Entropy Floor"]
mathSummary = "Follows from the definition of perplexity that its value can never drop below one, however good the model."
math = true
showTitle = true
+++

**Demo note.** This note demonstrates what the **SciDraft** Hugo theme can do
for academic and scientific publishing — for research institutions, researchers
and students. Its content is demonstration material only: readers should ignore
whether the demo content is correct.

A corollary is what falls out of a theorem with one substitution, and the useful one
here is a floor on perplexity. Since cross-entropy cannot fall below the entropy of the
data, and entropy is non-negative, perplexity cannot fall below one.

The bound is what makes a reported perplexity of 0.9 a bug report rather than a result:
no distribution can assign more probability than certainty to every observed token.

**Corollary.** For any model distribution \(q\) and any data distribution \(p\) with
finite support,

$$
\operatorname{PPL}(q) = \exp H(p, q) \geq \exp H(p) \geq 1 ,
$$

with equality throughout if and only if \(p\) is concentrated on a single outcome and
\(q = p\) there.

The first inequality is Gibbs' inequality composed with the exponential, which is
increasing; the second is \(H(p) \geq 0\), which holds because each term \(-p_v \log
p_v\) is non-negative.

In practice the floor is far above one: natural text has entropy in the low nats per
token, so the gap between a model's perplexity and one is not the gap worth tracking —
the gap to the entropy of the data is.
