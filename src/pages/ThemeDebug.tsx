import useStore from '../store/useStore'
import { Card } from '../components/common'
import { isPWA, isMobileDevice } from '../utils/mobileTheme'

const ThemeDebug = () => {
  const { theme } = useStore()
  
  // Get all theme-related meta tags
  const getMetaTagValue = (name: string) => {
    const meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement
    return meta?.content || 'Not found'
  }
  
  const debugInfo = {
    'Current Theme': theme,
    'Is Mobile': isMobileDevice() ? 'Yes' : 'No',
    'Is PWA': isPWA() ? 'Yes' : 'No',
    'theme-color': getMetaTagValue('theme-color'),
    'msapplication-navbutton-color': getMetaTagValue('msapplication-navbutton-color'),
    'apple-mobile-web-app-status-bar-style': getMetaTagValue('apple-mobile-web-app-status-bar-style'),
    'User Agent': navigator.userAgent,
    'Display Mode': window.matchMedia('(display-mode: standalone)').matches ? 'Standalone' : 'Browser',
  }
  
  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Theme Debug Info</h2>
        <div className="space-y-3">
          {Object.entries(debugInfo).map(([key, value]) => (
            <div key={key} className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-200 dark:border-gray-700">
              <span className="font-medium text-gray-600 dark:text-gray-400">{key}:</span>
              <span className="text-sm text-gray-800 dark:text-gray-200 break-all">{value}</span>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">Color Preview</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="w-full h-20 bg-primary-500 rounded-lg mb-2"></div>
              <p className="text-sm">Primary 500: #3b82f6</p>
            </div>
            <div className="text-center">
              <div className="w-full h-20 bg-primary-900 rounded-lg mb-2"></div>
              <p className="text-sm">Primary 900: #1e3a8a</p>
            </div>
          </div>
        </div>
        
        <button
          onClick={() => window.location.reload()}
          className="mt-6 w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          Refresh Page
        </button>
      </Card>
    </div>
  )
}

export default ThemeDebug
