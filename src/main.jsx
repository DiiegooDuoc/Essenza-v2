// Essenza-V2/src/main.jsx (CORREGIDO)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import { CartProvider } from './context/CartContext.jsx'; 
import { AuthProvider } from './context/AuthContext.jsx'; // <-- NUEVA IMPORTACIÓN

const rootElement = document.getElementById('root');

createRoot(rootElement).render(
  <StrictMode>
    {/* Envolvemos con CartProvider y AuthProvider para dar acceso global */}
    <CartProvider>
      <AuthProvider> {/* <-- AÑADIMOS EL PROVEEDOR DE AUTENTICACIÓN (Punto 9) */}
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </CartProvider>
  </StrictMode>
);