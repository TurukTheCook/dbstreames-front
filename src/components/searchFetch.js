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
    },
    filter: {
      type: Object,
    },
  },
  data() {
    return {
      // Create a new axios instance.
      // See: https://github.com/axios/axios#creating-an-instance
      api: axios.create({ baseURL: this.baseUrl }),
      data: null,
      error: null,
      loading: false,
    };
  },
  watch: {
    // Load the data from the given endpoint
    // on initial rendering of the component and
    // every time the filter property changes.
    filter: {
      // immediate: true,
      handler: 'load',
    },
    endpoint: {
      handler: 'load',
    },
  },
  methods: {
    // The `query` method will handle
    // different query types for us.
    async query(type, ...params) {
      // If we're currently loading content
      // we don't submit an additional request.
      if (this.loading) return;

      this.loading = true;
      try {
        const response = await this.api[type](...params);
        this.data = response.data.hits.hits;
        this.error = null;
        if (!this.data[0]) {
          this.error = "Nothing found..";
        }
        // this.$emit('success', response);
      } catch (error) {
        this.data = null;
        this.error = error.response.data.message;
        // this.$emit('error', error);
      }
      this.loading = false;
    },
    load() {
      return this.query('get', this.endpoint, this.filter);
    },
  },
  render() {
    // Render the default scoped slot and
    // provide data and method properties
    // via the slot scope.
    return this.$scopedSlots.default({
      data: this.data,
      error: this.error,
      load: this.load,
      loading: this.loading,
    });
  },
};