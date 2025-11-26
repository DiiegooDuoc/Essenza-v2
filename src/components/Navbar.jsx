// Essenza-V2/src/components/Navbar.jsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext'; 
import { useAuth } from '../context/AuthContext'; // <-- Importamos el hook de Auth

const Navbar = () => {
  const { getTotalItems } = useCart(); 
  const { isAuthenticated, hasRole, logout } = useAuth(); // <-- Usamos las funciones de Auth
  const navigate = useNavigate(); // Hook para navegar después de logout
  const totalItems = getTotalItems();

  // Función para manejar el cierre de sesión y redirigir
  const handleLogout = () => {
    logout();
    navigate('/'); // Redirigir a la página de inicio después de cerrar sesión
  };

  return (
    <nav className="navbar navbar-expand-lg sticky-top shadow-sm navbar-custom-ref"> 
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <span className="fw-bold">Essenza</span> Perfumes 
        </Link> 
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation">
          {/* Ícono del toggler (Asegúrate que Bootstrap esté cargado) */}
          <span className="navbar-toggler-icon" style={{filter: 'invert(1)'}}></span> 
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            
            {/* 1. Enlaces Comunes */}
            <li className="nav-item">
              <Link className="nav-link" to="/">Inicio</Link> 
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/catalogo">Catálogo</Link> 
            </li>
            
            {/* 2. Enlace de Administración (Punto 9d) */}
            {hasRole('ADMIN') && (
                <li className="nav-item">
                    {/* Este enlace lleva a una página de Admin que deberás crear */}
                    <Link className="nav-link text-warning fw-bold" to="/admin">ADMIN</Link>
                </li>
            )}

            {/* 3. Carrito */}
            <li className="nav-item">
              <Link className="nav-link btn btn-outline-success position-relative me-2" to="/carrito">
                Carrito 🛒
                <span className="badge rounded-pill bg-danger position-absolute top-0 start-100 translate-middle">
                  {totalItems > 0 ? totalItems : ''}
                </span>
              </Link>
            </li>
            
            {/* 4. Checkout */}
            {/* Mantenemos el checkout visible, pero si quieres protegerlo, puedes usar isAuthenticated aquí */}
            <li className="nav-item me-2">
              <Link className="nav-link btn btn-light" to="/checkout">Checkout</Link>
            </li>
            
            {/* 5. Autenticación (Punto 9) */}
            <li className="nav-item">
              {isAuthenticated ? (
                // Si está autenticado, muestra botón de Logout
                <button 
                  className="btn btn-outline-light text-danger fw-bold" 
                  onClick={handleLogout}
                >
                  Cerrar Sesión
                </button>
              ) : (
                // Si no está autenticado, muestra enlace a Login/Register
                <Link className="btn btn-primary btn-dark-custom" to="/login">
                  Ingresar
                </Link>
              )}
            </li>
            
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;