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

    const container = new PackageContainer(ctx.pages);

    result.push(prepareIndexPage());

    container.getDateList().forEach((date) => {
      result.push(prepareDatePage(date));
    });

    container.getNameList().forEach((name) => {
      result.push(prepareNamePage(name));
    })

    return result;
  };

  /**
   * @return {Partial<PageOptions>}
   */
  const prepareIndexPage = () => {
    return {
      path: sprintf('/%s/', pathPrefix),
      content: '<PlaygroundReleaseDiaryIndex/>',
      frontmatter: {
        title: 'Release list',
      },
    };
  };

  /**
   * @param {string} date
   * @return {Partial<PageOptions>}
   */
  const prepareDatePage = (date) => {
    return {
      path: sprintf('/%s/%s/', pathPrefix, dateForPagePath(date)),
      content: sprintf('<PlaygroundReleaseDiaryDateIndex date="%s"/>', escapeHtml(date)),
    };
  };

  /**
   * @param {string} name
   * @return {Partial<PageOptions>}
   */
  const prepareNamePage = (name) => {
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
