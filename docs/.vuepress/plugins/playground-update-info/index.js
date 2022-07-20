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

    const infoList = page.frontmatter.update_info.filter(hasValidDate).map((info) => {
      return {
        date: info.date,
        description: prepareDescription(info),
      };
    });

    if (infoList.length > 0) {
      result.push({
        path: page.path,
        title: page.title,
        info: infoList,
      });
    }
  });

  return result;
};

/**
 * @param {Object} updateInfo
 * @return {boolean}
 */
const hasValidDate = (updateInfo) => {
  if (typeof updateInfo.date !== 'string') {
    return false;
  }

  return /^\d{4}\/\d{2}\/\d{2}$/.test(updateInfo.date);
};

/**
 * @param updateInfo
 * @return {string[]}
 */
const prepareDescription = (updateInfo) => {
  if (!Array.isArray(updateInfo.description)) {
    return [];
  }

  if (updateInfo.description.every((child) => typeof child === 'string')) {
    return updateInfo.description;
  }

  return [];
};
