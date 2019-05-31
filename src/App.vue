<template>
  <div>
    <Header></Header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
  import Header from './components/Header/Header.vue'
  export default {
    data() {
      return {
        sideNav: false
      };
    },
    components: {
      Header,
    },
    computed: {
      menuItems() {
        let menuItems = [
          { title: "Sign up", link: "/sign-up" },
          { title: "Sign in", link: "/sign-in" }
        ];
        if (this.userIsAuthenticated) {
          menuItems = [{ icon: "person", title: "Profile", link: "/profile" }];
        }
        return menuItems;
      },
      userIsAuthenticated() {
        return (
          this.$store.getters.user !== null &&
          this.$store.getters.user !== undefined
        );
      }
    },
    methods: {
      onLogout() {
        this.$store.dispatch("logout");
        this.$router.push("/");
      }
    }
  };
</script>
