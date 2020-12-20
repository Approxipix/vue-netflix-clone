<template>
  <div class="MovieList__wrapper">
    <transition name="fade">
      <div class="MovieList" v-if="movieList.length !== 0">
        <MovieListItem
          v-for="(movie, index) in movieList"
          :key="index"
          :movie="movie"
          v-on:select-movie="selectMovie"
        />
      </div>
      <div v-else-if="!loading && movieList.length === 0" class="MovieList__empty">
        {{ emptyTitle }}
      </div>
    </transition>
    <transition name="fade">
      <div v-if="selectedMovie" class="MovieList__details-backdrop" @click="unselectMovie">
        <div @click.stop class="MovieList__details">
          <MovieDetails :movie="selectedMovie" />
          <button type="button" class="btn--close" @click="unselectMovie" />
        </div>
      </div>
    </transition>
    <div v-if="loading" class="Spinner__overflow">
      <Spinner />
    </div>
    <Pagination
      v-if="totalPages"
      :current-page="currentPage"
      :total-pages="totalPages"
      @load="loadMovies"
    />
  </div>
</template>

<script>
  import axios from 'axios';
  import MovieListItem from '../MovieListItem/MovieListItem';
  import MovieDetails from '../MovieDetails/MovieDetails';
  import Pagination from '../Pagination/Pagination';
  import Spinner from '../Spinner/Spinner';

  export default {
    name: 'MovieList',
    props: {
      requestUrl: String,
      emptyListTitle: String,
      initialMovieList: Array,
    },
    data () {
      return {
        emptyTitle: this.emptyListTitle || 'No data here',
        movieList: this.initialMovieList || [],
        selectedMovie: null,
        currentPage: 1,
        totalPages: 0,
        loading: false,
      };
    },
    components: {
      MovieListItem,
      MovieDetails,
      Pagination,
      Spinner,
    },
    watch: {
      requestUrl(value) {
        if (value !== null && value !== undefined) {
          this.loadMovies();
        }
      },
      emptyListTitle(value) {
        this.emptyTitle = value;
      },
      initialMovieList(value) {
        if (value !== null && value !== undefined) {
          this.movieList = value;
          this.selectedMovie = null;
        }
      },
    },
    methods: {
      toggleLoading() {
        this.loading = !this.loading;
      },
      loadMovies() {
        let { query } = this.$route;
        const params = { page: 1 };
        for (let key in query) {
          params[key] = decodeURIComponent(query[key]);
        }

        if (!this.requestUrl) return;

        this.toggleLoading();
        axios.get(`https://api.themoviedb.org/3/${this.requestUrl}`, { params })
          .then(response => {
            this.movieList = response.data.results;
            this.currentPage = response.data.page;
            this.totalPages = response.data.total_pages < 1000 ? response.data.total_pages : 1000;
          })
          .then(() => {
            window.scrollTo(0, 0);
          })
          .catch(error => {
            console.log(error);
          })
          .finally(() => {
          this.toggleLoading();
        });
      },
      selectMovie(movie) {
        this.selectedMovie = movie;
      },
      unselectMovie() {
        this.selectedMovie = null;
      },
    },
    mounted() {
      this.loadMovies();
    },
  }
</script>

<style lang="scss">
  @import 'MovieList';
</style>
