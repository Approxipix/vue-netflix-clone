<template>
  <div class="MovieSlider__wrapper">
    <h2 class="MovieSlider__title">{{ categoryTitle }}</h2>
    <div v-click-outside="unselectMovie">
      <Slider ref="slider" :options="options" :class="{ 'Slider--has-selected': selectedMovie }">
        <div v-for="(movie, index) in movieList" :key="index" :class="`slide--${index}`">
          <MovieSliderItem :movie="movie" v-on:select-movie="selectMovie" />
        </div>
      </Slider>
      <transition name='fade-in-up'>
        <div v-if="selectedMovie" class="MovieSlider__details">
          <div @click.stop>
            <MovieDetails :movie="selectedMovie" />
            <button type="button" class="btn--close" @click="unselectMovie" />
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import Slider from '../../components/Slider/Slider.vue';
  import MovieSliderItem from '../../components/MovieSliderItem/MovieSliderItem.vue';
  import MovieDetails from '../../components/MovieDetails/MovieDetails.vue';
  import clickOutside from '../../directives/clickOutside';

  export default {
    name: 'MovieSlider',
    props: {
      categoryTitle: String,
      requestUrl: String,
    },
    data() {
      return {
        movieList: [],
        selectedMovie: null,
        options: {
          dots: false,
          navButtons: false,
          slidesToShow: 5,
          slidesToScroll: 5,
          mobileFirst: false,
          speed: 300,
          timing: 'ease-in-out',
          extraClass: 'MovieSlider',
          responsive: [
            { breakpoint: 576, settings: { slidesToShow: 1, slidesToScroll: 1 } },
            { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 2 } },
            { breakpoint: 992, settings: { slidesToShow: 3, slidesToScroll: 3 } },
            { breakpoint: 1100, settings: { slidesToShow: 4, slidesToScroll: 4 } },
          ],
        }
      };
    },
    components: {
      Slider,
      MovieSliderItem,
      MovieDetails,
    },
    directives: {
      clickOutside,
    },
    methods: {
      selectMovie(movie) {
        if (this.selectedMovie && this.selectedMovie.id === movie.id) this.selectedMovie = null;
        else this.selectedMovie = movie;
      },
      unselectMovie() {
        this.selectedMovie = null;
      },
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
