window._ = require('lodash');


try {
    require('../assets/css/material-dashboard.min.css');
    require('../assets/css/custom.css');
    
    window.$ = window.jQuery = require('jquery');
    window.Popper = require('popper.js').default;
    require('../assets/js/core/bootstrap-material-design.min.js');
    require('../assets/js/plugins/perfect-scrollbar.jquery.min.js');
    require('../assets/js/material-dashboard.js');
    require('../assets/js/custom.js');
} catch (e) {}

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.withCredentials = true;
window.axios.defaults.baseURL = process.env.MIX_APP_URL;