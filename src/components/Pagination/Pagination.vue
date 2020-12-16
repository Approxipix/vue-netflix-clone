<template>
  <div class="Pagination">
    <ul v-if="totalPages !== 1" class="Pagination__list">
      <li class="Pagination__item">
        <button
          :disabled="currentPage === 1"
          @click="pageChange(currentPage - 1)"
          class="Pagination__btn"
        >
          <font-awesome-icon :icon="['fas', 'chevron-left']" />
        </button>
      </li>
      <li v-for="(page,index) in getPages" :key="index" class="Pagination__item">
        <span v-if="getPages[index - 1] + 1 < page" class="Pagination__dots">...</span>
        <button
          @click="pageChange(page)"
          :class="{'Pagination__btn--active': page === currentPage}"
          class="Pagination__btn"
        >
          {{ page }}
        </button>
      </li>
      <li class="Pagination__item">
        <button
          :disabled="currentPage === totalPages"
          @click="pageChange(currentPage + 1)"
          class="Pagination__btn"
        >
          <font-awesome-icon :icon="['fas', 'chevron-right']" />
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'Pagination',
    props: {
      currentPage: {
        type: Number,
        required: true,
      },
      totalPages: {
        type: Number,
        required: true,
      }
    },
    computed: {
      getPages () {
        return this.getVisiblePages(this.currentPage, this.totalPages);
      },
    },
    methods: {
      getVisiblePages (page, total) {
        if (total < 8) return [1, 2, 3, 4, 5, 6, 7].filter(page => page <= total);
        if (page > 4 && page + 2 < total) return [1, page - 2, page - 1, page, page + 1, page + 2, total];
        if (page > 4 && page + 3 >= total) return [1, total - 5, total - 4, total - 3, total - 2, total - 1, total];
        return [1, 2, 3, 4, 5, 6, total];
      },
      pageChange(page) {
        if (page !== this.currentPage) {
          let params = { ...this.$route.query, page: +page || 1 };
          this.updateQuery(params);
        }
      },
      updateQuery(params) {
        let newQuery = Object.keys(params)
          .filter(key => {
            if (key === '') return false;
            if (params[key] instanceof Array) return params[key].length > 0;
            return params[key] !== '';
          })
          .map(key => key + '=' + params[key]).join('&');

        this.$router.push(`?${newQuery}`);
        this.$emit('load');
      }
    },
  }
</script>

<style lang="scss">
  @import 'Pagination';
</style>
