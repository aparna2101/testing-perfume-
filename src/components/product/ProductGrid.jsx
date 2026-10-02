import React from 'react';
import { ProductCard } from './ProductCard';

export const ProductGrid = ({ products = [], loading = false, skeletonCount = 6 }) => {
  if (loading) {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
          gap: '28px',
          width: '100%'
        }}
      >
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <div
            key={index}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '2px',
              overflow: 'hidden',
              border: '1px solid rgba(25, 24, 23, 0.06)',
            }}
          >
            <div className="skeleton" style={{ width: '100%', paddingTop: '120%' }} />
            <div style={{ padding: '20px 18px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div className="skeleton" style={{ height: '12px', width: '40%' }} />
              <div className="skeleton" style={{ height: '22px', width: '70%' }} />
              <div className="skeleton" style={{ height: '14px', width: '90%' }} />
              <div className="skeleton" style={{ height: '16px', width: '30%', marginTop: '8px' }} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div
        style={{
          padding: '80px 20px',
          textAlign: 'center',
          backgroundColor: '#FFFFFF',
          border: '1px solid rgba(25, 24, 23, 0.08)',
          borderRadius: '2px',
          width: '100%',
        }}
      >
        <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', marginBottom: '8px' }}>
          No Fragrances Found
        </p>
        <p style={{ color: '#6B6761', fontSize: '0.9rem', maxWidth: '400px', margin: '0 auto' }}>
          We could not find any fragrances matching your selected criteria. Try adjusting your filters or search keywords.
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
        gap: '28px',
        width: '100%'
      }}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
