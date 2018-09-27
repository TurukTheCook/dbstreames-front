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
        <div class="btn-group">
          <button type="button" class="btn btn-sm btn-outline-secondary" v-if="page != 1" @click="page = 1; changePage(page)"> << </button>
          <button type="button" class="btn btn-sm btn-outline-secondary" v-for="pageNumber in pagesNb" v-on:click="changePage(pageNumber)" :disabled="page == pageNumber"> {{pageNumber}} </button>
          <button type="button" @click="page = pages.length; changePage(page)" v-if="page < pages.length" class="btn btn-sm btn-outline-secondary"> >> </button>
        </div>
      </div>
    </div>
  </search-fetch>
</template>

<script>
// @ is an alias to /src
// import http from './../helpers/http.js'
import config from './../config.js'
import searchFetch from '@/components/searchFetch.js'
import _ from 'lodash'

export default {
  name: 'ElasticSearch',
  components: {
    searchFetch
  },
  data() {
    return {
      baseUrl: config.baseUrl,
      message: 'Something happened...',
      textInput: '',
      oldquery: '',
      from: 0,
      size: 3,
      typing: false,
      page: 1,
      pages: [],
      data: null,
    }
  },
  computed: {
    pagesNb() {
      if (this.page < 3) return this.pages.slice(0, 5);
      else return this.pages.slice(this.page-3, this.page+3);
    },
    query() {
      if (!this.typing) {
        this.pages = [];
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
      this.pages = [];
      let numberOfPages = Math.ceil(data.data.hits.total / this.size);
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    },
    changePage(pageNumber) {
      this.page = pageNumber;
      this.from = pageNumber * this.size - this.size;
    }
  }
}
</script>
