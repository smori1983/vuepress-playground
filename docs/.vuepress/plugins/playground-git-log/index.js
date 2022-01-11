const path = require('path');

module.exports = {
  enhanceAppFiles: [
    path.resolve(__dirname, 'enhanceAppFile.js'),
  ],

  chainMarkdown(config) {
    config
      .plugin('playground-git-log')
      .use(require('./markdown-it-plugin'));
  },

  globalUIComponents: [
    'PluginPlaygroundGitLogGlobalUi',
  ],
};
