import { useEffect } from 'react'
import useStore from '../store/useStore'
import { updateMobileThemeColor } from '../utils/mobileTheme'

export function useTheme() {
  const { theme, setTheme, toggleTheme } = useStore()

  useEffect(() => {
    // Initialize theme from localStorage or system preference
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    // Determine initial theme
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light')
    
    // Update store if different from current theme
    if (initialTheme !== theme) {
      setTheme(initialTheme)
    }
    
    // Ensure the theme is saved
    if (!savedTheme) {
      localStorage.setItem('theme', initialTheme)
    }
  }, []) // Run only once on mount

  useEffect(() => {
    // Update localStorage and document class when theme changes
    localStorage.setItem('theme', theme)
    
    // Update document class
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    
    // Update mobile theme colors
    updateMobileThemeColor(theme)
  }, [theme])

  return { theme, setTheme, toggleTheme }
}
