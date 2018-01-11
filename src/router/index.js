import Vue from 'vue'
import Router from 'vue-router'

import HomePage from '@/pages/HomePage'
import Home from '@/components/home/Home'
import Question from '@/components/home/Question'
import QuestionDetail from '@/components/question/QuestionDetail'
import Topic from '@/components/home/Topic'
import Profile from '@/components/home/Profile'
import TimeLine from '@/components/profile/TimeLine'
import QuestionFollow from '@/components/profile/QuestionFollow'

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
          path: '/questions',
          name: 'Question',
          component: Question,
        },
        {
          path: '/question',
          name: 'QuestionDetail',
          component: QuestionDetail,
        },
        {
          path: '/topics',
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
            {
              path: '/profile/follow_question',
              name: 'QuestionFollow',
              component: QuestionFollow,
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

