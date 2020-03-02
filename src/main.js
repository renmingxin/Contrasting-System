import '@/assets/icons/iconfont.css'

import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import 'view-design/dist/styles/iview.css'
import ViewUI from 'view-design'

import i18n from '@/locale'
import config from '@/config'

import './index.less'

// 实际打包时应该不引入mock 开发环境需要
/* eslint-disable */
// if (process.env.NODE_ENV !== 'production') require('@/mock')

Vue.use(ViewUI,{
  i18n: (key, value) => i18n.t(key, value)
});

/**
 * @description 生产环境关掉提示
 */
Vue.config.productionTip = false
/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  render: h => h(App)
})
