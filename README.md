# DiveBuddy.SMO

A modern, responsive landing page for a diving company built with Vue 3, TypeScript, and Vite.

## Features

- 🌊 Beautiful hero section with ocean imagery
- 🏝️ Popular dive destinations showcase
- 📚 Diving courses and packages
- 🖼️ Image gallery
- 📞 Contact form
- 📱 Fully responsive design
- ⚡ Fast performance with Vite
- 🎨 Clean CSS with CSS variables
- 🔧 TypeScript support
- 📦 Path alias (@) configured

## Tech Stack

- **Vue 3** - Progressive JavaScript framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Next generation frontend tooling
- **CSS Variables** - Consistent theming

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
DiveBuddy.SMO/
├── src/
│   ├── components/
│   │   ├── NavBar.vue
│   │   ├── HeroSection.vue
│   │   ├── DestinationCards.vue
│   │   ├── CoursesSection.vue
│   │   ├── GallerySection.vue
│   │   ├── ContactSection.vue
│   │   └── FooterSection.vue
│   ├── styles/
│   │   └── global.css
│   ├── App.vue
│   ├── main.ts
│   └── vite-env.d.ts
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## CSS Variables

The project uses CSS variables for consistent theming:

- Colors: `--orange`, `--darkblue`, `--deepblue`, `--blackblue`, `--gray`, `--lightgray`, `--white`
- Spacing: `--gap`, `--gap2`, `--pad`
- Typography: Responsive font sizes using `clamp()`
- Border radius: `--border-radius`

## Path Alias

The `@` alias is configured to point to the `src` directory:

```typescript
import Component from '@/components/Component.vue'
```

## License

MIT
