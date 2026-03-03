# DiveBuddy.SMO Project Rules & Guidelines

## 🎯 Project Overview

DiveBuddy.SMO is a Vue 3 + TypeScript diving website showcasing courses, destinations, galleries, and booking information.

## 📁 Project Structure

```
src/
├── assets/          # Static assets (images, videos, icons)
├── components/      # Vue components
├── styles/          # CSS/SCSS files
│   ├── global.css   # Global styles & utilities
│   ├── main.css     # Main application styles
│   ├── reset.css    # Form element reset styles
│   └── variables.css # CSS custom properties
├── App.vue          # Root component
├── main.ts          # Application entry point
└── vite-env.d.ts   # Vite environment types
```

## 🎨 CSS Architecture Rules

### 1. **Reset.css First Principle**

- All form elements (input, textarea, select, button) MUST use reset.css standards
- NEVER override reset.css properties in components unless absolutely necessary
- Reset.css provides: `margin: 0`, `padding: var(--gap-sm) var(--gap-md)`, `border: none`, `background: none`, etc.

### 2. **Global.css for Common Styles**

- Section titles (`.section-title`, `.section-subtitle`) MUST be in global.css
- Utility classes (`.btn`, `.card`, `.container`) MUST be in global.css
- Component-specific styles stay in component files

### 3. **CSS Custom Properties (Variables)**

- ALWAYS use CSS variables for consistent theming
- Variables defined in `variables.css`:
  - Colors: `--orange`, `--darkblue`, `--deepblue`, `--gray`, etc.
  - Spacing: `--gap-xs`, `--gap-sm`, `--gap-md`, `--gap`, `--gap-lg`
  - Typography: `--font-xs`, `--font-sm`, `--font-md`, `--font-lg`, `--font-xl`
  - Border radius: `--radius-sm`, `--radius-md`, `--radius-lg`
- NEVER use hard-coded values when variables exist
- Use calculated values for consistent proportions: `calc(var(--gap-xs) * 1.5)` - ensure results are whole numbers
- **EXCEPTION**: Transform translate properties can use fixed px values (e.g., `transform: translateY(-2px)`, `transform: translateX(2px)`)
- **EXCEPTION**: Icon sizes can use fixed px values for consistent visual scaling (e.g., `width: 80px`, `font-size: 36px`)
- **BUTTON PADDING**: All buttons use standard padding from reset.css (`var(--gap-sm) var(--gap-md)` by default)
  - Use `.btn-sm`, `.btn-md`, `.btn-lg`, `.btn-xl` classes for different sizes
  - Default button size is medium (`var(--gap-sm) var(--gap-md)`)
  - **BUTTON ELEMENTS**: Use `<button>` elements for actions - they get reset.css padding automatically
  - **COMPONENT COLORS**: Each Vue component controls its own button colors/styling
  - **ANCHOR ELEMENTS**: Use `<a>` only for navigation links, not for button actions
  - Do not override button padding in components unless absolutely necessary
- **SPACING CONSISTENCY**: ALL gap, margin, and padding values must use CSS variables
  - No hard-coded pixel values for spacing (e.g., `gap: 32px` → `gap: var(--gap-lg)`)
  - Use calculated values for precise spacing: `calc(var(--gap-xs) * 0.5)`
  - Acceptable: `margin: 0`, `margin: 0 auto` (reset and centering values)

### 4. **Standard CSS Patterns (MANDATORY)**

- **Form Inputs**: `border: 1px solid var(--lightgray)` (use whole numbers)
- **Focus States**: `box-shadow: 0 0 0 2px rgba(239, 108, 51, 0.1)` (use whole numbers)
- **Button Hover**: `transform: translateY(-2px)` + `box-shadow: 0 8px 20px var(--shadow-orange)`
- **Transitions**: `transition: all 0.3s ease` (standard duration)
- **Typography**: `font-weight: 500` (inputs), `font-weight: 600` (labels/buttons), `font-weight: 700` (headings)
- **Error States**: Use `var(--orange)` for error colors, not hard-coded red

### 5. **Advanced Grid System (MANDATORY for 3+ column layouts)**

