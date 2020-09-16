import Api from "./Api";
import Csrf from "./Csrf";

export default {
  async register(form) {
    await Csrf.getCookie();

    return Api.post("/register", form);
  },

  async login(form) {
    await Csrf.getCookie();

    return Api.post("/login", form);
  },

  async logout() {
    await Csrf.getCookie();

    return Api.post("/logout");
  },

  auth() {
    return Api.get("/user");
  },
  
  loadApp(){
    if (!localStorage.getItem("auth")) {
        return import('../components/layouts/auth/app'); 
    }
    else{
        return import('../components/layouts/main/app'); 
    }
  }
};
