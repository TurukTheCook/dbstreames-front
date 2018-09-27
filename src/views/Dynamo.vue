<template>
  <div class="container">
    <div class="w-100 mx-auto mb-3">
      <h1 >DynamoDB + Streams</h1>
      <p>This is where you manage dynamodb</p>
    </div>
    <div v-if="success == false" class="alert alert-danger m-0 mb-3 w-100">{{message}}</div>
    <div v-if="success == true" class="alert alert-success m-0 mb-3 w-100">{{message}}</div>
    <div class="mt-3 row">
      <form class="mb-5 col-md-8 border border-dark p-3 mx-auto" @submit.prevent="addUser">
        <div class="text-left form-row">
          <h2 class="w-100">Add user :</h2>
          <div class="form-group col-12">
            <label for="firstname">First Name</label>
            <input v-model="user.firstname" type="text" class="form-control" id="firstname" placeholder="Enter firstname" required>
          </div>
          <div class="form-group col-12">
            <label for="lastname">Last Name</label>
            <input v-model="user.lastname" type="text" class="form-control" id="lastname" placeholder="Enter lastname" required>
          </div>
        </div>
        <button class="btn btn-block btn-info" type="submit" :disabled="calling">Submit</button>
      </form>
      <form class="mb-5 col-md-8 border border-dark p-3 mx-auto" @submit.prevent="updateUser">
        <div class="text-left form-row">
          <h2 class="w-100">Update user :</h2>
          <div class="form-group w-100">
            <label for="updateid">User Id</label>
            <input v-model="updateId" type="text" class="form-control" id="updateid" placeholder="Enter User Id">
          </div>
          <div class="form-group col-md-6">
            <label for="paramname">Param Name</label>
            <input v-model="updated.paramName" type="text" class="form-control" id="paramvalue" placeholder="Enter param name">
          </div>
          <div class="form-group col-md-6">
            <label for="paramvalue">Param Value</label>
            <input v-model="updated.paramValue" type="text" class="form-control" id="paramvalue" placeholder="Enter param value">
          </div>
        </div>
        <button class="btn btn-block btn-info" type="submit" :disabled="calling">Submit</button>
      </form>
      <form class="mb-5 col-md-8 border border-dark p-3 mx-auto" @submit.prevent="deleteUser">
        <div class="text-left">
          <h2 class="w-100">Delete user :</h2>
          <div class="form-group">
            <label for="removeid">User Id</label>
            <input v-model="removeId" type="text" class="form-control" id="removeid" placeholder="Enter User Id">
          </div>
        </div>
        <button class="btn btn-block btn-info" type="submit" :disabled="calling">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import http from './../helpers/http.js'

export default {
  name: 'DynamoDb',
  data() {
    return {
      user: {},
      updated: {},
      updateId: null,
      removeId: null,
      calling: false,
      success: null,
      message: 'Something happened..'
    }
  },
  methods: {
    addUser() {
      this.calling = true;
      console.log('Calling external API to add user..')
      http.post('users', this.user)
        .then(res => {
          this.calling = false;
          this.success = true;
          this.message = res.data;
        })
        .catch(err => {
          console.error(err);
          this.calling = false;
          this.success = false;
          this.message = err.response.data.message;
        });
    },
    updateUser() {
      this.calling = true;
      console.log('Calling external API to update user..')
      http.put('users/' + this.updateId, this.updated)
        .then(res => {
          this.calling = false;
          this.success = true;
          this.message = res.data;
        })
        .catch(err => {
          console.error(err);
          this.calling = false;
          this.success = false;
          this.message = err.response.data.message;
        });
    },
    deleteUser() {
      this.calling = true;
      console.log('Calling external API to remove user..')
      http.delete('users/' + this.removeId)
        .then(res => {
          this.calling = false;
          this.success = true;
          this.message = res.data;
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
