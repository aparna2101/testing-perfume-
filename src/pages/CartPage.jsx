import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ArrowRight, ShoppingBag, ShieldCheck, Sparkles, Gift } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { QuantitySelector } from '../components/common/QuantitySelector';

export const CartPage = () => {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    cartSubtotal,
    shippingCost,
    isFreeShipping,
    cartTotal,
    shippingThreshold,
    setIsCheckoutOpen
  } = useShop();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
          <span className="section-subtitle">YOUR SELECTION</span>
          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.4rem, 4vw, 3.4rem)',
              letterSpacing: '0.08em',
              fontWeight: 400,
              marginBottom: '10px',
            }}
          >
            SHOPPING BAG ({cart.reduce((sum, item) => sum + item.quantity, 0)})
          </h1>
          <p style={{ color: '#5C5955', fontSize: '0.92rem' }}>
            {isFreeShipping
              ? '✨ You qualify for complimentary luxury white-glove delivery'
              : `Add $${(shippingThreshold - cartSubtotal).toFixed(2)} more for complimentary shipping`}
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '54px' }}>
        {cart.length === 0 ? (
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
              <ShoppingBag size={28} />
            </div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', marginBottom: '10px' }}>
              Your Bag is Empty
            </h2>
            <p style={{ color: '#6B6761', fontSize: '0.9rem', marginBottom: '28px' }}>
              Explore our Haute Parfumerie collection to curate your signature fragrances.
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
              gridTemplateColumns: '1.8fr 1fr',
              gap: '48px',
              alignItems: 'start',
            }}
            className="cart-layout"
          >
            {/* Left: Cart Items List */}
            <div>
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '3px',
                  border: '1px solid rgba(25, 24, 23, 0.08)',
                  padding: '28px',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {cart.map((item) => (
                    <div
                      key={`${item.id}-${item.size}`}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '100px 1fr auto',
                        gap: '20px',
                        paddingBottom: '24px',
                        borderBottom: '1px solid rgba(25, 24, 23, 0.06)',
                        alignItems: 'center',
                      }}
                    >
                      <div
                        style={{
                          width: '100px',
                          height: '120px',
                          backgroundColor: '#F3EFE8',
                          borderRadius: '2px',
                          overflow: 'hidden',
                        }}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>

                      <div>
                        <Link
                          to={`/product/${item.id}`}
                          style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: '1.15rem',
                            fontWeight: 500,
                            color: '#191817',
                          }}
                        >
                          {item.name}
                        </Link>
                        <div style={{ fontSize: '0.8rem', color: '#6B6761', margin: '4px 0' }}>
                          Size: <strong style={{ color: '#191817' }}>{item.size}</strong>
                        </div>
                        <div style={{ fontSize: '0.95rem', fontWeight: 500, color: '#191817', marginBottom: '10px' }}>
                          ${item.price} each
                        </div>

                        <QuantitySelector
                          size="small"
                          quantity={item.quantity}
                          onDecrease={() => updateCartQuantity(item.id, item.size, item.quantity - 1)}
                          onIncrease={() => updateCartQuantity(item.id, item.size, item.quantity + 1)}
                        />
                      </div>

                      <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between', height: '100%' }}>
                        <button
                          onClick={() => removeFromCart(item.id, item.size)}
                          style={{ color: '#9C9890', padding: '6px' }}
                          title="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                        <div style={{ fontSize: '1.15rem', fontWeight: 600, color: '#191817', fontFamily: 'var(--font-heading)' }}>
                          ${item.price * item.quantity}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Summary Card */}
            <div>
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '3px',
                  border: '1px solid rgba(25, 24, 23, 0.08)',
                  padding: '28px',
                }}
              >
                <h3
                  style={{
                    fontSize: '1.05rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    fontFamily: 'var(--font-heading)',
                    paddingBottom: '16px',
                    borderBottom: '1px solid rgba(25, 24, 23, 0.08)',
                    marginBottom: '20px',
                  }}
                >
                  ORDER SUMMARY
                </h3>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '0.9rem', color: '#5C5955' }}>
                  <span>Bag Subtotal</span>
                  <span style={{ color: '#191817', fontWeight: 500 }}>${cartSubtotal}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '0.9rem', color: '#5C5955' }}>
                  <span>Luxury Delivery</span>
                  <span style={{ color: isFreeShipping ? '#8F7249' : '#191817', fontWeight: 500 }}>
                    {isFreeShipping ? 'COMPLIMENTARY' : `$${shippingCost}`}
                  </span>
                </div>

                <div
                  style={{
                    padding: '12px',
                    backgroundColor: '#FAF5ED',
                    borderRadius: '2px',
                    marginBottom: '20px',
                    border: '1px solid rgba(184, 151, 108, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontSize: '0.78rem',
                    color: '#8F7249',
                  }}
                >
                  <Sparkles size={16} />
                  <span>Includes 2 complimentary 2ml discovery samples.</span>
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    paddingTop: '16px',
                    borderTop: '1px solid rgba(25, 24, 23, 0.08)',
                    marginBottom: '24px',
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    color: '#191817',
                    fontFamily: 'var(--font-heading)',
                  }}
                >
                  <span>Grand Total</span>
                  <span>${cartTotal}</span>
                </div>

                <button
                  onClick={() => setIsCheckoutOpen(true)}
                  className="btn-primary"
                  style={{ width: '100%', gap: '10px', padding: '16px' }}
                >
                  <span>PROCEED TO DEMO CHECKOUT</span>
                  <ArrowRight size={15} />
                </button>

                <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.74rem', color: '#8E8A83' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <ShieldCheck size={14} color="#B8976C" />
                    <span>100% Authentic Hand-Numbered Bottles</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Gift size={14} color="#B8976C" />
                    <span>Complimentary Signature Gift Boxing & Wax Seal</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 860px) {
          .cart-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
