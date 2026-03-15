'use client';
import { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingCart, Download, ChevronLeft, Heart, Share2, CheckCircle } from 'lucide-react';
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
      {/* iOS Nav Bar */}
      <div className="detail-nav">
        <Link href="/browse" className="ios-nav-back">
          <ChevronLeft size={22} />
          <span>Browse</span>
        </Link>
        <span className="detail-nav-title">{design.title}</span>
        <div className="detail-nav-actions">
          <button className="detail-nav-btn"><Heart size={20} /></button>
          <button className="detail-nav-btn"><Share2 size={20} /></button>
        </div>
      </div>

      {/* Image */}
      <div className="detail-image-section">
        <div className="detail-main-image">
          <Image src={design.image} alt={design.title} width={800} height={560} priority style={{ width: '100%', height: 'auto' }} />
          {discount > 0 && <span className="sale-badge">{discount}% OFF</span>}
        </div>
        <div className="detail-thumbs">
          {[1, 2, 3].map(i => (
            <div key={i} className={`thumb ${i === 1 ? 'thumb-active' : ''}`}>
              <Image src={design.image} alt="" width={80} height={56} style={{ objectFit: 'cover', borderRadius: 8 }} />
            </div>
          ))}
        </div>
      </div>

      <div className="container">
        {/* Info */}
        <div className="detail-info">
          <div className="detail-badges">
            <span className="badge badge-accent">{design.category.replace(/-/g, ' ')}</span>
            {design.trending && <span className="badge" style={{ background: 'rgba(255,149,0,0.12)', color: 'var(--warning)' }}>Trending</span>}
          </div>

          <h1 className="detail-title">{design.title}</h1>

          <div className="detail-rating-row">
            <div className="stars-row">
              {[1,2,3,4,5].map(s => <Star key={s} size={15} fill={s <= Math.round(design.rating) ? 'var(--accent)' : 'none'} stroke="var(--accent)" />)}
            </div>
            <span className="rating-text">{design.rating} ({design.reviewCount})</span>
            <span className="downloads-text"><Download size={13} /> {design.downloads}</span>
          </div>

          <p className="detail-desc">{design.description}</p>

          {/* Specs */}
          {(design.sqft || design.bedrooms || design.bathrooms) && (
            <div className="ios-group" style={{ marginTop: 4 }}>
              {design.sqft && (
                <div className="ios-row spec-row">
                  <span className="spec-label">Area</span>
                  <span className="spec-value">{design.sqft.toLocaleString()} sq ft</span>
                </div>
              )}
              {design.bedrooms && (
                <div className="ios-row spec-row">
                  <span className="spec-label">Bedrooms</span>
                  <span className="spec-value">{design.bedrooms}</span>
                </div>
              )}
              {design.bathrooms && (
                <div className="ios-row spec-row">
                  <span className="spec-label">Bathrooms</span>
                  <span className="spec-value">{design.bathrooms}</span>
                </div>
              )}
            </div>
          )}

          {/* Formats */}
          <div className="formats-row">
            <span className="formats-label">Formats:</span>
            {design.formats.map(f => <span key={f} className="badge">{f}</span>)}
          </div>

          {/* Price + Add to Cart (sticky on mobile) */}
          <div className="purchase-section">
            <div className="purchase-price">
              <span className="price" style={{ fontSize: 'var(--text-3xl)' }}>${design.price}</span>
              {design.originalPrice && <span className="price-original" style={{ fontSize: 'var(--text-base)' }}>${design.originalPrice}</span>}
            </div>
            <button className="btn btn-primary btn-lg purchase-btn" onClick={() => addItem(design)}>
              <ShoppingCart size={18} /> Add to Cart
            </button>
            <div className="guarantee-row">
              <CheckCircle size={14} color="var(--success)" />
              <span>Instant download · 30-day guarantee</span>
            </div>
          </div>

          {/* Vendor */}
          {vendor && (
            <Link href={`/vendor/${vendor.id}`} className="ios-group vendor-inline" style={{ display: 'flex', marginTop: 8 }}>
              <div className="ios-row" style={{ width: '100%' }}>
                <span style={{ fontSize: 32 }}>{vendor.avatar}</span>
                <div style={{ flex: 1 }}>
                  <span style={{ fontWeight: 600, display: 'block' }}>{vendor.name} {vendor.verified && '✓'}</span>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>{vendor.location} · {vendor.designCount} designs</span>
                </div>
                <ChevronLeft size={18} color="var(--text-muted)" style={{ opacity: 0.5, transform: 'rotate(180deg)' }} />
              </div>
            </Link>
          )}
        </div>

        {/* Reviews */}
        {reviews.length > 0 && (
          <section className="section">
            <h2 className="section-title">Reviews</h2>
            <div className="ios-group" style={{ marginTop: 8 }}>
              {reviews.map(r => (
                <div key={r.id} className="ios-row review-row" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 6 }}>
                  <div className="review-header">
                    <span className="review-user">{r.user}</span>
                    <div className="review-stars">
                      {[1,2,3,4,5].map(s => <Star key={s} size={11} fill={s <= r.rating ? 'var(--accent)' : 'none'} stroke="var(--accent)" />)}
                    </div>
                    <span className="review-date">{r.date}</span>
                  </div>
                  <p className="review-text">{r.text}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Related */}
        {related.length > 0 && (
          <section className="section">
            <h2 className="section-title">Related Designs</h2>
            <div className="related-scroll" style={{ marginTop: 12 }}>
              {related.map((d, i) => (
                <div key={d.id} className="related-card">
                  <DesignCard design={d} index={i} />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      <style jsx>{`
        .detail-page { padding-bottom: var(--space-2xl); }

        /* iOS nav */
        .detail-nav {
          display: none;
        }

        /* Image */
        .detail-image-section { margin-bottom: var(--space-md); }
        .detail-main-image {
          position: relative;
          overflow: hidden;
        }
        .sale-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          background: #ff3b30;
          color: white;
          font-weight: 700;
          font-size: var(--text-sm);
          padding: 4px 12px;
          border-radius: var(--radius-full);
        }
        .detail-thumbs {
          display: flex;
          gap: 8px;
          padding: 8px 16px;
        }
        .thumb {
          border-radius: 8px;
          overflow: hidden;
          opacity: 0.5;
          border: 2px solid transparent;
        }
        .thumb-active { opacity: 1; border-color: var(--ios-tint); }

        /* Info */
        .detail-info { display: flex; flex-direction: column; gap: 12px; }
        .detail-badges { display: flex; gap: 6px; text-transform: capitalize; flex-wrap: wrap; }
        .detail-title {
          font-family: var(--font-display);
          font-size: var(--text-2xl);
          font-weight: 700;
          line-height: 1.15;
          letter-spacing: -0.02em;
        }
        .detail-rating-row {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }
        .stars-row { display: flex; gap: 2px; }
        .rating-text { font-size: var(--text-sm); color: var(--text-secondary); }
        .downloads-text { display: flex; align-items: center; gap: 3px; font-size: var(--text-sm); color: var(--text-muted); }
        .detail-desc { color: var(--text-secondary); line-height: 1.55; font-size: var(--text-base); }

        .spec-row { justify-content: space-between; }
        .spec-label { color: var(--text-muted); font-size: var(--text-base); }
        .spec-value { font-weight: 600; }

        .formats-row {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: wrap;
        }
        .formats-label { font-size: var(--text-sm); color: var(--text-muted); }

        /* Purchase */
        .purchase-section {
          padding: var(--space-lg);
          background: var(--bg-card);
          border-radius: var(--radius-lg);
          box-shadow: var(--ios-card-shadow);
        }
        .purchase-price {
          display: flex;
          align-items: baseline;
          gap: 8px;
          margin-bottom: 12px;
        }
        .purchase-btn { width: 100%; }
        .guarantee-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          font-size: var(--text-xs);
          color: var(--text-muted);
          margin-top: 12px;
        }

        .vendor-inline { text-decoration: none; }

        /* Reviews */
        .review-header {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .review-user { font-weight: 600; font-size: var(--text-sm); }
        .review-stars { display: flex; gap: 1px; }
        .review-date { font-size: var(--text-xs); color: var(--text-muted); margin-left: auto; }
        .review-text { color: var(--text-secondary); line-height: 1.5; font-size: var(--text-sm); }

        /* Related scroll */
        .related-scroll {
          display: flex;
          gap: 12px;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          padding-bottom: 4px;
          margin: 0 -16px;
          padding-left: 16px;
          padding-right: 16px;
        }
        .related-scroll::-webkit-scrollbar { display: none; }
        .related-card {
          flex: 0 0 220px;
        }

        @media (max-width: 768px) {
          .detail-nav {
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
          .detail-nav-title {
            font-size: var(--text-base);
            font-weight: 600;
            letter-spacing: -0.01em;
            max-width: 200px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .detail-nav-actions {
            display: flex;
            gap: 4px;
          }
          .detail-nav-btn {
            width: 34px;
            height: 34px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--ios-tint);
          }
        }

        @media (min-width: 769px) {
          .detail-page { padding-top: var(--space-xl); }
          .detail-image-section {
            max-width: 600px;
            margin: 0 auto var(--space-xl);
          }
          .detail-main-image { border-radius: var(--radius-lg); overflow: hidden; }
          .detail-info { max-width: 600px; margin: 0 auto; }
          .detail-title { font-size: var(--text-3xl); }
          .related-scroll {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            overflow: visible;
            margin: 0;
            padding: 0;
          }
          .related-card { flex: none; }
        }
      `}</style>
    </div>
  );
}
