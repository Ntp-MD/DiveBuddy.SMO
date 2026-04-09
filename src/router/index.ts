import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const HomePage = () => import('@/views/HomePage.vue')
const LoginPage = () => import('@/views/LoginPage.vue')
const DashboardPage = () => import('@/views/DashboardPage.vue')
const AdminLogin = () => import('@/views/AdminLogin.vue')
const AdminPage = () => import('@/views/AdminPage.vue')

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
      meta: { requiresGuest: true },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardPage,
      meta: { requiresAuth: true },
    },
    {
      path: '/admin/login',
      name: 'admin-login',
      component: AdminLogin,
      meta: { requiresGuest: true },
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminPage,
      meta: { requiresAuth: true, requiresAdmin: true },
    },
  ],
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  },
})

router.beforeEach((to) => {
  const auth = useAuthStore()

  // Redirect unauthenticated users to login
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { name: 'login' }
  }

  // Redirect non-admin users away from admin pages
  if (to.meta.requiresAdmin && !auth.isAdmin) {
    return { name: 'dashboard' }
  }

  // Redirect already logged-in users away from guest-only pages
  if (to.meta.requiresGuest && auth.isAuthenticated) {
    if (auth.isAdmin) {
      return { name: 'admin' }
    }
    return { name: 'dashboard' }
  }
})

export default router
