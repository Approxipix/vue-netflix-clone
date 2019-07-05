<template>
  <div class="MovieSliderItem" :style="{ backgroundImage: 'url(' + getImageUrl(movie.backdrop_path, 1) + ')' }">
    <div class="MovieSliderItem__details">
      <h3 class="MovieSliderItem__title">
        {{!!movie.title ? movie.title : movie.name}}
      </h3>
    </div>
  </div>
</template>

<script>
  import getImageUrl from '../../helpers/getImageUrl'

  export default {
    props: {
      movie: Object,
    },
    methods: {
      getImageUrl: function (url, size) {
        return getImageUrl(url, size)
      },
    },
  }
</script>

<style lang="scss">
  @import "MovieSliderItem";
</style>
