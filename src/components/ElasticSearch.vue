<template>
  <div class="container">
    <div class="w-100 mx-auto mb-3">
      <h1 >ElasticSearch</h1>
      <p>This is where you manage searches</p>
    </div>
    <div v-if="success == false" class="alert alert-danger m-0 mb-3 w-100">{{message}}</div>
    <!-- <div v-if="success == true" class="alert alert-success m-0 mb-3 w-100">{{message}}</div> -->
    <div class="mt-3">
      <form class="mb-5" @submit.prevent="search">
        <div class="text-left">
          <div class="form-group w-100">
            <input v-model="query" type="text" class="form-control" id="query" placeholder="Search for..." required>
          </div>
        </div>
        <button class="btn btn-block btn-info" type="submit" :disabled="calling">Submit</button>
      </form>
    </div>
    <div class="mt-5">
      <table class="table text-left">
        <thead>
          <tr>
            <th scope="col">#id</th>
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
</template>

<script>
import http from './../helpers/http.js'
export default {
  name: 'ElasticSearch',
  data() {
    return {
      query: null,
      success: true,
      calling: false,
      users: [],
      message: 'Something happened...'
    }
  },
  methods: {
    search() {
      this.calling = true;
      console.log('Calling external API to add user..')
      http.get('search?q=' + this.query)
        .then(res => {
          this.calling = false;
          this.users = res.data.hits.hits;
        })
        .catch(err => {
          console.error(err);
          this.calling = false;
          this.success = false;
          this.message = err.response.data.message;
        });
    }
  }
}
</script>
