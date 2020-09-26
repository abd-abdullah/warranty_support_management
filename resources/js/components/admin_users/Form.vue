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
                                        Edit Admin User
                                    </h4>
                                    <h4 class="card-title" v-else>
                                        Add Admin User
                                    </h4>
                                </div>
                                <div
                                    class="col-sm-12 col-md-6 text-right pr-md-0"
                                >
                                    <router-link
                                        to="/admin-users"
                                        class="btn btn-sm btn-rose"
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
                                        <div class="form-group bmd-form-group" v-bind:class="{ 'is-filled': form.email !== null }">
                                            <label
                                                for="email"
                                                class="bmd-label-floating"
                                                >Email</label
                                            >
                                            <input
                                                type="email"
                                                class="form-control"
                                                id="email"
                                                v-model="form.email"
                                            />
                                            <span
                                                class="text-danger"
                                                v-if="errors.email"
                                                >{{ errors.email[0] }}</span
                                            >
                                        </div>
                                        <div class="form-group bmd-form-group" v-bind:class="{ 'is-filled': form.phone !== null }">
                                            <label
                                                for="phone"
                                                class="bmd-label-floating"
                                                >Phone</label
                                            >
                                            <input
                                                type="number"
                                                class="form-control"
                                                id="phone"
                                                v-model="form.phone"
                                            />
                                            <span
                                                class="text-danger"
                                                v-if="errors.phone"
                                                >{{ errors.phone[0] }}</span
                                            >
                                        </div>
                                        <div class="form-group bmd-form-group" v-bind:class="{ 'is-filled': form.other_contact_numbers !== null }">
                                            <label
                                                for="other_contact_numbers"
                                                class="bmd-label-floating"
                                                >Other contact Numbers</label
                                            >
                                            <input
                                                type="text"
                                                class="form-control"
                                                id="other_contact_numbers"
                                                v-model="form.other_contact_numbers"
                                            />
                                            <span
                                                class="text-danger"
                                                v-if="errors.other_contact_numbers"
                                                >{{ errors.other_contact_numbers[0] }}</span
                                            >
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="form-group bmd-form-group " v-bind:class="{ 'is-filled': form.address !== null }">
                                            <label
                                                for="address"
                                                class="bmd-label-floating"
                                                >Address</label
                                            >
                                            <input
                                                type="text"
                                                class="form-control"
                                                id="address"
                                                v-model="form.address"
                                            />
                                            <span
                                                class="text-danger"
                                                v-if="errors.address"
                                                >{{ errors.address[0] }}</span
                                            >
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="form-group bmd-form-group" v-bind:class="{ 'is-filled': form.country_id !== null }">
                                            <label
                                                for="country_id"
                                                class="bmd-label-floating"
                                                >Country</label
                                            >
                                            <select v-model="form.country_id">
                                                <option disabled value="">Select Country</option>
                                                <option>A</option>
                                                <option>B</option>
                                                <option>C</option>
                                            </select>
                                            <span
                                                class="text-danger"
                                                v-if="errors.country_id"
                                                >{{ errors.country_id[0] }}</span
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
            isEdit:
                typeof this.$route.params.id != "undefined" &&
                this.$route.params.id != null
                    ? true
                    : false,
            id: this.$route.params.id,
            form: {
                name: null,
                email: null,
                phone: null,
                other_contact_numbers: null,
                photo: null,
                country_id: null
            },
            errors: []
        };
    },

    mounted() {
        if (this.isEdit) {
            this.$Progress.start();
            this.$jsHelper
                .get("api/v1/admin-users/" + this.id)
                .then(response => {
                    this.$Progress.finish();
                    this.form.name = response.data.data.name;
                    this.form.email = response.data.data.email;
                    this.form.phone = response.data.data.phone;
                    this.form.other_contact_numbers = response.data.data.other_contact_numbers;
                    this.form.photo = response.data.data.photo;
                    this.form.country_id = response.data.data.country_id;
                })
                .catch(error => {
                    this.$Progress.fail();
                    this.$toaster.error("Something went wrong");
                });
        }
    },

    methods: {
        add() {
            this.$Progress.start();
            this.$jsHelper
                .post("api/v1/admin-users", this.form)
                .then(data => {
                    this.$Progress.finish();
                    this.$toaster.success("Successfully Added");
                    setTimeout( () => this.$router.push({ name: "admin_user"}), 1000);
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
            this.$jsHelper
                .put("api/v1/admin-users/"+this.id, this.form)
                .then(data => {
                    this.$Progress.finish();
                    this.$toaster.info("Successfully Updated");
                    setTimeout( () => this.$router.push({ name: "admin_user"}), 1000);
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
