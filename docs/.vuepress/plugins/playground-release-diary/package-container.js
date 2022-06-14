const PackageInfo = require('./package-info');

class PackageContainer {
  constructor() {
    /**
     * @type {PackageInfo[]}
     * @private
     */
    this._packages = [];
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
      return a.name <= b.name ? -1 : 1;
    })

    return result;
  }
}

module.exports = PackageContainer;
