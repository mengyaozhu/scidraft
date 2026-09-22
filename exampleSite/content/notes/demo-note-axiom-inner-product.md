+++
title = "Inner-Product Axioms (axiom)"
date = 2026-09-21T15:22:00+09:00
tags = ["Demo", "Axiom", "Linear Algebra"]
mathTitle = "Inner-Product Axioms"
mathCategory = "Axioms"
mathAliases = ["Inner Product Space Axioms", "Similarity Axioms", "Positive-Definite Form"]
mathSummary = "Fixes the three conditions a similarity measure must satisfy for attention scores to behave as inner products."
math = true
showTitle = true
+++

**Demo note.** This note demonstrates what the **SciDraft** Hugo theme can do
for academic and scientific publishing — for research institutions, researchers
and students. Its content is demonstration material only: readers should ignore
whether the demo content is correct.

Attention is built on a quantity that looks like a similarity but is defined by three
axioms: an inner product is symmetric, linear in each argument, and positive definite.
Those three properties are what allow a score to be read as "how much one vector points
along another".

Writing the axioms down is not pedantry here. The positive-definiteness clause is the one
that rules out degenerate score functions, and the linearity clauses are what let the
whole score matrix be computed as one matrix product.

**Axiom (inner product).** A function \(\langle \cdot, \cdot \rangle\) on two vectors is
an inner product when

$$
\langle x, y \rangle = \langle y, x \rangle, \qquad
\langle \alpha x + \beta z, y \rangle = \alpha \langle x, y \rangle + \beta \langle z, y \rangle ,
$$

for all vectors and scalars, together with \(\langle x, x \rangle \gt 0\) for every
non-zero \(x\). The score \(q^{\top} k\) satisfies all three, which is why attention is
written as a product of matrices rather than as a table of pairwise scores.

Only the first two axioms are used when the scores are computed; positive definiteness is
what guarantees that a vector has positive length, and it is invoked whenever a
normalisation or a bound relies on \(\lVert x \rVert \gt 0\) for \(x \neq 0\).
