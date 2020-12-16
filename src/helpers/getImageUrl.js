import { store } from "../store/index.js";

function getImageUrl(url, size = 3, type) {
  const config = store.getters.configuration;
  if (!config) return null;
  if (type === 'backdrop') {
    return config.images.base_url + config.images.backdrop_sizes[size] + url;
  } else {
    return config.images.base_url + config.images.poster_sizes[size] + url;
  }
}

export default getImageUrl;
