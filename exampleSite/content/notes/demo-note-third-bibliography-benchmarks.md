+++
title = "Benchmarks for Agentic Systems (demo)"
date = 2026-09-21T07:06:00+09:00
tags = ["Demo", "Citations", "Evaluation"]
renderingTitle = "Benchmark Survey"
renderingCategory = "Citations"
renderingAliases = ["Benchmark Survey", "Third Bibliography", "Benchmark References"]
renderingSummary = "Pairs a benchmark discussion with its own bibliography, demonstrating that bibliographies are named per note."
math = true
showTitle = true
+++

**Demo note.** This note demonstrates what the **SciDraft** Hugo theme can do
for academic and scientific publishing — for research institutions, researchers
and students. Its content is demonstration material only: readers should ignore
whether the demo content is correct.

Evaluating a system that uses tools needs its own body of sources: benchmarks for
tool use, for long-context reasoning and for end-to-end knowledge work, together
with the model reports those numbers are read against. This note keeps that
literature in a bibliography of its own, separate from the prompting and
fine-tuning lists used elsewhere on this site.

Tool-use competence is measured by MCP-Atlas \cite{bandi2026mcpatlas}, long-context
reasoning by the AA-LCR benchmark \cite{aalcr}, and the translation result that
most attention papers still compare against is the one in Bahdanau et al.
\cite{bahdanau2014attention}.

{{< references bib="bib/survey-refs-02.bib" title="References" >}}

The three entries above come from a file that shares no keys with the other
bibliographies here, which is the point of naming a file per list: this note
downloads only its own references, and a key that lives in another paper's file
would be reported as missing rather than silently resolved.
