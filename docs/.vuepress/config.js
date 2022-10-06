module.exports = {
  base: '/vuepress-playground/',
  title: 'Vuepress playground',
  description: '',
  head: [],
  dest: 'docs/.vuepress/dist',

  themeConfig: {
    sidebar: [
      {
        title: 'Debug',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          '/debug/site_pages.md',
        ],
      },
      {
        title: 'Demo',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          '/demo/data_binding.md',
          '/demo/keyboard_event.md',
          '/demo/auto_link_label.md',
        ],
      },
      {
        title: 'Plugin (tags)',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          '/plugin_tags/overview.md',
          '/plugin_tags/page01.md',
          '/plugin_tags/page02.md',
        ],
      },
      {
        path: '/misc/',
        title: 'Misc',
        collapsable: false,
        sidebarDepth: 0,
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

    ['keyboard-event-debug'],

    //['sitemap', {
    //  hostname: 'https://vuepress-playground.example.com',
    //  exclude: ['/404.html'],
    //}],

    ['tags'],

    [require('./plugins/playground-data-binding')],

    [require('./plugins/playground-release-diary')],

    [require('./plugins/playground-site-pages')],

    [require('./plugins/playground-table-search')],
  ],

  markdown: {
    extendMarkdown: (md) => {
      md.set({ breaks: true });
    },
  },
};
