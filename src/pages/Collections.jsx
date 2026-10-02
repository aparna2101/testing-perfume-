import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { COLLECTIONS, PRODUCTS } from '../data/products';
import { ProductCard } from '../components/product/ProductCard';

export const Collections = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ backgroundColor: '#FAF8F5', minHeight: '100vh', paddingBottom: '96px' }}>
      {/* Header Banner */}
      <div
        style={{
          backgroundColor: '#F3EFE8',
          padding: '72px 0 54px',
          textAlign: 'center',
          borderBottom: '1px solid rgba(25, 24, 23, 0.08)',
        }}
      >
        <div className="container">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Sparkles size={14} color="#B8976C" />
            <span className="section-subtitle" style={{ margin: 0 }}>
              CURATED OLFACTORY ANTHOLOGIES
            </span>
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              letterSpacing: '0.08em',
              fontWeight: 400,
              marginBottom: '14px',
            }}
          >
            THE COLLECTIONS
          </h1>
          <p
            style={{
              fontSize: '0.96rem',
              color: '#5C5955',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            Explore our themed fragrance anthologies, each sculpted around distinct emotions, nocturnal mysteries, and ancient botanical heritage.
          </p>
        </div>
      </div>

      {/* Collection Chapters List */}
      <div className="container" style={{ paddingTop: '64px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '88px' }}>
          {COLLECTIONS.map((coll, idx) => {
            const collProducts = PRODUCTS.filter((p) => p.collection === coll.title);

            return (
              <div key={coll.slug} id={coll.slug}>
                {/* Editorial Collection Banner Card */}
                <div
                  style={{
                    position: 'relative',
                    height: '420px',
                    borderRadius: '3px',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '36px',
                    boxShadow: 'var(--shadow-md)',
                  }}
                >
                  <img
                    src={coll.bannerImage}
                    alt={coll.title}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to right, rgba(18, 17, 16, 0.88) 0%, rgba(18, 17, 16, 0.55) 60%, rgba(18, 17, 16, 0.3) 100%)',
                    }}
                  />

                  <div
                    style={{
                      position: 'relative',
                      zIndex: 2,
                      padding: '40px',
                      maxWidth: '640px',
                      color: '#FAF8F5',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.72rem',
                        letterSpacing: '0.24em',
                        textTransform: 'uppercase',
                        color: '#B8976C',
                        fontWeight: 600,
                        display: 'block',
                        marginBottom: '8px',
                      }}
                    >
                      {coll.tagline}
                    </span>
                    <h2
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(2rem, 3.8vw, 3rem)',
                        letterSpacing: '0.04em',
                        marginBottom: '14px',
                        color: '#FAF8F5',
                      }}
                    >
                      {coll.title}
                    </h2>
                    <p style={{ fontSize: '0.94rem', color: '#D4CFCA', lineHeight: 1.7, marginBottom: '24px' }}>
                      {coll.description}
                    </p>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '28px' }}>
                      {coll.highlights.map((h, i) => (
                        <span
                          key={i}
                          style={{
                            fontSize: '0.7rem',
                            letterSpacing: '0.08em',
                            padding: '4px 12px',
                            backgroundColor: 'rgba(255, 255, 255, 0.12)',
                            backdropFilter: 'blur(4px)',
                            borderRadius: '20px',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                          }}
                        >
                          {h}
                        </span>
                      ))}
                    </div>

                    <Link
                      to={`/collections/${coll.slug}`}
                      className="btn-gold"
                      style={{ gap: '8px' }}
                    >
                      <span>EXPLORE THIS CHAPTER</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>

                {/* Collection Preview Grid */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '24px',
                  }}
                >
                  {collProducts.slice(0, 3).map((prod) => (
                    <ProductCard key={prod.id} product={prod} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
