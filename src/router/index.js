import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/Layout'
import Login from '../views/Login'
import Error from '../views/Error/404.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '',
    name: 'Layout',
    component: Layout,
    redirect: 'product',
    meta: {
      isLogined: true
    },
    children: [
      {
        path: 'product',
        name: 'Product',
        component: () => import('../views/Product/index.vue')
      },
      {
        path: 'params',
        name: 'Params',
        component: () => import('../views/Params/index.vue')
      },
      {
        path: 'advert',
        name: 'Advert',
        component: () => import('../views/Advert/index.vue')
      },
      {
        path: 'center',
        name: 'Center',
        component: () => import('../views/Center/index.vue')
      }
    ]
  }, {
    path: '/login',
    name: 'Login',
    component: Login
  }, {
    path: '*',
    name: 'Error',
    component: Error
  }
]

const router = new VueRouter({
  routes
})

export default router
