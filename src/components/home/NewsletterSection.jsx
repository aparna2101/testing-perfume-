import React, { useState } from 'react';
import { Sparkles, Check } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const NewsletterSection = () => {
  const { showToast } = useShop();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please provide a valid email address.', 'info');
      return;
    }
    setSubscribed(true);
    showToast('You have been subscribed to ÉLAN Parfumerie.', 'success');
  };

  return (
    <section
      style={{
        paddingTop: '100px',
        paddingBottom: '100px',
        backgroundColor: '#1E1C1A',
        color: '#FAF8F5',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle background glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(184, 151, 108, 0.12) 0%, rgba(0,0,0,0) 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2, maxWidth: '640px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
          <Sparkles size={14} color="#B8976C" />
          <span
            style={{
              fontSize: '0.7rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: '#B8976C',
              fontWeight: 500,
            }}
          >
            PRIVÉ INVITATION
          </span>
        </div>

        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.2rem, 4vw, 3rem)',
            color: '#FAF8F5',
            letterSpacing: '0.08em',
            marginBottom: '16px',
          }}
        >
          ENTER THE WORLD OF ÉLAN
        </h2>

        <p
          style={{
            fontSize: '0.96rem',
            color: '#D4CFCA',
            lineHeight: 1.7,
            marginBottom: '36px',
            fontWeight: 300,
          }}
        >
          Receive fragrance stories, new launches and private offers. Subscribers receive early access to limited seasonal harvests and private boutique masterclasses.
        </p>

        {subscribed ? (
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: 'rgba(184, 151, 108, 0.15)',
              border: '1px solid #B8976C',
              padding: '16px 28px',
              borderRadius: '2px',
              color: '#FAF8F5',
              fontSize: '0.9rem',
            }}
          >
            <Check size={18} color="#B8976C" />
            <span>Thank you. You are now welcomed into the Maison ÉLAN registry.</span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
              justifyContent: 'center',
              maxWidth: '520px',
              margin: '0 auto',
            }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              style={{
                flex: '1 1 280px',
                padding: '14px 20px',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '2px',
                color: '#FAF8F5',
                fontSize: '0.88rem',
                outline: 'none',
                fontFamily: 'inherit',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#B8976C')}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)')}
            />
            <button
              type="submit"
              className="btn-gold"
              style={{
                flex: '0 0 auto',
                padding: '14px 30px',
              }}
            >
              SUBSCRIBE
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
