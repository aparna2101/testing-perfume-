import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Heart,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCcw,
  ChevronDown,
  Share2,
  Check,
  ZoomIn
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useShop } from '../context/ShopContext';
import { RatingStars } from '../components/common/RatingStars';
import { QuantitySelector } from '../components/common/QuantitySelector';
import { ProductCard } from '../components/product/ProductCard';

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isWishlisted, setIsCheckoutOpen, showToast } = useShop();

  const product = PRODUCTS.find((p) => p.id === id);

  const [selectedImg, setSelectedImg] = useState('');
  const [selectedSize, setSelectedSize] = useState('50ml');
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [activeTab, setActiveTab] = useState('notes'); // 'notes', 'ingredients', 'wear', 'shipping'

  useEffect(() => {
    window.scrollTo(0, 0);
    if (product) {
      setSelectedImg(product.image);
      setSelectedSize('50ml');
      setQuantity(1);
    }
  }, [id, product]);

  if (!product) {
    return (
      <div style={{ padding: '140px 20px', textAlign: 'center', backgroundColor: '#FAF8F5' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: '16px' }}>
          Fragrance Not Found
        </h2>
        <p style={{ color: '#5C5955', marginBottom: '28px' }}>
          The requested perfume creation could not be located in our archive.
        </p>
        <Link to="/shop" className="btn-primary">
          EXPLORE THE CATALOG
        </Link>
      </div>
    );
  }

  const saved = isWishlisted(product.id);
  const currentSizeObj = product.sizes.find((s) => s.size === selectedSize) || product.sizes[1];
  const currentPrice = currentSizeObj ? currentSizeObj.price : product.price;

  // Zoom interaction
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  const handleAddToCart = () => {
    addToCart(product, selectedSize, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, quantity);
    setIsCheckoutOpen(true);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Link to fragrance copied to clipboard.', 'info');
  };

  // Related products from same family or general curations
  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.fragranceFamily === product.fragranceFamily || p.bestseller)
  ).slice(0, 3);

  return (
    <div style={{ backgroundColor: '#FAF8F5', minHeight: '100vh', paddingBottom: '96px' }}>
      {/* Breadcrumb Navigation */}
      <div
        style={{
          borderBottom: '1px solid rgba(25, 24, 23, 0.06)',
          backgroundColor: '#FFFFFF',
          padding: '14px 0',
        }}
      >
        <div className="container">
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.74rem',
              letterSpacing: '0.08em',
              color: '#8E8A83',
              textTransform: 'uppercase',
            }}
          >
            <Link to="/" style={{ color: '#8E8A83' }}>Home</Link>
            <span>/</span>
            <Link to="/shop" style={{ color: '#8E8A83' }}>Shop</Link>
            <span>/</span>
            <Link to={`/shop?family=${product.fragranceFamily}`} style={{ color: '#8E8A83' }}>
              {product.fragranceFamily}
            </Link>
            <span>/</span>
            <span style={{ color: '#191817', fontWeight: 500 }}>{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Product Showcase Section */}
      <section style={{ paddingTop: '48px', paddingBottom: '72px' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '64px',
              alignItems: 'start',
            }}
            className="product-detail-layout"
          >
            {/* LEFT COLUMN: Gallery & Zoom Lens */}
            <div>
              {/* Main Image Display with Zoom Hover */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  paddingTop: '115%',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '2px',
                  overflow: 'hidden',
                  border: '1px solid rgba(25, 24, 23, 0.08)',
                  cursor: isZoomed ? 'crosshair' : 'zoom-in',
                }}
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
                onMouseMove={handleMouseMove}
              >
                <img
                  src={selectedImg || product.image}
                  alt={product.name}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                    transform: isZoomed ? 'scale(1.8)' : 'scale(1)',
                    transition: isZoomed ? 'none' : 'transform 0.4s ease-out',
                  }}
                />

                {/* Subtle zoom instruction pill */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '14px',
                    right: '14px',
                    backgroundColor: 'rgba(25, 24, 23, 0.7)',
                    backdropFilter: 'blur(4px)',
                    color: '#FAF8F5',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    fontSize: '0.68rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    pointerEvents: 'none',
                    opacity: isZoomed ? 0 : 0.85,
                    transition: 'opacity 0.2s',
                  }}
                >
                  <ZoomIn size={12} />
                  <span>Hover to Zoom</span>
                </div>
              </div>

              {/* Thumbnails Gallery */}
              <div
                style={{
                  display: 'flex',
                  gap: '12px',
                  marginTop: '16px',
                  overflowX: 'auto',
                }}
              >
                {product.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImg(img)}
                    style={{
                      width: '76px',
                      height: '92px',
                      borderRadius: '2px',
                      overflow: 'hidden',
                      border: selectedImg === img ? '2px solid #B8976C' : '1px solid rgba(25, 24, 23, 0.1)',
                      backgroundColor: '#FFFFFF',
                      flexShrink: 0,
                      opacity: selectedImg === img ? 1 : 0.7,
                      transition: 'all 0.2s',
                      padding: 0,
                    }}
                  >
                    <img
                      src={img}
                      alt={`${product.name} view ${idx + 1}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT COLUMN: Product Info & Actions */}
            <div>
              {/* Category & Badge */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#B8976C', fontWeight: 600 }}>
                  {product.category} • {product.gender}
                </span>

                <button
                  onClick={handleShare}
                  aria-label="Share fragrance"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.72rem',
                    color: '#8E8A83',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                  }}
                >
                  <Share2 size={13} />
                  <span>Share</span>
                </button>
              </div>

              {/* Title & Subtitle */}
              <h1
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(2.2rem, 3.5vw, 3rem)',
                  letterSpacing: '0.04em',
                  color: '#191817',
                  marginBottom: '4px',
                  lineHeight: 1.15,
                }}
              >
                {product.name}
              </h1>

              <div style={{ fontSize: '0.92rem', color: '#8E8A83', fontStyle: 'italic', marginBottom: '16px' }}>
                {product.subtitle}
              </div>

              {/* Rating & Reviews */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
                <RatingStars rating={product.rating} count={product.reviewCount} size={15} />
                <span style={{ fontSize: '0.75rem', color: '#B8976C', textDecoration: 'underline', cursor: 'pointer' }}>
                  Read verified patron impressions
                </span>
              </div>

              {/* Price */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '12px',
                  marginBottom: '24px',
                  paddingBottom: '20px',
                  borderBottom: '1px solid rgba(25, 24, 23, 0.08)',
                }}
              >
                <span style={{ fontSize: '1.8rem', fontWeight: 500, color: '#191817', fontFamily: 'var(--font-heading)' }}>
                  ${currentPrice}
                </span>
                {product.originalPrice && (
                  <span style={{ fontSize: '1.1rem', color: '#9C9890', textDecoration: 'line-through' }}>
                    ${product.originalPrice}
                  </span>
                )}
                <span style={{ fontSize: '0.78rem', color: '#8E8A83' }}>
                  Taxes included. Complimentary shipping on all full bottles.
                </span>
              </div>

              {/* Short Description */}
              <p style={{ fontSize: '0.95rem', color: '#5C5955', lineHeight: 1.8, marginBottom: '28px' }}>
                {product.description}
              </p>

              {/* Bottle Size Selector */}
              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#191817', fontWeight: 600 }}>
                    Select Flacon Volume:
                  </span>
                  <span style={{ fontSize: '0.74rem', color: '#8F7249', fontWeight: 500 }}>
                    {selectedSize === '30ml' && 'Discreet Travel Size'}
                    {selectedSize === '50ml' && 'Most Popular Signature'}
                    {selectedSize === '100ml' && 'Best Value Flacon'}
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                  {product.sizes.map((s) => {
                    const isSelected = selectedSize === s.size;
                    return (
                      <button
                        key={s.size}
                        type="button"
                        onClick={() => setSelectedSize(s.size)}
                        style={{
                          padding: '14px 10px',
                          borderRadius: '2px',
                          border: isSelected ? '1px solid #191817' : '1px solid rgba(25, 24, 23, 0.15)',
                          backgroundColor: isSelected ? '#191817' : '#FFFFFF',
                          color: isSelected ? '#FAF8F5' : '#191817',
                          textAlign: 'center',
                          transition: 'all 0.2s',
                          cursor: 'pointer',
                        }}
                      >
                        <div style={{ fontSize: '0.88rem', fontWeight: 600 }}>{s.size}</div>
                        <div style={{ fontSize: '0.78rem', opacity: isSelected ? 0.9 : 0.7, marginTop: '2px' }}>
                          ${s.price}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity & Add to Cart Controls */}
              <div style={{ display: 'flex', gap: '12px', marginBottom: '14px' }}>
                <QuantitySelector
                  quantity={quantity}
                  onDecrease={() => setQuantity(Math.max(1, quantity - 1))}
                  onIncrease={() => setQuantity(quantity + 1)}
                />

                <button
                  onClick={handleAddToCart}
                  className="btn-primary"
                  style={{ flex: 1, gap: '10px' }}
                >
                  <ShoppingBag size={15} />
                  <span>ADD TO BAG (${currentPrice * quantity})</span>
                </button>

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  aria-label="Toggle wishlist"
                  style={{
                    width: '46px',
                    height: '46px',
                    border: '1px solid rgba(25, 24, 23, 0.15)',
                    borderRadius: '2px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#FFFFFF',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#191817')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(25, 24, 23, 0.15)')}
                >
                  <Heart
                    size={18}
                    color={saved ? '#B8976C' : '#191817'}
                    fill={saved ? '#B8976C' : 'none'}
                  />
                </button>
              </div>

              {/* Buy Now Instant Checkout Button */}
              <button
                onClick={handleBuyNow}
                className="btn-gold"
                style={{ width: '100%', marginBottom: '28px' }}
              >
                BUY NOW WITH EXPRESS CHECKOUT
              </button>

              {/* Luxury Guarantees / Service Badges */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '12px',
                  padding: '16px',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '2px',
                  border: '1px solid rgba(25, 24, 23, 0.08)',
                  fontSize: '0.74rem',
                  color: '#5C5955',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Truck size={16} color="#B8976C" />
                  <span>Complimentary Shipping</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sparkles size={16} color="#B8976C" />
                  <span>2 Deluxe 2ml Samples</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <RotateCcw size={16} color="#B8976C" />
                  <span>30-Day Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FRAGRANCE NOTES & EDITORIAL ACCORDIONS SECTION */}
      <section style={{ backgroundColor: '#FFFFFF', padding: '80px 0', borderTop: '1px solid rgba(25, 24, 23, 0.08)' }}>
        <div className="container" style={{ maxWidth: '980px' }}>
          {/* Navigation Tabs */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              borderBottom: '1px solid rgba(25, 24, 23, 0.1)',
              marginBottom: '44px',
              gap: '24px',
              overflowX: 'auto',
            }}
          >
            {[
              { id: 'notes', label: 'Fragrance Notes & Pyramid' },
              { id: 'ingredients', label: 'Ingredients & Botanical Purity' },
              { id: 'wear', label: 'How To Wear & Ritual' },
              { id: 'shipping', label: 'Shipping & White Glove Return' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '14px 8px',
                  fontSize: '0.8rem',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  fontWeight: activeTab === tab.id ? 600 : 400,
                  color: activeTab === tab.id ? '#191817' : '#8E8A83',
                  borderBottom: activeTab === tab.id ? '2px solid #B8976C' : '2px solid transparent',
                  marginBottom: '-1px',
                  transition: 'all 0.2s',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB 1: FRAGRANCE NOTES PYRAMID */}
          {activeTab === 'notes' && (
            <div style={{ animation: 'fadeIn 0.3s ease' }}>
              <div style={{ textAlign: 'center', marginBottom: '36px' }}>
                <span className="section-subtitle">THE OLFACTORY ARCHITECTURE</span>
                <h3 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-heading)' }}>
                  The Scent Pyramid
                </h3>
              </div>

              {/* Visual Olfactory Pyramid Card */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                  maxWidth: '720px',
                  margin: '0 auto',
                }}
              >
                {/* TOP NOTES */}
                <div
                  style={{
                    backgroundColor: '#FAF8F5',
                    border: '1px solid rgba(184, 151, 108, 0.3)',
                    borderRadius: '3px',
                    padding: '24px 28px',
                    textAlign: 'center',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.03)',
                  }}
                >
                  <span style={{ fontSize: '0.68rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: '#B8976C', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                    TOP NOTES • THE FIRST IMPRESSION (0 — 30 MINS)
                  </span>
                  <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '12px', marginTop: '10px' }}>
                    {product.notes.top.map((note) => (
                      <span
                        key={note}
                        style={{
                          backgroundColor: '#FFFFFF',
                          padding: '6px 16px',
                          borderRadius: '20px',
                          border: '1px solid rgba(25, 24, 23, 0.08)',
                          fontSize: '0.85rem',
                          fontWeight: 500,
                        }}
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

                {/* HEART NOTES */}
                <div
                  style={{
                    backgroundColor: '#FAF5ED',
                    border: '1px solid #B8976C',
                    borderRadius: '3px',
                    padding: '28px 28px',
                    textAlign: 'center',
                    boxShadow: '0 6px 18px rgba(184, 151, 108, 0.08)',
                  }}
                >
                  <span style={{ fontSize: '0.68rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: '#8F7249', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                    HEART NOTES • THE SOUL OF THE FRAGRANCE (30 MINS — 4 HOURS)
                  </span>
                  <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '12px', marginTop: '10px' }}>
                    {product.notes.heart.map((note) => (
                      <span
                        key={note}
                        style={{
                          backgroundColor: '#FFFFFF',
                          padding: '8px 20px',
                          borderRadius: '20px',
                          border: '1px solid rgba(184, 151, 108, 0.4)',
                          fontSize: '0.92rem',
                          fontWeight: 500,
                          color: '#191817',
                        }}
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

                {/* BASE NOTES */}
                <div
                  style={{
                    backgroundColor: '#191817',
                    color: '#FAF8F5',
                    borderRadius: '3px',
                    padding: '30px 28px',
                    textAlign: 'center',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                  }}
                >
                  <span style={{ fontSize: '0.68rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: '#DFCEB7', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                    BASE NOTES • THE LINGERING TRAIL (4 — 14+ HOURS)
                  </span>
                  <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '12px', marginTop: '10px' }}>
                    {product.notes.base.map((note) => (
                      <span
                        key={note}
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          color: '#FAF8F5',
                          padding: '8px 20px',
                          borderRadius: '20px',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          fontSize: '0.92rem',
                          fontWeight: 500,
                        }}
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Longevity & Sillage Metrics */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '20px',
                  maxWidth: '720px',
                  margin: '32px auto 0',
                }}
              >
                <div style={{ backgroundColor: '#FAF8F5', padding: '16px', borderRadius: '2px', textAlign: 'center', border: '1px solid rgba(25, 24, 23, 0.06)' }}>
                  <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#8E8A83' }}>
                    Longevity On Skin
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: 600, color: '#191817', marginTop: '4px' }}>
                    {product.longevity}
                  </div>
                </div>
                <div style={{ backgroundColor: '#FAF8F5', padding: '16px', borderRadius: '2px', textAlign: 'center', border: '1px solid rgba(25, 24, 23, 0.06)' }}>
                  <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#8E8A83' }}>
                    Sillage & Projection
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: 600, color: '#191817', marginTop: '4px' }}>
                    {product.sillage}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: INGREDIENTS */}
          {activeTab === 'ingredients' && (
            <div style={{ animation: 'fadeIn 0.3s ease', maxWidth: '680px', margin: '0 auto' }}>
              <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)', marginBottom: '14px' }}>
                Conscious Formulation & Origin
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#5C5955', lineHeight: 1.8, marginBottom: '20px' }}>
                All ÉLAN creations are compounded using 100% organic, wheat-derived grain alcohol from northern France. We formulate without parabens, phthalates, artificial coloring agents, or animal derivatives. Our bottles are cruelty-free and vegan certified.
              </p>
              <div style={{ padding: '20px', backgroundColor: '#FAF8F5', borderRadius: '2px', border: '1px solid rgba(25, 24, 23, 0.08)' }}>
                <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#8E8A83', display: 'block', marginBottom: '8px' }}>
                  Full Formula Declaration (INCI):
                </span>
                <p style={{ fontSize: '0.8rem', color: '#191817', fontFamily: 'monospace', lineHeight: 1.6 }}>
                  {product.ingredients}
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: HOW TO WEAR */}
          {activeTab === 'wear' && (
            <div style={{ animation: 'fadeIn 0.3s ease', maxWidth: '680px', margin: '0 auto' }}>
              <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)', marginBottom: '14px' }}>
                The Ritual of Application
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#5C5955', lineHeight: 1.8, marginBottom: '16px' }}>
                {product.howToWear}
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem', color: '#5C5955' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Check size={16} color="#B8976C" />
                  <span>Never rub wrists together; this crushes the fragile top note molecules.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Check size={16} color="#B8976C" />
                  <span>Moisturized skin retains perfume oils significantly longer throughout the day.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Check size={16} color="#B8976C" />
                  <span>Store away from direct sunlight and temperature fluctuations to protect essence integrity.</span>
                </li>
              </ul>
            </div>
          )}

          {/* TAB 4: SHIPPING & RETURNS */}
          {activeTab === 'shipping' && (
            <div style={{ animation: 'fadeIn 0.3s ease', maxWidth: '680px', margin: '0 auto' }}>
              <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)', marginBottom: '14px' }}>
                Complimentary Delivery & The Sample First Guarantee
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#5C5955', lineHeight: 1.8, marginBottom: '16px' }}>
                Every full-size bottle order includes a matching 2ml sample vial. We invite you to test the sample first before breaking the protective seal on the presentation box.
              </p>
              <p style={{ fontSize: '0.9rem', color: '#5C5955', lineHeight: 1.8 }}>
                Should the fragrance not meet your expectations, return the unopened full-size bottle within 30 days using our prepaid label for an immediate refund.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Related Fragrances */}
      <section style={{ paddingTop: '80px' }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: '36px' }}>
            <span className="section-subtitle">COMPLEMENTARY HARMONIES</span>
            <h2 className="section-title">YOU MAY ALSO DESIRE</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px' }}>
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 860px) {
          .product-detail-layout {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
        }
      `}</style>
    </div>
  );
};
