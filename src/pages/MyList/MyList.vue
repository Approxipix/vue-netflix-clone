<template>
  <div class="page__content">
    <h1 class="page__title">
      My List
      </h1>
    <MovieList v-if="myMovieList.length !== 0" :initial-movie-list="myMovieList" />
    <div v-else class="MovieList__empty">
      You haven't added any titles  to your list yet.
    </div>
  </div>
</template>

<script>
  import MovieList from '../../components/MovieList/MovieList';

  export default {
    name: 'MyList',
    computed: {
      myMovieList() {
        return this.$store.getters.myList;
      },
    },
    components: {
      MovieList,
    },
  }
</script>
