'use client';
import { use } from 'react';
import Link from 'next/link';
import { Star, MapPin, Calendar, ShoppingBag, Download, CheckCircle, ChevronLeft } from 'lucide-react';
import { getVendorById, getDesignsByVendor } from '@/lib/data';
import DesignCard from '@/components/DesignCard';

export default function VendorPage({ params }) {
  const { id } = use(params);
  const vendor = getVendorById(id);
  const vendorDesigns = vendor ? getDesignsByVendor(id) : [];

  if (!vendor) {
    return <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
      <h2 style={{ fontWeight: 700 }}>Vendor not found</h2>
      <Link href="/browse" className="btn btn-primary" style={{ marginTop: 16 }}>Browse Designs</Link>
    </div>;
  }

  return (
    <div className="vendor-page">
      {/* iOS Nav */}
      <div className="ios-vendor-nav">
        <Link href="/browse" className="ios-nav-back">
          <ChevronLeft size={22} /><span>Browse</span>
        </Link>
        <span className="ios-nav-title">{vendor.name}</span>
        <div style={{ width: 60 }} />
      </div>

      <div className="container">
        {/* Profile Card */}
        <div className="vendor-profile">
          <span className="vendor-avatar-xl">{vendor.avatar}</span>
          <h1 className="vendor-name">
            {vendor.name}
            {vendor.verified && <span className="verified-badge"><CheckCircle size={16} /></span>}
          </h1>
          <p className="vendor-location"><MapPin size={13} /> {vendor.location}</p>
          <p className="vendor-bio">{vendor.bio}</p>
        </div>

        {/* Stats Grid */}
        <div className="vendor-stats-grid">
          <div className="stat-cell">
            <Star size={18} color="var(--accent)" />
            <span className="stat-val">{vendor.rating}</span>
            <span className="stat-lbl">{vendor.reviewCount} reviews</span>
          </div>
          <div className="stat-cell">
            <ShoppingBag size={18} color="var(--text-muted)" />
            <span className="stat-val">{vendor.designCount}</span>
            <span className="stat-lbl">Designs</span>
          </div>
          <div className="stat-cell">
            <Download size={18} color="var(--text-muted)" />
            <span className="stat-val">{vendor.totalSales}</span>
            <span className="stat-lbl">Sales</span>
          </div>
          <div className="stat-cell">
            <Calendar size={18} color="var(--text-muted)" />
            <span className="stat-val">{new Date(vendor.joinedDate).getFullYear()}</span>
            <span className="stat-lbl">Joined</span>
          </div>
        </div>

        {/* Designs */}
        <section className="section">
          <h2 className="section-title">Designs by {vendor.name}</h2>
          <p className="section-subtitle">{vendorDesigns.length} designs available</p>
          {vendorDesigns.length > 0 ? (
            <div className="vendor-designs-grid" style={{ marginTop: 12 }}>
              {vendorDesigns.map((d, i) => <DesignCard key={d.id} design={d} index={i} />)}
            </div>
          ) : (
            <p style={{ color: 'var(--text-muted)', marginTop: 12 }}>No designs yet.</p>
          )}
        </section>
      </div>

      <style jsx>{`
        .vendor-page { padding-bottom: var(--space-2xl); }
        .ios-vendor-nav { display: none; }

        .vendor-profile {
          text-align: center;
          padding: var(--space-xl) 0 var(--space-lg);
        }
        .vendor-avatar-xl { font-size: 64px; display: block; margin-bottom: 8px; }
        .vendor-name {
          font-family: var(--font-display);
          font-size: var(--text-2xl);
          font-weight: 700;
          letter-spacing: -0.02em;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }
        .verified-badge { color: var(--success); display: flex; }
        .vendor-location {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          color: var(--text-muted);
          font-size: var(--text-sm);
          margin: 4px 0 12px;
        }
        .vendor-bio {
          color: var(--text-secondary);
          line-height: 1.55;
          max-width: 480px;
          margin: 0 auto;
          font-size: var(--text-base);
        }

        .vendor-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
          margin-bottom: var(--space-lg);
        }
        .stat-cell {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          padding: var(--space-md) var(--space-sm);
          background: var(--bg-card);
          border-radius: var(--radius-md);
          box-shadow: var(--ios-card-shadow);
        }
        .stat-val {
          font-weight: 700;
          font-size: var(--text-lg);
          letter-spacing: -0.02em;
        }
        .stat-lbl {
          font-size: var(--text-xs);
          color: var(--text-muted);
        }

        .vendor-designs-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        }

        @media (max-width: 768px) {
          .ios-vendor-nav {
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
          .vendor-stats-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (min-width: 769px) {
          .vendor-profile { padding-top: var(--space-2xl); }
          .vendor-designs-grid { grid-template-columns: repeat(3, 1fr); gap: var(--space-md); }
        }
      `}</style>
    </div>
  );
}
