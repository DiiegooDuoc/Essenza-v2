import { Routes, Route } from 'react-router-dom';
import './App.css'; 

// Importa los componentes de las páginas principales (necesitas crearlos)
import HomePage from './pages/HomePage';
import CataloguePage from './pages/CataloguePage';
import ProductDetailPage from './pages/ProductDetailPage'; // Para ver un perfume individual
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';

// Importa un componente de navegación que será global (necesitas crearlo)
import Navbar from './components/Navbar'; 
import Footer from './components/Footer'; // Opcional, pero recomendado

function App() {
  // Eliminamos 'useState' y todo el código de ejemplo (contador, logos)

  return (
    <div className="App-container">
      
      {/* 1. Componente que se muestra en todas las páginas (e.g., el menú) */}
      <Navbar />

      {/* 2. Definición de las Rutas de la Aplicación */}
      <main> 
        <Routes>
          {/* Ruta principal/Home */}
          <Route path="/" element={<HomePage />} />
          
          {/* Ruta para el Catálogo/Lista de Perfumes */}
          <Route path="/catalogo" element={<CataloguePage />} />
          
          {/* Ruta para el Detalle de un Perfume (usando un parámetro dinámico :id) */}
          <Route path="/perfume/:id" element={<ProductDetailPage />} />
          
          {/* Ruta para el Carrito de Compras */}
          <Route path="/carrito" element={<CartPage />} />
          
          {/* Ruta para el Proceso de Pago/Checkout */}
          <Route path="/checkout" element={<CheckoutPage />} />

          {/* Opcional: Ruta para manejar errores 404 */}
          <Route path="*" element={<h1>404 - Página no encontrada</h1>} />

        </Routes>
      </main>

      {/* 3. Footer (opcional) */}
      <Footer />

    </div>
  );
}

export default App;