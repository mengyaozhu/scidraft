+++
title = "Layout of a Trainable Model (intermediate folder structure)"
date = 2026-09-21T10:02:00+09:00
tags = ["Demo", "Python", "Project Layout"]
math = true
showTitle = true
+++

**Demo note.** This note demonstrates what the **SciDraft** Hugo theme can do
for academic and scientific publishing — for research institutions, researchers
and students. Its content is demonstration material only: readers should ignore
whether the demo content is correct.

Once a model trains, the folder structure has a second job: it has to separate
what changes per run from what changes per idea. Configurations and checkpoints
belong to a run; attention code, data preparation and the training loop belong
to the project, and the split is what lets a result be reproduced from a config
file plus a commit rather than from memory.

This tree is three levels deep and gives each responsibility its own folder:
model code, data preparation next to its shards, the entry points under
`scripts/`, and gradient checks under `tests/`. The two generated folders are
listed without their contents, since their files are produced by running the
project rather than written into it.

```bash
tiny-transformer/
├── configs/
│   ├── base.toml           # 6 layers, 8 heads, 2k context
│   └── smoke.toml          # 2 layers, for a one-minute run
├── data/
│   ├── prepare.py          # tokenise the corpus and shard it
│   └── shards/
│       ├── train.bin
│       └── val.bin
├── model/
│   ├── attention.py        # scaled dot-product, causal mask
│   ├── blocks.py           # residual stream, layer norm, MLP
│   └── loss.py             # softmax cross-entropy
├── scripts/
│   ├── train.py            # reads a config, writes a checkpoint
│   ├── eval.py             # validation loss for one checkpoint
│   └── sample.py           # top-p decoding from a checkpoint
├── checkpoints/            # written by scripts/train.py
├── tests/
│   └── test_gradients.py   # finite-difference checks per module
└── README.md
```

The layout pays off at evaluation time, which is where most projects lose their
history: a folder of checkpoints plus one evaluation script regenerates the same
number months later, and the config beside each checkpoint says which model
produced it. The next size up is what appears when a project holds several
experiments at once — sweeps, benchmarks and figures — and needs each of them to
stay traceable.
