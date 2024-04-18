import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
/* 引入vuex */
import store from './store'
import Fragment from 'vue-fragment'
/* 引入全局样式 */
import '../src/assets/css/global.css'

Vue.use(Fragment.Plugin);
Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
