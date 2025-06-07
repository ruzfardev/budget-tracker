import { useEffect } from 'react'
import useStore from '../store/useStore'

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
    
    // Update theme-color meta tag for mobile status bar
    const themeColorMeta = document.getElementById('theme-color') as HTMLMetaElement
    const appleStatusBarMeta = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]') as HTMLMetaElement
    
    if (themeColorMeta) {
      themeColorMeta.content = theme === 'dark' ? '#111827' : '#faf5ff' // gray-900 : purple-50
    }
    
    if (appleStatusBarMeta) {
      appleStatusBarMeta.content = theme === 'dark' ? 'black' : 'default'
    }
  }, [theme])

  return { theme, setTheme, toggleTheme }
}
