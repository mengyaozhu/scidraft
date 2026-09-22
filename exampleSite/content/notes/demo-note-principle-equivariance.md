+++
title = "Equivariance as a Design Principle (principle)"
date = 2026-09-21T11:52:00+09:00
tags = ["Demo", "Principle", "Geometry"]
math = true
showTitle = true
+++

**Demo note.** This note demonstrates what the **SciDraft** Hugo theme can do
for academic and scientific publishing — for research institutions, researchers
and students. Its content is demonstration material only: readers should ignore
whether the demo content is correct.

Architectures are usually chosen for what they can compute, but the sharper criterion is
what they cannot distinguish: matching the symmetries of the problem removes the need to
learn them from data. This principle is why convolution appears in vision and why attention
appears in sequences.

It is a principle rather than a theorem because the symmetry of the problem is a modelling
judgement. Once it is identified, however, the consequence is exact: a layer that commutes
with the symmetry group reduces the function space being searched rather than merely
biasing the search.

**Principle (equivariance).** Let \(G\) be a group acting on inputs and outputs, and let
\(T_g\) denote the action of \(g \in G\). A layer \(f\) is equivariant when

$$
f(T_g x) = T_g f(x) \qquad \text{for every } g \in G ,
$$

and invariant when \(f(T_g x) = f(x)\). The principle is to choose \(f\) from the
equivariant class when the task itself satisfies \(f^{\star}(T_g x) = T_g f^{\star}(x)\).
Standard instances: translation for a convolution, permutation for a set encoder, rotation
for a point-cloud network — and for a transformer with no position embedding, permutation
of the tokens.

The principle also predicts where an architecture will struggle: a model that is
equivariant to a symmetry the task does not have must spend capacity learning to break it,
which is why position embeddings are needed at all.
