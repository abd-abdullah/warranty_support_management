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
                                    <h4 class="card-title">Product List</h4>
                                </div>
                                <div class="col-sm-12 col-md-6 text-right pr-md-0">
                                    <router-link to="/products/form" class="btn btn-sm btn-rose">Add
                                        <div class="ripple-container"></div>
                                    </router-link>
                                </div> 
                            </div>
                        </div>
                        <div class="card-body">
                            <param
                                :pagination="pagination"
                                :param="param"
                                @limit="getData()"
                            ></param>
                            <table class="table table-sortable">
                                <thead>
                                    <tr>
                                        <th>SL#</th>
                                        <th v-on:click = "sort($event)" data-column="name" class="sorting">Name</th>
                                        <th v-on:click = "sort($event)" data-column="code" class="sorting">Code</th>
                                        <th v-on:click = "sort($event)" data-column="created_at" class="sorting">Created Date</th>
                                        <th class="text-right">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                        v-for="(product, index) in products"
                                        :key="product.id"
                                    >
                                        <td>{{ pagination.from + index }}</td>
                                        <td>{{ product.name }}</td>
                                        <td>{{ product.code }}</td>
                                        <td>{{ product.created_at }}</td>
                                        <td class="td-actions text-right">
                                            <router-link
                                                :to="{ name: 'product_form', params:{'id':product.id}}"
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
            products: [],
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
                    "api/v1/products?page=" +
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
                    console.log(response);
                    this.products = response.data.data;
                    this.pagination = response.data.meta;
                })
                .catch(e => {
                    this.$Progress.fail();
                    console.log(e);
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

        }
    }
};

</script>

<style>

</style>
