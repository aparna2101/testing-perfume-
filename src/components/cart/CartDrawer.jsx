import React from 'react';
import { Link } from 'react-router-dom';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { QuantitySelector } from '../common/QuantitySelector';

export const CartDrawer = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeFromCart,
    cartSubtotal,
    shippingCost,
    isFreeShipping,
    cartTotal,
    shippingThreshold,
    setIsCheckoutOpen
  } = useShop();

  if (!isCartOpen) return null;

  const freeShippingProgress = Math.min(100, (cartSubtotal / shippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, shippingThreshold - cartSubtotal);

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

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
        onClick={() => setIsCartOpen(false)}
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
            <ShoppingBag size={18} color="#B8976C" />
            <h2 style={{ fontSize: '1.15rem', letterSpacing: '0.06em', fontFamily: 'var(--font-heading)' }}>
              SHOPPING BAG ({cart.reduce((sum, item) => sum + item.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart"
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

        {/* Free Shipping Bar */}
        <div
          style={{
            backgroundColor: '#F3EFE8',
            padding: '14px 28px',
            borderBottom: '1px solid rgba(25, 24, 23, 0.06)',
            fontSize: '0.78rem',
            color: '#191817',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span>
              {isFreeShipping
                ? '✨ You qualify for complimentary luxury delivery'
                : `Add $${remainingForFreeShipping.toFixed(2)} more for complimentary delivery`}
            </span>
            <span style={{ fontWeight: 500, color: '#B8976C' }}>${shippingThreshold} Target</span>
          </div>
          <div
            style={{
              width: '100%',
              height: '4px',
              backgroundColor: 'rgba(25, 24, 23, 0.08)',
              borderRadius: '999px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${freeShippingProgress}%`,
                height: '100%',
                backgroundColor: '#B8976C',
                transition: 'width 0.4s ease',
              }}
            />
          </div>
        </div>

        {/* Cart Items List */}
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
          {cart.length === 0 ? (
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
                <ShoppingBag size={28} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Your Bag is Empty</h3>
              <p style={{ color: '#6B6761', fontSize: '0.85rem', marginBottom: '24px', maxWidth: '280px' }}>
                Explore our Haute Parfumerie creations and find your signature scent.
              </p>
              <Link
                to="/shop"
                onClick={() => setIsCartOpen(false)}
                className="btn-primary"
              >
                EXPLORE PERFUMES
              </Link>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={`${item.id}-${item.size}`}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '84px 1fr',
                  gap: '16px',
                  paddingBottom: '20px',
                  borderBottom: '1px solid rgba(25, 24, 23, 0.06)',
                }}
              >
                {/* Product Image */}
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
                    src={item.image}
                    alt={item.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                {/* Details */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Link
                        to={`/product/${item.id}`}
                        onClick={() => setIsCartOpen(false)}
                        style={{
                          fontSize: '0.98rem',
                          fontFamily: 'var(--font-heading)',
                          fontWeight: 500,
                          color: '#191817',
                        }}
                      >
                        {item.name}
                      </Link>
                      <button
                        onClick={() => removeFromCart(item.id, item.size)}
                        aria-label={`Remove ${item.name} from bag`}
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
                      Size: <span style={{ color: '#191817', fontWeight: 500 }}>{item.size}</span>
                    </div>

                    <div style={{ fontSize: '0.9rem', color: '#191817', fontWeight: 500, marginTop: '6px' }}>
                      ${item.price}
                    </div>
                  </div>

                  {/* Quantity and Line Total */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: '8px',
                    }}
                  >
                    <QuantitySelector
                      size="small"
                      quantity={item.quantity}
                      onDecrease={() => updateCartQuantity(item.id, item.size, item.quantity - 1)}
                      onIncrease={() => updateCartQuantity(item.id, item.size, item.quantity + 1)}
                    />
                    <span style={{ fontSize: '0.85rem', fontWeight: 500, color: '#191817' }}>
                      ${item.price * item.quantity}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Complimentary Gift Perks Note */}
        {cart.length > 0 && (
          <div
            style={{
              padding: '12px 28px',
              backgroundColor: '#FFFFFF',
              borderTop: '1px solid rgba(25, 24, 23, 0.06)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.72rem',
              color: '#8F7249',
            }}
          >
            <Sparkles size={14} />
            <span>Includes 2 complimentary 2ml deluxe samples & luxury gift box.</span>
          </div>
        )}

        {/* Footer Summary */}
        {cart.length > 0 && (
          <div
            style={{
              padding: '24px 28px',
              backgroundColor: '#FFFFFF',
              borderTop: '1px solid rgba(25, 24, 23, 0.08)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem', color: '#5C5955' }}>
              <span>Subtotal</span>
              <span style={{ color: '#191817', fontWeight: 500 }}>${cartSubtotal}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px', fontSize: '0.85rem', color: '#5C5955' }}>
              <span>Estimated Shipping</span>
              <span style={{ color: isFreeShipping ? '#8F7249' : '#191817', fontWeight: 500 }}>
                {isFreeShipping ? 'FREE' : `$${shippingCost}`}
              </span>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingTop: '12px',
                borderTop: '1px solid rgba(25, 24, 23, 0.08)',
                marginBottom: '20px',
                fontSize: '1.05rem',
                fontWeight: 600,
                color: '#191817',
              }}
            >
              <span>Total</span>
              <span>${cartTotal}</span>
            </div>

            <button
              onClick={handleProceedToCheckout}
              className="btn-primary"
              style={{ width: '100%', gap: '10px' }}
            >
              <span>PROCEED TO CHECKOUT</span>
              <ArrowRight size={15} />
            </button>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginTop: '14px',
                fontSize: '0.7rem',
                color: '#8E8A83',
              }}
            >
              <ShieldCheck size={14} />
              <span>Complimentary Returns • 100% Authentic Haute Parfumerie</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
