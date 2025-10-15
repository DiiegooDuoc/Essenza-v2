import { describe, it, expect, beforeEach, beforeAll } from 'vitest';
import { render } from '@testing-library/react'; 
import { useCart, CartProvider } from './CartContext';
import React from 'react';
import { act } from '@testing-library/react'; 

const MOCK_PERFUME = {
    id: 1, 
    name: 'Le Male Elixir Parfum for Men', 
    brand: 'Perfumería VIP', 
    price: 140000, 
    description: 'Una fragancia intensa y seductora para el hombre moderno',
    image: '/test-img.jpg'
};

let currentCartState;
let renderResult;

const TestHelperComponent = () => {
    currentCartState = useCart();
    return null; 
};

// -------------------------------------------------------------
describe('CartContext Logic (Testing Logics and Behavior)', () => {
    
    beforeAll(() => {
        renderResult = render(<CartProvider><TestHelperComponent /></CartProvider>);
    });

    beforeEach(() => {
        if (currentCartState.cartItems.length > 0) {
             act(() => {
                currentCartState.cartItems.forEach(item => {
                    currentCartState.removeFromCart(item.id);
                });
            });
        }
    });

    it('Debe inicializar el carrito vacío y el total de artículos en 0', () => {
        expect(currentCartState.cartItems.length).toBe(0);
        expect(currentCartState.getTotalItems()).toBe(0);
    });

    it('Debe añadir un producto nuevo con cantidad 1 y verificar el total', () => {
        act(() => {
            currentCartState.addToCart(MOCK_PERFUME);
        });
        
        expect(currentCartState.cartItems.length).toBe(1);
        expect(currentCartState.cartItems[0].name).toBe('Le Male Elixir Parfum for Men');
        expect(currentCartState.cartItems[0].quantity).toBe(1);
        expect(currentCartState.getTotalItems()).toBe(1);
    });


    it('Debe incrementar la cantidad del producto si se añade nuevamente', () => {
        act(() => {
            currentCartState.addToCart(MOCK_PERFUME);
        });
        
        act(() => {
            currentCartState.addToCart(MOCK_PERFUME);
        });
        
        expect(currentCartState.cartItems.length).toBe(1); 
        expect(currentCartState.cartItems[0].quantity).toBe(2); 
        expect(currentCartState.getTotalItems()).toBe(2);
    });
    
    it('Debe eliminar el producto del carrito y resetear el total', () => {
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