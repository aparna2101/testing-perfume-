import React from 'react';
import { Star } from 'lucide-react';

export const RatingStars = ({ rating = 5, count, size = 13, showValue = true }) => {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
      <div style={{ display: 'flex', gap: '2px' }}>
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = rating >= star;
          const half = !filled && rating >= star - 0.5;
          return (
            <Star
              key={star}
              size={size}
              strokeWidth={1.5}
              color={filled || half ? "#B8976C" : "#D4CFCA"}
              fill={filled ? "#B8976C" : (half ? "url(#goldHalf)" : "none")}
            />
          );
        })}
      </div>
      {showValue && (
        <span style={{ fontSize: '0.78rem', color: '#5C5955', marginLeft: '4px', letterSpacing: '0.02em' }}>
          {rating.toFixed(1)} {count !== undefined && <span style={{ color: '#8E8A83' }}>({count})</span>}
        </span>
      )}
    </div>
  );
};
