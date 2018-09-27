<template>
  <search-fetch :baseUrl="baseUrl" :endpoint="endpoint" v-on:success="setData">
    <div slot-scope="{ data, users, error, loading }" class="container">
      <div class="w-100 mx-auto mb-3">
        <h1>ElasticSearch</h1>
        <p>This is where you manage searches</p>
      </div>
      <div v-if="error" class="alert alert-danger m-0 mb-3 w-100">{{error}}</div>
      <div class="mt-3">
        <div class="form-group w-100 text-left">
          <input v-model="textInput" v-on:input="typing = true" type="text" class="form-control" id="query" placeholder="Search for..." autofocus>
        </div>
      </div>
      <div v-if="data" class="mt-5">
        <h3 v-if="data">Total Results: {{data.hits.total}}</h3>
        <table class="table table-dark text-left">
          <thead>
            <tr>
              <th scope="col">#UserId</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in data.hits.hits" :key="user._id">
              <th scope="row">{{user._id}}</th>
              <td>{{user._source.firstname}}</td>
              <td>{{user._source.lastname}}</td>
            </tr>
          </tbody>
        </table>
        <paginate
          v-model="page"
          :page-count="pagesTotal"
          :click-handler="changePage"
          :prev-text="'Prev'"
          :next-text="'Next'"
          :container-class="'pagination'"
          :page-class="'page-item'"
          :page-link-class="'page-link'"
          :prev-class="'page-item'"
          :prev-link-class="'page-link'"
          :next-class="'page-item'"
          :next-link-class="'page-link'">
        </paginate>
      </div>
    </div>
  </search-fetch>
</template>

<script>
// @ is an alias to /src
// import http from './../helpers/http.js'
import config from './../config.js';
import searchFetch from '@/components/searchFetch.js';
import _ from 'lodash';

export default {
  name: 'ElasticSearch',
  components: {
    searchFetch,
  },
  data() {
    return {
      baseUrl: config.baseUrl,
      message: 'Something happened...',
      textInput: '',
      oldquery: '',
      typing: false,
      from: 0,
      size: 3,
      page: 1,
      pagesTotal: 0,
    }
  },
  computed: {
    query() {
      if (!this.typing) {
        this.pagesTotal = 0;
        this.from = 0;
        this.page = 1;
        this.oldquery = this.textInput;
        return this.textInput;
      }
      else return this.oldquery;
    },
    endpoint() {
        return 'search?q=' + this.query + '&from=' + this.from + '&size=' + this.size;
    },
  },
  watch: {
    textInput: _.debounce(function () {
    	this.typing = false;
    }, 1000)
  },
  methods: {
    setData(data) {
      this.pagesTotal = Math.ceil(data.data.hits.total / this.size);
    },
    changePage(pageNumber) {
      this.page = pageNumber;
      this.from = pageNumber * this.size - this.size;
    }
  }
}
</script>

<style>
.pagination {
  justify-content: center;
}
</style>
