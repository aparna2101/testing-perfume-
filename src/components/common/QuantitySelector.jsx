import React from 'react';
import { Minus, Plus } from 'lucide-react';

export const QuantitySelector = ({ quantity = 1, onDecrease, onIncrease, min = 1, max = 10, size = 'medium' }) => {
  const isCompact = size === 'small';

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        border: '1px solid rgba(25, 24, 23, 0.15)',
        borderRadius: '2px',
        backgroundColor: '#FFFFFF',
        height: isCompact ? '32px' : '44px',
        padding: '0 4px',
      }}
    >
      <button
        type="button"
        onClick={onDecrease}
        disabled={quantity <= min}
        aria-label="Decrease quantity"
        style={{
          width: isCompact ? '26px' : '36px',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: quantity <= min ? 0.35 : 0.85,
          cursor: quantity <= min ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s',
        }}
      >
        <Minus size={isCompact ? 12 : 14} />
      </button>

      <span
        style={{
          minWidth: isCompact ? '24px' : '36px',
          textAlign: 'center',
          fontSize: isCompact ? '0.8rem' : '0.9rem',
          fontWeight: 500,
          color: '#191817',
          userSelect: 'none',
        }}
      >
        {quantity}
      </span>

      <button
        type="button"
        onClick={onIncrease}
        disabled={quantity >= max}
        aria-label="Increase quantity"
        style={{
          width: isCompact ? '26px' : '36px',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: quantity >= max ? 0.35 : 0.85,
          cursor: quantity >= max ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s',
        }}
      >
        <Plus size={isCompact ? 12 : 14} />
      </button>
    </div>
  );
};
