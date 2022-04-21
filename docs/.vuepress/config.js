module.exports = {
  base: '/',
  title: 'Vuepress playground',
  description: '',
  head: [],
  temp: 'docs/.vuepress/.temp',
  dest: 'docs/.vuepress/dist',

  themeConfig: {
    sidebar: [
      {
        title: 'デバッグ',
        collapsable: false,
        children: [
          '/debug/site_pages.md',
          '/debug/auto_link_label.md',
          '/debug/gitgraph.md',
          '/debug/gitgraph_editor.md',
          '/debug/gitgraph_demo.md',
        ],
      },
      {
        title: 'サンプルページ',
        collapsable: false,
        children: [
          '/country/india.md',
          '/country/nepal.md',
          '/country/sri_lanka.md',
          '/parsing/parse_tree.md',
          '/parsing/parser_generator.md',
          '/parsing/lexical_analysis.md',
        ],
      },
      {
        title: '未分類',
        collapsable: false,
        path: '/misc/',
        children: [
          '/misc/keyboard_event.md',
          '/misc/table_search.md',
        ],
      },
    ],
  },

  plugins: [
    ['@vuepress/back-to-top'],

    ['auto-link-label', {
      marker: '!',
    }],

    ['git-info', {
      useGlobalUi: true,
    }],

    ['git-log', {
      formatTime: (timestamp, lang) => {
        return timestamp;
      },
      additionalArgs: '--no-merges',
      onlyFirstAndLastCommit: false,
    }],

    ['gitgraph-minigram', {
      marker: 'gitgraph',
    }],

    ['keyboard-event-debug'],

    ['sitemap', {
      hostname: 'https://vuepress-playground.example.com',
      exclude: ['/404.html'],
    }],

    [require('./plugins/playground-table-search')],
  ],

  markdown: {
    extendMarkdown: (md) => {
      md.set({ breaks: true });
    },
  },
};
