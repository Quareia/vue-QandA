// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import VueCookie from 'vue-cookie'
import App from './App'
import router from './router'
import Element from 'element-ui'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
//import 'animate'
import 'element-ui/lib/theme-chalk/index.css'
import '../static/iconfont/iconfont.css'

Vue.use(Element)
Vue.use(Vuex)
Vue.use(VueCookie)
Vue.use(mavonEditor)

const store = new Vuex.Store({
  state: {
    reload: false,
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
    first (state) {
      state.reload = true
    }
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
