import { createRouter, createWebHashHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import  ContactIndex from '../views/ContactIndex.vue'
import  ContactDetails from '../views/ContactDetails.vue'
import  ContactEdit from '../views/ContactEdit.vue'
import  Chart from '../views/Chart.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/contact',
      name: 'ContactIndex',
      component: ContactIndex
    },
    {
      path: '/contact/:contactId',
      name: 'ContactDetails',
      component: ContactDetails
    },
    {
      path: '/contact/edit/:contactId?',
      name: 'ContactEdit',
      component: ContactEdit
    },
    {
      path: '/chart',
      name: 'Chart',
      component: Chart
    },
    
  ]
})

export default router
