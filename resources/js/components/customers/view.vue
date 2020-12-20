<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-12 mb-2">
                                    <h4 class="border-bottom m-0 mb-0 ml-4 pb-2">
                                        <i class="view-header-icon material-icons">assignment</i>
                                        <span class="text-gray text-uppercase">Customer Information</span>
                                        <button class="btn btn-sm btn-warning float-right" @click="print"><span class="material-icons">print</span></button>
                                    </h4>
                                </div>
                                <div class="col-12 ml-2 pl-4">
                                    <table v-if="customer != null" class="font-weight-normal table table-borderless table-responsive table-sm">
                                        <tr><td>Name :</td><td>{{customer.name}}</td></tr>
                                        <tr><td>Customer ID :</td><td>{{customer.customerId}}</td></tr>
                                        <tr><td>Customer Type :</td><td>{{customer.customer_type}}</td></tr>
                                        <tr><td>Phone :</td><td>{{customer.phone}}</td></tr>
                                        <tr><td>Other contact numbers :</td><td>{{customer.other_contact_numbers}}</td></tr>
                                        <tr><td>Email :</td><td>{{customer.email}}</td></tr>
                                        <tr><td>Address :</td><td>{{ 
                                                    ((customer.address != '' && customer.address != null)?customer.address+', ':'')+
                                                    ((customer.upazila != null)?customer.upazila+', ':'')+
                                                    ((customer.district != '')?customer.district+', ':'')+
                                                    ((customer.division != '')?customer.division:'')
                                                }}</td>
                                            </tr>
                                            <tr>
                                                <td>Zone :</td><td>{{customer.zone}}</td>
                                            </tr>
                                            <tr><td>Invoice No:</td><td>{{customer.invoice}}</td></tr>
                                            <tr><td>Product Name:</td><td>{{customer.product_name}}</td></tr>
                                            <tr><td>Product Code</td><td>{{customer.product_code}}</td></tr>
                                            <tr><td>Price</td><td>{{customer.purchase_price}}</td></tr>
                                            <tr><td>Purchase From</td><td>{{customer.purchase_from}}</td></tr>
                                            <tr><td>Purchase Date</td><td>{{customer.date_of_purchase}}</td></tr>
                                            <tr><td>Installation Date</td><td>{{customer.date_of_installation}}</td></tr>
                                            <tr><td>Last Date of Warranty</td><td>{{customer.last_date_of_warranty}}</td></tr>
                                                
                                    </table>
                                </div>
                            </div>
                            <div class="row mt-4">
                                <div class="col-12 mb-2">
                                    <h4 class="border-bottom m-0 mb-0 ml-4">
                                        <i class="view-header-icon material-icons">add_task</i>
                                        <span class="text-gray text-uppercase">Service Information</span>
                                    </h4>
                                </div>
                                <div class="col-12 ml-2 pl-4">
                                    <table v-if="customer != null" class="font-weight-normal table table-borderless table-condensed table-sm">
                                        <tr>
                                            <th class="border-top-0">SL#</th>
                                            <th class="mw-80 border-top-0">Service Time</th>
                                            <th class="mw-80 border-top-0">Next Service</th>
                                            <th class="border-top-0">Details</th>
                                            <th class="border-top-0">Remarks</th>
                                            <th class="mw-80 border-top-0">Total Cost</th>
                                            <th class="border-top-0">Charge</th>
                                            <th class="mw-80 border-top-0">Total Paid</th>
                                            <th class="border-top-0">Technician</th>
                                        </tr>
                                        <tr  v-for="(service, index) in customer.services.data"
                                            :key="service.id">
                                            <td v-bind:class="{'text-danger':(service.status==2)}">{{(index+1)}}</td>
                                            <td v-bind:class="{'text-danger':(service.status==2)}">{{service.service_time}}</td>
                                            <td v-bind:class="{'text-danger':(service.status==2)}">{{service.next_service_time}}</td>
                                            <td v-bind:class="{'text-danger':(service.status==2)}" class="nr">{{(service.status == 2)?'Date Change':service.service_for}}</td>
                                            <td v-bind:class="{'text-danger':(service.status==2)}" class="nr">{{service.remarks}}</td>
                                            <td v-bind:class="{'text-danger':(service.status==2)}">{{service.cost}}</td>
                                            <td v-bind:class="{'text-danger':(service.status==2)}">{{service.service_charge}}</td>
                                            <td v-bind:class="{'text-danger':(service.status==2)}">{{service.total_paid}}</td>
                                            <td v-bind:class="{'text-danger':(service.status==2)}"><router-link :to="{}" target="_blank">{{service.technician_name}}</router-link></td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row d-none" id="print">
                <div class="col-12">
                    <div class="card border-0">
                        <div class="border-0 card-header">
                            <img class="w-100" :src="'images/warranty-header.png'">
                        </div>
                        <div class="card-body">
                            <div class="row mt-2">
                                <div class="col-12 mb-2">
                                    <h4 class="m-0 mb-0 ml-4">
                                        <span class="font-weight-bold text-uppercase">Customer Information</span>
                                    </h4>
                                </div>
                                <div class="col-12 ml-2 pl-4">
                                    <table v-if="customer != null" style="font-size:20px" class="font-weight-normal table table-bordered table-sm">
                                        <tr><td width="230px">Name </td><td>{{customer.name}}</td></tr>
                                        <tr><td>Customer ID </td><td>{{customer.customerId}}</td></tr>
                                        <tr><td>Customer Type</td><td>{{customer.customer_type}}</td></tr>
                                        <tr><td>Phone </td><td>{{customer.phone}}</td></tr>
                                        <tr><td>Other contact numbers</td><td>{{customer.other_contact_numbers}}</td></tr>
                                        <tr><td>Email</td><td>{{customer.email}}</td></tr>
                                        <tr><td>Address </td><td>{{ 
                                                    ((customer.address != '' && customer.address != null)?customer.address+', ':'')+
                                                    ((customer.upazila != null)?customer.upazila+', ':'')+
                                                    ((customer.district != '')?customer.district+', ':'')+
                                                    ((customer.division != '')?customer.division:'')
                                                }}</td>
                                            </tr>
                                            <tr>
                                                <td>Zone </td><td>{{customer.zone}}</td>
                                            </tr>
                                            <tr><td>Invoice No</td><td>{{customer.invoice}}</td></tr>
                                            <tr><td>Product Name</td><td>{{customer.product_name}}</td></tr>
                                            <tr><td>Product Code</td><td>{{customer.product_code}}</td></tr>
                                            <tr><td>Price</td><td>{{customer.purchase_price}}</td></tr>
                                            <tr><td>Purchase From</td><td>{{customer.purchase_from}}</td></tr>
                                            <tr><td>Purchase Date</td><td>{{customer.date_of_purchase}}</td></tr>
                                            <tr><td>Installation Date</td><td>{{customer.date_of_installation}}</td></tr>
                                            <tr><td>Last Date of Warranty</td><td>{{customer.last_date_of_warranty}}</td></tr>
                                                
                                    </table>
                                </div>
                            </div>
                            <div class="row mt-4">
                                <div class="col-12 mb-2">
                                    <h4 class="m-0 mb-0 ml-4">
                                        <span class="font-weight-bold text-uppercase">Service Information</span>
                                    </h4>
                                </div>
                                <div class="col-12 ml-2 pl-4">
                                    <table v-if="customer != null" style="font-size:20px" class="font-weight-normal table table-bordered table-sm">
                                        <tr>
                                            <th>SL#</th>
                                            <th width="140px">Service Time</th>
                                            <th width="140px">Next Service</th>
                                            <th>Details</th>
                                            <th >Remarks</th>
                                            <th width="100px">Charge</th>
                                            <th width="100px">Total Paid</th>
                                            <th width="140px">Technician</th>
                                        </tr>
                                        <tr  v-for="(service, index) in customer.services.data"
                                            :key="service.id">
                                            <td class="vm">{{(index+1)}}</td>
                                            <td class="vm">{{service.service_time}}</td>
                                            <td class="vm">{{service.next_service_time}}</td>
                                            <td class="nr vm">{{(service.status == 2)?'Date Change':service.service_for}}</td>
                                            <td class="nr vm">{{service.remarks}}</td>
                                            <td class="vm">{{service.service_charge}}</td>
                                            <td class="vm">{{service.total_paid}}</td>
                                            <td class="vm">{{service.technician_name}}</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
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
            id : this.$route.params.id,
            customer: null,
        };
    },
    mounted() {
        this.getData();
    },
    methods: {
        getData() {
            this.$Progress.start();
            this.$jsHelper.get(
                    "api/v1/sales/view/"+this.id)
                .then(response => {
                    this.$Progress.finish();
                    this.customer = response.data.data;
                    this.pagination = response.data.meta;
                })
                .catch(e => {
                    this.$Progress.fail();
                    this.$toaster.error("Something went wrong");
                });
        },
        print(){
            this.$htmlToPaper('print');
        },
    }
};

</script>

<style>

</style>
