<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="card-header card-header-rose card-header-icon">
                            <div class="card-icon d-md-block d-none">
                                <i class="material-icons">assignment</i>
                            </div>
                            <div class="row">
                                <div class="col-6">
                                    <h4 class="card-title">Customert Type List</h4>
                                </div>
                                <div class="col-6 text-right pr-md-0">
                                    <router-link to="/customer-types/form" class="btn btn-sm btn-primary mt-2">Add
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
                                            <th v-on:click = "sort($event)" data-column="name" class="sorting mw-80">Name</th>
                                            <th v-on:click = "sort($event)" data-column="created_at" class="sorting mw-125">Created Date</th>
                                            <th class="text-right mw-80">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr
                                            v-for="(customer_type, index) in customer_types"
                                            :key="customer_type.id"
                                        >
                                            <td>{{ pagination.from + index }}</td>
                                            <td>{{ customer_type.name }}</td>
                                            <td>{{ customer_type.created_at }}</td>
                                            <td class="td-actions text-right">
                                                <router-link
                                                    :to="{ name: 'customer_type_form', params:{'id':customer_type.id}}"
                                                    type="button"
                                                    rel="tooltip"
                                                    class="btn btn-success btn-round"
                                                    data-original-title
                                                    title
                                                >
                                                    <i class="material-icons"
                                                        >edit</i
                                                    >
                                                </router-link>
                                                <button
                                                    @click.prevent="remove(customer_type)"
                                                    type="button"
                                                    rel="tooltip"
                                                    class="btn btn-danger btn-round"
                                                    data-original-title
                                                    title
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
            customer_types: [],
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
                    "api/v1/customer-types?page=" +
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
                    this.customer_types = response.data.data;
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
        remove(customer_type){
            this.$swal("Are you sure to delete this customer type?").then((result) => {
                if(result.isConfirmed === true){
                    this.$jsHelper.delete('api/v1/customer-types/'+customer_type.id).then(response =>{
                        this.$Progress.finish();
                        this.$toaster.warning("Deleted successfully");
                        this.getData();
                    }).catch(e => {
                        this.$Progress.fail();
                        this.$toaster.error("Something went wrong");
                    });
                }
            })
        }
    }
};

</script>

<style>

</style>
