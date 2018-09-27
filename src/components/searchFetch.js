import axios from 'axios';

export default {
  props: {
    baseUrl: {
      type: String,
      required: true,
    },
    endpoint: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      // Create a new axios instance.
      // See: https://github.com/axios/axios#creating-an-instance
      api: axios.create({ baseURL: this.baseUrl }),
      data: null,
      users: [],
      error: null,
      loading: false,
    };
  },
  watch: {
    // Load the data from the given endpoint
    // on initial rendering of the component and
    // every time the filter property changes.
    filter: {
      handler: 'load',
    },
    endpoint: {
      handler: 'load',
    },
  },
  methods: {
    // The `query` method will handle
    // different query types for us.
    async query(type, endpoint) {
      // If we're currently loading content
      // we don't submit an additional request.
      if (this.loading) return;

      this.loading = true;
      try {
        const response = await this.api[type](endpoint);
        this.data = response.data;
        this.users = response.data.hits.hits;
        this.error = null;
        if (!this.users) {
          this.error = "Nothing found..";
        }
        this.$emit('success', response);
      } catch (error) {
        this.data = null;
        this.error = error.response;
        this.$emit('error', error);
      }
      this.loading = false;
    },
    load() {
      return this.query('get', this.endpoint);
    },
  },
  render() {
    // Render the default scoped slot and
    // provide data and method properties
    // via the slot scope.
    return this.$scopedSlots.default({
      data: this.data,
      users: this.users,
      error: this.error,
      load: this.load,
      loading: this.loading,
    });
  },
};