<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-4 col-sm-12">
                    <div class="card card-stats">
                        <div
                            class="card-header card-header-success card-header-icon"
                        >
                            <div class="card-icon">
                                <i class="material-icons">settings_input_composite</i>
                            </div>
                            <p class="card-category">Total Product</p>
                            <h3 class="card-title">{{dashboardData.product}}</h3>
                        </div>
                        <div class="card-footer">
                            <div class="stats">
                                <span>{{dashboardData.month}}</span>
                            </div>
                            <div>
                                <span class="font-weight-bold text-primary">{{dashboardData.product_monthly}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 col-sm-12">
                    <div class="card card-stats">
                        <div
                            class="card-header card-header-danger card-header-icon"
                        >
                            <div class="card-icon">
                                <i class="material-icons">stacked_line_chart</i>
                            </div>
                            <p class="card-category">Total Sale</p>
                            <h3 class="card-title">{{dashboardData.purchase}}</h3>
                        </div>
                        <div class="card-footer">
                            <div class="stats">
                                <span>{{dashboardData.month}}</span>
                            </div>
                            <div>
                                <span class="font-weight-bold text-primary">{{dashboardData.purchase_monthly}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 col-sm-12">
                    <div class="card card-stats">
                        <div
                            class="card-header card-header-info card-header-icon"
                        >
                            <div class="card-icon">
                                <i class="material-icons">check_box</i>
                            </div>
                            <p class="card-category">Total Service Done</p>
                            <h3 class="card-title">{{dashboardData.service}}</h3>
                        </div>
                        <div class="card-footer">
                            <div class="stats">
                                <span>{{dashboardData.month}}</span>
                            </div>
                            <div>
                                <span class="font-weight-bold text-primary">{{dashboardData.service_monthly}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12">
                    <div class="card mt-0">
                        <div class="card-header card-header-icon card-header-rose">
                            <h4 class="card-title">Sales & Service Chart
                            <small class="font-weight-bold text-primary">- Previous 30 days</small>
                            </h4>
                        </div>
                        <div class="card-body">
                           <service-bar-chart
                                v-if="loaded"
                                :styles="barchartStyles"
                                :chartdata="chart.Bar"
                                :options="options" />
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12">
                    <div class="card mt-0">
                        <div class="card-header card-header-icon card-header-city">
                            <h4 class="card-title">Sales vs Service
                            <small class="font-weight-bold text-primary">- 2020</small>
                            </h4>
                        </div>
                        <div class="card-body">
                           <service-line-chart
                                v-if="loaded"
                                :styles="barchartStyles"
                                :chartdata="chart.Line"
                                :options="options" />
                        </div>
                    </div>
                </div>
                <div class="col-lg-12">
                    <dashboard-customer-service />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import ServiceBarChart from './partial/SaleAndServiceBarChart';
import ServiceLineChart from './partial/ServiceLineChart';
import DashboardCustomerService from './partial/DashboardCustomerService';
export default {
    components: { ServiceBarChart,ServiceLineChart, DashboardCustomerService },
    name: "Dashboard",
    data : () => ({
        name: "",
        section_title: "Dashboard",
        dashboardData:{
            product:0,
            customer:0,
            purchase:0,
            service:0,
            product_monthly:0,
            customer_monthly:0,
            purchase_monthly:0,
            service_monthly:0,
            month: '',
        },
        chart:{
            Bar:null,
            Line:null,
        },
        loaded: false,
        options:{
            responsive: true,
            maintainAspectRatio: false,
            fill:false,
        }
    }),
    async mounted() {
        this.loaded = false
        this.$Progress.start();
        await this.$jsHelper
            .get("api/v1/dashboard")
            .then(response => {
                this.dashboardData = response.data;
                this.fillChartData(response.data);
                this.$Progress.finish(); 
            })
            .catch(error => {
                this.$Progress.fail();
                this.$toaster.error("Something went wrong");
            });
    },
    computed:{
        barchartStyles(){
            return {
                height: '250px',
                position: 'relative'
            }
        }
    },
    methods:{
        fillChartData(data){
            this.chart.Bar = {
                labels: data.bar_labels,
                datasets: [
                    {
                        label: "Sale",
                        backgroundColor: "blue",
                        data: data.bar_sale_data
                    },
                    {
                        label: "Service",
                        backgroundColor: "red",
                        data: data.bar_service_data
                    }
                ]
            }
            
            this.chart.Line = {
                labels: data.line_labels,
                datasets: [
                    {
                        label: "Sale",
                        data: data.line_sale_data,
                        borderColor:'blue',
                    },
                    {
                        label: "Service",
                        data: data.line_service_data,
                        borderColor:'red',
                    }
                ]
            }
            this.loaded = true;
        }
    }
};
</script>

<style></style>
