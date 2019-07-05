<template>
  <div class="MovieSlider">
    <h2>{{categoryTitle}}</h2>
    <Slider ref="slider" :options="options">
      <div v-for="(movie,index) in movieList" :key="index" :class="`slide--${index}`">
        <MovieSliderItem :movie="movie"></MovieSliderItem>
      </div>
    </Slider>
  </div>
</template>

<script>
  import axios from 'axios'
  import Slider from '../../components/Slider/Slider.vue';
  import MovieSliderItem from '../../components/MovieSliderItem/MovieSliderItem.vue';

  export default {
    props: {
      categoryTitle: String,
      requestUrl: String,
    },
    data () {
      return {
        movieList: [],
        options: {
          dots: false,
          navButtons: false,
          slidesToShow: 5,
          autoplaySpeed: 2000,
          speed: 300,
          timing: "ease-in-out",
          hoverClass: 'MovieSliderItem--hover'
        }
      }
    },
    mounted() {
      this.$refs.slider.toggleLoading();
      axios.get(`https://api.themoviedb.org/3/${this.requestUrl}`).then((response) => {
        this.movieList = response.data.results;
        console.log(response.data.results);
      }).then(() => {
        this.$refs.slider.reload();
        this.$refs.slider.toggleLoading();
      }).catch((error) => {
        console.log(error)
      })
    },
    components: {
      Slider,
      MovieSliderItem,
    }
  }
</script>

<style lang="scss">
  @import "MovieSlider";
</style>
