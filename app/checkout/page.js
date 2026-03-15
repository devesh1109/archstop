'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle, Download, CreditCard, Lock, ChevronLeft } from 'lucide-react';
import { useCart } from '@/lib/CartContext';

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const [completed, setCompleted] = useState(false);

  if (completed) {
    return (
      <div className="checkout-success">
        <div className="container" style={{ textAlign: 'center', padding: '60px 0' }}>
          <div style={{ marginBottom: 16 }}><CheckCircle size={56} color="var(--success)" /></div>
          <h1 className="success-title">Purchase Complete!</h1>
          <p style={{ color: 'var(--text-muted)', marginBottom: 24, fontSize: 'var(--text-base)' }}>Your files are ready for download</p>
          <div className="download-list">
            {items.map(item => (
              <div key={item.id} className="ios-row download-item">
                <Image src={item.image} alt={item.title} width={52} height={36} style={{ objectFit: 'cover', borderRadius: 6 }} />
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <span style={{ fontWeight: 600, fontSize: 'var(--text-sm)', display: 'block' }}>{item.title}</span>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>{item.formats.join(', ')}</span>
                </div>
                <button className="btn btn-primary btn-sm"><Download size={13} /> Get</button>
              </div>
            ))}
          </div>
          <Link href="/browse" className="btn btn-secondary" style={{ marginTop: 24 }}>Continue Browsing</Link>
        </div>
        <style jsx>{`
          .success-title {
            font-family: var(--font-display);
            font-size: var(--text-2xl);
            font-weight: 700;
            letter-spacing: -0.02em;
            margin-bottom: 4px;
          }
          .download-list {
            max-width: 440px;
            margin: 0 auto;
          }
          .download-item { gap: 12px; }
        `}</style>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '80px 0' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>No items to checkout</h2>
        <Link href="/browse" className="btn btn-primary" style={{ marginTop: 16 }}>Browse Designs</Link>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      {/* iOS Nav */}
      <div className="ios-checkout-nav">
        <Link href="/cart" className="ios-nav-back">
          <ChevronLeft size={22} /><span>Cart</span>
        </Link>
        <span className="ios-nav-title">Checkout</span>
        <div style={{ width: 60 }} />
      </div>

      <div className="container">
        <div className="checkout-header">
          <h1 className="ios-page-title">Checkout</h1>
        </div>

        <div className="checkout-layout">
          <div className="checkout-form">
            <div className="ios-group">
              <div className="ios-row" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 12, padding: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <CreditCard size={18} color="var(--ios-tint)" />
                  <span style={{ fontWeight: 600 }}>Payment Details</span>
                </div>
                <p className="badge badge-accent" style={{ alignSelf: 'flex-start' }}>Demo Mode — No real payment</p>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" className="input" defaultValue="demo@archstop.com" />
                </div>
                <div className="form-group">
                  <label>Card Number</label>
                  <input type="text" className="input" defaultValue="4242 4242 4242 4242" />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
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
          </div>

          <div className="checkout-summary">
            <div className="ios-group">
              {items.map(item => (
                <div key={item.id} className="ios-row" style={{ justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 'var(--text-sm)', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</span>
                  <span className="price" style={{ fontSize: 'var(--text-sm)' }}>${item.price}</span>
                </div>
              ))}
              <div className="ios-row" style={{ justifyContent: 'space-between', fontWeight: 700 }}>
                <span>Total</span>
                <span className="price" style={{ fontSize: 'var(--text-xl)' }}>${total.toFixed(2)}</span>
              </div>
            </div>
            <button className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: 12 }}
              onClick={() => setCompleted(true)}>
              <Lock size={15} /> Pay ${total.toFixed(2)}
            </button>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', textAlign: 'center', marginTop: 10 }}>
              Secured with 256-bit encryption
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .checkout-page { padding-bottom: var(--space-2xl); }
        .ios-checkout-nav { display: none; }
        .checkout-header { padding: var(--space-lg) 0 var(--space-md); }
        .checkout-layout {
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
        }
        .form-group { display: flex; flex-direction: column; gap: 4px; }
        .form-group label { font-size: var(--text-sm); font-weight: 500; color: var(--text-secondary); }

        @media (max-width: 768px) {
          .ios-checkout-nav {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 8px 16px;
            padding-top: calc(8px + env(safe-area-inset-top, 0px));
            background: var(--ios-bar-bg);
            backdrop-filter: saturate(180%) blur(20px);
            -webkit-backdrop-filter: saturate(180%) blur(20px);
            border-bottom: 0.5px solid var(--ios-separator);
            min-height: 44px;
          }
        }

        @media (min-width: 769px) {
          .checkout-header { padding-top: var(--space-xl); }
          .checkout-layout {
            display: grid;
            grid-template-columns: 1fr 380px;
            gap: var(--space-xl);
            align-items: start;
          }
          .checkout-summary { position: sticky; top: 76px; }
        }
      `}</style>
    </div>
  );
}
