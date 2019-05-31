<template>
  <div class="SignIn">
    <div class="bg tile">
      <div class="tile__container">
        <h1 class="tile__title">
          Sign In
        </h1>
        <form @submit.prevent="onSignin" class="form">
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
          <div class="input__wrapper">
            <input
              :class="[{'input__filled': password}, 'input']"
              name="password"
              id="password"
              v-model="password"
              type="password"
              required
              placeholder="Password"
            >
            <label class="input__placeholder" for="password">
              Password
            </label>
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
              @click.prevent="onSigninGoogle"
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
              @click.prevent="onSigninFacebook"
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
      email: "",
      password: "",
      rememberMe: false,
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
    onSignin() {
      this.$store.dispatch("signUserIn", {
        email: this.email,
        password: this.password,
        rememberMe: this.rememberMe,
      });
    },
    onSigninGoogle() {
      this.$store.dispatch("signUserInGoogle");
    },
    onSigninFacebook () {
      this.$store.dispatch('signUserInFacebook')
    },
    onDismissed() {
      this.$store.dispatch("clearError");
    }
  }
};
</script>

<style lang="scss">
  @import "./SignIn";
</style>
