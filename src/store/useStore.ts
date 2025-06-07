import { create } from 'zustand'

interface AppState {
  // Theme state
  theme: 'light' | 'dark'
  setTheme: (theme: 'light' | 'dark') => void
  toggleTheme: () => void
  
  // Offline state
  isOffline: boolean
  setIsOffline: (isOffline: boolean) => void
}

const useStore = create<AppState>((set) => ({
  // Theme - Initialize from localStorage if available
  theme: (typeof window !== 'undefined' && localStorage.getItem('theme') as 'light' | 'dark') || 'light',
  setTheme: (theme) => set({ theme }),
  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
  
  // Offline
  isOffline: false,
  setIsOffline: (isOffline) => set({ isOffline }),
}))

export default useStore
