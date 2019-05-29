<template>
  <form @submit.prevent="onSignup">
    <div>
      <label for="email">
        email
        <input
          name="email"
          id="email"
          v-model="email"
          type="email"
          required
        >
      </label>
    </div>
    <div>
      <label for="password">
        password
        <input
          name="password"
          id="password"
          v-model="password"
          type="password"
          required
        >
      </label>
    </div>
    <div>
      <label for="confirmPassword">
        Confirm Password
        <input
          name="confirmPassword"
          id="confirmPassword"
          v-model="confirmPassword"
          type="password"
          :rules="[comparePasswords]"
        >
      </label>
    </div>
    <div>
      <button
        type="submit"
        :disabled="loading"
      >
        Sign up
      </button>
    </div>
  </form>
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
