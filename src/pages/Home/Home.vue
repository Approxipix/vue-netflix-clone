<template>
  <div class="Home">
    <div class="Home__slider">
      <Slider ref="slider" :options="options">
        <div v-for="(item,index) in filmList" :key="index" :class="`slide--${index}`">
          <MovieDetails :item="item"/>
        </div>
      </Slider>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import Slider from '../../components/Slider/Slider.vue';
  import MovieDetails from '../../components/MovieDetails/MovieDetails.vue';

  export default {
    data () {
      return {
        filmList: [],
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
        this.filmList = response.data.results.splice(0, 10);
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
    }
  };
</script>

<style lang="scss">
  @import "Home";
</style>
