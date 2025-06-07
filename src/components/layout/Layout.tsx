import { Outlet } from 'react-router-dom'
import Header from './Header'
import Navigation from './Navigation'

const Layout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* <OfflineIndicator /> */}
      <Header />
      <div className="flex">
        <Navigation />
        <main className="flex-1 pt-2 md:pt-0 pb-24 md:pb-0">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout
