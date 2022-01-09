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
        ],
      },
      {
        title: '国',
        collapsable: false,
        children: [
          '/country/india.md',
          '/country/nepal.md',
          '/country/sri_lanka.md',
        ],
      },
      {
        title: '構文解析',
        collapsable: false,
        children: [
          '/parsing/parse_tree.md',
          '/parsing/parser_generator.md',
          '/parsing/lexical_analysis.md',
        ],
      },
      {
        title: '未分類',
        collapsable: false,
        children: [
          '/misc/keyboard_event.md',
        ],
      },
    ],
  },

  plugins: [
    ['@vuepress/back-to-top'],

    ['component-catalog'],

    ['keyboard-event-debug'],
  ],

  markdown: {
    extendMarkdown: (md) => {
      md.set({ breaks: true });
    },
  },
};
