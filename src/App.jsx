// Essenza-V2/src/App.jsx (FINAL CORREGIDO)

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css'; 

// Importación de Páginas y Componentes
import HomePage from './pages/HomePage';
import CataloguePage from './pages/CataloguePage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage'; // <-- NUEVA PÁGINA
import AdminPage from './pages/AdminPage'; // <-- NUEVA PÁGINA

import Navbar from './components/Navbar'; 
import Footer from './components/Footer';

// Importación de Seguridad
import { useAuth } from './context/AuthContext'; // <-- Importamos useAuth

// Componente Wrapper para rutas protegidas (Punto 9d)
const ProtectedRoute = ({ element, requiredRole }) => {
    const { isAuthenticated, hasRole } = useAuth();

    if (!isAuthenticated) {
        // Redirige al login si no está autenticado
        return <Navigate to="/login" replace />; 
    }

    if (requiredRole && !hasRole(requiredRole)) {
        // Redirige a Home si no tiene el rol necesario (Punto 9d)
        return <Navigate to="/" replace />; 
    }

    return element;
};


function App() {

  return (
    <div className="App-container">
      
      {/* Navbar usa AuthContext y CartContext */}
      <Navbar />

      <main> 
        <Routes>
          
          {/* RUTAS PÚBLICAS */}
          <Route path="/" element={<HomePage />} />
          <Route path="/catalogo" element={<CataloguePage />} />
          
          {/* Ruta de Producto (Tu ruta es /perfume/:id) */}
          <Route path="/perfume/:id" element={<ProductDetailPage />} /> 
          
          <Route path="/carrito" element={<CartPage />} />
          
          {/* Ruta de Login/Registro (Punto 2 y 9) */}
          <Route path="/login" element={<LoginPage />} /> 

          {/* RUTAS PROTEGIDAS (Punto 9d) */}
          
          {/* Checkout: Protegido por autenticación */}
          <Route 
              path="/checkout" 
              element={<ProtectedRoute element={<CheckoutPage />} />} 
          />

          {/* Admin: Protegido por Rol 'ADMIN' */}
          <Route 
              path="/admin" 
              element={<ProtectedRoute element={<AdminPage />} requiredRole="ADMIN" />} 
          />

          {/* 404 - Redirecciona a Home */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}

export default App;