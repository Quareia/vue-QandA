import Vue from 'vue'
import Router from 'vue-router'
import Signin from '@/components/Signin'
import Contacts from '@/components/Contacts'
import Profile from '@/components/Profile'
import TimeLine from '@/components/TimeLine'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/1',
      name: 'Signin',
      component: Signin
    },
    {
      path:'/',
      name: 'Profile',
      component: Profile,
      children: [
        {
          path: '/',
          name: 'TimeLine',
          component: TimeLine,
        },
      ]
    },
    {
      path: '/contacts',
      name: 'Contacts',
      component: Contacts
    }
  ]
})
