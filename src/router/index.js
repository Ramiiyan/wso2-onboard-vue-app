import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Test from '../views/run_apis_cmd.vue'
import AdminHome from '../components/Admin-Home.vue'
import DocHome from '../components/Doctor-Home.vue'
import PatientHome from '../components/Patient-Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/test',
    name:'Test',
    component: Test,
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home,
    // props: true,
  },
  {
    path:'/Home/admin',
    name: 'admin',
    component: AdminHome,
  },
  {
    path:'/Home/doctor',
    name: 'doctor',
    component: DocHome,
  },
  {
    path:'/Home/patient',
    name: 'patient',
    component: PatientHome,
  },


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
