import { WifiOff } from 'lucide-react'
import { useOffline } from '../../hooks'

export function OfflineIndicator() {
  const isOffline = useOffline()

  if (!isOffline) return null

  return (
    <div className="fixed top-0 left-0 right-0 bg-yellow-500 text-white py-2 px-4 text-center text-sm font-medium z-50 flex items-center justify-center gap-2">
      <WifiOff className="w-4 h-4" />
      <span>You're offline. Changes will sync when you reconnect.</span>
    </div>
  )
}
