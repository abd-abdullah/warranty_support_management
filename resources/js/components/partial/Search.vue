<template>
   <div class="row">
    <div class="col-sm-12 col-md-6">
        <div>
        <label>
            Show
            <select @change="onChange($event)"
            class="w-auto custom-select custom-select-sm form-control form-control-sm">
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="-1">All</option>
            </select>
            entries
        </label>
        </div>
    </div>
    <div class="col-sm-12 col-md-6">
        <div class="float-right">
        <label>
            <span class="bmd-form-group bmd-form-group-sm">
            <input v-model="query"
                type="param"
                class="form-control form-control-sm"
                placeholder="param data"
                aria-controls="datatables"
            />
            </span>
        </label>
        </div>
    </div>
    </div>
</template>

<script> 
export default {
    props:['pagination', 'param'],
    data(){
        return{
            query:''
        }
    },
    methods: {
        onChange(event) {
            this.pagination.per_page = event.target.value;
            this.$emit('limit');
        },
    },
    watch:{
        query: function(newQ, old) {
            if(newQ !== old){
                this.param.query = newQ;    
                this.$emit('limit');
            }
        }
    }
}
</script>