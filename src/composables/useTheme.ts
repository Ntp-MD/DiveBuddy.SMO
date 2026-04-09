import { ref, readonly, onMounted, computed } from 'vue'

type Theme = 'light' | 'dark'

const currentTheme = ref<Theme>('light')

export function useTheme() {
  function setTheme(theme: Theme) {
    currentTheme.value = theme
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('divebuddy-theme', theme)
  }
  
  function toggleTheme() {
    const newTheme = currentTheme.value === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }
  
  onMounted(() => {
    // Check saved theme or system preference
    const saved = localStorage.getItem('divebuddy-theme') as Theme | null
    if (saved) {
      setTheme(saved)
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark')
    }
  })
  
  return {
    currentTheme: readonly(currentTheme),
    setTheme,
    toggleTheme,
    isDark: computed(() => currentTheme.value === 'dark')
  }
}

