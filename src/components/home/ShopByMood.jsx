import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { FRAGRANCE_FAMILIES } from '../../data/products';

export const ShopByMood = () => {
  return (
    <section
      style={{
        paddingTop: '96px',
        paddingBottom: '96px',
        backgroundColor: '#F3EFE8',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-subtitle">OLFACTORY FAMILIES</span>
          <h2 className="section-title">SHOP BY MOOD & ESSENCE</h2>
          <div className="editorial-divider" />
          <p className="section-description">
            Fragrance is an intimate expression of emotion. Navigate our olfactory realms to discover the mood that mirrors your inner spirit.
          </p>
        </div>

        {/* 6 Category Tiles */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
          }}
        >
          {FRAGRANCE_FAMILIES.map((family) => (
            <Link
              key={family.name}
              to={`/shop?family=${family.name}`}
              style={{
                position: 'relative',
                height: '360px',
                borderRadius: '2px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '32px',
                boxShadow: 'var(--shadow-sm)',
                transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 18px 36px rgba(0, 0, 0, 0.12)';
                const img = e.currentTarget.querySelector('img');
                if (img) img.style.transform = 'scale(1.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                const img = e.currentTarget.querySelector('img');
                if (img) img.style.transform = 'scale(1)';
              }}
            >
              {/* Background Image with Transition */}
              <img
                src={family.image}
                alt={`${family.name} fragrance family`}
                loading="lazy"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              />

              {/* Gradient Scrim for Legibility */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(18, 17, 16, 0.85) 0%, rgba(18, 17, 16, 0.3) 60%, rgba(18, 17, 16, 0.1) 100%)',
                }}
              />

              {/* Text & Indicator */}
              <div style={{ position: 'relative', zIndex: 2, color: '#FAF8F5' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '2rem',
                      letterSpacing: '0.04em',
                      fontWeight: 400,
                    }}
                  >
                    {family.name}
                  </h3>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255, 255, 255, 0.15)',
                      backdropFilter: 'blur(4px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FAF8F5',
                    }}
                  >
                    <ArrowUpRight size={18} />
                  </div>
                </div>

                <p
                  style={{
                    fontSize: '0.84rem',
                    color: '#D4CFCA',
                    lineHeight: 1.5,
                    maxWidth: '300px',
                  }}
                >
                  {family.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
