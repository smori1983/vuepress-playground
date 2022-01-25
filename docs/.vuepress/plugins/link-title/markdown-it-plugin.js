const marker = '!';

const modifyLinkTitle = (pages, token) => {
  if (token.type === 'inline' && token.children.length > 0) {
    if (token.children[0].type === 'link_open') {
      if (
        token.children[0].type === 'link_open' &&
        token.children[1].type === 'text' &&
        token.children[2].type === 'link_close'
      ) {
        const href = token.children[0].attrGet('href');

        let page;
        if ((page = findPageForHref(pages, href))) {
          if (token.children[1].content === marker) {
            token.children[1].content = page.title;
          }
        }
      }
    } else {
      token.children.forEach((child) => {
        modifyLinkTitle(pages, child);
      });
    }
  }
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
      state.tokens.forEach((token) => {
        modifyLinkTitle(ctx.pages, token);
      });
    }));
  };
});
