import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path:'/shoplist',
    name: 'ShopList',
    component:() => import('../views/ShopList.vue'),
    meta: {
      needsVerification: true,
    },
  },
  {
    path:'/test',
    name: 'Test',
    component:() => import('../views/test.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

router.beforeEach((to, from, next) => {
  console.log(
    "Bio sam na",
    from.name,
    "idem na",
    to.name,
    "a korisnik je",
    store.userVerified
  );
  if (to.meta.needsVerification && !store.userVerified) next({ name: 'Home' })
  else next()
})
