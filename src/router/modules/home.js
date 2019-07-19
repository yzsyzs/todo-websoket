// 首页的 vue 组件
const Home = (resolve) => {
  import('@/components/home/home').then((module) => {
    resolve(module)
  })
}
const Todo = (resolve) => {
  import('@/components/home/todo/todo').then((module) => {
    resolve(module)
  })
}
const Websoket = (resolve) => {
  import('@/components/home/websoket/websoket').then((module) => {
    resolve(module)
  })
}

export default [
  {
    path: '/home',
    // name: 'home',
    component: Home,
    children: [
      {
        path: '/',
        name: 'todo',
        component: Todo,
        meta: {
          title: '首 页'
        }
      },
      {
        path: 'websoket',
        name: 'websoket',
        component: Websoket,
        meta: {
          title: 'Websoket'
        }
      }
    ]
  }
]
