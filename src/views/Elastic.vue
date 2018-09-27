<template>
  <search-fetch :baseUrl="baseUrl" :endpoint="endpoint">
    <div slot-scope="{ data: users, error, loading }" class="container">
      <div class="w-100 mx-auto mb-3">
        <h1 >ElasticSearch</h1>
        <p>This is where you manage searches</p>
      </div>
      <div v-if="error" class="alert alert-danger m-0 mb-3 w-100">{{error}}</div>
      <div class="mt-3">
        <div class="form-group w-100 text-left">
          <input v-model="textinput" v-on:input="typing = true" type="text" class="form-control" id="query" placeholder="Search for..." required>
        </div>
      </div>
      <div class="mt-5">
        <table class="table table-dark text-left">
          <thead>
            <tr>
              <th scope="col">#UserId</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user._id">
              <th scope="row">{{user._id}}</th>
              <td>{{user._source.firstname}}</td>
              <td>{{user._source.lastname}}</td>
            </tr>
          </tbody>
        </table>
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
      textinput: '',
      oldquery: '',
      from: null,
      size: null,
      users: [],
      typing: false,
      message: 'Something happened...'
    }
  },
  computed: {
    query() {
      if (!this.typing) {
        this.oldquery = this.textinput;
        return this.textinput;
      }
      else return this.oldquery;
    },
    endpoint() {
        let params = 'search?q=' + this.query;
        if (this.from) params += '&from=' + this.from;
        if (this.size) params += '&size=' + this.size;
        return params;
    },
  },
  watch: {
    textinput: _.debounce(function () {
    	this.typing = false;
    }, 1000)
  }
  // methods: {
  //   search() {
  //     this.calling = true;
  //     console.log('Calling external API to add user..')
  //     let params = 'search?q=' + this.query;
  //     if (this.from) params += '&from=' + this.from;
  //     if (this.size) params += '&size=' + this.size;
  //     http.get(params)
  //       .then(res => {
  //         this.calling = false;
  //         this.success = true;
  //         this.users = res.data.hits.hits;
  //         if (!this.users[0]) {
  //           this.success = false;
  //           this.message = "Nothing found.."
  //         }
  //       })
  //       .catch(err => {
  //         console.error(err);
  //         this.calling = false;
  //         this.success = false;
  //         this.message = err.response.data.message;
  //       });
  //   }
  // }
}
</script>
