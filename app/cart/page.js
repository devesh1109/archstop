'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, ArrowLeft, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/lib/CartContext';

export default function CartPage() {
  const { items, removeItem, clearCart, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="empty-cart">
        <div className="container" style={{ textAlign: 'center', padding: '120px 0' }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>🛒</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', marginBottom: 8 }}>Your cart is empty</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: 24 }}>Discover amazing architectural resources</p>
          <Link href="/browse" className="btn btn-primary btn-lg"><ShoppingBag size={18} /> Browse Designs</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <Link href="/browse" className="back-link"><ArrowLeft size={16} /> Continue Shopping</Link>
        <h1 className="page-title">Shopping Cart</h1>
        <p className="cart-count">{items.length} item{items.length > 1 ? 's' : ''}</p>

        <div className="cart-layout">
          <div className="cart-items">
            {items.map(item => (
              <div key={item.id} className="cart-item glass-card">
                <div className="cart-item-image">
                  <Image src={item.image} alt={item.title} width={120} height={84} style={{ objectFit: 'cover', borderRadius: 8 }} />
                </div>
                <div className="cart-item-info">
                  <Link href={`/design/${item.id}`} className="cart-item-title">{item.title}</Link>
                  <p className="cart-item-category">{item.category.replace(/-/g, ' ')}</p>
                  <div className="cart-item-formats">
                    {item.formats.map(f => <span key={f} className="badge" style={{ fontSize: 10 }}>{f}</span>)}
                  </div>
                </div>
                <div className="cart-item-price">
                  <span className="price">${item.price}</span>
                  {item.originalPrice && <span className="price-original">${item.originalPrice}</span>}
                </div>
                <button onClick={() => removeItem(item.id)} className="cart-remove" aria-label="Remove">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            <button onClick={clearCart} className="btn btn-ghost" style={{ alignSelf: 'flex-start', marginTop: 8 }}>
              <Trash2 size={14} /> Clear Cart
            </button>
          </div>

          <div className="cart-summary glass-card">
            <h3 className="summary-title">Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Platform Fee</span>
              <span>$0.00</span>
            </div>
            <div className="summary-row">
              <span>Tax</span>
              <span>$0.00</span>
            </div>
            <div className="summary-divider" />
            <div className="summary-row summary-total">
              <span>Total</span>
              <span className="price" style={{ fontSize: 'var(--text-2xl)' }}>${total.toFixed(2)}</span>
            </div>
            <Link href="/checkout" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: 'var(--space-md)' }}>
              Proceed to Checkout <ArrowRight size={18} />
            </Link>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', textAlign: 'center', marginTop: 'var(--space-md)' }}>
              Secure checkout · Instant download · 30-day guarantee
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .cart-page { padding: var(--space-2xl) 0; }
        .back-link {
          display: inline-flex; align-items: center; gap: var(--space-sm);
          color: var(--text-muted); font-size: var(--text-sm);
          margin-bottom: var(--space-lg); transition: color var(--transition-fast);
        }
        .back-link:hover { color: var(--accent); }
        .page-title { font-family: var(--font-display); font-size: var(--text-3xl); font-weight: 700; }
        .cart-count { color: var(--text-muted); margin-bottom: var(--space-xl); }
        .cart-layout { display: grid; grid-template-columns: 1fr 360px; gap: var(--space-xl); align-items: start; }
        .cart-items { display: flex; flex-direction: column; gap: var(--space-md); }
        .cart-item { display: flex; align-items: center; gap: var(--space-md); padding: var(--space-md); }
        .cart-item-image { flex-shrink: 0; border-radius: var(--radius-md); overflow: hidden; }
        .cart-item-info { flex: 1; min-width: 0; }
        .cart-item-title { font-weight: 600; display: block; margin-bottom: 4px; transition: color var(--transition-fast); }
        .cart-item-title:hover { color: var(--accent); }
        .cart-item-category { font-size: var(--text-xs); color: var(--text-muted); text-transform: capitalize; margin-bottom: var(--space-xs); }
        .cart-item-formats { display: flex; gap: 4px; }
        .cart-item-price { text-align: right; flex-shrink: 0; }
        .cart-remove {
          color: var(--text-muted); padding: var(--space-sm); border-radius: var(--radius-sm);
          transition: all var(--transition-fast);
        }
        .cart-remove:hover { color: var(--error); background: rgba(248,113,113,0.1); }
        .cart-summary { padding: var(--space-xl); position: sticky; top: calc(var(--nav-height) + 24px); }
        .summary-title { font-family: var(--font-display); font-weight: 600; font-size: var(--text-lg); margin-bottom: var(--space-lg); }
        .summary-row { display: flex; justify-content: space-between; font-size: var(--text-sm); color: var(--text-secondary); margin-bottom: var(--space-md); }
        .summary-total { color: var(--text-primary); font-weight: 600; font-size: var(--text-base); }
        .summary-divider { height: 1px; background: var(--border); margin: var(--space-md) 0; }

        @media (max-width: 768px) {
          .cart-layout { grid-template-columns: 1fr; }
          .cart-item { flex-wrap: wrap; }
        }
      `}</style>
    </div>
  );
}
