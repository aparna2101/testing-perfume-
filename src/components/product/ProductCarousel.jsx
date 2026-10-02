import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductCard } from './ProductCard';

export const ProductCarousel = ({ products = [], title, subtitle }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div style={{ width: '100%', position: 'relative' }}>
      {/* Header with Navigation Controls */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: '28px',
        }}
      >
        <div>
          {subtitle && (
            <span
              style={{
                fontSize: '0.7rem',
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
                color: '#B8976C',
                display: 'block',
                marginBottom: '6px',
                fontWeight: 500
              }}
            >
              {subtitle}
            </span>
          )}
          {title && (
            <h2
              style={{
                fontSize: '1.9rem',
                letterSpacing: '0.04em',
                fontFamily: 'var(--font-heading)',
              }}
            >
              {title}
            </h2>
          )}
        </div>

        {/* Arrow Buttons */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => scroll('left')}
            aria-label="Scroll left"
            style={{
              width: '42px',
              height: '42px',
              border: '1px solid rgba(25, 24, 23, 0.15)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#FFFFFF',
              color: '#191817',
              transition: 'all 0.25s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#191817';
              e.currentTarget.style.color = '#FAF8F5';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#FFFFFF';
              e.currentTarget.style.color = '#191817';
            }}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scroll('right')}
            aria-label="Scroll right"
            style={{
              width: '42px',
              height: '42px',
              border: '1px solid rgba(25, 24, 23, 0.15)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#FFFFFF',
              color: '#191817',
              transition: 'all 0.25s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#191817';
              e.currentTarget.style.color = '#FAF8F5';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#FFFFFF';
              e.currentTarget.style.color = '#191817';
            }}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Area */}
      <div
        ref={scrollRef}
        style={{
          display: 'flex',
          gap: '24px',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          paddingBottom: '16px',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              flex: '0 0 300px',
              scrollSnapAlign: 'start',
            }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};
