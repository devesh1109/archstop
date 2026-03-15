'use client';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star, Download, ShoppingBag, Home, Palette, TreePine, Building2, Briefcase, Box, PenTool, Layers, Ruler, ChevronRight, Search } from 'lucide-react';
import DesignCard from '@/components/DesignCard';
import { categories, vendors, getFeaturedDesigns, getTrendingDesigns } from '@/lib/data';
import { useState } from 'react';

const iconMap = { Home, Palette, TreePine, Building2, Briefcase, Box, PenTool, Layers, Ruler };

export default function HomePage() {
  const featured = getFeaturedDesigns();
  const trending = getTrendingDesigns();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="ios-home">
      {/* iOS Large Title Header */}
      <div className="home-header">
        <div className="container">
          <h1 className="ios-page-title">ArchStop</h1>
          <p className="ios-page-subtitle">Architectural Design Marketplace</p>
          <div className="ios-search-bar" style={{ marginTop: 12 }}>
            <Search size={16} />
            <input
              type="text"
              placeholder="Search designs, vendors, file types..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && searchQuery.trim()) {
                  window.location.href = `/browse?q=${encodeURIComponent(searchQuery)}`;
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      <section className="hero-banner">
        <div className="container">
          <div className="hero-card">
            <div className="hero-image-wrap">
              <Image src="/images/hero_banner.png" alt="Premium architectural designs" fill style={{ objectFit: 'cover' }} priority />
              <div className="hero-overlay" />
            </div>
            <div className="hero-content">
              <span className="badge badge-accent" style={{ marginBottom: 8 }}>Trusted by 15,000+ Architects</span>
              <h2 className="hero-title">Premium Architectural<br />Resources</h2>
              <p className="hero-desc">House plans, 3D models, CAD files, and more from top architects worldwide.</p>
              <Link href="/browse" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                Explore Designs <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Row */}
      <section className="stats-strip">
        <div className="container">
          <div className="stats-row">
            <div className="stat-item">
              <span className="stat-number">12,500+</span>
              <span className="stat-label">Designs</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-number">2,400+</span>
              <span className="stat-label">Vendors</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-number">85,000+</span>
              <span className="stat-label">Downloads</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories — iOS grouped list style */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Browse by Category</h2>
          <div className="ios-group" style={{ marginTop: 12 }}>
            {categories.map((cat, i) => {
              const Icon = iconMap[cat.icon];
              return (
                <Link key={cat.id} href={`/browse?category=${cat.id}`} className="ios-row category-row">
                  <div className="cat-icon-wrap">
                    {Icon && <Icon size={20} strokeWidth={1.8} />}
                  </div>
                  <div className="cat-text">
                    <span className="cat-name">{cat.name}</span>
                    <span className="cat-count">{cat.count} designs</span>
                  </div>
                  <ChevronRight size={18} color="var(--text-muted)" style={{ opacity: 0.5 }} />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="section">
        <div className="container">
          <div className="section-header-row">
            <h2 className="section-title">Featured Designs</h2>
            <Link href="/browse" className="see-all-link">See All <ChevronRight size={14} /></Link>
          </div>
          <p className="section-subtitle">Hand-picked by our editorial team</p>
          <div className="horizontal-scroll" style={{ marginTop: 12 }}>
            {featured.slice(0, 8).map((d, i) => (
              <div key={d.id} className="scroll-card">
                <DesignCard design={d} index={i} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending */}
      <section className="section">
        <div className="container">
          <div className="section-header-row">
            <h2 className="section-title">Trending Now</h2>
            <Link href="/browse" className="see-all-link">See All <ChevronRight size={14} /></Link>
          </div>
          <div className="grid-2-mobile" style={{ marginTop: 12 }}>
            {trending.slice(0, 4).map((d, i) => (
              <DesignCard key={d.id} design={d} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Top Vendors — iOS cell style */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Top Vendors</h2>
          <p className="section-subtitle">The architects behind the marketplace</p>
          <div className="ios-group" style={{ marginTop: 12 }}>
            {vendors.slice(0, 6).map((v) => (
              <Link key={v.id} href={`/vendor/${v.id}`} className="ios-row vendor-row">
                <span className="vendor-avatar-cell">{v.avatar}</span>
                <div className="vendor-cell-info">
                  <span className="vendor-cell-name">
                    {v.name}
                    {v.verified && <span className="verified-dot">✓</span>}
                  </span>
                  <span className="vendor-cell-meta">{v.location} · {v.designCount} designs</span>
                </div>
                <div className="vendor-cell-rating">
                  <Star size={12} fill="var(--accent)" stroke="var(--accent)" />
                  <span>{v.rating}</span>
                </div>
                <ChevronRight size={18} color="var(--text-muted)" style={{ opacity: 0.5 }} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ paddingBottom: 'var(--space-2xl)' }}>
        <div className="container">
          <div className="cta-card">
            <h3 className="cta-title">Ready to Sell Your Designs?</h3>
            <p className="cta-desc">Join thousands of architects earning passive income on ArchStop.</p>
            <Link href="/dashboard" className="btn btn-primary">
              Start Selling <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        .ios-home { }

        /* Header */
        .home-header {
          padding: 16px 0 8px;
          background: var(--bg-primary);
        }

        /* Hero Banner */
        .hero-banner { padding: 8px 0 0; }
        .hero-card {
          position: relative;
          border-radius: var(--radius-lg);
          overflow: hidden;
          min-height: 220px;
          display: flex;
          align-items: flex-end;
        }
        .hero-image-wrap {
          position: absolute;
          inset: 0;
        }
        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(0deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 60%);
        }
        .hero-content {
          position: relative;
          z-index: 1;
          padding: var(--space-lg);
          display: flex;
          flex-direction: column;
          color: white;
        }
        .hero-title {
          font-family: var(--font-display);
          font-size: var(--text-2xl);
          font-weight: 700;
          line-height: 1.15;
          letter-spacing: -0.02em;
          margin-bottom: 6px;
        }
        .hero-desc {
          font-size: var(--text-sm);
          opacity: 0.85;
          line-height: 1.4;
          margin-bottom: 12px;
          max-width: 320px;
        }

        /* Stats */
        .stats-strip { padding: var(--space-lg) 0; }
        .stats-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-xl);
          padding: var(--space-md) var(--space-lg);
          background: var(--bg-card);
          border-radius: var(--radius-md);
          box-shadow: var(--ios-card-shadow);
        }
        .stat-item { text-align: center; }
        .stat-number {
          display: block;
          font-family: var(--font-display);
          font-size: var(--text-xl);
          font-weight: 700;
          letter-spacing: -0.02em;
        }
        .stat-label { font-size: var(--text-xs); color: var(--text-muted); }
        .stat-divider { width: 1px; height: 28px; background: var(--ios-separator-light); }

        /* Section header row */
        .section-header-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }
        .see-all-link {
          display: flex;
          align-items: center;
          gap: 2px;
          font-size: var(--text-base);
          color: var(--ios-tint);
          font-weight: 400;
        }

        /* Category rows */
        .category-row {
          text-decoration: none;
          cursor: pointer;
        }
        .cat-icon-wrap {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: var(--ios-tint-light);
          color: var(--ios-tint);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .cat-text { flex: 1; min-width: 0; }
        .cat-name {
          display: block;
          font-weight: 500;
          font-size: var(--text-base);
          letter-spacing: -0.01em;
        }
        .cat-count {
          font-size: var(--text-xs);
          color: var(--text-muted);
        }

        /* Horizontal scroll cards (iOS carousel) */
        .horizontal-scroll {
          display: flex;
          gap: 12px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          padding-bottom: 4px;
          margin: 0 -16px;
          padding-left: 16px;
          padding-right: 16px;
        }
        .horizontal-scroll::-webkit-scrollbar { display: none; }
        .scroll-card {
          flex: 0 0 260px;
          scroll-snap-align: start;
        }

        /* 2-col grid for mobile */
        .grid-2-mobile {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        }

        /* Vendor rows */
        .vendor-row {
          text-decoration: none;
          cursor: pointer;
        }
        .vendor-avatar-cell {
          font-size: 32px;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .vendor-cell-info { flex: 1; min-width: 0; }
        .vendor-cell-name {
          display: flex;
          align-items: center;
          gap: 6px;
          font-weight: 500;
          font-size: var(--text-base);
          letter-spacing: -0.01em;
        }
        .verified-dot {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: var(--success);
          color: white;
          font-size: 10px;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .vendor-cell-meta {
          font-size: var(--text-xs);
          color: var(--text-muted);
        }
        .vendor-cell-rating {
          display: flex;
          align-items: center;
          gap: 3px;
          font-size: var(--text-sm);
          font-weight: 600;
          color: var(--text-secondary);
          margin-right: 4px;
        }

        /* CTA */
        .cta-card {
          text-align: center;
          padding: var(--space-xl);
          background: var(--bg-card);
          border-radius: var(--radius-lg);
          box-shadow: var(--ios-card-shadow);
        }
        .cta-title {
          font-family: var(--font-display);
          font-size: var(--text-2xl);
          font-weight: 700;
          letter-spacing: -0.02em;
          margin-bottom: 6px;
        }
        .cta-desc {
          color: var(--text-muted);
          font-size: var(--text-base);
          margin-bottom: var(--space-lg);
        }

        /* iPad overrides */
        @media (min-width: 769px) {
          .home-header { padding: 24px 0 12px; }
          .hero-card { min-height: 320px; }
          .hero-title { font-size: var(--text-4xl); }
          .hero-desc { font-size: var(--text-base); max-width: 480px; }
          .stats-row { gap: var(--space-2xl); }
          .stat-number { font-size: var(--text-2xl); }
          .horizontal-scroll {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            overflow: visible;
            margin: 0;
            padding-left: 0;
            padding-right: 0;
          }
          .scroll-card { flex: none; }
          .grid-2-mobile { grid-template-columns: repeat(4, 1fr); gap: var(--space-md); }
        }
      `}</style>
    </div>
  );
}
