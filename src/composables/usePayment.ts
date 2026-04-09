import { ref, readonly } from 'vue'

export interface PaymentDetails {
  bookingId: string
  amount: number
  currency: string
  method: 'credit_card' | 'paypal' | 'bank_transfer' | 'promptpay'
  cardNumber?: string
  cardExpiry?: string
  cardCvv?: string
}

export interface PaymentResult {
  success: boolean
  transactionId?: string
  status: 'pending' | 'completed' | 'failed'
  message: string
}

const isProcessing = ref(false)
const paymentError = ref<string | null>(null)

const API_BASE = '/api'

// Mock payment gateway - replace with Stripe/2C2P/Omise in production
export function usePayment() {
  
  async function processPayment(details: PaymentDetails): Promise<PaymentResult> {
    isProcessing.value = true
    paymentError.value = null
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock validation
      if (details.method === 'credit_card' && details.cardNumber === '0000000000000000') {
        return {
          success: false,
          status: 'failed',
          message: 'Invalid card number'
        }
      }
      
      // Simulate success (95% success rate)
      const isSuccessful = Math.random() > 0.05
      
      if (isSuccessful) {
        const transactionId = `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        
        // Update booking payment status via API (mock)
        try {
          await fetch(`${API_BASE}/bookings/${details.bookingId}/payment`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              transactionId,
              amount: details.amount,
              method: details.method,
              status: 'completed'
            })
          })
        } catch {
          // API may not exist yet — continue with mock success
        }
        
        return {
          success: true,
          transactionId,
          status: 'completed',
          message: 'Payment processed successfully'
        }
      } else {
        return {
          success: false,
          status: 'failed',
          message: 'Payment declined by bank. Please try again or use a different payment method.'
        }
      }
    } catch (err: unknown) {
      paymentError.value = err instanceof Error ? err.message : 'Payment processing failed'
      return {
        success: false,
        status: 'failed',
        message: paymentError.value || 'Unknown error'
      }
    } finally {
      isProcessing.value = false
    }
  }
  
  async function generatePromptPayQR(amount: number): Promise<string> {
    // Mock QR generation - would connect to Thai bank API
    await new Promise(resolve => setTimeout(resolve, 1000))
    return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=PROMPTPAY-${amount}-${Date.now()}`
  }
  
  function validateCardNumber(cardNumber: string): boolean {
    // Luhn algorithm for card validation
    const clean = cardNumber.replace(/\s/g, '')
    if (!/^\d{13,19}$/.test(clean)) return false
    
    let sum = 0
    let isEven = false
    
    for (let i = clean.length - 1; i >= 0; i--) {
      let digit = parseInt(clean.charAt(i), 10)
      
      if (isEven) {
        digit *= 2
        if (digit > 9) digit -= 9
      }
      
      sum += digit
      isEven = !isEven
    }
    
    return sum % 10 === 0
  }
  
  function formatCardNumber(value: string): string {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ''
    const parts = []
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    
    if (parts.length) {
      return parts.join(' ')
    } else {
      return v
    }
  }
  
  return {
    isProcessing: readonly(isProcessing),
    paymentError: readonly(paymentError),
    processPayment,
    generatePromptPayQR,
    validateCardNumber,
    formatCardNumber
  }
}
