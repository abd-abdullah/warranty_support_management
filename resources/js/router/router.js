import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter)

import dashboard from '../components/Dashboard';
import login from '../components/layouts/auth/login';
import product from '../components/products/index';
import product_form from '../components/products/form';
import admin_user from '../components/admin_users/index';
import admin_user_form from '../components/admin_users/form';
import technician from '../components/technicians/index';
import technician_form from '../components/technicians/form';
import customer from '../components/customers/index';
import customer_form from '../components/customers/form';

const routes = [
    {
        path: "/",
        name: "login",
        component: login,
        meta: { guestOnly: true, layout: "loginlayout" }
    },
    {
        path: "/login",
        name: "login",
        component: login,
        meta: { guestOnly: true, layout: "loginlayout" }
    },
    {
        path: "/dashboard",
        name: "dashboard",
        component: dashboard,
        meta: { authOnly: true, title: 'Dashboard' }
    },
    {
        path: "/products",
        name: "product",
        component: product,
        meta: { authOnly: true, title: 'Product' }
    },
    {
        path: "/products/form/:id?",
        name: "product_form",
        component: product_form,
        meta: { authOnly: true, title: 'Product', props: true }
    },
    {
        path: "/admin-users",
        name: "admin_user",
        component: admin_user,
        meta: { authOnly: true, title: 'Admin User' }
    },
    {
        path: "/admin-users/form/:id?",
        name: "admin_user_form",
        component: admin_user_form,
        meta: { authOnly: true, title: 'Admin User', props: true }
    },
    {
        path: "/technicians",
        name: "technician",
        component: technician,
        meta: { authOnly: true, title: 'Technician' }
    },
    {
        path: "/technicians/form/:id?",
        name: "technician_form",
        component: technician_form,
        meta: { authOnly: true, title: 'Technician', props: true }
    },
    {
        path: "/customers",
        name: "customer",
        component: customer,
        meta: { authOnly: true, title: 'Customer' }
    },
    {
        path: "/customers/form/:id?",
        name: "customer_form",
        component: customer_form,
        meta: { authOnly: true, title: 'Customer', props: true }
    },
];

const router = new VueRouter({
    base: process.env.MIX_APP_URL,
    routes, // short for `routes: routes`
})

function isLoggedIn() {
    return localStorage.getItem("auth");
}

router.beforeEach((to, from, next) => {
    // This goes through the matched routes from last to first, finding the closest route with a title.
    // eg. if we have /some/deep/nested/route and /some, /deep, and /nested have titles, nested's will be chosen.
    const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);

    // If a route with a title was found, set the document (page) title to that value.
    if (nearestWithTitle) document.title = nearestWithTitle.meta.title;

    if (to.matched.some(record => record.meta.authOnly)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (!isLoggedIn()) {
            next({
                path: "/login",
                query: { redirect: to.fullPath }
            });
        } else {
            next();
        }
    } else if (to.matched.some(record => record.meta.guestOnly)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (isLoggedIn()) {
            next({
                path: "/dashboard",
                query: { redirect: to.fullPath }
            });
        } else {
            next();
        }
    } else {
        next(); // make sure to always call next()!
    }
});

export default router