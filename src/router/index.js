import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
//import LoginView from '../views/LoginView.vue'
//import { component } from 'vue/types/umd'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
  },
   {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue'),
  },
  {
    path: '',
    component: () => import('../views/Toolbar.vue'),
    children: [
      {
        path: '/products',
        name: 'products',
        component: () => import('../views/Products.vue')
      },
      {
        path: '/admindashboard',
        name: 'AdminDashboard',
        component: () => import('../views/AdminDashboard.vue'),
         
      },
      {
        path: '/orderme',
        name: 'orderme',
        component: () => import('../views/OrderMe.vue'),
      },
      {
        path: '/aboutme',
        name: 'aboutme',
        component: () => import('../views/AboutMe.vue'),
      },
      
      {
        path: '/apicon',
        name: 'apicon',
        component: () => import('../views/Apicon.vue')
      },
      {
        path: '/orderall',
        name: 'OrderAll',
        component: () => import('../views/OrderAll.vue')
      },
    ]
    
  },
  {
        path: '/workshop02',
        name: 'workshop02',
        component: () => import('../views/Workshop02.vue'),
      },
]

  

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("userToken");
  const role = localStorage.getItem("role");

  // ถ้าหน้านั้นต้อง login แต่ยังไม่มี token
  if (to.meta.requiresAuth && !token) {
    return next("/login");
  }

  // ถ้าหน้านั้นต้องเป็น admin แต่ role ไม่ใช่ admin
  if (to.meta.requiresAdmin && role !== "admin") {
    return next("/products"); // ✅ redirect ไปหน้า products แทน
  }

  next(); // ผ่านได้
});

export default router
