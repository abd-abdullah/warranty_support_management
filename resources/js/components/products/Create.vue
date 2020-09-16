<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
    <div class="card ">
                <div class="card-header card-header-rose card-header-icon">
                  <div class="card-icon">
                    <i class="material-icons">mail_outline</i>
                  </div>
                  <h4 class="card-title">Stacked Form</h4>
                </div>
                <div class="card-body ">
                  <form method="#" action="#">
                    <div class="form-group bmd-form-group">
                      <label for="exampleText" class="bmd-label-floating">Name</label>
                      <input type="text" v-model="form.name" class="form-control" name="name" id="exampleText">
                    </div>
                    <div class="form-check">
                      <label class="form-check-label">
                        <input class="form-check-input" type="checkbox" value=""> Subscribe to newsletter
                        <span class="form-check-sign">
                          <span class="check"></span>
                        </span>
                      </label>
                    </div>
                  </form>
                </div>
                <div class="card-footer ">
                  <button @click.prevent="submit"  class="btn btn-fill btn-rose">Submit</button>
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
        name: ""
      },
      errors: []
    };
  },

  methods: {
    submit() {
      axios.post('api/v1/products').then(data => {
        debugger;
      });
    }
  }
};
</script>
