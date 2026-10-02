import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

// Clean luxury minimalist social icons
const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
    <polygon points="10 15 15 12 10 9 10 15"/>
  </svg>
);

export const Footer = () => {
  const { showToast } = useShop();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address.', 'info');
      return;
    }
    setSubscribed(true);
    showToast('Welcome to the inner circle of ÉLAN PARFUM.', 'success');
    setEmail('');
  };

  return (
    <footer
      style={{
        backgroundColor: '#121110',
        color: '#FAF8F5',
        paddingTop: '80px',
        paddingBottom: '40px',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      <div className="container">
        {/* Main 4-column Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '48px',
            marginBottom: '64px',
          }}
        >
          {/* Col 1: Brand & Philosophy */}
          <div>
            <div style={{ marginBottom: '20px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '2rem',
                  letterSpacing: '0.24em',
                  display: 'block',
                  lineHeight: 1,
                  color: '#FAF8F5',
                }}
              >
                ÉLAN
              </span>
              <span
                style={{
                  fontSize: '0.55rem',
                  letterSpacing: '0.36em',
                  textTransform: 'uppercase',
                  color: '#B8976C',
                  marginTop: '4px',
                  display: 'block',
                }}
              >
                HAUTE PARFUMERIE
              </span>
            </div>
            <p
              style={{
                fontSize: '0.84rem',
                color: '#A09C95',
                lineHeight: 1.7,
                marginBottom: '24px',
                maxWidth: '280px',
              }}
            >
              Independent perfumery dedicated to rare natural extractions, slow craftsmanship, and the quiet poetry of personal scent.
            </p>
            <div style={{ display: 'flex', gap: '14px' }}>
              {[
                { icon: <InstagramIcon />, label: 'Instagram' },
                { icon: <FacebookIcon />, label: 'Facebook' },
                { icon: <TwitterIcon />, label: 'Twitter' },
                { icon: <YoutubeIcon />, label: 'YouTube' },
              ].map((item, idx) => (
                <a
                  key={idx}
                  href="#social"
                  aria-label={item.label}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FAF8F5',
                    transition: 'all 0.25s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#B8976C';
                    e.currentTarget.style.color = '#B8976C';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                    e.currentTarget.style.color = '#FAF8F5';
                    e.currentTarget.style.transform = 'none';
                  }}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Olfactory Collections */}
          <div>
            <h4
              style={{
                fontSize: '0.75rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#B8976C',
                marginBottom: '20px',
                fontWeight: 600,
              }}
            >
              The Collections
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { label: 'Signature Collection', path: '/collections/signature-collection' },
                { label: 'Midnight Collection', path: '/collections/midnight-collection' },
                { label: 'Botanical Collection', path: '/collections/botanical-collection' },
                { label: 'Oud Collection', path: '/collections/oud-collection' },
                { label: 'Essentials & Discovery', path: '/collections/essentials' },
                { label: 'All Fragrances', path: '/shop' },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    style={{
                      fontSize: '0.84rem',
                      color: '#B8B3AA',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#FAF8F5')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#B8B3AA')}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Customer Care */}
          <div>
            <h4
              style={{
                fontSize: '0.75rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#B8976C',
                marginBottom: '20px',
                fontWeight: 600,
              }}
            >
              Client Care & Maison
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { label: 'Our Heritage & Grasse Atelier', path: '/about' },
                { label: 'Find Your Scent Ritual', path: '/#scent-finder' },
                { label: 'Complimentary Samples Policy', path: '/about#samples' },
                { label: 'Shipping & White Glove Delivery', path: '/about#shipping' },
                { label: 'Sustainable Packaging', path: '/about#sustainability' },
                { label: 'VIP Fragrance Concierge', path: '/about#concierge' },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    style={{
                      fontSize: '0.84rem',
                      color: '#B8B3AA',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#FAF8F5')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#B8B3AA')}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <h4
              style={{
                fontSize: '0.75rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#B8976C',
                marginBottom: '14px',
                fontWeight: 600,
              }}
            >
              The Inner Circle
            </h4>
            <p style={{ fontSize: '0.84rem', color: '#A09C95', marginBottom: '16px', lineHeight: 1.6 }}>
              Receive fragrance stories, private invitations to limited harvests, and archival bottle allocations.
            </p>

            {subscribed ? (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#B8976C',
                  fontSize: '0.85rem',
                  padding: '12px 0',
                }}
              >
                <Check size={18} />
                <span>You are subscribed to the ÉLAN journal.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe}>
                <div
                  style={{
                    display: 'flex',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.25)',
                    paddingBottom: '8px',
                    transition: 'border-color 0.2s',
                  }}
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    style={{
                      background: 'transparent',
                      border: 'none',
                      outline: 'none',
                      color: '#FAF8F5',
                      fontSize: '0.85rem',
                      width: '100%',
                      fontFamily: 'inherit',
                    }}
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe to newsletter"
                    style={{
                      color: '#B8976C',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '4px',
                      transition: 'transform 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateX(3px)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'none')}
                  >
                    <ArrowRight size={17} />
                  </button>
                </div>
              </form>
            )}

            <div style={{ marginTop: '20px', fontSize: '0.72rem', color: '#736F68', lineHeight: 1.5 }}>
              By subscribing, you agree to receive communications from ÉLAN. You may unsubscribe at any moment.
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div
          style={{
            paddingTop: '32px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
            fontSize: '0.74rem',
            color: '#736F68',
          }}
        >
          <div>
            © {new Date().getFullYear()} ÉLAN PARFUM PARIS. ALL RIGHTS RESERVED. HAUTE PARFUMERIE MADE IN FRANCE.
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <Link to="/about" style={{ color: '#736F68' }}>Privacy Policy</Link>
            <Link to="/about" style={{ color: '#736F68' }}>Terms of Service</Link>
            <Link to="/about" style={{ color: '#736F68' }}>Accessibility Statement</Link>
            <Link to="/about" style={{ color: '#736F68' }}>Cookie Preferences</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
