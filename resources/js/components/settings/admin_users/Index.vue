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
                                    <h4 class="card-title">Admin List</h4>
                                </div>
                                <div class="col-6 text-right pr-md-0">
                                    <router-link to="/admin-users/form" class="btn btn-sm btn-primary mt-2">Add
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
                                            <th v-on:click = "sort($event)" data-column="users.name" class="sorting mw-80">Name</th>
                                            <th v-on:click = "sort($event)" data-column="users.email" class="sorting mw-80">Email</th>
                                            <th v-on:click = "sort($event)" data-column="users.phone" class="sorting mw-80">Mobile</th>
                                            <th data-column="photo">Address</th>
                                            <th class="text-right mw-80">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr
                                            v-for="(admin_user, index) in admin_users"
                                            :key="admin_user.id"
                                        >
                                            <td>{{ pagination.from + index }}</td>
                                            <td>{{ admin_user.name }}</td>
                                            <td>{{ admin_user.email }}</td>
                                            <td>{{ admin_user.phone }}</td>
                                            <td>{{ 
                                                    ((admin_user.address != '' && admin_user.address != null)?admin_user.address+', ':'')+
                                                    ((admin_user.upazila != '')?admin_user.upazila+', ':'')+
                                                    ((admin_user.district != '')?admin_user.district+', ':'')+
                                                    ((admin_user.division != '')?admin_user.division+', ':'')+
                                                    ((admin_user.country != '')?admin_user.country:'')
                                                }}</td>
                                            <td class="td-actions w76 text-right">
                                                <router-link
                                                    :to="{ name: 'admin_user_form', params:{'id':admin_user.id}}"
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
                                                    @click.prevent="remove(admin_user)"
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
            admin_users: [],
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
                    "api/v1/admin-users?page=" +
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
                    this.admin_users = response.data.data;
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
        remove(admin_user){
            this.$swal("Are you sure to delete this admin user?").then((result) => {
                if(result.isConfirmed === true){
                    this.$jsHelper.delete('api/v1/admin-users/'+admin_user.id).then(response =>{
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
