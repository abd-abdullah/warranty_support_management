(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{eLFp:function(t,s,i){"use strict";i.r(s);var e={data:function(){return{form:{type:1,text:"",phone:[]},filter:{division_id:null,district_id:null,upazila_id:null,from_date:new Date,to_date:this.toDate()},param:{query:"",sort:{column:"",sort_order:""}},customers:[],pagination:{current_page:1,per_page:10},optionsDivision:[],optionsDistrict:[],optionsUpazila:[],optionsMessageType:[{id:1,text:"English"},{id:2,text:"Bangali"}],check_all:null,wordCount:0}},mounted:function(){this.getData(),this.getDropdown("api/v1/divisions/20","optionsDivision")},methods:{getData:function(){var t=this,s=null!=this.filter.from_date?this.filter.from_date.toISOString().split("T")[0]:null,i=null!=this.filter.to_date?this.filter.to_date.toISOString().split("T")[0]:null;this.$Progress.start(),this.$jsHelper.get("api/v1/customers?page="+this.pagination.current_page+"&per_page="+this.pagination.per_page+"&query="+this.param.query+"&sort_by="+this.param.sort.column+"&sort_order="+this.param.sort.sort_order+"&division_id="+this.filter.division_id+"&district_id="+this.filter.district_id+"&upazila_id="+this.filter.upazila_id+"&from_date="+s+"&to_date="+i).then((function(s){t.$Progress.finish(),t.customers=s.data.data,t.pagination=s.data.meta})).catch((function(s){t.$Progress.fail(),t.$toaster.error("Something went wrong")}))},resetFilter:function(){this.filter.division_id=null,this.filter.district_id=null,this.filter.upazila_id=null,this.filter.from_date=null,this.filter.to_date=null,this.getData()},sort:function(t){this.param.sort.column=t.currentTarget.dataset.column,t.currentTarget.classList.contains("asc")?(this.param.sort.sort_order="DESC",this.getData()):(this.param.sort.sort_order="ASC",this.getData())},getDropdown:function(t,s){var i=this;this.$jsHelper.get(t).then((function(t){i[s]=t.data.map((function(t){return{id:t.id,text:t.name}}))})).catch((function(t){}))},selectOption:function(){this.getDropdown("api/v1/divisions/20","optionsDivision"),this.getDropdown("api/v1/districts/"+this.form.division_id,"optionsDistrict"),this.getDropdown("api/v1/upazilas/"+this.form.district_id,"optionsUpazila")},checkAll:function(t){t.currentTarget.checked?$(".sms_send").prop("checked",!0):$(".sms_send").prop("checked",!1)},sendMessage:function(t){var s=this;if(""!=this.form.text)if(null!=this.form.type){var i=[];$(".sms_send:checked").each((function(){i.push($(this).val())})),this.form.phone=i,this.form.phone.length>0?(this.$buttonLoader(t),this.$Progress.start(),this.$jsHelper.put("api/v1/sms-send",this.form).then((function(i){1===i.data?(s.$Progress.finish(),s.$toaster.info("Successfully Send"),s.form.phone=[],s.form.text="",s.form.type=1,s.wordCount=0,s.$buttonLoader(t),$("#checkAll").prop("checked",!1),$(".sms_send").prop("checked",!1)):(s.$Progress.fail(),s.$buttonLoader(t),s.$toaster.error("Something went wrong"))})).catch((function(i){s.$Progress.fail(),s.$buttonLoader(t),s.$toaster.error("Something went wrong")}))):this.$toaster.error("Please select at least one customer to send SMS.")}else this.$toaster.error("Message language Type");else this.$toaster.error("Write Some text to send SMS")},countWord:function(){this.wordCount=$("#text").val().length},toDate:function(){var t=new Date;return new Date(t.setDate(t.getDate()+7))}}},a=i("KHd+"),o=Object(a.a)(e,(function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"content"},[i("div",{staticClass:"container-fluid"},[i("div",{staticClass:"row"},[i("div",{staticClass:"col-12"},[i("div",{staticClass:"card"},[t._m(0),t._v(" "),i("div",{staticClass:"row m-0 mt-3"},[i("div",{staticClass:"col-md-2 col-sm-4"},[i("div",{staticClass:"form-group"},[i("label",{staticClass:"select2-form-group"},[t._v("Division")]),t._v(" "),i("Select2",{attrs:{options:t.optionsDivision,name:"division_id",id:"division",placeholder:"Select Division"},on:{change:function(s){return t.getDropdown("api/v1/districts/"+t.filter.division_id,"optionsDistrict")}},model:{value:t.filter.division_id,callback:function(s){t.$set(t.filter,"division_id",s)},expression:"filter.division_id"}})],1)]),t._v(" "),i("div",{staticClass:"col-md-2 col-sm-4"},[i("div",{staticClass:"form-group"},[i("label",{staticClass:"select2-form-group"},[t._v("District")]),t._v(" "),i("Select2",{attrs:{options:t.optionsDistrict,name:"district_id",id:"district",placeholder:"Select District"},on:{change:function(s){return t.getDropdown("api/v1/upazilas/"+t.filter.district_id,"optionsUpazila")}},model:{value:t.filter.district_id,callback:function(s){t.$set(t.filter,"district_id",s)},expression:"filter.district_id"}})],1)]),t._v(" "),i("div",{staticClass:"col-md-2 col-sm-4"},[i("div",{staticClass:"form-group"},[i("label",{staticClass:"select2-form-group"},[t._v("Upazila")]),t._v(" "),i("Select2",{attrs:{options:t.optionsUpazila,name:"upazila_id",id:"upazila",placeholder:"Select Upazila"},model:{value:t.filter.upazila_id,callback:function(s){t.$set(t.filter,"upazila_id",s)},expression:"filter.upazila_id"}})],1)]),t._v(" "),i("div",{staticClass:"col-md-2 col-sm-4 pt-2"},[i("label",{staticClass:"select2-form-group"},[t._v("From Date")]),t._v(" "),i("v-date-picker",{attrs:{popover:{visibility:"click"}},scopedSlots:t._u([{key:"default",fn:function(s){var e=s.inputValue,a=s.inputEvents;return[i("input",t._g({staticClass:"bg-white border border-bottom-0 form-control px-2 py-1 rounded",domProps:{value:e}},a))]}}]),model:{value:t.filter.from_date,callback:function(s){t.$set(t.filter,"from_date",s)},expression:"filter.from_date"}})],1),t._v(" "),i("div",{staticClass:"col-md-2 col-sm-4 pt-2"},[i("label",{staticClass:"select2-form-group"},[t._v("To Date")]),t._v(" "),i("v-date-picker",{attrs:{popover:{visibility:"click"}},scopedSlots:t._u([{key:"default",fn:function(s){var e=s.inputValue,a=s.inputEvents;return[i("input",t._g({staticClass:"bg-white border border-bottom-0 form-control px-2 py-1 rounded",domProps:{value:e}},a))]}}]),model:{value:t.filter.to_date,callback:function(s){t.$set(t.filter,"to_date",s)},expression:"filter.to_date"}})],1),t._v(" "),i("div",{staticClass:"col-md-2 col-sm-4 pl-0 pr-0"},[i("button",{staticClass:"btn btn-sm pl-md-2 pl-lg-3 pr-md-2 pr-lg-3 btn-primary mt-2",on:{click:t.getData}},[t._v("Filter"),i("span",{staticClass:"spinner"})]),t._v(" "),i("button",{staticClass:"btn btn-sm pl-md-2 pl-lg-3 pr-md-2 pr-lg-3 btn-danger mt-2",on:{click:t.resetFilter}},[t._v("Reset"),i("span",{staticClass:"spinner"})])])]),t._v(" "),i("div",{staticClass:"card-body"},[i("search",{attrs:{pagination:t.pagination,param:t.param},on:{limit:function(s){return t.getData()}}}),t._v(" "),i("div",{staticClass:"table-responsive"},[i("table",{staticClass:"table table-sortable"},[i("thead",[i("tr",[i("th",[t._v("SL#")]),t._v(" "),i("th",{staticClass:"sorting mw-80",attrs:{"data-column":"users.name"},on:{click:function(s){return t.sort(s)}}},[t._v("Name")]),t._v(" "),i("th",{staticClass:"sorting mw-80",attrs:{"data-column":"users.phone"},on:{click:function(s){return t.sort(s)}}},[t._v("Mobile")]),t._v(" "),i("th",{staticClass:"sorting mw-120",attrs:{"data-column":"customerId"},on:{click:function(s){return t.sort(s)}}},[t._v("Customer ID")]),t._v(" "),i("th",{staticClass:"sorting mw-80",attrs:{"data-column":"customer_types.name"},on:{click:function(s){return t.sort(s)}}},[t._v("Type")]),t._v(" "),i("th",{staticClass:"mw-100"},[t._v("Address")]),t._v(" "),i("th",[i("div",{staticClass:"togglebutton"},[i("label",[i("input",{directives:[{name:"model",rawName:"v-model",value:t.check_all,expression:"check_all"}],attrs:{id:"checkAll",type:"checkbox"},domProps:{checked:Array.isArray(t.check_all)?t._i(t.check_all,null)>-1:t.check_all},on:{change:[function(s){var i=t.check_all,e=s.target,a=!!e.checked;if(Array.isArray(i)){var o=t._i(i,null);e.checked?o<0&&(t.check_all=i.concat([null])):o>-1&&(t.check_all=i.slice(0,o).concat(i.slice(o+1)))}else t.check_all=a},t.checkAll]}}),t._v(" "),i("span",{staticClass:"toggle"}),t._v("\n                                                    Select All\n                                                ")])])])])]),t._v(" "),i("tbody",t._l(t.customers,(function(s,e){return i("tr",{key:s.id},[i("td",[t._v(t._s(t.pagination.from+e))]),t._v(" "),i("td",[i("router-link",{attrs:{to:{name:"customer_view",params:{id:s.id}},target:"_blank"}},[t._v(t._s(s.name))])],1),t._v(" "),i("td",[t._v(t._s(s.phone))]),t._v(" "),i("td",[t._v(t._s(s.customerId))]),t._v(" "),i("td",[t._v(t._s(s.customer_type))]),t._v(" "),i("td",[t._v(t._s((""!=s.address&&null!=s.address?s.address+", ":"")+(""!=s.upazila?s.upazila+", ":"")+(""!=s.district?s.district+", ":"")+(""!=s.division?s.division+", ":"")+(""!=s.country?s.country:"")))]),t._v(" "),i("td",[i("div",{staticClass:"togglebutton"},[i("label",[i("input",{staticClass:"sms_send",attrs:{type:"checkbox"},domProps:{value:s.phone}}),t._v(" "),i("span",{staticClass:"toggle"})])])])])})),0)])]),t._v(" "),i("pagination",{attrs:{pagination:t.pagination,offset:5},on:{paginate:function(s){return t.getData()}}})],1)]),t._v(" "),i("div",{staticClass:"card"},[i("div",{staticClass:"row m-0 mt-3"},[i("div",{staticClass:"col-sm-12 col-md-6"},[i("div",{staticClass:"form-group"},[t._m(1),t._v(" "),i("Select2",{attrs:{options:t.optionsMessageType,placeholder:"Select Message Language"},model:{value:t.form.type,callback:function(s){t.$set(t.form,"type",s)},expression:"form.type"}})],1)]),t._v(" "),i("div",{staticClass:"col-12"},[i("div",{staticClass:"form-group bmd-form-group ",class:{"is-filled":null!==t.form.text}},[i("label",{staticClass:"bmd-label-floating",attrs:{for:"text"}},[t._v("Message"),i("strong",{staticClass:"text-danger"},[t._v(" *")]),t._v(" "),i("span",{staticClass:"font-weight-bolder text-info"},[t._v("Characters:("),i("span",[t._v(t._s(t.wordCount))]),t._v(")")])]),t._v(" "),i("textarea",{directives:[{name:"model",rawName:"v-model",value:t.form.text,expression:"form.text"}],staticClass:"form-control",attrs:{type:"text",id:"text",rows:"5"},domProps:{value:t.form.text},on:{keyup:t.countWord,input:function(s){s.target.composing||t.$set(t.form,"text",s.target.value)}}})])])]),t._v(" "),i("div",{staticClass:"card-footer ml-auto"},[i("button",{staticClass:"btn btn-primary",attrs:{type:"submit"},on:{click:function(s){return s.preventDefault(),t.sendMessage(s)}}},[t._v("\n                            Send"),i("span",{staticClass:"spinner"})])])])])])])])}),[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"card-header card-header-rose card-header-icon"},[s("div",{staticClass:"card-icon d-md-block d-none"},[s("i",{staticClass:"material-icons"},[this._v("youtube_searched_for")])]),this._v(" "),s("div",{staticClass:"row"},[s("div",{staticClass:"col-6"},[s("h4",{staticClass:"card-title"},[this._v("Search Customer")])])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("label",{staticClass:"select2-form-group"},[this._v("Message Language Type"),s("strong",{staticClass:"text-danger"},[this._v(" *")])])}],!1,null,null,null);s.default=o.exports}}]);