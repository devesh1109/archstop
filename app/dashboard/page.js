'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Upload, Package, DollarSign, Eye, TrendingUp, Download, Star, Plus, BarChart3, ChevronLeft } from 'lucide-react';
import s from './page.module.css';

const mockListings = [
  { id: 1, title: 'Modern Hillside Villa', category: 'House Plans', price: 299, sales: 534, rating: 4.9, status: 'Active' },
  { id: 2, title: 'Urban Loft Complex', category: 'Apartment Blueprints', price: 499, sales: 156, rating: 4.9, status: 'Active' },
  { id: 3, title: 'Luxury Penthouse Blueprint', category: 'Apartment Blueprints', price: 399, sales: 321, rating: 4.8, status: 'Active' },
  { id: 4, title: 'Minimalist Tiny House', category: 'House Plans', price: 99, sales: 1023, rating: 4.5, status: 'Active' },
];

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const salesData = [12, 19, 28, 35, 42, 38, 51, 67, 59, 72, 88, 94];
const maxSale = Math.max(...salesData);

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showUpload, setShowUpload] = useState(false);

  return (
    <div className={s.dashboard}>
      {/* iOS Nav */}
      <div className={s.iosNav}>
        <Link href="/" className="ios-nav-back">
          <ChevronLeft size={22} />
          <span>Home</span>
        </Link>
        <span className="ios-nav-title">Dashboard</span>
        <button className={s.iosNavAction} onClick={() => setShowUpload(!showUpload)}>
          <Plus size={22} />
        </button>
      </div>

      <div className="container">
        <div className={s.dashHeader}>
          <div>
            <h1 className={s.dashTitle}>Dashboard</h1>
            <p className={s.dashSub}>Welcome back, Studio Arcana</p>
          </div>
          <button className="btn btn-primary" onClick={() => setShowUpload(!showUpload)}>
            <Plus size={16} /> Upload Design
          </button>
        </div>

        {showUpload && (
          <div className={`${s.uploadForm} ios-group animate-fadeInUp`}>
            <div style={{ padding: 16 }}>
              <h3 className={s.formHeading}>
                <Upload size={18} /> Upload New Design
              </h3>
              <div className={s.formGrid}>
                <div className={s.formGroup}>
                  <label>Design Title</label>
                  <input type="text" className="input" placeholder="e.g. Modern Beach House Plan" />
                </div>
                <div className={s.formGroup}>
                  <label>Category</label>
                  <select className="input">
                    <option>House Plans</option>
                    <option>Interior Layouts</option>
                    <option>Landscape Designs</option>
                    <option>Apartment Blueprints</option>
                    <option>Office Architecture</option>
                    <option>3D Models</option>
                    <option>CAD Files</option>
                    <option>Revit Files</option>
                    <option>Construction Drawings</option>
                  </select>
                </div>
                <div className={s.formGroup}>
                  <label>Price ($)</label>
                  <input type="number" className="input" placeholder="199" />
                </div>
                <div className={s.formGroup}>
                  <label>File Formats</label>
                  <input type="text" className="input" placeholder="PDF, DWG, RVT" />
                </div>
              </div>
              <div className={s.formGroup} style={{ marginTop: 12 }}>
                <label>Description</label>
                <textarea className="input" rows={3} placeholder="Describe your design..." />
              </div>
              <div className={s.uploadDrop}>
                <Upload size={28} color="var(--ios-tint)" />
                <p className={s.uploadDropText}>Drag & drop or tap to upload</p>
                <p className={s.uploadDropHint}>PDF, DWG, RVT, SKP, 3DS, BLEND — Max 100MB</p>
              </div>
              <div className={s.formActions}>
                <button className="btn btn-primary">Publish</button>
                <button className="btn btn-secondary" onClick={() => setShowUpload(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        <div className={s.statsGrid}>
          {[
            { icon: DollarSign, label: 'Revenue', value: '$48,290', change: '+12.5%', color: 'var(--success)' },
            { icon: Package, label: 'Listings', value: '87', change: '+3', color: 'var(--ios-tint)' },
            { icon: Download, label: 'Downloads', value: '2,340', change: '+156', color: 'var(--info)' },
            { icon: Eye, label: 'Views', value: '18.4K', change: '+2.1K', color: 'var(--warning)' },
          ].map(({ icon: Icon, label, value, change, color }) => (
            <div key={label} className={s.statCard}>
              <div className={s.statIcon} style={{ background: `${color}15`, color }}><Icon size={18} /></div>
              <div className={s.statInfo}>
                <span className={s.statLabel}>{label}</span>
                <span className={s.statValue}>{value}</span>
              </div>
              <span className={s.statChange} style={{ color }}><TrendingUp size={11} /> {change}</span>
            </div>
          ))}
        </div>

        {/* iOS Segmented Control instead of tabs */}
        <div className="ios-segmented" style={{ marginBottom: 16 }}>
          {['overview', 'listings', 'analytics'].map(t => (
            <button
              key={t}
              className={`ios-segment ${activeTab === t ? 'ios-segment-active' : ''}`}
              onClick={() => setActiveTab(t)}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className={s.dashContent}>
            <div className={`${s.chartCard} ios-group`}>
              <div style={{ padding: 16 }}>
                <h3 className={s.formHeading}>
                  <BarChart3 size={18} /> Monthly Sales
                </h3>
                <div className={s.chart}>
                  {salesData.map((val, i) => (
                    <div key={i} className={s.chartBarWrap}>
                      <div className={s.chartBar} style={{ height: `${(val / maxSale) * 100}%` }}>
                        <span className={s.chartTooltip}>{val}</span>
                      </div>
                      <span className={s.chartLabel}>{months[i]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className={`${s.recentCard} ios-group`}>
              <div style={{ padding: 16 }}>
                <h3 className={s.formHeading}>Recent Sales</h3>
              </div>
              {[
                { buyer: 'Alex M.', design: 'Modern Hillside Villa', amount: '$299', time: '2h ago' },
                { buyer: 'Sarah K.', design: 'Urban Loft Complex', amount: '$499', time: '5h ago' },
                { buyer: 'James L.', design: 'Minimalist Tiny House', amount: '$99', time: '1d ago' },
                { buyer: 'Emma R.', design: 'Luxury Penthouse', amount: '$399', time: '2d ago' },
              ].map((sale, i) => (
                <div key={i} className="ios-row" style={{ fontSize: 'var(--text-sm)' }}>
                  <span style={{ fontWeight: 600, minWidth: 60 }}>{sale.buyer}</span>
                  <span style={{ color: 'var(--text-secondary)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{sale.design}</span>
                  <span style={{ fontWeight: 600, color: 'var(--success)' }}>{sale.amount}</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)', marginLeft: 8 }}>{sale.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'listings' && (
          <div className="ios-group" style={{ overflow: 'auto' }}>
            <div className={s.tableHeader}>
              <span>Design</span><span>Category</span><span>Price</span><span>Sales</span><span>Rating</span><span>Status</span>
            </div>
            {mockListings.map(l => (
              <div key={l.id} className={s.tableRow}>
                <span className={s.listingTitle}>{l.title}</span>
                <span className={s.listingCat}>{l.category}</span>
                <span className="price">${l.price}</span>
                <span>{l.sales}</span>
                <span className={s.listingRating}><Star size={12} fill="var(--accent)" stroke="var(--accent)" /> {l.rating}</span>
                <span className="badge badge-success">{l.status}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className={`${s.analyticsPlaceholder} ios-group`}>
            <div style={{ padding: 'var(--space-2xl)', textAlign: 'center' }}>
              <BarChart3 size={44} color="var(--text-muted)" />
              <h3 className={s.analyticsTitle}>Advanced Analytics</h3>
              <p className={s.analyticsDesc}>Detailed analytics with traffic sources, conversion rates, and customer demographics coming soon.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
