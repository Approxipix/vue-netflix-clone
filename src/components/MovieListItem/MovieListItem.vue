<template>
  <div class="MovieListItem" :style="{ backgroundImage: 'url(' + getImageUrl(movie.poster_path, 3) + ')' }"></div>
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
