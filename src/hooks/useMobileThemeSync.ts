import { useEffect } from 'react'
import { isPWA, isMobileDevice, updateMobileThemeColor } from '../utils/mobileTheme'
import useStore from '../store/useStore'

export function useMobileThemeSync() {
  const { theme } = useStore()

  useEffect(() => {
    // Only run on mobile devices
    if (!isMobileDevice()) return

    // Initial theme color update
    updateMobileThemeColor(theme)

    // Handle visibility changes (when app comes back to foreground)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        updateMobileThemeColor(theme)
      }
    }

    // Handle online/offline events
    const handleOnline = () => {
      updateMobileThemeColor(theme)
    }

    // PWA-specific handling
    if (isPWA()) {
      // Force update theme color after a delay (for iOS PWA)
      setTimeout(() => {
        updateMobileThemeColor(theme)
      }, 100)

      // Update on orientation change
      const handleOrientationChange = () => {
        setTimeout(() => {
          updateMobileThemeColor(theme)
        }, 300)
      }

      window.addEventListener('orientationchange', handleOrientationChange)
      
      // Cleanup
      return () => {
        window.removeEventListener('orientationchange', handleOrientationChange)
        document.removeEventListener('visibilitychange', handleVisibilityChange)
        window.removeEventListener('online', handleOnline)
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('online', handleOnline)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('online', handleOnline)
    }
  }, [theme])
}
