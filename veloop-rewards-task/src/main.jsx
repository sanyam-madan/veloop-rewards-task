import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Add this line here to connect Bootstrap styles:
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)