import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import home from './modules/home'
// 按需加载
const Login = (resolve) => {
  import('@/components/login/login').then((module) => {
    resolve(module)
  })
}
const NoFind = (resolve) => {
  import('@/components/NoFind').then((module) => {
    resolve(module)
  })
}
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // }
    {
      path: '/',
      redirect: '/home'
    },
    ...home,
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        title: '登 录'
      }
    },
    {
      path: '/404',
      name: 'NoFind',
      component: NoFind
    },
    {
      path: '*',
      name: 'other',
      redirect: '/404'
    }
  ]
})
// 路由拦截
router.beforeEach((to, from, next) => {
  // if (!localStorage.getItem('user').accessToken && to.path !== '/login') {
  //   next({
  //     path: '/login'
  //   })
  // } else {
  //   next()
  // }
  let title = to.meta.title
  document.title = title
  next()
})
export default router
