<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-3 col-md-6 col-sm-6">
                    <div class="card card-stats">
                        <div
                            class="card-header card-header-warning card-header-icon"
                        >
                            <div class="card-icon">
                                <i class="material-icons">streetview</i>
                            </div>
                            <p class="card-category">Total Customer</p>
                            <h3 class="card-title">
                                {{dashboardData.customer}}
                            </h3>
                        </div>
                        <div class="card-footer">
                            <div class="stats">
                                <span>{{dashboardData.month}}</span>
                            </div>
                            <div>
                                <span class="font-weight-bold text-primary">{{dashboardData.customer_monthly}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-6">
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
                <div class="col-lg-3 col-md-6 col-sm-6">
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
                <div class="col-lg-3 col-md-6 col-sm-6">
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
                    <div class="card">
                        <div class="card-header card-header-icon card-header-rose">
                            <h4 class="card-title">Bars Chart
                            <small>- Bar Chart</small>
                            </h4>
                        </div>
                        <div class="card-body">
                           <service-bar-chart :styles="barchartStyles" :data=chart.Bar.data :options=chart.Bar.options />
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12">
                    <div class="card">
                        <div class="card-header card-header-icon card-header-city">
                            <h4 class="card-title">Line Chart Sales
                            <small>- Line Chart</small>
                            </h4>
                        </div>
                        <div class="card-body">
                           <service-line-chart :styles="barchartStyles" :data=chart.Line.data :options=chart.Line.options />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import ServiceBarChart from './partial/SaleAndServiceBarChart';
import ServiceLineChart from './partial/ServiceLineChart';
export default {
    components: { ServiceBarChart,ServiceLineChart },
    name: "Dashboard",
    data() {
        return {
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
                Bar:{
                    data: {
                        labels: ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'],
                        datasets: [
                            {
                                label: "Sale",
                                backgroundColor: "blue",
                                data: [3,7,4,45,50,24]
                            },
                            {
                                label: "Service",
                                backgroundColor: "red",
                                data: [4,3,5,45,4,3]
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false
                    }
                },
                Line:{
                    data: {
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mar', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                        datasets: [
                            {
                                label: "Sale",
                                data: [3,7,4,45,234,24],
                                borderColor:'blue',
                            },
                            {
                                label: "Service",
                                data: [4,3,5,234,4,3],
                                borderColor:'red',
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        fill:false,
                    }
                }
            }
        };
    },
    mounted() {
        
        this.$Progress.start();
        this.$jsHelper
            .get("api/v1/dashboard")
            .then(response => {
                this.dashboardData = response.data;
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
                height: '300px',
                position: 'relative'
            }
        }
    }
};
</script>

<style></style>
