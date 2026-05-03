import { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(
    localStorage.getItem('cart')
      ? JSON.parse(localStorage.getItem('cart'))
      : []
  );

  // إضافة للسلة
  const addToCart = (product) => {
    const exists = cartItems.find(item => item._id === product._id);
    let newCart;
    if (exists) {
      newCart = cartItems.map(item =>
        item._id === product._id
          ? { ...item, qty: item.qty + 1 }
          : item
      );
    } else {
      newCart = [...cartItems, { ...product, qty: 1 }];
    }
    setCartItems(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  // حذف من السلة
  const removeFromCart = (id) => {
    const newCart = cartItems.filter(item => item._id !== id);
    setCartItems(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  // تغيير الكمية
  const updateQty = (id, qty) => {
    if (qty < 1) return removeFromCart(id);
    const newCart = cartItems.map(item =>
      item._id === id ? { ...item, qty } : item
    );
    setCartItems(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  // تفريغ السلة
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  // المجموع الكلي
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQty, clearCart, totalPrice, totalItems }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);