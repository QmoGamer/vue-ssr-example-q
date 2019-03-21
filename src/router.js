import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import ItemPage from '@/components/ItemPage.vue'

Vue.use(Router)

export function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      { path: '/', component: HomePage },
      { path: '/item/:id', component: ItemPage }
    ]
  })
} 