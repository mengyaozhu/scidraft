+++
title = "A Paper with Multiple References (demo)"
date = 2026-09-22T07:20:00+09:00
tags = ["Demo", "Citations"]
renderingTitle = "A Paper with Multiple References"
renderingCategory = "Citations"
renderingAliases = ["Multiple Bibliographies", "Per-Paper References", "Multi-Bib Note"]
renderingSummary = "Shows a single note carrying more than one reference list, each drawing on its own bibliography file."
math = true
showTitle = true
+++

{{< preview >}}

**Demo note.** This note demonstrates what the **SciDraft** Hugo theme can do
for academic and scientific publishing — for research institutions, researchers
and students. Its content is demonstration material only: readers should ignore
whether the demo content is correct.

A long paper sometimes needs more than one bibliography: a main text and an
appendix written against a different literature, or two halves of a review whose
sources barely overlap. The theme supports that by letting each list name its own
file, so each list downloads only its own entries and numbers them from one. This
note is written that way on purpose — the first half is about how a model is
asked, the second about how it is adapted, and the two halves share no sources.

## Part one: how a model is asked

The prompting literature divides along a simple question: what is added to the
prompt. The survey of the field \cite{Yu2023-qr} organises it that way, and the
empirical study of what actually matters inside a chain \cite{Wang2022-hh} narrows
the answer, arguing that the order of the steps and the presence of the question
count for more than the fluency of the demonstrations. Both are worth reading
before trusting a single reported gain.

The first family changes the shape of the prompt itself. ChainLM
\cite{Cheng2024-az} adds a verification stage so that the model checks the chain it
has just written; contrastive prompting \cite{Chia2023-cz} supplies wrong chains
alongside right ones so the difference is visible; and R³ prompting
\cite{Tian2023-bk} reviews and rephrases the question before attempting it. The
shared idea is that a chain is a scaffold the model can be handed, not only a trace
it produces.

The second family removes the hand-written demonstrations altogether. Synthetic
prompting \cite{Shao2023-lx} has the model write its own examples and keeps the
ones that solve the task; active prompting \cite{Diao2024-at} selects the questions
whose chains would teach the most, one round at a time; and explanation selection
\cite{Ye2023-wa} chooses, from many candidate explanations, the one that helps on
unlabeled data.

The third family changes what happens after sampling, and that is where the
reported gains are both largest and least stable. Self-consistency
\cite{Wang2022-ir} samples several chains and takes the majority answer;
uncertainty-guided selection \cite{Kumar2024-bj} decides per question whether one
chain or a vote is worth the budget; the comparison of zero-shot and few-shot
settings \cite{Cheng2025-sl} finds that the ordering of methods can reverse with
the prompt alone; and a study of hallucination cues \cite{Cheng2025-wj} shows a
longer chain hiding, rather than revealing, that the model is unsure.
Tool-augmented chains \cite{Inaba2023-cg} are a fourth case: the chain calls a
program, which changes what an answer can be grounded in.

{{< references bib="bib/survey-refs-01.bib" title="References for the first part" >}}

{{< /preview >}}

## Part two: how a model is adapted

The adaptation literature starts from a budget: what can be trained when the frozen
weights are far larger than the data. Low-rank adaptation writes the change to a
weight matrix as the product of two thin matrices, and PiSSA \cite{Meng2024-pi}
and CorDA \cite{Yang2024-so} choose the subspace for those matrices from the
principal directions of the pretrained weights rather than at random, reporting
faster convergence at the same rank.

A second line attacks the rank itself. Delta-LoRA \cite{Zi2023-wp} carries the
difference between successive low-rank updates into the frozen matrix, which lets
the effective rank grow without training more parameters; MiLoRA
\cite{Zhang2024-xm} keeps the smallest singular directions instead of the largest,
on the argument that they carry the adaptation; IncreLoRA \cite{Zhang2023-sd}
allocates rank as training proceeds, adding rows where the loss asks for them; and
PRoLoRA \cite{Sheng2024-bj} rotates the basis the update is expressed in.

A third line is the interaction with quantisation, which is where deployment
actually lands. LoftQ \cite{Li2023-nr} initialises the low-rank pair and the
quantised weights together so that the two errors cancel as far as possible; QA-LoRA
\cite{Xu2023-ro} keeps the quantised weights frozen and learns the scales that
matter for the update; LQ-LoRA \cite{Guo2023-kg} splits the problem into a low-rank
part and a quantised remainder.

A fourth line does not use a low-rank update at all. Adapters insert a bottleneck
between frozen layers, and their descendants vary what is trained inside it:
SparseAdapter \cite{He2022-tw} sparsifies the bottleneck, the Hadamard adapter
\cite{Chen2024-bv} parameterises it with a fast transform, Adapter-X
\cite{Li2024-sd} generalises the idea across vision and language, and LLaMA-Adapter
\cite{Zhang2023-hq} adds a zero-initialised attention prefix that leaves the model
untouched at step zero. Prompt-side methods sit at the extreme end: Prefix-tuning
\cite{Li2021-sr} trains only continuous prefix vectors, and VB-LoRA
\cite{Li2024-fk} stores many low-rank updates in a shared vector bank so that one
artefact serves several tasks.

{{< references bib="bib/refs.bib" title="References for the second part" >}}

The two halves above are written against different literatures, and this note keeps
them that way: the first list holds the sources of the prompting half and the
second the sources of the adaptation half, each numbered from one and each fetched
from its own file. A note that used a single shared bibliography would print all of
them in one list, leaving the reader to work out which half of the text each entry
belonged to.
