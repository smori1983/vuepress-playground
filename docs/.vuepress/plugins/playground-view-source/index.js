/**
 * @typedef {import('vuepress-types').PluginOptionAPI} PluginOptionAPI
 */

const path = require('path');

/**
 * @return {PluginOptionAPI}
 */
module.exports = () => ({
  name: 'playground-view-source',
  enhanceAppFiles: [
    path.resolve(__dirname, 'enhanceAppFile.js'),
  ],
  extendMarkdown: (md) => {
    md.use(require('./markdown-it-plugin'));
  },
});
