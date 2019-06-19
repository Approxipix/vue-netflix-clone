<template>
  <div class="tile bg">
    <div class="tile__container">
      <h1 class="tile__title">
        Recover Password
      </h1>
      <form @submit.prevent="onSignup">
        <div class="input__wrapper">
          <input
            :class="[{'input__filled': email}, 'input']"
            name="email"
            id="email"
            v-model="email"
            type="email"
            required
            placeholder="Email"
          >
          <label class="input__placeholder" for="email">
            Email
          </label>
        </div>
        <button
          type="submit"
          class="btn btn--red form__btn"
          :disabled="loading"
        >
          Send
        </button>
      </form>
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
