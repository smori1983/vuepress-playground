/**
 * @typedef {import('vuepress-types').Context} Context
 * @typedef {import('vuepress-types').Page} Page
 * @typedef {import('vuepress-types').PluginOptionAPI} PluginOptionAPI
 */

const path = require('path');
const Conf = require('conf');

/**
 * @param {Object} options
 * @param {Context} ctx
 * @return {PluginOptionAPI}
 */
module.exports = (options, ctx) => {
  let updates = [];

  return {
    name: 'playground-update-info',

    enhanceAppFiles: [
      path.resolve(__dirname, 'enhanceAppFile.js'),
    ],

    async ready() {
      updates = collectUpdateInfo(ctx.pages);
    },

    clientDynamicModules() {
      return [
        {
          name: 'playground-update-info/data.js',
          content: `export default ${JSON.stringify(updates, null, 2)}`,
        },
      ];
    },

    async generated() {
      const conf = new Conf({
        projectName: 'vuepress-playground-plugin-playground-update-info-389a0acd21',
      });

      if (conf.has('age0')) {
        conf.set('age1', conf.get('age0'));
      } else {
        conf.set('age1', []);
      }

      conf.set('age0', updates);
    },
  };
};

/**
 * @param {Page[]} pages
 */
const collectUpdateInfo = (pages) => {
  const result = [];

  pages.forEach((page) => {
    if (!Array.isArray(page.frontmatter.update_info)) {
      return;
    }

    const infoList = [];
    let latestDate = null;

    page.frontmatter.update_info.filter(hasValidDate).forEach((info) => {
      infoList.push({
        date: info.date,
        description: prepareDescription(info),
      });

      if (latestDate === null) {
        latestDate = info.date;
      }

      if (latestDate < info.date) {
        latestDate = info.date;
      }
    });

    if (infoList.length > 0) {
      result.push({
        path: page.path,
        title: page.title,
        latestDate: latestDate,
        info: infoList,
      });
    }
  });

  return result;
};

/**
 * @param {Object} info
 * @return {boolean}
 */
const hasValidDate = (info) => {
  if (typeof info.date !== 'string') {
    return false;
  }

  return /^\d{4}\/\d{2}\/\d{2}$/.test(info.date);
};

/**
 * @param {Object} info
 * @return {string[]}
 */
const prepareDescription = (info) => {
  if (!Array.isArray(info.description)) {
    return [];
  }

  if (info.description.every((child) => typeof child === 'string')) {
    return info.description;
  }

  return [];
};
