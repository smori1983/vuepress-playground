/**
 * @typedef {import('vuepress-types').Context} Context
 * @typedef {import('vuepress-types').Page} Page
 * @typedef {import('vuepress-types').PageOptions} PageOptions
 * @typedef {import('vuepress-types').PluginOptionAPI} PluginOptionAPI
 */

const path = require('path');
const escapeHtml = require('escape-html');
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

    result.push(prepareIndexPage());

    container.getDateList().forEach((date) => {
      result.push(prepareDatePage(container, date));
    });

    container.getNameList().forEach((name) => {
      result.push(prepareNamePage(container, name));
    })

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
   * @return {Partial<PageOptions>}
   */
  const prepareIndexPage = () => {
    return {
      path: sprintf('/%s/', pathPrefix),
      content: '<PlaygroundReleaseDiaryIndex/>',
    };
  };

  /**
   * @param {PackageContainer} container
   * @param {string} date
   * @return {Partial<PageOptions>}
   */
  const prepareDatePage = (container, date) => {
    return {
      path: sprintf('/%s/%s/', pathPrefix, dateForPagePath(date)),
      content: sprintf('<PlaygroundReleaseDiaryDateIndex date="%s"/>', escapeHtml(date)),
    };
  };

  /**
   * @param {PackageContainer} container
   * @param {string} name
   * @return {Partial<PageOptions>}
   */
  const prepareNamePage = (container, name) => {
    return {
      path: sprintf('/%s/%s/', pathPrefix, name),
      content: sprintf('<PlaygroundReleaseDiaryNameIndex name="%s"/>', escapeHtml(name)),
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

    enhanceAppFiles: [
      path.resolve(__dirname, 'enhanceAppFile.js'),
    ],

    chainMarkdown(config) {
      config
        .plugin('vuepress-plugin-playground-release-diary')
        .use(require('./markdown-it-plugin'));
    },

    async additionalPages() {
      return await prepareDiaryPages();
    }
  };
};
