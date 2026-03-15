'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Star, ShoppingCart } from 'lucide-react';
import { useCart } from '@/lib/CartContext';
import { getVendorById } from '@/lib/data';

export default function DesignCard({ design, index = 0 }) {
  const { addItem } = useCart();
  const vendor = getVendorById(design.vendorId);

  return (
    <div className={`design-card animate-fadeInUp stagger-${(index % 4) + 1}`}>
      <Link href={`/design/${design.id}`} className="design-card-image-wrap">
        <Image
          src={design.image}
          alt={design.title}
          width={400}
          height={280}
          className="design-card-image"
        />
        {design.originalPrice && (
          <span className="design-card-sale">
            {Math.round((1 - design.price / design.originalPrice) * 100)}% OFF
          </span>
        )}
      </Link>

      <div className="design-card-body">
        <div className="design-card-category">
          <span className="badge">{design.category.replace(/-/g, ' ')}</span>
        </div>

        <Link href={`/design/${design.id}`}>
          <h3 className="design-card-title">{design.title}</h3>
        </Link>

        <Link href={`/vendor/${design.vendorId}`} className="design-card-vendor">
          <span className="vendor-avatar-sm">{vendor?.avatar}</span>
          <span>{vendor?.name}</span>
        </Link>

        <div className="design-card-meta">
          <div className="design-card-rating">
            <Star size={13} fill="var(--accent)" stroke="var(--accent)" />
            <span>{design.rating}</span>
            <span className="review-count">({design.reviewCount})</span>
          </div>
          <div className="design-card-formats">
            {design.formats.slice(0, 2).map(f => (
              <span key={f} className="format-tag">{f}</span>
            ))}
          </div>
        </div>

        <div className="design-card-footer">
          <div className="design-card-price">
            <span className="price">${design.price}</span>
            {design.originalPrice && (
              <span className="price-original">${design.originalPrice}</span>
            )}
          </div>
          <button
            className="design-card-cart-btn"
            onClick={(e) => { e.preventDefault(); addItem(design); }}
            aria-label="Add to cart"
          >
            <ShoppingCart size={15} />
          </button>
        </div>
      </div>

      <style jsx>{`
        .design-card {
          background: var(--bg-card);
          border-radius: var(--radius-md);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: var(--ios-card-shadow);
          transition: transform 0.2s ease;
        }
        .design-card:active {
          transform: scale(0.97);
        }
        .design-card-image-wrap {
          position: relative;
          overflow: hidden;
          aspect-ratio: 16/11;
        }
        .design-card-image-wrap :global(img) {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .design-card-sale {
          position: absolute;
          top: 8px;
          left: 8px;
          background: #ff3b30;
          color: white;
          font-size: 11px;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: var(--radius-full);
          z-index: 2;
          letter-spacing: 0.02em;
        }
        .design-card-body {
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          flex: 1;
        }
        .design-card-category { text-transform: capitalize; }
        .design-card-title {
          font-family: var(--font-display);
          font-size: var(--text-base);
          font-weight: 600;
          line-height: 1.3;
          letter-spacing: -0.01em;
          color: var(--text-primary);
        }
        .design-card-vendor {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: var(--text-xs);
          color: var(--text-muted);
        }
        .vendor-avatar-sm { font-size: var(--text-sm); }
        .design-card-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 6px;
          margin-top: auto;
        }
        .design-card-rating {
          display: flex;
          align-items: center;
          gap: 3px;
          font-size: var(--text-sm);
          font-weight: 600;
        }
        .review-count { color: var(--text-muted); font-weight: 400; font-size: var(--text-xs); }
        .design-card-formats {
          display: flex;
          gap: 3px;
        }
        .format-tag {
          font-size: 9px;
          font-weight: 600;
          padding: 2px 5px;
          border-radius: 4px;
          background: var(--bg-tertiary);
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }
        .design-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 8px;
          border-top: 0.5px solid var(--ios-separator-light);
          margin-top: 6px;
        }
        .design-card-price {
          display: flex;
          align-items: baseline;
          gap: 4px;
        }
        .design-card-price :global(.price) { font-size: var(--text-lg); }
        .design-card-cart-btn {
          width: 34px;
          height: 34px;
          border-radius: var(--radius-full);
          background: var(--ios-tint);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.15s ease;
          -webkit-tap-highlight-color: transparent;
        }
        .design-card-cart-btn:active {
          transform: scale(0.88);
        }

        @media (max-width: 768px) {
          .design-card-body { padding: 10px; gap: 4px; }
          .design-card-title { font-size: var(--text-sm); }
          .design-card-price :global(.price) { font-size: var(--text-base); }
          .design-card-cart-btn { width: 30px; height: 30px; }
        }
      `}</style>
    </div>
  );
}
