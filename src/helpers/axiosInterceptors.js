import axios from "axios/index";

axios.interceptors.request.use(function (config) {
  if (config.method === 'get') {
    if (typeof config.params !== 'undefined') {
      config.params = Object.assign(config.params, {
        api_key: '30e3ac32e839a7c0dd7c6d6246816bd3'
      })
    } else {
      config.params = {
        api_key: '30e3ac32e839a7c0dd7c6d6246816bd3'
      }
    }
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});
