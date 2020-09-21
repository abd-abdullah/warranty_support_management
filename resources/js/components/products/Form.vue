<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <div class="card ">
                        <div
                            class="card-header card-header-rose card-header-icon"
                        >
                            <div class="card-icon">
                                <i class="material-icons">filter_none</i>
                            </div>
                            <div class="row">
                                <div class="col-sm-12 col-md-6">
                                    <h4 class="card-title" v-if="isEdit">
                                        Edit Product
                                    </h4>
                                    <h4 class="card-title" v-else>
                                        Add Product
                                    </h4>
                                </div>
                                <div
                                    class="col-sm-12 col-md-6 text-right pr-md-0"
                                >
                                    <router-link
                                        to="/products"
                                        class="btn btn-sm btn-rose"
                                        >Back to list</router-link
                                    >
                                </div>
                            </div>
                        </div>
                        <div class="card-body ">
                            <form action="">
                                <div class="row">
                                    <div class="col-sm-12 col-md-6">
                                        <div class="form-group bmd-form-group">
                                            <label
                                                for="name"
                                                class="bmd-label-floating"
                                                >Name</label
                                            >
                                            <input
                                                type="text"
                                                class="form-control"
                                                id="name"
                                                v-model="form.name"
                                            />
                                            <span
                                                class="text-danger"
                                                v-if="errors.name"
                                                >{{ errors.name[0] }}</span
                                            >
                                        </div>
                                    </div>
                                    <div class="col-sm-12 col-md-6">
                                        <div class="form-group bmd-form-group">
                                            <label
                                                for="code"
                                                class="bmd-label-floating"
                                                >Code</label
                                            >
                                            <input
                                                type="text"
                                                class="form-control"
                                                id="code"
                                                v-model="form.code"
                                            />
                                            <span
                                                class="text-danger"
                                                v-if="errors.code"
                                                >{{ errors.code[0] }}</span
                                            >
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="card-footer ml-auto">
                            <button
                                v-if="isEdit"
                                type="submit"
                                @click.prevent="update"
                                class="btn btn-rose"
                            >
                                Update
                            </button>
                            <button
                                v-else
                                type="submit"
                                @click.prevent="add"
                                class="btn btn-rose"
                            >
                                Add
                            </button>
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
            isEdit: false,
            form: {
                name: "",
                code: ""
            },
            errors: []
        };
    },

    methods: {
        add() {
            this.$Progress.start();
            axios
                .post("api/v1/products", this.form)
                .then(data => {
                    this.$Progress.finish();
                    this.$router.push({ name: "product" });
                })
                .catch(error => {
                    this.$Progress.fail();
                    if (error.response.status === 422) {
                        this.errors = error.response.data.errors;
                    }
                });
        },

        update() {
            this.$Progress.start();
            axios
                .post("api/v1/products", this.form)
                .then(data => {
                    this.$Progress.finish();
                    this.$router.push({ name: "product" });
                })
                .catch(error => {
                    this.$Progress.fail();
                    if (error.response.status === 422) {
                        this.errors = error.response.data.errors;
                    }
                });
        }
    }
};
</script>
