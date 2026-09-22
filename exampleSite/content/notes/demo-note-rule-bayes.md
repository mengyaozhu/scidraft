+++
title = "Bayes' Rule (rule)"
date = 2026-09-21T16:12:00+09:00
tags = ["Demo", "Rule", "Probability"]
mathTitle = "Bayes' Rule"
mathCategory = "Rules"
mathAliases = ["Bayes' Theorem", "Bayes' Formula", "Posterior Rule"]
mathSummary = "Relates a posterior to a likelihood and a prior, giving the rule for updating belief in light of evidence."
math = true
showTitle = true
+++

**Demo note.** This note demonstrates what the **SciDraft** Hugo theme can do
for academic and scientific publishing — for research institutions, researchers
and students. Its content is demonstration material only: readers should ignore
whether the demo content is correct.

Bayes' rule is the rule for turning a model's likelihood into a statement about
hypotheses, and it is used twice in a language-model workflow: once to reason about
uncertainty in evaluation, and once whenever a prior over prompts or parameters is
combined with observed data.

Written out, the rule is a rearrangement of the definition of conditional probability, and
its content is the division by the evidence term, which is what makes the posterior a
distribution rather than a score.

**Rule (Bayes).** For events \(A\) and \(B\) with \(\Pr(B) \gt 0\),

$$
\Pr(A \mid B) = \frac{\Pr(B \mid A)\,\Pr(A)}{\Pr(B)} ,
\qquad
\Pr(B) = \sum_{A'} \Pr(B \mid A')\,\Pr(A') ,
$$

and in the continuous case with densities the sums become integrals. The three ingredients
are the prior \(\Pr(A)\), the likelihood \(\Pr(B \mid A)\) and the evidence
\(\Pr(B)\), and only the first two are modelling choices: the evidence is whatever makes
the posterior integrate to one.

Using the rule well means noticing when the evidence is hard to compute: in models with
many parameters the denominator is an integral over everything, which is why the posterior
is usually approximated rather than evaluated.
