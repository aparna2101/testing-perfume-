import React, { useState } from 'react';
import { X, Check, ShieldCheck, Sparkles, Gift, ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS } from '../../data/products';

export const DemoCheckoutModal = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartSubtotal,
    shippingCost,
    cartTotal,
    clearCart,
    showToast
  } = useShop();

  const [step, setStep] = useState(1); // 1: Samples & Gift, 2: Shipping, 3: Success
  const [selectedSamples, setSelectedSamples] = useState(['elan-no-01', 'santal-eclat']);
  const [giftWrap, setGiftWrap] = useState(true);
  const [giftMessage, setGiftMessage] = useState('With warmest regards.');
  const [orderNumber, setOrderNumber] = useState('');

  const [formData, setFormData] = useState({
    firstName: 'Eleanor',
    lastName: 'Vane',
    email: 'eleanor.vane@parfum-luxury.com',
    address: '742 Evergreen Terrace, Suite 4',
    city: 'New York',
    zip: '10021',
    country: 'United States',
  });

  if (!isCheckoutOpen) return null;

  const handleSampleToggle = (id) => {
    if (selectedSamples.includes(id)) {
      setSelectedSamples(selectedSamples.filter((s) => s !== id));
    } else {
      if (selectedSamples.length < 2) {
        setSelectedSamples([...selectedSamples, id]);
      } else {
        setSelectedSamples([selectedSamples[1], id]);
      }
    }
  };

  const handleCompleteOrder = (e) => {
    e.preventDefault();
    const generatedOrderNum = `ELAN-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(generatedOrderNum);
    setStep(3);
    clearCart();
    showToast(`Order confirmed! Order #${generatedOrderNum}`, 'success');
  };

  const sampleChoices = PRODUCTS.slice(0, 4);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9600,
        backgroundColor: 'rgba(25, 24, 23, 0.65)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        animation: 'fadeIn 0.3s ease',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '680px',
          maxHeight: '90vh',
          backgroundColor: '#FAF8F5',
          borderRadius: '4px',
          boxShadow: 'var(--shadow-lg)',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        {/* Top Header */}
        <div
          style={{
            padding: '20px 28px',
            backgroundColor: '#191817',
            color: '#FAF8F5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <span style={{ fontSize: '0.65rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: '#B8976C', display: 'block' }}>
              Haute Parfumerie Boutique
            </span>
            <h2 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)', letterSpacing: '0.04em' }}>
              {step === 3 ? 'ORDER CONFIRMATION' : 'EXPRESS LUXURY CHECKOUT (DEMO)'}
            </h2>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            aria-label="Close checkout"
            style={{ color: '#D4CFCA', padding: '6px', transition: 'color 0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#D4CFCA'}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '28px' }}>
          {step === 1 && (
            <div>
              {/* Step 1: Samples & Packaging */}
              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <Sparkles size={16} color="#B8976C" />
                  <h3 style={{ fontSize: '1.05rem', fontFamily: 'var(--font-heading)' }}>
                    Select Your 2 Complimentary Deluxe Samples (2ml)
                  </h3>
                </div>
                <p style={{ fontSize: '0.82rem', color: '#5C5955', marginBottom: '16px' }}>
                  Each order includes two hand-poured travel vials to discover new fragrance signatures.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px' }}>
                  {sampleChoices.map((sample) => {
                    const isSelected = selectedSamples.includes(sample.id);
                    return (
                      <div
                        key={sample.id}
                        onClick={() => handleSampleToggle(sample.id)}
                        style={{
                          border: isSelected ? '1px solid #B8976C' : '1px solid rgba(25, 24, 23, 0.1)',
                          backgroundColor: isSelected ? '#FAF5ED' : '#FFFFFF',
                          padding: '12px 10px',
                          borderRadius: '2px',
                          cursor: 'pointer',
                          textAlign: 'center',
                          transition: 'all 0.2s',
                          position: 'relative',
                        }}
                      >
                        {isSelected && (
                          <div
                            style={{
                              position: 'absolute',
                              top: '6px',
                              right: '6px',
                              width: '16px',
                              height: '16px',
                              borderRadius: '50%',
                              backgroundColor: '#B8976C',
                              color: '#FFFFFF',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <Check size={10} strokeWidth={3} />
                          </div>
                        )}
                        <img
                          src={sample.image}
                          alt={sample.name}
                          style={{ width: '40px', height: '48px', objectFit: 'cover', margin: '0 auto 8px', borderRadius: '2px' }}
                        />
                        <div style={{ fontSize: '0.8rem', fontWeight: 500, color: '#191817' }}>{sample.name}</div>
                        <div style={{ fontSize: '0.68rem', color: '#8E8A83' }}>{sample.category}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Complimentary Gift Box & Wax Seal Card */}
              <div
                style={{
                  padding: '18px',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '3px',
                  border: '1px solid rgba(25, 24, 23, 0.08)',
                  marginBottom: '24px',
                }}
              >
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={giftWrap}
                    onChange={(e) => setGiftWrap(e.target.checked)}
                    style={{ accentColor: '#B8976C', width: '16px', height: '16px', marginTop: '3px' }}
                  />
                  <div>
                    <span style={{ fontSize: '0.88rem', fontWeight: 500, color: '#191817', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Gift size={15} color="#B8976C" />
                      Complimentary ÉLAN Monogram Gift Packaging & Wax Seal
                    </span>
                    <p style={{ fontSize: '0.78rem', color: '#6B6761', marginTop: '2px' }}>
                      Presented in our signature textured charcoal box wrapped with champagne grosgrain ribbon.
                    </p>
                  </div>
                </label>

                {giftWrap && (
                  <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px dashed rgba(25, 24, 23, 0.1)' }}>
                    <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#8E8A83', display: 'block', marginBottom: '6px' }}>
                      Personalized Calligraphy Note
                    </label>
                    <input
                      type="text"
                      value={giftMessage}
                      onChange={(e) => setGiftMessage(e.target.value)}
                      placeholder="Write your personal message..."
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: '1px solid rgba(25, 24, 23, 0.15)',
                        borderRadius: '2px',
                        fontSize: '0.85rem',
                        fontStyle: 'italic',
                        backgroundColor: '#FAF8F5',
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Step 1 Actions */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.95rem', fontWeight: 500 }}>
                  Order Total: <strong style={{ color: '#191817' }}>${cartTotal}</strong>
                </span>
                <button
                  onClick={() => setStep(2)}
                  className="btn-primary"
                  style={{ gap: '8px' }}
                >
                  <span>CONTINUE TO SHIPPING</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleCompleteOrder}>
              <h3 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-heading)', marginBottom: '16px' }}>
                Shipping & Contact Information
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                <div>
                  <label style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#8E8A83', display: 'block', marginBottom: '4px' }}>
                    First Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid rgba(25, 24, 23, 0.15)', borderRadius: '2px' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#8E8A83', display: 'block', marginBottom: '4px' }}>
                    Last Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid rgba(25, 24, 23, 0.15)', borderRadius: '2px' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#8E8A83', display: 'block', marginBottom: '4px' }}>
                  Email Address for Delivery Tracking
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid rgba(25, 24, 23, 0.15)', borderRadius: '2px' }}
                />
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#8E8A83', display: 'block', marginBottom: '4px' }}>
                  Delivery Address
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid rgba(25, 24, 23, 0.15)', borderRadius: '2px' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '12px', marginBottom: '20px' }}>
                <div>
                  <label style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#8E8A83', display: 'block', marginBottom: '4px' }}>
                    City
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid rgba(25, 24, 23, 0.15)', borderRadius: '2px' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#8E8A83', display: 'block', marginBottom: '4px' }}>
                    Postal Code
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.zip}
                    onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid rgba(25, 24, 23, 0.15)', borderRadius: '2px' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#8E8A83', display: 'block', marginBottom: '4px' }}>
                    Country
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid rgba(25, 24, 23, 0.15)', borderRadius: '2px' }}
                  />
                </div>
              </div>

              {/* Demo Payment Notice */}
              <div
                style={{
                  padding: '14px',
                  backgroundColor: '#F3EFE8',
                  borderRadius: '3px',
                  marginBottom: '20px',
                  border: '1px solid rgba(184, 151, 108, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontSize: '0.78rem',
                  color: '#5C5955',
                }}
              >
                <ShieldCheck size={18} color="#B8976C" />
                <span>
                  <strong>Frontend Demo Mode:</strong> No real payment card is charged. Clicking "Place Demo Order" simulates an authenticated luxury transaction.
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  style={{ fontSize: '0.78rem', textDecoration: 'underline', color: '#5C5955' }}
                >
                  Back to samples
                </button>
                <button
                  type="submit"
                  className="btn-gold"
                  style={{ gap: '8px' }}
                >
                  <span>PLACE DEMO ORDER (${cartTotal})</span>
                  <Check size={14} />
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div style={{ textAlign: 'center', padding: '30px 10px' }}>
              <div
                style={{
                  width: '68px',
                  height: '68px',
                  borderRadius: '50%',
                  backgroundColor: '#FAF5ED',
                  border: '2px solid #B8976C',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  color: '#B8976C',
                }}
              >
                <Check size={32} />
              </div>

              <span style={{ fontSize: '0.72rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: '#B8976C', fontWeight: 500 }}>
                Merci Beaucoup
              </span>
              <h3 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-heading)', margin: '8px 0 12px' }}>
                Your Scent Journey Has Begun
              </h3>

              <p style={{ color: '#5C5955', fontSize: '0.9rem', maxWidth: '460px', margin: '0 auto 24px', lineHeight: 1.6 }}>
                Order <strong>{orderNumber}</strong> has been registered. Your fragrances are being carefully prepared and packaged by hand in Grasse, France.
              </p>

              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  padding: '20px',
                  borderRadius: '3px',
                  border: '1px solid rgba(25, 24, 23, 0.08)',
                  maxWidth: '420px',
                  margin: '0 auto 28px',
                  textAlign: 'left',
                  fontSize: '0.82rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: '#8E8A83' }}>Recipient:</span>
                  <span style={{ fontWeight: 500 }}>{formData.firstName} {formData.lastName}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: '#8E8A83' }}>Destination:</span>
                  <span style={{ fontWeight: 500 }}>{formData.city}, {formData.country}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: '#8E8A83' }}>Gift Packaging:</span>
                  <span style={{ color: '#B8976C', fontWeight: 500 }}>Included (Wax Seal)</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#8E8A83' }}>Estimated Delivery:</span>
                  <span style={{ fontWeight: 500 }}>2 - 4 Business Days</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsCheckoutOpen(false);
                  setStep(1);
                }}
                className="btn-primary"
              >
                RETURN TO BOUTIQUE
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
