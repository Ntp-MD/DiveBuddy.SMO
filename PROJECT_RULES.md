# DiveBuddy.SMO Project Rules & Guidelines

## 🎯 Project Overview

Vue 3 + TypeScript diving website with courses, destinations, galleries, and fully responsive mobile navigation.

## 📁 Project Structure

```
src/
├── assets/          # Static assets (videos, unused images - 34.2MB)
├── components/      # Vue components (12 components)
├── styles/          # CSS files (global.css, main.css, reset.css)
├── App.vue          # Root component
├── main.ts          # Entry point
└── vite-env.d.ts   # Vite types
```

## 🎨 CSS Architecture Rules

### 1. **Reset.css First Principle**

- All form elements MUST use reset.css standards
- NEVER override reset.css unless absolutely necessary
- Reset.css provides: `margin: 0`, `padding: var(--gap-sm) var(--gap-md)`, `border: none`, `background: none`

### 2. **CSS Variables (MANDATORY)**

- ALWAYS use CSS variables: `--orange`, `--darkblue`, `--gap-xs`, `--font-sm`, `--radius-md`
- NEVER hard-code values when variables exist
- EXCEPTIONS: Transform translate, icon sizes, reset values
- Calculations: `calc(var(--gap-xs) * 1.5)` - ensure whole numbers

### 3. **Standard Patterns (MANDATORY)**

- **Form Inputs**: `border: 1px solid var(--lightgray)`
- **Focus States**: `box-shadow: 0 0 0 2px rgba(239, 108, 51, 0.1)`
- **Button Hover**: `transform: translateY(-2px)` + `box-shadow: 0 8px 20px var(--shadow-orange)`
- **Transitions**: `transition: all 0.3s ease`
- **Typography**: `font-weight: 500` (inputs), `600` (labels), `700` (headings)

### 4. **Advanced Grid System (3+ column layouts)**

```css
.component-grid {
  display: grid;
  gap: var(--gap-md);
  grid-template-columns: repeat(
    auto-fit,
    minmax(
      clamp(
        calc(100% / 4 - var(--gap-md)),
        (1200px - 100vw) * 999,
        clamp(calc(100% / 3 - var(--gap-md)), (992px - 100vw) * 999, clamp(calc(100% / 2 - var(--gap-md)), (480px - 100vw) * 999, 100%))
      ),
      1fr
    )
  );
}
```

- Breakpoints: Desktop (4 cols), Tablet (3 cols), Small Tablet (2 cols), Mobile (1 col)

### 5. **Mobile Navigation System**

- **Structure**: Direct `<a>` elements (no `<ul><li>` overhead)
- **Toggle**: Hamburger menu with smooth animations
- **Breakpoint**: `max-width: 1023px`
- **Sidebar**: Orange background, slide-in from right, full viewport height
- **Auto-close**: Menu closes when link clicked
- **Accessibility**: Proper ARIA labels and expanded states

### 6. **Accessibility (MANDATORY)**

- Semantic HTML5 elements and ARIA attributes
- Navigation: `role="navigation"`, `aria-label`, `role="menubar"`, `role="menuitem"`
- Buttons: `aria-label` for icon-only buttons
- Forms: `for`/`id` pairs, `aria-describedby`, `role="alert"`
- Images: `alt` attributes
- Keyboard: Visible focus styles with `:focus-visible`

## 🧩 Component Rules

### 1. **Naming & Structure**

- Files: PascalCase (`GallerySection.vue`)
- Classes: kebab-case (`.gallery-section`)
- TypeScript: PascalCase interfaces (`PricingPlan`)

### 2. **Component Template**

```vue
<template></template>
<script setup lang="ts"></script>
<style scoped></style>
```

### 3. **TypeScript Requirements**

- ALL components use `<script setup lang="ts">`
- Define interfaces for all data structures
- Proper typing for props, refs, computed properties

## 🎯 Design System

### 1. **Typography**

- `.section-title`: `var(--font-xl)`, `font-weight: 700`, `color: var(--darkblue)`
- `.section-subtitle`: `var(--font-md)`, `color: var(--gray)`, `max-width: 600px`

