"use client";
import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // ✅ Add product to cart (merge if already exists)
  const addToCart = (product) => {
    try {
      setCartItems((prevCart) => {
        const existingIndex = prevCart.findIndex(item => item.id === product.id);

        if (existingIndex !== -1) {
          // Item exists → increase quantity
          const updatedCart = [...prevCart];
          updatedCart[existingIndex].quantity += 1;
          return updatedCart;
        } else {
          // New item → add with quantity 1
          return [...prevCart, { ...product, quantity: 1 }];
        }
      });
      setIsCartOpen(true); // Open cart on add
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  // ✅ Remove item
  const removeFromCart = (id) => {
    try {
      setCartItems((prevCart) => prevCart.filter(item => item.id !== id));
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  // ✅ Toggle cart
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        addToCart,
        removeFromCart,
        toggleCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
