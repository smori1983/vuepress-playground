module.exports = {
  base: '/vuepress-playground/',
  title: 'Vuepress playground',
  description: '',
  head: [],
  dest: 'docs/.vuepress/dist',

  locales: {
    '/': {
      lang: 'ja-JP',
    },
    '/en/': {
      lang: 'en-US',
    },
  },

  themeConfig: {
    searchPlaceholder: 'Search ( s, / )',

    locales: {
      '/': {
        sidebar: [
          {
            title: 'Debug',
            collapsable: false,
            sidebarDepth: 0,
            children: [
              '/debug/site_pages.md',
              '/debug/flexsearch.md',
            ],
          },
          '/md-enhance/',
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
            title: 'Aozora bunko',
            collapsable: false,
            sidebarDepth: 0,
            children: [
              '/aozora/edogawa_ranpo_kaijin20mensou.md',
              '/aozora/edogawa_ranpo_kaiteinomajutsushi.md',
              '/aozora/mori_ougai_kanoyouni.md',
              '/aozora/mori_ougai_maihime.md',
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
      '/en/': {
        sidebar: [
          {
            title: 'Debug',
            collapsable: false,
            sidebarDepth: 0,
            children: [
              '/en/debug/site_pages.md',
            ],
          },
          {
            title: 'Plugin (keyboard event debug)',
            collapsable: false,
            sidebarDepth: 0,
            children: [
              ['/en/plugin_keyboard_event_debug/demo.md', 'Demo'],
            ],
          },
        ],
      },
    },
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

    ['@smori1983/vuepress-plugin-flexsearch', {
      //searchHotKeys: ['s', '/'],
      //searchMaxSuggestions: 20,
      //searchPaths: null,
      //uiAlignRightFactor: 10,
      //excerptAroundLength: 100,
      //excerptHeadText: '... ',
      //excerptTailText: ' ...',
      //tokenizerType: 'kuromoji.default',
      //ngramSize: 3,
    }],

    ['keyboard-event-debug'],

    ['md-enhance', {
      codegroup: true,
      mermaid: true,
      tasklist: true,
    }],

    //['sitemap', {
    //  hostname: 'https://vuepress-playground.example.com',
    //  exclude: ['/404.html'],
    //}],

    ['tags'],

    ['view-source'],

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
