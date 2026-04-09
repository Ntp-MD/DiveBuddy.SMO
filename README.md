# DiveBuddy.SMO - Full Stack Diving Platform

Professional diving courses and booking platform built with Vue 3, Vite, and Mock Backend.

## ✨ Features

### Core Business Systems

- ✅ **Booking System** - Complete course booking with schedules
- ✅ **Course Management** - PADI certified diving courses
- ✅ **User Authentication** - JWT-based auth with roles (admin, instructor, customer)
- ✅ **Admin Dashboard** - Manage bookings, courses, schedules, users
- 🔄 **Payment Integration** - Mock payment (ready for Stripe/Omise)
- 🔄 **Email Notifications** - Booking confirmations

### Operational Systems

- ✅ **Calendar/Schedule System** - View and manage course schedules
- 🔄 **Inventory Management** - Equipment tracking
- ✅ **Instructor Management** - Assign instructors to courses
- 🔄 **Customer Reviews** - Post-course reviews
- ✅ **Multi-language** - i18n ready (EN/TH)

## 🏗️ Architecture

### Tech Stack

- **Frontend**: Vue 3 + Composition API + TypeScript
- **Build Tool**: Vite
- **Styling**: CSS Variables (No Tailwind) + BEM naming
- **Backend**: Mock JSON server (ready for Node.js/Express + PostgreSQL)
- **Auth**: JWT (custom implementation)
- **i18n**: Vue I18n

### Project Structure

```
├── src/
│   ├── components/       # Vue components
│   │   ├── AdminDashboard.vue
│   │   ├── CoursesSection.vue
│   │   ├── Login.vue
│   │   ├── UserDashboard.vue
│   │   └── ...
│   ├── composables/      # Reusable logic
│   │   ├── useAuth.ts    # Authentication
│   │   ├── useBookings.ts # Booking management
│   │   ├── useCourses.ts  # Course data
│   │   └── usePayment.ts  # Payment processing
│   ├── server/           # Mock API (JSON-based)
│   │   ├── mock/
│   │   │   └── db.json   # Mock database
│   │   └── utils/
│   │       ├── auth.ts   # JWT implementation
│   │       └── mockDb.ts # Database operations
│   ├── i18n/
│   │   └── locales/      # EN/TH translations
│   ├── assets/
│   └── styles/
├── vite.config.ts
└── package.json
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

### Default Login Credentials

- **Admin**: `admin@divebuddy.com` / `password`
- **Customer**: `john@example.com` / `password`

## 📡 API Endpoints (Mock)

API endpoints are served via mock JSON files in `src/server/mock/`. For production, replace with Node.js/Express backend.

### Authentication

| Method | Endpoint             | Description       |
| ------ | -------------------- | ----------------- |
| POST   | `/api/auth/login`    | User login        |
| POST   | `/api/auth/register` | User registration |
| GET    | `/api/auth/me`       | Get current user  |

### Courses

| Method | Endpoint           | Description        |
| ------ | ------------------ | ------------------ |
| GET    | `/api/courses`     | List all courses   |
| GET    | `/api/courses/:id` | Get course details |

### Bookings

| Method | Endpoint        | Description        |
| ------ | --------------- | ------------------ |
| GET    | `/api/bookings` | List user bookings |
| POST   | `/api/bookings` | Create new booking |

### Schedules

| Method | Endpoint         | Description              |
| ------ | ---------------- | ------------------------ |
| GET    | `/api/schedules` | List available schedules |

## 🔄 Migration to Production

### Step 1: Database (PostgreSQL + Prisma)

```bash
# Install Prisma
npm install @prisma/client prisma

# Initialize
npx prisma init

# Update schema.prisma based on mock/db.json structure

# Migrate
npx prisma migrate dev
```

### Step 2: Update Database Layer

Replace `server/utils/mockDb.ts` with Prisma client:

```typescript
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
// Replace mock functions with Prisma queries
```

### Step 3: Payment Integration

Replace `composables/usePayment.ts` with real gateway:

```typescript
// Stripe example
import { loadStripe } from "@stripe/stripe-js";
const stripe = await loadStripe(process.env.STRIPE_PUBLIC_KEY);
```

### Step 4: Email Service

Add Nodemailer or SendGrid:

```bash
npm install @sendgrid/mail
```

### Step 5: File Storage

Replace base64 storage with Cloudinary/S3:

```bash
npm install cloudinary
```

## 📝 Database Schema (for PostgreSQL Migration)

See `server/mock/db.json` for complete data structure. Key entities:

- **Users** - Authentication, profiles, roles
- **Courses** - Course details, pricing, schedules
- **Bookings** - Reservations with payment status
- **Schedules** - Available course dates
- **Instructors** - Teacher assignments
- **Inventory** - Equipment management
- **Reviews** - Customer feedback

## 🎨 CSS Variables

See `src/styles/variables.css` for complete design tokens:

- Colors: `--darkblue`, `--orange`, `--deepblue`
- Spacing: `--gap-xs` to `--gap-xl` (using `clamp()`)
- Typography: `--font-xs` to `--font-xl`
- Shadows & Transitions: `--shadow-md`, `--transition-normal`

## 🧪 Testing

```bash
# Run the verify script
node server/verify-css.js

# Test API endpoints
npm run dev
curl http://localhost:3000/api/courses
```

## 📦 Deployment

### Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

### Self-hosted

```bash
npm run build
npm start
```

## 📄 License

MIT

## 🤝 Contributing

This is a mock implementation ready for production migration. All systems are designed to be swappable with real services.

---

**Status**: ✅ Mock systems complete | 🔄 Ready for production database
