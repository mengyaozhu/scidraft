<!--

## READ BEFORE OPENING A PR

Thank you for contributing to SciDraft!
Please fill out the questions below to make the change easier to review.
You do not need to check all the boxes.

-->

**What does this PR change? What problem does it solve?**

<!--
Describe the changes and their purpose here, as detailed as needed.

Please do not add 2 unrelated changes in a single PR — it is difficult to
track and revert them later.
-->


**How was it verified?**

<!--
SciDraft's demo site lives in exampleSite/. Building it is the quickest check:

    cd exampleSite && hugo server --themesDir ../..

Describe what you checked (pages rendered, feed behaviour, citations, ...).
-->


## PR Checklist

- [ ] I have verified the demo site builds without errors or new warnings.
- [ ] I have checked the change on both light and dark themes (if it affects visuals).
- [ ] This change **does not** mix unrelated changes.
- [ ] If it adds a third-party script or font, the source is documented and licensed for redistribution.
- [ ] If it updates translations (i18n/*.yaml), the keys match those used in the templates.
