import Vue from 'vue'
import Router from 'vue-router'

import HomePage from '@/pages/HomePage'
import Home from '@/components/home/Home'
import Question from '@/components/home/Question'
import Topic from '@/components/home/Topic'
import Profile from '@/components/home/Profile'
import TimeLine from '@/components/profile/TimeLine'

import SigninPage from '@/pages/SigninPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage,
      children: [
        {
          path: '/',
          name: 'Home',
          component: Home,
        },
        {
          path: '/question',
          name: 'Question',
          component: Question,
        },
        {
          path: '/topic',
          name: 'Topic',
          component: Topic,
        },
        {
          path:'/profile',
          name: 'Profile',
          component: Profile,
          children: [
            {
              path: '/profile',
              name: 'TimeLine',
              component: TimeLine,
            },
          ]
        },
      ]
    },
    {
      path: '/signin',
      name: 'SigninPage',
      component: SigninPage,
    },
  ]
})

