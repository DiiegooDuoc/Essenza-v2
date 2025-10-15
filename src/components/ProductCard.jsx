import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext'; 

const ProductCard = ({ perfume }) => {
  const { addToCart } = useCart(); 

  return (
    <div className="product-card-ref text-center d-flex flex-column"> 
      
      {}
      <div className="product-image-container">
        {}
        <img src={perfume.image} alt={perfume.name} /> 
      </div>
      
      {}
      <div className="card-content flex-grow-1">
        {}
        <h5 className="product-title-ref mx-auto">{perfume.name}</h5> 
        
        {}
        <h6 classNametext-muted mb-2>{perfume.brand}</h6> 
        
        {}
        <p className="card-text text-muted small">{perfume.description}</p>
      </div>

      {}
      <div className="card-footer-custom mt-auto">
        <p className="product-price-ref">
            Precio: ${perfume.price.toLocaleString('es-CL', { minimumFractionDigits: 0 })}
        </p>
        
        {}
        <Link 
          to={`/perfume/${perfume.id}`} 
          className="btn btn-sm btn-outline-secondary w-100 mb-2"
        >
          Ver Detalles
        </Link>
        
        {}
        <button 
          className="btn btn-sm btn-success w-100"
          onClick={() => addToCart(perfume)} 
        >
          Añadir al Carrito
        </button>
      </div>
    </div>
  );
};

export default ProductCard;