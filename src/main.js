import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.use(VueAxios, axios)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

/*
router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  if(to.path === '/all/gender/female'){
    next('/all/gender/female/major/古代言情/minor/穿越时空/status/hot')
  }else{
    next()
  }
  if(to.path === '/all/gender/male'){
    next('/all/gender/male/major/仙侠/status/hot')
  }
}
)
*/

router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
})