### 2. **Color System**

- Primary: `--orange` (CTA, highlights, mobile sidebar)
- Secondary: `--darkblue` (headers, important text)
- Text: `--deepblue` (body text)
- Neutral: `--gray`, `--lightgray` (subtle elements)

### 3. **Spacing**

- Use gap variables consistently
- Container padding: `var(--pad-container)`
- Section padding: `var(--pad-section)`

## 📱 Responsive Design

### 1. **Breakpoints**

- Mobile: `max-width: 480px`
- Tablet: `max-width: 768px`
- Mobile Navigation: `max-width: 1023px`
- Desktop: `max-width: 1024px`
- Large: `max-width: 1200px`

### 2. **Mobile-First Approach**

- Start with mobile styles
- Progressively enhance for larger screens
- Use CSS Grid with `repeat(auto-fit, minmax(...))`

## 🚀 Performance Rules

### 1. **Asset Optimization**

- Use appropriate formats (WebP for photos, SVG for icons)
- Lazy load images with `loading="lazy"`
- Compress all media files
- **CURRENT ISSUE**: 34.2MB unused images in `src/assets/image/`

### 2. **CSS Performance**

- ✅ **OPTIMIZED**: No unnecessary CSS declarations
- Avoid !important declarations
- Use efficient selectors
- ✅ **OPTIMIZED**: Direct `<a>` navigation (no `<ul><li>` overhead)

### 3. **Component Optimization**

- Use scoped styles
- Avoid inline styles
- Leverage CSS variables
- ✅ **BUILD STATUS**: Successful (1.36s)

## ✅ Quality Checklist

Before committing:

- [ ] No duplicate CSS properties
- [ ] All TypeScript interfaces defined
- [ ] Component styles scoped
- [ ] Responsive design works
- [ ] CSS variables used consistently
- [ ] ✅ No unused CSS classes (CLEANUP COMPLETED)
- [ ] Proper accessibility attributes
- [ ] Console clean of errors
- [ ] ✅ Performance acceptable (BUILD SUCCESSFUL)

## 🚫 Anti-Patterns

### AVOID:

- ❌ Overriding reset.css unnecessarily
- ❌ Hard-coded values instead of CSS variables
- ❌ Manual grid media queries (use clamp() system)
- ❌ Duplicate styles across components
- ❌ Inline styles in templates
- ❌ !important declarations
- ❌ Complex nested selectors
- ❌ Magic numbers in CSS
- ❌ Hard-coded colors
- ❌ Inconsistent transitions
- ❌ `<a>` elements for button actions
- ❌ Missing accessibility attributes
- ❌ ✅ Unused CSS classes (REMOVED ALL)
- ❌ ✅ Dead code (CLEANUP COMPLETED)

### PREFER:

- ✅ CSS custom properties
- ✅ Semantic HTML elements
- ✅ Consistent design patterns
- ✅ Clean, maintainable code
- ✅ ✅ CSS cleanup completed
- ✅ Responsive-first design
- ✅ Accessibility-first development
- ✅ ✅ Direct navigation elements

## 🧹 Current Status

### ✅ Completed:

- **CSS QUALITY**: Excellent - no unnecessary declarations
- **MOBILE NAVIGATION**: Fully implemented with hamburger menu
- **RESPONSIVE DESIGN**: Works on all breakpoints
- **PERFORMANCE**: Fast build times (1.36s)
- **DEPENDENCIES**: Clean and minimal
- **BUILD STATUS**: Successful

### ⚠️ Attention Needed:

- **ASSET CLEANUP**: Remove 34.2MB unused images
- **EMPTY DIRECTORIES**: Remove `src/assets/icon/`

### 📊 Asset Management:

- **USED**: `pov-on-bleach.mp4` (HeroSection)
- **UNUSED**: 6 JPG files (34.2MB total)
- **RECOMMENDATION**: Remove unused assets

---

**Last Updated**: March 2026  
**Maintainers**: DiveBuddy.SMO Development Team  
**Status**: ✅ CSS Optimized, ✅ Mobile Navigation Implemented, ⚠️ Asset Cleanup Needed
