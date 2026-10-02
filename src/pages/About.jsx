import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ShieldCheck, Heart, Leaf, Award, ArrowRight } from 'lucide-react';

export const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ backgroundColor: '#FAF8F5', minHeight: '100vh', paddingBottom: '96px' }}>
      {/* Editorial Hero Header */}
      <section
        style={{
          position: 'relative',
          paddingTop: '100px',
          paddingBottom: '90px',
          backgroundColor: '#161514',
          color: '#FAF8F5',
          textAlign: 'center',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `linear-gradient(to bottom, rgba(22, 21, 20, 0.7) 0%, rgba(22, 21, 20, 0.95) 100%), url('https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1800&q=85')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.5,
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 2, maxWidth: '800px' }}>
          <span
            style={{
              fontSize: '0.72rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: '#B8976C',
              fontWeight: 500,
              display: 'block',
              marginBottom: '14px',
            }}
          >
            NOTRE HISTOIRE • ESTABLISHED IN GRASSE
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.8rem, 5.5vw, 4.5rem)',
              letterSpacing: '0.06em',
              fontWeight: 400,
              marginBottom: '20px',
              lineHeight: 1.15,
            }}
          >
            THE ARCHITECTURE OF SILENT PRESENCE
          </h1>
          <p
            style={{
              fontSize: '1.05rem',
              color: '#D4CFCA',
              lineHeight: 1.8,
              fontWeight: 300,
              maxWidth: '680px',
              margin: '0 auto',
            }}
          >
            ÉLAN was born from a singular obsession: to strip away marketing fanfare and return haute parfumerie to its purest sensory truth.
          </p>
        </div>
      </section>

      {/* Chapter 1: The Brand Philosophy */}
      <section style={{ padding: '96px 0', borderBottom: '1px solid rgba(25, 24, 23, 0.06)' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '64px',
              alignItems: 'center',
            }}
          >
            <div>
              <span className="section-subtitle">OUR PHILOSOPHY</span>
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '2.5rem',
                  letterSpacing: '0.04em',
                  marginBottom: '24px',
                  lineHeight: 1.2,
                }}
              >
                Fragrance as Personal Aura, Not a Loud Statement
              </h2>
              <p style={{ fontSize: '0.96rem', color: '#5C5955', lineHeight: 1.8, marginBottom: '20px' }}>
                We believe perfume is intimate. It does not exist to fill an entire room uninvited; it exists to create a sacred magnetic contour around the wearer—inviting closer discovery and leaving an indelible impression long after you depart.
              </p>
              <p style={{ fontSize: '0.96rem', color: '#5C5955', lineHeight: 1.8 }}>
                Every formulation is developed over eighteen to twenty-four months of maceration, observing how botanical accords age, evolve, and bond with human skin warmth.
              </p>
            </div>

            <div style={{ borderRadius: '3px', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
              <img
                src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1000&q=80"
                alt="ÉLAN perfume philosophy"
                loading="lazy"
                style={{ width: '100%', height: '480px', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 2: Craftsmanship & The Grasse Atelier */}
      <section style={{ padding: '96px 0', backgroundColor: '#F3EFE8' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '64px',
              alignItems: 'center',
            }}
          >
            <div style={{ borderRadius: '3px', overflow: 'hidden', boxShadow: 'var(--shadow-md)', order: 2 }}>
              <img
                src="https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=1000&q=80"
                alt="Grasse atelier distillation"
                loading="lazy"
                style={{ width: '100%', height: '480px', objectFit: 'cover' }}
              />
            </div>

            <div style={{ order: 1 }}>
              <span className="section-subtitle">THE ATELIER HERITAGE</span>
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '2.5rem',
                  letterSpacing: '0.04em',
                  marginBottom: '24px',
                  lineHeight: 1.2,
                }}
              >
                Venerable French Craftsmanship
              </h2>
              <p style={{ fontSize: '0.96rem', color: '#5C5955', lineHeight: 1.8, marginBottom: '20px' }}>
                Perched above the azure Mediterranean in the hills of Grasse, our compounding laboratory operates according to centuries-old French perfumery laws. We source may roses picked exclusively at sunrise, wild lavender distilled in copper alembics, and rare woods cured in seasoned oak barrels.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '28px' }}>
                <div style={{ backgroundColor: '#FAF8F5', padding: '18px', borderRadius: '2px', border: '1px solid rgba(25,24,23,0.06)' }}>
                  <div style={{ fontSize: '1.6rem', fontFamily: 'var(--font-heading)', color: '#B8976C' }}>24%</div>
                  <div style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#5C5955' }}>
                    Average Pure Oil Concentration
                  </div>
                </div>
                <div style={{ backgroundColor: '#FAF8F5', padding: '18px', borderRadius: '2px', border: '1px solid rgba(25,24,23,0.06)' }}>
                  <div style={{ fontSize: '1.6rem', fontFamily: 'var(--font-heading)', color: '#B8976C' }}>12 Wks</div>
                  <div style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#5C5955' }}>
                    Slow Maceration Period
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 3: Ingredients & Sustainability Pillars */}
      <section style={{ padding: '96px 0' }} id="sustainability">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">CONSCIOUS LUXURY</span>
            <h2 className="section-title">SUSTAINABILITY & BOTANICAL PURITY</h2>
            <div className="editorial-divider" />
            <p className="section-description">
              True luxury does not borrow from the future. Our sustainability charter touches every droplet and presentation box we produce.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '28px',
            }}
          >
            {[
              {
                icon: <Leaf size={24} color="#B8976C" />,
                title: '100% Organic Alcohol',
                desc: 'Compounded exclusively with French organic beet and wheat spirits, eliminating harsh synthetic distillates.'
              },
              {
                icon: <Heart size={24} color="#B8976C" />,
                title: 'Ethical Botanical Sourcing',
                desc: 'Direct partnerships with multi-generational family growers in Grasse, Haiti, Madagascar, and Calabria.'
              },
              {
                icon: <ShieldCheck size={24} color="#B8976C" />,
                title: 'Clean Formulation',
                desc: 'Cruelty-free, vegan, and formulated without phthalates, BHT, artificial colorants, or endocrine disruptors.'
              },
              {
                icon: <Award size={24} color="#B8976C" />,
                title: 'Heirloom Packaging',
                desc: 'Heavy Italian flint glass engineered to be refilled, paired with 100% FSC-certified recyclable textured boxes.'
              }
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#FFFFFF',
                  padding: '36px 28px',
                  borderRadius: '2px',
                  border: '1px solid rgba(25, 24, 23, 0.08)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div style={{ marginBottom: '16px' }}>{item.icon}</div>
                <h3 style={{ fontSize: '1.15rem', fontFamily: 'var(--font-heading)', marginBottom: '10px' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '0.86rem', color: '#5C5955', lineHeight: 1.7 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chapter 4: Founder's Note */}
      <section style={{ padding: '80px 0', backgroundColor: '#1E1C1A', color: '#FAF8F5' }}>
        <div className="container" style={{ maxWidth: '820px', textAlign: 'center' }}>
          <span style={{ fontSize: '0.72rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: '#B8976C', display: 'block', marginBottom: '16px' }}>
            FOUNDER'S JOURNAL NOTE
          </span>
          <blockquote
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)',
              lineHeight: 1.6,
              color: '#FAF8F5',
              fontStyle: 'italic',
              marginBottom: '28px',
            }}
          >
            "A signature fragrance is not an accessory you put on. It is an unseen architecture of who you are, how you love, and the quiet shadow of memory you leave behind."
          </blockquote>
          <div style={{ fontSize: '0.88rem', fontWeight: 600, letterSpacing: '0.08em', color: '#DFCEB7' }}>
            AURELIA DELACROIX
          </div>
          <div style={{ fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8E8A83', marginTop: '4px' }}>
            Maison Founder & Master Nose, Grasse
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{ padding: '80px 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', marginBottom: '16px' }}>
            Discover Your Own Signature
          </h2>
          <p style={{ color: '#5C5955', maxWidth: '500px', margin: '0 auto 28px' }}>
            We invite you to experience the complete collection with complimentary samples and door-to-door concierge delivery.
          </p>
          <Link to="/shop" className="btn-primary" style={{ gap: '8px' }}>
            <span>EXPLORE ALL FRAGRANCES</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
};
