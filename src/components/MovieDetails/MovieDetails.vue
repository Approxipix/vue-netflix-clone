<template>
  <div class="MovieDetails" :style="{ backgroundImage: 'url(' + getImageUrl(movie.backdrop_path, 2) + ')' }">
    <div class="MovieDetails__fade--top"></div>
    <div class="MovieDetails__wrapper">
      <h1 class="MovieDetails__title">
        {{movie.title}}
      </h1>
      <div class="MovieDetails__details">
        <div class="MovieDetails__actions">
          <button type="button" class="btn MovieDetails__btn">
            <font-awesome-icon :icon="['fas', 'play']" class="MovieDetails__btn-icon"/> Play
          </button>
          <button type="button" class="btn MovieDetails__btn">
            <font-awesome-icon :icon="['fas', 'plus']" class="MovieDetails__btn-icon"/> My List
          </button>
        </div>
        <p class="MovieDetails__description">
          {{movie.overview}}
        </p>
      </div>
    </div>
    <div class="MovieDetails__fade--bottom"></div>
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
  @import "MovieDetails";
</style>
