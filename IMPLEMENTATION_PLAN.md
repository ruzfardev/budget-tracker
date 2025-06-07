# Budget Tracker PWA - Implementation Plan (React + Vite + TypeScript)

## Project Overview

A Progressive Web App (PWA) for personal budget tracking with offline capabilities, built with React, Vite, and TypeScript, featuring a modern minimalistic design with dark/light mode support.

## Core Features

### 1. Transaction Management

- Add income/expense transactions
- Edit and delete transactions
- Categorize transactions (Food, Transport, Entertainment, Bills, etc.)
- Add notes/descriptions to transactions
- Date tracking for each transaction

### 2. Budget Categories

- Create custom budget categories
- Set monthly budget limits per category
- Visual indicators for budget status (under/over budget)
- Category-wise spending analysis

### 3. Dashboard & Analytics

- Monthly overview with income vs expenses
- Category-wise spending breakdown (pie/donut chart)
- Monthly trends (line chart)
- Quick stats cards (total balance, monthly spending, etc.)

### 4. Offline Functionality

- Service Worker for offline access
- IndexedDB for local data storage
- Background sync for data synchronization
- Offline indicator in UI

### 5. PWA Features

- Installable app
- App manifest for native-like experience
- Push notifications for budget alerts (optional)
- Responsive design for all devices

## Technical Architecture

### Frontend Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **React Router** - Client-side routing
- **Zustand** - State management
- **React Query + IndexedDB** - Data persistence and caching
- **Chart.js + react-chartjs-2** - Data visualization
- **Workbox** - Service Worker management
- **React Hook Form** - Form handling
- **date-fns** - Date utilities

### UI Stlying

- **Tailwind CSS** for utility-first styling
- **Icons** Lucide icons for modern UI components
- **Dark Mode** support using CSS variables and Tailwind's dark mode feature
- **Responsive Design** using Tailwind's responsive utilities
- **Accessibility** considerations with ARIA roles and semantic HTML
- **Bento UI patterns** for consistent layout and design. Follow Bento UI principles for a clean, minimalistic design.
- **Responsive Design** using Tailwind's responsive utilities
- **Navigation** using React Router for client-side routing
- **Bottom Navigation Style** for mobile navigation (PLus item for adding new transactions)
- **Mobile-first Design** with Tailwind's responsive utilities

### File Structure

```
budget-tracker/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── public/
│   ├── manifest.json
│   ├── robots.txt
│   └── icons/
│       └── (Various PWA icons)
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── vite-env.d.ts
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Navigation.tsx
│   │   │   └── Layout.tsx
│   │   ├── dashboard/
│   │   │   ├── BalanceCard.tsx
│   │   │   ├── StatsCard.tsx
│   │   │   ├── RecentTransactions.tsx
│   │   │   └── SpendingChart.tsx
│   │   ├── transactions/
│   │   │   ├── TransactionForm.tsx
│   │   │   ├── TransactionList.tsx
│   │   │   └── TransactionItem.tsx
│   │   ├── categories/
│   │   │   ├── CategoryList.tsx
│   │   │   ├── CategoryForm.tsx
│   │   │   └── BudgetProgress.tsx
│   │   └── common/
│   │       ├── Button.tsx
│   │       ├── Modal.tsx
│   │       ├── Card.tsx
│   │       └── ThemeToggle.tsx
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   ├── Transactions.tsx
│   │   ├── Categories.tsx
│   │   └── Settings.tsx
│   ├── hooks/
│   │   ├── useTransactions.ts
│   │   ├── useCategories.ts
│   │   ├── useTheme.ts
│   │   └── useOffline.ts
│   ├── services/
│   │   ├── db.ts (IndexedDB setup)
│   │   ├── transactions.service.ts
│   │   └── categories.service.ts
│   ├── store/
│   │   ├── useStore.ts (Zustand store)
│   │   └── slices/
│   │       ├── transactionSlice.ts
│   │       └── categorySlice.ts
│   ├── types/
│   │   ├── transaction.types.ts
│   │   ├── category.types.ts
│   │   └── index.ts
│   ├── utils/
│   │   ├── constants.ts
│   │   ├── helpers.ts
│   │   └── formatters.ts
│   └── sw.ts (Service Worker)
└── .gitignore
```

### Type Definitions

#### Transaction Type

```typescript
interface Transaction {
  id: string
  type: 'income' | 'expense'
  amount: number
  categoryId: string
  description: string
  date: Date
  createdAt: Date
  updatedAt: Date
}
```

#### Category Type

