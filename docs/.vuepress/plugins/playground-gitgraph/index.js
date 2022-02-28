const path = require('path');

module.exports = ({
  enhanceAppFiles: [
    path.resolve(__dirname, 'enhanceAppFile.js'),
  ],

  chainMarkdown(config) {
    config
      .plugin('vuepress-plugin-playground-gitgraph')
      .use(require('./markdown-it-plugin'));
  },
});
