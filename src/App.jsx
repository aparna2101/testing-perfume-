import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ShopProvider } from './context/ShopContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/cart/CartDrawer';
import { WishlistDrawer } from './components/wishlist/WishlistDrawer';
import { SearchOverlay } from './components/search/SearchOverlay';
import { DemoCheckoutModal } from './components/checkout/DemoCheckoutModal';
import { AccountModal } from './components/account/AccountModal';
import { ToastContainer } from './components/common/ToastContainer';

// Pages
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetail } from './pages/ProductDetail';
import { Collections } from './pages/Collections';
import { CollectionDetail } from './pages/CollectionDetail';
import { About } from './pages/About';
import { WishlistPage } from './pages/WishlistPage';
import { CartPage } from './pages/CartPage';
import { NotFound } from './pages/NotFound';

export default function App() {
  return (
    <ShopProvider>
      <BrowserRouter>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          {/* Global Sticky Navigation */}
          <Navbar />

          {/* Page Routing */}
          <div style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/collections" element={<Collections />} />
              <Route path="/collections/:slug" element={<CollectionDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>

          {/* Global Footer */}
          <Footer />

          {/* Global Interactive Overlays & Modals */}
          <CartDrawer />
          <WishlistDrawer />
          <SearchOverlay />
          <DemoCheckoutModal />
          <AccountModal />
          <ToastContainer />
        </div>
      </BrowserRouter>
    </ShopProvider>
  );
}
