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
        sidebarDepth: 0,
        children: [
          '/debug/site_pages.md',
          '/debug/update_info.md',
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
          '/demo/update_info.md',
          '/demo/gitgraph_editor.md',
          '/demo/gitgraph_demo.md',
        ],
      },
      {
        title: 'Update info pages',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          '/update_info/page01.md',
          '/update_info/page02.md',
          '/update_info/page03.md',
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

    ['frontmatter-update-info'],

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
