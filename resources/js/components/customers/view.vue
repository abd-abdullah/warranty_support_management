<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <button style="z-index:99" class="btn btn-sm ml-3 mt-5 position-absolute" @click="print"><span class="material-icons">print</span></button>
            </div>
            <div class="row" id="print">
                <div class="col-12">
                    <div class="card">
                        <div class="card-body">
                            <div class="row mt-5">
                                <div class="col-12 mb-2">
                                    <h4 class="border-bottom m-0 mb-0 ml-4">
                                        <i class="view-header-icon material-icons">assignment</i>
                                        <span class="text-gray text-uppercase">Customer Information</span>
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
                                                        (customer.upazila != ""
                                                            ? customer.upazila +
                                                              ", "
                                                            : "") +
                                                        (customer.district != ""
                                                            ? customer.district +
                                                              ", "
                                                            : "") +
                                                        (customer.division != ""
                                                            ? customer.division +
                                                              ", "
                                                            : "") +
                                                        (customer.country != ""
                                                            ? customer.country
                                                            : "")}}</td></tr>
                                                <tr>
                                                    <td>Zone :</td><td>{{customer.zone}}</td>
                                                </tr>
                                    </table>
                                </div>
                            </div>
                            <div class="row mt-4">
                                <div class="col-12 mb-2">
                                    <h4 class="border-bottom m-0 mb-0 ml-4">
                                        <i class="view-header-icon material-icons">settings_input_composite</i>
                                        <span class="text-gray text-uppercase">Purchase Information</span>
                                    </h4>
                                </div>
                                <div class="col-12 ml-2 pl-4">
                                    <table v-if="customer != null" class="font-weight-normal table table-borderless table-condensed table-sm">
                                        <tr>
                                            <th class="border-top-0">SL#</th>
                                            <th class="border-top-0">Product Name</th>
                                            <th class="border-top-0">Product Code</th>
                                            <th class="border-top-0">Price</th>
                                            <th class="border-top-0">Purchase from</th>
                                            <th class="border-top-0">Purchase Date</th>
                                            <th class="border-top-0">Installation Date</th>
                                            <th class="border-top-0">Last Date of Warranty</th>
                                        </tr>
                                        <tr  v-for="(purchase, index) in customer.purchase.data"
                                            :key="purchase.id">
                                            <td>{{(index+1)}}</td>
                                            <td>{{purchase.product_name}}</td>
                                            <td>{{purchase.product_code}}</td>
                                            <td>{{purchase.price}}</td>
                                            <td>{{purchase.purchase_from}}</td>
                                            <td>{{purchase.date_of_purchase}}</td>
                                            <td>{{purchase.date_of_installation}}</td>
                                            <td>{{purchase.last_date_of_warranty}}</td>
                                        </tr>
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
                                            <th class="border-top-0">Service Time</th>
                                            <th class="border-top-0">Next Service Time</th>
                                            <th class="border-top-0">Details</th>
                                            <th class="border-top-0">Remarks</th>
                                            <th class="border-top-0">Total Cost</th>
                                            <th class="border-top-0">Charge</th>
                                            <th class="border-top-0">Total Paid</th>
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
                    "api/v1/customers/view/"+this.id)
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
