import { NavLink } from 'react-router-dom'
import { Home, Clock, Wallet2, User, Plus } from 'lucide-react'

const Navigation = () => {
  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/transactions', icon: Clock, label: 'History' },
    { path: '/categories', icon: Wallet2, label: 'Budget' },
    { path: '/settings', icon: User, label: 'Profile' },
  ]

  const leftItems = navItems.slice(0, 2)
  const rightItems = navItems.slice(2)

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50">
        <div className="mobile-nav relative">
          <div className="px-2 pt-4 pb-3">
            <div className="flex items-center justify-between relative">
              {/* Left side items */}
              <div className="flex flex-1 justify-around mr-8">
                {leftItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <NavLink key={item.path} to={item.path} className="group">
                      {({ isActive }) => (
                        <div className="flex flex-col items-center py-1 px-3 min-w-[64px]">
                          <Icon
                            className={`w-6 h-6 mb-1 ${
                              isActive
                                ? 'text-primary-600 dark:text-primary-400'
                                : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-400'
                            }`}
                            strokeWidth={isActive ? 2.5 : 2}
                          />
                          <span
                            className={`text-xs font-medium ${
                              isActive
                                ? 'text-primary-600 dark:text-primary-400'
                                : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300'
                            }`}
                          >
                            {item.label}
                          </span>
                        </div>
                      )}
                    </NavLink>
                  )
                })}
              </div>

              {/* Center Plus Button - Positioned absolutely */}
              <button
                className="plus-button absolute left-1/2 -translate-x-1/2 -top-2 bg-primary-600 dark:bg-primary-500 text-white p-3.5 rounded-full hover:bg-primary-700 dark:hover:bg-primary-600 transform hover:scale-105 active:scale-95 z-20"
                onClick={() => console.log('Add transaction clicked')}
              >
                <Plus className="w-7 h-7" strokeWidth={2.5} />
              </button>

              {/* Right side items */}
              <div className="flex flex-1 justify-around ml-8">
                {rightItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <NavLink key={item.path} to={item.path} className="group">
                      {({ isActive }) => (
                        <div className="flex flex-col items-center py-1 px-3 min-w-[64px]">
                          <Icon
                            className={`w-6 h-6 mb-1 ${
                              isActive
                                ? 'text-primary-600 dark:text-primary-400'
                                : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-400'
                            }`}
                            strokeWidth={isActive ? 2.5 : 2}
                          />
                          <span
                            className={`text-xs font-medium ${
                              isActive
                                ? 'text-primary-600 dark:text-primary-400'
                                : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300'
                            }`}
                          >
                            {item.label}
                          </span>
                        </div>
                      )}
                    </NavLink>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Desktop Side Navigation */}
      <nav className="hidden md:block w-64 bg-white dark:bg-gray-800 h-full border-r border-gray-200 dark:border-gray-700">
        <div className="p-4 space-y-2">
          {/* Add Transaction Button for Desktop */}
          <button
            className="w-full mb-4 bg-primary-600 dark:bg-primary-500 text-white p-3 rounded-lg shadow hover:bg-primary-700 dark:hover:bg-primary-600 flex items-center justify-center space-x-2"
            onClick={() => console.log('Add transaction clicked')}
          >
            <Plus className="w-5 h-5" />
            <span>Add Transaction</span>
          </button>

          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-3 p-3 rounded-lg ${
                    isActive
                      ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            )
          })}
        </div>
      </nav>
    </>
  )
}

export default Navigation
