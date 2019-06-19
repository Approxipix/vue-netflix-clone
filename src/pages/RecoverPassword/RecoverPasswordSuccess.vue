<template>
  <div class="tile bg">
    <div class="tile__container">
      <h1 class="tile__title">
        Recover password
      </h1>
      <p>
        Please, check your email for a password reset link
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        email: "",
      };
    },
    computed: {
      user() {
        return this.$store.getters.user;
      },
      error() {
        return this.$store.getters.error;
      },
      loading() {
        return this.$store.getters.loading;
      }
    },
    watch: {
      user(value) {
        if (value !== null && value !== undefined) {
          this.$router.push("/profile");
        }
      }
    },
    methods: {
      onSignup() {
        this.$store.dispatch("recoverPasswordWithEmail", {
          email: this.email,
        });
      },
      onDismissed() {
        this.$store.dispatch("clearError");
      }
    }
  };
</script>

<style lang="scss">
  @import "RecoverPassword";
</style>
