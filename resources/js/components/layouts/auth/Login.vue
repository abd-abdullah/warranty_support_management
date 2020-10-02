<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-4 col-md-6 col-sm-8 ml-auto mr-auto">
                <form class="form" method action>
                    <div class="card card-login">
                        <div class="card-header card-header-city text-center">
                            <h4 class="card-title">City Water Purifier</h4>
                        </div>
                        <div class="card-body">
                            <span class="bmd-form-group">
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">
                                            <i class="material-icons">email</i>
                                        </span>
                                    </div>
                                    <input
                                        type="email"
                                        v-model="form.email"
                                        class="form-control"
                                        placeholder="Email..."
                                    />
                                </div>
                                <span
                                    class="text-danger float-right"
                                    v-if="errors.email"
                                    >{{ errors.email[0] }}</span
                                >
                            </span>
                            <span class="bmd-form-group">
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">
                                            <i class="material-icons"
                                                >lock_outline</i
                                            >
                                        </span>
                                    </div>
                                    <input
                                        type="password"
                                        v-model="form.password"
                                        class="form-control"
                                        placeholder="Password..."
                                    />
                                </div>
                                <span
                                    class="text-danger float-right"
                                    v-if="errors.password"
                                    >{{ errors.password[0] }}</span
                                >
                            </span>
                        </div>
                        <div class="card-footer justify-content-center">
                            <a
                                @click.prevent="login"
                                class="btn btn-info btn-link btn-lg"
                                >Login</a
                            >
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            form: {
                email: "",
                password: ""
            },
            errors: []
        };
    },

    methods: {
        login() {
            this.$user
                .login(this.form)
                .then(() => {
                    this.$root.$emit("login", true);
                    localStorage.setItem("auth", "true");
                    this.$router.push({ name: "dashboard" });
                })
                .catch(error => {
                    if (error.response.status === 422) {
                        this.errors = error.response.data.errors;
                    }
                });
        }
    }
};
</script>
