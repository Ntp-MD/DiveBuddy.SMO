import { ref, readonly } from 'vue'

export interface ToastMessage {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  message: string
  duration?: number
}

const toasts = ref<ToastMessage[]>([])

export function useToast() {
  function addToast(type: ToastMessage['type'], message: string, duration = 3000) {
    const id = Math.random().toString(36).substr(2, 9)
    const toast: ToastMessage = { id, type, message, duration }
    
    toasts.value.push(toast)
    
    setTimeout(() => {
      removeToast(id)
    }, duration)
  }
  
  function removeToast(id: string) {
    const index = toasts.value.findIndex(t => t.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
    }
  }
  
  function success(message: string, duration?: number) {
    addToast('success', message, duration)
  }
  
  function error(message: string, duration?: number) {
    addToast('error', message, duration)
  }
  
  function warning(message: string, duration?: number) {
    addToast('warning', message, duration)
  }
  
  function info(message: string, duration?: number) {
    addToast('info', message, duration)
  }
  
  return {
    toasts: readonly(toasts),
    addToast,
    removeToast,
    success,
    error,
    warning,
    info
  }
}
