import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search as SearchIcon, X, ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS } from '../../data/products';

export const SearchOverlay = () => {
  const { isSearchOpen, setIsSearchOpen } = useShop();
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const filtered = query.trim()
    ? PRODUCTS.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.fragranceFamily.toLowerCase().includes(q) ||
          p.gender.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.notes.top.some((n) => n.toLowerCase().includes(q)) ||
          p.notes.heart.some((n) => n.toLowerCase().includes(q)) ||
          p.notes.base.some((n) => n.toLowerCase().includes(q))
        );
      })
    : PRODUCTS.slice(0, 4); // show trending 4 if empty

  const quickPicks = ['Sandalwood', 'Rose', 'Bergamot', 'Vanilla', 'Oud', 'Fresh', 'Floral'];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9500,
        backgroundColor: 'rgba(25, 24, 23, 0.7)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        flexDirection: 'column',
        animation: 'fadeIn 0.25s ease',
      }}
    >
      <div
        style={{
          backgroundColor: '#FAF8F5',
          borderBottom: '1px solid rgba(25, 24, 23, 0.1)',
          padding: '24px 0 32px',
          boxShadow: 'var(--shadow-md)',
        }}
      >
        <div className="container">
          {/* Header Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px',
            }}
          >
            <span
              style={{
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                color: '#8E8A83',
              }}
            >
              Haute Parfumerie Search
            </span>
            <button
              onClick={() => setIsSearchOpen(false)}
              aria-label="Close search"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: '#5C5955',
                fontSize: '0.75rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#191817'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#5C5955'}
            >
              <span>ESC</span>
              <X size={18} />
            </button>
          </div>

          {/* Search Input */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              borderBottom: '1px solid #191817',
              paddingBottom: '12px',
            }}
          >
            <SearchIcon size={24} color="#B8976C" style={{ marginRight: '16px' }} />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by perfume name, note (e.g. Sandalwood, Rose), or olfactory family..."
              style={{
                width: '100%',
                border: 'none',
                background: 'transparent',
                outline: 'none',
                fontSize: '1.35rem',
                fontFamily: 'var(--font-heading)',
                letterSpacing: '0.02em',
                color: '#191817',
              }}
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                style={{ color: '#8E8A83', padding: '4px' }}
                aria-label="Clear query"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Quick Filter Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', marginTop: '16px' }}>
            <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#8E8A83', marginRight: '6px' }}>
              Trending Notes:
            </span>
            {quickPicks.map((pick) => (
              <button
                key={pick}
                onClick={() => setQuery(pick)}
                style={{
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '0.72rem',
                  backgroundColor: query.toLowerCase() === pick.toLowerCase() ? '#191817' : '#F3EFE8',
                  color: query.toLowerCase() === pick.toLowerCase() ? '#FAF8F5' : '#5C5955',
                  transition: 'all 0.2s',
                }}
              >
                {pick}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Area */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '40px 0',
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) setIsSearchOpen(false);
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              marginBottom: '20px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              paddingBottom: '10px',
            }}
          >
            <h3 style={{ color: '#FAF8F5', fontSize: '1rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              {query ? `Search Results (${filtered.length})` : 'Popular Fragrances'}
            </h3>
            <Link
              to="/shop"
              onClick={() => setIsSearchOpen(false)}
              style={{
                color: '#B8976C',
                fontSize: '0.75rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <span>View All Catalog</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {filtered.length === 0 ? (
            <div
              style={{
                padding: '60px 20px',
                textAlign: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '4px',
                color: '#FAF8F5',
              }}
            >
              <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', marginBottom: '6px' }}>
                No fragrances found for "{query}"
              </p>
              <p style={{ color: '#B3ADA3', fontSize: '0.85rem' }}>
                Try searching for families like "Floral", "Woody", or notes like "Bergamot".
              </p>
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: '20px',
              }}
            >
              {filtered.map((item) => (
                <Link
                  key={item.id}
                  to={`/product/${item.id}`}
                  onClick={() => setIsSearchOpen(false)}
                  style={{
                    display: 'flex',
                    gap: '14px',
                    padding: '12px',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '2px',
                    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.15)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.25)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = '0 4px 14px rgba(0, 0, 0, 0.15)';
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: '70px',
                      height: '84px',
                      objectFit: 'cover',
                      borderRadius: '2px',
                      backgroundColor: '#F3EFE8',
                    }}
                  />
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <span
                      style={{
                        fontSize: '0.65rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.12em',
                        color: '#B8976C',
                        fontWeight: 500,
                      }}
                    >
                      {item.category} • {item.fragranceFamily}
                    </span>
                    <h4
                      style={{
                        fontSize: '0.98rem',
                        color: '#191817',
                        margin: '2px 0 4px',
                        fontFamily: 'var(--font-heading)',
                      }}
                    >
                      {item.name}
                    </h4>
                    <span style={{ fontSize: '0.88rem', fontWeight: 500, color: '#191817' }}>
                      ${item.price}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
