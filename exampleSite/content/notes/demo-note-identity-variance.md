+++
title = "The Variance Identity (identity)"
date = 2026-09-21T16:22:00+09:00
tags = ["Demo", "Identity", "Statistics"]
math = true
showTitle = true
+++

**Demo note.** This note demonstrates what the **SciDraft** Hugo theme can do
for academic and scientific publishing — for research institutions, researchers
and students. Its content is demonstration material only: readers should ignore
whether the demo content is correct.

An identity is an equation that holds for every admissible value of its variables, and
this one converts a variance into two expectations, which is often the difference between
a quantity that can be estimated in one pass and one that cannot.

Its use in this field is everywhere a second moment appears: batch normalisation, the
analysis of gradient noise, and the decomposition of an estimator's error all begin by
applying it.

**Identity (variance).** For a random variable \(X\) with finite second moment,

$$
\operatorname{Var}(X) = \mathbb{E}\!\left[X^{2}\right] - \left(\mathbb{E}[X]\right)^{2},
\qquad
\operatorname{Var}(X) = \mathbb{E}\!\left[(X - \mathbb{E}[X])^{2}\right] .
$$

The equality follows by expanding the square in the second expression and using linearity of
expectation. The practical difference between the two forms is what has to be stored: the
first can be accumulated from running sums of \(x\) and \(x^{2}\), while the second wants
the mean before the sum can be formed — a difference that matters when statistics are
computed over a stream.

Read as a constraint rather than a formula, the identity says a variance can never be
negative, since it is an expectation of a square; the first form makes that fact easy to
lose sight of, and the second makes it immediate.
