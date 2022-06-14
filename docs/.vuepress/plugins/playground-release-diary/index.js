/**
 * @typedef {import('vuepress-types').Context} Context
 * @typedef {import('vuepress-types').Page} Page
 * @typedef {import('vuepress-types').PageOptions} PageOptions
 * @typedef {import('vuepress-types').PluginOptionAPI} PluginOptionAPI
 */

const sprintf = require('sprintf-js').sprintf;
const PackageContainer = require('./package-container');

/**
 * @param {Object} options
 * @param {Context} ctx
 * @return {PluginOptionAPI}
 */
module.exports = (options, ctx) => {
  const pathPrefix = 'release';

  const prepareDiaryPages = async () => {
    const result = [];

    const container = prepareContainer(ctx);

    result.push(prepareIndexPage(container));

    container.getDateList().forEach((date) => {
      result.push(prepareDatePage(container, date));
    });

    return result;
  };

  /**
   * @param {Context} ctx
   * @return {PackageContainer}
   */
  const prepareContainer = (ctx) => {
    const container = new PackageContainer();

    ctx.pages.filter(isTargetPage).forEach((page) => {
      const {date, name, version} = page.frontmatter.package_release;
      const path = page.regularPath;
      container.add(date, name, version, path);
    });

    return container;
  };

  /**
   * @param {Page} page
   * @return {boolean}
   */
  const isTargetPage = (page) => {
    return (
      page.frontmatter.package_release &&
      page.frontmatter.package_release.date &&
      /^\d{4}\/\d{2}\/\d{2}$/.test(page.frontmatter.package_release.date) &&
      page.frontmatter.package_release.name &&
      page.frontmatter.package_release.version
    );
  }

  /**
   * @param {PackageContainer} container
   * @return {Partial<PageOptions>}
   */
  const prepareIndexPage = (container) => {
    const fileLines = [];

    fileLines.push('# Release list');
    fileLines.push('');

    container.getDateList().forEach((date) => {
      fileLines.push(sprintf(
        '- [%s](/%s/%s/)',
        date,
        pathPrefix,
        dateForPagePath(date)
      ));
    });

    return {
      path: sprintf('/%s/', pathPrefix),
      content: fileLines.join('\n'),
    };
  };

  /**
   * @param {PackageContainer} container
   * @param {string} date
   * @return {Partial<PageOptions>}
   */
  const prepareDatePage = (container, date) => {
    const fileLines = [];

    fileLines.push(sprintf('# Release list (%s)', date));
    fileLines.push('');
    fileLines.push(sprintf('Back to [Release list](/%s/)', pathPrefix));

    container.getByDate(date).forEach((pkg) => {
      fileLines.push(sprintf(
        '- [%s (%s)](%s)',
        pkg.name,
        pkg.version,
        pkg.path
      ));
    });

    return {
      path: sprintf('/%s/%s/', pathPrefix, dateForPagePath(date)),
      content: fileLines.join('\n'),
    };
  };

  /**
   * Convert 'YYYY/MM/DD' to 'YYYYMMDD'.
   *
   * @param {string} date
   * @return {string}
   */
  const dateForPagePath = (date) => {
    return date.replace(/\//g, '');
  };

  return {
    name: 'playground-release-diary',
    async additionalPages() {
      return await prepareDiaryPages();
    }
  };
};
