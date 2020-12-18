<template>
  <div class="page__content">
    <h1 class="page__title">
      Search
    </h1>
    <MovieList 
      :request-url="'search/movie?query=' + search"
      :empty-list-title="'Your search for &quot;' + search + '&quot; did not have any matches.'"
    />
  </div>
</template>

<script>
  import MovieList from '../../components/MovieList/MovieList';

  export default {
    name: 'Search',
    data() {
      return {
        search: this.$route.params.search,
      };
    },
    computed: {
      query() {
        return this.$route.params.search;
      },
    },
    components: {
      MovieList,
    },
    watch: {
      query(value) {
        if (value !== null && value !== undefined) {
          console.log(this.$route.params);
          this.search = this.$route.params.search;
        }
      },
    },
  }
</script>
