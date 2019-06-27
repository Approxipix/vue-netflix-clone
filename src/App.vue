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
      return {};
    },
    components: {
      Header,
    },
  };
</script>
