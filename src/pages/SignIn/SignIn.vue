<template>
  <div class="SignIn">
    <div class="bg tile">
      <div class="tile__container">
        <h1 class="tile__title">
          Sign In
        </h1>
        <div v-bind:is="error" v-if="error" class="form__error-message"></div>
        <form @submit.prevent="onSignIn" class="form">
          <div class="form__field">
            <div class="input__wrapper">
              <input
                :class="[{'input--filled': email}, 'input']"
                id="email"
                placeholder="Email"
                v-model="email"
                type="email"
                required
              >
              <label class="input__placeholder" for="email">
                Email
              </label>
            </div>
          </div>
          <div class="form__field">
            <div class="input__wrapper">
              <input
                :class="[{'input--filled': password}, 'input']"
                id="password"
                placeholder="Password"
                v-model="password"
                type="password"
                required
              >
              <label class="input__placeholder" for="password">
                Password
              </label>
            </div>
          </div>
          <button
            type="submit"
            class="btn btn--red form__btn"
            :disabled="loading"
          >
            Sign In
          </button>
          <div class="flex-jc">
            <div class="checkbox__wrapper">
              <input v-model="rememberMe" id="rememberMeCheckbox"  type="checkbox" class="checkbox__input">
              <label for="rememberMeCheckbox" class="checkbox">
              <span>
                <svg width="12px" height="10px" viewBox="0 0 12 10">
                  <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
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
          New to netflix? <router-link class="link link--white" to="sign-up">Sign up now.</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      rememberMe: false,
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
        case ('auth/wrong-password'):
          template = "<div><b>Incorrect password.</b> Please try again or you can <router-link to='/recover-password'>reset your password.</router-link></div>";
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
  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        this.$router.push('/profile');
      }
    },
  },
  methods: {
    onSignIn() {
      this.$store.dispatch('signIn', {
        email: this.email,
        password: this.password,
        rememberMe: this.rememberMe,
      });
    },
    onSignInGoogle() {
      this.$store.dispatch('signInGoogle');
    },
    onSignInFacebook () {
      this.$store.dispatch('signInFacebook')
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

<style lang="scss">
  @import 'SignIn';
</style>
