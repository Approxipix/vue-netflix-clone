<template>
  <div class="MovieSlider__wrapper">
    <h2>{{categoryTitle}}</h2>
    <div v-click-outside="clickOut">
      <Slider ref="slider" :options="options">
        <div :key="index" v-for="(movie,index) in movieList" :class="`slide--${index}`">
          <MovieSliderItem :movie="movie" :isOpened="isOpened" v-on:select-movie="selectMovie"></MovieSliderItem>
        </div>
      </Slider>
      <MoviePreviewModal v-if="isOpened"></MoviePreviewModal>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import Slider from '../../components/Slider/Slider.vue';
  import MovieSliderItem from '../../components/MovieSliderItem/MovieSliderItem.vue';
  import MoviePreviewModal from '../../components/MoviePreviewModal/MoviePreviewModal.vue';
  import clickOutside from '../../helpers/directives/clickOutside';

  export default {
    name: 'MovieSlider',
    props: {
      categoryTitle: String,
      requestUrl: String,
    },
    directives: {
      clickOutside,
    },
    data () {
      return {
        movieList: [],
        isOpened: false,
        options: {
          dots: false,
          navButtons: false,
          slidesToShow: 5,
          slidesToScroll: 5,
          speed: 300,
          timing: "ease-in-out",
          extraClass: 'MovieSlider'
        }
      }
    },
    computed: {
      selectedMovie() {
        return this.$store.getters.selectedMovie;
      },
    },
    methods: {
      selectMovie (movie) {
        this.toggleModal(true);
        this.$store.dispatch('selectMovie', movie)
      },
      toggleModal (state) {
        this.isOpened = state !== undefined ? state : !this.isOpened;
      },
      clickOut () {
        this.toggleModal(false)
      }
    },
    mounted() {
      this.$refs.slider.toggleLoading();
      axios.get(`https://api.themoviedb.org/3/${this.requestUrl}`).then((response) => {
        this.movieList = response.data.results;
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
      MoviePreviewModal,
    }
  }
</script>

<style lang="scss">
  @import "MovieSlider";
</style>
