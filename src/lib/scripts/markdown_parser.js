import katex from "katex";

function latex(math, inline = false) {
  let options = {
    displayMode: !inline,
    throwOnError: false,
  };
  return katex.renderToString(math, options);
}

export const markdownParser = (text) => {
  const toHTML = text
    // .replace(/^#### (.*$)/gim, "<h4>$1</h4>") // h3 tag
    // .replace(/^### (.*$)/gim, "<h3>$1</h3>") // h3 tag
    // .replace(/^## (.*$)/gim, "<h2>$1</h2>") // h2 tag
    .replace(/^# (.*$)/gim, "<h1>$1</h1>") // h1 tag
    .replace(/\*\*(.*)\*\*/gim, "<b>$1</b>") // bold text
    .replace(/\_\_(.*)\_\_/gim, "<i>$1</i>")
    .replace(/\n/gim, "<br>")
    .replace(/\[([^\]]+)\]\(([^\)]+)\)/, "<a href=$2>$1</a>")
    .replace(/\\begin{inline}(.*)\\end{inline}/, (a, b) => latex(b, true))
    .replace(/\\begin{equation}(.*)\\end{equation}/, (a, b) => latex(b, false));
  return toHTML.trim(); // using trim method to remove whitespace
};
