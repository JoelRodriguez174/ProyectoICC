# Project Overview: Iglesia Casa del Alfarero (ProyectoICCVM)

A modern, high-impact web application for "Iglesia Casa del Alfarero" (Potter's House Church), designed with a clean, "Door Church" aesthetic. The project focuses on high visual impact, bold typography, and smooth animations to provide an engaging experience for both current members and new visitors.

## Tech Stack
- **Frontend Framework:** React 18 (Vite-based)
- **Styling:** Tailwind CSS with PostCSS
- **State Management:** Zustand (for UI state and ministry data)
- **Routing:** React Router DOM v6
- **Icons:** Lucide React
- **Forms:** React Hook Form

## Project Structure
- `src/components/`: Organized by Atomic Design principles (mostly).
    - `atoms/`: Smallest functional units (e.g., `Logo.jsx`).
    - `molecules/`: Simple combinations of atoms (e.g., `Chatbot.jsx`, `ChurchMap.jsx`, `InfoCard.jsx`).
    - `layout/`: Global layout components like `Header.jsx` and `Footer.jsx`.
    - `sections/`: Large page sections, primarily for the Home page (e.g., `Hero.jsx`, `Vision.jsx`).
- `src/pages/`: Top-level page components (Home, Ministerios, Contacto, TestingPage).
- `src/store/`: Zustand store (`useStore.js`) for global state management.
- `src/routes.jsx`: Centralized route definitions.

## Building and Running

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Linting
```bash
npm run lint
```

### Preview Build
```bash
npm run preview
```

## Development Conventions

### Styling Patterns
- **Tailwind Layers:** Custom components and base styles are defined in `src/index.css` using `@layer base` and `@layer components`.
- **Naming:** Follows a "door" style suffix for custom button classes (e.g., `.btn-primary-door`, `.btn-outline-door`).
- **Animations:** Uses a custom `.reveal` class combined with `.reveal-active` for scroll-triggered animations.
- **Visual Style:** High contrast (Black & White), bold typography (uppercase, tracking-tighter), and grayscale images with hover transitions.

### Component Guidelines
- **Functional Components:** Always use functional components with arrow function syntax where appropriate.
- **Prop Types:** While not strictly enforced by TypeScript (this is a JS project), ensure props are clearly passed and documented via comments if complex.
- **Responsive Design:** Mobile-first approach using Tailwind's responsive prefixes (`sm:`, `md:`, `lg:`, etc.).

### State Management
- Use the Zustand store in `src/store/useStore.js` for global UI state (like menu toggles) or shared data (like ministry lists).
- Keep local component state for UI-only logic using `useState`.

### Icons
- Use `lucide-react` for all iconography to maintain consistency.

## TODO / Future Improvements
- [ ] Implement robust error boundaries.
- [ ] Add unit and integration tests (none currently detected).
- [ ] Optimize image loading and assets.
- [ ] Enhance SEO with React Helmet or similar.
