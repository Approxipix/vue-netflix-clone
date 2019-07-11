<template>
  <div
    class="MovieSliderItem"
    :style="{ backgroundImage: 'url(' + getImageUrl(movie.backdrop_path, 1) + ')' }"
  >
    <div class="MovieSliderItem__details">
      <h3 class="MovieSliderItem__title">
        {{!!movie.title ? movie.title : movie.name}}
      </h3>
      <div class="MovieSliderItem__actions">
        <button class="btn MovieSliderItem__btn">
          <font-awesome-icon :icon="['fas', 'play-circle']"/>
        </button>
        <button class="btn MovieSliderItem__btn MovieSliderItem__btn--arrow" @click="selectMovie(movie)">
          <font-awesome-icon :icon="['fas', 'chevron-down']"/>
        </button>
        <button class="btn MovieSliderItem__btn">
          <font-awesome-icon :icon="['fas', 'plus-circle']"/>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import getImageUrl from '../../helpers/getImageUrl'

  export default {
    name: 'MovieSliderItem',
    props: {
      movie: Object,
    },
    computed: {
      selectedMovie() {
        return this.$store.getters.selectedMovie;
      },
    },
    methods: {
      getImageUrl (url, size) {
        return getImageUrl(url, size, 'backdrop')
      },
      selectMovie (movie) {
        const slide = this.$el.parentNode;
        const slider = slide.parentNode;
        slider.childNodes.forEach((slide) => slide.classList.remove('Slider__slide--selected'));
        slide.classList.add('Slider__slide--selected');
        this.$emit('select-movie', movie)
      }
    },
  }
</script>

<style lang="scss">
  @import "MovieSliderItem";
</style>
