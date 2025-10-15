import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // Importamos el hook para acceder al estado

const CartPage = () => {
  // Obtiene el estado y las funciones del carrito
  const { cartItems, removeFromCart, getTotalItems } = useCart();
  
  // Función para calcular el total a pagar
  // Ajustamos toFixed(0) para simular el formato de precio chileno sin decimales
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(0);
  };

  // Función para formatear el precio a moneda local (CLP)
  const formatPrice = (price) => {
    return price.toLocaleString('es-CL', { 
        style: 'currency', 
        currency: 'CLP', 
        minimumFractionDigits: 0 
    });
  };

  // Si el carrito está vacío
  if (cartItems.length === 0) {
    return (
      <div className="container mt-5 text-center py-5">
        <h1 className="section-title-custom">Tu Carrito Está Vacío 😔</h1>
        <p className="lead">Parece que aún no has añadido ninguna fragancia.</p>
        <Link to="/catalogo" className="btn btn-primary btn-lg mt-3">
          Explorar Catálogo
        </Link>
      </div>
    );
  }

  // Si el carrito tiene artículos
  return (
    <div className="content-section-wrapper py-5">
      <h1 className="display-5 fw-bold text-center mb-5">Resumen de Compra</h1>
      
      <div className="row g-4"> {/* g-4 añade más espacio entre columnas */}
        {/* Columna Izquierda: Lista de Artículos del Carrito */}
        <div className="col-lg-8">
          <ul className="list-group">
            {cartItems.map((item) => (
              <li 
                key={item.id} 
                // Usamos 'align-items-start' para alinear elementos arriba
                className="list-group-item d-flex justify-content-between align-items-start p-3" 
              >
                {/* ⬅️ NUEVO: CONTENEDOR DE LA IMAGEN Y DETALLES */}
                <div className="d-flex align-items-center">
                    {/* Imagen miniatura */}
                    <img 
                        src={item.image} 
                        alt={item.name} 
                        className="me-3 img-thumbnail" 
                        style={{ width: '60px', height: '60px', objectFit: 'contain' }} 
                    />
                    
                    {/* Detalles del Producto */}
                    <div>
                        <h5 className="mb-1 fw-bold">{item.name}</h5>
                        <p className="mb-0 text-muted small">Marca: {item.brand}</p>
                        <p className="mb-0 fw-bold">{formatPrice(item.price * item.quantity)}</p>
                        <small className="text-secondary">Cantidad: {item.quantity}</small>
                    </div>
                </div>
                
                {/* Botón de Eliminar (a la derecha) */}
                <button 
                  className="btn btn-sm btn-outline-danger mt-1"
                  onClick={() => removeFromCart(item.id)}
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Columna Derecha: Total y Botón de Checkout */}
        <div className="col-lg-4">
          <div className="card shadow-sm p-3 sticky-top" style={{top: '80px'}}>
            <h4 className="card-title fw-bold">Total a Pagar</h4>
            <hr />
            <div className="d-flex justify-content-between fw-bold fs-5 mb-4">
              <span>Total:</span>
              <span className="text-success">{formatPrice(getCartTotal())}</span>
            </div>
            <Link to="/checkout" className="btn btn-success btn-lg w-100">
              Proceder al Pago
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;