import Vue from 'vue'
import App from './App.vue'
import router from './router'

/**
 * CSS IMPORTS
 */
import '../node_modules/bootstrap/dist/css/bootstrap.css'

/**
 * JS IMPORTS
 */
import '../node_modules/bootstrap.native/dist/bootstrap-native-v4'
import '../node_modules/bootstrap.native/dist/polyfill'

/**
 * PROGRESS BAR
 */
import VueProgressBar from 'vue-progressbar'
const options = {
  color: '#23f0ff',
  failedColor: '#ff3030',
  thickness: '4px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300
  },
  autoRevert: true,
  location: 'top',
  inverse: false
}
Vue.use(VueProgressBar, options)

Vue.config.productionTip = false

/**
 * COMPONENTS IMPORTS
 */

import Paginate from 'vuejs-paginate'
Vue.component('paginate', Paginate)

export default new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
