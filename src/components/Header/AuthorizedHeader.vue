<template>
  <header :class="[{ 'Header--bg': isScrolled }, 'Header']">
    <router-link :to="homeRoute">
      <NetflixLogo class="Header__logo" />
    </router-link>

    <nav :class="[{ 'Header__nav--opened': isMenuOpened }, 'Header__nav']">
      <ul class="Header__nav-list">
        <li class="Header__nav-item" v-for="(navItem, index) in navList" :key="index">
          <router-link v-if="!navItem.nav" class="Header__nav-link" :to="navItem.link">
            {{ navItem.title }}
          </router-link>
          <div v-else class="Header__nav-link">
            {{ navItem.title }}
            <div class="dropdown">
              <div class="dropdown__list" v-for="(dropdownItem, index) in navItem.nav" :key="index">
                <router-link class="dropdown__btn" :to="`${navItem.link}/${dropdownItem.id}`">
                  {{ dropdownItem.name }}
                </router-link>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </nav>

    <div class="Header__actions">
      <ProfileDropdown />
      <button :class="[{ 'hamburger--active': isMenuOpened }, 'hamburger', 'button']" v-on:click="toggleSidebar">
        <span />
        <span />
        <span />
      </button>
    </div>
  </header>
</template>

<script>
  import ProfileDropdown from '../ProfileDropdown/ProfileDropdown';
  import NetflixLogo from '../../assets/images/netflix.svg';
  import { routes, actions } from '../../helpers/constants';

  export default {
    name: 'AuthorizedHeader',
    data() {
      return {
        isScrolled: false,
        isMenuOpened: false,
        homeRoute: routes.home,
        navList: [
          { title: 'Home', link: routes.home },
          { title: 'TV Shows', link: routes.tvShows, nav: [] },
          { title: 'Movies', link: routes.movies, nav: [] },
          { title: 'New & Popular', link: routes.popular },
          { title: 'My List', link: routes.myList },
        ],
      };
    },
    computed: {
      genres() {
        return this.$store.getters.genres;
      },
    },
    components: {
      ProfileDropdown,
      NetflixLogo,
    },
    watch: {
      genres(value) {
        if (value !== null && value !== undefined) {
          this.navList = this.navList.map(item => {
            if (item.title === 'TV Shows') return { ...item, nav: value.tv };
            if (item.title === 'Movies') return { ...item, nav: value.movies };
            return item;
          });
        }
      },
    },
    methods: {
      handleScroll() {
        const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        if (currentScrollPosition > 50) return this.isScrolled = true;
        else return this.isScrolled = false;
      },
      toggleSidebar() {
        this.isMenuOpened = !this.isMenuOpened;
        if (this.isMenuOpened) document.documentElement.classList.add('no-scroll');
        else document.documentElement.classList.remove('no-scroll');
      },
    },
    created() {
      window.addEventListener('scroll', this.handleScroll);
    },
    mounted() {
      return this.$store.dispatch(actions.setGenres);
    },
    destroyed() {
      window.removeEventListener('scroll', this.handleScroll);
    },
  };
</script>

<style lang="scss">
  @import "./Header.scss";
</style>
