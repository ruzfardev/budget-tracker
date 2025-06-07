export function updateMobileThemeColor(theme: 'light' | 'dark') {
  const isDark = theme === 'dark'
  const themeColor = isDark ? '#1e3a8a' : '#3b82f6' // primary-900 : primary-500
  
  // Remove all existing theme-color meta tags first
  const existingThemeColors = document.querySelectorAll('meta[name="theme-color"]')
  existingThemeColors.forEach(meta => meta.remove())
  
  // Create new theme-color meta tag
  const newThemeColor = document.createElement('meta')
  newThemeColor.name = 'theme-color'
  newThemeColor.content = themeColor
  newThemeColor.id = 'theme-color'
  document.head.appendChild(newThemeColor)
  
  // Update all other theme color meta tags
  const metaTags = [
    { name: 'msapplication-navbutton-color', content: themeColor },
    { name: 'msapplication-TileColor', content: themeColor },
  ]
  
  metaTags.forEach(({ name, content }) => {
    let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement
    
    if (!meta) {
      meta = document.createElement('meta')
      meta.name = name
      document.head.appendChild(meta)
    }
    
    meta.content = content
  })
  
  // Update Apple-specific meta tag
  let appleStatusBar = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]') as HTMLMetaElement
  if (!appleStatusBar) {
    appleStatusBar = document.createElement('meta')
    appleStatusBar.name = 'apple-mobile-web-app-status-bar-style'
    document.head.appendChild(appleStatusBar)
  }
  appleStatusBar.content = isDark ? 'black-translucent' : 'default'
  
  // Additional mobile-specific updates
  if (window.matchMedia('(display-mode: standalone)').matches) {
    // App is running as PWA
    
    // Force update by changing and restoring the theme color
    setTimeout(() => {
      const tempColor = isDark ? '#000000' : '#ffffff'
      newThemeColor.content = tempColor
      
      setTimeout(() => {
        newThemeColor.content = themeColor
      }, 50)
    }, 10)
  }
  
  // iOS specific: Update status bar for PWA
  if ('standalone' in window.navigator && (window.navigator as any).standalone) {
    // Running as iOS PWA
    document.documentElement.style.setProperty('--status-bar-style', isDark ? 'light-content' : 'dark-content')
    
    // iOS specific hack to force status bar update
    window.scrollTo(0, 1)
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 0)
  }
  
  // Android Chrome specific
  if (navigator.userAgent.includes('Chrome') && navigator.userAgent.includes('Android')) {
    // Force a layout recalculation
    document.documentElement.style.display = 'none'
    document.documentElement.offsetHeight
    document.documentElement.style.display = ''
  }
}

// Check if the app is running on mobile
export function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

// Check if running as PWA
export function isPWA() {
  return window.matchMedia('(display-mode: standalone)').matches ||
         ('standalone' in window.navigator && (window.navigator as any).standalone) ||
         document.referrer.includes('android-app://')
}
