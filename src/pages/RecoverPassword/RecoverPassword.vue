<template>
  <div class="tile bg">
    <div class="tile__container">
      <h1 class="tile__title">
        Recover Password
      </h1>
      <transition name="fade-height">
        <div v-bind:is="error" v-if="error" class="form__error-message" />
      </transition>
      <form @submit.prevent="onRecoverPassword">
        <div class="input__wrapper">
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="Email"
            v-model="email"
            :class="[{ 'input--filled': email }, 'input']"
          >
          <label class="input__placeholder" for="email">
            Email
          </label>
        </div>
        <div class="form__btns">
          <button type="submit" class="btn btn--primary" :disabled="loading">
            Send
          </button>
        </div>
      </form>
      <div class="Spinner__overflow" v-if="loading">
        <Spinner />
      </div>
    </div>
  </div>
</template>

<script>
  import Spinner from '../../components/Spinner/Spinner'
  import { actions } from "../../helpers/constants";

  export default {
    name: 'RecoverPassword',
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
            template = "<div>Sorry, we can\'t find an account with this email address. Please try again or " +
              "<router-link to='/sign-up'>create a new account.</router-link></div>";
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
    components: {
      Spinner,
    },
    methods: {
      onRecoverPassword() {
        this.$store.dispatch(actions.recoverPasswordWithEmail, {
          email: this.email,
        });
      },
    },
    destroyed() {
      this.$store.dispatch(actions.clearError);
    },
  };
</script>
