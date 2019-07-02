import { store } from "../store/index.js";

function getImageUrl(url, size = 3) {
  const config = store.getters.configuration;
  if (!config) return null;
  return config.images.base_url + config.images.backdrop_sizes[size] + url
}

export default getImageUrl;
