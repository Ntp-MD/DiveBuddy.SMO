# DiveBuddy.SMO

A modern, responsive landing page for a diving company built with Vue 3, TypeScript, and Vite.

## 🌐 Live Demo

**https://ntp-md.github.io/divebuddy-smo/**

## Features

- 🌊 Beautiful hero section with ocean imagery
- 🏝️ Popular dive destinations showcase
- 📚 Diving courses and packages
- 🖼️ Image gallery with lazy loading
- 📞 Contact form with validation
- 📱 Fully responsive design
- ⚡ Fast performance with Vite
- 🎨 Clean CSS with CSS variables
- 🔧 TypeScript support
- 📦 Path alias (@) configured
- ♿ Accessibility compliant (WCAG 2.1 AA)
- 🚀 Auto-deployment to GitHub Pages

## Tech Stack

- **Vue 3** - Progressive JavaScript framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Next generation frontend tooling
- **CSS Variables** - Consistent theming
- **GitHub Actions** - CI/CD deployment

## 🚀 Quick Start

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

### Deploy to GitHub Pages

```bash
# Automatic deployment (recommended)
git push origin main

# Manual deployment
npm run build-and-deploy
```

## 📦 Deployment

This project is automatically deployed to GitHub Pages using GitHub Actions:

- **Trigger**: Every push to `main` branch
- **Build**: Ubuntu runner with Node.js 18
- **Deploy**: Automatic deployment to GitHub Pages
- **URL**: https://ntp-md.github.io/divebuddy-smo/

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

## Project Structure

```
DiveBuddy.SMO/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment
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
│   │   ├── global.css
│   │   ├── main.css
│   │   ├── reset.css
│   │   └── variables.css
│   ├── App.vue
│   ├── main.ts
│   └── vite-env.d.ts
├── .github/workflows/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── README.md
├── PROJECT_RULES.md
└── DEPLOYMENT.md
```

## 🎨 Design System

The project uses a comprehensive CSS variable system:

### Colors

- Primary: `--orange`, `--darkblue`, `--deepblue`
- Neutral: `--white`, `--gray`, `--lightgray`, `--blackblue`

### Spacing

- Scale: `--gap-xs`, `--gap-sm`, `--gap-md`, `--gap`, `--gap-lg`
- Padding: `--pad-container`, `--pad-section`

### Typography

- Responsive: `--font-xs` to `--font-xl` using `clamp()`
- Weights: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

### Advanced Features

- **Responsive Grids**: `clamp()` with `auto-fit` for automatic breakpoints
- **Button System**: Consistent padding from reset.css
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support
- **Performance**: Lazy loading, optimized transitions

## 📋 Project Rules

This project follows strict development standards documented in [PROJECT_RULES.md](./PROJECT_RULES.md):

- ✅ 100% CSS variable usage
- ✅ Component-scoped styles
- ✅ Accessibility compliance
- ✅ Performance optimization
- ✅ Consistent naming conventions
- ✅ Advanced responsive patterns

## 🌊 Ocean Theme

The design reflects the diving industry with:

- **Ocean Blue**: Primary action colors
- **Coral Orange**: Accent and call-to-action
- **Wave Transitions**: Smooth hover effects
- **Bubble Animations**: Subtle micro-interactions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Vue.js team for the amazing framework
- Vite for the blazing fast build tool
- GitHub Pages for free hosting
- The diving community for inspiration

---

**Built with ❤️ for diving enthusiasts worldwide**
