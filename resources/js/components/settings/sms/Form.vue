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
                                    <h4 class="card-title">
                                        Schedule SMS Setting
                                    </h4>
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
                                    <div class="col-sm-12">
                                        <div class="form-group">
                                            <label
                                                class="select2-form-group"
                                                >Message Language Type<strong class="text-danger"> *</strong></label
                                            >
                                            <Select2
                                                :options="optionsMessageType"
                                                v-model="form.message_type"
                                                placeholder="Select Message Language"
                                            />
                                            <span
                                                class="text-danger"
                                                v-if="errors.message_type"
                                                >{{ errors.message_type[0] }}</span
                                            >
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div
                                            class="form-group bmd-form-group "
                                            v-bind:class="{'is-filled':form.message}"
                                        >
                                            <label
                                                for="text"
                                                class="bmd-label-floating"
                                                >Message<strong class="text-danger"> *</strong> <span class="font-weight-bolder text-info">Characters:(<span>{{wordCount}}</span>)</span></label
                                            >
                                            <textarea
                                                type="text"
                                                class="form-control"
                                                id="text"
                                                rows="5"
                                                @keyup="countWord"
                                                v-model="form.message"
                                            />
                                            <span
                                                class="text-danger"
                                                v-if="errors.message"
                                                >{{ errors.message[0] }}</span
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
                message_type: null,
                message: '',
            },
            errors: [],
            optionsMessageType:[{'id':1,'text':'English'}, {'id':2,'text':'Bangali'}],
            wordCount:0
        };
    },

    mounted() {
        if (this.isEdit) {
            this.$Progress.start();
            this.$jsHelper
                .get("api/v1/sms-settings/" + this.id)
                .then(response => {
                    this.$Progress.finish();
                    this.form.name = response.data.name;
                    this.form.message_type = response.data.message_type;
                    this.form.message = response.data.message;
                })
                .catch(error => {
                    this.$Progress.fail();
                    this.$toaster.error("Something went wrong");
                });
        }
    },

    methods: {
        update(e) {
            this.$buttonLoader(e);
            this.$Progress.start();
            this.$jsHelper
                .put("api/v1/sms-settings/"+this.id, this.form)
                .then(data => {
                    this.$Progress.finish();
                    this.$toaster.info("Successfully Updated");
                    this.errors = [];
                    this.$buttonLoader(e);
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
        countWord(){
            this.wordCount = $("#text").val().length;
        }
    }
};
</script>
