class Link {
  /**
   * @param {string} marker
   */
  constructor(marker) {
    /**
     * @type {Map<string, Object|null>}
     * @private
     */
    this._found = new Map();

    /**
     * @type {string}
     * @private
     */
    this._marker = marker;
  }

  /**
   * @param {Object[]} pages
   * @param {Object[]} tokens
   */
  rewriteTitle(pages, tokens) {
    tokens.forEach((token) => {
      if (token.type === 'inline' && token.children.length > 0) {
        for (let i = 0, len = token.children.length; i + 2 < len; i++) {
          if (
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
    if (this._found.has(href)) {
      return this._found.get(href);
    }

    for (let i = 0; i < pages.length; i++) {
      const page = pages[i]

      // Match patterns
      //
      // - href like '/path/': matches page.regularPath
      // - href like '/path/page.md': matches '/' + page.relativePath

      if (href === page.regularPath) {
        return this._register(href, page);
      }

      if (href === ('/' + page.relativePath)) {
        return this._register(href, page);
      }
    }

    return this._register(href, null);
  }

  /**
   * @param {string} href
   * @param {Object|null} page
   * @returns {Object|null}
   * @private
   */
  _register(href, page) {
    this._found.set(href, page);

    return page;
  }
}

module.exports = Link;
