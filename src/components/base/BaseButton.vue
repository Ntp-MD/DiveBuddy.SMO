<template>
  <button :type="type" :class="buttonClasses" :disabled="isDisabled || isLoading" @click="handleClick">
    <span v-if="isLoading" class="btn__spinner"></span>
    <span v-else-if="icon" class="btn__icon">{{ icon }}</span>
    <span v-if="$slots.default" class="btn__text">
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger" | "success" | "warning";
type ButtonSize = "xs" | "sm" | "md" | "lg";

interface Props {
  type?: "button" | "submit" | "reset";
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  isFullWidth?: boolean;
  isIconOnly?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: "button",
  variant: "primary",
  size: "md",
  isDisabled: false,
  isLoading: false,
  isFullWidth: false,
  isIconOnly: false,
});

const emit = defineEmits<{
  (e: "click", event: MouseEvent): void;
}>();

const buttonClasses = computed(() => {
  return [
    "btn",
    `btn-${props.variant}`,
    `btn-${props.size}`,
    {
      "btn-full": props.isFullWidth,
      "btn-icon-only": props.isIconOnly,
      "is-loading": props.isLoading,
      "is-disabled": props.isDisabled,
    },
  ];
});

function handleClick(event: MouseEvent) {
  if (!props.isDisabled && !props.isLoading) {
    emit("click", event);
  }
}
</script>

<style scoped>
.btn__spinner {
  width: 1em;
  height: 1em;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: spin 0.75s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
