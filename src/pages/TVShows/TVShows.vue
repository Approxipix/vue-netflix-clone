<template>
  <div class="page__content">
    <h1>TV Shows</h1>
    <MovieList request-url="discover/tv"></MovieList>
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
  @import "TVShows";
</style>
