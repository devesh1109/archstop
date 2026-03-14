'use client';
import { use } from 'react';
import Link from 'next/link';
import { Star, MapPin, Calendar, ShoppingBag, Download, CheckCircle } from 'lucide-react';
import { getVendorById, getDesignsByVendor } from '@/lib/data';
import DesignCard from '@/components/DesignCard';

export default function VendorPage({ params }) {
  const { id } = use(params);
  const vendor = getVendorById(id);
  const vendorDesigns = vendor ? getDesignsByVendor(id) : [];

  if (!vendor) {
    return <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
      <h2>Vendor not found</h2>
      <Link href="/browse" className="btn btn-primary" style={{ marginTop: 16 }}>Browse Designs</Link>
    </div>;
  }

  return (
    <div className="vendor-page">
      <div className="container">
        <div className="vendor-hero glass-card">
          <div className="vendor-hero-top">
            <span className="vendor-avatar-xl">{vendor.avatar}</span>
            <div className="vendor-hero-info">
              <div className="vendor-name-row">
                <h1 className="vendor-name">{vendor.name}</h1>
                {vendor.verified && <span className="badge badge-success"><CheckCircle size={12} /> Verified</span>}
              </div>
              <p className="vendor-location"><MapPin size={14} /> {vendor.location}</p>
              <p className="vendor-bio">{vendor.bio}</p>
            </div>
          </div>
          <div className="vendor-stats">
            <div className="v-stat">
              <Star size={18} color="var(--accent)" />
              <span className="v-stat-val">{vendor.rating}</span>
              <span className="v-stat-label">{vendor.reviewCount} reviews</span>
            </div>
            <div className="v-stat">
              <ShoppingBag size={18} />
              <span className="v-stat-val">{vendor.designCount}</span>
              <span className="v-stat-label">Designs</span>
            </div>
            <div className="v-stat">
              <Download size={18} />
              <span className="v-stat-val">{vendor.totalSales}</span>
              <span className="v-stat-label">Sales</span>
            </div>
            <div className="v-stat">
              <Calendar size={18} />
              <span className="v-stat-val">{new Date(vendor.joinedDate).getFullYear()}</span>
              <span className="v-stat-label">Joined</span>
            </div>
          </div>
        </div>

        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Designs by {vendor.name}</h2>
            <p className="section-subtitle">{vendorDesigns.length} designs available</p>
          </div>
          {vendorDesigns.length > 0 ? (
            <div className="grid-3">
              {vendorDesigns.map((d, i) => <DesignCard key={d.id} design={d} index={i} />)}
            </div>
          ) : (
            <p style={{ color: 'var(--text-muted)' }}>No designs yet.</p>
          )}
        </section>
      </div>

      <style jsx>{`
        .vendor-page { padding: var(--space-2xl) 0; }
        .vendor-hero { padding: var(--space-2xl); }
        .vendor-hero-top { display: flex; gap: var(--space-xl); margin-bottom: var(--space-xl); }
        .vendor-avatar-xl { font-size: 72px; flex-shrink: 0; }
        .vendor-hero-info { flex: 1; }
        .vendor-name-row { display: flex; align-items: center; gap: var(--space-md); margin-bottom: var(--space-xs); flex-wrap: wrap; }
        .vendor-name { font-family: var(--font-display); font-size: var(--text-2xl); font-weight: 700; }
        .vendor-location { display: flex; align-items: center; gap: 6px; color: var(--text-muted); font-size: var(--text-sm); margin-bottom: var(--space-md); }
        .vendor-bio { color: var(--text-secondary); line-height: 1.7; }
        .vendor-stats {
          display: flex; gap: var(--space-2xl); padding-top: var(--space-xl);
          border-top: 1px solid var(--border);
        }
        .v-stat { display: flex; align-items: center; gap: var(--space-sm); color: var(--text-secondary); }
        .v-stat-val { font-weight: 700; font-size: var(--text-lg); color: var(--text-primary); }
        .v-stat-label { font-size: var(--text-sm); color: var(--text-muted); }

        @media (max-width: 768px) {
          .vendor-hero-top { flex-direction: column; align-items: center; text-align: center; }
          .vendor-name-row { justify-content: center; }
          .vendor-location { justify-content: center; }
          .vendor-stats { flex-wrap: wrap; gap: var(--space-lg); justify-content: center; }
        }
      `}</style>
    </div>
  );
}
