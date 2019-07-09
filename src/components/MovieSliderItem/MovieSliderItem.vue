<template>
  <div
    :class="['MovieSliderItem', {'MovieSliderItem--selected': movie.id === selectedMovie.id && isOpened}]"
    :style="{ backgroundImage: 'url(' + getImageUrl(movie.backdrop_path, 1) + ')' }"
    @click="selectMovie(movie)"
  >
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
    name: 'MovieSliderItem',
    props: {
      movie: Object,
      isOpened: Boolean,
    },
    computed: {
      selectedMovie() {
        return this.$store.getters.selectedMovie;
      },
    },
    methods: {
      getImageUrl (url, size) {
        return getImageUrl(url, size)
      },
      selectMovie (movie) {
        this.$emit('select-movie', movie)
      }
    },
  }
</script>

<style lang="scss">
  @import "MovieSliderItem";
</style>
