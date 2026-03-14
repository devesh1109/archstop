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
    <div className={`design-card glass-card animate-fadeInUp stagger-${(index % 4) + 1}`}>
      <Link href={`/design/${design.id}`} className="design-card-image-wrap">
        <Image
          src={design.image}
          alt={design.title}
          width={400}
          height={280}
          className="design-card-image"
        />
        {design.originalPrice && (
          <span className="design-card-sale">SALE</span>
        )}
        <div className="design-card-overlay">
          <span className="btn btn-primary btn-sm">View Details</span>
        </div>
      </Link>

      <div className="design-card-body">
        <div className="design-card-category">
          <span className="badge">{design.category.replace('-', ' ')}</span>
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
            <Star size={14} fill="var(--accent)" stroke="var(--accent)" />
            <span>{design.rating}</span>
            <span className="review-count">({design.reviewCount})</span>
          </div>
          <div className="design-card-formats">
            {design.formats.slice(0, 3).map(f => (
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
            className="btn btn-primary btn-sm"
            onClick={(e) => { e.preventDefault(); addItem(design); }}
            aria-label="Add to cart"
          >
            <ShoppingCart size={14} />
          </button>
        </div>
      </div>

      <style jsx>{`
        .design-card {
          overflow: hidden;
          display: flex;
          flex-direction: column;
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
          transition: transform var(--transition-slow);
        }
        .design-card:hover .design-card-image-wrap :global(img) {
          transform: scale(1.05);
        }
        .design-card-sale {
          position: absolute;
          top: var(--space-md);
          left: var(--space-md);
          background: var(--error);
          color: white;
          font-size: 11px;
          font-weight: 700;
          padding: 3px 10px;
          border-radius: var(--radius-full);
          z-index: 2;
          letter-spacing: 0.5px;
        }
        .design-card-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity var(--transition-base);
        }
        .design-card:hover .design-card-overlay { opacity: 1; }
        .design-card-body {
          padding: var(--space-md);
          display: flex;
          flex-direction: column;
          gap: var(--space-sm);
          flex: 1;
        }
        .design-card-category { text-transform: capitalize; }
        .design-card-title {
          font-family: var(--font-display);
          font-size: var(--text-base);
          font-weight: 600;
          line-height: 1.3;
          transition: color var(--transition-fast);
        }
        .design-card-title:hover { color: var(--accent); }
        .design-card-vendor {
          display: flex;
          align-items: center;
          gap: var(--space-xs);
          font-size: var(--text-xs);
          color: var(--text-muted);
          transition: color var(--transition-fast);
        }
        .design-card-vendor:hover { color: var(--accent); }
        .vendor-avatar-sm { font-size: var(--text-base); }
        .design-card-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--space-sm);
          margin-top: auto;
        }
        .design-card-rating {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: var(--text-sm);
          font-weight: 600;
        }
        .review-count { color: var(--text-muted); font-weight: 400; }
        .design-card-formats {
          display: flex;
          gap: 4px;
        }
        .format-tag {
          font-size: 10px;
          font-weight: 600;
          padding: 2px 6px;
          border-radius: var(--radius-sm);
          background: var(--bg-tertiary);
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }
        .design-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: var(--space-sm);
          border-top: 1px solid var(--border);
          margin-top: var(--space-sm);
        }
        .design-card-price {
          display: flex;
          align-items: baseline;
          gap: var(--space-xs);
        }
        .design-card-price .price { font-size: var(--text-lg); }
      `}</style>
    </div>
  );
}
