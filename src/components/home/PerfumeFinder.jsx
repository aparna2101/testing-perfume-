import React, { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../product/ProductCard';

export const PerfumeFinder = () => {
  const [selectedMood, setSelectedMood] = useState('Woody & Sophisticated');

  const moodOptions = [
    {
      id: 'Woody & Sophisticated',
      label: 'Woody & Sophisticated',
      notes: 'Sandalwood, Cedar, Vetiver',
      desc: 'Quiet authority, architectural depth, and refined elegance.'
    },
    {
      id: 'Fresh & Clean',
      label: 'Fresh & Clean',
      notes: 'Citron, Sea Salt, Mint',
      desc: 'Effervescent Mediterranean mornings, sparkling citrus, and mineral air.'
    },
    {
      id: 'Floral & Romantic',
      label: 'Floral & Romantic',
      notes: 'Grasse Rose, Jasmine, Peony',
      desc: 'Nocturnal petals, timeless Parisian romance, and velvety trails.'
    },
    {
      id: 'Warm & Sensual',
      label: 'Warm & Sensual',
      notes: 'Oud, Golden Amber, Saffron',
      desc: 'Golden resins, intoxicating spice, and unforgettable magnetic allure.'
    },
    {
      id: 'Sweet & Gourmand',
      label: 'Sweet & Gourmand',
      notes: 'Bourbon Vanilla, Almond Milk, Tonka',
      desc: 'Addictive Madagascar vanilla beans, whipped cocoa, and comforting warmth.'
    },
  ];

  // Filter products by selected mood
  const recommended = PRODUCTS.filter((p) => p.mood === selectedMood);

  return (
    <section
      id="scent-finder"
      style={{
        paddingTop: '96px',
        paddingBottom: '96px',
        backgroundColor: '#F3EFE8',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Sparkles size={14} color="#B8976C" />
            <span className="section-subtitle" style={{ margin: 0 }}>
              OLFACTORY CONCIERGE
            </span>
          </div>
          <h2 className="section-title">FIND YOUR SIGNATURE SCENT</h2>
          <div className="editorial-divider" />
          <p className="section-description">
            What kind of fragrance are you looking for? Select your desired olfactory presence and let our Grasse formulation engine reveal your ideal companion.
          </p>
        </div>

        {/* Interactive Mood Selector Tabs */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '40px',
          }}
        >
          {moodOptions.map((mood) => {
            const isSelected = selectedMood === mood.id;
            return (
              <button
                key={mood.id}
                onClick={() => setSelectedMood(mood.id)}
                style={{
                  padding: '14px 22px',
                  borderRadius: '2px',
                  border: isSelected ? '1px solid #191817' : '1px solid rgba(25, 24, 23, 0.12)',
                  backgroundColor: isSelected ? '#191817' : '#FFFFFF',
                  color: isSelected ? '#FAF8F5' : '#191817',
                  fontSize: '0.82rem',
                  fontWeight: isSelected ? 500 : 400,
                  letterSpacing: '0.08em',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: isSelected ? '0 6px 18px rgba(0,0,0,0.1)' : 'none',
                  cursor: 'pointer',
                }}
              >
                {mood.label}
              </button>
            );
          })}
        </div>

        {/* Selected Mood Insight Bar */}
        {(() => {
          const currentMoodObj = moodOptions.find((m) => m.id === selectedMood);
          return (
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '3px',
                border: '1px solid rgba(25, 24, 23, 0.08)',
                padding: '20px 28px',
                maxWidth: '780px',
                margin: '0 auto 48px',
                textAlign: 'center',
                boxShadow: '0 4px 14px rgba(0,0,0,0.03)',
              }}
            >
              <span
                style={{
                  fontSize: '0.7rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: '#B8976C',
                  fontWeight: 500,
                  display: 'block',
                  marginBottom: '4px',
                }}
              >
                Signature Profile: {currentMoodObj?.label}
              </span>
              <p style={{ fontSize: '0.92rem', color: '#191817', marginBottom: '8px', fontStyle: 'italic' }}>
                "{currentMoodObj?.desc}"
              </p>
              <div style={{ fontSize: '0.78rem', color: '#8E8A83' }}>
                Dominant Accord Notes: <strong style={{ color: '#5C5955' }}>{currentMoodObj?.notes}</strong>
              </div>
            </div>
          );
        })()}

        {/* Recommended Products Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
            gap: '28px',
            maxWidth: recommended.length === 1 ? '360px' : (recommended.length === 2 ? '720px' : '1080px'),
            margin: '0 auto',
          }}
        >
          {recommended.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
