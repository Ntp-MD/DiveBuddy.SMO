import { ref, readonly } from 'vue'

export interface Course {
  id: string
  name: string
  code: string
  description: string
  duration: string
  level: string
  maxDepth: string
  price: number
  discountedPrice: number | null
  icon: string
  theory: string
  dives: string
  requirements: string[]
  includes: string[]
  schedule: Array<{ day: number; activity: string }>
  image: string
  featured: boolean
  active: boolean
}

const courses = ref<Course[]>([])
const currentCourse = ref<Course | null>(null)
const isLoading = ref(false)
const error = ref<string | null>(null)

const API_BASE = '/api'

export function useCourses() {
  async function fetchCourses(filters?: { featured?: boolean; level?: string }): Promise<Course[]> {
    isLoading.value = true
    error.value = null
    
    try {
      const params = new URLSearchParams()
      if (filters?.featured) params.append('featured', 'true')
      if (filters?.level) params.append('level', filters.level)
      
      const response = await fetch(`${API_BASE}/courses?${params}`).then(r => r.json())
      courses.value = response.data
      return response.data
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch courses'
      return []
    } finally {
      isLoading.value = false
    }
  }
  
  async function fetchCourseById(id: string): Promise<Course | null> {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await fetch(`${API_BASE}/courses/${id}`).then(r => r.json())
      currentCourse.value = response.data
      return response.data
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch course'
      return null
    } finally {
      isLoading.value = false
    }
  }
  
  function getCoursesByLevel(level: string): Course[] {
    return courses.value.filter(c => c.level.toLowerCase() === level.toLowerCase())
  }
  
  function getFeaturedCourses(): Course[] {
    return courses.value.filter(c => c.featured)
  }
  
  return {
    courses: readonly(courses),
    currentCourse: readonly(currentCourse),
    isLoading: readonly(isLoading),
    error: readonly(error),
    fetchCourses,
    fetchCourseById,
    getCoursesByLevel,
    getFeaturedCourses
  }
}
