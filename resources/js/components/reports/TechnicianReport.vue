<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="card-header card-header-rose card-header-icon">
                            <div class="card-icon d-md-block d-none">
                                <i class="material-icons">find_replace</i>
                            </div>
                            <div class="row">
                                <div class="col-6">
                                    <h4 class="card-title">Technician Report</h4>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            
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
            form:{
                type:1,
                text:'',
                phone:[],
            },
            filter:{
                division_id:null,
                district_id:null,
                upazila_id:null,
                zone_id:null,
                from_date: new Date(),
                to_date: this.toDate()
            },
            param: {
                query: "",
                sort:{
                    column:"",
                    sort_order:""
                }
            },
            sales: [],
            pagination: {
                current_page: 1,
                per_page: 10
            },
            optionsDivision: [],
            optionsDistrict: [],
            optionsUpazila: [],
            optionsZone:[],
            optionsMessageType:[{'id':1,'text':'English'}, {'id':2,'text':'Bangali'}],
            check_all:null,
            wordCount:0
        };
    },
    mounted() {
        this.getData();
        this.getDropdown('api/v1/zones-all', 'optionsZone');
        this.getDropdown('api/v1/divisions/20', 'optionsDivision');
    },
    methods: {
        getData() {
            let fromDate = (this.filter.from_date != null)? this.filter.from_date.toISOString().split('T')[0]:null;
            let toDate = (this.filter.to_date != null)? this.filter.to_date.toISOString().split('T')[0]:null;
            this.$Progress.start();
            this.$jsHelper
                .get(
                    "api/v1/sales-dashboard?page=" +
                        this.pagination.current_page +
                        "&per_page=" +
                        this.pagination.per_page +
                        "&query=" +
                        this.param.query +
                        "&sort_by=" +
                        this.param.sort.column +
                        "&sort_order=" +
                        this.param.sort.sort_order +
                        "&from_date=" +
                        fromDate +
                        "&to_date=" +
                        toDate
                )
                .then(response => {
                    this.$Progress.finish();
                    this.sales = response.data.data;
                    this.pagination = response.data.meta;
                })
                .catch(e => {
                    this.$Progress.fail();
                    this.$toaster.error("Something went wrong");
                });
        },
        resetFilter(){
            this.filter.division_id = null;
            this.filter.district_id = null;
            this.filter.upazila_id = null;
            this.filter.from_date = null;
            this.filter.zone_id = null;
            this.filter.to_date = null;
            this.getData();
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
        getDropdown(url, option){
            this.$jsHelper.get(url).then(response => {
                this[option] = response.data.map(function(val){
                    return {id:val.id, text:val.name}
                });
            }).catch(error => {
            });
        },
        selectOption(){
            this.getDropdown('api/v1/zones-all/', 'optionsZone');
            this.getDropdown('api/v1/divisions/20', 'optionsDivision');
            this.getDropdown('api/v1/districts/'+this.form.division_id, 'optionsDistrict');
            this.getDropdown('api/v1/upazilas/'+this.form.district_id, 'optionsUpazila');
        },
        checkAll(e){
            if(e.currentTarget.checked){
                $('.sms_send').prop('checked', true);
            }
            else{
                $('.sms_send').prop('checked', false);
            }
        },
        sendMessage(e){
            if(this.form.text == ''){
                this.$toaster.error("Write Some text to send SMS");
                return;
            }
            if(this.form.type == null){
                this.$toaster.error("Message language Type");
                return;
            }

            let phones = []; 
            $(".sms_send:checked").each(function () {
                phones.push($(this).val());
            });

            this.form.phone = phones;
            if(this.form.phone.length > 0){
                this.$buttonLoader(e);
                this.$Progress.start();
                  this.$jsHelper.put("api/v1/sms-send", this.form)
                .then(data => {
                    if(data.data === 1){
                    this.$Progress.finish();
                        this.$toaster.info("Successfully Send");
                        this.form.phone = [];
                        this.form.text = '';
                        this.form.type = 1;
                        this.wordCount = 0;
                        this.$buttonLoader(e);
                        $('#checkAll').prop('checked', false);
                        $('.sms_send').prop('checked', false);
                    }
                    else{
                        this.$Progress.fail();
                        this.$buttonLoader(e);
                        this.$toaster.error("Something went wrong");
                    }
                })
                .catch(error => {
                    this.$Progress.fail();
                    this.$buttonLoader(e);
                    this.$toaster.error("Something went wrong");
                });
            }
            else{
                this.$toaster.error("Please select at least one customer to send SMS.");
            }
        },
        countWord(){
            this.wordCount = $("#text").val().length;
        },
        toDate(){
            let date = new Date();
            return new Date(date.setDate(date.getDate() + 7));
        },
    }
};

</script>

<style>

</style>
