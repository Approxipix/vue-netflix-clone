<template>
  <div>
    <div class="MovieList">
      <MovieListItem v-for="(movie, index) in movieList" :key="index" :movie="movie"></MovieListItem>
    </div>
    <Pagination :current-page="currentPage" :total-pages="totalPages" @load-movies="loadMovies"></Pagination>
  </div>
</template>

<script>
  import axios from 'axios'
  import MovieListItem from '../MovieListItem/MovieListItem'
  import Pagination from '../Pagination/Pagination'

  export default {
    name: 'MovieList',
    props: {
      requestUrl: String,
    },
    data () {
      return {
        movieList: [],
        currentPage: 1,
        totalPages: 0,
      }
    },
    mounted() {
      this.loadMovies();
    },
    methods: {
      loadMovies () {
        let { query, } = this.$route;
        for (let key in query) {
          query[key] = decodeURIComponent(query[key]);
        }
        query = {
          page: 1,
          ...query
        };
        axios.get(`https://api.themoviedb.org/3/${this.requestUrl}`, {
          params: query
        }).then((response) => {
          this.movieList = response.data.results;
          this.currentPage = response.data.page;
          this.totalPages = response.data.total_pages < 1000 ? response.data.total_pages : 1000;
        }).catch((error) => {
          console.log(error)
        })
      },
    },
    components: {
      MovieListItem,
      Pagination,
    },
  }
</script>

<style lang="scss">
  @import "MovieList";
</style>
