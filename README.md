# 🛒 TechSphere

**TechSphere** is an e-commerce web application for selling computer parts, bundles, and IoT devices. Built with **React**, **TypeScript**, **Vite**.

---

## 📁 Project Structure

```
tech-sphere/
├── public/                 # Static files served at root
├── src/
│   ├── assets/             # Images, icons, fonts
│   ├── components/         # Reusable UI components
│   │   ├── layout/         # Header, Footer, etc.
│   │   └── ui/             # Buttons, inputs, etc.
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utilities, API services
│   ├── pages/              # Route-based pages (Home, Products, Cart)
│   ├── routes/             # React Router setup
│   ├── types/              # TypeScript types & interfaces
│   ├── App.tsx             # Root component with layout wrapper
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles
├── tsconfig.json
├── vite.config.ts
├── README.md
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/tech-sphere.git
cd tech-sphere

# Install dependencies
npm install
# or
yarn install
```

### Start Development Server

```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📦 Available Scripts

- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npm run preview` – Preview production build
- `npm run lint` – Run ESLint
- `npm run format` – Format code using Prettier

---

## 🔧 Tech Stack

- **React** + **TypeScript**
- **Vite** for fast builds
- **React Router DOM** for routing
- **Tailwind CSS** (optional but recommended)
- **Zustand** or **Redux Toolkit** (for future state management)
- **Axios** for API requests

---

## 📚 Development Workflow

### Routing Convention

- All page-level components go into `src/pages`
- Route definitions are centralized in `src/routes/index.tsx`
- Shared layouts (e.g., header/footer) go in `components/layout/`

### Component Guidelines

- UI elements (buttons, cards) → `components/ui/`
- Layout components (navbar, sidebar) → `components/layout/`
- Keep components pure and focused. Extract logic into hooks if needed.

### Type Safety

- Shared types live in `src/types/`
- Use interfaces/types consistently for props and API models

---

## 🧠 Best Practices

- ✅ Use functional components and React Hooks
- ✅ Use `tsx` for all components
- ✅ Avoid prop drilling — use state management or context if needed
- ✅ Keep UI components dumb/presentational
- ✅ Co-locate component styles when using CSS Modules (if not using Tailwind)
- ✅ Commit atomic changes with clear messages

---

## 🔮 Future Enhancements

As the app grows, here are plans to keep in mind:

### 1. **State Management**

- Introduce **Zustand** or **Redux Toolkit** for global state (cart, user session, etc.)

### 2. **Authentication & Admin Panel**

- Add **Firebase Auth** or **JWT-based auth**
- Role-based admin panel (dashboard for managing products/orders)

### 3. **API Layer**

- Modular API layer (`lib/api`) with Axios
- Use React Query or TanStack Query for async state

### 4. **Mobile Responsiveness**

- Use Tailwind + responsive design
- Add mobile menu drawer

### 5. **Performance & SEO**

- Lazy load images
- Use Vite plugins for PWA support
- Add meta tags dynamically per route

### 6. **CI/CD & Deployment**

- Deploy to **Vercel**, **Netlify**, or **Firebase Hosting**
- Add **GitHub Actions** for lint/test/deploy

---

## 🤝 Collaboration Guidelines

### Branching Strategy

- `main` → stable, production-ready
- `dev` → integration branch
- Feature branches: `feature/<name>`
- Bugfix branches: `fix/<name>`

### Code Standards

- Follow ESLint & Prettier formatting rules
- Use meaningful commits:  
  - `feat: add product carousel`
  - `fix: resolve cart update bug`
  - `refactor: clean up navbar logic`

### Pull Requests

- Target `dev` branch
- Include description, screenshots (if applicable), and checklist
- Get at least 1 review before merging

