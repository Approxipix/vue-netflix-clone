<template>
  <div class="SignUp">
    <div class="bg tile">
      <div class="tile__container">
        <h1 class="tile__title">
          Sign Up
        </h1>
        <form @submit.prevent="onSignUp" class="form">
          <div class="form__field">
            <div class="input__wrapper">
              <input
                :class="[{'input--filled': email}, 'input']"
                id="email"
                placeholder="Email"
                type="email"
                v-model="email"
                required
              >
              <label class="input__placeholder" for="email">
                Email
              </label>
            </div>
          </div>
          <div class="form__field">
            <div :class="[{'input--error': errors.password.length !== 0}, 'input__wrapper']">
              <input
                :class="[{'input--filled': password}, 'input']"
                id="password"
                placeholder="password"
                v-model="password"
                type="password"
                required
              >
              <label class="input__placeholder" for="password">
                Password
              </label>
            </div>
            <ul class="form__error-list">
              <li class="form__error-item" v-for="(error, index) in errors.password" :key="index">
                {{error}}
              </li>
            </ul>
            <ul class="SignUp__required-list">
              <li :class="[{'SignUp__required-item--done': password.length >= 6}, 'SignUp__required-item']">
                <span class="SignUp__required-text">
                  At least 6 characters long
                </span>
              </li>
              <li :class="[{'SignUp__required-item--done': password !== password.toLowerCase()}, 'SignUp__required-item']">
                <span class="SignUp__required-text">
                  One uppercase character
                </span>
              </li>
              <li :class="[{'SignUp__required-item--done': password !== password.toUpperCase()}, 'SignUp__required-item']">
                <span class="SignUp__required-text">
                  One lowercase character
                </span>
              </li>
              <li :class="[{'SignUp__required-item--done': true}, 'SignUp__required-item']">
                <span class="SignUp__required-text">
                  Latin characters only
                </span>
              </li>
            </ul>
          </div>
          <div class="form__field">
            <div :class="[{'input--error': errors.password.length !== 0}, 'input__wrapper']">
              <input
                :class="[{'input--filled': confirmPassword}, 'input']"
                id="confirm-password"
                placeholder="Confirm Password"
                v-model="confirmPassword"
                type="password"
                required
              >
              <label class="input__placeholder" for="confirm-password">
                Confirm Password
              </label>
            </div>
            <ul class="form__error-list">
              <li class="form__error-item" v-for="(error, index) in errors.confirmPassword" :key="index">
                {{error}}
              </li>
            </ul>
          </div>
          <button
            type="submit"
            class="btn btn--red form__btn"
            :disabled="loading"
          >
            Sign Up
          </button>
        </form>
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
      confirmPassword: "",
      errors: {
        password: [],
        confirmPassword: [],
      },
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
    isFormValid() {
      const { password, confirmPassword } = this;
      this.errors = {
        password: [],
        confirmPassword: [],
      };
      if (password !== confirmPassword) {
        this.errors.confirmPassword.push('Passwords do not match.')
      }
      if (password.length < 6) {
        this.errors.password.push('Password should be at least 6 characters.')
      }
      if (password === password.toLowerCase() || password === password.toUpperCase()) {
        this.errors.password.push('Contains at least one uppercase and lowercase characters.')
      }
      if (!this.isLatin(password)) {
        this.errors.password.push('Latin characters and numbers only.')
      }
      return Object.values(this.errors).every(field => field.length === 0);
    },
    isLatin: function(password) {
      let ifLatin =  /^[a-zA-z0-9_]+$/g;
      return ifLatin.test(password);
    },
    onSignUp() {
      if (!this.isFormValid()) return null;
      this.$store.dispatch("signUp", {
        email: this.email,
        password: this.password
      });
    },
    onDismissed() {
      this.$store.dispatch("clearError");
    }
  }
};
</script>

<style lang="scss">
  @import "SignUp";
</style>
