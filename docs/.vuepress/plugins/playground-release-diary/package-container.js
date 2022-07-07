/**
 * @typedef {import('vuepress-types').Page} Page
 */

const PackageInfo = require('./package-info');

class PackageContainer {
  /**
   * @param {Page[]} pages
   */
  constructor(pages) {
    /**
     * @type {PackageInfo[]}
     * @private
     */
    this._packages = [];

    pages.filter(this._isTargetPage).forEach((page) => {
      const {date, name, version} = page.frontmatter.package_release;
      const path = page.regularPath;
      this.add(date, name, version, path);
    });
  }

  /**
   * @param {Page} page
   * @return {boolean}
   * @private
   */
  _isTargetPage(page) {
    return (
      page.plugin_playground_release_diary &&
      page.plugin_playground_release_diary.target
    );
  }

  /**
   * @param {string} date
   * @param {string} name
   * @param {string} version
   * @param {string} path
   */
  add(date, name, version, path) {
    this._packages.push(new PackageInfo(date, name, version, path));
  }

  /**
   * @return {string[]}
   */
  getDateList() {
    /**
     * @type {Set<string>}
     */
    const dates = new Set();

    this._packages.forEach((pkg) => {
      dates.add(pkg.date);
    });

    const result = Array.from(dates);

    result.sort((a, b) => {
      return a <= b ? 1 : -1;
    });

    return result;
  }

  /**
   * @param {string} date
   * @return {PackageInfo[]}
   */
  getByDate(date) {
    const result = this._packages.filter((pkg) => {
      return pkg.date === date;
    })

    result.sort((a, b) => {
      if (a.name === b.name) {
        return a.version <= b.version ? 1 : -1;
      }

      return a.name <= b.name ? -1 : 1;
    })

    return result;
  }

  /**
   * @return {string[]}
   */
  getNameList() {
    /**
     * @type {Set<string>}
     */
    const names = new Set();

    this._packages.forEach((pkg) => {
      names.add(pkg.name);
    });

    const result = Array.from(names);

    result.sort((a, b) => {
      return a <= b ? -1 : 1;
    });

    return result;
  }

  /**
   * @param {string} name
   * @return {PackageInfo[]}
   */
  getByName(name) {
    const result = this._packages.filter((pkg) => {
      return pkg.name === name;
    });

    result.sort((a, b) => {
      return a.version <= b.version ? 1 : -1;
    });

    return result;
  }
}

module.exports = PackageContainer;
