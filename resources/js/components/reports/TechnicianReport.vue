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
                                    <h4 class="card-title">Technician Report</h4>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="row mt-2">
                                <div class="col-md-5 col-sm-6">
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
                                    <span
                                        class="text-danger"
                                        v-if="errors.from_date"
                                        >{{
                                            errors.from_date[0]
                                        }}</span
                                    >
                                </div>
                                <div class="col-md-5 col-sm-6">
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
                                    <span
                                        class="text-danger"
                                        v-if="errors.to_date"
                                        >{{
                                            errors.to_date[0]
                                        }}</span
                                    >
                                </div>
                                <div class="col-md-2 col-sm-6">
                                    <button @click="getData" class="btn btn-primary btn-sm mt-0">Filter<span class="spinner"></span></button>
                                    <button @click="resetFilter" class="btn btn-danger btn-sm mt-0">Reset<span class="spinner"></span></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12"  v-if="technicians.length > 0">
                    <button style="z-index:99" class="btn btn-sm position-absolute" @click="print"><span class="material-icons">print</span></button>
                </div>
                <div class="col-12" id="print" v-if="technicians.length > 0">
                    <div class="card mt-0 p-5">
                        <div class="card-header card-header-rose card-header-icon">
                            <h4 class="border-bottom d-inline card-title text-center text-monospace">Technicians Service Report from {{formatDate(filter.from_date)}} to {{formatDate(filter.to_date)}}</h4>
                        </div>
                        <div class="card-body">
                           <div class="table-responsive">
                                <table class="border table table-bordered table-condensed table-shopping table-sm">
                                    <thead>
                                        <tr>
                                            <th class="font-weight-bold">SL#</th>
                                            <th class="font-weight-bold">Name</th>
                                            <th class="font-weight-bold">Email</th>
                                            <th class="font-weight-bold">Mobile</th>
                                            <th class="font-weight-bold">Total Services</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr
                                            v-for="(technician, index) in technicians"
                                            :key="technician.id"
                                        >
                                            <td>{{ (index+1) }}</td>
                                            <td>{{ technician.name }}</td>
                                            <td>{{ technician.email }}</td>
                                            <td>{{ technician.phone }}</td>
                                            <td>{{technician.customer_services_count}}</td>
                                        </tr>
                                    </tbody>
                                </table>
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
            filter:{
                from_date: null,
                to_date: new Date()
            },
            technicians: [],
            errors: [],
        };
    },
    methods: {
        getData(e) {
            let fromDate = (this.filter.from_date != null)? this.filter.from_date.toISOString().split('T')[0]:null;
            let toDate = (this.filter.to_date != null)? this.filter.to_date.toISOString().split('T')[0]:null;
            this.$Progress.start();
            this.$buttonLoader(e);
            this.$jsHelper
                .get(
                    "api/v1/technician/service-reports?from_date=" +
                        fromDate +
                        "&to_date=" +
                        toDate
                )
                .then(response => {
                    this.$Progress.finish();
                    this.$buttonLoader(e);
                    this.errors = [];
                    this.technicians = response.data;
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
        resetFilter(){
            this.technicians = [];
            this.errors = [];
            this.filter.from_date = null;
            this.filter.to_date = null;
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
        },
        
        print(){
            this.$htmlToPaper('print');
        },
    }
};

</script>

<style>

</style>
