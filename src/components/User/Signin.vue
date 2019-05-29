<template>
  <div>
    <form @submit.prevent="onSignin">
      <div>
        <label for="email">
          Email
        </label>
        <input
          name="email"
          id="email"
          v-model="email"
          type="email"
          required
        >
      </div>
      <div>
        <label for="password">
          Password
        </label>
        <input
          name="password"
          id="password"
          v-model="password"
          type="password"
          required
        >
      </div>
      <div>
        <button
          type="submit"
          :disabled="loading"
        >
          Sign in
        </button>
      </div>
      <div>
        <button
          :disabled="loading"
          @click.prevent="onSigninGoogle"
        >Login with Google
        </button>
      </div>
      <div>
        <button
          :disabled="loading"
          @click.prevent="onResetPassword"
        >Reset Password By Email
        </button>
      </div>
      <div>
        <button
          :disabled="loading"
          @click.prevent="onSigninFacebook"
        >Login with Facebook
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: ""
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
        password: this.password
      });
    },
    onSigninGoogle() {
      this.$store.dispatch("signUserInGoogle");
    },
    onSigninFacebook () {
      this.$store.dispatch('signUserInFacebook')
    },
    onResetPassword() {
      if (this.email === "") {
        return this.$store.dispatch("setError", {
          message: "Email can not be blank"
        });
      }
      this.$store.dispatch("resetPasswordWithEmail", { email: this.email });
    },
    onDismissed() {
      this.$store.dispatch("clearError");
    }
  }
};
</script>
