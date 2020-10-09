<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
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
                                        Edit Purchase
                                    </h4>
                                    <h4 class="card-title" v-else>
                                        Add Purchase
                                    </h4>
                                </div>
                                <div
                                    class="col-sm-12 col-md-6 text-right pr-md-0"
                                >
                                    <router-link
                                        to="/sales"
                                        class="btn btn-sm btn-rose"
                                        >Back to list</router-link
                                    >
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-4 col-sm-12">
                                    <fieldset class="border">
                                        <legend class="border">
                                            Customer Information
                                        </legend>
                                        <div class="row">
                                            <div class="col-12">
                                                <button class="btn btn-sm btn-tumblr float-right mt-n4 p-1" @click.prevent="resetSelectedCustomer">Reset</button>
                                            </div>
                                            <div class="col-12">
                                                <div class="form-group">
                                                    <label
                                                        class="select2-form-group text-primary"
                                                        >Existing customer</label
                                                    >
                                                    <Select2
                                                        :options="
                                                            optionsCustomer
                                                        "
                                                        v-model="
                                                            form.old_customer_id
                                                        "
                                                        @change="setCustomarData()"
                                                        id="old_customer"
                                                        placeholder="Select Existing Customer"
                                                    />
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <div
                                                    class="form-group bmd-form-group"
                                                    v-bind:class="{
                                                        'is-filled':
                                                            form.name !==
                                                            null
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
                                                        :readonly="form.old_customer_id != null"
                                                    />
                                                    <span
                                                        class="text-danger"
                                                        v-if="errors.name"
                                                        >{{
                                                            errors.name[0]
                                                        }}</span
                                                    >
                                                </div>
                                                <div
                                                    class="form-group bmd-form-group"
                                                    v-bind:class="{
                                                        'is-filled':
                                                            form.customerId !==
                                                            null
                                                    }"
                                                >
                                                    <label
                                                        for="customerId"
                                                        class="bmd-label-floating"
                                                        >Customer ID<strong class="text-danger"> *</strong></label
                                                    >
                                                    <input
                                                        type="text"
                                                        class="form-control"
                                                        id="customerId"
                                                        :readonly="form.old_customer_id != null"
                                                        v-model="
                                                            form.customerId
                                                        "
                                                    />
                                                    <span
                                                        class="text-danger"
                                                        v-if="
                                                            errors.customerId
                                                        "
                                                        >{{
                                                            errors
                                                                .customerId[0]
                                                        }}</span
                                                    >
                                                </div>
                                                <div
                                                    class="form-group bmd-form-group"
                                                    v-bind:class="{
                                                        'is-filled':
                                                            form.email !==
                                                            null
                                                    }"
                                                >
                                                    <label
                                                        for="email"
                                                        class="bmd-label-floating"
                                                        >Email</label
                                                    >
                                                    <input
                                                        type="email"
                                                        class="form-control"
                                                        id="email"
                                                        :readonly="
                                                            (isEdit === true || form.old_customer_id != null)
                                                        "
                                                        v-model="form.email"
                                                    />
                                                    <span
                                                        class="text-danger"
                                                        v-if="errors.email"
                                                        >{{
                                                            errors.email[0]
                                                        }}</span
                                                    >
                                                </div>

                                                <div
                                                    class="form-group bmd-form-group"
                                                    v-bind:class="{
                                                        'is-filled':
                                                            form.phone !==
                                                            null
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
                                                        :readonly="form.old_customer_id != null"
                                                        v-model="form.phone"
                                                    />
                                                    <span
                                                        class="text-danger"
                                                        v-if="errors.phone"
                                                        >{{
                                                            errors.phone[0]
                                                        }}</span
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
                                                        >Other contact
                                                        Numbers</label
                                                    >
                                                    <input
                                                        type="text"
                                                        class="form-control"
                                                        id="other_contact_numbers"
                                                        v-model="
                                                            form.other_contact_numbers
                                                        "
                                                        :readonly="form.old_customer_id != null"
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
                                                        :options="
                                                            optionsCountry
                                                        "
                                                        v-model="
                                                            form.country_id
                                                        "
                                                        name="country_id"
                                                        id="country"
                                                        :readonly="form.old_customer_id != null"
                                                        @change="
                                                            getDropdown(
                                                                'api/v1/divisions/' +
                                                                    form.country_id,
                                                                'optionsDivision'
                                                            )
                                                        "
                                                        placeholder="Select country"
                                                    />
                                                    <span
                                                        class="text-danger"
                                                        v-if="
                                                            errors.country_id
                                                        "
                                                        >{{
                                                            errors
                                                                .country_id[0]
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
                                                        :options="
                                                            optionsDivision
                                                        "
                                                        v-model="
                                                            form.division_id
                                                        "
                                                        :disabled="form.old_customer_id != null"
                                                        name="division_id"
                                                        id="division"
                                                        @change="
                                                            getDropdown(
                                                                'api/v1/districts/' +
                                                                    form.division_id,
                                                                'optionsDistrict'
                                                            )
                                                        "
                                                        placeholder="Select Division"
                                                    />
                                                    <span
                                                        class="text-danger"
                                                        v-if="
                                                            errors.division_id
                                                        "
                                                        >{{
                                                            errors
                                                                .division_id[0]
                                                        }}</span
                                                    >
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <div class="form-group">
                                                    <label
                                                        class="select2-form-group"
                                                        >District</label
                                                    >
                                                    <Select2
                                                        :options="
                                                            optionsDistrict
                                                        "
                                                        v-model="
                                                            form.district_id
                                                        "
                                                        :disabled="form.old_customer_id != null"
                                                        name="district_id"
                                                        id="district"
                                                        @change="
                                                            getDropdown(
                                                                'api/v1/upazilas/' +
                                                                    form.district_id,
                                                                'optionsUpazila'
                                                            )
                                                        "
                                                        placeholder="Select District"
                                                    />
                                                    <span
                                                        class="text-danger"
                                                        v-if="
                                                            errors.district_id
                                                        "
                                                        >{{
                                                            errors
                                                                .district_id[0]
                                                        }}</span
                                                    >
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <div class="form-group">
                                                    <label
                                                        class="select2-form-group"
                                                        >Upazila</label
                                                    >
                                                    <Select2
                                                        :options="
                                                            optionsUpazila
                                                        "
                                                        v-model="
                                                            form.upazila_id
                                                        "
                                                        :disabled="form.old_customer_id != null"
                                                        name="upazila_id"
                                                        id="upazila"
                                                        placeholder="Select Upazila"
                                                    />
                                                    <span
                                                        class="text-danger"
                                                        v-if="
                                                            errors.upazila_id
                                                        "
                                                        >{{
                                                            errors
                                                                .upazila_id[0]
                                                        }}</span
                                                    >
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <div
                                                    class="form-group bmd-form-group "
                                                    v-bind:class="{
                                                        'is-filled':
                                                            form.address !==
                                                            null
                                                    }"
                                                >
                                                    <label
                                                        for="address"
                                                        class="bmd-label-floating"
                                                        >Address/Road
                                                        no/House no<strong class="text-danger"> *</strong></label
                                                    >
                                                    <textarea
                                                        type="text"
                                                        class="form-control"
                                                        id="address"
                                                        v-model="
                                                            form.address
                                                        "
                                                        :readonly="form.old_customer_id != null"
                                                    />
                                                    <span
                                                        class="text-danger"
                                                        v-if="
                                                            errors.address
                                                        "
                                                        >{{
                                                            errors
                                                                .address[0]
                                                        }}</span
                                                    >
                                                </div>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                                <div class="col-md-4 col-sm-12">
                                    <fieldset class="border">
                                        <legend class="border">
                                            Product Information
                                        </legend>

                                        <div class="row">
                                            <div class="col-12">
                                                <button class="btn btn-sm btn-tumblr float-right mt-n4 p-1" @click.prevent="resetSelectedProduct">Reset</button>
                                            </div>
                                            <div class="col-12">
                                                <div class="form-group">
                                                    <label
                                                        class="select2-form-group text-primary"
                                                        >Existing Product</label
                                                    >
                                                    <Select2
                                                        :options="
                                                            optionsProduct
                                                        "
                                                        v-model="
                                                            form.old_product_id
                                                        "
                                                        
                                                        @change="setProductData()"
                                                        id="old_product"
                                                        placeholder="Select Existing Product"
                                                    />
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <div
                                                    class="form-group bmd-form-group"
                                                    v-bind:class="{
                                                        'is-filled':
                                                            form.product_name !== null
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
                                                        id="product_name"
                                                        :readonly="form.old_product_id != null"
                                                        v-model="form.product_name"
                                                    />
                                                    <span
                                                        class="text-danger"
                                                        v-if="errors.product_name"
                                                        >{{
                                                            errors.product_name[0]
                                                        }}</span
                                                    >
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <div
                                                    class="form-group bmd-form-group"
                                                    v-bind:class="{
                                                        'is-filled':
                                                            form.product_code !== null
                                                    }"
                                                >
                                                    <label
                                                        for="code"
                                                        class="bmd-label-floating"
                                                        >Code<strong class="text-danger"> *</strong></label
                                                    >
                                                    <input
                                                        type="text"
                                                        class="form-control"
                                                        id="code"
                                                        :readonly="form.old_product_id != null"
                                                        v-model="form.product_code"
                                                    />
                                                    <span
                                                        class="text-danger"
                                                        v-if="errors.product_code"
                                                        >{{
                                                            errors.product_code[0]
                                                        }}</span
                                                    >
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <div
                                                    class="form-group bmd-form-group"
                                                    v-bind:class="{
                                                        'is-filled':
                                                            form.purchase_capacity !== null
                                                    }"
                                                >
                                                    <label
                                                        for="code"
                                                        class="bmd-label-floating"
                                                        >Capacity<strong class="text-danger"> *</strong></label
                                                    >
                                                    <input
                                                        type="text"
                                                        class="form-control"
                                                        id="purchase_capacity"
                                                        v-model="form.purchase_capacity"
                                                    />
                                                    <span
                                                        class="text-danger"
                                                        v-if="errors.purchase_capacity"
                                                        >{{
                                                            errors.purchase_capacity[0]
                                                        }}</span
                                                    >
                                                </div>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                                <div class="col-md-4 col-sm-12">
                                    <fieldset class="border">
                                        <legend class="border">
                                            Purchase Information
                                        </legend>
                                        <div class="row">
                                            
                                            <div class="col-12">
                                                <div
                                                    class="form-group bmd-form-group"
                                                    v-bind:class="{
                                                        'is-filled':
                                                            form.purchase_price !== null
                                                    }"
                                                >
                                                    <label
                                                        for="purchase_price"
                                                        class="bmd-label-floating"
                                                        >Price</label
                                                    >
                                                    <input
                                                        type="text"
                                                        class="form-control"
                                                        id="purchase_price"
                                                        v-model="form.purchase_price"
                                                    />
                                                    <span
                                                        class="text-danger"
                                                        v-if="errors.purchase_price"
                                                        >{{
                                                            errors.purchase_price[0]
                                                        }}</span
                                                    >
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <div
                                                    class="form-group bmd-form-group"
                                                >
                                                <label
                                                    for="purchase_from"
                                                    class="mr-2"
                                                    >Purchase from</label
                                                >
                                                <div
                                                    class="form-check custom-control-inline mr-0"
                                                >
                                                    <label
                                                        class="form-check-label"
                                                    >
                                                        <input
                                                            class="form-check-input"
                                                            type="radio"
                                                            v-model="form.purchase_from"
                                                            value="evaly"
                                                        />Evaly
                                                        <span class="circle">
                                                            <span
                                                                class="check"
                                                            ></span>
                                                        </span>
                                                    </label>
                                                </div>
                                                <div
                                                    class="form-check custom-control-inline mr-0"
                                                >
                                                    <label
                                                        class="form-check-label"
                                                    >
                                                        <input
                                                            class="form-check-input"
                                                            type="radio"
                                                            v-model="form.purchase_from"
                                                            value="other"
                                                        />Other
                                                        <span class="circle">
                                                            <span
                                                                class="check"
                                                            ></span>
                                                        </span>
                                                    </label>
                                                </div>
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <div
                                                    class="form-group bmd-form-group is-filled"
                                                >
                                                    <label
                                                        for="date_of_purchase"
                                                        class="bmd-label-floating"
                                                        >Purchase Date<strong class="text-danger"> *</strong></label
                                                    >
                                                    <v-date-picker
                                                        :masks="{
                                                            input: [
                                                                'YYYY-MM-DD'
                                                            ],
                                                            date: ['YYYY-MM-DD']
                                                        }"
                                                        v-model="
                                                            form.date_of_purchase
                                                        "
                                                        :popover="{ visibility: 'click', placement: 'bottom' }"
                                                    />
                                                    <span
                                                        class="text-danger"
                                                        v-if="
                                                            errors.date_of_purchase
                                                        "
                                                        >{{
                                                            errors
                                                                .date_of_purchase[0]
                                                        }}</span
                                                    >
                                                </div>
                                            </div>
                                             <div class="col-12">
                                                <div
                                                    class="form-group bmd-form-group is-filled"
                                                >
                                                    <label
                                                        for="last_date_of_warranty"
                                                        class="bmd-label-floating"
                                                        >Last Date of
                                                        Warranty<strong class="text-danger"> *</strong></label
                                                    >
                                                    <v-date-picker
                                                        :masks="{
                                                            input: [
                                                                'YYYY-MM-DD'
                                                            ],
                                                            date: ['YYYY-MM-DD']
                                                        }"
                                                        v-model="
                                                            form.last_date_of_warranty
                                                        "
                                                        :popover="{ visibility: 'click',  placement: 'bottom'  }"
                                                    />
                                                    <span
                                                        class="text-danger"
                                                        v-if="
                                                            errors.last_date_of_warranty
                                                        "
                                                        >{{
                                                            errors
                                                                .last_date_of_warranty[0]
                                                        }}</span
                                                    >
                                                </div>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                            </div>
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
                customerId: null,
                email: null,
                phone: null,
                other_contact_numbers: null,
                country_id: 20,
                division_id: null,
                district_id: null,
                upazila_id: null,
                address: null,
                product_name:null,
                product_code:null,
                purchase_capacity:null,
                purchase_price:null,
                purchase_from:'evaly',
                date_of_purchase: null,
                last_date_of_warranty: null, 
                old_customer_id: null,
                old_product_id: null,
                old_user_id: null
            },
            errors: [],
            optionsCustomer: [],
            optionsProduct: [],
            optionsCountry: [],
            optionsDivision: [],
            optionsDistrict: [],
            optionsUpazila: []
        };
    },

    mounted() {
        this.$Progress.start();
        if (this.isEdit) {
            this.$jsHelper
                .get("api/v1/sales/" + this.id)
                .then(response => {
                    this.form.old_product_id = response.data.data.product_id;
                    this.form.old_customer_id = response.data.data.customer_id;
                    this.form.old_customer_id = response.data.data.customer_id;
                    this.form.purchase_capacity = response.data.data.purchase_capacity;
                    this.form.purchase_price = response.data.data.purchase_price;
                    this.form.purchase_from = response.data.data.purchase_from;
                    this.form.date_of_purchase = new Date(response.data.data.date_of_purchase);
                    this.form.last_date_of_warranty = new Date(response.data.data.last_date_of_warranty);
                    this.getDropdownCustomer('api/v1/customers-all', 'optionsCustomer');
                    this.getDropdownProduct('api/v1/products-all', 'optionsProduct');
                    this.setCustomarData();
                    this.setProductData();
                    this.selectOption();
                })
                .catch(error => {
                    this.$Progress.fail();
                    this.$toaster.error("Something went wrong");
                });
        }
        else{
            this.getDropdownCustomer('api/v1/customers-all', 'optionsCustomer');
            this.getDropdownProduct('api/v1/products-all', 'optionsProduct');
            this.getDropdown('api/v1/countries', 'optionsCountry');
            this.getDropdown('api/v1/divisions/'+this.form.country_id, 'optionsDivision');
        }
    },

    methods: {
        add() {
            this.$Progress.start();
            this.$jsHelper
                .post("api/v1/sales", this.form)
                .then(data => {
                    this.$Progress.finish();
                    this.$toaster.success("Successfully Added");
                    setTimeout(
                        () => this.$router.push({ name: "sale" }),
                        1000
                    );
                })
                .catch(error => {
                    this.$Progress.fail();
                    if (error.response.status === 422) {
                        this.errors = error.response.data.errors;
                    }
                    else{
                        this.$toaster.error("Something went wrong");
                    }
                });
        },

        update() {
            this.$Progress.start();
            this.$jsHelper
                .put("api/v1/sales/" + this.id, this.form)
                .then(data => {
                    this.$Progress.finish();
                    this.$toaster.info("Successfully Updated");
                    setTimeout(
                        () => this.$router.push({ name: "sale" }),
                        1000
                    );
                })
                .catch(error => {
                    this.$Progress.fail();
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
        getDropdownCustomer(url, option){
            this.$Progress.start();
            this.$jsHelper.get(url).then(response => {
                this[option] = response.data.data.map(function(val){
                    return {id:val.id, text:val.name+'-'+val.customerId+' ('+val.phone+')'}
                });
                this.$Progress.finish();
            }).catch(error => {
                this.$Progress.fail();
            });
        },
        getDropdownProduct(url, option){
            this.$Progress.start();
            this.$jsHelper.get(url).then(response => {
                this[option] = response.data.data.map(function(val){
                    return {id:val.id, text:val.name+'-'+val.code}
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
        },

        setCustomarData(){
            this.$Progress.start();
            this.$jsHelper.get('api/v1/customers/'+this.form.old_customer_id).then(response => {
                this.form.old_user_id = response.data.data.user_id;
                this.form.name = response.data.data.name;
                this.form.customerId = response.data.data.customerId;
                this.form.email = response.data.data.email;
                this.form.phone = response.data.data.phone;
                this.form.other_contact_numbers =
                    response.data.data.other_contact_numbers;
                this.form.country_id = response.data.data.country_id;
                this.form.division_id = response.data.data.division_id;
                this.form.district_id = response.data.data.district_id;
                this.form.upazila_id = response.data.data.upazila_id;
                this.form.address = response.data.data.address;
                this.selectOption();
                this.$Progress.finish();
            }).catch(error => {
                this.$Progress.fail();
            });
        },
        
        setProductData(){
            this.$Progress.start();
            this.$jsHelper.get('api/v1/products/'+this.form.old_product_id).then(response => {
                this.form.product_name = response.data.data.name,
                this.form.product_code = response.data.data.code,
                this.$Progress.finish();
            }).catch(error => {
                this.$Progress.fail();
            });
        },

        resetSelectedCustomer(){
            this.form.old_user_id = null;
            this.form.old_customer_id = null; 
            this.form.name = null;
            this.form.customerId = null;
            this.form.email = null;
            this.form.phone = null;
            this.form.other_contact_numbers = null;
            this.form.country_id = null;
            this.form.division_id = null;
            this.form.district_id = null;
            this.form.upazila_id = null;
            this.form.address = null;
            this.selectOption(); 
        },

        resetSelectedProduct(){
            this.form.old_product_id = null;
            this.form.product_name = null;
            this.form.product_code = null;
        }
    }
};
</script>