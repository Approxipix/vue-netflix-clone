<template>
  <div class="page__content">
    <h1 class="page__title">
      TV Shows <span v-if="categoryTitle">({{categoryTitle}})</span>
    </h1>
    <MovieList :request-url="'discover/tv?with_genres=' + movieGenresId" />
  </div>
</template>

<script>
  import MovieList from '../../components/MovieList/MovieList';

  export default {
    name: 'TVShows',
    data() {
      return {
        categoryTitle: '',
        movieGenresId: +this.$route.params.id,
      };
    },
    computed: {
      query() {
        return this.$route.params.id;
      },
      genres() {
        return this.$store.getters.genres;
      },
    },
    components: {
      MovieList,
    },
    watch: {
      query(value) {
        if (value !== null && value !== undefined) {
          this.movieGenresId = +this.$route.params.id;
          this.setTitle();
        }
      },
      genres(value) {
        if (value !== null && value !== undefined) {
          this.setTitle();
        }
      },
    },
    methods: {
      setTitle () {
        this.categoryTitle = this.genres.tv.find(({ id }) => id === this.movieGenresId).name;
      },
    },
    mounted() {
      if (this.$store.getters.genres) {
        this.setTitle();
      }
    },
  }
</script>
