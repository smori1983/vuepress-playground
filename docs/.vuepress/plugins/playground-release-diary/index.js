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

    const container = new PackageContainer();
    ctx.pages.filter(isTargetPage).forEach((page) => {
      const {date, name, version} = page.frontmatter.package_release;
      const path = page.regularPath;
      container.add(date, name, version, path);
    });

    result.push(prepareIndexPage(container));

    container.getDateList().forEach((date) => {
      const dateDigits = date.replace(/\//g, '');

      const datePageLines = [];
      datePageLines.push(sprintf('# Release list (%s)', date));
      datePageLines.push('');
      container.getByDate(date).forEach((pkg) => {
        datePageLines.push(sprintf(
          '- [%s (%s)](%s)',
          pkg.name,
          pkg.version,
          pkg.path
        ));
      });

      result.push({
        path: sprintf('/%s/%s/', pathPrefix, dateDigits),
        content: datePageLines.join('\n'),
      })
    });

    return result;
  };

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
        date.replace(/\//g, '')
      ));
    });

    return {
      path: sprintf('/%s/', pathPrefix),
      content: fileLines.join('\n'),
    };
  };

  /**
   * @param {Page} page
   * @return {boolean}
   */
  const isTargetPage = (page) => {
    return (
      page.frontmatter.package_release &&
      page.frontmatter.package_release.date &&
      page.frontmatter.package_release.name &&
      page.frontmatter.package_release.version
    );
  }

  return {
    name: 'playground-release-diary',
    async additionalPages() {
      return await prepareDiaryPages();
    }
  };
};
