'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, ShoppingBag, ArrowRight, ChevronLeft } from 'lucide-react';
import { useCart } from '@/lib/CartContext';

export default function CartPage() {
  const { items, removeItem, clearCart, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="empty-cart">
        <div className="ios-cart-nav">
          <Link href="/browse" className="ios-nav-back">
            <ChevronLeft size={22} /><span>Browse</span>
          </Link>
          <span className="ios-nav-title">Cart</span>
          <div style={{ width: 60 }} />
        </div>
        <div className="container" style={{ textAlign: 'center', padding: '80px 0' }}>
          <div style={{ fontSize: 56, marginBottom: 12 }}>🛒</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 6 }}>Your cart is empty</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: 20, fontSize: 'var(--text-base)' }}>Discover amazing architectural designs</p>
          <Link href="/browse" className="btn btn-primary"><ShoppingBag size={16} /> Browse Designs</Link>
        </div>
        <style jsx>{`
          .ios-cart-nav {
            display: none;
          }
          @media (max-width: 768px) {
            .ios-cart-nav {
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 8px 16px;
              padding-top: calc(8px + env(safe-area-inset-top, 0px));
              background: var(--ios-bar-bg);
              backdrop-filter: saturate(180%) blur(20px);
              -webkit-backdrop-filter: saturate(180%) blur(20px);
              border-bottom: 0.5px solid var(--ios-separator);
              position: sticky;
              top: 0;
              z-index: 100;
              min-height: 44px;
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="cart-page">
      {/* iOS Nav */}
      <div className="ios-cart-nav">
        <Link href="/browse" className="ios-nav-back">
          <ChevronLeft size={22} /><span>Browse</span>
        </Link>
        <span className="ios-nav-title">Cart</span>
        <button onClick={clearCart} className="cart-clear-btn">Clear</button>
      </div>

      <div className="container">
        <div className="cart-header">
          <h1 className="ios-page-title">Cart</h1>
          <p className="ios-page-subtitle">{items.length} item{items.length > 1 ? 's' : ''}</p>
        </div>

        <div className="cart-layout">
          {/* Cart Items */}
          <div className="ios-group cart-items-group">
            {items.map((item, idx) => (
              <div key={item.id} className="ios-row cart-item-row">
                <div className="cart-item-thumb">
                  <Image src={item.image} alt={item.title} width={64} height={48} style={{ objectFit: 'cover', borderRadius: 8 }} />
                </div>
                <div className="cart-item-info">
                  <Link href={`/design/${item.id}`} className="cart-item-title">{item.title}</Link>
                  <span className="cart-item-category">{item.category.replace(/-/g, ' ')}</span>
                  <div className="cart-item-formats">
                    {item.formats.slice(0, 3).map(f => <span key={f} className="badge" style={{ fontSize: 9, padding: '1px 6px' }}>{f}</span>)}
                  </div>
                </div>
                <div className="cart-item-right">
                  <span className="price">${item.price}</span>
                  <button onClick={() => removeItem(item.id)} className="cart-remove-btn" aria-label="Remove">
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="cart-summary">
            <div className="ios-group">
              <div className="ios-row summary-row">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="ios-row summary-row">
                <span>Platform Fee</span>
                <span style={{ color: 'var(--success)' }}>Free</span>
              </div>
              <div className="ios-row summary-row summary-total">
                <span style={{ fontWeight: 700 }}>Total</span>
                <span className="price" style={{ fontSize: 'var(--text-xl)' }}>${total.toFixed(2)}</span>
              </div>
            </div>
            <Link href="/checkout" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: 12 }}>
              Checkout <ArrowRight size={16} />
            </Link>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', textAlign: 'center', marginTop: 10 }}>
              Secure checkout · Instant download · 30-day guarantee
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .cart-page { padding-bottom: var(--space-2xl); }

        .ios-cart-nav { display: none; }

        .cart-header { padding: var(--space-lg) 0 var(--space-md); }
        .cart-layout {
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
        }

        .cart-item-row { gap: 12px; }
        .cart-item-thumb { flex-shrink: 0; border-radius: 8px; overflow: hidden; }
        .cart-item-info { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
        .cart-item-title {
          font-weight: 600;
          font-size: var(--text-base);
          letter-spacing: -0.01em;
          display: block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .cart-item-category { font-size: var(--text-xs); color: var(--text-muted); text-transform: capitalize; }
        .cart-item-formats { display: flex; gap: 3px; margin-top: 2px; }
        .cart-item-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 6px;
          flex-shrink: 0;
        }
        .cart-remove-btn {
          color: #ff3b30;
          padding: 4px;
          display: flex;
        }
        .cart-remove-btn:active { opacity: 0.5; }

        .summary-row {
          justify-content: space-between;
          font-size: var(--text-base);
          color: var(--text-secondary);
        }
        .summary-total {
          color: var(--text-primary);
        }

        .cart-clear-btn {
          color: #ff3b30;
          font-size: var(--text-base);
          font-weight: 400;
        }

        @media (max-width: 768px) {
          .ios-cart-nav {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 8px 16px;
            padding-top: calc(8px + env(safe-area-inset-top, 0px));
            background: var(--ios-bar-bg);
            backdrop-filter: saturate(180%) blur(20px);
            -webkit-backdrop-filter: saturate(180%) blur(20px);
            border-bottom: 0.5px solid var(--ios-separator);
            position: sticky;
            top: 0;
            z-index: 100;
            min-height: 44px;
          }
        }

        @media (min-width: 769px) {
          .cart-header { padding-top: var(--space-xl); }
          .cart-layout {
            display: grid;
            grid-template-columns: 1fr 360px;
            gap: var(--space-xl);
            align-items: start;
          }
          .cart-summary { position: sticky; top: 76px; }
        }
      `}</style>
    </div>
  );
}
