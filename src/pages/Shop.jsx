import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, Search as SearchIcon, X, ChevronDown, Check } from 'lucide-react';
import { PRODUCTS, FRAGRANCE_FAMILIES } from '../data/products';
import { ProductGrid } from '../components/product/ProductGrid';

export const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Filters State from URL or Defaults
  const initialCategory = searchParams.get('category') || 'All';
  const initialGender = searchParams.get('gender') || 'All';
  const initialFamily = searchParams.get('family') || 'All';
  const initialSearch = searchParams.get('q') || '';

  const [category, setCategory] = useState(initialCategory);
  const [gender, setGender] = useState(initialGender);
  const [family, setFamily] = useState(initialFamily);
  const [priceRange, setPriceRange] = useState('All');
  const [minRating, setMinRating] = useState('All');
  const [sizeFilter, setSizeFilter] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState(initialSearch);

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Sync state if URL changes
  useEffect(() => {
    if (searchParams.get('gender')) setGender(searchParams.get('gender'));
    if (searchParams.get('family')) setFamily(searchParams.get('family'));
    if (searchParams.get('category')) setCategory(searchParams.get('category'));
    if (searchParams.get('q')) setSearchQuery(searchParams.get('q'));
    window.scrollTo(0, 0);
  }, [searchParams]);

  // Simulate quick luxury skeleton load when major filters shift
  const handleFilterChange = (setter, value) => {
    setter(value);
    setLoading(true);
    setTimeout(() => setLoading(false), 220);
  };

  const handleResetFilters = () => {
    setCategory('All');
    setGender('All');
    setFamily('All');
    setPriceRange('All');
    setMinRating('All');
    setSizeFilter('All');
    setSearchQuery('');
    setSortBy('featured');
    setSearchParams({});
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (category !== 'All' && product.category !== category) return false;

      // Gender filter
      if (gender !== 'All' && product.gender !== gender && product.gender !== 'Unisex') return false;

      // Fragrance family
      if (family !== 'All' && product.fragranceFamily !== family) return false;

      // Price range
      if (priceRange === 'under-150' && product.price >= 150) return false;
      if (priceRange === '150-180' && (product.price < 150 || product.price > 180)) return false;
      if (priceRange === 'over-180' && product.price <= 180) return false;

      // Rating
      if (minRating === '4.8' && product.rating < 4.8) return false;
      if (minRating === '4.9' && product.rating < 4.9) return false;

      // Size
      if (sizeFilter !== 'All' && !product.sizes.some((s) => s.size === sizeFilter)) return false;

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesFamily = product.fragranceFamily.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        const matchesNotes = Object.values(product.notes).flat().some((n) => n.toLowerCase().includes(q));
        if (!matchesName && !matchesFamily && !matchesDesc && !matchesNotes) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0; // featured default
    });
  }, [category, gender, family, priceRange, minRating, sizeFilter, searchQuery, sortBy]);

  const activeFilterCount =
    (category !== 'All' ? 1 : 0) +
    (gender !== 'All' ? 1 : 0) +
    (family !== 'All' ? 1 : 0) +
    (priceRange !== 'All' ? 1 : 0) +
    (minRating !== 'All' ? 1 : 0) +
    (sizeFilter !== 'All' ? 1 : 0) +
    (searchQuery ? 1 : 0);

  const categoriesList = ['All', 'Eau de Parfum', 'Extrait de Parfum', 'Eau de Cologne', 'Eau de Toilette'];
  const genderList = ['All', 'Women', 'Men', 'Unisex'];
  const familiesList = ['All', 'Woody', 'Floral', 'Fresh', 'Oriental', 'Gourmand', 'Citrus'];
  const priceList = [
    { label: 'All Prices', val: 'All' },
    { label: 'Under $150', val: 'under-150' },
    { label: '$150 — $180', val: '150-180' },
    { label: 'Above $180', val: 'over-180' },
  ];
  const sizeList = ['All', '30ml', '50ml', '100ml'];

  return (
    <div style={{ backgroundColor: '#FAF8F5', minHeight: '100vh', paddingBottom: '96px' }}>
      {/* Editorial Header Banner */}
      <div
        style={{
          backgroundColor: '#F3EFE8',
          padding: '64px 0 48px',
          borderBottom: '1px solid rgba(25, 24, 23, 0.08)',
          textAlign: 'center',
        }}
      >
        <div className="container">
          <span
            style={{
              fontSize: '0.72rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: '#B8976C',
              fontWeight: 500,
              display: 'block',
              marginBottom: '10px',
            }}
          >
            THE COMPLETE ATELIER PORTFOLIO
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.4rem, 4.5vw, 3.6rem)',
              letterSpacing: '0.08em',
              fontWeight: 400,
              marginBottom: '14px',
            }}
          >
            ALL FRAGRANCES
          </h1>
          <p
            style={{
              fontSize: '0.94rem',
              color: '#5C5955',
              maxWidth: '560px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Each bottle is compounded in small batches using slow aging techniques. Browse by olfactory family, concentration, or desired presence.
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '40px' }}>
        {/* Search & Top Action Bar */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
            paddingBottom: '24px',
            marginBottom: '32px',
            borderBottom: '1px solid rgba(25, 24, 23, 0.08)',
          }}
        >
          {/* Mobile Filter Button */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="mobile-only"
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 18px',
              border: '1px solid rgba(25, 24, 23, 0.2)',
              borderRadius: '2px',
              fontSize: '0.75rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              backgroundColor: '#FFFFFF',
            }}
          >
            <SlidersHorizontal size={14} />
            <span>Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
          </button>

          {/* Product Count */}
          <div style={{ fontSize: '0.86rem', color: '#5C5955' }}>
            Showing <strong style={{ color: '#191817' }}>{filteredProducts.length}</strong> of {PRODUCTS.length} fragrances
          </div>

          {/* Search Box */}
          <div
            style={{
              position: 'relative',
              minWidth: '260px',
              flex: '1 1 auto',
              maxWidth: '380px',
            }}
          >
            <SearchIcon
              size={15}
              color="#8E8A83"
              style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notes or names..."
              style={{
                width: '100%',
                padding: '10px 36px',
                border: '1px solid rgba(25, 24, 23, 0.15)',
                borderRadius: '2px',
                fontSize: '0.82rem',
                backgroundColor: '#FFFFFF',
                outline: 'none',
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: '#8E8A83' }}
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#8E8A83' }}>
              Sort By:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: '9px 14px',
                border: '1px solid rgba(25, 24, 23, 0.15)',
                borderRadius: '2px',
                backgroundColor: '#FFFFFF',
                fontSize: '0.8rem',
                color: '#191817',
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              <option value="featured">Featured Curations</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="name">Alphabetical (A - Z)</option>
            </select>
          </div>
        </div>

        {/* Active Filters Bar */}
        {activeFilterCount > 0 && (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '28px',
            }}
          >
            <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#8E8A83' }}>
              Active Filters:
            </span>
            {gender !== 'All' && (
              <span
                onClick={() => setGender('All')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 10px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid rgba(25, 24, 23, 0.12)',
                  borderRadius: '2px',
                  fontSize: '0.72rem',
                  cursor: 'pointer',
                }}
              >
                Gender: {gender} <X size={12} />
              </span>
            )}
            {family !== 'All' && (
              <span
                onClick={() => setFamily('All')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 10px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid rgba(25, 24, 23, 0.12)',
                  borderRadius: '2px',
                  fontSize: '0.72rem',
                  cursor: 'pointer',
                }}
              >
                Family: {family} <X size={12} />
              </span>
            )}
            {category !== 'All' && (
              <span
                onClick={() => setCategory('All')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 10px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid rgba(25, 24, 23, 0.12)',
                  borderRadius: '2px',
                  fontSize: '0.72rem',
                  cursor: 'pointer',
                }}
              >
                Type: {category} <X size={12} />
              </span>
            )}
            {priceRange !== 'All' && (
              <span
                onClick={() => setPriceRange('All')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 10px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid rgba(25, 24, 23, 0.12)',
                  borderRadius: '2px',
                  fontSize: '0.72rem',
                  cursor: 'pointer',
                }}
              >
                Price: {priceRange} <X size={12} />
              </span>
            )}
            {searchQuery && (
              <span
                onClick={() => setSearchQuery('')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 10px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid rgba(25, 24, 23, 0.12)',
                  borderRadius: '2px',
                  fontSize: '0.72rem',
                  cursor: 'pointer',
                }}
              >
                Search: "{searchQuery}" <X size={12} />
              </span>
            )}
            <button
              onClick={handleResetFilters}
              style={{
                fontSize: '0.72rem',
                color: '#B8976C',
                textDecoration: 'underline',
                cursor: 'pointer',
                marginLeft: '8px',
              }}
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Main Layout: Filter Sidebar + Product Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '260px 1fr',
            gap: '44px',
            alignItems: 'start',
          }}
          className="shop-layout"
        >
          {/* Desktop Filter Sidebar */}
          <aside
            className="desktop-filter-sidebar"
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid rgba(25, 24, 23, 0.08)',
              borderRadius: '3px',
              padding: '24px 20px',
              position: 'sticky',
              top: '100px',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingBottom: '16px',
                borderBottom: '1px solid rgba(25, 24, 23, 0.08)',
                marginBottom: '20px',
              }}
            >
              <h3 style={{ fontSize: '0.95rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-heading)' }}>
                Filter By
              </h3>
              {activeFilterCount > 0 && (
                <button
                  onClick={handleResetFilters}
                  style={{ fontSize: '0.7rem', color: '#B8976C', textTransform: 'uppercase', letterSpacing: '0.1em' }}
                >
                  Reset
                </button>
              )}
            </div>

            {/* Fragrance Family Filter */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#191817', marginBottom: '12px' }}>
                Fragrance Family
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {familiesList.map((f) => (
                  <label
                    key={f}
                    onClick={() => handleFilterChange(setFamily, f)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '0.82rem',
                      color: family === f ? '#B8976C' : '#5C5955',
                      fontWeight: family === f ? 600 : 400,
                      cursor: 'pointer',
                      padding: '3px 0',
                    }}
                  >
                    <span>{f === 'All' ? 'All Families' : f}</span>
                    {family === f && <Check size={14} color="#B8976C" />}
                  </label>
                ))}
              </div>
            </div>

            {/* Gender / Intention Filter */}
            <div style={{ marginBottom: '24px', paddingTop: '18px', borderTop: '1px solid rgba(25, 24, 23, 0.06)' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#191817', marginBottom: '12px' }}>
                Gender & Aura
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {genderList.map((g) => (
                  <label
                    key={g}
                    onClick={() => handleFilterChange(setGender, g)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '0.82rem',
                      color: gender === g ? '#B8976C' : '#5C5955',
                      fontWeight: gender === g ? 600 : 400,
                      cursor: 'pointer',
                      padding: '3px 0',
                    }}
                  >
                    <span>{g === 'All' ? 'All Genders' : g}</span>
                    {gender === g && <Check size={14} color="#B8976C" />}
                  </label>
                ))}
              </div>
            </div>

            {/* Concentration Type Filter */}
            <div style={{ marginBottom: '24px', paddingTop: '18px', borderTop: '1px solid rgba(25, 24, 23, 0.06)' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#191817', marginBottom: '12px' }}>
                Concentration
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {categoriesList.map((c) => (
                  <label
                    key={c}
                    onClick={() => handleFilterChange(setCategory, c)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '0.82rem',
                      color: category === c ? '#B8976C' : '#5C5955',
                      fontWeight: category === c ? 600 : 400,
                      cursor: 'pointer',
                      padding: '3px 0',
                    }}
                  >
                    <span>{c === 'All' ? 'All Concentrations' : c}</span>
                    {category === c && <Check size={14} color="#B8976C" />}
                  </label>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div style={{ marginBottom: '24px', paddingTop: '18px', borderTop: '1px solid rgba(25, 24, 23, 0.06)' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#191817', marginBottom: '12px' }}>
                Price Range
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {priceList.map((p) => (
                  <label
                    key={p.val}
                    onClick={() => handleFilterChange(setPriceRange, p.val)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '0.82rem',
                      color: priceRange === p.val ? '#B8976C' : '#5C5955',
                      fontWeight: priceRange === p.val ? 600 : 400,
                      cursor: 'pointer',
                      padding: '3px 0',
                    }}
                  >
                    <span>{p.label}</span>
                    {priceRange === p.val && <Check size={14} color="#B8976C" />}
                  </label>
                ))}
              </div>
            </div>

            {/* Size Filter */}
            <div style={{ paddingTop: '18px', borderTop: '1px solid rgba(25, 24, 23, 0.06)' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#191817', marginBottom: '12px' }}>
                Bottle Size
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                {sizeList.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleFilterChange(setSizeFilter, s)}
                    style={{
                      flex: 1,
                      padding: '7px 4px',
                      border: sizeFilter === s ? '1px solid #191817' : '1px solid rgba(25, 24, 23, 0.12)',
                      backgroundColor: sizeFilter === s ? '#191817' : '#FAF8F5',
                      color: sizeFilter === s ? '#FAF8F5' : '#191817',
                      fontSize: '0.72rem',
                      borderRadius: '2px',
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Grid Section */}
          <main>
            <ProductGrid products={filteredProducts} loading={loading} />
          </main>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {mobileFilterOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex' }}>
          <div
            onClick={() => setMobileFilterOpen(false)}
            style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(25, 24, 23, 0.5)' }}
          />
          <div
            style={{
              position: 'relative',
              width: '85%',
              maxWidth: '320px',
              height: '100%',
              backgroundColor: '#FAF8F5',
              padding: '24px',
              overflowY: 'auto',
              boxShadow: 'var(--shadow-drawer)',
              zIndex: 10000,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-heading)' }}>FILTERS</h3>
              <button onClick={() => setMobileFilterOpen(false)} style={{ padding: '4px' }}>
                <X size={20} />
              </button>
            </div>

            {/* Mobile filter controls */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 600, marginBottom: '8px' }}>FRAGRANCE FAMILY</div>
                {familiesList.map((f) => (
                  <div
                    key={f}
                    onClick={() => { setFamily(f); setMobileFilterOpen(false); }}
                    style={{ padding: '6px 0', fontSize: '0.85rem', color: family === f ? '#B8976C' : '#191817' }}
                  >
                    {f}
                  </div>
                ))}
              </div>

              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 600, marginBottom: '8px' }}>GENDER</div>
                {genderList.map((g) => (
                  <div
                    key={g}
                    onClick={() => { setGender(g); setMobileFilterOpen(false); }}
                    style={{ padding: '6px 0', fontSize: '0.85rem', color: gender === g ? '#B8976C' : '#191817' }}
                  >
                    {g}
                  </div>
                ))}
              </div>

              <button
                onClick={() => { handleResetFilters(); setMobileFilterOpen(false); }}
                className="btn-outline"
                style={{ width: '100%', marginTop: '20px' }}
              >
                CLEAR ALL FILTERS
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 900px) {
          .shop-layout {
            grid-template-columns: 1fr !important;
          }
          .desktop-filter-sidebar {
            display: none !important;
          }
          .mobile-only {
            display: inline-flex !important;
          }
        }
      `}</style>
    </div>
  );
};
