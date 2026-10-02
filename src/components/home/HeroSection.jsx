import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

const SLIDES = [
  {
    id: 1,
    tag: "HAUTE PARFUMERIE • GRASSE, FRANCE",
    headline: "SCENT, REFINED.",
    subtitle: "Discover fragrances crafted to become part of your signature. Formulated with rare botanical absolutes and distilled in the heart of Provence.",
    primaryBtn: { text: "SHOP COLLECTION", link: "/shop" },
    secondaryBtn: { text: "EXPLORE SIGNATURES", link: "#featured-signature" },
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=2000&q=85",
    theme: "gold"
  },
  {
    id: 2,
    tag: "MIDNIGHT COLLECTION • NOUVELLE LAUNCH",
    headline: "THE POETRY OF NOCTURNE",
    subtitle: "Smoked tea, damask rose, and dark patchouli. Dramatic nocturnal florals created for unforgettable midnight encounters.",
    primaryBtn: { text: "DISCOVER ROSE NOCTURNE", link: "/product/rose-nocturne" },
    secondaryBtn: { text: "MIDNIGHT CHAPTER", link: "/collections/midnight-collection" },
    image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=2000&q=85",
    theme: "rose"
  },
  {
    id: 3,
    tag: "ROYAL EXTRAIT • 28% CONCENTRATION",
    headline: "OUD LUMIÈRE & SACRED RESINS",
    subtitle: "Noble Cambodian agarwood crowned with golden saffron and warm ambergris tears. Majestic, transcendent, and everlasting.",
    primaryBtn: { text: "EXPLORE OUD LUMIÈRE", link: "/product/oud-lumiere" },
    secondaryBtn: { text: "THE OUD ARCHIVE", link: "/collections/oud-collection" },
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=2000&q=85",
    theme: "amber"
  },
  {
    id: 4,
    tag: "BOTANICAL COLLECTION • HARVEST EDITION",
    headline: "MEDITERRANEAN VERDANT BREEZE",
    subtitle: "Crisp Sicilian citron, wild rosemary, and sea salt mist. An exhilarating symphony of mineral freshness and golden sunshine.",
    primaryBtn: { text: "SHOP FRESH & CITRUS", link: "/shop?family=Citrus" },
    secondaryBtn: { text: "DISCOVER OUR STORY", link: "/about" },
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=2000&q=85",
    theme: "citrus"
  }
];

