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
const WebsoketA = (resolve) => {
  import('@/components/home/websoket/websoketA').then((module) => {
    resolve(module)
  })
}
const WebsoketB = (resolve) => {
  import('@/components/home/websoket/websoketB').then((module) => {
    resolve(module)
  })
}

export default [
  {
    path: '/home',
    // name: 'home',
    component: Home,
    children: [
      {path: '', redirect: '/home/todo'},
      {
        path: 'todo',
        name: 'todo',
        component: Todo,
        meta: {
          title: '首 页'
        },
        children: [
          {
            path: '/',
            name: 'websoketA',
            component: WebsoketA,
            meta: {
              title: 'WebsoketA'
            }
          },
          {
            path: 'websoket-B',
            name: 'websoketB',
            component: WebsoketB,
            meta: {
              title: 'WebsoketB'
            }
          }
        ]
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
