import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext'; 

import img1 from '../assets/img2.jpg';
import img2 from '../assets/img1.jpg'; 

const perfumeData = [
  { 
    id: 1, 
    name: 'Le Male Elixir Parfum for Men', 
    brand: 'Perfumería VIP', 
    price: 140000, 
    description: 'Una fragancia intensa y seductora para el hombre moderno',
    image: img1
  },
  { 
    id: 2, 
    name: 'ean Paul Gaultier Le Beau Edt', 
    brand: 'Esencias frescas', 
    price: 130000, 
    description: 'Una fragancia fresca y sensual para el hombre moderno.',
    image: img2
  },
];


const ProductDetailPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const perfume = perfumeData.find(p => p.id === parseInt(id)); 

  if (!perfume) {
    return (
      <div className="container mt-5 text-center py-5">
        <h1 className="display-4 text-danger">404 - Producto no encontrado</h1>
        <p className="lead">El perfume que buscas no existe o ha sido descontinuado.</p>
        <button className="btn btn-dark mt-3" onClick={() => navigate('/catalogo')}>
            Volver al Catálogo
        </button>
      </div>
    );
  }

  const formattedPrice = perfume.price.toLocaleString('es-CL', { 
    style: 'currency', 
    currency: 'CLP', 
    minimumFractionDigits: 0 
  });

  return (
    <div className="content-section-wrapper py-5">
      <div className="row g-5 align-items-center">
        
        {}
        <div className="col-md-5 text-center">
          <img 
            src={perfume.image} 
            alt={perfume.name} 
            className="img-fluid border shadow-sm p-3 bg-white" 
            style={{ maxHeight: '450px', objectFit: 'contain' }} 
          />
        </div>
        
        {}
        <div className="col-md-7">
          
          <h1 className="display-4 fw-bold mb-1">{perfume.name}</h1>
          <p className="lead text-muted mb-4">{perfume.brand}</p>
          
          <p className="fs-5">{perfume.description}</p>
          
          <h3 className="section-title-custom mb-3 mt-4">Detalles Técnicos</h3>
          <p>{perfume.details || 'No hay detalles adicionales disponibles.'}</p>
          
          <hr className="my-4" />
          
          {}
          <div className="d-flex align-items-center mb-4">
            <span className="product-price-ref me-4">
                {formattedPrice}
            </span>
            
            <button 
              className="btn btn-success btn-lg"
              onClick={() => addToCart(perfume)}
            >
              Añadir al Carrito
            </button>
          </div>
          
          <button className="btn btn-outline-dark" onClick={() => navigate(-1)}>
            ← Volver al Catálogo
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;