import Vue from 'vue'
import Router from 'vue-router'
import Dynamo from './views/Dynamo.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dynamo',
      component: Dynamo
    },
    {
      path: '/es',
      name: 'elastic',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Elastic.vue')
    }
  ]
})
