module.exports = (options, ctx) => {
  return {
    chainMarkdown(config) {
      config
        .plugin('vuepress-plugin-playground-link-title')
        .use(require('./markdown-it-plugin')(ctx));
    },
  };
};
