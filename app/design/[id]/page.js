'use client';
import { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingCart, Download, ArrowLeft, Heart, Share2, CheckCircle } from 'lucide-react';
import { getDesignById, getVendorById, getReviewsByDesign, getDesignsByCategory } from '@/lib/data';
import { useCart } from '@/lib/CartContext';
import DesignCard from '@/components/DesignCard';

export default function DesignDetailPage({ params }) {
  const { id } = use(params);
  const design = getDesignById(id);
  const vendor = design ? getVendorById(design.vendorId) : null;
  const reviews = design ? getReviewsByDesign(id) : [];
  const related = design ? getDesignsByCategory(design.category).filter(d => d.id !== id).slice(0, 4) : [];
  const { addItem } = useCart();

  if (!design) {
    return (
      <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
        <h2>Design not found</h2>
        <Link href="/browse" className="btn btn-primary" style={{ marginTop: 16 }}>Browse Designs</Link>
      </div>
    );
  }

  const discount = design.originalPrice ? Math.round((1 - design.price / design.originalPrice) * 100) : 0;

  return (
    <div className="detail-page">
      <div className="container">
        <Link href="/browse" className="back-link"><ArrowLeft size={16} /> Back to Browse</Link>

        <div className="detail-grid">
          <div className="detail-images">
            <div className="main-image-wrap">
              <Image src={design.image} alt={design.title} width={800} height={560} className="main-image" priority />
              {discount > 0 && <span className="sale-badge">{discount}% OFF</span>}
            </div>
            <div className="image-thumbs">
              {[1, 2, 3].map(i => (
                <div key={i} className="thumb active">
                  <Image src={design.image} alt="" width={120} height={80} style={{ objectFit: 'cover', borderRadius: 8 }} />
                </div>
              ))}
            </div>
          </div>

          <div className="detail-info">
            <div className="detail-category">
              <span className="badge badge-accent">{design.category.replace(/-/g, ' ')}</span>
              {design.trending && <span className="badge" style={{ background: 'rgba(251,191,36,0.12)', color: 'var(--warning)', borderColor: 'rgba(251,191,36,0.3)' }}>🔥 Trending</span>}
            </div>

            <h1 className="detail-title">{design.title}</h1>

            <div className="detail-rating">
              <div className="stars-row">
                {[1,2,3,4,5].map(s => <Star key={s} size={16} fill={s <= Math.round(design.rating) ? 'var(--accent)' : 'none'} stroke="var(--accent)" />)}
              </div>
              <span className="rating-text">{design.rating} ({design.reviewCount} reviews)</span>
              <span className="downloads-text"><Download size={14} /> {design.downloads} downloads</span>
            </div>

            <p className="detail-desc">{design.description}</p>

            <div className="detail-specs">
              {design.sqft && <div className="spec"><span className="spec-label">Area</span><span className="spec-value">{design.sqft.toLocaleString()} sq ft</span></div>}
              {design.bedrooms && <div className="spec"><span className="spec-label">Bedrooms</span><span className="spec-value">{design.bedrooms}</span></div>}
              {design.bathrooms && <div className="spec"><span className="spec-label">Bathrooms</span><span className="spec-value">{design.bathrooms}</span></div>}
            </div>

            <div className="detail-formats">
              <span className="formats-label">File Formats:</span>
              {design.formats.map(f => <span key={f} className="badge">{f}</span>)}
            </div>

            <div className="detail-price-section">
              <div className="detail-price">
                <span className="price" style={{ fontSize: 'var(--text-3xl)' }}>${design.price}</span>
                {design.originalPrice && <span className="price-original" style={{ fontSize: 'var(--text-lg)' }}>${design.originalPrice}</span>}
              </div>
              <div className="detail-actions">
                <button className="btn btn-primary btn-lg" onClick={() => addItem(design)} style={{ flex: 1 }}>
                  <ShoppingCart size={18} /> Add to Cart
                </button>
                <button className="btn btn-secondary"><Heart size={18} /></button>
                <button className="btn btn-secondary"><Share2 size={18} /></button>
              </div>
            </div>

            <div className="detail-guarantee">
              <CheckCircle size={16} color="var(--success)" />
              <span>Instant download after purchase · 30-day money-back guarantee</span>
            </div>

            {vendor && (
              <Link href={`/vendor/${vendor.id}`} className="vendor-card-inline glass-card">
                <span className="vendor-avatar-med">{vendor.avatar}</span>
                <div className="vendor-inline-info">
                  <span className="vendor-inline-name">{vendor.name} {vendor.verified && '✓'}</span>
                  <span className="vendor-inline-meta">{vendor.location} · {vendor.designCount} designs</span>
                </div>
                <div className="vendor-inline-rating">
                  <Star size={14} fill="var(--accent)" stroke="var(--accent)" /> {vendor.rating}
                </div>
              </Link>
            )}
          </div>
        </div>

        {reviews.length > 0 && (
          <section className="reviews-section section">
            <h2 className="section-title">Customer Reviews</h2>
            <div className="reviews-list">
              {reviews.map(r => (
                <div key={r.id} className="review-card glass-card">
                  <div className="review-header">
                    <span className="review-user">{r.user}</span>
                    <div className="review-stars">
                      {[1,2,3,4,5].map(s => <Star key={s} size={12} fill={s <= r.rating ? 'var(--accent)' : 'none'} stroke="var(--accent)" />)}
                    </div>
                    <span className="review-date">{r.date}</span>
                  </div>
                  <p className="review-text">{r.text}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {related.length > 0 && (
          <section className="section">
            <div className="section-header">
              <h2 className="section-title">Related Designs</h2>
            </div>
            <div className="grid-4">
              {related.map((d, i) => <DesignCard key={d.id} design={d} index={i} />)}
            </div>
          </section>
        )}
      </div>

      <style jsx>{`
        .detail-page { padding: var(--space-xl) 0; }
        .back-link {
          display: inline-flex;
          align-items: center;
          gap: var(--space-sm);
          color: var(--text-muted);
          font-size: var(--text-sm);
          margin-bottom: var(--space-xl);
          transition: color var(--transition-fast);
        }
        .back-link:hover { color: var(--accent); }
        .detail-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: var(--space-2xl);
        }
        .main-image-wrap {
          position: relative;
          border-radius: var(--radius-lg);
          overflow: hidden;
        }
        .main-image-wrap :global(img) { width: 100%; height: auto; display: block; }
        .sale-badge {
          position: absolute;
          top: var(--space-md);
          left: var(--space-md);
          background: var(--error);
          color: white;
          font-weight: 700;
          font-size: var(--text-sm);
          padding: 4px 14px;
          border-radius: var(--radius-full);
        }
        .image-thumbs {
          display: flex;
          gap: var(--space-sm);
          margin-top: var(--space-md);
        }
        .thumb {
          border-radius: var(--radius-md);
          overflow: hidden;
          border: 2px solid transparent;
          opacity: 0.6;
          transition: all var(--transition-fast);
          cursor: pointer;
        }
        .thumb.active, .thumb:hover { border-color: var(--accent); opacity: 1; }
        .detail-info { display: flex; flex-direction: column; gap: var(--space-md); }
        .detail-category { display: flex; gap: var(--space-sm); text-transform: capitalize; flex-wrap: wrap; }
        .detail-title {
          font-family: var(--font-display);
          font-size: var(--text-3xl);
          font-weight: 700;
          line-height: 1.2;
        }
        .detail-rating {
          display: flex;
          align-items: center;
          gap: var(--space-md);
          flex-wrap: wrap;
        }
        .stars-row { display: flex; gap: 2px; }
        .rating-text { font-size: var(--text-sm); color: var(--text-secondary); }
        .downloads-text { display: flex; align-items: center; gap: 4px; font-size: var(--text-sm); color: var(--text-muted); }
        .detail-desc { color: var(--text-secondary); line-height: 1.7; }
        .detail-specs {
          display: flex;
          gap: var(--space-lg);
          padding: var(--space-md);
          background: var(--bg-tertiary);
          border-radius: var(--radius-md);
        }
        .spec { display: flex; flex-direction: column; gap: 2px; }
        .spec-label { font-size: var(--text-xs); color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; }
        .spec-value { font-weight: 600; }
        .detail-formats {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          flex-wrap: wrap;
        }
        .formats-label { font-size: var(--text-sm); color: var(--text-muted); }
        .detail-price-section {
          padding: var(--space-lg);
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
        }
        .detail-price {
          display: flex;
          align-items: baseline;
          gap: var(--space-sm);
          margin-bottom: var(--space-md);
        }
        .detail-actions { display: flex; gap: var(--space-sm); }
        .detail-guarantee {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          font-size: var(--text-sm);
          color: var(--text-muted);
        }
        .vendor-card-inline {
          display: flex;
          align-items: center;
          gap: var(--space-md);
          padding: var(--space-md);
        }
        .vendor-avatar-med { font-size: 36px; }
        .vendor-inline-info { flex: 1; }
        .vendor-inline-name { font-weight: 600; display: block; }
        .vendor-inline-meta { font-size: var(--text-xs); color: var(--text-muted); }
        .vendor-inline-rating {
          display: flex;
          align-items: center;
          gap: 4px;
          font-weight: 600;
        }
        .reviews-section { }
        .reviews-list { display: flex; flex-direction: column; gap: var(--space-md); }
        .review-card { padding: var(--space-lg); }
        .review-header {
          display: flex;
          align-items: center;
          gap: var(--space-md);
          margin-bottom: var(--space-sm);
        }
        .review-user { font-weight: 600; }
        .review-stars { display: flex; gap: 2px; }
        .review-date { font-size: var(--text-xs); color: var(--text-muted); margin-left: auto; }
        .review-text { color: var(--text-secondary); line-height: 1.6; }

        @media (max-width: 768px) {
          .detail-grid { grid-template-columns: 1fr; }
          .detail-specs { flex-wrap: wrap; }
        }
      `}</style>
    </div>
  );
}
