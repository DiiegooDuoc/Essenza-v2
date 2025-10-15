import React, { useState } from 'react';
import ProductCard from '../components/ProductCard'; // Lo crearemos después

// ⚠️ 1. IMPORTA LAS IMÁGENES EXPLÍCITAMENTE
import img1 from '../assets/img2.jpg'; // Asegura que la ruta sea correcta desde CataloguePage.jsx
import img2 from '../assets/img1.jpg'; 

// ⚠️ DATOS SIMULADOS: Esto representa la información de tus perfumes
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
  // ¡Añade más perfumes aquí!
];

const CataloguePage = () => {
  // Aquí usaríamos 'useState' para gestionar la lista de perfumes si fuera dinámica
  const [perfumes, setPerfumes] = useState(perfumeData);

  // También podemos usar 'useState' para gestionar filtros o búsquedas
  // const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="catalogue-page container"> 
      <h1>Nuestro Catálogo de Perfumes</h1>

      {/* Aquí podrías añadir componentes para filtros y búsqueda */}
      {/* <FilterComponent perfumes={perfumes} setPerfumes={setPerfumes} /> */}

      <div className="row"> {/* Usaremos clases de Bootstrap aquí (ver Paso 4) */}
        {/* Mapea la lista de perfumes para mostrar cada uno */}
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