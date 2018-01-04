// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import VueCookie from 'vue-cookie'
import App from './App'
import router from './router'
import Element from 'element-ui'
//import 'animate'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Element)
Vue.use(Vuex)
Vue.use(VueCookie)

const store = new Vuex.Store({
  state: {
    islogin: false,
    nowuser: {
      id: 0,
      name:'',
    }
  },
  mutations: {
    login (state, user) {
      state.islogin = true
      state.nowuser = user
    },
    logout (state) {
      state.islogin = false
      state.nowuser = {}
    },
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
