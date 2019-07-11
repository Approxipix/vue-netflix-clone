<template>
  <div class="MovieListItem" :style="{ backgroundImage: 'url(' + getImageUrl(movie.poster_path, 3) + ')' }">
    <div class="MovieListItem__details">
      <h3 class="MovieListItem__title">
        {{!!movie.title ? movie.title : movie.name}}
      </h3>
      <p class="MovieListItem__description">
        {{movie.overview}}
      </p>
    </div>
  </div>
</template>

<script>
  import getImageUrl from '../../helpers/getImageUrl'
  export default {
    name: 'MovieListItem',
    props: {
      movie: Object,
    },
    methods: {
      getImageUrl: function (url, size) {
        return getImageUrl(url, size, 'poster')
      },
    },
  }
</script>

<style lang="scss">
  @import "MovieListItem";
</style>