export const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoPlayRef = useRef(null);

  // Auto slide timer (6 seconds)
  useEffect(() => {
    if (!isPaused) {
      autoPlayRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
      }, 6000);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isPaused]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  return (
    <section
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={{
        position: 'relative',
        minHeight: 'calc(100vh - 116px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: '#161514',
      }}
    >
      {/* Background Slides */}
      {SLIDES.map((slide, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={slide.id}
            style={{
              position: 'absolute',
              inset: 0,
              opacity: isActive ? 1 : 0,
              transition: 'opacity 1.2s cubic-bezier(0.25, 1, 0.5, 1)',
              zIndex: 1,
              pointerEvents: isActive ? 'auto' : 'none',
            }}
          >
            {/* Background Image with cinematic Ken-Burns zoom */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `linear-gradient(to right, rgba(18, 17, 16, 0.8) 0%, rgba(18, 17, 16, 0.48) 50%, rgba(18, 17, 16, 0.8) 100%), linear-gradient(to bottom, rgba(18, 17, 16, 0.4) 0%, rgba(18, 17, 16, 0.88) 100%), url('${slide.image}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center 40%',
                filter: 'brightness(0.92)',
                transform: isActive ? 'scale(1.04)' : 'scale(1)',
                transition: 'transform 7s ease-out',
              }}
            />
          </div>
        );
      })}

      {/* Gold Ambient Flare */}
      <div
        style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(184, 151, 108, 0.18) 0%, rgba(0,0,0,0) 70%)',
          top: '20%',
          left: '30%',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      {/* Navigation Arrow Left */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        style={{
          position: 'absolute',
          left: '28px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 10,
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          color: '#FAF8F5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease',
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#FAF8F5';
          e.currentTarget.style.color = '#191817';
          e.currentTarget.style.borderColor = '#FAF8F5';
          e.currentTarget.style.transform = 'translateY(-50%) scale(1.08)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
          e.currentTarget.style.color = '#FAF8F5';
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
          e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
        }}
      >
        <ChevronLeft size={22} />
      </button>

      {/* Navigation Arrow Right */}
      <button
        onClick={nextSlide}
        aria-label="Next slide"
        style={{
          position: 'absolute',
          right: '28px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 10,
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          color: '#FAF8F5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease',
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#FAF8F5';
          e.currentTarget.style.color = '#191817';
          e.currentTarget.style.borderColor = '#FAF8F5';
          e.currentTarget.style.transform = 'translateY(-50%) scale(1.08)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
          e.currentTarget.style.color = '#FAF8F5';
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
          e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
        }}
      >
        <ChevronRight size={22} />
      </button>

      {/* Content Container (dynamically changes with current slide) */}
      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 5,
          textAlign: 'center',
          padding: '80px 20px',
          maxWidth: '880px',
        }}
      >
        {/* Animated Slide Content Box */}
        <div
          key={currentSlide}
          style={{
            animation: 'fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* Subtle pill badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(184, 151, 108, 0.35)',
              backdropFilter: 'blur(8px)',
              borderRadius: '999px',
              padding: '6px 18px',
              marginBottom: '28px',
            }}
          >
            <Sparkles size={13} color="#B8976C" />
            <span
              style={{
                fontSize: '0.68rem',
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: '#DFCEB7',
                fontWeight: 500,
              }}
            >
              {SLIDES[currentSlide].tag}
            </span>
          </div>

          {/* Main Headline */}
          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.6rem, 6.2vw, 4.8rem)',
              color: '#FAF8F5',
              fontWeight: 400,
              letterSpacing: '0.1em',
              lineHeight: 1.12,
              marginBottom: '22px',
              textShadow: '0 4px 20px rgba(0,0,0,0.5)',
            }}
          >
            {SLIDES[currentSlide].headline}
          </h1>

          {/* Editorial Subtitle */}
          <p
            style={{
              color: '#D4CFCA',
              fontSize: 'clamp(0.98rem, 1.8vw, 1.2rem)',
              fontWeight: 300,
              letterSpacing: '0.03em',
              lineHeight: 1.7,
              maxWidth: '640px',
              margin: '0 auto 40px',
              textShadow: '0 2px 10px rgba(0,0,0,0.4)',
            }}
          >
            {SLIDES[currentSlide].subtitle}
          </p>

          {/* CTA Action Buttons */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '18px',
            }}
          >
            <Link
              to={SLIDES[currentSlide].primaryBtn.link}
              className="btn-gold"
              style={{
                minWidth: '220px',
                padding: '16px 36px',
                fontSize: '0.78rem',
                boxShadow: '0 8px 24px rgba(184, 151, 108, 0.28)',
              }}
            >
              {SLIDES[currentSlide].primaryBtn.text}
            </Link>

            {SLIDES[currentSlide].secondaryBtn.link.startsWith('#') ? (
              <a
                href={SLIDES[currentSlide].secondaryBtn.link}
                className="btn-outline"
                style={{
                  minWidth: '220px',
                  padding: '16px 36px',
                  fontSize: '0.78rem',
                  borderColor: 'rgba(255, 255, 255, 0.4)',
                  color: '#FAF8F5',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(4px)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#FAF8F5';
                  e.currentTarget.style.color = '#191817';
                  e.currentTarget.style.borderColor = '#FAF8F5';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.color = '#FAF8F5';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
                }}
              >
                {SLIDES[currentSlide].secondaryBtn.text}
              </a>
            ) : (
              <Link
                to={SLIDES[currentSlide].secondaryBtn.link}
                className="btn-outline"
                style={{
                  minWidth: '220px',
                  padding: '16px 36px',
                  fontSize: '0.78rem',
                  borderColor: 'rgba(255, 255, 255, 0.4)',
                  color: '#FAF8F5',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(4px)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#FAF8F5';
                  e.currentTarget.style.color = '#191817';
                  e.currentTarget.style.borderColor = '#FAF8F5';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.color = '#FAF8F5';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
                }}
              >
                {SLIDES[currentSlide].secondaryBtn.text}
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Luxury Numbered Slide Navigation Bar at bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: '36px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
        }}
      >
        {SLIDES.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <button
              key={slide.id}
              onClick={() => setCurrentSlide(index)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                padding: '4px 0',
                transition: 'all 0.3s ease',
              }}
            >
              <span
                style={{
                  fontSize: '0.7rem',
                  letterSpacing: '0.14em',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? '#FAF8F5' : 'rgba(255, 255, 255, 0.45)',
                  transition: 'color 0.3s ease',
                }}
              >
                0{slide.id}
              </span>
              <div
                style={{
                  width: isActive ? '36px' : '16px',
                  height: '2px',
                  backgroundColor: isActive ? '#B8976C' : 'rgba(255, 255, 255, 0.25)',
                  borderRadius: '1px',
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              />
            </button>
          );
        })}
      </div>

      {/* Down indicator */}
      <div
        className="desktop-only"
        style={{
          position: 'absolute',
          bottom: '36px',
          right: '36px',
          color: 'rgba(255, 255, 255, 0.45)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          fontSize: '0.62rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          pointerEvents: 'none',
          zIndex: 10,
        }}
      >
        <span>SCROLL</span>
        <ArrowDown size={13} />
      </div>

      {/* Responsive adjustments */}
      <style>{`
        @media (max-width: 768px) {
          .hero-slider-btn {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
};
