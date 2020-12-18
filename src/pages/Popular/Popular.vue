<template>
  <div class="page__content">
    <h1 class="page__title">
      Popular
      </h1>
    <MovieList request-url="movie/popular" />
  </div>
</template>

<script>
  import MovieList from '../../components/MovieList/MovieList';

  export default {
    name: 'Popular',
    components: {
      MovieList,
    },
  }
</script>
