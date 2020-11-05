(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Dashboard.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Dashboard.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _partial_SaleAndServiceBarChart__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./partial/SaleAndServiceBarChart */ "./resources/js/components/partial/SaleAndServiceBarChart.js");
/* harmony import */ var _partial_ServiceLineChart__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./partial/ServiceLineChart */ "./resources/js/components/partial/ServiceLineChart.js");
/* harmony import */ var _partial_DashboardCustomerService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./partial/DashboardCustomerService */ "./resources/js/components/partial/DashboardCustomerService.vue");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    ServiceBarChart: _partial_SaleAndServiceBarChart__WEBPACK_IMPORTED_MODULE_1__["default"],
    ServiceLineChart: _partial_ServiceLineChart__WEBPACK_IMPORTED_MODULE_2__["default"],
    DashboardCustomerService: _partial_DashboardCustomerService__WEBPACK_IMPORTED_MODULE_3__["default"]
  },
  name: "Dashboard",
  data: function data() {
    return {
      name: "",
      section_title: "Dashboard",
      dashboardData: {
        product: 0,
        customer: 0,
        purchase: 0,
        service: 0,
        product_monthly: 0,
        customer_monthly: 0,
        purchase_monthly: 0,
        service_monthly: 0,
        month: ''
      },
      chart: {
        Bar: null,
        Line: null
      },
      loaded: false,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        fill: false
      }
    };
  },
  mounted: function mounted() {
    var _this = this;

    return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this.loaded = false;

              _this.$Progress.start();

              _context.next = 4;
              return _this.$jsHelper.get("api/v1/dashboard").then(function (response) {
                _this.dashboardData = response.data;

                _this.fillChartData(response.data);

                _this.$Progress.finish();
              })["catch"](function (error) {
                _this.$Progress.fail();

                _this.$toaster.error("Something went wrong");
              });

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  computed: {
    barchartStyles: function barchartStyles() {
      return {
        height: '250px',
        position: 'relative'
      };
    }
  },
  methods: {
    fillChartData: function fillChartData(data) {
      this.chart.Bar = {
        labels: data.bar_labels,
        datasets: [{
          label: "Sale",
          backgroundColor: "blue",
          data: data.bar_sale_data
        }, {
          label: "Service",
          backgroundColor: "red",
          data: data.bar_service_data
        }]
      };
      this.chart.Line = {
        labels: data.line_labels,
        datasets: [{
          label: "Sale",
          data: data.line_sale_data,
          borderColor: 'blue'
        }, {
          label: "Service",
          data: data.line_service_data,
          borderColor: 'red'
        }]
      };
      this.loaded = true;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/partial/DashboardCustomerService.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/partial/DashboardCustomerService.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      param: {
        query: "",
        sort: {
          column: "",
          sort_order: ""
        }
      },
      sales: [],
      pagination: {
        current_page: 1,
        per_page: 10
      },
      filter: {
        from_date: new Date(),
        to_date: this.toDate()
      },
      form: {
        customer: null,
        product: null,
        sale_id: null,
        customer_id: null,
        service_time: null,
        service_for: null,
        next_service_time: null,
        remarks: null,
        service_charge: null,
        total_paid: null,
        cost: null,
        done_by: null,
        is_continue: true
      },
      errors: [],
      optionsServiceMen: []
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.getData();
    this.$Progress.start();
    this.$jsHelper.get('api/v1/technicians-all').then(function (response) {
      _this.optionsServiceMen = response.data.data.map(function (val) {
        return {
          id: val.id,
          text: val.name + ' (' + val.phone + ')'
        };
      });

      _this.$Progress.finish();
    })["catch"](function (error) {
      _this.$Progress.fail();
    });
  },
  methods: {
    toDate: function toDate() {
      var date = new Date();
      return new Date(date.setDate(date.getDate() + 7));
    },
    getData: function getData() {
      var _this2 = this;

      var fromDate = this.filter.from_date != null ? this.filter.from_date.toISOString().split('T')[0] : null;
      var toDate = this.filter.to_date != null ? this.filter.to_date.toISOString().split('T')[0] : null;
      this.$Progress.start();
      this.$jsHelper.get("api/v1/sales-dashboard?page=" + this.pagination.current_page + "&per_page=" + this.pagination.per_page + "&query=" + this.param.query + "&sort_by=" + this.param.sort.column + "&sort_order=" + this.param.sort.sort_order + "&from_date=" + fromDate + "&to_date=" + toDate).then(function (response) {
        _this2.$Progress.finish();

        _this2.sales = response.data.data;
        _this2.pagination = response.data.meta;
      })["catch"](function (e) {
        _this2.$Progress.fail();

        _this2.$toaster.error("Something went wrong");
      });
    },
    sort: function sort(event) {
      this.param.sort.column = event.currentTarget.dataset.column;

      if (event.currentTarget.classList.contains("asc")) {
        this.param.sort.sort_order = "DESC";
        this.getData();
      } else {
        this.param.sort.sort_order = "ASC";
        this.getData();
      }
    },
    service: function service(sale) {
      this.errors = [];
      this.form.customer = sale.name + '-' + sale.customerId;
      this.form.product = sale.product_name + '-' + sale.product_code;
      this.form.sale_id = sale.id;
      this.form.customer_id = sale.customer_id;
      this.form.service_time = null;
      this.form.service_for = null;
      this.form.next_service_time = null;
      this.form.remarks = null;
      this.form.service_charge = null;
      this.form.total_paid = null;
      this.form.cost = null;
      this.form.done_by = null;
      this.form.is_continue = true;
      $("#exampleModal").modal("show");
    },
    serviceChange: function serviceChange(sale) {
      this.errors = [];
      this.form.customer = sale.name + '-' + sale.customerId;
      this.form.product = sale.product_name + '-' + sale.product_code;
      this.form.sale_id = sale.id;
      this.form.customer_id = sale.customer_id;
      this.form.next_service_time = null;
      this.form.remarks = null;
      this.form.is_continue = true;
      $("#timeChangeModal").modal("show");
    },
    add: function add(e) {
      var _this3 = this;

      this.$buttonLoader(e);
      this.$Progress.start();
      this.$jsHelper.post("api/v1/customer-services", this.form).then(function (data) {
        _this3.$Progress.finish();

        _this3.$toaster.success("Successfully Added");

        _this3.getData();

        $("#exampleModal").modal("hide");
      })["catch"](function (error) {
        _this3.$Progress.fail();

        _this3.$buttonLoader(e);

        if (error.response.status === 422) {
          _this3.errors = error.response.data.errors;
        } else {
          _this3.$toaster.error("Something went wrong");
        }
      });
    },
    changeAdd: function changeAdd(e) {
      var _this4 = this;

      this.$buttonLoader(e);
      this.$Progress.start();
      this.$jsHelper.post("api/v1/customer-services/change", this.form).then(function (data) {
        _this4.$Progress.finish();

        _this4.$toaster.success("Successfully Changed");

        _this4.getData();

        $("#timeChangeModal").modal("hide");
      })["catch"](function (error) {
        _this4.$Progress.fail();

        _this4.$buttonLoader(e);

        if (error.response.status === 422) {
          _this4.errors = error.response.data.errors;
        } else {
          _this4.$toaster.error("Something went wrong");
        }
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/moment/locale sync recursive ^\\.\\/.*$":
/*!**************************************************!*\
  !*** ./node_modules/moment/locale sync ^\.\/.*$ ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": "./node_modules/moment/locale/af.js",
	"./af.js": "./node_modules/moment/locale/af.js",
	"./ar": "./node_modules/moment/locale/ar.js",
	"./ar-dz": "./node_modules/moment/locale/ar-dz.js",
	"./ar-dz.js": "./node_modules/moment/locale/ar-dz.js",
	"./ar-kw": "./node_modules/moment/locale/ar-kw.js",
	"./ar-kw.js": "./node_modules/moment/locale/ar-kw.js",
	"./ar-ly": "./node_modules/moment/locale/ar-ly.js",
	"./ar-ly.js": "./node_modules/moment/locale/ar-ly.js",
	"./ar-ma": "./node_modules/moment/locale/ar-ma.js",
	"./ar-ma.js": "./node_modules/moment/locale/ar-ma.js",
	"./ar-sa": "./node_modules/moment/locale/ar-sa.js",
	"./ar-sa.js": "./node_modules/moment/locale/ar-sa.js",
	"./ar-tn": "./node_modules/moment/locale/ar-tn.js",
	"./ar-tn.js": "./node_modules/moment/locale/ar-tn.js",
	"./ar.js": "./node_modules/moment/locale/ar.js",
	"./az": "./node_modules/moment/locale/az.js",
	"./az.js": "./node_modules/moment/locale/az.js",
	"./be": "./node_modules/moment/locale/be.js",
	"./be.js": "./node_modules/moment/locale/be.js",
	"./bg": "./node_modules/moment/locale/bg.js",
	"./bg.js": "./node_modules/moment/locale/bg.js",
	"./bm": "./node_modules/moment/locale/bm.js",
	"./bm.js": "./node_modules/moment/locale/bm.js",
	"./bn": "./node_modules/moment/locale/bn.js",
	"./bn-bd": "./node_modules/moment/locale/bn-bd.js",
	"./bn-bd.js": "./node_modules/moment/locale/bn-bd.js",
	"./bn.js": "./node_modules/moment/locale/bn.js",
	"./bo": "./node_modules/moment/locale/bo.js",
	"./bo.js": "./node_modules/moment/locale/bo.js",
	"./br": "./node_modules/moment/locale/br.js",
	"./br.js": "./node_modules/moment/locale/br.js",
	"./bs": "./node_modules/moment/locale/bs.js",
	"./bs.js": "./node_modules/moment/locale/bs.js",
	"./ca": "./node_modules/moment/locale/ca.js",
	"./ca.js": "./node_modules/moment/locale/ca.js",
	"./cs": "./node_modules/moment/locale/cs.js",
	"./cs.js": "./node_modules/moment/locale/cs.js",
	"./cv": "./node_modules/moment/locale/cv.js",
	"./cv.js": "./node_modules/moment/locale/cv.js",
	"./cy": "./node_modules/moment/locale/cy.js",
	"./cy.js": "./node_modules/moment/locale/cy.js",
	"./da": "./node_modules/moment/locale/da.js",
	"./da.js": "./node_modules/moment/locale/da.js",
	"./de": "./node_modules/moment/locale/de.js",
	"./de-at": "./node_modules/moment/locale/de-at.js",
	"./de-at.js": "./node_modules/moment/locale/de-at.js",
	"./de-ch": "./node_modules/moment/locale/de-ch.js",
	"./de-ch.js": "./node_modules/moment/locale/de-ch.js",
	"./de.js": "./node_modules/moment/locale/de.js",
	"./dv": "./node_modules/moment/locale/dv.js",
	"./dv.js": "./node_modules/moment/locale/dv.js",
	"./el": "./node_modules/moment/locale/el.js",
	"./el.js": "./node_modules/moment/locale/el.js",
	"./en-au": "./node_modules/moment/locale/en-au.js",
	"./en-au.js": "./node_modules/moment/locale/en-au.js",
	"./en-ca": "./node_modules/moment/locale/en-ca.js",
	"./en-ca.js": "./node_modules/moment/locale/en-ca.js",
	"./en-gb": "./node_modules/moment/locale/en-gb.js",
	"./en-gb.js": "./node_modules/moment/locale/en-gb.js",
	"./en-ie": "./node_modules/moment/locale/en-ie.js",
	"./en-ie.js": "./node_modules/moment/locale/en-ie.js",
	"./en-il": "./node_modules/moment/locale/en-il.js",
	"./en-il.js": "./node_modules/moment/locale/en-il.js",
	"./en-in": "./node_modules/moment/locale/en-in.js",
	"./en-in.js": "./node_modules/moment/locale/en-in.js",
	"./en-nz": "./node_modules/moment/locale/en-nz.js",
	"./en-nz.js": "./node_modules/moment/locale/en-nz.js",
	"./en-sg": "./node_modules/moment/locale/en-sg.js",
	"./en-sg.js": "./node_modules/moment/locale/en-sg.js",
	"./eo": "./node_modules/moment/locale/eo.js",
	"./eo.js": "./node_modules/moment/locale/eo.js",
	"./es": "./node_modules/moment/locale/es.js",
	"./es-do": "./node_modules/moment/locale/es-do.js",
	"./es-do.js": "./node_modules/moment/locale/es-do.js",
	"./es-mx": "./node_modules/moment/locale/es-mx.js",
	"./es-mx.js": "./node_modules/moment/locale/es-mx.js",
	"./es-us": "./node_modules/moment/locale/es-us.js",
	"./es-us.js": "./node_modules/moment/locale/es-us.js",
	"./es.js": "./node_modules/moment/locale/es.js",
	"./et": "./node_modules/moment/locale/et.js",
	"./et.js": "./node_modules/moment/locale/et.js",
	"./eu": "./node_modules/moment/locale/eu.js",
	"./eu.js": "./node_modules/moment/locale/eu.js",
	"./fa": "./node_modules/moment/locale/fa.js",
	"./fa.js": "./node_modules/moment/locale/fa.js",
	"./fi": "./node_modules/moment/locale/fi.js",
	"./fi.js": "./node_modules/moment/locale/fi.js",
	"./fil": "./node_modules/moment/locale/fil.js",
	"./fil.js": "./node_modules/moment/locale/fil.js",
	"./fo": "./node_modules/moment/locale/fo.js",
	"./fo.js": "./node_modules/moment/locale/fo.js",
	"./fr": "./node_modules/moment/locale/fr.js",
	"./fr-ca": "./node_modules/moment/locale/fr-ca.js",
	"./fr-ca.js": "./node_modules/moment/locale/fr-ca.js",
	"./fr-ch": "./node_modules/moment/locale/fr-ch.js",
	"./fr-ch.js": "./node_modules/moment/locale/fr-ch.js",
	"./fr.js": "./node_modules/moment/locale/fr.js",
	"./fy": "./node_modules/moment/locale/fy.js",
	"./fy.js": "./node_modules/moment/locale/fy.js",
	"./ga": "./node_modules/moment/locale/ga.js",
	"./ga.js": "./node_modules/moment/locale/ga.js",
	"./gd": "./node_modules/moment/locale/gd.js",
	"./gd.js": "./node_modules/moment/locale/gd.js",
	"./gl": "./node_modules/moment/locale/gl.js",
	"./gl.js": "./node_modules/moment/locale/gl.js",
	"./gom-deva": "./node_modules/moment/locale/gom-deva.js",
	"./gom-deva.js": "./node_modules/moment/locale/gom-deva.js",
	"./gom-latn": "./node_modules/moment/locale/gom-latn.js",
	"./gom-latn.js": "./node_modules/moment/locale/gom-latn.js",
	"./gu": "./node_modules/moment/locale/gu.js",
	"./gu.js": "./node_modules/moment/locale/gu.js",
	"./he": "./node_modules/moment/locale/he.js",
	"./he.js": "./node_modules/moment/locale/he.js",
	"./hi": "./node_modules/moment/locale/hi.js",
	"./hi.js": "./node_modules/moment/locale/hi.js",
	"./hr": "./node_modules/moment/locale/hr.js",
	"./hr.js": "./node_modules/moment/locale/hr.js",
	"./hu": "./node_modules/moment/locale/hu.js",
	"./hu.js": "./node_modules/moment/locale/hu.js",
	"./hy-am": "./node_modules/moment/locale/hy-am.js",
	"./hy-am.js": "./node_modules/moment/locale/hy-am.js",
	"./id": "./node_modules/moment/locale/id.js",
	"./id.js": "./node_modules/moment/locale/id.js",
	"./is": "./node_modules/moment/locale/is.js",
	"./is.js": "./node_modules/moment/locale/is.js",
	"./it": "./node_modules/moment/locale/it.js",
	"./it-ch": "./node_modules/moment/locale/it-ch.js",
	"./it-ch.js": "./node_modules/moment/locale/it-ch.js",
	"./it.js": "./node_modules/moment/locale/it.js",
	"./ja": "./node_modules/moment/locale/ja.js",
	"./ja.js": "./node_modules/moment/locale/ja.js",
	"./jv": "./node_modules/moment/locale/jv.js",
	"./jv.js": "./node_modules/moment/locale/jv.js",
	"./ka": "./node_modules/moment/locale/ka.js",
	"./ka.js": "./node_modules/moment/locale/ka.js",
	"./kk": "./node_modules/moment/locale/kk.js",
	"./kk.js": "./node_modules/moment/locale/kk.js",
	"./km": "./node_modules/moment/locale/km.js",
	"./km.js": "./node_modules/moment/locale/km.js",
	"./kn": "./node_modules/moment/locale/kn.js",
	"./kn.js": "./node_modules/moment/locale/kn.js",
	"./ko": "./node_modules/moment/locale/ko.js",
	"./ko.js": "./node_modules/moment/locale/ko.js",
	"./ku": "./node_modules/moment/locale/ku.js",
	"./ku.js": "./node_modules/moment/locale/ku.js",
	"./ky": "./node_modules/moment/locale/ky.js",
	"./ky.js": "./node_modules/moment/locale/ky.js",
	"./lb": "./node_modules/moment/locale/lb.js",
	"./lb.js": "./node_modules/moment/locale/lb.js",
	"./lo": "./node_modules/moment/locale/lo.js",
	"./lo.js": "./node_modules/moment/locale/lo.js",
	"./lt": "./node_modules/moment/locale/lt.js",
	"./lt.js": "./node_modules/moment/locale/lt.js",
	"./lv": "./node_modules/moment/locale/lv.js",
	"./lv.js": "./node_modules/moment/locale/lv.js",
	"./me": "./node_modules/moment/locale/me.js",
	"./me.js": "./node_modules/moment/locale/me.js",
	"./mi": "./node_modules/moment/locale/mi.js",
	"./mi.js": "./node_modules/moment/locale/mi.js",
	"./mk": "./node_modules/moment/locale/mk.js",
	"./mk.js": "./node_modules/moment/locale/mk.js",
	"./ml": "./node_modules/moment/locale/ml.js",
	"./ml.js": "./node_modules/moment/locale/ml.js",
	"./mn": "./node_modules/moment/locale/mn.js",
	"./mn.js": "./node_modules/moment/locale/mn.js",
	"./mr": "./node_modules/moment/locale/mr.js",
	"./mr.js": "./node_modules/moment/locale/mr.js",
	"./ms": "./node_modules/moment/locale/ms.js",
	"./ms-my": "./node_modules/moment/locale/ms-my.js",
	"./ms-my.js": "./node_modules/moment/locale/ms-my.js",
	"./ms.js": "./node_modules/moment/locale/ms.js",
	"./mt": "./node_modules/moment/locale/mt.js",
	"./mt.js": "./node_modules/moment/locale/mt.js",
	"./my": "./node_modules/moment/locale/my.js",
	"./my.js": "./node_modules/moment/locale/my.js",
	"./nb": "./node_modules/moment/locale/nb.js",
	"./nb.js": "./node_modules/moment/locale/nb.js",
	"./ne": "./node_modules/moment/locale/ne.js",
	"./ne.js": "./node_modules/moment/locale/ne.js",
	"./nl": "./node_modules/moment/locale/nl.js",
	"./nl-be": "./node_modules/moment/locale/nl-be.js",
	"./nl-be.js": "./node_modules/moment/locale/nl-be.js",
	"./nl.js": "./node_modules/moment/locale/nl.js",
	"./nn": "./node_modules/moment/locale/nn.js",
	"./nn.js": "./node_modules/moment/locale/nn.js",
	"./oc-lnc": "./node_modules/moment/locale/oc-lnc.js",
	"./oc-lnc.js": "./node_modules/moment/locale/oc-lnc.js",
	"./pa-in": "./node_modules/moment/locale/pa-in.js",
	"./pa-in.js": "./node_modules/moment/locale/pa-in.js",
	"./pl": "./node_modules/moment/locale/pl.js",
	"./pl.js": "./node_modules/moment/locale/pl.js",
	"./pt": "./node_modules/moment/locale/pt.js",
	"./pt-br": "./node_modules/moment/locale/pt-br.js",
	"./pt-br.js": "./node_modules/moment/locale/pt-br.js",
	"./pt.js": "./node_modules/moment/locale/pt.js",
	"./ro": "./node_modules/moment/locale/ro.js",
	"./ro.js": "./node_modules/moment/locale/ro.js",
	"./ru": "./node_modules/moment/locale/ru.js",
	"./ru.js": "./node_modules/moment/locale/ru.js",
	"./sd": "./node_modules/moment/locale/sd.js",
	"./sd.js": "./node_modules/moment/locale/sd.js",
	"./se": "./node_modules/moment/locale/se.js",
	"./se.js": "./node_modules/moment/locale/se.js",
	"./si": "./node_modules/moment/locale/si.js",
	"./si.js": "./node_modules/moment/locale/si.js",
	"./sk": "./node_modules/moment/locale/sk.js",
	"./sk.js": "./node_modules/moment/locale/sk.js",
	"./sl": "./node_modules/moment/locale/sl.js",
	"./sl.js": "./node_modules/moment/locale/sl.js",
	"./sq": "./node_modules/moment/locale/sq.js",
	"./sq.js": "./node_modules/moment/locale/sq.js",
	"./sr": "./node_modules/moment/locale/sr.js",
	"./sr-cyrl": "./node_modules/moment/locale/sr-cyrl.js",
	"./sr-cyrl.js": "./node_modules/moment/locale/sr-cyrl.js",
	"./sr.js": "./node_modules/moment/locale/sr.js",
	"./ss": "./node_modules/moment/locale/ss.js",
	"./ss.js": "./node_modules/moment/locale/ss.js",
	"./sv": "./node_modules/moment/locale/sv.js",
	"./sv.js": "./node_modules/moment/locale/sv.js",
	"./sw": "./node_modules/moment/locale/sw.js",
	"./sw.js": "./node_modules/moment/locale/sw.js",
	"./ta": "./node_modules/moment/locale/ta.js",
	"./ta.js": "./node_modules/moment/locale/ta.js",
	"./te": "./node_modules/moment/locale/te.js",
	"./te.js": "./node_modules/moment/locale/te.js",
	"./tet": "./node_modules/moment/locale/tet.js",
	"./tet.js": "./node_modules/moment/locale/tet.js",
	"./tg": "./node_modules/moment/locale/tg.js",
	"./tg.js": "./node_modules/moment/locale/tg.js",
	"./th": "./node_modules/moment/locale/th.js",
	"./th.js": "./node_modules/moment/locale/th.js",
	"./tk": "./node_modules/moment/locale/tk.js",
	"./tk.js": "./node_modules/moment/locale/tk.js",
	"./tl-ph": "./node_modules/moment/locale/tl-ph.js",
	"./tl-ph.js": "./node_modules/moment/locale/tl-ph.js",
	"./tlh": "./node_modules/moment/locale/tlh.js",
	"./tlh.js": "./node_modules/moment/locale/tlh.js",
	"./tr": "./node_modules/moment/locale/tr.js",
	"./tr.js": "./node_modules/moment/locale/tr.js",
	"./tzl": "./node_modules/moment/locale/tzl.js",
	"./tzl.js": "./node_modules/moment/locale/tzl.js",
	"./tzm": "./node_modules/moment/locale/tzm.js",
	"./tzm-latn": "./node_modules/moment/locale/tzm-latn.js",
	"./tzm-latn.js": "./node_modules/moment/locale/tzm-latn.js",
	"./tzm.js": "./node_modules/moment/locale/tzm.js",
	"./ug-cn": "./node_modules/moment/locale/ug-cn.js",
	"./ug-cn.js": "./node_modules/moment/locale/ug-cn.js",
	"./uk": "./node_modules/moment/locale/uk.js",
	"./uk.js": "./node_modules/moment/locale/uk.js",
	"./ur": "./node_modules/moment/locale/ur.js",
	"./ur.js": "./node_modules/moment/locale/ur.js",
	"./uz": "./node_modules/moment/locale/uz.js",
	"./uz-latn": "./node_modules/moment/locale/uz-latn.js",
	"./uz-latn.js": "./node_modules/moment/locale/uz-latn.js",
	"./uz.js": "./node_modules/moment/locale/uz.js",
	"./vi": "./node_modules/moment/locale/vi.js",
	"./vi.js": "./node_modules/moment/locale/vi.js",
	"./x-pseudo": "./node_modules/moment/locale/x-pseudo.js",
	"./x-pseudo.js": "./node_modules/moment/locale/x-pseudo.js",
	"./yo": "./node_modules/moment/locale/yo.js",
	"./yo.js": "./node_modules/moment/locale/yo.js",
	"./zh-cn": "./node_modules/moment/locale/zh-cn.js",
	"./zh-cn.js": "./node_modules/moment/locale/zh-cn.js",
	"./zh-hk": "./node_modules/moment/locale/zh-hk.js",
	"./zh-hk.js": "./node_modules/moment/locale/zh-hk.js",
	"./zh-mo": "./node_modules/moment/locale/zh-mo.js",
	"./zh-mo.js": "./node_modules/moment/locale/zh-mo.js",
	"./zh-tw": "./node_modules/moment/locale/zh-tw.js",
	"./zh-tw.js": "./node_modules/moment/locale/zh-tw.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./node_modules/moment/locale sync recursive ^\\.\\/.*$";

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Dashboard.vue?vue&type=template&id=040e2ab9&":
/*!************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Dashboard.vue?vue&type=template&id=040e2ab9& ***!
  \************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "content" }, [
    _c("div", { staticClass: "container-fluid" }, [
      _c("div", { staticClass: "row" }, [
        _c("div", { staticClass: "col-lg-3 col-md-6 col-sm-6" }, [
          _c("div", { staticClass: "card card-stats" }, [
            _c(
              "div",
              {
                staticClass: "card-header card-header-warning card-header-icon"
              },
              [
                _vm._m(0),
                _vm._v(" "),
                _c("p", { staticClass: "card-category" }, [
                  _vm._v("Total Customer")
                ]),
                _vm._v(" "),
                _c("h3", { staticClass: "card-title" }, [
                  _vm._v(
                    "\n                            " +
                      _vm._s(_vm.dashboardData.customer) +
                      "\n                        "
                  )
                ])
              ]
            ),
            _vm._v(" "),
            _c("div", { staticClass: "card-footer" }, [
              _c("div", { staticClass: "stats" }, [
                _c("span", [_vm._v(_vm._s(_vm.dashboardData.month))])
              ]),
              _vm._v(" "),
              _c("div", [
                _c("span", { staticClass: "font-weight-bold text-primary" }, [
                  _vm._v(_vm._s(_vm.dashboardData.customer_monthly))
                ])
              ])
            ])
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col-lg-3 col-md-6 col-sm-6" }, [
          _c("div", { staticClass: "card card-stats" }, [
            _c(
              "div",
              {
                staticClass: "card-header card-header-success card-header-icon"
              },
              [
                _vm._m(1),
                _vm._v(" "),
                _c("p", { staticClass: "card-category" }, [
                  _vm._v("Total Product")
                ]),
                _vm._v(" "),
                _c("h3", { staticClass: "card-title" }, [
                  _vm._v(_vm._s(_vm.dashboardData.product))
                ])
              ]
            ),
            _vm._v(" "),
            _c("div", { staticClass: "card-footer" }, [
              _c("div", { staticClass: "stats" }, [
                _c("span", [_vm._v(_vm._s(_vm.dashboardData.month))])
              ]),
              _vm._v(" "),
              _c("div", [
                _c("span", { staticClass: "font-weight-bold text-primary" }, [
                  _vm._v(_vm._s(_vm.dashboardData.product_monthly))
                ])
              ])
            ])
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col-lg-3 col-md-6 col-sm-6" }, [
          _c("div", { staticClass: "card card-stats" }, [
            _c(
              "div",
              {
                staticClass: "card-header card-header-danger card-header-icon"
              },
              [
                _vm._m(2),
                _vm._v(" "),
                _c("p", { staticClass: "card-category" }, [
                  _vm._v("Total Sale")
                ]),
                _vm._v(" "),
                _c("h3", { staticClass: "card-title" }, [
                  _vm._v(_vm._s(_vm.dashboardData.purchase))
                ])
              ]
            ),
            _vm._v(" "),
            _c("div", { staticClass: "card-footer" }, [
              _c("div", { staticClass: "stats" }, [
                _c("span", [_vm._v(_vm._s(_vm.dashboardData.month))])
              ]),
              _vm._v(" "),
              _c("div", [
                _c("span", { staticClass: "font-weight-bold text-primary" }, [
                  _vm._v(_vm._s(_vm.dashboardData.purchase_monthly))
                ])
              ])
            ])
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col-lg-3 col-md-6 col-sm-6" }, [
          _c("div", { staticClass: "card card-stats" }, [
            _c(
              "div",
              { staticClass: "card-header card-header-info card-header-icon" },
              [
                _vm._m(3),
                _vm._v(" "),
                _c("p", { staticClass: "card-category" }, [
                  _vm._v("Total Service Done")
                ]),
                _vm._v(" "),
                _c("h3", { staticClass: "card-title" }, [
                  _vm._v(_vm._s(_vm.dashboardData.service))
                ])
              ]
            ),
            _vm._v(" "),
            _c("div", { staticClass: "card-footer" }, [
              _c("div", { staticClass: "stats" }, [
                _c("span", [_vm._v(_vm._s(_vm.dashboardData.month))])
              ]),
              _vm._v(" "),
              _c("div", [
                _c("span", { staticClass: "font-weight-bold text-primary" }, [
                  _vm._v(_vm._s(_vm.dashboardData.service_monthly))
                ])
              ])
            ])
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col-lg-6 col-md-6 col-sm-12" }, [
          _c("div", { staticClass: "card mt-0" }, [
            _vm._m(4),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "card-body" },
              [
                _vm.loaded
                  ? _c("service-bar-chart", {
                      attrs: {
                        styles: _vm.barchartStyles,
                        chartdata: _vm.chart.Bar,
                        options: _vm.options
                      }
                    })
                  : _vm._e()
              ],
              1
            )
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col-lg-6 col-md-6 col-sm-12" }, [
          _c("div", { staticClass: "card mt-0" }, [
            _vm._m(5),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "card-body" },
              [
                _vm.loaded
                  ? _c("service-line-chart", {
                      attrs: {
                        styles: _vm.barchartStyles,
                        chartdata: _vm.chart.Line,
                        options: _vm.options
                      }
                    })
                  : _vm._e()
              ],
              1
            )
          ])
        ]),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "col-lg-12" },
          [_c("dashboard-customer-service")],
          1
        )
      ])
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "card-icon" }, [
      _c("i", { staticClass: "material-icons" }, [_vm._v("streetview")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "card-icon" }, [
      _c("i", { staticClass: "material-icons" }, [
        _vm._v("settings_input_composite")
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "card-icon" }, [
      _c("i", { staticClass: "material-icons" }, [_vm._v("stacked_line_chart")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "card-icon" }, [
      _c("i", { staticClass: "material-icons" }, [_vm._v("check_box")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "div",
      { staticClass: "card-header card-header-icon card-header-rose" },
      [
        _c("h4", { staticClass: "card-title" }, [
          _vm._v("Sales & Service Chart\n                        "),
          _c("small", { staticClass: "font-weight-bold text-primary" }, [
            _vm._v("- Previous 30 days")
          ])
        ])
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "div",
      { staticClass: "card-header card-header-icon card-header-city" },
      [
        _c("h4", { staticClass: "card-title" }, [
          _vm._v("Sales vs Service\n                        "),
          _c("small", { staticClass: "font-weight-bold text-primary" }, [
            _vm._v("- 2020")
          ])
        ])
      ]
    )
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/partial/DashboardCustomerService.vue?vue&type=template&id=a6a7d708&":
/*!***********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/partial/DashboardCustomerService.vue?vue&type=template&id=a6a7d708& ***!
  \***********************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c("div", { staticClass: "card mt-0" }, [
      _c(
        "div",
        { staticClass: "card-header card-header-rose card-header-icon" },
        [
          _c("div", { staticClass: "row" }, [
            _vm._m(0),
            _vm._v(" "),
            _c("div", { staticClass: "col-sm-12 col-md-9" }, [
              _c("div", { staticClass: "row" }, [
                _c("div", { staticClass: "col-5" }, [
                  _c("div", { staticClass: "float-left float-md-right mt-2" }, [
                    _c("div", { staticClass: "row" }, [
                      _vm._m(1),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "col-sm-8 pr-0" },
                        [
                          _c("v-date-picker", {
                            attrs: { popover: { visibility: "click" } },
                            scopedSlots: _vm._u([
                              {
                                key: "default",
                                fn: function(ref) {
                                  var inputValue = ref.inputValue
                                  var inputEvents = ref.inputEvents
                                  return [
                                    _c(
                                      "input",
                                      _vm._g(
                                        {
                                          staticClass:
                                            "bg-white border border-bottom-0 form-control px-2 py-1 rounded",
                                          domProps: { value: inputValue }
                                        },
                                        inputEvents
                                      )
                                    )
                                  ]
                                }
                              }
                            ]),
                            model: {
                              value: _vm.filter.from_date,
                              callback: function($$v) {
                                _vm.$set(_vm.filter, "from_date", $$v)
                              },
                              expression: "filter.from_date"
                            }
                          })
                        ],
                        1
                      )
                    ])
                  ])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "col-5" }, [
                  _c("div", { staticClass: "float-left float-md-right mt-2" }, [
                    _c("div", { staticClass: "row" }, [
                      _vm._m(2),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "col-sm-8 pr-0" },
                        [
                          _c("v-date-picker", {
                            attrs: { popover: { visibility: "click" } },
                            scopedSlots: _vm._u([
                              {
                                key: "default",
                                fn: function(ref) {
                                  var inputValue = ref.inputValue
                                  var inputEvents = ref.inputEvents
                                  return [
                                    _c(
                                      "input",
                                      _vm._g(
                                        {
                                          staticClass:
                                            "bg-white border border-bottom-0 form-control px-2 py-1 rounded",
                                          domProps: { value: inputValue }
                                        },
                                        inputEvents
                                      )
                                    )
                                  ]
                                }
                              }
                            ]),
                            model: {
                              value: _vm.filter.to_date,
                              callback: function($$v) {
                                _vm.$set(_vm.filter, "to_date", $$v)
                              },
                              expression: "filter.to_date"
                            }
                          })
                        ],
                        1
                      )
                    ])
                  ])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "col-2" }, [
                  _c(
                    "button",
                    {
                      staticClass: "btn btn-sm btn-primary mt-2 float-right",
                      on: { click: _vm.getData }
                    },
                    [_vm._v("Filter"), _c("span", { staticClass: "spinner" })]
                  )
                ])
              ])
            ])
          ])
        ]
      ),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "card-body" },
        [
          _c("search", {
            attrs: { pagination: _vm.pagination, param: _vm.param },
            on: {
              limit: function($event) {
                return _vm.getData()
              }
            }
          }),
          _vm._v(" "),
          _c("div", { staticClass: "table-responsive" }, [
            _c("table", { staticClass: "table table-sortable" }, [
              _c("thead", [
                _c("tr", [
                  _c("th", [_vm._v("SL#")]),
                  _vm._v(" "),
                  _c(
                    "th",
                    {
                      staticClass: "sorting mw-120",
                      attrs: { "data-column": "users.name" },
                      on: {
                        click: function($event) {
                          return _vm.sort($event)
                        }
                      }
                    },
                    [
                      _vm._v(
                        "\n                                Customer\n                            "
                      )
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "th",
                    {
                      staticClass: "sorting",
                      attrs: { "data-column": "users.phone" },
                      on: {
                        click: function($event) {
                          return _vm.sort($event)
                        }
                      }
                    },
                    [
                      _vm._v(
                        "\n                                Phone\n                            "
                      )
                    ]
                  ),
                  _vm._v(" "),
                  _c("th", { staticClass: "mw-180" }, [_vm._v("Address")]),
                  _vm._v(" "),
                  _c(
                    "th",
                    {
                      staticClass: "sorting mw-180",
                      attrs: { "data-column": "products.name" },
                      on: {
                        click: function($event) {
                          return _vm.sort($event)
                        }
                      }
                    },
                    [
                      _vm._v(
                        "\n                                Product Name\n                            "
                      )
                    ]
                  ),
                  _vm._v(" "),
                  _c("th", { staticClass: "mw-155" }, [
                    _vm._v(
                      "\n                                Next Service Date\n                            "
                    )
                  ]),
                  _vm._v(" "),
                  _c("th", { staticClass: "mw-80 text-right" }, [
                    _vm._v(
                      "\n                                Actions\n                            "
                    )
                  ])
                ])
              ]),
              _vm._v(" "),
              _c(
                "tbody",
                _vm._l(_vm.sales, function(sale, index) {
                  return _c("tr", { key: sale.id }, [
                    _c("td", [
                      _vm._v(
                        "\n                                " +
                          _vm._s(_vm.pagination.from + index) +
                          "\n                            "
                      )
                    ]),
                    _vm._v(" "),
                    _c(
                      "td",
                      { staticClass: "ws-pre" },
                      [
                        _c(
                          "router-link",
                          {
                            attrs: {
                              to: {
                                name: "customer_view",
                                params: { id: sale.customer_id }
                              },
                              target: "_blank"
                            }
                          },
                          [
                            _vm._v(
                              _vm._s(
                                sale.name +
                                  "\n" +
                                  sale.customerId +
                                  "\n" +
                                  sale.phone
                              )
                            )
                          ]
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c("td", [_vm._v(_vm._s(sale.phone))]),
                    _vm._v(" "),
                    _c("td", [
                      _vm._v(
                        "\n                                " +
                          _vm._s(
                            (sale.address != "" && sale.address != null
                              ? sale.address + ", "
                              : "") +
                              (sale.upazila != "" ? sale.upazila + ", " : "") +
                              (sale.district != ""
                                ? sale.district + ", "
                                : "") +
                              (sale.division != ""
                                ? sale.division + ", "
                                : "") +
                              (sale.country != "" ? sale.country : "")
                          ) +
                          "\n                            "
                      )
                    ]),
                    _vm._v(" "),
                    _c("td", [
                      _vm._v(
                        "\n                                " +
                          _vm._s(
                            sale.product_name + " >> " + sale.product_code
                          ) +
                          "\n                            "
                      )
                    ]),
                    _vm._v(" "),
                    _c("td", [
                      _vm._v(
                        "\n                                " +
                          _vm._s(sale.next_service_time) +
                          "\n                            "
                      )
                    ]),
                    _vm._v(" "),
                    _c("td", { staticClass: "td-actions text-right" }, [
                      _c(
                        "button",
                        {
                          staticClass: "btn btn-facebook btn-round",
                          attrs: {
                            type: "button",
                            rel: "tooltip",
                            title: "Add Service"
                          },
                          on: {
                            click: function($event) {
                              $event.preventDefault()
                              return _vm.service(sale)
                            }
                          }
                        },
                        [
                          _c("span", { staticClass: "material-icons" }, [
                            _vm._v("add_box")
                          ])
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "button",
                        {
                          staticClass: "btn btn-linkedin btn-round",
                          attrs: {
                            type: "button",
                            rel: "tooltip",
                            title: "Change Time"
                          },
                          on: {
                            click: function($event) {
                              $event.preventDefault()
                              return _vm.serviceChange(sale)
                            }
                          }
                        },
                        [
                          _c("span", { staticClass: "material-icons" }, [
                            _vm._v("published_with_changes")
                          ])
                        ]
                      )
                    ])
                  ])
                }),
                0
              )
            ])
          ]),
          _vm._v(" "),
          _c("pagination", {
            attrs: { pagination: _vm.pagination, offset: 5 },
            on: {
              paginate: function($event) {
                return _vm.getData()
              }
            }
          })
        ],
        1
      )
    ]),
    _vm._v(" "),
    _c(
      "div",
      {
        staticClass: "modal fade",
        attrs: {
          id: "exampleModal",
          tabindex: "-1",
          role: "dialog",
          "aria-labelledby": "exampleModalLabel",
          "aria-hidden": "true"
        }
      },
      [
        _c(
          "div",
          { staticClass: "modal-dialog modal-lg", attrs: { role: "document" } },
          [
            _c("div", { staticClass: "modal-content" }, [
              _vm._m(3),
              _vm._v(" "),
              _c("div", { staticClass: "modal-body" }, [
                _c("div", { staticClass: "page-categories" }, [
                  _vm._m(4),
                  _vm._v(" "),
                  _c("div", { staticClass: "tab-content" }, [
                    _c(
                      "div",
                      {
                        staticClass: "tab-pane  active show",
                        attrs: { id: "link7" }
                      },
                      [
                        _c("div", { staticClass: "card" }, [
                          _c("div", { staticClass: "card-body" }, [
                            _c("form", [
                              _c("div", { staticClass: "row" }, [
                                _c(
                                  "div",
                                  { staticClass: "col-md-6 col-sm-12" },
                                  [
                                    _c(
                                      "div",
                                      {
                                        staticClass:
                                          "form-group bmd-form-group",
                                        class: {
                                          "is-filled":
                                            _vm.form.customer !== null
                                        }
                                      },
                                      [
                                        _vm._m(5),
                                        _vm._v(" "),
                                        _c("input", {
                                          directives: [
                                            {
                                              name: "model",
                                              rawName: "v-model",
                                              value: _vm.form.customer,
                                              expression: "form.customer"
                                            }
                                          ],
                                          staticClass: "form-control",
                                          attrs: { type: "text", readonly: "" },
                                          domProps: {
                                            value: _vm.form.customer
                                          },
                                          on: {
                                            input: function($event) {
                                              if ($event.target.composing) {
                                                return
                                              }
                                              _vm.$set(
                                                _vm.form,
                                                "customer",
                                                $event.target.value
                                              )
                                            }
                                          }
                                        })
                                      ]
                                    )
                                  ]
                                ),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  { staticClass: "col-md-6 col-sm-12" },
                                  [
                                    _c(
                                      "div",
                                      {
                                        staticClass:
                                          "form-group bmd-form-group",
                                        class: {
                                          "is-filled": _vm.form.product !== null
                                        }
                                      },
                                      [
                                        _vm._m(6),
                                        _vm._v(" "),
                                        _c("input", {
                                          directives: [
                                            {
                                              name: "model",
                                              rawName: "v-model",
                                              value: _vm.form.product,
                                              expression: "form.product"
                                            }
                                          ],
                                          staticClass: "form-control",
                                          attrs: { type: "text", readonly: "" },
                                          domProps: { value: _vm.form.product },
                                          on: {
                                            input: function($event) {
                                              if ($event.target.composing) {
                                                return
                                              }
                                              _vm.$set(
                                                _vm.form,
                                                "product",
                                                $event.target.value
                                              )
                                            }
                                          }
                                        })
                                      ]
                                    )
                                  ]
                                ),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  { staticClass: "col-md-6 col-sm-12" },
                                  [
                                    _c(
                                      "div",
                                      [
                                        _vm._m(7),
                                        _vm._v(" "),
                                        _c("v-date-picker", {
                                          attrs: {
                                            popover: { visibility: "click" }
                                          },
                                          scopedSlots: _vm._u([
                                            {
                                              key: "default",
                                              fn: function(ref) {
                                                var inputValue = ref.inputValue
                                                var inputEvents =
                                                  ref.inputEvents
                                                return [
                                                  _c(
                                                    "input",
                                                    _vm._g(
                                                      {
                                                        staticClass:
                                                          "bg-white border border-bottom-0 form-control px-2 py-1 rounded",
                                                        domProps: {
                                                          value: inputValue
                                                        }
                                                      },
                                                      inputEvents
                                                    )
                                                  )
                                                ]
                                              }
                                            }
                                          ]),
                                          model: {
                                            value: _vm.form.service_time,
                                            callback: function($$v) {
                                              _vm.$set(
                                                _vm.form,
                                                "service_time",
                                                $$v
                                              )
                                            },
                                            expression: "form.service_time"
                                          }
                                        }),
                                        _vm._v(" "),
                                        _vm.errors.service_time
                                          ? _c(
                                              "span",
                                              { staticClass: "text-danger" },
                                              [
                                                _vm._v(
                                                  _vm._s(
                                                    _vm.errors.service_time[0]
                                                  )
                                                )
                                              ]
                                            )
                                          : _vm._e()
                                      ],
                                      1
                                    )
                                  ]
                                ),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  { staticClass: "col-md-6 col-sm-12" },
                                  [
                                    _c(
                                      "div",
                                      [
                                        _c(
                                          "label",
                                          {
                                            staticClass: "fs11 mb-0",
                                            attrs: { for: "next_service_time" }
                                          },
                                          [_vm._v("Next Service Date")]
                                        ),
                                        _vm._v(" "),
                                        _c("v-date-picker", {
                                          attrs: {
                                            popover: { visibility: "click" }
                                          },
                                          scopedSlots: _vm._u([
                                            {
                                              key: "default",
                                              fn: function(ref) {
                                                var inputValue = ref.inputValue
                                                var inputEvents =
                                                  ref.inputEvents
                                                return [
                                                  _c(
                                                    "input",
                                                    _vm._g(
                                                      {
                                                        staticClass:
                                                          "bg-white border border-bottom-0 form-control px-2 py-1 rounded",
                                                        domProps: {
                                                          value: inputValue
                                                        }
                                                      },
                                                      inputEvents
                                                    )
                                                  )
                                                ]
                                              }
                                            }
                                          ]),
                                          model: {
                                            value: _vm.form.next_service_time,
                                            callback: function($$v) {
                                              _vm.$set(
                                                _vm.form,
                                                "next_service_time",
                                                $$v
                                              )
                                            },
                                            expression: "form.next_service_time"
                                          }
                                        }),
                                        _vm._v(" "),
                                        _vm.errors.next_service_time
                                          ? _c(
                                              "span",
                                              { staticClass: "text-danger" },
                                              [
                                                _vm._v(
                                                  _vm._s(
                                                    _vm.errors
                                                      .next_service_time[0]
                                                  )
                                                )
                                              ]
                                            )
                                          : _vm._e()
                                      ],
                                      1
                                    )
                                  ]
                                ),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  { staticClass: "col-md-6 col-sm-12" },
                                  [
                                    _c(
                                      "div",
                                      {
                                        staticClass:
                                          "form-group bmd-form-group",
                                        class: {
                                          "is-filled":
                                            _vm.form.service_charge !== null
                                        }
                                      },
                                      [
                                        _vm._m(8),
                                        _vm._v(" "),
                                        _c("input", {
                                          directives: [
                                            {
                                              name: "model",
                                              rawName: "v-model",
                                              value: _vm.form.service_charge,
                                              expression: "form.service_charge"
                                            }
                                          ],
                                          staticClass: "form-control",
                                          attrs: {
                                            type: "text",
                                            id: "service_charge"
                                          },
                                          domProps: {
                                            value: _vm.form.service_charge
                                          },
                                          on: {
                                            input: function($event) {
                                              if ($event.target.composing) {
                                                return
                                              }
                                              _vm.$set(
                                                _vm.form,
                                                "service_charge",
                                                $event.target.value
                                              )
                                            }
                                          }
                                        }),
                                        _vm._v(" "),
                                        _vm.errors.service_charge
                                          ? _c(
                                              "span",
                                              { staticClass: "text-danger" },
                                              [
                                                _vm._v(
                                                  _vm._s(
                                                    _vm.errors.service_charge[0]
                                                  )
                                                )
                                              ]
                                            )
                                          : _vm._e()
                                      ]
                                    )
                                  ]
                                ),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  { staticClass: "col-md-6 col-sm-12" },
                                  [
                                    _c(
                                      "div",
                                      {
                                        staticClass:
                                          "form-group bmd-form-group",
                                        class: {
                                          "is-filled":
                                            _vm.form.total_paid !== null
                                        }
                                      },
                                      [
                                        _vm._m(9),
                                        _vm._v(" "),
                                        _c("input", {
                                          directives: [
                                            {
                                              name: "model",
                                              rawName: "v-model",
                                              value: _vm.form.total_paid,
                                              expression: "form.total_paid"
                                            }
                                          ],
                                          staticClass: "form-control",
                                          attrs: {
                                            type: "text",
                                            id: "total_paid"
                                          },
                                          domProps: {
                                            value: _vm.form.total_paid
                                          },
                                          on: {
                                            input: function($event) {
                                              if ($event.target.composing) {
                                                return
                                              }
                                              _vm.$set(
                                                _vm.form,
                                                "total_paid",
                                                $event.target.value
                                              )
                                            }
                                          }
                                        }),
                                        _vm._v(" "),
                                        _vm.errors.total_paid
                                          ? _c(
                                              "span",
                                              { staticClass: "text-danger" },
                                              [
                                                _vm._v(
                                                  _vm._s(
                                                    _vm.errors.total_paid[0]
                                                  )
                                                )
                                              ]
                                            )
                                          : _vm._e()
                                      ]
                                    )
                                  ]
                                ),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  { staticClass: "col-md-6 col-sm-12" },
                                  [
                                    _c(
                                      "div",
                                      {
                                        staticClass:
                                          "form-group bmd-form-group",
                                        class: {
                                          "is-filled": _vm.form.cost !== null
                                        }
                                      },
                                      [
                                        _c(
                                          "label",
                                          {
                                            staticClass: "bmd-label-floating",
                                            attrs: { for: "cost" }
                                          },
                                          [_vm._v("Total Cost")]
                                        ),
                                        _vm._v(" "),
                                        _c("input", {
                                          directives: [
                                            {
                                              name: "model",
                                              rawName: "v-model",
                                              value: _vm.form.cost,
                                              expression: "form.cost"
                                            }
                                          ],
                                          staticClass: "form-control",
                                          attrs: { type: "text", id: "cost" },
                                          domProps: { value: _vm.form.cost },
                                          on: {
                                            input: function($event) {
                                              if ($event.target.composing) {
                                                return
                                              }
                                              _vm.$set(
                                                _vm.form,
                                                "cost",
                                                $event.target.value
                                              )
                                            }
                                          }
                                        }),
                                        _vm._v(" "),
                                        _vm.errors.cost
                                          ? _c(
                                              "span",
                                              { staticClass: "text-danger" },
                                              [
                                                _vm._v(
                                                  _vm._s(_vm.errors.cost[0])
                                                )
                                              ]
                                            )
                                          : _vm._e()
                                      ]
                                    )
                                  ]
                                ),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  { staticClass: "col-md-6 col-sm-12" },
                                  [
                                    _c(
                                      "div",
                                      { staticClass: "form-group" },
                                      [
                                        _vm._m(10),
                                        _vm._v(" "),
                                        _c("Select2", {
                                          attrs: {
                                            options: _vm.optionsServiceMen,
                                            placeholder: "Select Technician"
                                          },
                                          model: {
                                            value: _vm.form.done_by,
                                            callback: function($$v) {
                                              _vm.$set(_vm.form, "done_by", $$v)
                                            },
                                            expression:
                                              "\n                                                                form.done_by\n                                                            "
                                          }
                                        }),
                                        _vm._v(" "),
                                        _vm.errors.done_by
                                          ? _c(
                                              "span",
                                              { staticClass: "text-danger" },
                                              [
                                                _vm._v(
                                                  _vm._s(_vm.errors.done_by[0])
                                                )
                                              ]
                                            )
                                          : _vm._e()
                                      ],
                                      1
                                    )
                                  ]
                                ),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  { staticClass: "col-md-6 col-sm-12" },
                                  [
                                    _c(
                                      "div",
                                      {
                                        staticClass:
                                          "form-group bmd-form-group ",
                                        class: {
                                          "is-filled":
                                            _vm.form.service_for !== null
                                        }
                                      },
                                      [
                                        _vm._m(11),
                                        _vm._v(" "),
                                        _c("textarea", {
                                          directives: [
                                            {
                                              name: "model",
                                              rawName: "v-model",
                                              value: _vm.form.service_for,
                                              expression: "form.service_for"
                                            }
                                          ],
                                          staticClass: "form-control",
                                          attrs: {
                                            type: "text",
                                            id: "service_for"
                                          },
                                          domProps: {
                                            value: _vm.form.service_for
                                          },
                                          on: {
                                            input: function($event) {
                                              if ($event.target.composing) {
                                                return
                                              }
                                              _vm.$set(
                                                _vm.form,
                                                "service_for",
                                                $event.target.value
                                              )
                                            }
                                          }
                                        }),
                                        _vm._v(" "),
                                        _vm.errors.service_for
                                          ? _c(
                                              "span",
                                              { staticClass: "text-danger" },
                                              [
                                                _vm._v(
                                                  _vm._s(
                                                    _vm.errors.service_for[0]
                                                  )
                                                )
                                              ]
                                            )
                                          : _vm._e()
                                      ]
                                    )
                                  ]
                                ),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  { staticClass: "col-md-6 col-sm-12" },
                                  [
                                    _c(
                                      "div",
                                      {
                                        staticClass:
                                          "form-group bmd-form-group ",
                                        class: {
                                          "is-filled": _vm.form.remarks !== null
                                        }
                                      },
                                      [
                                        _c(
                                          "label",
                                          {
                                            staticClass: "bmd-label-floating",
                                            attrs: { for: "remarks" }
                                          },
                                          [_vm._v("Remarks")]
                                        ),
                                        _vm._v(" "),
                                        _c("textarea", {
                                          directives: [
                                            {
                                              name: "model",
                                              rawName: "v-model",
                                              value: _vm.form.remarks,
                                              expression: "form.remarks"
                                            }
                                          ],
                                          staticClass: "form-control",
                                          attrs: {
                                            type: "text",
                                            id: "remarks"
                                          },
                                          domProps: { value: _vm.form.remarks },
                                          on: {
                                            input: function($event) {
                                              if ($event.target.composing) {
                                                return
                                              }
                                              _vm.$set(
                                                _vm.form,
                                                "remarks",
                                                $event.target.value
                                              )
                                            }
                                          }
                                        }),
                                        _vm._v(" "),
                                        _vm.errors.remarks
                                          ? _c(
                                              "span",
                                              { staticClass: "text-danger" },
                                              [
                                                _vm._v(
                                                  _vm._s(_vm.errors.remarks[0])
                                                )
                                              ]
                                            )
                                          : _vm._e()
                                      ]
                                    )
                                  ]
                                ),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  { staticClass: "col-md-6 col-sm-12" },
                                  [
                                    _c("div", { staticClass: "togglebutton" }, [
                                      _c("label", [
                                        _c("input", {
                                          directives: [
                                            {
                                              name: "model",
                                              rawName: "v-model",
                                              value: _vm.form.is_continue,
                                              expression: "form.is_continue"
                                            }
                                          ],
                                          attrs: { type: "checkbox" },
                                          domProps: {
                                            checked: Array.isArray(
                                              _vm.form.is_continue
                                            )
                                              ? _vm._i(
                                                  _vm.form.is_continue,
                                                  null
                                                ) > -1
                                              : _vm.form.is_continue
                                          },
                                          on: {
                                            change: function($event) {
                                              var $$a = _vm.form.is_continue,
                                                $$el = $event.target,
                                                $$c = $$el.checked
                                                  ? true
                                                  : false
                                              if (Array.isArray($$a)) {
                                                var $$v = null,
                                                  $$i = _vm._i($$a, $$v)
                                                if ($$el.checked) {
                                                  $$i < 0 &&
                                                    _vm.$set(
                                                      _vm.form,
                                                      "is_continue",
                                                      $$a.concat([$$v])
                                                    )
                                                } else {
                                                  $$i > -1 &&
                                                    _vm.$set(
                                                      _vm.form,
                                                      "is_continue",
                                                      $$a
                                                        .slice(0, $$i)
                                                        .concat(
                                                          $$a.slice($$i + 1)
                                                        )
                                                    )
                                                }
                                              } else {
                                                _vm.$set(
                                                  _vm.form,
                                                  "is_continue",
                                                  $$c
                                                )
                                              }
                                            }
                                          }
                                        }),
                                        _vm._v(" "),
                                        _c("span", { staticClass: "toggle" }),
                                        _vm._v(
                                          "\n                                                            Service Continue\n                                                        "
                                        )
                                      ])
                                    ])
                                  ]
                                )
                              ])
                            ])
                          ])
                        ])
                      ]
                    )
                  ])
                ])
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "modal-footer" }, [
                _c(
                  "button",
                  {
                    staticClass: "btn btn-secondary",
                    attrs: { type: "button", "data-dismiss": "modal" }
                  },
                  [
                    _vm._v(
                      "\n                        Close\n                    "
                    )
                  ]
                ),
                _vm._v(" "),
                _c(
                  "button",
                  {
                    staticClass: "btn btn-primary",
                    attrs: { type: "button" },
                    on: {
                      click: function($event) {
                        $event.preventDefault()
                        return _vm.add($event)
                      }
                    }
                  },
                  [
                    _vm._v("\n                        Submit"),
                    _c("span", { staticClass: "spinner" })
                  ]
                )
              ])
            ])
          ]
        )
      ]
    ),
    _vm._v(" "),
    _c(
      "div",
      {
        staticClass: "modal fade",
        attrs: {
          id: "timeChangeModal",
          tabindex: "-1",
          role: "dialog",
          "aria-labelledby": "timeChangeModalLabel",
          "aria-hidden": "true"
        }
      },
      [
        _c(
          "div",
          { staticClass: "modal-dialog modal-lg", attrs: { role: "document" } },
          [
            _c("div", { staticClass: "modal-content" }, [
              _vm._m(12),
              _vm._v(" "),
              _c("div", { staticClass: "modal-body" }, [
                _c("div", { staticClass: "card" }, [
                  _c("div", { staticClass: "card-body" }, [
                    _c("form", [
                      _c("div", { staticClass: "row" }, [
                        _c("div", { staticClass: "col-md-6 col-sm-12" }, [
                          _c(
                            "div",
                            {
                              staticClass: "form-group bmd-form-group",
                              class: {
                                "is-filled": _vm.form.customer !== null
                              }
                            },
                            [
                              _vm._m(13),
                              _vm._v(" "),
                              _c("input", {
                                directives: [
                                  {
                                    name: "model",
                                    rawName: "v-model",
                                    value: _vm.form.customer,
                                    expression: "form.customer"
                                  }
                                ],
                                staticClass: "form-control",
                                attrs: { type: "text", readonly: "" },
                                domProps: { value: _vm.form.customer },
                                on: {
                                  input: function($event) {
                                    if ($event.target.composing) {
                                      return
                                    }
                                    _vm.$set(
                                      _vm.form,
                                      "customer",
                                      $event.target.value
                                    )
                                  }
                                }
                              })
                            ]
                          )
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "col-md-6 col-sm-12" }, [
                          _c(
                            "div",
                            {
                              staticClass: "form-group bmd-form-group",
                              class: {
                                "is-filled": _vm.form.product !== null
                              }
                            },
                            [
                              _vm._m(14),
                              _vm._v(" "),
                              _c("input", {
                                directives: [
                                  {
                                    name: "model",
                                    rawName: "v-model",
                                    value: _vm.form.product,
                                    expression: "form.product"
                                  }
                                ],
                                staticClass: "form-control",
                                attrs: { type: "text", readonly: "" },
                                domProps: { value: _vm.form.product },
                                on: {
                                  input: function($event) {
                                    if ($event.target.composing) {
                                      return
                                    }
                                    _vm.$set(
                                      _vm.form,
                                      "product",
                                      $event.target.value
                                    )
                                  }
                                }
                              })
                            ]
                          )
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "col-md-6 col-sm-12" }, [
                          _c(
                            "div",
                            [
                              _c(
                                "label",
                                {
                                  staticClass: "fs11 mb-0",
                                  attrs: { for: "next_service_time" }
                                },
                                [_vm._v("Next Service Date")]
                              ),
                              _vm._v(" "),
                              _c("v-date-picker", {
                                attrs: { popover: { visibility: "click" } },
                                scopedSlots: _vm._u([
                                  {
                                    key: "default",
                                    fn: function(ref) {
                                      var inputValue = ref.inputValue
                                      var inputEvents = ref.inputEvents
                                      return [
                                        _c(
                                          "input",
                                          _vm._g(
                                            {
                                              staticClass:
                                                "bg-white border border-bottom-0 form-control px-2 py-1 rounded",
                                              domProps: { value: inputValue }
                                            },
                                            inputEvents
                                          )
                                        )
                                      ]
                                    }
                                  }
                                ]),
                                model: {
                                  value: _vm.form.next_service_time,
                                  callback: function($$v) {
                                    _vm.$set(_vm.form, "next_service_time", $$v)
                                  },
                                  expression: "form.next_service_time"
                                }
                              }),
                              _vm._v(" "),
                              _vm.errors.next_service_time
                                ? _c("span", { staticClass: "text-danger" }, [
                                    _vm._v(
                                      _vm._s(_vm.errors.next_service_time[0])
                                    )
                                  ])
                                : _vm._e()
                            ],
                            1
                          )
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "col-md-6 col-sm-12" }, [
                          _c(
                            "div",
                            {
                              staticClass: "form-group bmd-form-group ",
                              class: {
                                "is-filled": _vm.form.remarks !== null
                              }
                            },
                            [
                              _vm._m(15),
                              _vm._v(" "),
                              _c("textarea", {
                                directives: [
                                  {
                                    name: "model",
                                    rawName: "v-model",
                                    value: _vm.form.remarks,
                                    expression: "form.remarks"
                                  }
                                ],
                                staticClass: "form-control",
                                attrs: { type: "text", id: "remarks" },
                                domProps: { value: _vm.form.remarks },
                                on: {
                                  input: function($event) {
                                    if ($event.target.composing) {
                                      return
                                    }
                                    _vm.$set(
                                      _vm.form,
                                      "remarks",
                                      $event.target.value
                                    )
                                  }
                                }
                              }),
                              _vm._v(" "),
                              _vm.errors.remarks
                                ? _c("span", { staticClass: "text-danger" }, [
                                    _vm._v(_vm._s(_vm.errors.remarks[0]))
                                  ])
                                : _vm._e()
                            ]
                          )
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "col-md-6 col-sm-12" }, [
                          _c("div", { staticClass: "togglebutton" }, [
                            _c("label", [
                              _c("input", {
                                directives: [
                                  {
                                    name: "model",
                                    rawName: "v-model",
                                    value: _vm.form.is_continue,
                                    expression: "form.is_continue"
                                  }
                                ],
                                attrs: { type: "checkbox" },
                                domProps: {
                                  checked: Array.isArray(_vm.form.is_continue)
                                    ? _vm._i(_vm.form.is_continue, null) > -1
                                    : _vm.form.is_continue
                                },
                                on: {
                                  change: function($event) {
                                    var $$a = _vm.form.is_continue,
                                      $$el = $event.target,
                                      $$c = $$el.checked ? true : false
                                    if (Array.isArray($$a)) {
                                      var $$v = null,
                                        $$i = _vm._i($$a, $$v)
                                      if ($$el.checked) {
                                        $$i < 0 &&
                                          _vm.$set(
                                            _vm.form,
                                            "is_continue",
                                            $$a.concat([$$v])
                                          )
                                      } else {
                                        $$i > -1 &&
                                          _vm.$set(
                                            _vm.form,
                                            "is_continue",
                                            $$a
                                              .slice(0, $$i)
                                              .concat($$a.slice($$i + 1))
                                          )
                                      }
                                    } else {
                                      _vm.$set(_vm.form, "is_continue", $$c)
                                    }
                                  }
                                }
                              }),
                              _vm._v(" "),
                              _c("span", { staticClass: "toggle" }),
                              _vm._v(
                                "\n                                            Service Continue\n                                        "
                              )
                            ])
                          ])
                        ])
                      ])
                    ])
                  ])
                ])
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "modal-footer" }, [
                _c(
                  "button",
                  {
                    staticClass: "btn btn-secondary",
                    attrs: { type: "button", "data-dismiss": "modal" }
                  },
                  [
                    _vm._v(
                      "\n                        Close\n                    "
                    )
                  ]
                ),
                _vm._v(" "),
                _c(
                  "button",
                  {
                    staticClass: "btn btn-primary",
                    attrs: { type: "button" },
                    on: {
                      click: function($event) {
                        $event.preventDefault()
                        return _vm.changeAdd($event)
                      }
                    }
                  },
                  [
                    _vm._v("\n                        Change Service Time"),
                    _c("span", { staticClass: "spinner" })
                  ]
                )
              ])
            ])
          ]
        )
      ]
    )
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "col-sm-12 col-md-3" }, [
      _c("h4", { staticClass: "card-title" }, [
        _vm._v(
          "\n                        Upcoming Service List\n                    "
        )
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", { staticClass: "col-form-label" }, [
      _vm._v("From "),
      _c("span", { staticClass: "d-sm-none d-md-inline" }, [_vm._v("Date")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", { staticClass: "col-form-label" }, [
      _vm._v("To "),
      _c("span", { staticClass: "d-sm-none d-md-inline" }, [_vm._v("Date")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "modal-header" }, [
      _c(
        "h4",
        { staticClass: "modal-title", attrs: { id: "exampleModalLabel" } },
        [
          _vm._v(
            "\n                        Customer Service\n                    "
          )
        ]
      ),
      _vm._v(" "),
      _c(
        "button",
        {
          staticClass: "close",
          attrs: {
            type: "button",
            "data-dismiss": "modal",
            "aria-label": "Close"
          }
        },
        [_c("span", { attrs: { "aria-hidden": "true" } }, [_vm._v("×")])]
      )
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "ul",
      {
        staticClass:
          "nav nav-pills nav-pills-warning nav-pills-icons justify-content-center",
        attrs: { role: "tablist" }
      },
      [
        _c("li", { staticClass: "nav-item" }, [
          _c(
            "a",
            {
              staticClass: "nav-link active show",
              attrs: { "data-toggle": "tab", href: "#link7", role: "tablist" }
            },
            [_vm._v("Add Service")]
          )
        ])
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "label",
      { staticClass: "bmd-label-floating", attrs: { for: "customer" } },
      [
        _vm._v("Customer"),
        _c("strong", { staticClass: "text-danger" }, [_vm._v(" *")])
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "label",
      { staticClass: "bmd-label-floating", attrs: { for: "product" } },
      [
        _vm._v("Product"),
        _c("strong", { staticClass: "text-danger" }, [_vm._v(" *")])
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "label",
      { staticClass: "fs11 mb-0", attrs: { for: "service_time" } },
      [
        _vm._v("Service Date"),
        _c("strong", { staticClass: "text-danger" }, [_vm._v(" *")])
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "label",
      { staticClass: "bmd-label-floating", attrs: { for: "service_charge" } },
      [
        _vm._v("Service Charge"),
        _c("strong", { staticClass: "text-danger" }, [_vm._v(" *")])
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "label",
      { staticClass: "bmd-label-floating", attrs: { for: "total_paid" } },
      [
        _vm._v("Total Paid"),
        _c("strong", { staticClass: "text-danger" }, [_vm._v(" *")])
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", { staticClass: "select2-form-group text-primary" }, [
      _vm._v("Done by"),
      _c("strong", { staticClass: "text-danger" }, [_vm._v(" *")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "label",
      { staticClass: "bmd-label-floating", attrs: { for: "service_for" } },
      [
        _vm._v("Service Details"),
        _c("strong", { staticClass: "text-danger" }, [_vm._v(" *")])
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "modal-header" }, [
      _c(
        "h4",
        {
          staticClass: "font-weight-bold modal-title text-primary",
          attrs: { id: "timeChangeModalLabel" }
        },
        [
          _vm._v(
            "\n                        Change Customer Service\n                    "
          )
        ]
      ),
      _vm._v(" "),
      _c(
        "button",
        {
          staticClass: "close",
          attrs: {
            type: "button",
            "data-dismiss": "modal",
            "aria-label": "Close"
          }
        },
        [_c("span", { attrs: { "aria-hidden": "true" } }, [_vm._v("×")])]
      )
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "label",
      { staticClass: "bmd-label-floating", attrs: { for: "customer" } },
      [
        _vm._v("Customer"),
        _c("strong", { staticClass: "text-danger" }, [_vm._v(" *")])
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "label",
      { staticClass: "bmd-label-floating", attrs: { for: "product" } },
      [
        _vm._v("Product"),
        _c("strong", { staticClass: "text-danger" }, [_vm._v(" *")])
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "label",
      { staticClass: "bmd-label-floating", attrs: { for: "remarks" } },
      [
        _vm._v("Remarks"),
        _c("strong", { staticClass: "text-danger" }, [_vm._v(" *")])
      ]
    )
  }
]
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/Dashboard.vue":
/*!***********************************************!*\
  !*** ./resources/js/components/Dashboard.vue ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Dashboard_vue_vue_type_template_id_040e2ab9___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Dashboard.vue?vue&type=template&id=040e2ab9& */ "./resources/js/components/Dashboard.vue?vue&type=template&id=040e2ab9&");
/* harmony import */ var _Dashboard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Dashboard.vue?vue&type=script&lang=js& */ "./resources/js/components/Dashboard.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Dashboard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Dashboard_vue_vue_type_template_id_040e2ab9___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Dashboard_vue_vue_type_template_id_040e2ab9___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Dashboard.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Dashboard.vue?vue&type=script&lang=js&":
/*!************************************************************************!*\
  !*** ./resources/js/components/Dashboard.vue?vue&type=script&lang=js& ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./Dashboard.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Dashboard.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Dashboard.vue?vue&type=template&id=040e2ab9&":
/*!******************************************************************************!*\
  !*** ./resources/js/components/Dashboard.vue?vue&type=template&id=040e2ab9& ***!
  \******************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_template_id_040e2ab9___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./Dashboard.vue?vue&type=template&id=040e2ab9& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Dashboard.vue?vue&type=template&id=040e2ab9&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_template_id_040e2ab9___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_template_id_040e2ab9___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/partial/DashboardCustomerService.vue":
/*!**********************************************************************!*\
  !*** ./resources/js/components/partial/DashboardCustomerService.vue ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _DashboardCustomerService_vue_vue_type_template_id_a6a7d708___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DashboardCustomerService.vue?vue&type=template&id=a6a7d708& */ "./resources/js/components/partial/DashboardCustomerService.vue?vue&type=template&id=a6a7d708&");
/* harmony import */ var _DashboardCustomerService_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DashboardCustomerService.vue?vue&type=script&lang=js& */ "./resources/js/components/partial/DashboardCustomerService.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _DashboardCustomerService_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _DashboardCustomerService_vue_vue_type_template_id_a6a7d708___WEBPACK_IMPORTED_MODULE_0__["render"],
  _DashboardCustomerService_vue_vue_type_template_id_a6a7d708___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/partial/DashboardCustomerService.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/partial/DashboardCustomerService.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************!*\
  !*** ./resources/js/components/partial/DashboardCustomerService.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DashboardCustomerService_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./DashboardCustomerService.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/partial/DashboardCustomerService.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DashboardCustomerService_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/partial/DashboardCustomerService.vue?vue&type=template&id=a6a7d708&":
/*!*****************************************************************************************************!*\
  !*** ./resources/js/components/partial/DashboardCustomerService.vue?vue&type=template&id=a6a7d708& ***!
  \*****************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DashboardCustomerService_vue_vue_type_template_id_a6a7d708___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./DashboardCustomerService.vue?vue&type=template&id=a6a7d708& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/partial/DashboardCustomerService.vue?vue&type=template&id=a6a7d708&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DashboardCustomerService_vue_vue_type_template_id_a6a7d708___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DashboardCustomerService_vue_vue_type_template_id_a6a7d708___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/partial/SaleAndServiceBarChart.js":
/*!*******************************************************************!*\
  !*** ./resources/js/components/partial/SaleAndServiceBarChart.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue_chartjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-chartjs */ "./node_modules/vue-chartjs/es/index.js");

/* harmony default export */ __webpack_exports__["default"] = ({
  "extends": vue_chartjs__WEBPACK_IMPORTED_MODULE_0__["Bar"],
  props: {
    chartdata: {
      type: Object,
      "default": null
    },
    options: {
      type: Object,
      "default": null
    }
  },
  mounted: function mounted() {
    this.renderChart(this.chartdata, this.options);
  }
});

/***/ }),

/***/ "./resources/js/components/partial/ServiceLineChart.js":
/*!*************************************************************!*\
  !*** ./resources/js/components/partial/ServiceLineChart.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue_chartjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-chartjs */ "./node_modules/vue-chartjs/es/index.js");

/* harmony default export */ __webpack_exports__["default"] = ({
  "extends": vue_chartjs__WEBPACK_IMPORTED_MODULE_0__["Line"],
  props: {
    chartdata: {
      type: Object,
      "default": null
    },
    options: {
      type: Object,
      "default": null
    }
  },
  mounted: function mounted() {
    this.renderChart(this.chartdata, this.options);
  }
});

/***/ })

}]);