```typescript
interface Category {
  id: string
  name: string
  budget: number // Monthly budget limit
  icon: string // Emoji or icon class
  color: string // For charts
  type: 'income' | 'expense'
}
```

#### Store State Type

```typescript
interface AppState {
  transactions: Transaction[]
  categories: Category[]
  theme: 'light' | 'dark'
  isOffline: boolean
  filters: {
    month: Date
    categoryId?: string
    type?: 'income' | 'expense'
  }
}
```

## Component Architecture

### Key Components

1. **App.tsx**

   - Router setup
   - Theme provider
   - Offline indicator
   - Global error boundary

2. **Layout Components**

   - Responsive navigation
   - Header with theme toggle
   - Mobile-friendly sidebar

3. **Dashboard Components**

   - BalanceCard: Current balance display
   - StatsCard: Quick statistics
   - SpendingChart: Monthly breakdown
   - RecentTransactions: Latest activity

4. **Transaction Components**

   - TransactionForm: Add/edit transactions
   - TransactionList: Filterable list
   - TransactionItem: Individual transaction

5. **Category Components**
   - CategoryList: All categories with budgets
   - CategoryForm: Add/edit categories
   - BudgetProgress: Visual budget indicators

## State Management Strategy

### Zustand Store Structure

```typescript
const useStore = create<AppState>((set, get) => ({
  // State
  transactions: [],
  categories: [],
  theme: 'light',
  isOffline: false,

  // Actions
  addTransaction: (transaction) => {...},
  updateTransaction: (id, updates) => {...},
  deleteTransaction: (id) => {...},
  // ... more actions
}));
```

### React Query for Data Persistence

- Queries for fetching data from IndexedDB
- Mutations for create/update/delete operations
- Optimistic updates for better UX
- Background refetching when online

## Development Phases

### Phase 1: Project Setup (Day 1) ✅

- [x] Initialize Vite + React + TypeScript project
- [x] Configure Tailwind CSS
- [x] Set up ESLint and Prettier
- [x] Create folder structure
- [x] Configure PWA plugins (vite-plugin-pwa)
- [x] Set up Zustand and React Query

### Phase 2: Core Infrastructure (Day 2) ✅

- [x] Implement IndexedDB service with Dexie
- [x] Create TypeScript interfaces
- [x] Set up React Router
- [x] Build layout components
- [x] Implement theme system
- [x] Create transaction and category services with React Query hooks
- [x] Set up offline detection with indicator
- [x] Initialize database with default categories

### Phase 3: Transaction Management (Day 3-4) ✅ [UPDATED v2]

- [x] Create transaction services
- [x] Build transaction components
- [x] Implement CRUD operations (Create done, Update/Delete pending)
- [x] Add custom numeric keyboard for amount input
- [x] Create transaction filters
- [x] Connect Dashboard and Transactions pages to real data
- [x] Add transaction form with categories and date (removed description field)
- [x] Modified add transaction page to be all-in-one with always visible keyboard
- [x] Fixed database ID types (changed from string to number for Dexie compatibility)
- [x] Added test data utilities for development
- [x] Moved Save button to numeric keyboard (replaced Clear button)
- [x] Removed description field from UI

### Phase 4: Category System (Day 5)

- [ ] Build category components
- [ ] Implement budget tracking
- [ ] Create category services
- [ ] Add budget visualizations

### Phase 5: Dashboard & Analytics (Day 6)

- [ ] Integrate Chart.js
- [ ] Build dashboard components
- [ ] Create data aggregation hooks
- [ ] Implement responsive charts

### Phase 6: PWA Features (Day 7)

- [ ] Configure Workbox
- [ ] Implement offline detection
- [ ] Set up background sync
- [ ] Test installation flow

### Phase 7: Polish & Optimization (Day 8)

- [ ] Code splitting
- [ ] Performance optimization
- [ ] Accessibility improvements
- [ ] Cross-browser testing

## Key Implementation Details

### Service Worker Configuration (Vite PWA)

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
            },
          },
        ],
      },
    }),
  ],
})
```

### Theme Implementation

```typescript
// Custom hook for theme management
const useTheme = () => {
  const [theme, setTheme] = useStore((state) => [state.theme, state.setTheme])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return { theme, toggleTheme }
}
```

### Offline Data Sync

```typescript
// React Query configuration for offline support
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      networkMode: 'offlineFirst',
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
    },
    mutations: {
      networkMode: 'offlineFirst',
    },
  },
})
```

---

This plan leverages React's component model, TypeScript's type safety, and modern tooling to create a robust, maintainable budget tracker PWA with excellent developer experience and user experience.
