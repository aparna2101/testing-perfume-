import React from 'react';
import { PRODUCTS } from '../../data/products';
import { ProductCarousel } from '../product/ProductCarousel';

export const NewArrivals = () => {
  // Select new arrivals plus select latest additions
  const newArrivals = PRODUCTS.filter((p) => p.newArrival || p.id.includes('fleur') || p.id.includes('ambre') || p.id.includes('vanille'));

  return (
    <section
      style={{
        paddingTop: '96px',
        paddingBottom: '96px',
        backgroundColor: '#FAF8F5',
      }}
    >
      <div className="container">
        <ProductCarousel
          products={newArrivals}
          subtitle="FRESH FROM THE ATELIER"
          title="NEW ARRIVALS & HARVEST EDITIONS"
        />
      </div>
    </section>
  );
};
