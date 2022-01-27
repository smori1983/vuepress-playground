class Link {
  /**
   * @param {string} marker
   */
  constructor(marker) {
    this._marker = marker;
  }

  /**
   * @param {Object[]} pages
   * @param {Object[]} tokens
   */
  rewriteTitle(pages, tokens) {
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
            if ((page = this._findPageForHref(pages, href))) {
              if (token.children[i + 1].content === this._marker) {
                token.children[i + 1].content = page.title;
              }
            }
            i += 3;
          }
        }
      }
    });
  }

  /**
   * @param {Object[]} pages
   * @param {string} href
   * @private
   */
  _findPageForHref(pages, href) {
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
}

module.exports = Link;
