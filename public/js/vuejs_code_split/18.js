(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{tH32:function(t,a,s){"use strict";s.r(a);var r={data:function(){return{param:{query:"",sort:{column:"",sort_order:""}},products:[],pagination:{current_page:1,per_page:10}}},mounted:function(){this.getData()},methods:{getData:function(){var t=this;this.$Progress.start(),this.$jsHelper.get("api/v1/products?page="+this.pagination.current_page+"&per_page="+this.pagination.per_page+"&query="+this.param.query+"&sort_by="+this.param.sort.column+"&sort_order="+this.param.sort.sort_order).then((function(a){t.$Progress.finish(),t.products=a.data.data,t.pagination=a.data.meta})).catch((function(a){t.$Progress.fail(),t.$toaster.error("Something went wrong")}))},sort:function(t){this.param.sort.column=t.currentTarget.dataset.column,t.currentTarget.classList.contains("asc")?(this.param.sort.sort_order="DESC",this.getData()):(this.param.sort.sort_order="ASC",this.getData())},remove:function(t){var a=this;this.$swal("Are you sure to delete this product?").then((function(s){!0===s.isConfirmed&&a.$jsHelper.delete("api/v1/products/"+t.id).then((function(t){a.$Progress.finish(),a.$toaster.warning("Deleted successfully"),a.getData()})).catch((function(t){a.$Progress.fail(),a.$toaster.error("Something went wrong")}))}))}}},i=s("KHd+"),e=Object(i.a)(r,(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"content"},[s("div",{staticClass:"container-fluid"},[s("div",{staticClass:"row"},[s("div",{staticClass:"col-12"},[s("div",{staticClass:"card"},[s("div",{staticClass:"card-header card-header-rose card-header-icon"},[t._m(0),t._v(" "),s("div",{staticClass:"row"},[t._m(1),t._v(" "),s("div",{staticClass:"col-6 text-right pr-md-0"},[s("router-link",{staticClass:"btn btn-sm btn-primary mt-2",attrs:{to:"/products/form"}},[t._v("Add\n                                    "),s("div",{staticClass:"ripple-container"})])],1)])]),t._v(" "),s("div",{staticClass:"card-body"},[s("search",{attrs:{pagination:t.pagination,param:t.param},on:{limit:function(a){return t.getData()}}}),t._v(" "),s("div",{staticClass:"table-responsive"},[s("table",{staticClass:"table table-sortable"},[s("thead",[s("tr",[s("th",[t._v("SL#")]),t._v(" "),s("th",{staticClass:"sorting mw-80",attrs:{"data-column":"name"},on:{click:function(a){return t.sort(a)}}},[t._v("Name")]),t._v(" "),s("th",{staticClass:"sorting mw-80",attrs:{"data-column":"code"},on:{click:function(a){return t.sort(a)}}},[t._v("Code")]),t._v(" "),s("th",{staticClass:"sorting mw-125",attrs:{"data-column":"created_at"},on:{click:function(a){return t.sort(a)}}},[t._v("Created Date")]),t._v(" "),s("th",{staticClass:"text-right mw-80"},[t._v("\n                                            Actions\n                                        ")])])]),t._v(" "),s("tbody",t._l(t.products,(function(a,r){return s("tr",{key:a.id},[s("td",[t._v(t._s(t.pagination.from+r))]),t._v(" "),s("td",[t._v(t._s(a.name))]),t._v(" "),s("td",[t._v(t._s(a.code))]),t._v(" "),s("td",[t._v(t._s(a.created_at))]),t._v(" "),s("td",{staticClass:"td-actions text-right"},[s("router-link",{staticClass:"btn btn-success btn-round",attrs:{to:{name:"product_form",params:{id:a.id}},type:"button",rel:"tooltip","data-original-title":"",title:""}},[s("i",{staticClass:"material-icons"},[t._v("edit")])]),t._v(" "),s("button",{staticClass:"btn btn-danger btn-round",attrs:{type:"button",rel:"tooltip","data-original-title":"",title:""},on:{click:function(s){return s.preventDefault(),t.remove(a)}}},[s("i",{staticClass:"material-icons"},[t._v("close")])])],1)])})),0)])]),t._v(" "),s("pagination",{attrs:{pagination:t.pagination,offset:5},on:{paginate:function(a){return t.getData()}}})],1)])])])])])}),[function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"card-icon d-md-block d-none"},[a("i",{staticClass:"material-icons"},[this._v("assignment")])])},function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"col-6"},[a("h4",{staticClass:"card-title"},[this._v("Product List")])])}],!1,null,null,null);a.default=e.exports}}]);