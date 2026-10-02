import React from 'react';

export const Badge = ({ children, variant = 'gold' }) => {
  const styles = {
    gold: {
      backgroundColor: '#FAF5ED',
      color: '#8F7249',
      border: '1px solid rgba(184, 151, 108, 0.35)',
    },
    dark: {
      backgroundColor: '#191817',
      color: '#FAF8F5',
      border: '1px solid #191817',
    },
    subtle: {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
      color: '#5C5955',
      border: '1px solid rgba(0, 0, 0, 0.08)',
    }
  };

  const current = styles[variant] || styles.gold;

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '3px 8px',
        fontSize: '0.65rem',
        fontWeight: '500',
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        borderRadius: '2px',
        ...current
      }}
    >
      {children}
    </span>
  );
};
