# Budget Tracker PWA

A Progressive Web App for personal budget tracking with offline capabilities.

## Phase 1 - Basic Setup ✅

This is the initial setup phase with:
- Vite + React + TypeScript configuration
- Tailwind CSS for styling with glassmorphic design
- React Router for navigation
- Basic page structure (Home, History, Budget, Profile)
- PWA configuration with vite-plugin-pwa
- Zustand store setup
- React Query configuration
- Dark mode support (toggle in Profile/Settings page)
- Mobile-first responsive design
- Modern bottom navigation with floating add button
- No header on mobile for cleaner UI
- Settings page with theme toggle and modern UI

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Navigation.tsx
│   │   └── Layout.tsx
│   └── common/
│       └── Card.tsx
├── pages/
│   ├── Dashboard.tsx
│   ├── Transactions.tsx
│   ├── Categories.tsx
│   └── Settings.tsx
├── store/
│   └── useStore.ts
├── types/
│   └── index.ts
├── App.tsx
├── main.tsx
└── index.css
```

## Next Steps

- Phase 2: Core Infrastructure (IndexedDB, services, etc.)
- Phase 3: Transaction Management
- Phase 4: Category System
- Phase 5: Dashboard & Analytics
- Phase 6: PWA Features
- Phase 7: Polish & Optimization
