import { describe, it, expect, beforeEach, beforeAll } from 'vitest';
// Importamos 'render' de RTL
import { render } from '@testing-library/react'; 
import { useCart, CartProvider } from './CartContext';
import React from 'react';
// 👈 IMPORTAMOS 'act' directamente de React Testing Library o react
//    Generalmente, Vitest lo recomienda de '@testing-library/react' o 'react'
import { act } from '@testing-library/react'; 

// Mock de producto para usar en las pruebas
const MOCK_PERFUME = {
    id: 1, 
    name: 'Le Male Elixir Parfum for Men', 
    brand: 'Perfumería VIP', 
    price: 140000, 
    description: 'Una fragancia intensa y seductora para el hombre moderno',
    image: '/test-img.jpg'
};

// ⚠️ Variables para exponer el estado y las funciones del hook al test
let currentCartState;
let renderResult;

// Componente de Ayuda para Pruebas
const TestHelperComponent = () => {
    currentCartState = useCart();
    return null; 
};

// -------------------------------------------------------------
describe('CartContext Logic (Testing Logics and Behavior)', () => {
    
    // Antes de todas las pruebas, renderizamos el componente contenedor
    beforeAll(() => {
        // Renderizamos UNA SOLA VEZ el componente que contiene el hook dentro del provider
        renderResult = render(<CartProvider><TestHelperComponent /></CartProvider>);
    });

    // Antes de cada prueba, aseguramos que el carrito esté vacío
    beforeEach(() => {
        // Para asegurar que el estado se resetee correctamente para la próxima prueba:
        // Si no tenemos una función clearCart, debemos forzar la eliminación de todos los items
        if (currentCartState.cartItems.length > 0) {
             act(() => {
                currentCartState.cartItems.forEach(item => {
                    currentCartState.removeFromCart(item.id);
                });
            });
        }
    });

    // Prueba 1: Verifica el estado inicial (debería ser 0 después del beforeEach)
    it('Debe inicializar el carrito vacío y el total de artículos en 0', () => {
        expect(currentCartState.cartItems.length).toBe(0);
        expect(currentCartState.getTotalItems()).toBe(0);
    });

    // Prueba 2: Añadir un producto nuevo
    it('Debe añadir un producto nuevo con cantidad 1 y verificar el total', () => {
        act(() => {
            currentCartState.addToCart(MOCK_PERFUME);
        });
        
        expect(currentCartState.cartItems.length).toBe(1);
        expect(currentCartState.cartItems[0].name).toBe('Le Male Elixir Parfum for Men');
        expect(currentCartState.cartItems[0].quantity).toBe(1);
        expect(currentCartState.getTotalItems()).toBe(1);
    });

    // Prueba 3: Incrementar la cantidad si el producto ya existe
    it('Debe incrementar la cantidad del producto si se añade nuevamente', () => {
        act(() => {
            currentCartState.addToCart(MOCK_PERFUME); // 1ª adición
        });
        
        act(() => {
            currentCartState.addToCart(MOCK_PERFUME); // 2ª adición
        });
        
        expect(currentCartState.cartItems.length).toBe(1); 
        expect(currentCartState.cartItems[0].quantity).toBe(2); 
        expect(currentCartState.getTotalItems()).toBe(2);
    });
    
    // Prueba 4: Eliminar un producto
    it('Debe eliminar el producto del carrito y resetear el total', () => {
        // Aseguramos que haya un item para eliminar
        act(() => {
            currentCartState.addToCart(MOCK_PERFUME); 
        });

        act(() => {
            currentCartState.removeFromCart(MOCK_PERFUME.id);
        });
        
        expect(currentCartState.cartItems.length).toBe(0);
        expect(currentCartState.getTotalItems()).toBe(0);
    });
});