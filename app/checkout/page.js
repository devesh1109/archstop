'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle, Download, CreditCard, Lock } from 'lucide-react';
import { useCart } from '@/lib/CartContext';

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const [completed, setCompleted] = useState(false);

  if (completed) {
    return (
      <div className="checkout-success">
        <div className="container" style={{ textAlign: 'center', padding: '100px 0' }}>
          <div className="success-icon"><CheckCircle size={64} color="var(--success)" /></div>
          <h1 className="success-title">Purchase Complete!</h1>
          <p className="success-sub">Your files are ready for download</p>
          <div className="download-list">
            {items.map(item => (
              <div key={item.id} className="download-item glass-card">
                <Image src={item.image} alt={item.title} width={60} height={42} style={{ objectFit: 'cover', borderRadius: 6 }} />
                <div className="download-info">
                  <span className="download-name">{item.title}</span>
                  <span className="download-formats">{item.formats.join(', ')}</span>
                </div>
                <button className="btn btn-primary btn-sm"><Download size={14} /> Download</button>
              </div>
            ))}
          </div>
          <Link href="/browse" className="btn btn-secondary btn-lg" style={{ marginTop: 32 }}>Continue Browsing</Link>
        </div>
        <style jsx>{`
          .success-icon { margin-bottom: var(--space-lg); animation: float 3s ease-in-out infinite; }
          .success-title { font-family: var(--font-display); font-size: var(--text-3xl); font-weight: 700; margin-bottom: var(--space-sm); }
          .success-sub { color: var(--text-muted); margin-bottom: var(--space-2xl); font-size: var(--text-lg); }
          .download-list { max-width: 500px; margin: 0 auto; display: flex; flex-direction: column; gap: var(--space-md); }
          .download-item { display: flex; align-items: center; gap: var(--space-md); padding: var(--space-md); }
          .download-info { flex: 1; text-align: left; }
          .download-name { display: block; font-weight: 600; font-size: var(--text-sm); }
          .download-formats { font-size: var(--text-xs); color: var(--text-muted); }
        `}</style>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '120px 0' }}>
        <h2>No items to checkout</h2>
        <Link href="/browse" className="btn btn-primary" style={{ marginTop: 16 }}>Browse Designs</Link>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <h1 className="page-title">Checkout</h1>
        <div className="checkout-layout">
          <div className="checkout-form">
            <div className="form-section glass-card">
              <h3 className="form-section-title"><CreditCard size={18} /> Payment Details</h3>
              <p className="demo-notice badge badge-accent" style={{ marginBottom: 16 }}>
                ✦ Demo Mode — No real payment will be processed
              </p>
              <div className="form-group">
                <label>Email</label>
                <input type="email" className="input" defaultValue="demo@urbanmarket.com" />
              </div>
              <div className="form-group">
                <label>Card Number</label>
                <input type="text" className="input" defaultValue="4242 4242 4242 4242" />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Expiry</label>
                  <input type="text" className="input" defaultValue="12/28" />
                </div>
                <div className="form-group">
                  <label>CVC</label>
                  <input type="text" className="input" defaultValue="123" />
                </div>
              </div>
              <div className="form-group">
                <label>Name on Card</label>
                <input type="text" className="input" defaultValue="Demo User" />
              </div>
            </div>
          </div>

          <div className="checkout-summary glass-card">
            <h3 className="summary-title">Order Summary</h3>
            {items.map(item => (
              <div key={item.id} className="checkout-item">
                <span className="checkout-item-name">{item.title}</span>
                <span className="price">${item.price}</span>
              </div>
            ))}
            <div className="summary-divider" />
            <div className="checkout-item total">
              <span>Total</span>
              <span className="price" style={{ fontSize: 'var(--text-xl)' }}>${total.toFixed(2)}</span>
            </div>
            <button className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: 'var(--space-lg)' }}
              onClick={() => setCompleted(true)}>
              <Lock size={16} /> Pay ${total.toFixed(2)}
            </button>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', textAlign: 'center', marginTop: 12 }}>
              🔒 Secured with 256-bit encryption
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .checkout-page { padding: var(--space-2xl) 0; }
        .page-title { font-family: var(--font-display); font-size: var(--text-3xl); font-weight: 700; margin-bottom: var(--space-xl); }
        .checkout-layout { display: grid; grid-template-columns: 1fr 380px; gap: var(--space-xl); align-items: start; }
        .form-section { padding: var(--space-xl); }
        .form-section-title { font-family: var(--font-display); font-weight: 600; display: flex; align-items: center; gap: var(--space-sm); margin-bottom: var(--space-lg); }
        .form-group { margin-bottom: var(--space-md); }
        .form-group label { display: block; font-size: var(--text-sm); font-weight: 500; color: var(--text-secondary); margin-bottom: 6px; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-md); }
        .checkout-summary { padding: var(--space-xl); position: sticky; top: calc(var(--nav-height) + 24px); }
        .summary-title { font-family: var(--font-display); font-weight: 600; font-size: var(--text-lg); margin-bottom: var(--space-lg); }
        .checkout-item { display: flex; justify-content: space-between; font-size: var(--text-sm); color: var(--text-secondary); margin-bottom: var(--space-md); }
        .checkout-item-name { max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .checkout-item.total { color: var(--text-primary); font-weight: 600; font-size: var(--text-base); }
        .summary-divider { height: 1px; background: var(--border); margin: var(--space-md) 0; }
        @media (max-width: 768px) { .checkout-layout { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}
