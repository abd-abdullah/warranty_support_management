<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="card-header card-header-rose card-header-icon">
                            <div class="card-icon">
                                <i class="material-icons">assignment</i>
                            </div>
                            <div class="row">
                                <div class="col-sm-12 col-md-6">
                                    <h4 class="card-title">Customer Purchase List</h4>
                                </div>
                                <div class="col-sm-12 col-md-6 text-right pr-md-0">
                                    <router-link to="/sales/form" class="btn btn-sm btn-rose">Add
                                        <div class="ripple-container"></div>
                                    </router-link>
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
                                        <th v-on:click = "sort($event)" data-column="users.name" class="sorting mw-120">Name</th>
                                        <th v-on:click = "sort($event)" data-column="customers.customerID" class="sorting mw-120">Customer ID</th>
                                        <th v-on:click = "sort($event)" data-column="users.phone" class="sorting mw-120">Number</th>
                                        <th v-on:click = "sort($event)" data-column="users.email" class="sorting mw-120">Email</th>
                                        <th class="mw-180">Address</th>
                                        <th v-on:click = "sort($event)" data-column="products.name" class="sorting mw-180">Product Name</th>
                                        <th v-on:click = "sort($event)" data-column="products.code" class="sorting mw-130">Product Code</th>
                                        <th v-on:click = "sort($event)" data-column="purchase_from" class="sorting mw-140">Purchase From</th>
                                        <th v-on:click = "sort($event)" data-column="price" class="sorting mw-100">Price</th>
                                        <th v-on:click = "sort($event)" data-column="date_of_purchase" class="sorting mw-155">Purchase Date</th>
                                        <th v-on:click = "sort($event)" data-column="last_date_of_warranty" class="sorting mw-170">Last Warranty Date</th>
                                        <th class="mw-160">Next Service Date</th>
                                        <th class="text-right mw-120">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                        v-for="(sale, index) in sales"
                                        :key="sale.id"
                                    >
                                        <td>{{ pagination.from + index }}</td>
                                        <td>{{ sale.name }}</td>
                                        <td>{{ sale.customerId }}</td>
                                        <td>{{ sale.phone }}</td>
                                        <td>{{ sale.email }}</td>
                                        <td>{{ 
                                                ((sale.address != '' && sale.address != null)?sale.address+', ':'')+
                                                ((sale.upazila != '')?sale.upazila+', ':'')+
                                                ((sale.district != '')?sale.district+', ':'')+
                                                ((sale.division != '')?sale.division+', ':'')+
                                                ((sale.country != '')?sale.country:'')
                                            }}</td>
                                        <td>{{ sale.product_name }}</td>
                                        <td>{{ sale.product_code }}</td>
                                        <td>{{ sale.purchase_from }}</td>
                                        <td>{{ sale.price }}</td>
                                        <td>{{ sale.date_of_purchase }}</td>
                                        <td>{{ sale.last_date_of_warranty }}</td>
                                        <td>{{ sale.next_service_time }}</td>
                                        <td class="td-actions text-right">
                                            <button
                                                @click.prevent="service(sale)"
                                                type="button"
                                                rel="tooltip"
                                                class="btn btn-facebook btn-round"
                                                title ="Add Service"
                                            >
                                            <span class="material-icons">add_box</span>
                                            </button>
                                            <router-link
                                                :to="{ name: 'sale_form', params:{'id':sale.id}}"
                                                type="button"
                                                rel="tooltip"
                                                class="btn btn-success btn-round"
                                                title ="Edit"
                                            >
                                                <i class="material-icons"
                                                    >edit</i
                                                >
                                            </router-link>
                                            <button
                                                @click.prevent="remove(sale)"
                                                type="button"
                                                rel="tooltip"
                                                class="btn btn-danger btn-round"
                                                data-original-title
                                                title ="Delete"
                                            >
                                                <i class="material-icons"
                                                    >close</i
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
                </div>
            </div>
        </div>
        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    ...
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
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
                sort:{
                    column:"",
                    sort_order:""
                }
            },
            sales: [],
            pagination: {
                current_page: 1,
                per_page: 10
            }
        };
    },
    mounted() {
        this.getData();
    },
    methods: {
        getData() {
            this.$Progress.start();
            this.$jsHelper.get(
                    "api/v1/sales?page=" +
                        this.pagination.current_page +
                        "&per_page=" +
                        this.pagination.per_page +
                        "&query=" +
                        this.param.query+
                        "&sort_by=" +
                        this.param.sort.column+
                        "&sort_order=" +
                        this.param.sort.sort_order

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
        remove(sale){
            this.$swal("Are you sure to delete this sale?").then((result) => {
                if(result.isConfirmed === true){
                    this.$jsHelper.delete('api/v1/sales/'+sale.id).then(response =>{
                        this.$Progress.finish();
                        this.$toaster.warning("Deleted successfully");
                        this.getData();
                    }).catch(e => {
                        this.$Progress.fail();
                        this.$toaster.error("Something went wrong");
                    });
                }
            })
        },
        service(sale){
            $('#exampleModal').modal('show');
        }
    }
};

</script>

<style>

</style>
