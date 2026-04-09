<template>
  <Teleport to="body">
    <Transition name="dialog">
      <div v-if="isOpen" class="dialog-overlay" @click="handleOverlayClick">
        <div class="dialog-box" @click.stop>
          <div class="dialog-header">
            <span class="dialog-icon">{{ icon }}</span>
            <h3 class="dialog-title">{{ title }}</h3>
          </div>
          <p class="dialog-message">{{ message }}</p>
          <div class="dialog-actions">
            <button @click="handleCancel" class="btn-dialog btn-cancel">
              {{ cancelText }}
            </button>
            <button @click="handleConfirm" :class="['btn-dialog', 'btn-confirm', confirmClass]">
              {{ confirmText }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
interface Props {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmClass?: string;
  icon?: string;
  closeOnOverlay?: boolean;
}

withDefaults(defineProps<Props>(), {
  confirmText: "Confirm",
  cancelText: "Cancel",
  confirmClass: "danger",
  icon: "⚠️",
  closeOnOverlay: true,
});

const emit = defineEmits<{
  (e: "confirm"): void;
  (e: "cancel"): void;
  (e: "close"): void;
}>();

function handleConfirm() {
  emit("confirm");
  emit("close");
}

function handleCancel() {
  emit("cancel");
  emit("close");
}

function handleOverlayClick() {
  emit("close");
}
</script>

<style scoped>
.dialog-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10001;
}

.dialog-box {
  background: var(--white);
  border-radius: var(--radius-md);
  padding: var(--gap-lg);
  max-width: 400px;
  width: 90%;
  box-shadow: var(--shadow-lg);
}

.dialog-header {
  display: flex;
  align-items: center;
  gap: var(--gap-sm);
  margin-bottom: var(--gap-md);
}

.dialog-icon {
  font-size: var(--font-lg);
}

.dialog-title {
  margin: 0;
  color: var(--darkblue);
  font-size: var(--font-lg);
}

.dialog-message {
  color: var(--gray);
  margin-bottom: var(--gap-lg);
  line-height: 1.5;
}

.dialog-actions {
  display: flex;
  gap: var(--gap-sm);
  justify-content: flex-end;
}

.btn-dialog {
  padding: var(--gap-sm) var(--gap-md);
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-weight: 600;
}

.btn-cancel {
  background: var(--lightgray);
  color: var(--darkblue);
}

.btn-confirm.danger {
  background: var(--accent-error);
  color: var(--white);
}

.btn-confirm.primary {
  background: var(--deepblue);
  color: var(--white);
}

/* Transitions */
.dialog-enter-active,
.dialog-leave-active {
  transition: all 0.2s ease;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
}

.dialog-enter-from .dialog-box,
.dialog-leave-to .dialog-box {
  transform: scale(0.9);
}
</style>
