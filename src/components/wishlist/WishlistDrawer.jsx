import React from 'react';
import { Link } from 'react-router-dom';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS } from '../../data/products';

export const WishlistDrawer = () => {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    toggleWishlist,
    moveWishlistToCart
  } = useShop();

  if (!isWishlistOpen) return null;

  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9000,
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      {/* Backdrop */}
      <div
        onClick={() => setIsWishlistOpen(false)}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(25, 24, 23, 0.45)',
          backdropFilter: 'blur(4px)',
          transition: 'opacity 0.3s',
        }}
      />

      {/* Drawer */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '460px',
          height: '100%',
          backgroundColor: '#FAF8F5',
          boxShadow: 'var(--shadow-drawer)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 9001,
          animation: 'slideLeft 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '24px 28px',
            borderBottom: '1px solid rgba(25, 24, 23, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#FFFFFF',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Heart size={18} color="#B8976C" fill="#B8976C" />
            <h2 style={{ fontSize: '1.15rem', letterSpacing: '0.06em', fontFamily: 'var(--font-heading)' }}>
              SAVED FRAGRANCES ({wishlist.length})
            </h2>
          </div>
          <button
            onClick={() => setIsWishlistOpen(false)}
            aria-label="Close wishlist"
            style={{
              padding: '6px',
              display: 'flex',
              color: '#5C5955',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#191817'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#5C5955'}
          >
            <X size={20} />
          </button>
        </div>

        {/* Wishlist Items List */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '24px 28px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          {wishlistedProducts.length === 0 ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                textAlign: 'center',
                padding: '40px 20px',
              }}
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: '#F3EFE8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                  color: '#8E8A83',
                }}
              >
                <Heart size={28} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Your Wishlist is Empty</h3>
              <p style={{ color: '#6B6761', fontSize: '0.85rem', marginBottom: '24px', maxWidth: '280px' }}>
                Save your favorite scents here while browsing the collection.
              </p>
              <Link
                to="/shop"
                onClick={() => setIsWishlistOpen(false)}
                className="btn-primary"
              >
                DISCOVER SCENTS
              </Link>
            </div>
          ) : (
            wishlistedProducts.map((product) => (
              <div
                key={product.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '84px 1fr',
                  gap: '16px',
                  paddingBottom: '20px',
                  borderBottom: '1px solid rgba(25, 24, 23, 0.06)',
                }}
              >
                <div
                  style={{
                    width: '84px',
                    height: '100px',
                    borderRadius: '2px',
                    overflow: 'hidden',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid rgba(25, 24, 23, 0.08)',
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Link
                        to={`/product/${product.id}`}
                        onClick={() => setIsWishlistOpen(false)}
                        style={{
                          fontSize: '0.98rem',
                          fontFamily: 'var(--font-heading)',
                          fontWeight: 500,
                          color: '#191817',
                        }}
                      >
                        {product.name}
                      </Link>
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        aria-label="Remove from wishlist"
                        style={{
                          color: '#A09C95',
                          padding: '4px',
                          transition: 'color 0.2s',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#B8976C'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#A09C95'}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    <div style={{ fontSize: '0.75rem', color: '#6B6761', marginTop: '2px' }}>
                      {product.category} • {product.fragranceFamily}
                    </div>

                    <div style={{ fontSize: '0.9rem', color: '#191817', fontWeight: 500, marginTop: '6px' }}>
                      ${product.price}
                    </div>
                  </div>

                  <button
                    onClick={() => moveWishlistToCart(product.id)}
                    className="btn-outline"
                    style={{
                      padding: '8px 14px',
                      fontSize: '0.68rem',
                      alignSelf: 'flex-start',
                      marginTop: '8px',
                      gap: '6px'
                    }}
                  >
                    <ShoppingBag size={12} />
                    <span>MOVE TO BAG</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {wishlistedProducts.length > 0 && (
          <div
            style={{
              padding: '20px 28px',
              backgroundColor: '#FFFFFF',
              borderTop: '1px solid rgba(25, 24, 23, 0.08)',
            }}
          >
            <Link
              to="/wishlist"
              onClick={() => setIsWishlistOpen(false)}
              className="btn-primary"
              style={{ width: '100%', gap: '8px' }}
            >
              <span>VIEW FULL WISHLIST PAGE</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
