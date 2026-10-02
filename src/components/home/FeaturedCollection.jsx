import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../product/ProductCard';

export const FeaturedCollection = () => {
  // Grab the 4 iconic signature perfumes
  const featured = PRODUCTS.filter((p) =>
    ['elan-no-01', 'santal-eclat', 'rose-nocturne', 'oud-lumiere'].includes(p.id)
  );

  return (
    <section
      id="featured-signature"
      style={{
        paddingTop: '96px',
        paddingBottom: '96px',
        backgroundColor: '#FAF8F5',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-subtitle">MAISON ÉLAN ICONICS</span>
          <h2 className="section-title">THE SIGNATURE COLLECTION</h2>
          <div className="editorial-divider" />
          <p className="section-description">
            Four defining pillars of Haute Parfumerie. Formulated with unprecedented concentrations of natural oils to linger softly on the skin for over twelve hours.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '30px',
            marginBottom: '48px',
          }}
        >
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign: 'center' }}>
          <Link
            to="/collections/signature-collection"
            className="btn-outline"
            style={{ gap: '10px' }}
          >
            <span>DISCOVER THE FULL SIGNATURE COLLECTION</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
};
