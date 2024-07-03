import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'TobiasUI',
  description: 'A VitePress Site',
  // eslint-disable-next-line node/prefer-global/process
  base: process.env.NODE_ENV === 'production' ? '/tobias-ui/' : '/',
  rewrites: {
    'docs/(.*)': '(.*)', // value的开头注意不要加/
    'packages/tobias-ui/src/:comp/(.*)': 'components/:comp/(.*)', // value的开头注意不要加/
    'packages/utils/src/(.*)': 'utils/(.*)',
    'packages/icons/docs/(.*)': 'components/icons/(.*)',
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
        { text: 'Tooltip信息提示', link: '/components/tooltip/' },
        { text: 'Table', link: '/components/table/' },
        { text: '虚拟滚动列表', link: '/components/virtual-list/' },
        { text: '通知弹出框', link: '/components/notification/' },
        { text: '图标', link: '/components/icons/' },
      ],
      '/utils/': [
        { text: 'genClassname', link: '/utils/gen-classname' },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],
  },
})
