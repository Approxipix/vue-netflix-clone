<template>
  <div class="MovieDetails" :style="{ backgroundImage: getBackgroundImageUrl(movie.backdrop_path, 2) }">
    <div class="MovieDetails__fade--top" />
    <div class="MovieDetails__wrapper">
      <h1 class="MovieDetails__title">
        {{ movie.title || movie.name }}
      </h1>
      <div class="MovieDetails__labels">
        <span class="MovieDetails__rate">
          {{ rate }} Match
        </span>
        <span class="MovieDetails__date">
          {{ releaseDate }}
        </span>
      </div>
      <div class="MovieDetails__details">
        <p class="MovieDetails__description">
          {{ movie.overview }}
        </p>
        <p class="MovieDetails__description">
          Geners: <span class="MovieDetails__description--white">{{ genres }}</span>
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
    props: {
      movie: Object,
    },
    computed: {
      rate() {
        return `${this.movie.vote_average * 10}%`;
      },
      releaseDate() {
        return new Date(this.movie.release_date || this.movie.first_air_date).toLocaleDateString();
      },
      genres() {
        if (!this.$store.getters.genres) return '';
        const movieGenres = this.$store.getters.genres.movies
          .filter(({ id }) => this.movie.genre_ids.includes(id))
          .map(({ name }) => name)
          .join(', ');

        return movieGenres;
      }
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
