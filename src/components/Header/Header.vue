<template>
  <div v-if="userIsAuthenticated">
    <AuthorizedHeader></AuthorizedHeader>
  </div>
  <div v-else>
    <UnauthorizedHeader></UnauthorizedHeader>
  </div>
</template>

<script>
  import AuthorizedHeader from './AuthorizedHeader.vue'
  import UnauthorizedHeader from './UnauthorizedHeader.vue'

  export default {
    components: {
      AuthorizedHeader,
      UnauthorizedHeader,
    },
    computed: {
      userIsAuthenticated() {
        return (
          this.$store.getters.user !== null &&
          this.$store.getters.user !== undefined
        );
      }
    },
    methods: {
      onLogOut() {
        this.$store.dispatch("logout");
      },
    }
  };
</script>

<style lang="scss">

</style>
