<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <button style="z-index:99" class="btn btn-sm ml-5 mt-5 position-absolute" @click="print"><span class="material-icons">print</span></button>
            </div>
            <div class="row" id="print" style="font-family:'Times New Roman', Times, serif;">
                <div class="col-12">
                    <div class="card border-0">
                        <div class="card-body">
                             <div v-if="sale !== null" class="row" style="width: 866px;height: 1447px;margin-left: auto !important;margin-right: auto !important;" >
                                <div class="col-12" style=" height:200px; top: 40px; width: 100% !important; text-align:center;">
                                    <img class="w-100" :src="'images/warranty-header.png'">
                                </div>
                                <div class="col-12" style="height:950px; font-size:22px;">
                                    <h2 class="font-weight-bold text- text-center" style="text-decoration: underline">Warranty Letter</h2>
                                    <p class="text-justify">
                                        Post service free for 1.5 year, <strong>N.B:</strong> After installation the machine will be our responsibility, Except Filter. (First filter will be changed in every 3 month and 2nd and 3rd will be changed in every 6 month)
                                    </p>
                                    <table class="table table-borderless table-responsive table-sm" style="font-size:22px;">
                                        <tr>
                                            <td><h3 class="font-weight-normal" style="text-decoration: underline; min-width:270px;">Customer Information :</h3></td>
                                            <td></td>
                                        </tr>	
                                        <tr>
                                            <td>Customer ID</td>
                                            <td>: {{sale.customer.customerId}}</td>
                                        </tr>
                                        <tr>
                                            <td>Name of customer</td>
                                            <td>: {{sale.customer.user.name}}</td>
                                        </tr>
                                        <tr>
                                            <td>Address</td>
                                            <td>: {{ 
                                                    ((sale.customer.user.address != '' && sale.customer.user.address != null)?sale.customer.user.address+', ':'')+
                                                    ((sale.customer.user.upazila != null)?sale.customer.user.upazila.name+', ':'')+
                                                    ((sale.customer.user.district.name != '')?sale.customer.user.district.name+', ':'')+
                                                    ((sale.customer.user.division.name != '')?sale.customer.user.division.name:'')
                                                }}</td>
                                        </tr>
                                        <tr>
                                            <td>Cell No</td>
                                            <td>: {{sale.customer.user.phone}}</td>
                                        </tr>
                                        <tr>
                                            <td><h3 class="font-weight-normal mt-4" style="text-decoration: underline">Product Information :</h3></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>Name of product</td>
                                            <td>: {{sale.product.name}}</td>
                                        <tr>
                                            <td>Date of Installation</td>
                                            <td>: {{formatDate(sale.date_of_installation)}}</td>
                                        </tr>
                                        <tr>
                                            <td>Expiry Date of Warranty</td>
                                            <td>: {{formatDate(sale.last_date_of_warranty)}}</td>
                                        </tr>
                                        <tr>
                                            <td>Contact info for support</td>
                                            <td>: 01616-701701</td>
                                        </tr>     
                                    </table>
                                    <div class="row" style="margin-top: 125px">
                                        <div class="col-12">
                                            <span class="pt-1" style="border-top: 2px dashed #dee2e6!important;">Shah Amdad Ullah </span>
                                            <span style="font-size: 19px; font-style: italic;display: block;">CEO, City Water Purifier</span>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-12" style="height: 200px;bottom: 0px;width: 100% !important;text-align: right;">
                                    <img :src="'images/warranty-footer.png'">
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
            sale: null,
        };
    },
    mounted() {
        this.getData();
    },
    methods: {
        getData() {
            this.$Progress.start();
            this.$jsHelper.get(
                    "api/v1/showWarranty/"+this.id)
                .then(response => {
                    this.$Progress.finish();
                    this.sale = response.data;
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
        formatDate(date) {
            if(date == null) return date;
            var d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;

            return [year, month, day].join('-');
        }
    }
};

</script>
<style>
    
</style>