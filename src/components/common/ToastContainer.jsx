import React from 'react';
import { useShop } from '../../context/ShopContext';
import { Check, Info, X } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts, removeToast } = useShop();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        maxWidth: '380px',
        width: 'calc(100% - 48px)',
        pointerEvents: 'none'
      }}
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          style={{
            pointerEvents: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            backgroundColor: '#191817',
            color: '#FAF8F5',
            padding: '14px 18px',
            borderRadius: '3px',
            boxShadow: '0 12px 32px rgba(0, 0, 0, 0.25)',
            borderLeft: '3px solid #B8976C',
            animation: 'fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            fontSize: '0.82rem',
            letterSpacing: '0.02em',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {toast.type === 'success' ? (
              <span style={{ color: '#B8976C', display: 'flex' }}><Check size={16} /></span>
            ) : (
              <span style={{ color: '#D4CFCA', display: 'flex' }}><Info size={16} /></span>
            )}
            <span>{toast.message}</span>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            style={{
              color: '#8E8A83',
              display: 'flex',
              padding: '2px',
              transition: 'color 0.2s'
            }}
            aria-label="Close notification"
            onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#8E8A83'}
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
};
