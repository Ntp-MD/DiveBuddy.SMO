import { ref, readonly } from 'vue'
import { useAuthStore } from '@/stores/auth'

export interface Booking {
  id: string
  userId: string
  courseId: string
  scheduleId: string
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  startDate: string
  endDate: string
  participants: number
  totalPrice: number
  paymentStatus: 'pending' | 'paid' | 'refunded' | 'failed'
  paymentMethod?: string
  specialRequests?: string
  instructorId?: string
  course?: {
    id: string
    name: string
    icon: string
  }
  user?: {
    id: string
    firstName: string
    lastName: string
  }
  createdAt: string
  updatedAt: string
}

export interface Schedule {
  id: string
  courseId: string
  instructorId: string
  startDate: string
  endDate: string
  maxParticipants: number
  bookedSlots: number
  availableSlots: number
  status: 'open' | 'full' | 'closed'
  location: string
  price: number
  course?: {
    name: string
    duration: string
    price: number
  }
  instructor?: {
    id: string
    firstName: string
    lastName: string
    avatar?: string
  }
}

const bookings = ref<Booking[]>([])
const schedules = ref<Schedule[]>([])
const isLoading = ref(false)
const error = ref<string | null>(null)

const API_BASE = '/api'

export function useBookings() {
  const auth = useAuthStore()
  
  async function fetchBookings(): Promise<Booking[]> {
    if (!auth.token) return []
    
    isLoading.value = true
    error.value = null
    
    try {
      const response = await fetch(`${API_BASE}/bookings`, {
        headers: auth.getAuthHeaders()
      }).then(r => r.json())
      
      bookings.value = response.data
      return response.data
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch bookings'
      return []
    } finally {
      isLoading.value = false
    }
  }
  
  async function createBooking(bookingData: {
    courseId: string
    scheduleId: string
    startDate: string
    participants?: number
    specialRequests?: string
  }): Promise<Booking | null> {
    if (!auth.token) return null
    
    isLoading.value = true
    error.value = null
    
    try {
      const response = await fetch(`${API_BASE}/bookings`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          ...auth.getAuthHeaders()
        },
        body: JSON.stringify(bookingData)
      }).then(r => r.json())
      
      bookings.value.unshift(response.data)
      return response.data
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'Failed to create booking'
      return null
    } finally {
      isLoading.value = false
    }
  }
  
  async function fetchSchedules(courseId?: string): Promise<Schedule[]> {
    isLoading.value = true
    error.value = null
    
    try {
      const params = new URLSearchParams()
      if (courseId) params.append('courseId', courseId)
      
      const response = await fetch(`${API_BASE}/schedules?${params}`).then(r => r.json())
      schedules.value = response.data
      return response.data
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch schedules'
      return []
    } finally {
      isLoading.value = false
    }
  }
  
  function getUpcomingBookings(): Booking[] {
    const today = new Date().toISOString().split('T')[0]
    return bookings.value.filter(b => b.startDate >= today && b.status !== 'cancelled')
  }
  
  function getPastBookings(): Booking[] {
    const today = new Date().toISOString().split('T')[0]
    return bookings.value.filter(b => b.endDate < today || b.status === 'completed')
  }
  
  return {
    bookings: readonly(bookings),
    schedules: readonly(schedules),
    isLoading: readonly(isLoading),
    error: readonly(error),
    fetchBookings,
    createBooking,
    fetchSchedules,
    getUpcomingBookings,
    getPastBookings
  }
}
