import { createRouter, createWebHistory } from 'vue-router';
import DevicesPage from '../components/EpsilonTask/DevicesPage.vue';
import NotFound from '../components/EpsilonTask/NotFound.vue';
import Home from '../components/EpsilonTask/Home.vue'

const routes =  [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/devices',
    name: 'devices',
    component: DevicesPage
  },
  {
    // create lazy loading as the presentation of Not found page might not be required at all
    path: '/:catchAll(.*)',    
    component: () => import('../components/EpsilonTask/NotFound.vue'),
    hidden: true
  }
] 
const router = createRouter({history: createWebHistory(import.meta.env.BASE_URL), routes})

export default router
