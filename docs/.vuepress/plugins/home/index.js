const { path } = require('@vuepress/shared-utils');

module.exports = (options) => ({
  alias: {
    '@theme/components/Home.vue': path.resolve(__dirname, 'Home.vue'),
  },
});
