+++
title = "Layout of a Small Numeric Experiment (starter folder structure)"
date = 2026-09-21T15:52:00+09:00
tags = ["Demo", "Python", "Project Layout"]
math = true
showTitle = true
+++

**Demo note.** This note demonstrates what the **SciDraft** Hugo theme can do
for academic and scientific publishing — for research institutions, researchers
and students. Its content is demonstration material only: readers should ignore
whether the demo content is correct.

The smallest useful project around a piece of neural-network mathematics holds
one idea per file and keeps the generated numbers out of the code. Nothing in it
is conventional yet: a starter folder is decided by what you want to compare
next, not by what a template says.

The tree below is that starter size — a few files at the top level and one
folder for data. Each entry carries a short note after `#`, and the highlighter
treats those as comments, so the structure reads first and the explanations stay
out of the way.

```bash
softmax-lab/
├── data/
│   └── logits.npy          # one batch of scores to experiment with
├── softmax.py              # the stable version: max-shift, then exp
├── temperature.py          # the same softmax, with a temperature
├── check_overflow.py       # naive vs shifted, on scores up to 1e3
└── README.md
```

Keeping the generated `data/` folder separate from the scripts is the one habit
worth adopting at this size. It is also the habit that runs out first: once a
second model variant arrives, the flat layout forces the choice between longer
file names and imports that depend on where the script was launched from — the
reason the next size up introduces folders.
