/**
 * @param {Object[]} pages
 * @param {Object[]} tokens
 * @param {string} marker
 */
const modifyLinkTitle = (pages, tokens, marker) => {
  tokens.forEach((token) => {
    if (token.type === 'inline' && token.children.length > 0) {
      for (let i = 0, len = token.children.length; i < len; i++) {
        if (
          token.children.length > (i + 2) &&
          token.children[i].type === 'link_open' &&
          token.children[i + 1].type === 'text' &&
          token.children[i + 2].type === 'link_close'
        ) {
          const href = token.children[i].attrGet('href');

          let page;
          if ((page = findPageForHref(pages, href))) {
            if (token.children[i + 1].content === marker) {
              token.children[i + 1].content = page.title;
            }
          }
          i += 3;
        }
      }
    }
  });
};

const findPageForHref = (pages, href) => {
  for (let i = 0; i < pages.length; i++) {
    const page = pages[i]

    // Match patterns
    //
    // - href like '/path/': matches page.regularPath
    // - href like '/path/page.md': matches '/' + page.relativePath

    if (href === page.regularPath) {
      return page;
    }

    if (href === ('/' + page.relativePath)) {
      return page;
    }
  }

  return null;
}

module.exports = ((ctx, { marker }) => {
  return (md) => {
    md.core.ruler.push('vuepress_plugin_playground_link_title', ((state) => {
      modifyLinkTitle(ctx.pages, state.tokens, marker);
    }));
  };
});
