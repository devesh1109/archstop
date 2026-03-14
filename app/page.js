'use client';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star, Download, ShoppingBag, Home, Palette, TreePine, Building2, Briefcase, Box, PenTool, Layers, Ruler, ChevronRight } from 'lucide-react';
import DesignCard from '@/components/DesignCard';
import { categories, vendors, getFeaturedDesigns, getTrendingDesigns } from '@/lib/data';
import s from './page.module.css';

const iconMap = { Home, Palette, TreePine, Building2, Briefcase, Box, PenTool, Layers, Ruler };

export default function HomePage() {
  const featured = getFeaturedDesigns();
  const trending = getTrendingDesigns();

  return (
    <div>
      {/* Hero */}
      <section className={s.hero}>
        <div className={s.heroBg}>
          <Image src="/images/hero_banner.png" alt="" fill style={{ objectFit: 'cover', opacity: 0.3 }} priority />
          <div className={s.heroGradient} />
        </div>
        <div className={`container ${s.heroContent}`}>
          <div className={`${s.heroBadge} animate-fadeInUp`}>
            <span className="badge badge-accent">✦ Trusted by 15,000+ Architects</span>
          </div>
          <h1 className={`${s.heroTitle} animate-fadeInUp stagger-1`}>
            Premium Architectural<br />
            <span className={s.heroAccent}>Resources Marketplace</span>
          </h1>
          <p className={`${s.heroSubtitle} animate-fadeInUp stagger-2`}>
            Discover house plans, interior layouts, 3D models, CAD files, and more from top architects worldwide.
          </p>
          <div className={`${s.heroActions} animate-fadeInUp stagger-3`}>
            <Link href="/browse" className="btn btn-primary btn-lg">
              Explore Designs <ArrowRight size={18} />
            </Link>
            <Link href="/dashboard" className="btn btn-secondary btn-lg">
              Start Selling
            </Link>
          </div>
          <div className={`${s.heroStats} animate-fadeInUp stagger-4`}>
            <div className={s.heroStat}>
              <span className={s.heroStatNumber}>12,500+</span>
              <span className={s.heroStatLabel}>Designs</span>
            </div>
            <div className={s.heroStatDivider} />
            <div className={s.heroStat}>
              <span className={s.heroStatNumber}>2,400+</span>
              <span className={s.heroStatLabel}>Vendors</span>
            </div>
            <div className={s.heroStatDivider} />
            <div className={s.heroStat}>
              <span className={s.heroStatNumber}>85,000+</span>
              <span className={s.heroStatLabel}>Downloads</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center' }}>
            <h2 className="section-title">Browse by Category</h2>
            <p className="section-subtitle">Find exactly what you need for your next project</p>
          </div>
          <div className={s.categoriesGrid}>
            {categories.map((cat, i) => {
              const Icon = iconMap[cat.icon];
              return (
                <Link key={cat.id} href={`/browse?category=${cat.id}`} className={`${s.categoryCard} animate-fadeInUp stagger-${(i % 4) + 1}`}>
                  <div className={s.categoryIconWrap}>
                    {Icon && <Icon size={24} strokeWidth={1.8} />}
                  </div>
                  <div className={s.categoryText}>
                    <h3 className={s.categoryName}>{cat.name}</h3>
                    <p className={s.categoryCount}>{cat.count} designs</p>
                  </div>
                  <span className={s.categoryArrow}><ChevronRight size={16} /></span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-header">
            <div className={s.sectionHeaderRow}>
              <div>
                <h2 className="section-title">Featured Designs</h2>
                <p className="section-subtitle">Hand-picked by our editorial team</p>
              </div>
              <Link href="/browse" className="btn btn-ghost">
                View All <ArrowRight size={16} />
              </Link>
            </div>
          </div>
          <div className="grid-4">
            {featured.slice(0, 8).map((d, i) => (
              <DesignCard key={d.id} design={d} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Trending */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className={s.sectionHeaderRow}>
              <div>
                <h2 className="section-title">🔥 Trending Now</h2>
                <p className="section-subtitle">Most popular designs this week</p>
              </div>
              <Link href="/browse" className="btn btn-ghost">
                View All <ArrowRight size={16} />
              </Link>
            </div>
          </div>
          <div className="grid-4">
            {trending.slice(0, 4).map((d, i) => (
              <DesignCard key={d.id} design={d} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Top Vendors */}
      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center' }}>
            <h2 className="section-title">Top Vendors</h2>
            <p className="section-subtitle">Meet the architects behind the marketplace</p>
          </div>
          <div className={s.vendorsGrid}>
            {vendors.slice(0, 6).map((v, i) => (
              <Link key={v.id} href={`/vendor/${v.id}`} className={`${s.vendorCard} animate-fadeInUp stagger-${(i % 4) + 1}`}>
                <div className={s.vendorCardTop}>
                  <div className={s.vendorAvatarRing}>
                    <span className={s.vendorAvatarLg}>{v.avatar}</span>
                  </div>
                  {v.verified && <span className={s.vendorVerified}>✓</span>}
                </div>
                <h3 className={s.vendorName}>{v.name}</h3>
                <p className={s.vendorLocation}>{v.location}</p>
                <div className={s.vendorStatsRow}>
                  <div className={s.vendorMiniStat}>
                    <Star size={13} fill="var(--accent)" stroke="var(--accent)" />
                    <span className={s.vendorStatVal}>{v.rating}</span>
                  </div>
                  <div className={s.vendorDivider} />
                  <div className={s.vendorMiniStat}>
                    <ShoppingBag size={13} />
                    <span>{v.designCount}</span>
                  </div>
                  <div className={s.vendorDivider} />
                  <div className={s.vendorMiniStat}>
                    <Download size={13} />
                    <span>{v.totalSales}</span>
                  </div>
                </div>
                <span className={s.vendorViewBtn}>View Profile</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={`section ${s.ctaSection}`}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className={`section-title ${s.ctaTitle}`}>
            Ready to Sell Your Designs?
          </h2>
          <p className={`section-subtitle ${s.ctaSub}`}>
            Join thousands of architects earning passive income on UrbanMarket.
          </p>
          <Link href="/dashboard" className="btn btn-primary btn-lg">
            Start Selling <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
