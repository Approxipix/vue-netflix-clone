<template>
  <div class="SignUp">
    <div class="bg tile">
      <div class="tile__container">
        <h1 class="tile__title">
          Sign Up
        </h1>
        <form @submit.prevent="onSignup" class="form">
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
              placeholder="password"
            >
            <label class="input__placeholder" for="password">
              Password
            </label>
          </div>

          <ul class="SignUp__required-list">
            <li :class="[{'SignUp__required-item--done': password.length >= 8}, 'SignUp__required-item']">
            <span class="SignUp__required-text">
              At least 8 characters long
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
          <div class="input__wrapper">
            <input
              :class="[{'input__filled': confirmPassword}, 'input']"
              name="confirm-password"
              id="confirm-password"
              v-model="confirmPassword"
              type="password"
              required
              placeholder="Confirm Password"
            >
            <label class="input__placeholder" for="confirm-password">
              Confirm Password
            </label>
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
      confirmPassword: ""
    };
  },
  computed: {
    comparePasswords() {
      return this.password !== this.confirmPassword
        ? "Passwords do not match"
        : "";
    },
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
      this.$store.dispatch("signUserUp", {
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
  @import "./SignUp.scss";
</style>
