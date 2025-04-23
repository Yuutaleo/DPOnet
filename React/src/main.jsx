import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Home from './pages/Home'
import Registro from './pages/Registro'
import AppRoutes from './pages/Rotas/Index'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  
    <AppRoutes/>

  </StrictMode>,
)