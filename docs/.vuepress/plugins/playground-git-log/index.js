const path = require('path');

module.exports = (options) => {
  const {
    useGlobalUi = false,
    usePageBlock = false,
  } = options;

  return {
    enhanceAppFiles: [
      path.resolve(__dirname, 'enhanceAppFile.js'),
    ],

    chainMarkdown(config) {
      if (usePageBlock) {
        config
          .plugin('playground-git-log')
          .use(require('./markdown-it-plugin'));
      }
    },

    globalUIComponents: useGlobalUi ? [
      'PluginPlaygroundGitLogGlobalUi',
    ] : [],
  };
};
