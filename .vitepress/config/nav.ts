import type { DefaultTheme } from 'vitepress';

export const nav: DefaultTheme.Config['nav'] = [
  // { text: '东坡之家', link: '/' , activeMatch: '/'},
  {
    text: '琐碎罢了',
    items: [
      { text: '日志', link: '/things/index', activeMatch: '/things/' },
      // { text: '随笔', link: '/about/me', activeMatch: '/about/me' }
    ],
    activeMatch: '/things/' // // 当前页面处于匹配路径下时, 对应导航菜单将突出显示
  },
  { text: '关于我的', link: '/about/about.md', activeMatch: '/about/' },
];