<template>
  <div class="toast-container">
    <TransitionGroup name="toast">
      <div v-for="toast in toasts" :key="toast.id" :class="['toast', toast.type]">
        <span class="toast-icon">{{ getIcon(toast.type) }}</span>
        <span class="toast-message">{{ toast.message }}</span>
        <button @click="removeToast(toast.id)" class="toast-close">✕</button>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { useToast } from "../../composables/useToast";

const { toasts, removeToast } = useToast();

function getIcon(type: string): string {
  const icons: Record<string, string> = {
    success: "✓",
    error: "✕",
    warning: "⚠",
    info: "ℹ",
  };
  return icons[type] || "ℹ";
}
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: var(--gap-md);
  right: var(--gap-md);
  z-index: 10000;
  display: flex;
  flex-direction: column;
  gap: var(--gap-sm);
}

.toast {
  display: flex;
  align-items: center;
  gap: var(--gap-sm);
  padding: var(--gap-sm) var(--gap-md);
  border-radius: var(--radius-sm);
  background: var(--white);
  box-shadow: var(--shadow-lg);
  min-width: 300px;
  max-width: 400px;
  /* min/max-width intentional fixed sizes for toast readability */
}

.toast.success {
  border-left: 4px solid var(--accent-success);
}

.toast.error {
  border-left: 4px solid var(--accent-error);
}

.toast.warning {
  border-left: 4px solid var(--accent-warning);
}

.toast.info {
  border-left: 4px solid var(--accent-primary);
}

.toast-icon {
  font-size: var(--font-md);
  font-weight: 700;
}

.toast.success .toast-icon {
  color: var(--accent-success);
}

.toast.error .toast-icon {
  color: var(--accent-error);
}

.toast.warning .toast-icon {
  color: var(--accent-warning);
}

.toast.info .toast-icon {
  color: var(--accent-primary);
}

.toast-message {
  flex: 1;
  color: var(--darkblue);
  font-size: var(--font-sm);
}

.toast-close {
  padding: var(--gap-xs);
  background: none;
  border: none;
  color: var(--gray);
  cursor: pointer;
  font-size: var(--font-xs);
}

.toast-close:hover {
  color: var(--darkblue);
}

/* Mobile responsive */
@media (max-width: 480px) {
  .toast-container {
    left: var(--gap-sm);
    right: var(--gap-sm);
    top: var(--gap-sm);
  }

  .toast {
    min-width: auto;
    max-width: 100%;
    width: 100%;
  }
}

/* Transitions */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
