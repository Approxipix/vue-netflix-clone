<template>
  <div class="tile bg">
    <div class="tile__container">
      <h1 class="tile__title">
        Recover Password
      </h1>
      <div v-bind:is="error" v-if="error" class="form__error-message" />
      <form @submit.prevent="onSignup">
        <div class="input__wrapper">
          <input
            :class="[{'input--filled': email}, 'input']"
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
        email: '',
      };
    },
    computed: {
      user() {
        return this.$store.getters.user;
      },
      error() {
        let template = '';
        if (!this.$store.getters.error) return null;
        switch (this.$store.getters.error.code) {
          case ('auth/user-not-found'):
            template = "<div>Sorry, we can\'t find an account with this email address. Please try again or <router-link to='/sign-up'>create a new account.</router-link></div>";
            break;
          default:
            template = '';
        }
        return {
          template: template,
        };
      },
      loading() {
        return this.$store.getters.loading;
      }
    },
    watch: {
      user(value) {
        if (value !== null && value !== undefined) {
          this.$router.push('/profile');
        }
      },
    },
    methods: {
      onSignup() {
        this.$store.dispatch('recoverPasswordWithEmail', {
          email: this.email,
        });
      },
      onDismissed() {
        this.$store.dispatch('clearError');
      },
    },
    destroyed() {
      this.onDismissed();
    },
  };
</script>
