import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld'

Vue.use(Router)

// 新闻详情页
const chat = (resolve) => {
  import('../components/chat/Chat').then((module) => {
    resolve(module)
  })
}

export default new Router({
  routes: [
    {
      path: '/',
      component: HelloWorld
    },
    {
      name: 'chat',
      path: '/chat',
      component: chat,
      props: true
    }
  ],
  // 跳转页面回顶部
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})