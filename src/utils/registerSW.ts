import { registerSW } from 'virtual:pwa-register'

// Register service worker
registerSW({
  onNeedRefresh() {
    // Show a prompt to user or automatically update
    console.log('New content available, refreshing...')
  },
  onOfflineReady() {
    console.log('App ready to work offline')
  },
})
