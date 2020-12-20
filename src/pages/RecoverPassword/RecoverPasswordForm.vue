<template>
  <div class="tile bg">
    <div class="tile__container">
      <h1 class="tile__title">
        Recover Password
      </h1>
      <form @submit.prevent="onRecoverPassword">
        <div class="form__field">
          <div :class="[{ 'input--error': errors.password.length !== 0 }, 'input__wrapper']">
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="password"
              v-model="password"
              :class="[{ 'input--filled': password }, 'input']"
            >
            <label class="input__placeholder" for="password">
              Password
            </label>
          </div>
          <ul class="form__error-list">
            <li :key="index" class="form__error-item" v-for="(error, index) in errors.password">
              {{ error }}
            </li>
          </ul>
          <ul class="form__required-list">
            <li :class="[{ 'form__required-item--done': password.length >= 8 }, 'form__required-item']">
              <span class="form__required-text">
                At least 8 characters long
              </span>
            </li>
            <li :class="[{ 'form__required-item--done': password !== password.toLowerCase() }, 'form__required-item']">
              <span class="form__required-text">
                One uppercase character
              </span>
            </li>
            <li :class="[{ 'form__required-item--done': password !== password.toUpperCase() }, 'form__required-item']">
              <span class="form__required-text">
                One lowercase character
              </span>
            </li>
            <li :class="[{ 'form__required-item--done': isLatin(password) }, 'form__required-item']">
              <span class="form__required-text">
                Latin characters only
              </span>
            </li>
          </ul>
        </div>
        <div class="form__field">
          <div :class="[{ 'input--error': errors.password.length !== 0 }, 'input__wrapper']">
            <input
              id="confirm-password"
              name="confirm-password"
              type="password"
              required
              placeholder="Confirm Password"
              v-model="confirmPassword"
              :class="[{ 'input--filled': confirmPassword }, 'input']"
            >
            <label class="input__placeholder" for="confirm-password">
              Confirm Password
            </label>
          </div>
          <ul class="form__error-list">
            <li class="form__error-item" v-for="(error, index) in errors.confirmPassword" :key="index">
              {{ error }}
            </li>
          </ul>
        </div>
        <div class="form__btns">
          <button type="submit" class="btn btn--primary" :disabled="loading">
            Change Password
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
  import { routes, actions } from "../../helpers/constants";

  export default {
    name: 'RecoverPasswordForm',
    data() {
      return {
        password: '',
        confirmPassword: '',
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
      isLatin(password) {
        let ifLatin =  /^[a-zA-z0-9_]+$/g;
        return ifLatin.test(password);
      },
      onRecoverPassword() {
        if (!this.isFormValid()) return null;
        this.$store.dispatch(actions.recoverPassword, {
          newPassword: this.password,
          code: this.$route.query.oobCode,
        });
      },
    },
    destroyed() {
      this.$store.dispatch(actions.clearError);
    },
  };
</script>
