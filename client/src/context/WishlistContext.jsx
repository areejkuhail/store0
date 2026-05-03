import { createContext, useState, useContext } from 'react';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState(
    localStorage.getItem('wishlist')
      ? JSON.parse(localStorage.getItem('wishlist'))
      : []
  );

  // إضافة للمفضلة
  const addToWishlist = (product) => {
    const exists = wishlistItems.find(item => item._id === product._id);
    if (exists) return; // اذا موجود ما نضيفه مرة ثانية
    const newList = [...wishlistItems, product];
    setWishlistItems(newList);
    localStorage.setItem('wishlist', JSON.stringify(newList));
  };

  // حذف من المفضلة
  const removeFromWishlist = (id) => {
    const newList = wishlistItems.filter(item => item._id !== id);
    setWishlistItems(newList);
    localStorage.setItem('wishlist', JSON.stringify(newList));
  };

  // التحقق اذا المنتج في المفضلة
  const isInWishlist = (id) => {
    return wishlistItems.some(item => item._id === id);
  };

  const totalWishlist = wishlistItems.length;

  return (
    <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist, isInWishlist, totalWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);