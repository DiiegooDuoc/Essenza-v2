import { Routes, Route } from 'react-router-dom';
import './App.css'; 

import HomePage from './pages/HomePage';
import CataloguePage from './pages/CataloguePage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';

import Navbar from './components/Navbar'; 
import Footer from './components/Footer';

function App() {

  return (
    <div className="App-container">
      
      {}
      <Navbar />

      {}
      <main> 
        <Routes>
          {}
          <Route path="/" element={<HomePage />} />
          
          {}
          <Route path="/catalogo" element={<CataloguePage />} />
          
          {}
          <Route path="/perfume/:id" element={<ProductDetailPage />} />
          
          {}
          <Route path="/carrito" element={<CartPage />} />
          
          {}
          <Route path="/checkout" element={<CheckoutPage />} />

          {}
          <Route path="*" element={<h1>404 - Página no encontrada</h1>} />

        </Routes>
      </main>

      {}
      <Footer />

    </div>
  );
}

export default App;