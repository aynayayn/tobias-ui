import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'TobiasUI',
  description: 'A VitePress Site',
  rewrites: {
    'docs/(.*)': '(.*)', // value的开头注意不要加/
    'packages/tobias-ui/src/:comp/(.*)': 'components/:comp/(.*)', // value的开头注意不要加/
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '组件', link: '/components/' },
      { text: '工具', link: '/utils/' },
    ],
    sidebar: {
      '/components/': [
        { text: '按钮', link: '/components/button/' },
        { text: '输入框', link: '/components/input/' },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],
  },
})
