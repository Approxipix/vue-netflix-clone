<template>
  <div class="Home bg">
    <div class="Home__container">
      <h1 class="Home__title">See what’s next.</h1>
      <p class="Home__subtitle">WATCH ANYWHERE. CANCEL ANYTIME.</p>
      <router-link class="btn btn--red Home__btn" to="sign-in">
        Start Now
      </router-link>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import Slider from '../../components/Slider/Slider.vue';

  export default {
    data () {
      return {

      }
    },
    computed: {
      user() {
        return this.$store.getters.user;
      }
    },
    mounted() {
      const that = this;
      axios.get('https://api.themoviedb.org/3/discover/movie').then(response => {
        // axios.get('https://api.themoviedb.org/3/discover/movie?primary_release_year=2019&sort_by=revenue.desc').then(response => {
        //   console.log(response)
      });
    },
    methods: {

    },
    components: {
      Slider,

    }
  };
</script>
