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

    result.push(prepareIndex());

    result.push(prepareDateIndex());
    container.getDateList().forEach((date) => {
      result.push(prepareDatePage(date));
    });

    result.push(prepareNameIndex());
    container.getNameList().forEach((name) => {
      result.push(prepareNamePage(name));
    })

    return result;
  };

  /**
   * @return {Partial<PageOptions>}
   */
  const prepareIndex = () => {
    return {
      path: sprintf('/%s/', pathPrefix),
      content: '<PlaygroundReleaseDiaryIndex/>',
      frontmatter: {
        title: 'Release list',
      },
    };
  };

  /**
   * @return {Partial<PageOptions>}
   */
  const prepareDateIndex = () => {
    return {
      path: sprintf('/%s/date/', pathPrefix, ),
      content: '<PlaygroundReleaseDiaryDateIndex/>',
    };
  };

  /**
   * @param {string} date
   * @return {Partial<PageOptions>}
   */
  const prepareDatePage = (date) => {
    return {
      path: sprintf('/%s/date/%s/', pathPrefix, dateForPagePath(date)),
      content: sprintf('<PlaygroundReleaseDiaryDatePage date="%s"/>', escapeHtml(date)),
    };
  };

  /**
   * @return {Partial<PageOptions>}
   */
  const prepareNameIndex = () => {
    return {
      path: sprintf('/%s/name/', pathPrefix, ),
      content: '<PlaygroundReleaseDiaryNameIndex/>',
    };
  };

  /**
   * @param {string} name
   * @return {Partial<PageOptions>}
   */
  const prepareNamePage = (name) => {
    return {
      path: sprintf('/%s/name/%s/', pathPrefix, name),
      content: sprintf('<PlaygroundReleaseDiaryNamePage name="%s"/>', escapeHtml(name)),
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
