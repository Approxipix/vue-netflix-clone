<template>
  <div class="SignIn">
    <div class="bg tile">
      <div class="tile__container">
        <h1 class="tile__title">
          Sign In
        </h1>
        <transition name="fade-height">
          <div v-bind:is="error" v-if="error" class="form__error-message" />
        </transition>
        <form @submit.prevent="onSignIn" class="form">
          <div class="form__field">
            <div class="input__wrapper">
              <input
                id="email"
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
          </div>
          <div class="form__field">
            <div class="input__wrapper">
              <input
                id="password"
                type="password"
                required
                placeholder="Password"
                v-model="password"
                :class="[{ 'input--filled': password }, 'input']"
              >
              <label class="input__placeholder" for="password">
                Password
              </label>
            </div>
          </div>
          <div class="form__btns">
            <button type="submit" class="btn btn--primary" :disabled="loading">
              Sign In
            </button>
            <button type="button" class="btn btn--secondary" :disabled="loading" @click="onSignInAnonymously">
              Demo User
            </button>
          </div>
          <div class="flex-jc">
            <div class="checkbox__wrapper">
              <input
                id="rememberMeCheckbox"
                type="checkbox"
                class="checkbox__input"
                v-model="rememberMe"
              >
                <label for="rememberMeCheckbox" class="checkbox">
                <span>
                  <svg width="12px" height="10px" viewBox="0 0 12 10">
                    <polyline points="1.5 6 4.5 9 10.5 1" />
                  </svg>
                </span>
                <span class="checkbox__text">
                  Remember me
                </span>
              </label>
            </div>
            <a href="https://www.netflix.com/LoginHelp" class="link link--s">
              Need help ?
            </a>
          </div>
        </form>
        <ul class="SignIn__social-list">
          <li class="SignIn_social-item">
            <button
              class="btn SignIn__social-btn"
              :disabled="loading"
              @click.prevent="onSignInGoogle"
            >
              <i class="SignIn__social-icon">
                <font-awesome-icon :icon="['fab', 'google']" />
              </i>
              Login with Google
            </button>
          </li>
          <li class="SignIn_social-item">
            <button
              class="btn SignIn__social-btn"
              :disabled="loading"
              @click.prevent="onSignInFacebook"
            >
              <i class="SignIn__social-icon">
                <font-awesome-icon :icon="['fab', 'facebook']" />
              </i>
              Login with Facebook
            </button>
          </li>
        </ul>
        <p>
          New to netflix? <router-link class="link link--white" :to="signUpRoute">Sign up now.</router-link>
        </p>
        <div class="Spinner__overflow" v-if="loading">
          <Spinner />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Spinner from '../../components/Spinner/Spinner'
  import { routes, actions } from '../../helpers/constants';

  export default {
    name: 'SignIn',
    data() {
      return {
        email: '',
        password: '',
        rememberMe: false,
        signUpRoute: routes.signUp,
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
          case ('auth/wrong-password'):
            template = "<div><b>Incorrect password.</b> Please try again or you can " +
              "<router-link to='/recover-password'>reset your password.</router-link></div>";
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
      },
    },
    components: {
      Spinner,
    },
    watch: {
      user(value) {
        if (value !== null && value !== undefined) {
          this.$router.push(routes.home);
        }
      },
    },
    methods: {
      onSignIn() {
        this.$store.dispatch(actions.signIn, {
          email: this.email,
          password: this.password,
          rememberMe: this.rememberMe,
        });
      },
      onSignInGoogle() {
        this.$store.dispatch(actions.signInGoogle);
      },
      onSignInFacebook () {
        this.$store.dispatch(actions.signInFacebook)
      },
      onSignInAnonymously () {
        this.$store.dispatch(actions.signInAnonymously)
      },
    },
    destroyed() {
      this.$store.dispatch(actions.clearError);
    },
  };
</script>

<style lang="scss">
  @import 'SignIn';
</style>
