module.exports = {
  base: '/',
  title: 'Egu0',
  description: '欢迎您，这是一个公开的个人内容网站！',
  head: [
    [
      'link',
      {
        rel: 'icon shortcut',
        size: '32x32',
        href: '/images/logo.png',
      },
    ],
  ],
  themeConfig: {
    logo: '/images/logo.png',
    // 搜索栏
    search: true,
    searchMaxSuggestions: 10,
    // 侧边栏
    displayAllHeaders: true,
    // 导航栏
    navbar: true,
    nav: [
      {
        text: '👨‍💻 开发',
        items: [
          {
            text: '语言',
            items: [
              {
                text: 'JavaScript',
                link: '/langs/js-chaoge/',
              },
              {
                text: 'TypeScript',
                link: '/langs/ts/',
              },
              // {
              //   text: 'TypeScript',
              //   link: '/langs/ts-chaoge/',
              // },
              {
                text: 'NodeJS',
                link: '/langs/nodejs-chaoge/',
              },
              {
                text: 'CSS',
                link: '/langs/css-pink/',
              },
              {
                text: 'Rust',
                link: '/langs/rust/',
              },
            ],
          },
          {
            text: '框架',
            items: [
              {
                text: 'Vue2',
                link: '/frameworks/vue2/',
              },
              {
                text: 'React',
                link: '/frameworks/react0/',
              },
            ],
          },
          {
            text: '项目',
            items: [
              {
                text: 'React+TS',
                link: '/projects/react-ts-lege/',
              },
            ],
          },
        ],
      },
      {
        text: '🤖 人工智能',
        items: [
          {
            text: '机器学习',
            link: '/ai/ml-intro/',
          },
          {
            text: 'NLP Bert ',
            link: '/ai/nlp/bert/',
          },
        ],
      },
      {
        text: '🐧 Linux',
        items: [
          {
            text: 'CMake 入门',
            link: '/linux/cmake/',
          },
          {
            text: 'GCC 入门',
            link: '/linux/linux-gcc/',
          },
        ],
      },
      {
        text: '🔧 工具',
        items: [
          {
            text: '我的工具盒',
            link: '/misc/tool-box/a-tool-box/',
          },
          {
            text: 'Vuepress v1 实践',
            link: '/misc/tool-box/vuepress-using/',
          },
        ],
      },
      {
        text: '🔗 关于',
        link: '/about/',
        // items: [
        //   {
        //     text: 'Gitee(egu0)',
        //     link: 'https://gitee.com/egu0',
        //     target: '_self',
        //     rel: false,
        //   },
        // ],
      },
    ],
  },
  markdown: {
    extendMarkdown: md => {
      md.use(require("markdown-it-katex"))
    }
  }
}
