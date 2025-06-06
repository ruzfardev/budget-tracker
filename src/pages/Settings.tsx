import { useEffect } from 'react'
import { Card } from '../components/common'
import {
  Moon,
  Sun,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
  ChevronRight,
  Palette,
  Globe,
  Smartphone,
} from 'lucide-react'
import useStore from '../store/useStore'

const Settings = () => {
  const { theme, toggleTheme } = useStore()

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  const settingsSections = [
    {
      title: 'Appearance',
      items: [
        {
          icon: theme === 'dark' ? Sun : Moon,
          title: 'Theme',
          subtitle: theme === 'dark' ? 'Dark mode' : 'Light mode',
          action: toggleTheme,
          showToggle: true,
          isActive: theme === 'dark',
        },
        {
          icon: Palette,
          title: 'Accent Color',
          subtitle: 'Choose your preferred color',
          action: () => console.log('Color picker'),
        },
      ],
    },
    {
      title: 'Preferences',
      items: [
        {
          icon: Bell,
          title: 'Notifications',
          subtitle: 'Manage your notifications',
          action: () => console.log('Notifications'),
        },
        {
          icon: Globe,
          title: 'Language',
          subtitle: 'English',
          action: () => console.log('Language'),
        },
        {
          icon: Smartphone,
          title: 'Offline Mode',
          subtitle: 'Download data for offline use',
          action: () => console.log('Offline'),
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          icon: Shield,
          title: 'Privacy Policy',
          subtitle: 'Review our privacy policy',
          action: () => console.log('Privacy'),
        },
        {
          icon: HelpCircle,
          title: 'Help & Support',
          subtitle: 'Get help and contact support',
          action: () => console.log('Help'),
        },
      ],
    },
  ]

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Profile</h1>

      {/* User Profile Card */}
      <Card className="mb-6 p-4">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
            JD
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              John Doe
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              john.doe@example.com
            </p>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>
      </Card>

      {/* Settings Sections */}
      {settingsSections.map((section, index) => (
        <div key={index} className="mb-6">
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 px-2">
            {section.title}
          </h3>
          <Card className="p-0 overflow-hidden">
            {section.items.map((item, itemIndex) => {
              const Icon = item.icon
              return (
                <button
                  key={itemIndex}
                  onClick={item.action}
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700 last:border-0"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-2 rounded-lg ${
                        item.title === 'Theme'
                          ? 'bg-primary-100 dark:bg-primary-900/30'
                          : 'bg-gray-100 dark:bg-gray-700/50'
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 ${
                          item.title === 'Theme'
                            ? 'text-primary-600 dark:text-primary-400'
                            : 'text-gray-600 dark:text-gray-400'
                        }`}
                      />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-gray-800 dark:text-white">
                        {item.title}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                  {item.showToggle ? (
                    <div className="relative">
                      <div
                        className={`w-12 h-6 rounded-full ${
                          item.isActive
                            ? 'bg-primary-600'
                            : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                      >
                        <div
                          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow ${
                            item.isActive ? 'translate-x-6' : ''
                          }`}
                        />
                      </div>
                    </div>
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              )
            })}
          </Card>
        </div>
      ))}

      {/* Sign Out Button */}
      <Card className="p-0 overflow-hidden">
        <button className="w-full flex items-center justify-center space-x-2 p-4 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Sign Out</span>
        </button>
      </Card>

      {/* App Version */}
      <p className="text-center text-sm text-gray-400 dark:text-gray-500 mt-6">
        Version 1.0.0
      </p>
    </div>
  )
}

export default Settings
