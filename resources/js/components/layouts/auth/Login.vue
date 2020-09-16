<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-4 col-md-6 col-sm-8 ml-auto mr-auto">
        <form class="form" method action>
          <div class="card card-login">
            <div class="card-header card-header-rose text-center">
              <h4 class="card-title">Login</h4>
              <div class="social-line">
                <a href="#pablo" class="btn btn-just-icon btn-link btn-white">
                  <i class="fa fa-facebook-square"></i>
                </a>
                <a href="#pablo" class="btn btn-just-icon btn-link btn-white">
                  <i class="fa fa-twitter"></i>
                </a>
                <a href="#pablo" class="btn btn-just-icon btn-link btn-white">
                  <i class="fa fa-google-plus"></i>
                </a>
              </div>
            </div>
            <div class="card-body">
              <p class="card-description text-center">Or Be Classical</p>
              <span class="bmd-form-group">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <i class="material-icons">email</i>
                    </span>
                  </div>
                  <input type="email" v-model="form.email" class="form-control" placeholder="Email..." />
                </div>
                 <span class="text-danger float-right" v-if="errors.email">
            {{ errors.email[0] }}
          </span>
              </span>
              <span class="bmd-form-group">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <i class="material-icons">lock_outline</i>
                    </span>
                  </div>
                  <input type="password" v-model="form.password" class="form-control" placeholder="Password..." />
                </div>
                 <span class="text-danger float-right" v-if="errors.password">
            {{ errors.password[0] }}
          </span>
              </span>
            </div>
            <div class="card-footer justify-content-center">
              <a  @click.prevent="login"  class="btn btn-rose btn-link btn-lg">Lets Go</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import User from "../../../apis/User";

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
      User.login(this.form)
        .then(() => {
          this.$root.$emit("login", true);
          localStorage.setItem("auth", "true");
          this.$router.push({ name: "Dashboard" });
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
