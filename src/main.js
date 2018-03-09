import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import LiveCommentsPage from './components/LiveCommentsPage'
import HomePage from './components/HomePage'

Vue.config.productionTip = false
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: HomePage },
    { path: '/:id/comments', component: LiveCommentsPage }
  ]
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
