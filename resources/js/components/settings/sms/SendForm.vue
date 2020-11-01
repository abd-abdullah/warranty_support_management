<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="card-header card-header-rose card-header-icon">
                            <div class="card-icon d-md-block d-none">
                                <i class="material-icons">youtube_searched_for</i>
                            </div>
                            <div class="row">
                                <div class="col-6">
                                    <h4 class="card-title">Search Customer</h4>
                                </div>
                            </div>
                        </div>
                        <div class="row m-0 mt-3">
                            <div class="col-md-3 col-sm-6">
                                <div class="form-group">
                                    <label
                                        class="select2-form-group"
                                        >Division</label
                                    >
                                    <Select2
                                        :options="optionsDivision"
                                        v-model="filter.division_id"
                                        name="division_id"
                                        id="division"
                                        @change="getDropdown('api/v1/districts/'+filter.division_id, 'optionsDistrict')"
                                        placeholder="Select Division"
                                    />
                                </div>
                            </div>
                            <div class="col-md-3 col-sm-6">
                                <div class="form-group">
                                    <label
                                        class="select2-form-group"
                                        >District</label
                                    >
                                    <Select2
                                        :options="optionsDistrict"
                                        v-model="filter.district_id"
                                        name="district_id"
                                        id="district"
                                        @change="getDropdown('api/v1/upazilas/'+filter.district_id, 'optionsUpazila')"
                                        placeholder="Select District"
                                    />
                                </div>
                            </div>
                            <div class="col-md-3 col-sm-6">
                                <div class="form-group">
                                    <label
                                        class="select2-form-group"
                                        >Upazila</label
                                    >
                                    <Select2
                                        :options="optionsUpazila"
                                        v-model="filter.upazila_id"
                                        name="upazila_id"
                                        id="upazila"
                                        placeholder="Select Upazila"
                                    />
                                </div>
                            </div>  
                            <div class="col-md-3 col-sm-6">
                                <button @click="getData" class="btn btn-sm btn-primary mt-2">Filter<span class="spinner"></span></button>
                                <button @click="resetFilter" class="btn btn-sm btn-danger mt-2">Reset<span class="spinner"></span></button>
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
                                            <th v-on:click = "sort($event)" data-column="users.name" class="sorting mw-80">Name</th>
                                            <th v-on:click = "sort($event)" data-column="users.phone" class="sorting mw-80">Mobile</th>
                                            <th v-on:click = "sort($event)" data-column="customerId" class="sorting mw-120">Customer ID</th>
                                            <th v-on:click = "sort($event)" data-column="customer_types.name" class="sorting mw-80">Type</th>
                                            <th class="mw-100">Address</th>
                                            <th>
                                                <div class="togglebutton">
                                                    <label>
                                                        <input @change="checkAll" v-model="check_all" id="checkAll" type="checkbox">
                                                        <span class="toggle"></span>
                                                        Select All
                                                    </label>
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr
                                            v-for="(customer, index) in customers"
                                            :key="customer.id"
                                        >
                                            <td>{{ pagination.from + index }}</td>
                                            <td><router-link :to="{ name: 'customer_view', params:{'id':customer.id}}" target="_blank">{{ customer.name }}</router-link></td>
                                            <td>{{ customer.phone }}</td>
                                            <td>{{ customer.customerId }}</td>
                                            <td>{{ customer.customer_type }}</td>
                                            <td>{{ 
                                                    ((customer.address != '' && customer.address != null)?customer.address+', ':'')+
                                                    ((customer.upazila != '')?customer.upazila+', ':'')+
                                                    ((customer.district != '')?customer.district+', ':'')+
                                                    ((customer.division != '')?customer.division+', ':'')+
                                                    ((customer.country != '')?customer.country:'')
                                                }}</td>
                                            <td>
                                                <div class="togglebutton">
                                                    <label>
                                                        <input class="sms_send" :value="customer.phone" type="checkbox">
                                                        <span class="toggle"></span>
                                                    </label>
                                                </div>
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
                    <div class="card">
                        <div class="row m-0 mt-3">
                            <div class="col-sm-12 col-md-6">
                                <div class="form-group">
                                    <label
                                        class="select2-form-group"
                                        >Message Language Type<strong class="text-danger"> *</strong></label
                                    >
                                    <Select2
                                        :options="optionsMessageType"
                                        v-model="form.type"
                                        placeholder="Select Message Language"
                                    />
                                </div>
                            </div>
                            <div class="col-12">
                                <div
                                    class="form-group bmd-form-group "
                                    v-bind:class="{
                                        'is-filled':
                                            form.text !== null
                                    }"
                                >
                                    <label
                                        for="text"
                                        class="bmd-label-floating"
                                        >Message<strong class="text-danger"> *</strong> <span class="font-weight-bolder text-info">Characters:(<span>{{wordCount}}</span>)</span></label
                                    >
                                    <textarea
                                        type="text"
                                        class="form-control"
                                        id="text"
                                        rows="5"
                                        @keyup="countWord"
                                        v-model="form.text"
                                    />
                                    
                                </div>
                            </div>
                        </div>
                        <div class="card-footer ml-auto">
                            <button
                                type="submit"
                                @click.prevent="sendMessage"
                                class="btn btn-primary"
                            >
                                Send<span class="spinner"></span>
                            </button>
                        </div>
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
            form:{
                type:1,
                text:'',
                phone:[],
            },
            filter:{
                division_id:null,
                district_id:null,
                upazila_id:null
            },
            param: {
                query: "",
                sort:{
                    column:"",
                    sort_order:""
                }
            },
            customers: [],
            pagination: {
                current_page: 1,
                per_page: 10
            },
            optionsDivision: [],
            optionsDistrict: [],
            optionsUpazila: [],
            optionsMessageType:[{'id':1,'text':'English'}, {'id':2,'text':'Bangali'}],
            check_all:null,
            wordCount:0
        };
    },
    mounted() {
        this.getData();
        this.getDropdown('api/v1/divisions/20', 'optionsDivision');
    },
    methods: {
        getData() {
            this.$Progress.start();
            this.$jsHelper.get(
                    "api/v1/customers?page=" +
                        this.pagination.current_page +
                        "&per_page=" +
                        this.pagination.per_page +
                        "&query=" +
                        this.param.query+
                        "&sort_by=" +
                        this.param.sort.column+
                        "&sort_order=" +
                        this.param.sort.sort_order+
                        "&division_id=" +
                        this.filter.division_id+
                        "&district_id=" +
                        this.filter.district_id+
                        "&upazila_id=" +
                        this.filter.upazila_id

                )
                .then(response => {
                    this.$Progress.finish();
                    this.customers = response.data.data;
                    this.pagination = response.data.meta;
                })
                .catch(e => {
                    this.$Progress.fail();
                    this.$toaster.error("Something went wrong");
                });
        },
        resetFilter(){
            this.filter.division_id = null;
            this.filter.district_id = null;
            this.filter.upazila_id = null;
            this.getData();
        },
        sort(event){
            this.param.sort.column = event.currentTarget.dataset.column;
            if(event.currentTarget.classList.contains('asc')){
                this.param.sort.sort_order = 'DESC';
                this.getData();
            }
            else{
                this.param.sort.sort_order = 'ASC';
                this.getData();
            }

        },
        getDropdown(url, option){
            this.$jsHelper.get(url).then(response => {
                this[option] = response.data.map(function(val){
                    return {id:val.id, text:val.name}
                });
            }).catch(error => {
            });
        },
        selectOption(){
            this.getDropdown('api/v1/divisions/20', 'optionsDivision');
            this.getDropdown('api/v1/districts/'+this.form.division_id, 'optionsDistrict');
            this.getDropdown('api/v1/upazilas/'+this.form.district_id, 'optionsUpazila');
        },
        checkAll(e){
            if(e.currentTarget.checked){
                $('.sms_send').prop('checked', true);
            }
            else{
                $('.sms_send').prop('checked', false);
            }
        },
        sendMessage(e){
            if(this.form.text == ''){
                this.$toaster.error("Write Some text to send SMS");
                return;
            }
            if(this.form.type == null){
                this.$toaster.error("Message language Type");
                return;
            }

            let phones = []; 
            $(".sms_send:checked").each(function () {
                phones.push($(this).val());
            });

            this.form.phone = phones;
            if(this.form.phone.length > 0){
                this.$buttonLoader(e);
                this.$Progress.start();
                  this.$jsHelper.put("api/v1/sms-send", this.form)
                .then(data => {
                    if(data.data === 1){
                    this.$Progress.finish();
                        this.$toaster.info("Successfully Send");
                        this.form.phone = [];
                        this.form.text = '';
                        this.form.type = 1;
                        this.wordCount = 0;
                        this.$buttonLoader(e);
                        $('#checkAll').prop('checked', false);
                        $('.sms_send').prop('checked', false);
                    }
                    else{
                        this.$Progress.fail();
                        this.$buttonLoader(e);
                        this.$toaster.error("Something went wrong");
                    }
                })
                .catch(error => {
                    this.$Progress.fail();
                    this.$buttonLoader(e);
                    this.$toaster.error("Something went wrong");
                });
            }
            else{
                this.$toaster.error("Please select at least one customer to send SMS.");
            }
        },
        countWord(){
            this.wordCount = $("#text").val().length;
        }
    }
};

</script>

<style>

</style>
