import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag, User, Menu, X } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const Navbar = () => {
  const {
    cartItemCount,
    wishlist,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsSearchOpen,
    setIsAccountOpen,
  } = useShop();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Shop', path: '/shop' },
    { label: 'Women', path: '/shop?gender=Women' },
    { label: 'Men', path: '/shop?gender=Men' },
    { label: 'Unisex', path: '/shop?gender=Unisex' },
    { label: 'Collections', path: '/collections' },
    { label: 'About', path: '/about' },
  ];

  return (
    <>
      {/* Top Announcement Bar */}
      <div
        style={{
          backgroundColor: '#191817',
          color: '#FAF8F5',
          fontSize: '0.68rem',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          padding: '8px 16px',
          textAlign: 'center',
          fontWeight: 400,
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <span>
          COMPLIMENTARY DELIVERY & 2 DELUXE SAMPLES WITH EVERY PURCHASE • HAND-CRAFTED IN GRASSE
        </span>
      </div>

      {/* Main Sticky Navbar */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 8000,
          backgroundColor: isScrolled ? 'rgba(250, 248, 245, 0.96)' : 'rgba(250, 248, 245, 0.9)',
          backdropFilter: 'blur(10px)',
          borderBottom: isScrolled
            ? '1px solid rgba(25, 24, 23, 0.08)'
            : '1px solid rgba(25, 24, 23, 0.05)',
          transition: 'all 0.3s ease',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '74px',
          }}
        >
          {/* Mobile Menu Button (Left on mobile) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open mobile menu"
              className="mobile-only"
              style={{
                display: 'none',
                padding: '6px',
                color: '#191817',
              }}
            >
              <Menu size={22} />
            </button>

            {/* Desktop Navigation Links */}
            <nav
              className="desktop-only"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '24px',
              }}
            >
              {navLinks.map((link) => {
                const isActive =
                  location.pathname === link.path ||
                  (link.path.includes('?') &&
                    location.pathname + location.search === link.path);

                return (
                  <Link
                    key={link.label}
                    to={link.path}
                    style={{
                      fontSize: '0.74rem',
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: isActive ? '#191817' : '#5C5955',
                      fontWeight: isActive ? 600 : 400,
                      position: 'relative',
                      padding: '4px 0',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#B8976C')}
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = isActive ? '#191817' : '#5C5955')
                    }
                  >
                    {link.label}
                    {isActive && (
                      <span
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: '1px',
                          backgroundColor: '#B8976C',
                        }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Centered Brand Logo */}
          <div style={{ textAlign: 'center' }}>
            <Link
              to="/"
              style={{
                display: 'inline-flex',
                flexDirection: 'column',
                alignItems: 'center',
                textDecoration: 'none',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.9rem',
                  letterSpacing: '0.24em',
                  fontWeight: 400,
                  color: '#191817',
                  lineHeight: 1,
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
                  marginTop: '3px',
                }}
              >
                PARFUM PARIS
              </span>
            </Link>
          </div>

          {/* Right Action Icons */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            {/* Search Icon */}
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search perfumes"
              style={{
                padding: '6px',
                color: '#191817',
                display: 'flex',
                alignItems: 'center',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#B8976C')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#191817')}
            >
              <Search size={19} strokeWidth={1.75} />
            </button>

            {/* Account Icon */}
            <button
              onClick={() => setIsAccountOpen(true)}
              aria-label="Account and membership"
              style={{
                padding: '6px',
                color: '#191817',
                display: 'flex',
                alignItems: 'center',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#B8976C')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#191817')}
            >
              <User size={19} strokeWidth={1.75} />
            </button>

            {/* Wishlist Icon with count badge */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              aria-label={`Wishlist with ${wishlist.length} items`}
              style={{
                padding: '6px',
                color: '#191817',
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#B8976C')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#191817')}
            >
              <Heart
                size={19}
                strokeWidth={1.75}
                color={wishlist.length > 0 ? '#B8976C' : '#191817'}
                fill={wishlist.length > 0 ? '#B8976C' : 'none'}
              />
              {wishlist.length > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '2px',
                    right: '1px',
                    width: '15px',
                    height: '15px',
                    borderRadius: '50%',
                    backgroundColor: '#191817',
                    color: '#FAF8F5',
                    fontSize: '0.6rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Icon with count badge */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label={`Shopping bag with ${cartItemCount} items`}
              style={{
                padding: '6px',
                color: '#191817',
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#B8976C')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#191817')}
            >
              <ShoppingBag size={19} strokeWidth={1.75} />
              {cartItemCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '2px',
                    right: '1px',
                    width: '15px',
                    height: '15px',
                    borderRadius: '50%',
                    backgroundColor: '#B8976C',
                    color: '#FFFFFF',
                    fontSize: '0.6rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9990,
            display: 'flex',
          }}
        >
          <div
            onClick={() => setMobileMenuOpen(false)}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(25, 24, 23, 0.5)',
              backdropFilter: 'blur(4px)',
            }}
          />

          <div
            style={{
              position: 'relative',
              width: '85%',
              maxWidth: '340px',
              height: '100%',
              backgroundColor: '#FAF8F5',
              padding: '30px 24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: 'var(--shadow-drawer)',
              zIndex: 9991,
            }}
          >
            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '36px',
                  borderBottom: '1px solid rgba(25, 24, 23, 0.08)',
                  paddingBottom: '16px',
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.6rem',
                      letterSpacing: '0.2em',
                    }}
                  >
                    ÉLAN
                  </div>
                  <div
                    style={{
                      fontSize: '0.55rem',
                      letterSpacing: '0.28em',
                      color: '#B8976C',
                    }}
                  >
                    PARFUM PARIS
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                  style={{ padding: '6px' }}
                >
                  <X size={22} />
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      fontSize: '1rem',
                      fontFamily: 'var(--font-heading)',
                      letterSpacing: '0.08em',
                      color: '#191817',
                      padding: '4px 0',
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div
              style={{
                borderTop: '1px solid rgba(25, 24, 23, 0.08)',
                paddingTop: '20px',
                fontSize: '0.75rem',
                color: '#8E8A83',
              }}
            >
              <div style={{ marginBottom: '8px', color: '#191817', fontWeight: 500 }}>
                HAUTE PARFUMERIE
              </div>
              <div>Grasse • Paris • New York • Tokyo</div>
            </div>
          </div>
        </div>
      )}

      {/* Media query styling helper */}
      <style>{`
        @media (max-width: 900px) {
          .desktop-only {
            display: none !important;
          }
          .mobile-only {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
};
