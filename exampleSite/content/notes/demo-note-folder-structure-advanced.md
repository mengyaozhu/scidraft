+++
title = "Layout of a Scaling Study (advanced folder structure)"
date = 2026-09-22T07:01:00+09:00
tags = ["Demo", "Python", "Project Layout"]
math = true
showTitle = true
+++

**Demo note.** This note demonstrates what the **SciDraft** Hugo theme can do
for academic and scientific publishing — for research institutions, researchers
and students. Its content is demonstration material only: readers should ignore
whether the demo content is correct.

A project that produces a paper has to keep three kinds of thing apart that are
easy to mix: the installed source, the outputs of individual runs, and the
material the paper is written from. Once several sweeps and a performance
benchmark live in the same repository, the folder structure is what decides
whether a figure can be traced back to the run that produced it.

The tree below is five levels deep in places. Source sits under `src/` as an
installable package, each run gets its own timestamped folder under
`experiments/runs/`, benchmark scripts and their results live together, and the
paper's figures and tables are generated from the run folders by a script rather
than pasted in by hand.

```bash
scaling-study/
├── pyproject.toml
├── src/
│   └── scaling_study/
│       ├── data/
│       │   ├── tokenizer.py       # train or load the tokenizer
│       │   └── shards.py          # memory-mapped token shards
│       ├── model/
│       │   ├── attention.py       # causal attention
│       │   ├── blocks.py          # residual + norm + MLP
│       │   └── config.py          # dataclass per model size
│       ├── kernels/
│       │   ├── reference.py       # slow, obviously correct
│       │   └── triton/            # fused attention kernels
│       ├── train/
│       │   ├── loop.py            # one step, one eval, one checkpoint
│       │   ├── optim.py           # schedule and gradient clipping
│       │   └── distribute.py      # data parallel wrapper
│       └── eval/
│           ├── perplexity.py      # loss per token, not per sequence
│           └── scaling_fit.py     # power-law fit over sizes
├── configs/
│   ├── registry.py                # names the sweeps
│   └── sweep/                     # one file per sweep point
├── experiments/
│   └── runs/
│       └── 2026-09-18-a3f2/
│           ├── config.yaml        # exactly what was launched
│           ├── metrics.jsonl      # one line per evaluation
│           └── checkpoints/
├── benchmarks/
│   ├── attention_bench.py
│   └── results/
├── paper/
│   ├── make_figures.py            # reads runs/, writes figures
│   ├── figures/
│   └── tables/
└── tests/
```

The folder that carries the most weight is `experiments/runs/`: one directory per
launch, holding the config it was started with, its metric log and its
checkpoints. That single convention is what turns a plot into something
reproducible — a figure script can walk those directories, read the loss curves
and rebuild every panel from artifacts, so a reviewer's question about which
configuration produced a point has a file to look at rather than a memory to
trust.
