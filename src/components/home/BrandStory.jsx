import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';

export const BrandStory = () => {
  return (
    <section
      style={{
        paddingTop: '96px',
        paddingBottom: '96px',
        backgroundColor: '#161514',
        color: '#FAF8F5',
        overflow: 'hidden',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '56px',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Luxury Imagery */}
          <div style={{ position: 'relative' }}>
            <div
              style={{
                position: 'relative',
                borderRadius: '2px',
                overflow: 'hidden',
                boxShadow: '0 24px 60px rgba(0, 0, 0, 0.4)',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1200&q=85"
                alt="ÉLAN Perfume crafting in Grasse"
                loading="lazy"
                style={{
                  width: '100%',
                  height: '520px',
                  objectFit: 'cover',
                  filter: 'contrast(1.05) brightness(0.95)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  border: '1px solid rgba(184, 151, 108, 0.25)',
                  margin: '14px',
                  pointerEvents: 'none',
                }}
              />
            </div>

            {/* Overlapping Badge */}
            <div
              style={{
                position: 'absolute',
                bottom: '-20px',
                right: '-20px',
                backgroundColor: '#B8976C',
                color: '#FAF8F5',
                padding: '20px 24px',
                borderRadius: '2px',
                boxShadow: '0 12px 30px rgba(0, 0, 0, 0.3)',
                maxWidth: '220px',
              }}
              className="desktop-only"
            >
              <div style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)', fontWeight: 600 }}>
                100%
              </div>
              <div style={{ fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', lineHeight: 1.4 }}>
                Natural Alcohol & Cold-Extracted Florals
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Text */}
          <div style={{ paddingRight: '20px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Sparkles size={14} color="#B8976C" />
              <span
                style={{
                  fontSize: '0.7rem',
                  letterSpacing: '0.24em',
                  textTransform: 'uppercase',
                  color: '#B8976C',
                  fontWeight: 500,
                }}
              >
                MAISON HERITAGE & VISION
              </span>
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)',
                color: '#FAF8F5',
                letterSpacing: '0.04em',
                lineHeight: 1.2,
                marginBottom: '24px',
              }}
            >
              THE ART OF SCENT
            </h2>

            <p
              style={{
                fontSize: '0.96rem',
                color: '#D4CFCA',
                lineHeight: 1.8,
                marginBottom: '18px',
                fontWeight: 300,
              }}
            >
              At ÉLAN, we believe that true luxury lies in restraint. We create refined fragrances inspired by memories, places, and silent emotion—capturing fleeting moments in bottles of exquisite clarity.
            </p>

            <p
              style={{
                fontSize: '0.96rem',
                color: '#A09C95',
                lineHeight: 1.8,
                marginBottom: '36px',
                fontWeight: 300,
              }}
            >
              Rooted in the historic perfume capital of Grasse, our Master Perfumers blend venerable French tradition with contemporary olfactory architecture. We prioritize wild-harvested botanicals and organic grain alcohol, allowing the fragrance to breathe with your skin.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
              <Link
                to="/about"
                className="btn-gold"
                style={{ gap: '10px' }}
              >
                <span>DISCOVER OUR STORY</span>
                <ArrowRight size={14} />
              </Link>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.7rem', color: '#B8976C', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                  ATELIER ADDRESS
                </span>
                <span style={{ fontSize: '0.82rem', color: '#FAF8F5' }}>
                  Route de Cannes, Grasse, France
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
