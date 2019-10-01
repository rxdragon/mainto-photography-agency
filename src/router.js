import Vue from 'vue'
import Router from 'vue-router'

const deafault = () => import('./views/default.vue')
const work = () => import('./views/work/index.vue')
const workRecord = () => import('./views/work/record.vue')
const product = () => import('./views/product/index.vue')
const manage = () => import('./views/manage/index.vue')
const custom = () => import('./views/custom/index.vue')

Vue.use(Router)

export const routes = [
  {
    path: '/',
    component: deafault
  },
  {
    path: '/work',
    component: work
  },
  {
    path: '/workRecord',
    component: workRecord
  },
  {
    path: '/product',
    component: product
  },
  {
    path: '/manage',
    component: manage
  },
  {
    path: '/custom',
    component: custom
  }
]

export default new Router({ routes })
