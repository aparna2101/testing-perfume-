import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass } from 'lucide-react';

export const NotFound = () => {
  return (
    <div
      style={{
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FAF8F5',
        padding: '60px 20px',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: '520px' }}>
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: '#F3EFE8',
            color: '#B8976C',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
          }}
        >
          <Compass size={28} />
        </div>

        <span
          style={{
            fontSize: '0.72rem',
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            color: '#B8976C',
            fontWeight: 500,
            display: 'block',
            marginBottom: '8px',
          }}
        >
          PAGE INTROUVABLE • 404
        </span>

        <h1
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '2.5rem',
            letterSpacing: '0.04em',
            marginBottom: '16px',
            color: '#191817',
          }}
        >
          An Uncharted Olfactory Path
        </h1>

        <p style={{ color: '#5C5955', fontSize: '0.94rem', lineHeight: 1.7, marginBottom: '32px' }}>
          The page or perfume you are seeking has vanished like a fleeting top note. Allow us to guide you back to our curated boutique.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
          <Link to="/" className="btn-primary" style={{ gap: '8px' }}>
            <span>RETURN TO MAISON</span>
          </Link>
          <Link to="/shop" className="btn-outline" style={{ gap: '8px' }}>
            <span>BROWSE CATALOG</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
};
