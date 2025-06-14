import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Layout from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import Categories from './pages/Categories'
import Settings from './pages/Settings'
import AddTransaction from './pages/AddTransaction'
import ThemeDebug from './pages/ThemeDebug'
import { useTheme, useOffline } from './hooks'
import { useMobileThemeSync } from './hooks/useMobileThemeSync'

// Create a client with offline support
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
      networkMode: 'offlineFirst',
    },
    mutations: {
      networkMode: 'offlineFirst',
    },
  },
})

function App() {
  // Initialize theme and offline detection
  useTheme()
  useOffline()
  useMobileThemeSync() // Sync theme colors on mobile

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="categories" element={<Categories />} />
            <Route path="settings" element={<Settings />} />
            <Route path="/theme-debug" element={<ThemeDebug />} />
          </Route>
          <Route path="/add-transaction" element={<AddTransaction />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
