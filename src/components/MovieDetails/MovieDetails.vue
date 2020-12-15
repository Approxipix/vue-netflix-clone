<template>
  <div class="MovieDetails" :style="{ backgroundImage: getBackgroundImageUrl(movie.backdrop_path, 2) }">
    <div class="MovieDetails__fade--top" />
    <div class="MovieDetails__wrapper">
      <h1 class="MovieDetails__title">
        {{ movie.title || movie.name }}
      </h1>
      <div class="MovieDetails__labels">
        <span :class="['MovieDetails__rate', `MovieDetails__rate--${movieRateColor}`]">
          {{ movieRate }} Match
        </span>
        <span class="MovieDetails__date">
          {{ movieReleaseDate }}
        </span>
      </div>
      <div class="MovieDetails__details">
        <p class="MovieDetails__description">
          {{ movie.overview }}
        </p>
        <p class="MovieDetails__description">
          Genres: <span class="MovieDetails__description--white">{{ movieGenres }}</span>
        </p>
        <button type="button" class="btn MovieDetails__btn">
          <font-awesome-icon :icon="['fas', 'plus']" class="MovieDetails__btn-icon" fixed-width /> My List
        </button>
      </div>
    </div>
    <div class="MovieDetails__fade--bottom" />
  </div>
</template>

<script>
  import getImageUrl from '../../helpers/getImageUrl';

  export default {
    name: 'MovieDetails',
    props: {
      movie: {
        id: Number,
        name: String,
        title: String,
        overview: String,
        vote_average: Number,
        release_date: String,
        first_air_date: String,
        genre_ids: Array,
        backdrop_path: String,
      },
    },
    computed: {
      movieRate() {
        return `${this.movie.vote_average * 10}%`;
      },
      movieRateColor() {
        const percent = this.movie.vote_average * 10;
        if (percent < 30) return 'red';
        if (percent < 50) return 'yellow';
        return 'green';
      },
      movieReleaseDate() {
        return new Date(this.movie.release_date || this.movie.first_air_date).toLocaleDateString();
      },
      movieGenres() {
        if (!this.$store.getters.genres) return '';
        return this.$store.getters.genres.movies
          .filter(({ id }) => this.movie.genre_ids.includes(id))
          .map(({ name }) => name)
          .join(', ');
      },
    },
    methods: {
      getBackgroundImageUrl(url, size) {
        return `url(${getImageUrl(url, size, 'backdrop')})`;
      },
    },
  }
</script>

<style lang="scss">
  @import 'MovieDetails';
</style>
