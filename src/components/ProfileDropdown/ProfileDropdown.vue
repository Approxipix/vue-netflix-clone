<template>
  <div class="ProfileDropdown">
    <div class="ProfileDropdown__avatar" />
    <div class="ProfileDropdown__arrow">
      <font-awesome-icon :icon="['fas', 'sort-down']" />
    </div>
    <div class="dropdown">
      <div class="dropdown__list">
        <button class="btn dropdown__btn">
          Manage Profiles
        </button>
        <button class="btn dropdown__btn" v-on:click="onLogOut">
          Sign out of Netflix
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import { actions } from '../../helpers/constants';

  export default {
    name: 'ProfileDropdown',
    data() {
      return {
        isDropdownOpened: false,
      };
    },
    methods: {
      onLogOut() {
        this.$store.dispatch(actions.logout);
      },
    },
  }
</script>

<style lang="scss">
  @import 'ProfileDropdown';
</style>
