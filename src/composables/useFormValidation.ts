import { ref, computed, type Ref } from 'vue'

export interface ValidationRule {
  required?: boolean
  minLength?: number
  maxLength?: number
  email?: boolean
  phone?: boolean
  pattern?: RegExp
  message?: string
}

export interface FieldValidation {
  value: Ref<string>
  rules: ValidationRule[]
  touched: Ref<boolean>
}

export interface ValidationError {
  field: string
  message: string
}

export function useFormValidation() {
  const errors = ref<Record<string, string>>({})
  const touched = ref<Record<string, boolean>>({})
  
  function validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }
  
  function validatePhone(phone: string): boolean {
    const re = /^[0-9+\-\s()]*$/
    return re.test(phone) && phone.replace(/\D/g, '').length >= 9
  }
  
  function validateField(fieldName: string, value: string, rules: ValidationRule[]): string | null {
    for (const rule of rules) {
      if (rule.required && !value.trim()) {
        return rule.message || `${fieldName} is required`
      }
      
      if (rule.minLength && value.length < rule.minLength) {
        return rule.message || `${fieldName} must be at least ${rule.minLength} characters`
      }
      
      if (rule.maxLength && value.length > rule.maxLength) {
        return rule.message || `${fieldName} must be less than ${rule.maxLength} characters`
      }
      
      if (rule.email && value && !validateEmail(value)) {
        return rule.message || 'Please enter a valid email'
      }
      
      if (rule.phone && value && !validatePhone(value)) {
        return rule.message || 'Please enter a valid phone number'
      }
      
      if (rule.pattern && value && !rule.pattern.test(value)) {
        return rule.message || `${fieldName} format is invalid`
      }
    }
    
    return null
  }
  
  function validateAll(fields: Record<string, { value: string; rules: ValidationRule[] }>): boolean {
    errors.value = {}
    let isValid = true
    
    for (const [fieldName, field] of Object.entries(fields)) {
      const error = validateField(fieldName, field.value, field.rules)
      if (error) {
        errors.value[fieldName] = error
        isValid = false
      }
    }
    
    return isValid
  }
  
  function touchField(fieldName: string) {
    touched.value[fieldName] = true
  }
  
  function touchAll(fieldNames: string[]) {
    fieldNames.forEach(name => {
      touched.value[name] = true
    })
  }
  
  function clearErrors() {
    errors.value = {}
    touched.value = {}
  }
  
  function getError(fieldName: string): string | null {
    return touched.value[fieldName] ? errors.value[fieldName] || null : null
  }
  
  function hasError(fieldName: string): boolean {
    return touched.value[fieldName] && !!errors.value[fieldName]
  }
  
  const hasAnyError = computed(() => Object.keys(errors.value).length > 0)
  
  return {
    errors: computed(() => errors.value),
    touched: computed(() => touched.value),
    hasAnyError,
    validateEmail,
    validatePhone,
    validateField,
    validateAll,
    touchField,
    touchAll,
    clearErrors,
    getError,
    hasError
  }
}
