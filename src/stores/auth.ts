import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface User {
  id: string | number
  email: string
  firstName: string
  lastName: string
  role: 'admin' | 'instructor' | 'customer' | 'user'
  avatar?: string
  phone?: string
  username?: string
  divesCount?: number
  certifications?: string[]
  joinedDate?: string
}

interface MockUser extends User {
  password: string
}

const API_BASE = '/api'
const isClient = typeof window !== 'undefined'

// Mock user data for local login
const mockUsers: MockUser[] = [
  { id: 1, username: "admin", email: "admin@divebuddy.smo", password: "admin123", role: "admin", firstName: "Admin", lastName: "User", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100", joinedDate: "2023-01-15", certifications: ["Divemaster", "Instructor"], divesCount: 1250 },
  { id: 2, username: "john_diver", email: "john@example.com", password: "diver123", role: "user", firstName: "John", lastName: "Smith", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100", joinedDate: "2023-06-20", certifications: ["Open Water Diver", "Advanced Diver"], divesCount: 45 },
  { id: 3, username: "sarah_diver", email: "sarah@example.com", password: "ocean456", role: "user", firstName: "Sarah", lastName: "Johnson", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b7c2?w=100", joinedDate: "2023-09-10", certifications: ["Open Water Diver"], divesCount: 23 },
  { id: 4, username: "mike_instructor", email: "mike@divebuddy.smo", password: "teach789", role: "instructor", firstName: "Mike", lastName: "Chen", avatar: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=100", joinedDate: "2022-11-05", certifications: ["Divemaster", "Instructor", "Master Scuba Diver Trainer"], divesCount: 2100 },
  { id: 5, username: "emma_beginner", email: "emma@example.com", password: "start321", role: "user", firstName: "Emma", lastName: "Wilson", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100", joinedDate: "2024-01-28", certifications: [], divesCount: 0 },
]

export const useAuthStore = defineStore('auth', () => {
  const currentUser = ref<User | null>(null)
  const token = ref<string | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Initialize from localStorage or sessionStorage
  if (isClient) {
    const savedToken = localStorage.getItem('divebuddy_token') || sessionStorage.getItem('divebuddy_token')
    const savedUser = localStorage.getItem('divebuddy_user') || sessionStorage.getItem('divebuddy_user')
    if (savedToken) token.value = savedToken
    if (savedUser) {
      try {
        currentUser.value = JSON.parse(savedUser)
      } catch (e) {
        console.warn('Failed to parse saved user data:', e)
        localStorage.removeItem('divebuddy_user')
        sessionStorage.removeItem('divebuddy_user')
      }
    }
  }

  const isAuthenticated = computed(() => !!token.value && !!currentUser.value)
  const isAdmin = computed(() => currentUser.value?.role === 'admin')
  const isInstructor = computed(() => currentUser.value?.role === 'instructor')

  async function login(email: string, password: string): Promise<boolean> {
    isLoading.value = true
    error.value = null

    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      }).then((r) => r.json())

      if (response.success) {
        token.value = response.token
        currentUser.value = response.user

        if (isClient) {
          localStorage.setItem('divebuddy_token', response.token)
          localStorage.setItem('divebuddy_user', JSON.stringify(response.user))
        }

        return true
      }

      error.value = response.message || 'Login failed'
      return false
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'Login failed'
      return false
    } finally {
      isLoading.value = false
    }
  }

  async function register(userData: {
    email: string
    password: string
    firstName: string
    lastName: string
    phone?: string
  }): Promise<boolean> {
    isLoading.value = true
    error.value = null

    try {
      const response = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      }).then((r) => r.json())

      return response.success
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'Registration failed'
      return false
    } finally {
      isLoading.value = false
    }
  }

  async function fetchCurrentUser(): Promise<boolean> {
    if (!token.value) return false

    try {
      const response = await fetch(`${API_BASE}/auth/me`, {
        headers: getAuthHeaders(),
      }).then((r) => r.json())

      if (response.success) {
        currentUser.value = response.user
        if (isClient) {
          localStorage.setItem('divebuddy_user', JSON.stringify(response.user))
        }
        return true
      }
    } catch {
      logout()
      return false
    }
    return false
  }

  async function loginWithCredentials(
    usernameOrEmail: string,
    password: string,
    remember: boolean = false,
  ): Promise<boolean> {
    isLoading.value = true
    error.value = null

    try {
      await new Promise((resolve) => setTimeout(resolve, 500))

      const found = mockUsers.find(
        (u) =>
          (u.username === usernameOrEmail || u.email === usernameOrEmail) &&
          u.password === password,
      )

      if (found) {
        const { password: _, ...safeUser } = found
        currentUser.value = safeUser
        token.value = `mock-token-${found.id}`

        if (isClient && remember) {
          localStorage.setItem('divebuddy_token', token.value)
          localStorage.setItem('divebuddy_user', JSON.stringify(safeUser))
        } else if (isClient) {
          sessionStorage.setItem('divebuddy_token', token.value)
          sessionStorage.setItem('divebuddy_user', JSON.stringify(safeUser))
        }

        return true
      }

      error.value = 'Invalid username or password'
      return false
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'Login failed'
      return false
    } finally {
      isLoading.value = false
    }
  }

  function logout() {
    token.value = null
    currentUser.value = null
    if (isClient) {
      localStorage.removeItem('divebuddy_token')
      localStorage.removeItem('divebuddy_user')
      sessionStorage.removeItem('divebuddy_token')
      sessionStorage.removeItem('divebuddy_user')
    }
  }

  function getAuthHeaders(): Record<string, string> {
    return token.value ? { Authorization: `Bearer ${token.value}` } : {}
  }

  return {
    currentUser,
    token,
    isLoading,
    error,
    isAuthenticated,
    isAdmin,
    isInstructor,
    login,
    loginWithCredentials,
    register,
    fetchCurrentUser,
    logout,
    getAuthHeaders,
  }
})
