# Reusable Components

## BaseButton

Inheritable button component with variants and sizes.

### Usage

```vue
<template>
  <!-- Variants -->
  <BaseButton variant="primary">Primary</BaseButton>
  <BaseButton variant="secondary">Secondary</BaseButton>
  <BaseButton variant="outline">Outline</BaseButton>
  <BaseButton variant="ghost">Ghost</BaseButton>
  <BaseButton variant="danger">Danger</BaseButton>
  <BaseButton variant="success">Success</BaseButton>
  <BaseButton variant="warning">Warning</BaseButton>
  
  <!-- Sizes -->
  <BaseButton size="xs">Extra Small</BaseButton>
  <BaseButton size="sm">Small</BaseButton>
  <BaseButton size="md">Medium</BaseButton>
  <BaseButton size="lg">Large</BaseButton>
  
  <!-- States -->
  <BaseButton :is-loading="true">Loading</BaseButton>
  <BaseButton :is-disabled="true">Disabled</BaseButton>
  <BaseButton :is-full-width="true">Full Width</BaseButton>
  
  <!-- With Icon -->
  <BaseButton icon="✓">Save</BaseButton>
  <BaseButton icon="✕" :is-icon-only="true" />
  
  <!-- Events -->
  <BaseButton @click="handleClick">Click Me</BaseButton>
</template>

<script setup>
import BaseButton from '@/components/BaseButton.vue'
</script>
```

### CSS Classes (for non-Vue usage)

```html
<button class="btn btn--primary btn--md">Button</button>
<button class="btn btn--secondary btn--sm">Small</button>
<button class="btn btn--danger btn--lg is-loading">Loading</button>
```

---

## BaseCard

Inheritable card component with header, body, footer sections.

### Usage

```vue
<template>
  <!-- Basic -->
  <BaseCard title="Card Title" subtitle="Description">
    <p>Card content goes here</p>
  </BaseCard>
  
  <!-- With Image -->
  <BaseCard 
    title="Course Name" 
    image="/course.jpg"
    image-alt="Course"
  >
    <p>Course description</p>
  </BaseCard>
  
  <!-- Variants -->
  <BaseCard variant="flat">Flat border style</BaseCard>
  <BaseCard variant="elevated">More shadow</BaseCard>
  <BaseCard variant="interactive" :is-hoverable="true">Clickable</BaseCard>
  
  <!-- Sizes -->
  <BaseCard size="sm">Small padding</BaseCard>
  <BaseCard size="md">Medium padding (default)</BaseCard>
  <BaseCard size="lg">Large padding</BaseCard>
  
  <!-- Custom Header/Footer -->
  <BaseCard>
    <template #header>
      <h3>Custom Header</h3>
    </template>
    <p>Body content</p>
    <template #footer>
      <BaseButton variant="primary">Action</BaseButton>
    </template>
  </BaseCard>
  
  <!-- Header Actions -->
  <BaseCard title="Users">
    <template #header-actions>
      <BaseButton icon="+" :is-icon-only="true" />
    </template>
    <p>User list here</p>
  </BaseCard>
</template>

<script setup>
import BaseCard from '@/components/BaseCard.vue'
import BaseButton from '@/components/BaseButton.vue'
</script>
```

### CSS Classes (for non-Vue usage)

```html
<div class="card card--md">
  <div class="card__header">
    <h3 class="card__title">Title</h3>
  </div>
  <div class="card__body">Content</div>
  <div class="card__footer">Footer</div>
</div>

<!-- Stat Card -->
<div class="card card--stat">
  <div class="card__icon">📊</div>
  <div>
    <div class="card__value">100</div>
    <div class="card__label">Total</div>
  </div>
</div>
```

---

## Inheritance Pattern

Both components inherit styles from `src/styles/components.css`:

1. **Base styles** - `.btn`, `.card`
2. **Modifiers** - `.btn--primary`, `.btn--lg`, `.card--elevated`
3. **States** - `.is-loading`, `.is-disabled`

### Customizing

To create a custom button extending base:

```vue
<template>
  <BaseButton 
    variant="primary" 
    class="my-custom-btn"
    @click="$emit('click')"
  >
    <slot />
  </BaseButton>
</template>

<style scoped>
.my-custom-btn {
  /* Additional custom styles */
  text-transform: uppercase;
  letter-spacing: 1px;
}
</style>
```

Or use CSS classes directly:

```css
.my-action {
  /* Inherit base button */
  @extend .btn, .btn--primary, .btn--md;
  
  /* Custom styles */
  border-radius: 9999px;
}
```
