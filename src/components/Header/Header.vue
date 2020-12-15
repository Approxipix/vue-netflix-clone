<template>
  <div v-if="userIsAuthenticated">
    <AuthorizedHeader />
  </div>
  <div v-else>
    <UnauthorizedHeader />
  </div>
</template>

<script>
  import AuthorizedHeader from './AuthorizedHeader.vue';
  import UnauthorizedHeader from './UnauthorizedHeader.vue';
  import { actions } from '../../helpers/constants';

  export default {
    name: 'Header',
    computed: {
      userIsAuthenticated() {
        return (
          this.$store.getters.user !== null &&
          this.$store.getters.user !== undefined
        );
      },
    },
    components: {
      AuthorizedHeader,
      UnauthorizedHeader,
    },
    methods: {
      onLogOut() {
        this.$store.dispatch(actions.logout);
      },
    },
  };
</script>
