import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../product/ProductCard';

export const Bestsellers = () => {
  // 6 bestseller perfumes
  const bestsellers = PRODUCTS.filter((p) => p.bestseller).slice(0, 6);

  return (
    <section
      style={{
        paddingTop: '96px',
        paddingBottom: '96px',
        backgroundColor: '#FAF8F5',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-subtitle">MOST CHERISHED CREATIONS</span>
          <h2 className="section-title">THE BESTSELLERS</h2>
          <div className="editorial-divider" />
          <p className="section-description">
            Acclaimed by connoisseurs and beauty editors across the globe. These timeless compositions represent the highest expression of our perfume craftsmanship.
          </p>
        </div>

        {/* 6 Products Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
            gap: '28px',
            marginBottom: '48px',
          }}
        >
          {bestsellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign: 'center' }}>
          <Link to="/shop" className="btn-primary" style={{ gap: '10px' }}>
            <span>VIEW ALL 14 PERFUMES</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
};
