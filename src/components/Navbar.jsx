import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext'; 

const Navbar = () => {
  const { getTotalItems } = useCart(); 
  const totalItems = getTotalItems();

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
          {}
          <span className="navbar-toggler-icon" style={{filter: 'invert(1)'}}></span> 
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className="nav-link" to="/">Inicio</Link> 
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/catalogo">Catálogo</Link> 
            </li>
            <li className="nav-item">
              <Link className="nav-link btn btn-outline-success position-relative me-2" to="/carrito">
                Carrito 🛒
                {}
                <span className="badge rounded-pill bg-danger position-absolute top-0 start-100 translate-middle">
                  {totalItems > 0 ? totalItems : ''}
                </span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link btn btn-light" to="/checkout">Checkout</Link> {}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;