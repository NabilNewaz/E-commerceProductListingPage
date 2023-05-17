import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'react-hot-toast'
import Authprovider from './Contexts/Authprovider/Authprovider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <Authprovider>
        <Toaster />
        <App />
      </Authprovider>
    </HelmetProvider>
  </React.StrictMode>,
)
