<template>
  <div class="btn-group">
    <button type="button" class="btn btn-sm btn-outline-secondary" v-if="page != 1" @click="page = 1; changePage(page)"> << </button>
    <button type="button" class="btn btn-sm btn-outline-secondary" v-for="pageNumber in pagesNb" v-on:click="changePage(pageNumber)" :disabled="page == pageNumber"> {{pageNumber}} </button>
    <button type="button" @click="page = pages.length; changePage(page)" v-if="page < pages.length" class="btn btn-sm btn-outline-secondary"> >> </button>
  </div>
</template>

<script>
export default {
  name: 'Paginate',
  props: ['page', 'pages', 'data'],
  computed: {
    pagesNb() {
      if (this.page < 3) return this.pages.slice(0, 5);
      else return this.pages.slice(this.page-3, this.page+3);
    },
  },
  methods: {
    changePage(pageNumber) {
      this.$emit('changepage', pageNumber);
      this.page = pageNumber;
      this.from = pageNumber * this.size - this.size;
    },
    setPage() {
      this.pages = [];
      let numberOfPages = Math.ceil(this.data.data.hits.total / this.size);
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    }
  }
}
</script>

