/**
 * @typedef {import('vuepress-types').Context} Context
 * @typedef {import('vuepress-types').Page} Page
 * @typedef {import('vuepress-types').PluginOptionAPI} PluginOptionAPI
 */

const Conf = require('conf');

/**
 * @param {Object} options
 * @param {Context} ctx
 * @return {PluginOptionAPI}
 */
module.exports = (options, ctx) => {
  return {
    async generated() {
      const conf = new Conf({
        projectName: 'vuepress-playground-plugin-playground-update-info-389a0acd21',
      });

      const updates = collectUpdateInfo(ctx.pages);

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
    if (!page.frontmatter.update_info) {
      return;
    }

    if (!hasValidDate(page.frontmatter.update_info)) {
      return;
    }

    const date = page.frontmatter.update_info.date;
    const description = prepareDescription(page.frontmatter.update_info);

    result.push({
      path: page.path,
      title: page.title,
      date: date,
      description: description,
    });
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
