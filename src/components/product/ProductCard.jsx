import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { RatingStars } from '../common/RatingStars';
import { Badge } from '../common/Badge';

export const ProductCard = ({ product }) => {
  const { addToCart, toggleWishlist, isWishlisted } = useShop();
  const [isHovered, setIsHovered] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const saved = isWishlisted(product.id);

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, '50ml', 1);
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        borderRadius: '2px',
        overflow: 'hidden',
        border: '1px solid rgba(25, 24, 23, 0.06)',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        transform: isHovered ? 'translateY(-4px)' : 'none',
        boxShadow: isHovered ? '0 12px 28px rgba(0, 0, 0, 0.08)' : '0 2px 8px rgba(0, 0, 0, 0.02)',
        position: 'relative',
        height: '100%'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          paddingTop: '120%', // 5:6 elegant editorial aspect ratio
          overflow: 'hidden',
          backgroundColor: '#F7F5F0',
        }}
      >
        <Link to={`/product/${product.id}`} style={{ position: 'absolute', inset: 0, display: 'block' }}>
          {/* Skeleton placeholder before load */}
          {!imgLoaded && (
            <div
              className="skeleton"
              style={{ position: 'absolute', inset: 0 }}
            />
          )}

          {/* Primary Image */}
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
              opacity: isHovered && product.hoverImage ? 0 : 1,
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            }}
          />

          {/* Secondary Hover Image */}
          {product.hoverImage && (
            <img
              src={product.hoverImage}
              alt={`${product.name} alternate view`}
              loading="lazy"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                opacity: isHovered ? 1 : 0,
                transform: isHovered ? 'scale(1.05)' : 'scale(1)',
              }}
            />
          )}
        </Link>

        {/* Top Badges */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            zIndex: 2,
            pointerEvents: 'none'
          }}
        >
          {product.bestseller && <Badge variant="gold">Bestseller</Badge>}
          {product.newArrival && <Badge variant="dark">New Arrival</Badge>}
          {product.originalPrice && <Badge variant="subtle">Special Offer</Badge>}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            zIndex: 3,
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
            transition: 'all 0.25s',
            transform: saved ? 'scale(1.05)' : 'scale(1)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#FFFFFF';
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.85)';
            e.currentTarget.style.transform = saved ? 'scale(1.05)' : 'scale(1)';
          }}
        >
          <Heart
            size={16}
            strokeWidth={1.75}
            color={saved ? '#B8976C' : '#191817'}
            fill={saved ? '#B8976C' : 'none'}
          />
        </button>

        {/* Hover Action Bar: VIEW PRODUCT & QUICK ADD */}
        <div
          style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            right: '0',
            display: 'flex',
            backgroundColor: 'rgba(25, 24, 23, 0.92)',
            backdropFilter: 'blur(6px)',
            zIndex: 3,
            transform: isHovered ? 'translateY(0)' : 'translateY(100%)',
            transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <Link
            to={`/product/${product.id}`}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              color: '#FAF8F5',
              fontSize: '0.7rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              padding: '12px 8px',
              borderRight: '1px solid rgba(255, 255, 255, 0.12)',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <Eye size={13} />
            <span>View Product</span>
          </Link>

          <button
            onClick={handleQuickAdd}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              color: '#B8976C',
              fontSize: '0.7rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              padding: '12px 8px',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(184, 151, 108, 0.2)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <ShoppingBag size={13} />
            <span>Quick Add</span>
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div
        style={{
          padding: '20px 18px',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'space-between',
        }}
      >
        <div>
          {/* Category & Gender */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '6px',
            }}
          >
            <span
              style={{
                fontSize: '0.7rem',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: '#8E8A83',
              }}
            >
              {product.category} • {product.gender}
            </span>
            <span
              style={{
                fontSize: '0.7rem',
                color: '#B8976C',
                letterSpacing: '0.08em',
                fontWeight: 500,
              }}
            >
              {product.fragranceFamily}
            </span>
          </div>

          {/* Title */}
          <h3
            style={{
              fontSize: '1.18rem',
              marginBottom: '4px',
              fontWeight: 400,
              letterSpacing: '0.03em',
            }}
          >
            <Link
              to={`/product/${product.id}`}
              style={{
                color: '#191817',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#B8976C'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#191817'}
            >
              {product.name}
            </Link>
          </h3>

          {/* Short Description */}
          {product.shortDesc && (
            <p
              style={{
                fontSize: '0.8rem',
                color: '#6B6761',
                lineHeight: 1.5,
                marginBottom: '12px',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {product.shortDesc}
            </p>
          )}
        </div>

        {/* Rating & Price */}
        <div>
          <div style={{ marginBottom: '8px' }}>
            <RatingStars rating={product.rating} count={product.reviewCount} size={12} />
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              borderTop: '1px solid rgba(25, 24, 23, 0.06)',
              paddingTop: '12px',
              marginTop: '4px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span
                style={{
                  fontSize: '1.05rem',
                  fontWeight: 500,
                  color: '#191817',
                  letterSpacing: '0.02em',
                }}
              >
                ${product.price}
              </span>
              {product.originalPrice && (
                <span
                  style={{
                    fontSize: '0.85rem',
                    color: '#9C9890',
                    textDecoration: 'line-through',
                  }}
                >
                  ${product.originalPrice}
                </span>
              )}
            </div>

            <span
              style={{
                fontSize: '0.72rem',
                color: '#8E8A83',
                letterSpacing: '0.05em',
              }}
            >
              50ml
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
