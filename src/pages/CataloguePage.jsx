import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';

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

const CataloguePage = () => {
  const [perfumes, setPerfumes] = useState(perfumeData);

  return (
    <div className="catalogue-page container"> 
      <h1>Nuestro Catálogo de Perfumes</h1>

      {}
      {}

      <div className="row"> {}
        {}
        {perfumes.map(perfume => (
          <div key={perfume.id} className="col-6 col-md-4 col-lg-3 mb-4"> 
            <ProductCard 
              perfume={perfume} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CataloguePage;