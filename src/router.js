import Vue from 'vue'
import Router from 'vue-router'

const deafault = () => import('./views/default.vue')
const work = () => import('./views/work/index.vue')
const workRecord = () => import('./views/work/record.vue')
const recordDetail = () => import('./views/work/recordDetail.vue')
const product = () => import('./views/product/index.vue')
const productDetail = () => import('./views/product/productDetail.vue')
const addProduct = () => import('./views/product/addProduct.vue')
const manage = () => import('./views/manage/index.vue')
const manageAccount = () => import('./views/manage/account.vue')
const custom = () => import('./views/custom/index.vue')
const customDetail = () => import('./views/custom/detail.vue')

Vue.use(Router)

export const routes = [
  {
    path: '/',
    component: deafault
  },
  {
    path: '/work',
    name: 'work',
    component: work
  },
  {
    path: '/workRecord',
    name: 'workRecord',
    component: workRecord
  },
  {
    path: '/recordDetail/:id',
    name: 'recordDetail',
    component: recordDetail
  },
  {
    path: '/product',
    name: 'product',
    component: product
  },
  {
    path: '/productDetail/:id',
    name: 'productDetail',
    component: productDetail
  },
  {
    path: '/addProduct',
    name: 'addProduct',
    component: addProduct
  },
  {
    path: '/manage',
    name: 'manage',
    component: manage
  },
  {
    path: '/manageAccount',
    name: 'manageAccount',
    component: manageAccount
  },
  {
    path: '/customs',
    name: 'customs',
    component: custom
  },
  {
    path: '/customDetail/:id',
    name: 'customDetail',
    component: customDetail
  }
]

export default new Router({ routes })
