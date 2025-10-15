import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext'; 

// El componente recibe un objeto 'perfume' como PROPIEDAD
const ProductCard = ({ perfume }) => {
  const { addToCart } = useCart(); 

  return (
    // Aplicamos la clase personalizada para la tarjeta
    <div className="product-card-ref text-center d-flex flex-column"> 
      
      {/* Contenedor de la Imagen */}
      <div className="product-image-container">
        {/* Placeholder de imagen */}
        <img src={perfume.image} alt={perfume.name} /> 
      </div>
      
      {/* Título y Descripción */}
      <div className="card-content flex-grow-1">
        {/* Usamos el nombre del perfume como título principal (Subrayado) */}
        <h5 className="product-title-ref mx-auto">{perfume.name}</h5> 
        
        {/* Subtítulo: Marca y/o nombre de la variante */}
        <h6 classNametext-muted mb-2>{perfume.brand}</h6> 
        
        {/* La descripción va debajo del precio */}
        <p className="card-text text-muted small">{perfume.description}</p>
      </div>

      {/* Precio y Botones - Se ubican en la parte inferior */}
      <div className="card-footer-custom mt-auto">
        <p className="product-price-ref">
            Precio: ${perfume.price.toLocaleString('es-CL', { minimumFractionDigits: 0 })}
        </p>
        
        {/* Botón Ver Detalles (en tu imagen no está, pero lo mantenemos para funcionalidad) */}
        <Link 
          to={`/perfume/${perfume.id}`} 
          className="btn btn-sm btn-outline-secondary w-100 mb-2"
        >
          Ver Detalles
        </Link>
        
        {/* Botón Añadir al Carrito (usa la función del Contexto) */}
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