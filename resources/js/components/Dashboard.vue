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
            </div>
        </div>
    </div>
</template>
<script>
export default {
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
    }
};
</script>

<style></style>
