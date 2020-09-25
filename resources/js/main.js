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
} catch (e) { }
