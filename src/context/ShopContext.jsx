import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS } from '../data/products';

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  // Cart state
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('elan_cart');
      return saved ? JSON.parse(saved) : [
        {
          id: 'elan-no-01',
          name: 'Élan No. 01',
          subtitle: 'The Quintessential Signature',
          size: '50ml',
          price: 145,
          image: PRODUCTS[0].image,
          quantity: 1
        }
      ];
    } catch {
      return [];
    }
  });

  // Wishlist state
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('elan_wishlist');
      return saved ? JSON.parse(saved) : ['santal-eclat', 'rose-nocturne'];
    } catch {
      return [];
    }
  });

  // UI Drawers & Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  // Toast notifications
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    try {
      localStorage.setItem('elan_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('elan_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  // Toast trigger
  const showToast = (message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart operations
  const addToCart = (product, selectedSize = '50ml', quantity = 1) => {
    const sizeObj = product.sizes ? product.sizes.find(s => s.size === selectedSize) : null;
    const finalPrice = sizeObj ? sizeObj.price : product.price;

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.id === product.id && item.size === selectedSize
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity
        };
        return next;
      } else {
        return [
          ...prev,
          {
            id: product.id,
            name: product.name,
            subtitle: product.subtitle,
            size: selectedSize,
            price: finalPrice,
            image: product.image,
            quantity
          }
        ];
      }
    });

    showToast(`Added ${product.name} (${selectedSize}) to your Shopping Bag.`, 'success');
    setIsCartOpen(true);
  };

  const updateCartQuantity = (id, size, newQty) => {
    if (newQty <= 0) {
      removeFromCart(id, size);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.size === size ? { ...item, quantity: newQty } : item
      )
    );
  };

  const removeFromCart = (id, size) => {
    setCart((prev) => prev.filter((item) => !(item.id === id && item.size === size)));
    showToast('Item removed from Shopping Bag', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist operations
  const toggleWishlist = (productId) => {
    const isSaved = wishlist.includes(productId);
    const product = PRODUCTS.find((p) => p.id === productId);
    const prodName = product ? product.name : 'Product';

    if (isSaved) {
      setWishlist((prev) => prev.filter((id) => id !== productId));
      showToast(`Removed ${prodName} from your Wishlist`, 'info');
    } else {
      setWishlist((prev) => [...prev, productId]);
      showToast(`Saved ${prodName} to your Wishlist`, 'success');
    }
  };

  const isWishlisted = (productId) => wishlist.includes(productId);

  const moveWishlistToCart = (productId) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (product) {
      addToCart(product, '50ml', 1);
      setWishlist((prev) => prev.filter((id) => id !== productId));
    }
  };

  // Calculations
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const shippingThreshold = 100;
  const isFreeShipping = cartSubtotal >= shippingThreshold || cartSubtotal === 0;
  const shippingCost = isFreeShipping ? 0 : 15;
  const cartTotal = cartSubtotal + shippingCost;

  return (
    <ShopContext.Provider
      value={{
        // Cart
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartItemCount,
        cartSubtotal,
        shippingCost,
        isFreeShipping,
        cartTotal,
        shippingThreshold,
        // Wishlist
        wishlist,
        toggleWishlist,
        isWishlisted,
        moveWishlistToCart,
        // UI states
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isSearchOpen,
        setIsSearchOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isAccountOpen,
        setIsAccountOpen,
        // Toast
        toasts,
        showToast,
        removeToast
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
