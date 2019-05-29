<template>
  <div class="text-md-center">
    <h1 class="green--text">Login Success</h1>
    <h4 class="headline mb-0">
      <b class="red--text">Name :</b> {{ user.name }}
    </h4>
    <h4 class="headline mb-0">
      <b class="red--text">Email :</b> {{ user.email }}
    </h4>
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.getters.user;
    }
  }
};
</script>
