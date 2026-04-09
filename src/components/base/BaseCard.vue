<template>
  <div :class="cardClasses">
    <!-- Card Header -->
    <div v-if="$slots.header || title" class="card-header">
      <div class="card-header-content">
        <h3 v-if="title" class="card-title">{{ title }}</h3>
        <p v-if="subtitle" class="card-subtitle">{{ subtitle }}</p>
        <slot name="header" />
      </div>
      <div v-if="$slots['header-actions']" class="card-header-actions">
        <slot name="header-actions" />
      </div>
    </div>

    <!-- Card Media -->
    <div v-if="image || $slots.media" class="card-media-wrapper">
      <img v-if="image" :src="image" :alt="imageAlt" class="card-media" />
      <slot name="media" />
    </div>

    <!-- Card Body -->
    <div class="card-body">
      <slot />
    </div>

    <!-- Card Footer -->
    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

type CardVariant = "default" | "flat" | "elevated" | "interactive";
type CardSize = "sm" | "md" | "lg";

interface Props {
  title?: string;
  subtitle?: string;
  image?: string;
  imageAlt?: string;
  variant?: CardVariant;
  size?: CardSize;
  isHoverable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  imageAlt: "",
  variant: "default",
  size: "md",
  isHoverable: false,
});

const cardClasses = computed(() => {
  return [
    "card",
    `card-${props.variant}`,
    `card-${props.size}`,
    {
      "card-interactive": props.isHoverable || props.variant === "interactive",
    },
  ];
});
</script>

<style scoped>
.card-header-content {
  flex: 1;
}

.card-header-actions {
  display: flex;
  gap: var(--gap-xs);
}

.card-media-wrapper {
  overflow: hidden;
}
</style>
