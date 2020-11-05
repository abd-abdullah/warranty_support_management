import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter)

const dashboard = () => import('../components/Dashboard');
const login = () => import('../components/layouts/auth/login');
const product = () => import('../components/settings/products/index');
const product_form = () => import('../components/settings/products/form');
const admin_user = () => import('../components/settings/admin_users/index');
const admin_user_form = () => import('../components/settings/admin_users/form');
const technician = () => import('../components/technicians/index');
const technician_form = () => import('../components/technicians/form');
const customer = () => import('../components/customers/index');
const customer_form = () => import('../components/customers/form');
const customer_view = () => import('../components/customers/view');
const customer_type = () => import('../components/settings/customer_types/index');
const customer_type_form = () => import('../components/settings/customer_types/form');
const zone = () => import('../components/settings/zones/index');
const zone_form = () => import('../components/settings/zones/form');
const sale = () => import('../components/sales/index');
const sale_form = () => import('../components/sales/form');
const customer_service = () => import('../components/customer_services/index');
const update_profile = () => import('../components/settings/Profile');
const sms_setting_form = () => import('../components/settings/sms/form');
const sms_send_form = () => import('../components/settings/sms/SendForm');

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
        path: "/customers/form/:id?",
        name: "customer_form",
        component: customer_form,
        meta: { authOnly: true, title: 'Customer', props: true }
    },
    {
        path: "/customers/:id",
        name: "customer_view",
        component: customer_view,
        meta: { authOnly: true, title: 'Customer Profile', props: true }
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