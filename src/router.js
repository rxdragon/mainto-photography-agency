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

export const routes = [{
  path: '/',
  component: deafault,
  meta: {
    showButton: false
  }
},
{
  path: '/work',
  name: 'work',
  component: work,
  meta: {
    showButton: false
  }
},
{
  path: '/workRecord',
  name: 'workRecord',
  component: workRecord,
  meta: {
    showButton: false
  }
},
{
  path: '/recordDetail/:id',
  name: 'recordDetail',
  component: recordDetail,
  meta: {
    showButton: true
  }
},
{
  path: '/product',
  name: 'product',
  component: product,
  meta: {
    showButton: false
  }
},
{
  path: '/productDetail/:id',
  name: 'productDetail',
  component: productDetail,
  meta: {
    showButton: true
  }
},
{
  path: '/addProduct',
  name: 'addProduct',
  component: addProduct,
  meta: {
    showButton: true
  }
},
{
  path: '/manage',
  name: 'manage',
  component: manage,
  meta: {
    showButton: false
  }
},
{
  path: '/manageAccount',
  name: 'manageAccount',
  component: manageAccount,
  meta: {
    showButton: true
  }
},
{
  path: '/customs',
  name: 'customs',
  component: custom,
  meta: {
    showButton: false
  }
},
{
  path: '/customDetail/:id',
  name: 'customDetail',
  component: customDetail,
  meta: {
    showButton: true
  }
},
{
  path: '*',
  component: deafault
}
]

export default new Router({ routes })
