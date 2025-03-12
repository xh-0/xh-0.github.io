import DefaultTheme from 'vitepress/theme'
import './style/custom.css';
import './style/vars.css';
import MyLayout from './MyLayout.vue';

export default {
  ...DefaultTheme,
  Layout: MyLayout,
  
}