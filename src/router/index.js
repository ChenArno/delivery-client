import Vue from 'vue'
import Router from 'vue-router'

import index from 'views/index.vue'
import indexMain from 'views/index/index.vue'
import user from 'views/user/index.vue'
import order from 'views/order/index.vue'
import hello from 'views/hello.vue'
import homePage from 'views/homePage/index'
import homePageMain from 'views/homePage/index'
import sysMumu from "views/sysMumu/index"
import sysMumuShop from "views/sysMumu/shop"

Vue.use(Router)

let routes = [{
    path: "/",
    name: "index",
    component: hello,
    redirect: '/homePage',
  },
  {
    path: "/homePage",
    name: "homePage",
    component: index,
    redirect: '/homePage/main',
    children: [{
      path: 'main',
      name: 'homePageMain',
      component: homePageMain
    }]
  },
  {
    path: "/sysMumu",
    name: "sysMumu",
    component: index,
    redirect: '/sysMumu/index',
    children: [{
        path: 'index',
        name: 'sysMumu.index',
        component: sysMumu
      },
      {
        path: 'shop',
        name: 'sysMumu.shop',
        component: sysMumuShop
      }
    ]
  }, {
    path: "/sysLincon",
    name: "sysLincon",
    component: index,
    redirect: '/sysLincon/index',
    children: [{
        path: 'index',
        name: 'sysLincon.index',
        component: sysMumu
      },
      {
        path: 'shop',
        name: 'sysLincon.shop',
        component: sysMumuShop
      }
    ]
  }, {
    path: '/my',
    name: 'my',
    redirect: '/my/order',
    component: index,
    children: [{
      path: 'main',
      name: 'main',
      component: indexMain
    }, {
      path: 'order',
      name: 'order',
      component: order
    }, {
      path: 'user',
      name: 'user',
      component: user
    }]
  }
]

export default new Router({
  mode: 'history',
  routes
})
