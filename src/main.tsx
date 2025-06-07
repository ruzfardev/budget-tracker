import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './utils/registerSW'
import { initializeDefaultCategories } from './services/db'
import './utils/testData' // Import for testing

// Initialize database with default categories
initializeDefaultCategories().catch(console.error)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
