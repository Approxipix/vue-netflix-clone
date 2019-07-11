<template>
  <div class="page__content">
    <h1>Movies</h1>
    <MovieList request-url="discover/movie"></MovieList>
  </div>
</template>

<script>
  import MovieList from '../../components/MovieList/MovieList'

  export default {
    components: {
      MovieList,
    },
  }
</script>

<style lang="scss">
  @import "Movies";
</style>
