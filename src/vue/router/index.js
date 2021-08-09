import VueRouter from './myVueRouter'
import Wel from '../views/wel/index.vue'
const routes = [
  {
    path: '/wel',
    name: 'Wel',
    component: Wel
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router