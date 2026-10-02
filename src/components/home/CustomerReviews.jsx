import React from 'react';
import { RatingStars } from '../common/RatingStars';
import { REVIEWS, PRESS_MENTIONS } from '../../data/products';
import { Quote, CheckCircle2 } from 'lucide-react';

export const CustomerReviews = () => {
  return (
    <section
      style={{
        paddingTop: '96px',
        paddingBottom: '96px',
        backgroundColor: '#FAF8F5',
        borderTop: '1px solid rgba(25, 24, 23, 0.06)',
      }}
    >
      <div className="container">
        {/* Press Quotes Bar */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '24px',
            paddingBottom: '64px',
            marginBottom: '72px',
            borderBottom: '1px solid rgba(25, 24, 23, 0.08)',
          }}
        >
          {PRESS_MENTIONS.map((item, idx) => (
            <div
              key={idx}
              style={{
                textAlign: 'center',
                padding: '16px',
              }}
            >
              <div
                style={{
                  fontSize: '0.82rem',
                  fontFamily: 'var(--font-heading)',
                  letterSpacing: '0.22em',
                  fontWeight: 600,
                  color: '#191817',
                  marginBottom: '10px',
                }}
              >
                {item.publication}
              </div>
              <p
                style={{
                  fontSize: '0.84rem',
                  color: '#6B6761',
                  lineHeight: 1.6,
                  fontStyle: 'italic',
                }}
              >
                "{item.quote}"
              </p>
            </div>
          ))}
        </div>

        {/* Section Header */}
        <div className="section-header">
          <span className="section-subtitle">THE VOICES OF PATRONS</span>
          <h2 className="section-title">CLIENT REFLECTIONS</h2>
          <div className="editorial-divider" />
          <p className="section-description">
            Unfiltered impressions from individuals who have made ÉLAN part of their personal aura and daily ritual.
          </p>
        </div>

        {/* 4 Review Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}
        >
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '3px',
                padding: '32px 28px',
                border: '1px solid rgba(25, 24, 23, 0.06)',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
              }}
            >
              <Quote
                size={32}
                color="#B8976C"
                style={{ opacity: 0.2, position: 'absolute', top: '24px', right: '24px' }}
              />

              <div>
                {/* Rating */}
                <div style={{ marginBottom: '16px' }}>
                  <RatingStars rating={review.rating} showValue={false} size={14} />
                </div>

                {/* Review Title */}
                <h4
                  style={{
                    fontSize: '1.05rem',
                    fontFamily: 'var(--font-heading)',
                    marginBottom: '10px',
                    color: '#191817',
                  }}
                >
                  "{review.title}"
                </h4>

                {/* Review Text */}
                <p
                  style={{
                    fontSize: '0.86rem',
                    color: '#5C5955',
                    lineHeight: 1.7,
                    marginBottom: '20px',
                  }}
                >
                  {review.text}
                </p>
              </div>

              {/* Author & Product */}
              <div
                style={{
                  borderTop: '1px solid rgba(25, 24, 23, 0.06)',
                  paddingTop: '16px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                  <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#191817' }}>
                    {review.author}
                  </span>
                  {review.verified && (
                    <span style={{ display: 'flex', color: '#B8976C' }} title="Verified Purchase">
                      <CheckCircle2 size={13} />
                    </span>
                  )}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.72rem', color: '#8E8A83' }}>
                    Purchased: <strong style={{ color: '#5C5955' }}>{review.product}</strong>
                  </span>
                  <span style={{ fontSize: '0.7rem', color: '#A09C95' }}>{review.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
