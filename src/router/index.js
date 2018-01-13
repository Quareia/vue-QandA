import Vue from 'vue'
import Router from 'vue-router'

import HomePage from '@/pages/HomePage'
import Home from '@/components/home/Home'
import Question from '@/components/home/Question'
import QuestionDetail from '@/components/question/QuestionDetail'
import Topic from '@/components/home/Topic'
import Profile from '@/components/home/Profile'
import MyAnswer from '@/components/profile/MyAnswer'
import QuestionFollow from '@/components/profile/QuestionFollow'
import TopicFollow from '@/components/profile/TopicFollow'
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
              name: 'MyAnswer',
              component: MyAnswer,
            },
            {
              path: '/profile/my_answers',
              name: 'My',
              component: QuestionFollow,
            },
            {
              path: '/profile/follow_question',
              name: 'QuestionFollow',
              component: QuestionFollow,
            },
            {
              path: '/profile/follow_topic',
              name: 'TopicFollow',
              component: TopicFollow,
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
    {
      path: "*",
      redirect: "/"
    }
  ]
})

