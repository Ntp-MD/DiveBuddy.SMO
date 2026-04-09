<template>
  <div v-if="selectedCount > 0" class="bulk-action-bar">
    <div class="bulk-info">
      <span class="bulk-count">{{ selectedCount }}</span>
      <span class="bulk-label">items selected</span>
    </div>
    <div class="bulk-actions">
      <button
        v-for="action in actions"
        :key="action.id"
        @click="handleAction(action.id)"
        :class="['bulk-btn', action.class || '']"
        :title="action.label"
      >
        <span class="btn-icon">{{ action.icon }}</span>
        <span class="btn-label">{{ action.label }}</span>
      </button>
    </div>
    <button @click="clearSelection" class="bulk-clear">Clear</button>
  </div>
</template>

<script setup lang="ts">
interface BulkAction {
  id: string;
  label: string;
  icon: string;
  class?: string;
}

interface Props {
  selectedCount: number;
  actions: BulkAction[];
}

defineProps<Props>();

const emit = defineEmits<{
  (e: "action", id: string): void;
  (e: "clear"): void;
}>();

function handleAction(id: string) {
  emit("action", id);
}

function clearSelection() {
  emit("clear");
}
</script>

<style scoped>
.bulk-action-bar {
  display: flex;
  align-items: center;
  gap: var(--gap-md);
  padding: var(--gap-sm) var(--gap-md);
  background: var(--darkblue);
  color: var(--white);
  border-radius: var(--radius-sm);
  margin-bottom: var(--gap-md);
  animation: slideDown 0.2s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.bulk-info {
  display: flex;
  align-items: center;
  gap: var(--gap-xs);
}

.bulk-count {
  background: var(--orange);
  padding: 2px 8px;
  border-radius: 12px;
  font-weight: 700;
  font-size: var(--font-sm);
}

.bulk-label {
  font-size: var(--font-sm);
}

.bulk-actions {
  display: flex;
  gap: var(--gap-sm);
  flex: 1;
}

.bulk-btn {
  display: flex;
  align-items: center;
  gap: var(--gap-xs);
  padding: var(--gap-xs) var(--gap-sm);
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: var(--radius-xs);
  color: var(--white);
  cursor: pointer;
  font-size: var(--font-sm);
  transition: background 0.2s;
}

.bulk-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.bulk-btn.danger:hover {
  background: var(--accent-error);
}

.bulk-btn.success:hover {
  background: var(--accent-success);
}

.btn-icon {
  font-size: 14px;
}

.bulk-clear {
  padding: var(--gap-xs) var(--gap-sm);
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: var(--radius-xs);
  color: var(--white);
  cursor: pointer;
  font-size: var(--font-sm);
}

.bulk-clear:hover {
  background: rgba(255, 255, 255, 0.1);
}

/* Responsive */
@media (max-width: 640px) {
  .bulk-action-bar {
    flex-wrap: wrap;
    gap: var(--gap-sm);
    padding: var(--gap-sm);
  }

  .bulk-actions {
    flex: none;
    width: 100%;
    flex-wrap: wrap;
  }

  .btn-label {
    display: none;
  }

  .bulk-clear {
    margin-left: auto;
  }
}
</style>
