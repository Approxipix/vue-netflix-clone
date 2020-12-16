import axios from "axios/index";

axios.interceptors.request.use(function (config) {
  if (config.method === 'get') {
    if (typeof config.params !== 'undefined') {
      config.params = Object.assign(config.params, {
        api_key: process.env.VUE_APP_TMDB_API_KEY,
      })
    } else {
      config.params = {
        api_key: process.env.VUE_APP_TMDB_API_KEY,
      }
    }
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});
