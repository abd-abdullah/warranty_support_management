require('./main');

import Vue from 'vue';
import VueProgressBar from 'vue-progressbar';
import Swal from 'vue-sweetalert2';
import Toaster from 'v-toaster';
// Import stylesheet
import 'v-toaster/dist/v-toaster.css'
import Loading from 'vue-loading-overlay';
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';
import Select2 from 'v-select2-component';
import VCalendar from 'v-calendar';


const SwalOptions = {
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
};

const VueProgressBaroptions = {
    color: '#047831',
    failedColor: '#874b4b',
    thickness: '5px',
    transition: {
        speed: '0.2s',
        opacity: '0.6s',
        termination: 300
    },
    autoRevert: true,
    location: 'top',
    inverse: false
}

Vue.use(Loading);
Vue.use(Swal, SwalOptions);
Vue.use(Toaster, {timeout: 2000})
Vue.use(VueProgressBar, VueProgressBaroptions)
Vue.component('Select2', Select2);
Vue.use(VCalendar);

import appLogin from './components/layouts/auth/app';
import appMain from './components/layouts/main/app';
import Layout from './components/layouts/main';
import router from './router/router.js'
import pagination from './components/partial/pagination';
import search from './components/partial/search';
import jsHelper from "./apis/Helper";
import User from "./apis/User";

Vue.use({
    install() {
        Vue.jsHelper = jsHelper;
        Vue.prototype.$jsHelper = jsHelper;
        Vue.user = User;
        Vue.prototype.$user = User;
    }
});

Vue.component("loginlayout", appLogin);
Vue.component("defaultlayout", appMain);
Vue.component("pagination", pagination);
Vue.component("search", search);

new Vue({
    el: '#app',
    router,
    render: h => h(Layout)
});
