module.exports = {
  base: '/',
  title: 'Vuepress playground',
  description: '',
  head: [],
  dest: 'docs/.vuepress/dist',

  themeConfig: {
    sidebar: [
      {
        title: 'Debug',
        collapsable: false,
        children: [
          '/debug/site_pages.md',
        ],
      },
      {
        title: 'Demo',
        collapsable: false,
        children: [
          '/demo/keyboard_event.md',
          '/demo/auto_link_label.md',
          '/demo/gitgraph_editor.md',
          '/demo/gitgraph_demo.md',
        ],
      },
      {
        title: 'Misc',
        collapsable: false,
        path: '/misc/',
        children: [
          '/misc/table_search.md',
          '/release/',
        ],
      },
    ],
  },

  plugins: [
    ['@vuepress/back-to-top'],

    ['auto-link-label', {
      marker: '!',
    }],

    //['git-info', {
    //  useGlobalUi: true,
    //}],

    //['git-log', {
    //  formatTime: (timestamp, lang) => {
    //    return timestamp;
    //  },
    //  additionalArgs: '--no-merges',
    //  onlyFirstAndLastCommit: false,
    //}],

    ['gitgraph-minigram', {
      marker: 'gitgraph',
    }],

    ['keyboard-event-debug'],

    //['sitemap', {
    //  hostname: 'https://vuepress-playground.example.com',
    //  exclude: ['/404.html'],
    //}],

    [require('./plugins/playground-table-search')],

    [require('./plugins/playground-release-diary')],
  ],

  markdown: {
    extendMarkdown: (md) => {
      md.set({ breaks: true });
    },
  },
};
