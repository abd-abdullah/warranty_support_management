<template>
    <div>
        <div class="card mt-0">
            <div
                class="card-header card-header-rose card-header-icon"
            >
                <div class="row">
                    <div class="col-sm-12 col-md-3">
                        <h4 class="card-title">
                            Upcoming Service List
                        </h4>
                    </div>
                    <div class="col-sm-12 col-md-9">
                        <div class="row">
                            <div class="col-5">
                                <div class="float-left float-md-right mt-2">
                                    <div class="row">
                                        <label class="col-form-label">From <span class="d-sm-none d-md-inline">Date</span></label>
                                        <div class="col-sm-8 pr-0">
                                            <v-date-picker v-model="filter.from_date" :popover ="{ visibility: 'click'}">
                                                <template v-slot="{ inputValue, inputEvents }">
                                                    <input
                                                    class="bg-white border border-bottom-0 form-control px-2 py-1 rounded"
                                                    :value="inputValue"
                                                    v-on="inputEvents"
                                                    />
                                                </template>
                                            </v-date-picker>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-5">
                                <div class="float-left float-md-right mt-2">
                                    <div class="row">
                                        <label class="col-form-label">To <span class="d-sm-none d-md-inline">Date</span></label>
                                        <div class="col-sm-8 pr-0">
                                             <v-date-picker v-model="filter.to_date" :popover ="{ visibility: 'click'}">
                                                <template v-slot="{ inputValue, inputEvents }">
                                                    <input
                                                    class="bg-white border border-bottom-0 form-control px-2 py-1 rounded"
                                                    :value="inputValue"
                                                    v-on="inputEvents"
                                                    />
                                                </template>
                                            </v-date-picker>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-2">
                                <button @click="getData" class="btn btn-sm btn-primary mt-2 float-right">Filter<span class="spinner"></span></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <search
                    :pagination="pagination"
                    :param="param"
                    @limit="getData()"
                ></search>
                <div class="table-responsive">
                    <table class="table table-sortable">
                        <thead>
                            <tr>
                                <th>SL#</th>
                                <th
                                    v-on:click="sort($event)"
                                    data-column="name"
                                    class="sorting mw-120"
                                >
                                    Customer
                                </th>
                                
                                <th
                                    v-on:click="sort($event)"
                                    data-column="phone"
                                    class="sorting"
                                >
                                    Phone
                                </th>
                                
                                <th class="mw-180">Address</th>
                                <th>Invoice</th>
                                <th 
                                    v-on:click="sort($event)"
                                    data-column="zone_id"
                                    class="sorting mw-80"
                                    >Zone</th>
                                <th
                                    v-on:click="sort($event)"
                                    data-column="products.name"
                                    class="sorting mw-180"
                                >
                                    Product Name
                                </th>
                                <th class="mw-155">
                                    Next Service Date
                                </th>
                                <th class="mw-80 text-right">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="(sale, index) in sales"
                                :key="sale.id"
                            >
                                <td>
                                    {{ pagination.from + index }}
                                </td>
                                <td class="ws-pre"><router-link :to="{ name: 'customer_view', params:{'id':sale.id}}" target="_blank">{{
                                    sale.name+'\n'+
                                    sale.customerId+'\n'+
                                    sale.phone
                                }}</router-link></td>
                                <td>{{sale.phone}}</td>
                                <td>
                                    {{
                                        (sale.address != "" &&
                                        sale.address != null
                                            ? sale.address + ", "
                                            : "") +
                                            (sale.upazila != ""
                                                ? sale.upazila +
                                                    ", "
                                                : "") +
                                            (sale.district != ""
                                                ? sale.district +
                                                    ", "
                                                : "") +
                                            (sale.division != ""
                                                ? sale.division +
                                                    ", "
                                                : "") +
                                            (sale.country != ""
                                                ? sale.country
                                                : "")
                                    }}
                                </td>
                                <td>{{sale.invoice}}</td>
                                <td>{{sale.zone}}</td>
                                <td>
                                    {{ 
                                        sale.product_name+' >> '+
                                        sale.product_code
                                        }}
                                </td>
                                <td>
                                    {{ sale.next_service_time }}
                                </td>
                                <td class="td-actions text-right">
                                    <button
                                        @click.prevent="
                                            service(sale)
                                        "
                                        type="button"
                                        rel="tooltip"
                                        class="btn btn-facebook btn-round"
                                        title="Add Service"
                                    >
                                        <span class="material-icons"
                                            >add_box</span
                                        >
                                    </button>
                                    <button
                                        @click.prevent="
                                            serviceChange(sale)
                                        "
                                        type="button"
                                        rel="tooltip"
                                        class="btn btn-linkedin btn-round"
                                        title="Change Time"
                                    >
                                        <span class="material-icons"
                                            >published_with_changes</span
                                        >
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <pagination
                    :pagination="pagination"
                    :offset="5"
                    @paginate="getData()"
                ></pagination>
            </div>
        </div>

        <!-- Modal service add -->
        <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="exampleModalLabel">
                            Customer Service
                        </h4>
                        <button
                            type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="page-categories">
                            <ul
                                class="nav nav-pills nav-pills-warning nav-pills-icons justify-content-center"
                                role="tablist"
                            >
                                <li class="nav-item">
                                    <a
                                        class="nav-link active show"
                                        data-toggle="tab"
                                        href="#link7"
                                        role="tablist"
                                        >Add Service</a
                                    >
                                </li>
                            </ul>
                            <div
                                class="tab-content"
                            >
                                <div class="tab-pane  active show" id="link7">
                                    <div class="card">
                                        <div class="card-body">
                                            <form>
                                                <div class="row">
                                                    <div class="col-md-6 col-sm-12">
                                                        <div
                                                            class="form-group bmd-form-group"
                                                            v-bind:class="{
                                                                'is-filled':
                                                                    form.customer !== null
                                                            }"
                                                        >
                                                            <label
                                                                class="bmd-label-floating"
                                                                 for="customer"
                                                                >Customer<strong class="text-danger"> *</strong></label
                                                            >
                                                            <input
                                                                type="text"
                                                                class="form-control"
                                                                readonly
                                                                v-model="form.customer"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6 col-sm-12">
                                                        <div
                                                            class="form-group bmd-form-group"
                                                            v-bind:class="{
                                                                'is-filled':
                                                                    form.product !== null
                                                            }"
                                                        >
                                                            <label
                                                                class="bmd-label-floating"
                                                                for="product"
                                                                >Product<strong class="text-danger"> *</strong></label
                                                            >
                                                            <input
                                                                type="text"
                                                                class="form-control"
                                                                readonly
                                                                v-model="form.product"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6 col-sm-12">
                                                        <div>
                                                            <label
                                                                for="service_time"
                                                                class="fs11 mb-0"
                                                                >Service Date<strong class="text-danger"> *</strong></label
                                                            >
                                                            <v-date-picker v-model="form.service_time" :popover ="{ visibility: 'click'}">
                                                                <template v-slot="{ inputValue, inputEvents }">
                                                                    <input
                                                                    class="bg-white border border-bottom-0 form-control px-2 py-1 rounded"
                                                                    :value="inputValue"
                                                                    v-on="inputEvents"
                                                                    />
                                                                </template>
                                                            </v-date-picker>
                                                            <span
                                                                class="text-danger"
                                                                v-if="
                                                                    errors.service_time
                                                                "
                                                                >{{
                                                                    errors
                                                                        .service_time[0]
                                                                }}</span
                                                            >
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6 col-sm-12">
                                                        <div>
                                                            <label
                                                                for="next_service_time"
                                                                class="fs11 mb-0"
                                                                >Next Service Date</label
                                                            >
                                                            <v-date-picker v-model="form.next_service_time" :popover ="{ visibility: 'click'}">
                                                                <template v-slot="{ inputValue, inputEvents }">
                                                                    <input
                                                                    class="bg-white border border-bottom-0 form-control px-2 py-1 rounded"
                                                                    :value="inputValue"
                                                                    v-on="inputEvents"
                                                                    />
                                                                </template>
                                                            </v-date-picker>
                                                            
                                                            <span
                                                                class="text-danger"
                                                                v-if="
                                                                    errors.next_service_time
                                                                "
                                                                >{{
                                                                    errors
                                                                        .next_service_time[0]
                                                                }}</span
                                                            >
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6 col-sm-12">
                                                        <div
                                                            class="form-group bmd-form-group"
                                                            v-bind:class="{
                                                                'is-filled':
                                                                    form.service_charge !== null
                                                            }"
                                                        >
                                                            <label
                                                                for="service_charge"
                                                                class="bmd-label-floating"
                                                                >Service Charge<strong class="text-danger"> *</strong></label
                                                            >
                                                            <input
                                                                type="text"
                                                                class="form-control"
                                                                id="service_charge"
                                                                v-model="form.service_charge"
                                                            />
                                                            <span
                                                                class="text-danger"
                                                                v-if="errors.service_charge"
                                                                >{{
                                                                    errors.service_charge[0]
                                                                }}</span
                                                            >
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6 col-sm-12">
                                                        <div
                                                            class="form-group bmd-form-group"
                                                            v-bind:class="{
                                                                'is-filled':
                                                                    form.total_paid !== null
                                                            }"
                                                        >
                                                            <label
                                                                for="total_paid"
                                                                class="bmd-label-floating"
                                                                >Total Paid<strong class="text-danger"> *</strong></label
                                                            >
                                                            <input
                                                                type="text"
                                                                class="form-control"
                                                                id="total_paid"
                                                                v-model="form.total_paid"
                                                            />
                                                            <span
                                                                class="text-danger"
                                                                v-if="errors.total_paid"
                                                                >{{
                                                                    errors.total_paid[0]
                                                                }}</span
                                                            >
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6 col-sm-12">
                                                        <div
                                                            class="form-group bmd-form-group"
                                                            v-bind:class="{
                                                                'is-filled':
                                                                    form.cost !== null
                                                            }"
                                                        >
                                                            <label
                                                                for="cost"
                                                                class="bmd-label-floating"
                                                                >Total Cost</label
                                                            >
                                                            <input
                                                                type="text"
                                                                class="form-control"
                                                                id="cost"
                                                                v-model="form.cost"
                                                            />
                                                            <span
                                                                class="text-danger"
                                                                v-if="errors.cost"
                                                                >{{
                                                                    errors.cost[0]
                                                                }}</span
                                                            >
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6 col-sm-12">
                                                        <div class="form-group">
                                                            <label
                                                                class="select2-form-group text-primary"
                                                                >Done by<strong class="text-danger"> *</strong></label
                                                            >
                                                            <Select2
                                                                :options="
                                                                    optionsServiceMen
                                                                "
                                                                v-model="
                                                                    form.done_by
                                                                "
                                                                placeholder="Select Technician"
                                                            />
                                                            <span
                                                                class="text-danger"
                                                                v-if="errors.done_by"
                                                                >{{
                                                                    errors.done_by[0]
                                                                }}</span
                                                            >
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6 col-sm-12">
                                                        <div
                                                            class="form-group bmd-form-group "
                                                            v-bind:class="{
                                                                'is-filled':
                                                                    form.service_for !== null
                                                            }"
                                                        >
                                                            <label
                                                                for="service_for"
                                                                class="bmd-label-floating"
                                                                >Service Details<strong class="text-danger"> *</strong></label
                                                            >
                                                            <textarea
                                                                type="text"
                                                                class="form-control"
                                                                id="service_for"
                                                                v-model="form.service_for"
                                                            />
                                                            <span
                                                                class="text-danger"
                                                                v-if="errors.service_for"
                                                                >{{ errors.service_for[0] }}</span
                                                            >
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6 col-sm-12">
                                                        <div
                                                            class="form-group bmd-form-group "
                                                            v-bind:class="{
                                                                'is-filled':
                                                                    form.remarks !== null
                                                            }"
                                                        >
                                                            <label
                                                                for="remarks"
                                                                class="bmd-label-floating"
                                                                >Remarks</label
                                                            >
                                                            <textarea
                                                                type="text"
                                                                class="form-control"
                                                                id="remarks"
                                                                v-model="form.remarks"
                                                            />
                                                            <span
                                                                class="text-danger"
                                                                v-if="errors.remarks"
                                                                >{{ errors.remarks[0] }}</span
                                                            >
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6 col-sm-12">
                                                        <div class="togglebutton">
                                                            <label>
                                                                <input type="checkbox" v-model="form.is_continue">
                                                                <span class="toggle"></span>
                                                                Service Continue
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-secondary"
                            data-dismiss="modal"
                        >
                            Close
                        </button>
                        <button type="button" @click.prevent="add" class="btn btn-primary">
                            Submit<span class="spinner"></span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
       
        <!-- Modal service time change -->
        <div
            class="modal fade"
            id="timeChangeModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="timeChangeModalLabel"
            aria-hidden="true"
        >
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="font-weight-bold modal-title text-primary" id="timeChangeModalLabel">
                            Change Customer Service
                        </h4>
                        <button
                            type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="card">
                            <div class="card-body">
                            <form>
                                <div class="row">
                                    <div class="col-md-6 col-sm-12">
                                        <div
                                            class="form-group bmd-form-group"
                                            v-bind:class="{
                                                'is-filled':
                                                    form.customer !== null
                                            }"
                                        >
                                            <label
                                                class="bmd-label-floating"
                                                    for="customer"
                                                >Customer<strong class="text-danger"> *</strong></label
                                            >
                                            <input
                                                type="text"
                                                class="form-control"
                                                readonly
                                                v-model="form.customer"
                                            />
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-12">
                                        <div
                                            class="form-group bmd-form-group"
                                            v-bind:class="{
                                                'is-filled':
                                                    form.product !== null
                                            }"
                                        >
                                            <label
                                                class="bmd-label-floating"
                                                for="product"
                                                >Product<strong class="text-danger"> *</strong></label
                                            >
                                            <input
                                                type="text"
                                                class="form-control"
                                                readonly
                                                v-model="form.product"
                                            />
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-12">
                                        <div>
                                            <label
                                                for="next_service_time"
                                                class="fs11 mb-0"
                                                >Next Service Date</label
                                            >
                                            <v-date-picker v-model="form.next_service_time" :popover ="{ visibility: 'click'}">
                                                <template v-slot="{ inputValue, inputEvents }">
                                                    <input
                                                    class="bg-white border border-bottom-0 form-control px-2 py-1 rounded"
                                                    :value="inputValue"
                                                    v-on="inputEvents"
                                                    />
                                                </template>
                                            </v-date-picker>
                                            <span
                                                class="text-danger"
                                                v-if="
                                                    errors.next_service_time
                                                "
                                                >{{
                                                    errors
                                                        .next_service_time[0]
                                                }}</span
                                            >
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-12">
                                        <div
                                            class="form-group bmd-form-group "
                                            v-bind:class="{
                                                'is-filled':
                                                    form.remarks !== null
                                            }"
                                        >
                                            <label
                                                for="remarks"
                                                class="bmd-label-floating"
                                                >Remarks<strong class="text-danger"> *</strong></label
                                            >
                                            <textarea
                                                type="text"
                                                class="form-control"
                                                id="remarks"
                                                v-model="form.remarks"
                                            />
                                            <span
                                                class="text-danger"
                                                v-if="errors.remarks"
                                                >{{ errors.remarks[0] }}</span
                                            >
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-12">
                                        <div class="togglebutton">
                                            <label>
                                                <input type="checkbox" v-model="form.is_continue">
                                                <span class="toggle"></span>
                                                Service Continue
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-secondary"
                            data-dismiss="modal"
                        >
                            Close
                        </button>
                        <button type="button" @click.prevent="changeAdd" class="btn btn-primary">
                            Change Service Time<span class="spinner"></span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
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
            filter:{
                from_date: new Date(),
                to_date: this.toDate(),
            },
            form:{
                customer : null,
                product : null,
                sale_id : null,
                service_time : null,
                service_for : null,
                next_service_time : null,
                remarks : null,
                service_charge : null,
                total_paid : null,
                cost : null,
                done_by : null,
                is_continue : true,
            },
            errors: [],
            optionsServiceMen: []
        };
    },
    mounted() {
        this.getData();
        this.$Progress.start();
            this.$jsHelper.get('api/v1/technicians-all').then(response => {
                    this.optionsServiceMen = response.data.data.map(function(val){
                        return {id:val.id, text:val.name+' ('+val.phone+')'}
                    });
                this.$Progress.finish();
            }).catch(error => {
                this.$Progress.fail();
        });
    },
    methods: {
        toDate(){
            let date = new Date();
            return new Date(date.setDate(date.getDate() + 7));
        },
        getData() {
            let fromDate = (this.filter.from_date != null)? this.filter.from_date.toISOString().split('T')[0]:null;
            let toDate = (this.filter.to_date != null)? this.filter.to_date.toISOString().split('T')[0]:null;
            this.$Progress.start();
            this.$jsHelper
                .get(
                    "api/v1/sales-dashboard?page=" +
                        this.pagination.current_page +
                        "&per_page=" +
                        this.pagination.per_page +
                        "&query=" +
                        this.param.query +
                        "&sort_by=" +
                        this.param.sort.column +
                        "&sort_order=" +
                        this.param.sort.sort_order +
                        "&from_date=" +
                        fromDate +
                        "&to_date=" +
                        toDate
                )
                .then(response => {
                    this.$Progress.finish();
                    this.sales = response.data.data;
                    this.pagination = response.data.meta;
                })
                .catch(e => {
                    this.$Progress.fail();
                    this.$toaster.error("Something went wrong");
                });
        },
        sort(event) {
            this.param.sort.column = event.currentTarget.dataset.column;
            if (event.currentTarget.classList.contains("asc")) {
                this.param.sort.sort_order = "DESC";
                this.getData();
            } else {
                this.param.sort.sort_order = "ASC";
                this.getData();
            }
        },
        
        service(sale) {
            this.errors = [];
            this.form.customer = sale.name+'-'+sale.customerId;
            this.form.product = sale.product_name+'-'+sale.product_code;
            this.form.sale_id = sale.id;
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
        serviceChange(sale) {
            this.errors = [];
            this.form.customer = sale.name+'-'+sale.customerId;
            this.form.product = sale.product_name+'-'+sale.product_code;
            this.form.sale_id = sale.id;
            this.form.next_service_time = null;
            this.form.remarks = null;
            this.form.is_continue = true;
            $("#timeChangeModal").modal("show");
        },
        add(e) {
            this.$buttonLoader(e);
            this.$Progress.start();
            this.$jsHelper
                .post("api/v1/customer-services", this.form)
                .then(data => {
                    this.$buttonLoader(e);
                    this.$Progress.finish();
                    this.$toaster.success("Successfully Added");
                    this.getData();
                    $("#exampleModal").modal("hide");
                })
                .catch(error => {
                    this.$Progress.fail();
                    this.$buttonLoader(e);
                    if (error.response.status === 422) {
                        this.errors = error.response.data.errors;
                    }
                    else{
                        this.$toaster.error("Something went wrong");
                    }
                });
        },
        changeAdd(e) {
            this.$buttonLoader(e);
            this.$Progress.start();
            this.$jsHelper
                .post("api/v1/customer-services/change", this.form)
                .then(data => {
                    this.$buttonLoader(e);
                    this.$Progress.finish();
                    this.$toaster.success("Successfully Changed");
                    this.getData();
                    $("#timeChangeModal").modal("hide");
                })
                .catch(error => {
                    this.$Progress.fail();
                    this.$buttonLoader(e);
                    if (error.response.status === 422) {
                        this.errors = error.response.data.errors;
                    }
                    else{
                        this.$toaster.error("Something went wrong");
                    }
                });
        },
    }
};
</script>

<style></style>