- **RESPONSIVE GRIDS**: Use `clamp()` with `auto-fit` for 3+ column layouts
- **NO MEDIA QUERIES**: Do not add manual grid breakpoints for responsive behavior
- **STANDARD PATTERN**:
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
- **COLUMN BREAKPOINTS**: Automatic based on viewport:
  - Desktop (1200px+): 4 columns
  - Tablet (992px-1199px): 3 columns
  - Small Tablet (480px-991px): 2 columns
  - Mobile (<480px): 1 column
- **APPLIES TO**: DestinationCards, PricingSection, CoursesSection, etc.

### 6. **Accessibility Standards (MANDATORY)**

- **SEMANTIC HTML**: Use proper HTML5 elements and ARIA attributes
- **NAVIGATION**:
  - `role="navigation"` and `aria-label` on main nav
  - `role="menubar"` and `role="menuitem"` on navigation menus
- **BUTTONS**:
  - `aria-label` for icon-only buttons
  - `aria-describedby` for button status messages
- **FORMS**:
  - `for` and `id` attributes for label-input pairs
  - `aria-describedby` for input help text
  - `role="alert"` and `aria-live` for error messages
- **IMAGES**: `alt` attributes for all images
- **KEYBOARD NAVIGATION**: Visible focus styles with `:focus-visible`
- **SKIP LINKS**: `href="#main-content"` with `.sr-only` class
- **MODALS**: `role="dialog"`, `aria-modal="true"`, `aria-labelledby`

### 7. **Component Style Organization**

```css
<style scoped>
/* 1. Layout & Container */
.component-name { }

/* 2. Child Elements */
.child-element { }

/* 3. Interactive States */
.element:hover { }
.element:focus { }

/* 4. Responsive Design */
@media (max-width: 768px) { }
</style>
```

## 🧩 Component Rules

### 1. **Naming Conventions**

- Component files: PascalCase (e.g., `GallerySection.vue`)
- CSS classes: kebab-case (e.g., `.gallery-section`)
- TypeScript interfaces: PascalCase (e.g., `PricingPlan`)

### 2. **Component Structure**

```vue
<template>
  <!-- Component HTML -->
</template>

<script setup lang="ts">
// TypeScript logic
</script>

<style scoped>
// Component-specific styles only
</style>
```

### 3. **TypeScript Requirements**

- ALL components MUST use `<script setup lang="ts">`
- Define interfaces for all data structures
- Use proper typing for props, refs, and computed properties

## 🎯 Design System Rules

### 1. **Typography Hierarchy**

- `.section-title`: `var(--font-xl)`, `font-weight: 700`, `color: var(--darkblue)`
- `.section-subtitle`: `var(--font-md)`, `color: var(--gray)`, `max-width: 600px`

### 2. **Button System**

- Base styles from reset.css + global.css `.btn` class
- Variants: `.btn-primary`, `.btn-secondary`, `.btn-outline`
- NEVER override padding in components (use reset.css standard)

### 3. **Spacing System**

- Use gap variables consistently
- Container padding: `var(--pad-container)`
- Section padding: `var(--pad-section)`

### 4. **Color System**

- Primary: `--orange` (CTA buttons, highlights)
- Secondary: `--darkblue` (headers, important text)
- Text: `--deepblue` (body text)
- Neutral: `--gray`, `--lightgray` (subtle elements)

## 📱 Responsive Design Rules

### 1. **Breakpoint System**

- Mobile: `max-width: 480px`
- Tablet: `max-width: 768px`
- Desktop: `max-width: 1024px`
- Large: `max-width: 1200px`

### 2. **Mobile-First Approach**

- Start with mobile styles
- Progressively enhance for larger screens
- Use `min-width` media queries for enhancement

### 3. **Grid System**

- Use CSS Grid for layouts
- Responsive grid templates using `repeat(auto-fit, minmax(...))`
- Consistent gap spacing using variables

## 🚀 Performance Rules

### 1. **Asset Optimization**

- Images: Use appropriate formats (WebP for photos, SVG for icons)
- Lazy load images when possible
- Compress all media files

