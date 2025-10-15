import React, { createContext, useState, useContext } from 'react';

// 1. Crea el Contexto
const CartContext = createContext();

// 2. Crea el Hook personalizado para usar el carrito fácilmente
export const useCart = () => {
  return useContext(CartContext);
};

// 3. Crea el Proveedor (Provider) para envolver la aplicación
export const CartProvider = ({ children }) => {
  // Inicializa el estado del carrito como un array vacío
  const [cartItems, setCartItems] = useState([]);

  // Lógica para añadir un producto al carrito
  const addToCart = (product) => {
    // Verifica si el producto ya existe en el carrito
    const existingItem = cartItems.find(item => item.id === product.id);

    if (existingItem) {
      // Si existe, incrementa la cantidad (STATE MANAGEMENT)
      setCartItems(
        cartItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      // Si no existe, añádelo con cantidad 1
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  // Lógica para eliminar un producto del carrito
  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };
  
  // Calcula la cantidad total de artículos en el carrito
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // El objeto de valor que se pasará a los componentes
  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    getTotalItems,
    // Puedes añadir más lógica aquí: incrementar/decrementar cantidad, calcular total, etc.
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};