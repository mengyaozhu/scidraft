+++
title = "Kolmogorov Axioms for a Token Distribution (axiom)"
date = 2026-09-21T13:32:00+09:00
tags = ["Demo", "Axiom", "Probability"]
mathTitle = "Kolmogorov Axioms for a Token Distribution"
mathCategory = "Axioms"
mathAliases = ["Kolmogorov Axioms", "Probability Space Axioms", "Normalised Non-Negative Measure"]
mathSummary = "States the three assumptions — non-negativity, unit total mass, and additivity — that make a token distribution a probability distribution."
math = true
showTitle = true
+++

**Demo note.** This note demonstrates what the **SciDraft** Hugo theme can do
for academic and scientific publishing — for research institutions, researchers
and students. Its content is demonstration material only: readers should ignore
whether the demo content is correct.

An axiom is an assumption taken as given, and the ones that hold up a language model
are Kolmogorov's three: probabilities are non-negative, the whole space has probability
one, and disjoint events add. Everything else about token distributions is derived from
them rather than assumed.

Stating them for a finite vocabulary is enough here, because the sample space of a
language model at one position is exactly the token set.

**Axiom (probability space of a token distribution).** Let \(\mathcal{V}\) be a finite
vocabulary and \(p\) a function from \(\mathcal{V}\) to the real numbers. Then \(p\) is a
probability distribution when

$$
p_v \geq 0 \quad \text{for every } v, \qquad \sum_{v \in \mathcal{V}} p_v = 1 .
$$

Countable additivity is the third axiom of the general theory; on a finite vocabulary it
is automatic, and the two conditions above are the whole content.

The axioms are what make the softmax the natural output layer: it is the parameterisation
that satisfies the first two conditions by construction, for any real-valued scores.
