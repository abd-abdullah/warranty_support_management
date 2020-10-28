<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="offset-md-3 col-md-6">
                    <div class="card">
                        <div
                            class="card-header card-header-rose card-header-icon"
                        >
                            <div class="card-icon">
                                <i class="material-icons">filter_none</i>
                            </div>
                            <div class="row">
                                <div class="col-sm-12 col-md-6">
                                    <h4 class="card-title" v-if="isEdit">
                                        Edit Customer Type
                                    </h4>
                                    <h4 class="card-title" v-else>
                                        Add Customer Type
                                    </h4>
                                </div>
                                <div
                                    class="col-sm-12 col-md-6 text-right pr-md-0"
                                >
                                    <router-link
                                        to="/customer-types"
                                        class="btn btn-sm btn-primary"
                                        >Back to list</router-link
                                    >
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <form action="">
                                <div class="row">
                                    <div class="col-12">
                                        <div class="form-group bmd-form-group" v-bind:class="{ 'is-filled': form.name !== null }">
                                            <label
                                                for="name"
                                                class="bmd-label-floating"
                                                >Name<strong class="text-danger"> *</strong></label
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
                                </div>
                            </form>
                        </div>
                        <div class="card-footer ml-auto">
                            <button
                                v-if="isEdit"
                                type="submit"
                                @click.prevent="update"
                                class="btn btn-primary"
                            >
                                Update<span class="spinner"></span>
                            </button>
                            <button
                                v-else
                                type="submit"
                                @click.prevent="add"
                                class="btn btn-primary"
                            >
                                Add<span class="spinner"></span>
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
            isEdit:
                typeof this.$route.params.id != "undefined" &&
                this.$route.params.id != null
                    ? true
                    : false,
            id: this.$route.params.id,
            form: {
                name: null,
            },
            errors: []
        };
    },

    mounted() {
        if (this.isEdit) {
            this.$Progress.start();
            this.$jsHelper
                .get("api/v1/customer-types/" + this.id)
                .then(response => {
                    this.$Progress.finish();
                    this.form.name = response.data.data.name;
                })
                .catch(error => {
                    this.$Progress.fail();
                    this.$toaster.error("Something went wrong");
                });
        }
    },

    methods: {
        add(e) {
            this.$buttonLoader(e);
            this.$Progress.start();
            this.$jsHelper
                .post("api/v1/customer-types", this.form)
                .then(data => {
                    this.$Progress.finish();
                    this.$buttonLoader(e);
                    this.$toaster.success("Successfully Added");
                    setTimeout( () => this.$router.push({ name: "customer_type"}), 1000);
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

        update(e) {
            this.$buttonLoader(e);
            this.$Progress.start();
            this.$jsHelper
                .put("api/v1/customer-types/"+this.id, this.form)
                .then(data => {
                    this.$Progress.finish();
                    this.$buttonLoader(e);
                    this.$toaster.info("Successfully Updated");
                    setTimeout( () => this.$router.push({ name: "customer_type"}), 1000);
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
        }
    }
};
</script>
