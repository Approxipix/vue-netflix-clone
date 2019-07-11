<template>
  <div class="page__content">
    <h1>Movies <span v-if="categoryTitle">({{categoryTitle}})</span></h1>
    <MovieList :request-url="'discover/movie?with_genres=' + movieGenresId"></MovieList>
  </div>
</template>

<script>
  import MovieList from '../../components/MovieList/MovieList'

  export default {
    components: {
      MovieList,
    },
    data () {
      return {
        categoryTitle: '',
        movieGenresId: +this.$route.params.id,
      }
    },
    mounted() {
      if (!!this.$store.getters.genres) {
        this.setTitle()
      }
    },
    computed: {
      query () {
        return this.$route.params.id
      },
      genres() {
        return this.$store.getters.genres;
      },
    },
    watch: {
      query (value) {
        if (value !== null && value !== undefined) {
          this.movieGenresId = +this.$route.params.id;
          this.setTitle();
        }
      },
      genres(value) {
        if (value !== null && value !== undefined) {
          this.setTitle();
        }
      }
    },
    methods: {
      setTitle () {
        this.categoryTitle = this.genres.movies.find(item => item.id === this.movieGenresId).name
      },
    }
  }
</script>

<style lang="scss">
  @import "Movies";
</style>
