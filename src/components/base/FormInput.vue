<template>
  <div class="form-field">
    <label v-if="label" :for="inputId" class="field-label">
      {{ label }}
      <span v-if="required" class="required">*</span>
    </label>

    <div class="input-wrapper">
      <input
        :id="inputId"
        :type="type"
        :value="modelValue"
        @input="handleInput"
        @blur="handleBlur"
        :placeholder="placeholder"
        :class="['field-input', { 'has-error': showError }]"
        :disabled="disabled"
      />
      <span v-if="icon" class="input-icon">{{ icon }}</span>
    </div>

    <span v-if="showError" class="error-message">
      {{ errorMessage }}
    </span>

    <span v-else-if="hint" class="hint-text">
      {{ hint }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  modelValue: string;
  label?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  touched?: boolean;
  hint?: string;
  icon?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: "text",
  required: false,
  disabled: false,
  touched: false,
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "blur"): void;
}>();

const inputId = computed(() => (props.label ? `input-${props.label.toLowerCase().replace(/\s+/g, "-")}` : undefined));

const showError = computed(() => props.touched && !!props.error);
const errorMessage = computed(() => props.error || "");

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
}

function handleBlur() {
  emit("blur");
}
</script>

<style scoped>
.form-field {
  display: flex;
  flex-direction: column;
  gap: var(--gap-xs);
}

.field-label {
  font-size: var(--font-sm);
  font-weight: 600;
  color: var(--darkblue);
}

.required {
  color: var(--accent-error);
  margin-left: 2px;
}

.input-wrapper {
  position: relative;
}

.field-input {
  width: 100%;
  padding: var(--gap-sm) var(--gap-md);
  border: 2px solid var(--lightgray);
  border-radius: var(--radius-sm);
  font-size: var(--font-md);
  transition: border-color 0.2s;
  background: var(--white);
}

.field-input:focus {
  outline: none;
  border-color: var(--orange);
}

.field-input.has-error {
  border-color: var(--accent-error);
}

.field-input:disabled {
  background: var(--lightgray);
  cursor: not-allowed;
}

.input-icon {
  position: absolute;
  right: var(--gap-sm);
  top: 50%;
  transform: translateY(-50%);
  opacity: 0.5;
}

.error-message {
  font-size: var(--font-xs);
  color: var(--accent-error);
}

.hint-text {
  font-size: var(--font-xs);
  color: var(--gray);
}

/* Dark mode */
[data-theme="dark"] .field-label {
  color: var(--dark-text);
}

[data-theme="dark"] .field-input {
  background: var(--dark-surface);
  border-color: var(--dark-border);
  color: var(--dark-text);
}

[data-theme="dark"] .hint-text {
  color: var(--dark-text-secondary);
}
</style>
