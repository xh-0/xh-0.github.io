import type { DefaultTheme } from 'vitepress';

export const nav: DefaultTheme.Config['nav'] = [
  { text: '东坡之家', link: '/' , activeMatch: '/'},
  { text: '首页', link: '/home', activeMatch: '/home' }
  // {
  //   text: '关于',
  //   items: [
  //     { text: '关于你', link: '/about/index', activeMatch: '/about/index' },
  //     { text: '关于我', link: '/about/me', activeMatch: '/about/me' }
  //   ],
  //   activeMatch: '/about/' // // 当前页面处于匹配路径下时, 对应导航菜单将突出显示
  // },
];