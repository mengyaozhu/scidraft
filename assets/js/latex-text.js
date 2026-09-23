/* LaTeX text commands in note bodies.
 *
 * WHY THIS EXISTS
 * Notes are often written by pasting prose out of a LaTeX source, which leaves
 * commands such as \textbf{...} in the Markdown. Markdown has no meaning for
 * them, and KaTeX only typesets what sits inside math delimiters, so without
 * this pass the reader sees the raw command. It converts the few text commands
 * that appear in practice into their HTML equivalents:
 *
 *     \textbf{...}  ->  <strong>...</strong>
 *     \textit{...}  ->  <em>...</em>
 *     \emph{...}    ->  <em>...</em>
 *     \texttt{...}  ->  <code>...</code>
 *
 * WHERE IT RUNS
 * Loaded by layouts/_partials/extend_head.html on pages that render note
 * bodies (note pages, standalone pages, the homepage and /notes/). For AI
 * agents and developers changing this file, three rules matter:
 *
 *   1. Only TEXT NODES are rewritten, never HTML. Text inside pre, code,
 *      script, style, textarea is skipped, so a command shown as an example in
 *      a code block stays literal — which is the point of the skipping.
 *   2. Text inside .katex, .MathJax / mjx-container and .references is skipped
 *      too. The math engines have already turned math into markup by the time
 *      this runs (see rule 3), and the bibliography is built from the BibTeX
 *      file, not from the note text.
 *   3. ORDERING: the <script> for this file must stay AFTER the math block in
 *      extend_head.html, and the pass waits for MathJax when the page loads
 *      it: MathJax typesets asynchronously and may still be pending at
 *      DOMContentLoaded, and running first would rewrite a \textbf that
 *      belongs to raw $$..$$ source, breaking the formula. KaTeX (pseudo-
 *      algorithm blocks) renders synchronously at DOMContentLoaded as before.
 *
 * DESIGN NOTES
 * - Braces are matched by counting, not by a regular expression, so an
 *   argument containing braces of its own (\textbf{a {b} c}) survives. An
 *   unbalanced argument is left exactly as written rather than half-converted.
 * - Escaped braces (\{ and \}) inside an argument are unescaped in the output.
 * - Arguments are converted recursively, so \textbf{\textit{x}} works.
 * - The pass is idempotent: after it runs there is no \textbf left in any text
 *   node, so running it twice changes nothing.
 * - Nothing is logged and nothing is fetched; if a browser blocks the script
 *   the page simply keeps the raw command, which is the current behaviour.
 * - To support another command, add it to COMMANDS. Keys are the command names
 *   without the backslash; values are the HTML tag names to emit.
 */
(function () {
  "use strict";

  // Command name -> tag name. Keep this list to commands whose HTML meaning is
  // unambiguous; anything else is better written as Markdown in the note.
  var COMMANDS = {
    textbf: "strong",
    textit: "em",
    emph: "em",
    texttt: "code"
  };

  // Containers whose text is content the reader should see rendered. Both class
  // names are used by the theme: .md-content for note bodies, .post-content for
  // a standalone page body.
  var ROOTS = ".md-content, .post-content";

  // Subtrees that must never be rewritten (see rule 1 and 2 in the header).
  // .katex is KaTeX output (pseudo-algorithm blocks); .MathJax / mjx-container
  // is MathJax v4 output (ordinary equations).
  var SKIP =
    "pre, code, script, style, textarea, .katex, .MathJax, mjx-container, .references";

  // A command starts here: a backslash, the name, an opening brace.
  var OPENER = /\\(textbf|textit|emph|texttt)\{/g;

  var MAX_SCAN = 20000; // argument length guard, so malformed input cannot hang the pass

  // Returns the index just past the matching "}" for the "{" at openIndex,
  // or -1 when the braces do not balance. Escaped braces are not counted.
  function findClose(text, openIndex) {
    var depth = 0;
    for (var i = openIndex; i < text.length && i - openIndex < MAX_SCAN; i++) {
      var ch = text.charAt(i);
      if (ch === "\\") {           // skip the escaped character, \{ and \} included
        i++;
        continue;
      }
      if (ch === "{") depth++;
      else if (ch === "}") {
        depth--;
        if (depth === 0) return i;
      }
    }
    return -1;
  }

  // Unescapes the two braces that can appear inside an argument.
  function unescapeBraces(text) {
    return text.replace(/\\\{/g, "{").replace(/\\\}/g, "}");
  }

  // Converts a string into a DocumentFragment: plain text plus, for every
  // command found, an element of the mapped tag whose children are converted
  // recursively.
  function convert(text, doc, depth) {
    var frag = doc.createDocumentFragment();
    var last = 0;
    var match;
    OPENER.lastIndex = 0;

    while ((match = OPENER.exec(text)) !== null) {
      var open = match.index + match[0].length - 1;      // index of "{"
      var close = findClose(text, open);
      if (close === -1) continue;                        // unbalanced: leave as text
      if (depth > 8) continue;                           // absurd nesting: leave as text

      frag.appendChild(doc.createTextNode(text.slice(last, match.index)));

      var el = doc.createElement(COMMANDS[match[1]]);
      var inner = unescapeBraces(text.slice(open + 1, close));
      // recursive so that \textbf{\textit{x}} nests correctly
      el.appendChild(convert(inner, doc, depth + 1));
      frag.appendChild(el);

      last = close + 1;
      OPENER.lastIndex = last;                           // continue after this argument
    }

    if (last === 0) return doc.createTextNode(text);     // nothing found
    frag.appendChild(doc.createTextNode(text.slice(last)));
    return frag;
  }

  function run() {
    var doc = document;
    var roots = doc.querySelectorAll(ROOTS);
    if (!roots.length) return;

    var walker = doc.createTreeWalker(
      roots.length === 1 ? roots[0] : doc.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: function (node) {
          if (!node.nodeValue || node.nodeValue.indexOf("\\") === -1) return NodeFilter.FILTER_REJECT;
          if (node.parentElement && node.parentElement.closest(SKIP)) return NodeFilter.FILTER_REJECT;
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    var targets = [];
    while (walker.nextNode()) targets.push(walker.currentNode);

    targets.forEach(function (node) {
      var replaced = convert(node.nodeValue, doc, 0);
      if (replaced.nodeType === 3) return;               // unchanged text node
      node.parentNode.replaceChild(replaced, node);
    });
  }

  // Pages that load MathJax must wait for it: it typesets asynchronously and
  // may still be pending at DOMContentLoaded (rule 3 above). Pages without a
  // MathJax script run at once, as before. The poll gives up after ~10s and
  // keeps today's behaviour rather than never converting.
  function start() {
    if (!document.querySelector('script[src*="mathjax"]')) { run(); return; }
    var tries = 0;
    (function poll() {
      var mj = window.MathJax;
      if (mj && mj.startup && mj.startup.promise) {
        mj.startup.promise.then(run, run);
      } else if (++tries < 40) {
        setTimeout(poll, 250);
      } else {
        run();
      }
    })();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
