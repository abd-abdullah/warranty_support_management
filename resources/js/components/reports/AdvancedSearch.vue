<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="card-header card-header-rose card-header-icon">
                            <div class="card-icon d-md-block d-none">
                                <i class="material-icons">find_replace</i>
                            </div>
                            <div class="row">
                                <div class="col-6">
                                    <h4 class="card-title">Advanced Customer Purchase Search</h4>
                                </div>
                                <div class="col-6">
                                    <button class="btn btn-sm float-right" @click="print"><span class="material-icons">print</span></button>
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
                                <div class="form-group">
                                    <label
                                        class="select2-form-group"
                                        >Zone</label
                                    >
                                    <Select2
                                        :options="optionsZone"
                                        v-model="filter.zone_id"
                                        name="zone_id"
                                        placeholder="Select Zone"
                                    />
                                </div>
                            </div>  
                            <div class="col-md-3 col-sm-6 pt-2">
                                <label class="select2-form-group">From Date</label>
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
                            <div class="col-md-3 col-sm-6 pt-2">
                                <label class="select2-form-group">To Date</label>
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
                            <div class="col-md-3 col-sm-6 pl-0 pr-0">
                                <button @click="getData" class="btn btn-sm pl-md-2 pl-lg-3 pr-md-2 pr-lg-3 btn-primary mt-2">Filter<span class="spinner"></span></button>
                                <button @click="resetFilter" class="btn btn-sm pl-md-2 pl-lg-3 pr-md-2 pr-lg-3 btn-danger mt-2">Reset<span class="spinner"></span></button>
                            </div>
                        </div>
                        <div class="card-body">
                            <search
                                :pagination="pagination"
                                :param="param"
                                @limit="getData()"
                            ></search>
                            
                            <div class="table-responsive" id="print">
                                <table class="table table-sortable">
                                    <thead>
                                        <tr>
                                            <th>SL#</th>
                                            <th
                                                v-on:click="sort($event)"
                                                data-column="sales.name"
                                                class="sorting mw-120"
                                            >
                                                Customer
                                            </th>

                                            <th
                                                v-on:click="sort($event)"
                                                data-column="sales.phone"
                                                class="sorting"
                                            >
                                                Phone
                                            </th>
                                            
                                            <th>Invoivce</th>
                                            <th class="mw-180">Address</th>
                                            <th 
                                                v-on:click="sort($event)"
                                                data-column="sales.zone_id"
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
                                            <td class="ws-pre"><router-link :to="{ name: 'customer_view', params:{'id':sale.customer_id}}" target="_blank">{{
                                                sale.name+'\n'+
                                                sale.customerId+'\n'+
                                                sale.phone
                                            }}</router-link></td>
                                            <td>{{sale.phone}}</td>
                                            <td>{{sale.invoice}}</td>
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
                upazila_id:null,
                zone_id:null,
                from_date: new Date(),
                to_date: this.toDate()
            },
            param: {
                query: "",
                sort:{
                    column:"",
                    sort_order:""
                }
            },
            sales: [],
            pagination: {
                current_page: 1,
                per_page: 10
            },
            optionsDivision: [],
            optionsDistrict: [],
            optionsUpazila: [],
            optionsZone:[],
            optionsMessageType:[{'id':1,'text':'English'}, {'id':2,'text':'Bangali'}],
            check_all:null,
            wordCount:0
        };
    },
    mounted() {
        this.getData();
        this.getDropdown('api/v1/zones-all', 'optionsZone');
        this.getDropdown('api/v1/divisions/20', 'optionsDivision');
    },
    methods: {
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
        resetFilter(){
            this.filter.division_id = null;
            this.filter.district_id = null;
            this.filter.upazila_id = null;
            this.filter.from_date = null;
            this.filter.zone_id = null;
            this.filter.to_date = null;
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
            this.getDropdown('api/v1/zones-all/', 'optionsZone');
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
        },
        toDate(){
            let date = new Date();
            return new Date(date.setDate(date.getDate() + 7));
        },
        print(){
            this.$htmlToPaper('print');
        },
    }
};

</script>

<style>

</style>