### 2. **CSS Optimization**

- Avoid !important declarations
- Use efficient selectors
- Minimize CSS duplication

### 3. **Component Optimization**

- Use scoped styles to prevent conflicts
- Avoid inline styles
- Leverage CSS variables for theming

## 🔧 Development Rules

### 1. **Code Quality**

- Use TypeScript for all components
- Follow Vue 3 Composition API patterns
- Implement proper error handling

### 2. **File Organization**

- Group related components together
- Use descriptive file names
- Keep components focused and reusable

### 3. **Git Workflow**

- Use semantic commit messages
- Create feature branches for new functionality
- Test thoroughly before merging

## ✅ Quality Checklist

Before committing code, verify:

- [ ] No duplicate CSS properties (reset.css takes precedence)
- [ ] All TypeScript interfaces are properly defined
- [ ] Component styles are scoped
- [ ] Responsive design works on all breakpoints
- [ ] CSS variables are used consistently
- [ ] No unused CSS classes
- [ ] Proper accessibility attributes
- [ ] Console is clean of errors
- [ ] Performance is acceptable

## 🎨 UI/UX Guidelines

### 1. **Visual Hierarchy**

- Clear contrast between elements
- Consistent spacing throughout
- Readable typography at all sizes

### 2. **Interactive Elements**

- Clear hover states for all interactive elements
- Smooth transitions (0.3s ease)
- Accessible focus indicators

### 3. **Color Usage**

- Limited color palette for consistency
- Sufficient contrast ratios
- Meaningful color associations

## 🚫 Anti-Patterns

### AVOID:

- ❌ Overriding reset.css properties unnecessarily
- ❌ Hard-coded values instead of CSS variables (EXCEPT transform translate, icon sizes, and acceptable reset values)
- ❌ Manual grid media queries for 3+ column layouts (use advanced clamp() system)
- ❌ Duplicate styles across components
- ❌ Inline styles in templates
- ❌ !important declarations
- ❌ Complex nested selectors
- ❌ Magic numbers in CSS (like `64px`, `16px`, `2px`) - EXCEPT transform translate values, icon sizes, and acceptable reset values
- ❌ Hard-coded colors (like `#d95a24`, `#fee`, `#c33`)
- ❌ Inconsistent transition durations
- ❌ Different hover effects across components
- ❌ Using `<a>` elements for button actions instead of `<button>`
- ❌ Missing accessibility attributes (aria-label, alt, for/id, etc.)

### PREFER:

- ✅ CSS custom properties
- ✅ Utility classes from global.css
- ✅ Component-specific scoped styles
- ✅ Semantic HTML elements
- ✅ Responsive-first design
- ✅ Consistent naming conventions
- ✅ Accessibility-first development
- ✅ Performance optimization (lazy loading, efficient CSS)

## 🚀 Performance & Best Practices

### 1. **Image Optimization**

- **LAZY LOADING**: Use `loading="lazy"` on all images
- **LAZY STATES**: Add `.loading/.loaded` classes with opacity transitions
- **ERROR HANDLING**: Implement `@error` handlers for failed images
- **PERFORMANCE**: Optimize image sizes and formats

### 2. **CSS Performance**

- **EFFICIENT SELECTORS**: Avoid deep nesting and complex selectors
- **TRANSITIONS**: Use `transform` and `opacity` for better performance
- **REFLOWS**: Minimize layout changes during animations
- **VARIABLES**: Use CSS variables for better cache efficiency

### 3. **Component Architecture**

- **SCOPED STYLES**: Keep styles component-specific
- **NO DUPLICATION**: Avoid repeating the same styles across components
- **SEPARATION OF CONCERNS**: Structure (HTML), Presentation (CSS), Behavior (JS)
- **REUSABLE PATTERNS**: Use consistent patterns across similar components

## 📖 Resources

- [Vue 3 Documentation](https://vuejs.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [CSS Variables Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [Responsive Design Principles](https://web.dev/responsive/)

---

**Last Updated**: March 2026
**Maintainers**: DiveBuddy.SMO Development Team
