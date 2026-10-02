import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { COLLECTIONS, PRODUCTS } from '../data/products';
import { ProductGrid } from '../components/product/ProductGrid';

export const CollectionDetail = () => {
  const { slug } = useParams();
  const collection = COLLECTIONS.find((c) => c.slug === slug) || COLLECTIONS[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const collectionProducts = PRODUCTS.filter((p) => p.collection === collection.title);

  return (
    <div style={{ backgroundColor: '#FAF8F5', minHeight: '100vh', paddingBottom: '96px' }}>
      {/* Editorial Hero Banner */}
      <div
        style={{
          position: 'relative',
          minHeight: '440px',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#161514',
          color: '#FAF8F5',
        }}
      >
        <img
          src={collection.bannerImage}
          alt={collection.title}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.45,
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(22, 21, 20, 0.4) 0%, rgba(22, 21, 20, 0.85) 100%)',
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 2, padding: '60px 20px', maxWidth: '780px' }}>
          <Link
            to="/collections"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.74rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#B8976C',
              marginBottom: '20px',
            }}
          >
            <ArrowLeft size={14} />
            <span>All Collections</span>
          </Link>

          <span
            style={{
              fontSize: '0.72rem',
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: '#DFCEB7',
              fontWeight: 500,
              display: 'block',
              marginBottom: '8px',
            }}
          >
            {collection.tagline}
          </span>

          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.6rem, 5vw, 4.2rem)',
              letterSpacing: '0.06em',
              marginBottom: '16px',
              lineHeight: 1.1,
            }}
          >
            {collection.title}
          </h1>

          <p style={{ fontSize: '1rem', color: '#D4CFCA', lineHeight: 1.8, marginBottom: '24px' }}>
            {collection.description}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {collection.highlights.map((h, i) => (
              <span
                key={i}
                style={{
                  fontSize: '0.72rem',
                  letterSpacing: '0.08em',
                  padding: '6px 14px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(4px)',
                  borderRadius: '20px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
              >
                {h}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid Section */}
      <div className="container" style={{ paddingTop: '64px' }}>
        <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)' }}>
            Creations in this Anthology ({collectionProducts.length})
          </h2>
          <span style={{ fontSize: '0.75rem', color: '#8E8A83', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
            Grasse Compounded
          </span>
        </div>

        <ProductGrid products={collectionProducts.length > 0 ? collectionProducts : PRODUCTS.slice(0, 4)} />
      </div>
    </div>
  );
};
