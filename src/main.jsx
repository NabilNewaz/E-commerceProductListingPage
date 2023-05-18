import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'react-hot-toast'
import Authprovider from './Contexts/Authprovider/Authprovider.jsx'
import { CartProvider } from 'react-use-cart'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Authprovider>
      <HelmetProvider>
        <Toaster />
          <CartProvider>
              <App />
          </CartProvider>
        </HelmetProvider>
      </Authprovider>
  </React.StrictMode>,
)
