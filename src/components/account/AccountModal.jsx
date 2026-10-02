import React from 'react';
import { X, User, Package, Award, Sparkles, MapPin } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const AccountModal = () => {
  const { isAccountOpen, setIsAccountOpen } = useShop();

  if (!isAccountOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9600,
        backgroundColor: 'rgba(25, 24, 23, 0.65)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        animation: 'fadeIn 0.25s ease',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '520px',
          backgroundColor: '#FAF8F5',
          borderRadius: '4px',
          boxShadow: 'var(--shadow-lg)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        {/* Top Header */}
        <div
          style={{
            padding: '24px 28px',
            backgroundColor: '#191817',
            color: '#FAF8F5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: 'rgba(184, 151, 108, 0.2)',
                border: '1px solid #B8976C',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#B8976C',
              }}
            >
              <User size={18} />
            </div>
            <div>
              <span style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#B8976C' }}>
                ÉLAN Privé Member
              </span>
              <h3 style={{ fontSize: '1.15rem', fontFamily: 'var(--font-heading)' }}>
                Eleanor Vane
              </h3>
            </div>
          </div>
          <button
            onClick={() => setIsAccountOpen(false)}
            aria-label="Close account"
            style={{ color: '#D4CFCA', padding: '6px' }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#D4CFCA'}
          >
            <X size={20} />
          </button>
        </div>

        {/* Account Details */}
        <div style={{ padding: '28px' }}>
          {/* Status Tier */}
          <div
            style={{
              padding: '16px',
              backgroundColor: '#FAF5ED',
              borderRadius: '3px',
              border: '1px solid rgba(184, 151, 108, 0.3)',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Award size={20} color="#B8976C" />
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#191817' }}>Maison Ambassador Tier</div>
                <div style={{ fontSize: '0.75rem', color: '#6B6761' }}>Complimentary standard shipping on all orders</div>
              </div>
            </div>
            <span style={{ fontSize: '0.78rem', color: '#8F7249', fontWeight: 600 }}>450 Pts</span>
          </div>

          {/* Quick Menu */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 16px',
                backgroundColor: '#FFFFFF',
                borderRadius: '2px',
                border: '1px solid rgba(25, 24, 23, 0.08)',
                fontSize: '0.88rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Package size={16} color="#8E8A83" />
                <span>Recent Fragrance Orders (2)</span>
              </div>
              <span style={{ fontSize: '0.72rem', color: '#B8976C', textTransform: 'uppercase', letterSpacing: '0.1em' }}>View</span>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 16px',
                backgroundColor: '#FFFFFF',
                borderRadius: '2px',
                border: '1px solid rgba(25, 24, 23, 0.08)',
                fontSize: '0.88rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <MapPin size={16} color="#8E8A83" />
                <span>Saved Boutiques & Addresses</span>
              </div>
              <span style={{ fontSize: '0.72rem', color: '#B8976C', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Edit</span>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 16px',
                backgroundColor: '#FFFFFF',
                borderRadius: '2px',
                border: '1px solid rgba(25, 24, 23, 0.08)',
                fontSize: '0.88rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Sparkles size={16} color="#8E8A83" />
                <span>Private Fragrance Concierge</span>
              </div>
              <span style={{ fontSize: '0.72rem', color: '#B8976C', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Online</span>
            </div>
          </div>

          <button
            onClick={() => setIsAccountOpen(false)}
            className="btn-outline"
            style={{ width: '100%', marginTop: '24px' }}
          >
            CLOSE MEMBER PORTAL
          </button>
        </div>
      </div>
    </div>
  );
};
