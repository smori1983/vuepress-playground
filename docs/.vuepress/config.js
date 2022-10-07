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
        title: 'Plugin (keyboard event debug)',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          ['/plugin_keyboard_event_debug/demo.md', 'Demo'],
        ],
      },
      {
        title: 'Plugin (auto link label)',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          '/plugin_auto_link_label/demo.md',
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
          '/demo/data_binding.md',
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
