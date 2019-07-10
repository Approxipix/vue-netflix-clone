<template>
  <div class="Home">
    <div class="Home__main-slider">
      <Slider ref="slider" :options="options">
        <div v-for="(movie,index) in movieList" :key="index" :class="`slide--${index}`">
          <MovieDetails :movie="movie"/>
        </div>
      </Slider>
    </div>
    <div class="Home__slider-list">
      <MovieSlider category-title="Netflix Originals" request-url="discover/tv?with_networks=213"></MovieSlider>
      <MovieSlider category-title="Trending Now" request-url="trending/all/week"></MovieSlider>
      <MovieSlider category-title="Top Rated" request-url="movie/top_rated"></MovieSlider>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import Slider from '../../components/Slider/Slider.vue';
  import MovieDetails from '../../components/MovieDetails/MovieDetails.vue';
  import MovieSlider from '../../components/MovieSlider/MovieSlider.vue';

  export default {
    data () {
      return {
        movieList: [],
        options: {
          dots: true,
          // autoplay: true,
          slidesToShow: 1,
          autoplaySpeed: 2000,
          speed: 300,
          timing: "ease-in-out",
        }
      }
    },
    computed: {
      user() {
        return this.$store.getters.user;
      }
    },
    mounted() {
      this.$refs.slider.toggleLoading();
      this.$refs.slider.disableAutoPlay();
      axios.get('https://api.themoviedb.org/3/discover/movie?region=US').then(response => {
        this.movieList = response.data.results.splice(0, 10);
      }).then(() => {
        this.$refs.slider.reload();
        this.$refs.slider.toggleLoading();
      }).catch(error => {
        console.log(error)
      });
    },
    components: {
      Slider,
      MovieDetails,
      MovieSlider,
    }
  };
</script>

<style lang="scss">
  @import "Home";
</style>
