import { createRouter, createWebHistory } from 'vue-router'

// Import BookList eagerly (or lazy load if you want)
import BookList from '../components/BookList.vue' 

const routes = [
  {
    path: '/',
    name: 'BookList',
    component: BookList,
  },
  {
    path: '/books/:id',
    name: 'ReviewDetail',
    component: () => import('../components/ReviewDetail.vue'), // lazy load detail view
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
