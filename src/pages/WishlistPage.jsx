import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';

export const WishlistPage = () => {
  const { wishlist, toggleWishlist, moveWishlistToCart } = useShop();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div style={{ backgroundColor: '#FAF8F5', minHeight: '100vh', paddingBottom: '96px' }}>
      {/* Header */}
      <div
        style={{
          backgroundColor: '#F3EFE8',
          padding: '64px 0 48px',
          textAlign: 'center',
          borderBottom: '1px solid rgba(25, 24, 23, 0.08)',
        }}
      >
        <div className="container">
          <span className="section-subtitle">YOUR PRIVATE SELECTION</span>
          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.4rem, 4vw, 3.4rem)',
              letterSpacing: '0.08em',
              fontWeight: 400,
              marginBottom: '10px',
            }}
          >
            SAVED FRAGRANCES ({wishlist.length})
          </h1>
          <p style={{ color: '#5C5955', fontSize: '0.92rem', maxWidth: '480px', margin: '0 auto' }}>
            A curated anthology of scents you hold close. Move items to your shopping bag whenever you are ready to claim them.
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '54px' }}>
        {wishlistedProducts.length === 0 ? (
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid rgba(25, 24, 23, 0.08)',
              borderRadius: '3px',
              padding: '80px 20px',
              textAlign: 'center',
              maxWidth: '560px',
              margin: '0 auto',
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: '#FAF5ED',
                color: '#B8976C',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
              }}
            >
              <Heart size={28} />
            </div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', marginBottom: '10px' }}>
              Your Wishlist is Empty
            </h2>
            <p style={{ color: '#6B6761', fontSize: '0.9rem', marginBottom: '28px' }}>
              You haven't saved any fragrances yet. Explore our portfolio and click the heart icon on any scent to reserve it here.
            </p>
            <Link to="/shop" className="btn-primary" style={{ gap: '8px' }}>
              <span>EXPLORE ALL FRAGRANCES</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
              gap: '28px',
            }}
          >
            {wishlistedProducts.map((product) => (
              <div
                key={product.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '2px',
                  border: '1px solid rgba(25, 24, 23, 0.08)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div style={{ position: 'relative', paddingTop: '115%', backgroundColor: '#F3EFE8' }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    aria-label="Remove from wishlist"
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#191817',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#B8976C', marginBottom: '4px' }}>
                      {product.category} • {product.fragranceFamily}
                    </div>
                    <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-heading)', marginBottom: '6px' }}>
                      <Link to={`/product/${product.id}`} style={{ color: '#191817' }}>
                        {product.name}
                      </Link>
                    </h3>
                    <p style={{ fontSize: '0.82rem', color: '#6B6761', lineHeight: 1.5, marginBottom: '14px' }}>
                      {product.shortDesc}
                    </p>
                  </div>

                  <div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 500, color: '#191817', marginBottom: '14px' }}>
                      ${product.price}
                    </div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => moveWishlistToCart(product.id)}
                        className="btn-primary"
                        style={{ flex: 1, padding: '12px 10px', fontSize: '0.7rem', gap: '6px' }}
                      >
                        <ShoppingBag size={13} />
                        <span>MOVE TO BAG</span>
                      </button>
                      <Link
                        to={`/product/${product.id}`}
                        className="btn-outline"
                        style={{ padding: '12px 14px', fontSize: '0.7rem' }}
                      >
                        VIEW
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
