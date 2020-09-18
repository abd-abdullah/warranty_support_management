import Api from "./Api";
import Csrf from "./Csrf";

export default {
  async get(url) {
    await Csrf.getCookie();

    return Api.get(url);
  },

  async post(url,form) {
    await Csrf.getCookie();

    return Api.post(url, form);
  },

  async put(url, form) {
    await Csrf.getCookie();

    return Api.put(url, form);
  },

  async delete(url) {
    await Csrf.getCookie();
    
    return Api.delete(url);
  },
};
