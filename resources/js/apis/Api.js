import axios from "axios";

let Api = axios.create({
  baseURL: jsUtlt.siteUrl('')
});

Api.interceptors.response.use(undefined, function (error) {
  switch (error.response.status) {
    case 401: //Not Logged in 
    case 419: //Session Expired 
    case 503: //Down for Maintenance
      localStorage.removeItem("auth");
      Api.post("/logout").then(() => {
        location.reload();
      });
      break;
    case 500:
      if (error.config && !error.config.__isRetryRequest) {
        error.config.__isRetryRequest = true;
        return Api.request(error.config);
      }
    default:
      return Promise.reject(error)
  }
});

export default Api;
