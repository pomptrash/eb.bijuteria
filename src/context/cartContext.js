"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext({});

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // lê do localStorage apenas quando o componente for montado no cliente
  useEffect(() => {
    setMounted(true);
    const savedCart = localStorage.getItem("eb_cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Erro ao carregar carrinho:", e);
      }
    }
  }, []);

  // salva no localStorage sempre que o carrinho mudar (após montar)
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("eb_cart", JSON.stringify(cart));
    }
  }, [cart, mounted]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantidade += 1;
        return updated;
      }
      return [...prevCart, { ...product, quantidade: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === productId) {
            const newQty = item.quantidade + delta;
            return newQty > 0 ? { ...item, quantidade: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => setCart([]);

  // evita disparar mismatch de hidratação enviando 0 até montar no cliente
  const totalItems = mounted
    ? cart.reduce((sum, item) => sum + item.quantidade, 0)
    : 0;

  const totalPrice = mounted
    ? cart.reduce(
        (sum, item) => sum + Number(item.preco) * item.quantidade,
        0
      )
    : 0;

  return (
    <CartContext.Provider
      value={{
        cart,
        isOpen,
        setIsOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);