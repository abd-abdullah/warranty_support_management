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
                                        Edit Technician
                                    </h4>
                                    <h4 class="card-title" v-else>
                                        Add Technician
                                    </h4>
                                </div>
                                <div
                                    class="col-sm-12 col-md-6 text-right pr-md-0"
                                >
                                    <router-link
                                        to="/technicians"
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
                                                'is-filled': form.password !== null,
                                                'd-none': isEdit == true
                                            }"
                                        >
                                            <label
                                                for="password"
                                                class="bmd-label-floating"
                                                >Password</label
                                            >
                                            <input
                                                type="password"
                                                class="form-control"
                                                id="password"
                                                v-model="form.password"
                                            />
                                            <span
                                                class="text-danger"
                                                v-if="errors.password"
                                                >{{ errors.password[0] }}</span
                                            >
                                        </div>
                                        <div>
                                        <label
                                                for="joining_date"
                                                class="mb-0 fs11"
                                                >Date of Joining<strong class="text-danger"> *</strong></label
                                            >
                                        <v-date-picker v-model="form.joining_date" :popover ="{ visibility: 'click'}">
                                            <template v-slot="{ inputValue, inputEvents }">
                                                <input
                                                class="bg-white border border-bottom-0 form-control px-2 py-1 rounded"
                                                :value="inputValue"
                                                v-on="inputEvents"
                                                />
                                            </template>
                                        </v-date-picker>
                                         <span
                                                class="text-danger"
                                                v-if="errors.joining_date"
                                                >{{ errors.joining_date[0] }}</span
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
                                                type="text"
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
                                                >Country<strong class="text-danger"> *</strong></label
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
                                                >Division<strong class="text-danger"> *</strong></label
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
                                                >District<strong class="text-danger"> *</strong></label
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
                                        <div class="form-group">
                                            <label
                                                class="select2-form-group"
                                                >Zone<strong class="text-danger"> *</strong></label
                                            >
                                            <Select2
                                                :options="optionsZone"
                                                v-model="form.zone_id"
                                                name="zone_id"
                                                placeholder="Select Zone"
                                            />
                                            <span
                                                class="text-danger"
                                                v-if="errors.zone_id"
                                                >{{
                                                    errors.zone_id[0]
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
                email: null,
                joining_date: new Date(),
                password: null,
                phone: null,
                other_contact_numbers: null,
                photo: null,
                country_id: 20,
                division_id: null,
                district_id: null,
                upazila_id: null,
                zone_id: null,
                address: null
            },
            errors: [],
            optionsCountry: [],
            optionsDivision: [],
            optionsDistrict: [],
            optionsUpazila: [],
            optionsZone: []
        };
    },

    mounted() {
        this.$Progress.start();
        if (this.isEdit) {
            this.$jsHelper
                .get("api/v1/technicians/" + this.id)
                .then(response => {
                    this.form.name = response.data.data.name;
                    this.form.joining_date = new Date(response.data.data.date_of_join);
                    this.form.email = response.data.data.email;
                    this.form.phone = response.data.data.phone;
                    this.form.other_contact_numbers =
                        response.data.data.other_contact_numbers;
                    this.form.photo = response.data.data.photo;
                    this.form.division_id = response.data.data.division_id;
                    this.form.district_id = response.data.data.district_id;
                    this.form.upazila_id = response.data.data.upazila_id;
                    this.form.zone_id = response.data.data.zone_id;
                    this.form.address = response.data.data.address;
                    this.selectOption();
                })
                .catch(error => {
                    this.$Progress.fail();
                    this.$toaster.error("Something went wrong");
                });
        }
        else{
            this.getDropdown('api/v1/zones-all', 'optionsZone');
            this.getDropdown('api/v1/countries', 'optionsCountry');
            this.getDropdown('api/v1/divisions/'+this.form.country_id, 'optionsDivision');
        }
    },

    methods: {
        add(e) {
            this.$buttonLoader(e);
            this.$Progress.start();
            this.$jsHelper
                .post("api/v1/technicians", this.form)
                .then(data => {
                    this.$Progress.finish();
                    this.$toaster.success("Successfully Added");
                    setTimeout(
                        () => this.$router.push({ name: "technician" }),
                        1000
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

        update(e) {
            this.$Progress.start();
            this.$buttonLoader(e);
            this.$jsHelper
                .put("api/v1/technicians/" + this.id, this.form)
                .then(data => {
                    this.$Progress.finish();
                    this.$toaster.info("Successfully Updated");
                    setTimeout(
                        () => this.$router.push({ name: "technician" }),
                        1000
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
            this.getDropdown('api/v1/zones-all', 'optionsZone');
            this.getDropdown('api/v1/countries', 'optionsCountry');
            this.getDropdown('api/v1/divisions/'+this.form.country_id, 'optionsDivision');
            this.getDropdown('api/v1/districts/'+this.form.division_id, 'optionsDistrict');
            this.getDropdown('api/v1/upazilas/'+this.form.district_id, 'optionsUpazila');
        }
    }
};
</script>
