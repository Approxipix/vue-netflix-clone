<template>
  <div
    class="MovieSliderItem"
    :style="{ backgroundImage: 'url(' + getImageUrl(movie.backdrop_path, 1) + ')' }"
  >
    <div class="MovieSliderItem__details">
      <h3 class="MovieSliderItem__title">
        {{ movie.title || movie.name }}
      </h3>
      <MovieLabels :movie="movie" />
      <button class="MovieSliderItem__btn" @click="selectMovie(movie)">
        <font-awesome-icon :icon="['fas', 'info-circle']"/>
      </button>
    </div>
  </div>
</template>

<script>
  import MovieLabels from '../MovieLabels/MovieLabels'
  import getImageUrl from '../../helpers/getImageUrl';

  export default {
    name: 'MovieSliderItem',
    props: {
      movie: {
        name: String,
        title: String,
        overview: String,
        backdrop_path: String,
      },
    },
    components: {
      MovieLabels,
    },
    methods: {
      getImageUrl(url, size) {
        return getImageUrl(url, size, 'backdrop');
      },
      selectMovie(movie) {
        const slide = this.$el.parentNode;
        const slider = slide.parentNode;
        slider.childNodes.forEach(slide => slide.classList.remove('Slider__slide--selected'));
        slide.classList.add('Slider__slide--selected');
        this.$emit('select-movie', movie);
      },
    },
  }
</script>

<style lang="scss">
  @import "MovieSliderItem";
</style>
