<template>
  <div v-if="movie" class="MoviePreviewModal" :style="{ backgroundImage: 'url(' + getImageUrl(movie.backdrop_path, 2) + ')' }">
    <div class="MoviePreviewModal__details">
      <h2 class="MoviePreviewModal__title">
        {{movie.title ? movie.title : movie.name}}
      </h2>
      <p class="MoviePreviewModal__description">
        {{movie.overview}}
      </p>
    </div>
  </div>
</template>

<script>
  import getImageUrl from '../../helpers/getImageUrl'

  export default {
    props: {
      // selected: Boolean,
    },
    data () {
      return {

      }
    },
    computed: {
      movie() {
        return this.$store.getters.selectedMovie;
      },
    },
    methods: {
      getImageUrl: function (url, size) {
        return getImageUrl(url, size, 'backdrop')
      },
    },
  }
</script>

<style lang="scss">
  @import "MoviePreviewModal";
</style>
