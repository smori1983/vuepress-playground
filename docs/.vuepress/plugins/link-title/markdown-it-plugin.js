const marker = '!';

/**
 * @param {Object[]} pages
 * @param {Object[]} tokens
 */
const modifyLinkTitle = (pages, tokens) => {
  tokens.forEach((token) => {
    if (token.type === 'inline' && token.children.length > 0) {
      for (let i = 0, len = token.children.length; i < len; i++) {
        if (isSimpleLink(token.children, i)) {
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

/**
 * @param {Object[]} tokens
 * @param {number} index
 * @returns {boolean}
 */
const isSimpleLink = (tokens, index) => {
  return (
    tokens.length > (index + 2) &&
    tokens[index + 0].type === 'link_open' &&
    tokens[index + 1].type === 'text' &&
    tokens[index + 2].type === 'link_close'
  );
};

const findPageForHref = (pages, href) => {
  for (let i = 0; i < pages.length; i++) {
    const page = pages[i]

    if (href === ('/' + page.relativePath)) {
      return page;
    }
  }

  return null;
}

module.exports = ((ctx) => {
  return (md) => {
    md.core.ruler.push('vuepress_plugin_playground_link_title', ((state) => {
      modifyLinkTitle(ctx.pages, state.tokens);
    }));
  };
});
