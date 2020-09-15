import axios from "axios";

let Api = axios.create({
  baseURL: jsUtlt.siteUrl('')
});

Api.defaults.withCredentials = true;

export default Api;
