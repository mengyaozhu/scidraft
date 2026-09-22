+++
title = "Per-Note Identity (author and institute)"
date = 2026-09-22T10:00:00+09:00
tags = ["Demo", "Identity"]
institute = "Guest Lab"
author = "coauthor"
showTitle = true
+++

**Demo note.** This note demonstrates what the **SciDraft** Hugo theme can do
for academic and scientific publishing — for research institutions, researchers
and students. Its content is demonstration material only: readers should ignore
whether the demo content is correct.

Every other note on this site shows the identity set once in `hugo.toml`. This
one does not: its front matter names its own institute and its own author, and
the card above — the avatar letter, the institute name, and the `@handle` —
should read **Guest Lab** and **@coauthor** rather than the site values.

Three layers decide what a card and a note page show, in this order:

1. the theme's `hugo.toml` — `institute = "Your Institute"`,
   `author = "yourname"`, used when the site sets neither;
2. the site's `hugo.toml` `[params]` — what this demo site sets, and what every
   other note here inherits;
3. the note's own front matter — the two fields below, which win over both.

The layers resolve per field and independently, so a note may take its institute
from the site and its author from its own front matter. Setting one here and not
the other is a normal configuration, not a half-configured state.

```toml
+++
institute = "Guest Lab"
author = "coauthor"
+++
```

An author may also be a list, in which case the card shows the first entry and
the page byline joins them with commas:

```toml
+++
author = ["Mengyao Zhu", "Second Author"]
+++
```

One consequence worth knowing: the identity is display metadata, not a
navigation key. Notes pointing at the same lab still show under whichever value
each note carries, and nothing in the feeds groups or filters by it.

**Verify.** Open this note's page and the homepage. Both should read Guest Lab
and @coauthor for this note, while the note beside it still reads the site's own
values.
