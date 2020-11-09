<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-6">
                    <div class="card">
                        <div
                            class="card-header card-header-rose card-header-icon"
                        >
                            <div class="card-icon">
                                <i class="material-icons">account_box</i>
                            </div>
                            <div class="row">
                                <div class="col-sm-12 col-md-6">
                                    <h4 class="card-title">
                                        Update Profile
                                    </h4>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <form action="">
                                <div class="row">
                                    <div class="col-12">
                                        <div
                                            class="form-group bmd-form-group"
                                            v-bind:class="{
                                                'is-filled': form.name !== null
                                            }"
                                        >
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
                                        <div
                                            class="form-group bmd-form-group"
                                            v-bind:class="{
                                                'is-filled': form.email !== null
                                            }"
                                        >
                                            <label
                                                for="email"
                                                class="bmd-label-floating"
                                                >Email<strong class="text-danger"> *</strong></label
                                            >
                                            <input
                                                type="email"
                                                class="form-control"
                                                id="email"
                                                readonly
                                                v-model="form.email"
                                            />
                                            <span
                                                class="text-danger"
                                                v-if="errors.email"
                                                >{{ errors.email[0] }}</span
                                            >
                                        </div>
                                        
                                        <div
                                            class="form-group bmd-form-group"
                                            v-bind:class="{
                                                'is-filled': form.phone !== null
                                            }"
                                        >
                                            <label
                                                for="phone"
                                                class="bmd-label-floating"
                                                >Mobile<strong class="text-danger"> *</strong></label
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
                                        <div
                                            class="form-group bmd-form-group"
                                            v-bind:class="{
                                                'is-filled':
                                                    form.other_contact_numbers !==
                                                    null
                                            }"
                                        >
                                            <label
                                                for="other_contact_numbers"
                                                class="bmd-label-floating"
                                                >Other contact Numbers</label
                                            >
                                            <input
                                                type="text"
                                                class="form-control"
                                                id="other_contact_numbers"
                                                v-model="
                                                    form.other_contact_numbers
                                                "
                                            />
                                            <span
                                                class="text-danger"
                                                v-if="
                                                    errors.other_contact_numbers
                                                "
                                                >{{
                                                    errors
                                                        .other_contact_numbers[0]
                                                }}</span
                                            >
                                        </div>
                                    </div>
                                    <div class="col-12 d-none">
                                        <div class="form-group">
                                            <label
                                                class="select2-form-group"
                                                >Country</label
                                            >
                                            <Select2
                                                :options="optionsCountry"
                                                v-model="form.country_id"
                                                name="country_id"
                                                id="country"
                                                @change="getDropdown('api/v1/divisions/'+form.country_id, 'optionsDivision')"
                                                placeholder="Select country"
                                            />
                                            <span
                                                class="text-danger"
                                                v-if="errors.country_id"
                                                >{{
                                                    errors.country_id[0]
                                                }}</span
                                            >
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="form-group">
                                            <label
                                                class="select2-form-group"
                                                >Division</label
                                            >
                                            <Select2
                                                :options="optionsDivision"
                                                v-model="form.division_id"
                                                name="division_id"
                                                id="division"
                                                @change="getDropdown('api/v1/districts/'+form.division_id, 'optionsDistrict')"
                                                placeholder="Select Division"
                                            />
                                            <span
                                                class="text-danger"
                                                v-if="errors.division_id"
                                                >{{
                                                    errors.division_id[0]
                                                }}</span
                                            >
                                        </div>
                                    </div>
                                    <div :class="(form.division_id != null && form.division_id != '') ?'col-12':'col-12 d-none'">
                                        <div class="form-group">
                                            <label
                                                class="select2-form-group"
                                                >District</label
                                            >
                                            <Select2
                                                :options="optionsDistrict"
                                                v-model="form.district_id"
                                                name="district_id"
                                                id="district"
                                                @change="getDropdown('api/v1/upazilas/'+form.district_id, 'optionsUpazila')"
                                                placeholder="Select District"
                                            />
                                            <span
                                                class="text-danger"
                                                v-if="errors.district_id"
                                                >{{
                                                    errors.district_id[0]
                                                }}</span
                                            >
                                        </div>
                                    </div>
                                    <div :class="(form.district_id != null && form.district_id != '') ?'col-12':'col-12 d-none'">
                                        <div class="form-group">
                                            <label
                                                class="select2-form-group"
                                                >Upazila</label
                                            >
                                            <Select2
                                                :options="optionsUpazila"
                                                v-model="form.upazila_id"
                                                name="upazila_id"
                                                id="upazila"
                                                placeholder="Select Upazila"
                                            />
                                            <span
                                                class="text-danger"
                                                v-if="errors.upazila_id"
                                                >{{
                                                    errors.upazila_id[0]
                                                }}</span
                                            >
                                        </div>
                                    </div>                                 
                                    <div class="col-12">
                                        <div
                                            class="form-group bmd-form-group "
                                            v-bind:class="{
                                                'is-filled':
                                                    form.address !== null
                                            }"
                                        >
                                            <label
                                                for="address"
                                                class="bmd-label-floating"
                                                >Address/Road no/House no<strong class="text-danger"> *</strong></label
                                            >
                                            <textarea
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
                                </div>
                            </form>
                        </div>
                        <div class="card-footer ml-auto">
                            <button
                                type="submit"
                                @click.prevent="updateProfile"
                                class="btn btn-primary"
                            >
                                Update<span class="spinner"></span>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card">
                        <div
                            class="card-header card-header-rose card-header-icon"
                        >
                            <div class="card-icon">
                                <i class="material-icons">lock_open</i>
                            </div>
                            <div class="row">
                                <div class="col-sm-12 col-md-6">
                                    <h4 class="card-title">
                                        Update Password
                                    </h4>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <form action="">
                                <div class="row">
                                    <div class="col-12">
                                        <div
                                            class="form-group bmd-form-group"
                                        >
                                            <label
                                                for="password"
                                                class="bmd-label-floating"
                                                >Current Password</label
                                            >
                                            <input
                                                type="password"
                                                class="form-control"
                                                id="password"
                                                v-model="password.current_password"
                                            />
                                            <span
                                                class="text-danger"
                                                v-if="errors.current_password"
                                                >{{ errors.current_password[0] }}</span
                                            >
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div
                                            class="form-group bmd-form-group"
                                        >
                                            <label
                                                for="password"
                                                class="bmd-label-floating"
                                                >New Password</label
                                            >
                                            <input
                                                type="password"
                                                class="form-control"
                                                id="password"
                                                v-model="password.new_password"
                                            />
                                            <span
                                                class="text-danger"
                                                v-if="errors.new_password"
                                                >{{ errors.new_password[0] }}</span
                                            >
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div
                                            class="form-group bmd-form-group"
                                        >
                                            <label
                                                for="password"
                                                class="bmd-label-floating"
                                                >New Confirm Password</label
                                            >
                                            <input
                                                type="password"
                                                class="form-control"
                                                id="password"
                                                v-model="password.new_confirm_password"
                                            />
                                            <span
                                                class="text-danger"
                                                v-if="errors.new_confirm_password"
                                                >{{ errors.new_confirm_password[0] }}</span
                                            >
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="card-footer ml-auto">
                            <button
                                type="submit"
                                @click.prevent="updatePassword"
                                class="btn btn-primary"
                            >
                                Update Password<span class="spinner"></span>
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
            form: {
                id:null,
                email:null,
                name: null,
                phone: null,
                other_contact_numbers: null,
                photo: null,
                country_id: 20,
                division_id: null,
                district_id: null,
                upazila_id: null,
                address: null
            },
            password:{
                current_password:null,
                new_password:null,
                new_confirm_password:null
            },
            errors: [],
            optionsCountry: [],
            optionsDivision: [],
            optionsDistrict: [],
            optionsUpazila: []
        };
    },

    mounted() {
        this.$Progress.start();
        this.$jsHelper.get('api/v1/user')
        .then(response => {
            this.$Progress.finish();
            this.form.id = response.data.id;
            this.form.email = response.data.email;
            this.form.name = response.data.name;
            this.form.phone = response.data.phone;
            this.form.other_contact_numbers = response.data.other_contact_numbers;
            this.form.division_id = response.data.division_id;
            this.form.district_id = response.data.district_id;
            this.form.upazila_id = response.data.upazila_id;
            this.form.address = response.data.address;
            this.selectOption();
        })
        .catch(error => {
            this.$Progress.fail();
            this.$toaster.error("Something went wrong");
        });
    },

    methods: {
        updateProfile(e) {
            this.$buttonLoader(e);
            this.$Progress.start();
            this.$jsHelper
                .put("api/v1/update-profile", this.form)
                .then(data => {
                    this.$Progress.finish();
                    this.$toaster.success("Successfully Updated");
                    setTimeout(
                        () => this.$router.push({ name: "dashboard" }),
                        400
                    );
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

        updatePassword(e) {
            this.$buttonLoader(e);
            this.$Progress.start();
            this.$jsHelper
                .put("api/v1/update-profile", this.password)
                .then(data => {
                    this.$Progress.finish();
                    this.$toaster.info("Successfully Updated");
                    setTimeout(
                        () => this.$router.push({ name: "dashboard" }),
                        400
                    );
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
        getDropdown(url, option){
            this.$Progress.start();
            this.$jsHelper.get(url).then(response => {
                this[option] = response.data.map(function(val){
                    return {id:val.id, text:val.name}
                });
                this.$Progress.finish();
            }).catch(error => {
                this.$Progress.fail();
            });
        },
        selectOption(){
            this.getDropdown('api/v1/countries', 'optionsCountry');
            this.getDropdown('api/v1/divisions/'+this.form.country_id, 'optionsDivision');
            this.getDropdown('api/v1/districts/'+this.form.division_id, 'optionsDistrict');
            this.getDropdown('api/v1/upazilas/'+this.form.district_id, 'optionsUpazila');
        }
    }
};
</script>
