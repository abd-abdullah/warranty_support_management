import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import dashboard from '../components/Dashboard'
import productCreate from '../components/products/create'

const routes = [
    { 
        path: '/',
        name : 'dashboard', 
        component: dashboard 
    },
    { 
        path: '/products/create',
        name : 'Product Create', 
        component: productCreate 
    },
]

const router = new VueRouter({
    routes, // short for `routes: routes`
})


export default router