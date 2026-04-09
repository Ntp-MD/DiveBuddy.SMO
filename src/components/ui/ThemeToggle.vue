<template>
  <button @click="toggleTheme" class="theme-toggle" :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'">
    <span class="toggle-icon">{{ isDark ? "☀️" : "🌙" }}</span>
    <span class="toggle-text">{{ isDark ? "Light" : "Dark" }}</span>
  </button>
</template>

<script setup lang="ts">
import { useTheme } from "../../composables/useTheme";

const { toggleTheme, isDark } = useTheme();
</script>

<style scoped>
.theme-toggle {
  display: flex;
  align-items: center;
  gap: var(--gap-xs);
  padding: var(--gap-xs) var(--gap-sm);
  background: transparent;
  border: 1px solid var(--gray);
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-size: var(--font-sm);
  color: var(--darkblue);
  transition: all 0.2s;
}

.theme-toggle:hover {
  background: var(--lightgray);
}

.toggle-icon {
  font-size: var(--font-sm);
}

.toggle-text {
  font-weight: 500;
}

/* Dark mode styles */
[data-theme="dark"] .theme-toggle {
  color: var(--dark-text);
  border-color: var(--dark-text-secondary);
}

[data-theme="dark"] .theme-toggle:hover {
  background: var(--dark-surface);
}
</style>
