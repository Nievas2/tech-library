import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AuthContextProvider, ThemeProvider,  } from './contexts/index.ts'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from './components/ui/toaster.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <AuthContextProvider>
          <App />
          <Toaster />
        </AuthContextProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
)
