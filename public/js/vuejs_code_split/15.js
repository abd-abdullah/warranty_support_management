(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{KDWD:function(t,s,e){"use strict";e.r(s);var r={data:function(){return{isEdit:void 0!==this.$route.params.id&&null!=this.$route.params.id,id:this.$route.params.id,form:{name:null},errors:[]}},mounted:function(){var t=this;this.isEdit&&(this.$Progress.start(),this.$jsHelper.get("api/v1/customer-types/"+this.id).then((function(s){t.$Progress.finish(),t.form.name=s.data.data.name})).catch((function(s){t.$Progress.fail(),t.$toaster.error("Something went wrong")})))},methods:{add:function(t){var s=this;this.$buttonLoader(t),this.$Progress.start(),this.$jsHelper.post("api/v1/customer-types",this.form).then((function(t){s.$Progress.finish(),s.$toaster.success("Successfully Added"),setTimeout((function(){return s.$router.push({name:"customer_type"})}),1e3)})).catch((function(e){s.$Progress.fail(),s.$buttonLoader(t),422===e.response.status?s.errors=e.response.data.errors:s.$toaster.error("Something went wrong")}))},update:function(t){var s=this;this.$buttonLoader(t),this.$Progress.start(),this.$jsHelper.put("api/v1/customer-types/"+this.id,this.form).then((function(t){s.$Progress.finish(),s.$toaster.info("Successfully Updated"),setTimeout((function(){return s.$router.push({name:"customer_type"})}),1e3)})).catch((function(e){s.$Progress.fail(),s.$buttonLoader(t),422===e.response.status?s.errors=e.response.data.errors:s.$toaster.error("Something went wrong")}))}}},a=e("KHd+"),i=Object(a.a)(r,(function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"content"},[e("div",{staticClass:"container-fluid"},[e("div",{staticClass:"row"},[e("div",{staticClass:"offset-md-3 col-md-6"},[e("div",{staticClass:"card"},[e("div",{staticClass:"card-header card-header-rose card-header-icon"},[t._m(0),t._v(" "),e("div",{staticClass:"row"},[e("div",{staticClass:"col-sm-12 col-md-6"},[t.isEdit?e("h4",{staticClass:"card-title"},[t._v("\n                                    Edit Customer Type\n                                ")]):e("h4",{staticClass:"card-title"},[t._v("\n                                    Add Customer Type\n                                ")])]),t._v(" "),e("div",{staticClass:"col-sm-12 col-md-6 text-right pr-md-0"},[e("router-link",{staticClass:"btn btn-sm btn-primary",attrs:{to:"/customer-types"}},[t._v("Back to list")])],1)])]),t._v(" "),e("div",{staticClass:"card-body"},[e("form",{attrs:{action:""}},[e("div",{staticClass:"row"},[e("div",{staticClass:"col-12"},[e("div",{staticClass:"form-group bmd-form-group",class:{"is-filled":null!==t.form.name}},[t._m(1),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.form.name,expression:"form.name"}],staticClass:"form-control",attrs:{type:"text",id:"name"},domProps:{value:t.form.name},on:{input:function(s){s.target.composing||t.$set(t.form,"name",s.target.value)}}}),t._v(" "),t.errors.name?e("span",{staticClass:"text-danger"},[t._v(t._s(t.errors.name[0]))]):t._e()])])])])]),t._v(" "),e("div",{staticClass:"card-footer ml-auto"},[t.isEdit?e("button",{staticClass:"btn btn-primary",attrs:{type:"submit"},on:{click:function(s){return s.preventDefault(),t.update(s)}}},[t._v("\n                            Update"),e("span",{staticClass:"spinner"})]):e("button",{staticClass:"btn btn-primary",attrs:{type:"submit"},on:{click:function(s){return s.preventDefault(),t.add(s)}}},[t._v("\n                            Add"),e("span",{staticClass:"spinner"})])])])])])])])}),[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"card-icon"},[s("i",{staticClass:"material-icons"},[this._v("filter_none")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("label",{staticClass:"bmd-label-floating",attrs:{for:"name"}},[this._v("Name"),s("strong",{staticClass:"text-danger"},[this._v(" *")])])}],!1,null,null,null);s.default=i.exports}}]);