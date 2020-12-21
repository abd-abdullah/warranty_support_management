import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter)

import dashboard from '../components/Dashboard';
import login from '../components/layouts/auth/login';
import product from '../components/settings/products/index';
import product_form from '../components/settings/products/form';
import admin_user from '../components/settings/admin_users/index';
import admin_user_form from '../components/settings/admin_users/form';
import technician from '../components/technicians/index';
import technician_form from '../components/technicians/form';
import customer from '../components/customers/index';
import customer_view from '../components/customers/view';
import customer_warranty from '../components/customers/warranty';
import customer_type from '../components/settings/customer_types/index';
import customer_type_form from '../components/settings/customer_types/form';
import zone from '../components/settings/zones/index';
import zone_form from '../components/settings/zones/form';
import sale from '../components/sales/index';
import sale_form from '../components/sales/form';
import customer_service from '../components/customer_services/index';
import update_profile from '../components/settings/Profile';
import sms_setting_form from '../components/settings/sms/form';
import sms_send_form from '../components/settings/sms/SendForm';
import advanced_search from '../components/reports/advancedSearch';
import technician_report from '../components/reports/TechnicianReport';

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
        path: "/customer-types",
        name: "customer_type",
        component: customer_type,
        meta: { authOnly: true, title: 'Customer Type' }
    },
    {
        path: "/customer-types/form/:id?",
        name: "customer_type_form",
        component: customer_type_form,
        meta: { authOnly: true, title: 'Customer Type', props: true }
    },
    {
        path: "/zones",
        name: "zone",
        component: zone,
        meta: { authOnly: true, title: 'Zone' }
    },
    {
        path: "/zones/form/:id?",
        name: "zone_form",
        component: zone_form,
        meta: { authOnly: true, title: 'Zone', props: true }
    },
    {
        path: "/customers",
        name: "customer",
        component: customer,
        meta: { authOnly: true, title: 'Customer' }
    },
    {
        path: "/customers/:id",
        name: "customer_view",
        component: customer_view,
        meta: { authOnly: true, title: 'Customer Profile', props: true }
    },
    {
        path: "/customers/warranty/:id",
        name: "customer_warranty",
        component: customer_warranty,
        meta: { authOnly: true, title: 'Customer Warranty Paper', props: true }
    },
    {
        path: "/sales",
        name: "sale",
        component: sale,
        meta: { authOnly: true, title: 'Purchase' }
    },
    {
        path: "/sales/form/:id?",
        name: "sale_form",
        component: sale_form,
        meta: { authOnly: true, title: 'Purchase', props: true }
    },
    {
        path: "/service-histories",
        name: "customer_service",
        component: customer_service,
        meta: { authOnly: true, title: 'Service History', props: true }
    },
   
    {
        path: "/update-profile",
        name: "update_profile",
        component: update_profile,
        meta: { authOnly: true, title: 'Update Profile', props: true }
    },
    {
        path: "/sms-settings/form/:id?",
        name: "sms_setting_form",
        component: sms_setting_form,
        meta: { authOnly: true, title: 'Sms Setting', props: true }
    },
    {
        path: "/send-sms",
        name: "sms_send_form",
        component: sms_send_form,
        meta: { authOnly: true, title: 'Sms Send', props: true }
    },
    {
        path: "/advanced-search",
        name: "advanced_search",
        component: advanced_search,
        meta: { authOnly: true, title: 'Advanced Search', props: true }
    },
    {
        path: "/technician-report",
        name: "technician_report",
        component: technician_report,
        meta: { authOnly: true, title: 'Technician Reports', props: true }
    },
    {
        path: "/advanced-search",
        name: "advanced_search",
        component: advanced_search,
        meta: { authOnly: true, title: 'Advanced Search', props: true }
    },
];

const router = new VueRouter({
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