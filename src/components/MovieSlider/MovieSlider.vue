<template>
  <div class="MovieSlider__wrapper">
    <h2 class="MovieSlider__title">{{ categoryTitle }}</h2>
    <div v-click-outside="clickOut">
      <Slider ref="slider" :options="options" :class="{'Slider--has-selected': isOpened && selectedMovie}">
        <div :key="index" v-for="(movie,index) in movieList" :class="`slide--${index}`">
          <MovieSliderItem :movie="movie" :isOpened="isOpened" v-on:select-movie="selectMovie" />
        </div>
      </Slider>
      <div v-if="isOpened" class="MovieSlider__details">
        <MovieDetails v-if="isOpened" :movie="selectedMovie" />
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import Slider from '../../components/Slider/Slider.vue';
  import MovieSliderItem from '../../components/MovieSliderItem/MovieSliderItem.vue';
  import MovieDetails from '../../components/MovieDetails/MovieDetails.vue';
  import clickOutside from '../../helpers/directives/clickOutside';

  export default {
    name: 'MovieSlider',
    props: {
      categoryTitle: String,
      requestUrl: String,
    },
    components: {
      Slider,
      MovieSliderItem,
      MovieDetails,
    },
    directives: {
      clickOutside,
    },
    data() {
      return {
        movieList: [],
        isOpened: false,
        options: {
          dots: false,
          navButtons: false,
          slidesToShow: 5,
          slidesToScroll: 5,
          speed: 300,
          timing: 'ease-in-out',
          extraClass: 'MovieSlider',
        }
      };
    },
    computed: {
      selectedMovie() {
        return this.$store.getters.selectedMovie;
      },
    },
    methods: {
      selectMovie(movie) {
        if (this.selectedMovie && this.selectedMovie.id === movie.id) {
          this.$store.dispatch('selectMovie', null);
          this.toggleModal(false);
        } else {
          this.$store.dispatch('selectMovie', movie);
          this.toggleModal(true);
        }
      },
      toggleModal(state) {
        this.isOpened = state !== undefined ? state : !this.isOpened;
      },
      clickOut() {
        this.toggleModal(false);
      }
    },
    mounted() {
      this.$refs.slider.toggleLoading();
      axios.get(`https://api.themoviedb.org/3/${this.requestUrl}`)
        .then(response => {
          this.movieList = response.data.results;
        })
        .then(() => {
          this.$refs.slider.reload();
          this.$refs.slider.toggleLoading();
        })
        .catch(error => {
          console.log(error);
        });
    },
  }
</script>

<style lang="scss">
  @import 'MovieSlider';
</style>
