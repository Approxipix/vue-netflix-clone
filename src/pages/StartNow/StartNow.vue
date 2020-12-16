<template>
  <div class="StartNow bg">
    <div class="StartNow__container">
      <h1 class="StartNow__title">See what’s next.</h1>
      <p class="StartNow__subtitle">WATCH ANYWHERE. CANCEL ANYTIME.</p>
      <router-link class="btn btn--primary StartNow__btn" :to="signInRoute">
        Start Now
      </router-link>
    </div>
  </div>
</template>

<script>
  import { routes } from '../../helpers/constants';

  export default {
    name: 'StartNow',
    data() {
      return {
        signInRoute: routes.signIn,
      };
    },
  }
</script>

<style lang="scss">
  @import "StartNow";
</style>


