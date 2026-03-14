'use client';
import { useState } from 'react';
import { Upload, Package, DollarSign, Eye, TrendingUp, Download, Star, Plus, BarChart3 } from 'lucide-react';
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
      <div className="container">
        <div className={s.dashHeader}>
          <div>
            <h1 className={s.dashTitle}>Vendor Dashboard</h1>
            <p className={s.dashSub}>Welcome back, Studio Arcana</p>
          </div>
          <button className="btn btn-primary" onClick={() => setShowUpload(!showUpload)}>
            <Plus size={16} /> Upload Design
          </button>
        </div>

        {showUpload && (
          <div className={`${s.uploadForm} glass-card animate-fadeInUp`}>
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
            <div className={s.formGroup} style={{ marginTop: 16 }}>
              <label>Description</label>
              <textarea className="input" rows={3} placeholder="Describe your design..." />
            </div>
            <div className={`${s.uploadDrop} glass-card`}>
              <Upload size={32} color="var(--accent)" />
              <p className={s.uploadDropText}>Drag & drop files or click to upload</p>
              <p className={s.uploadDropHint}>PDF, DWG, RVT, SKP, 3DS, BLEND — Max 100MB</p>
            </div>
            <div className={s.formActions}>
              <button className="btn btn-primary">Publish Design</button>
              <button className="btn btn-secondary" onClick={() => setShowUpload(false)}>Cancel</button>
            </div>
          </div>
        )}

        <div className={s.statsGrid}>
          {[
            { icon: DollarSign, label: 'Total Revenue', value: '$48,290', change: '+12.5%', color: 'var(--success)' },
            { icon: Package, label: 'Active Listings', value: '87', change: '+3', color: 'var(--accent)' },
            { icon: Download, label: 'Total Downloads', value: '2,340', change: '+156', color: 'var(--info)' },
            { icon: Eye, label: 'Total Views', value: '18.4K', change: '+2.1K', color: 'var(--warning)' },
          ].map(({ icon: Icon, label, value, change, color }) => (
            <div key={label} className={`${s.statCard} glass-card`}>
              <div className={s.statIcon} style={{ background: `${color}15`, color }}><Icon size={20} /></div>
              <div className={s.statInfo}>
                <span className={s.statLabel}>{label}</span>
                <span className={s.statValue}>{value}</span>
              </div>
              <span className={s.statChange} style={{ color }}><TrendingUp size={12} /> {change}</span>
            </div>
          ))}
        </div>

        <div className={s.dashTabs}>
          {['overview', 'listings', 'analytics'].map(t => (
            <button
              key={t}
              className={`${s.dashTab} ${activeTab === t ? s.dashTabActive : ''}`}
              onClick={() => setActiveTab(t)}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className={s.dashContent}>
            <div className={`${s.chartCard} glass-card`}>
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
            <div className={`${s.recentCard} glass-card`}>
              <h3 className={s.formHeading}>Recent Sales</h3>
              {[
                { buyer: 'Alex M.', design: 'Modern Hillside Villa', amount: '$299', time: '2h ago' },
                { buyer: 'Sarah K.', design: 'Urban Loft Complex', amount: '$499', time: '5h ago' },
                { buyer: 'James L.', design: 'Minimalist Tiny House', amount: '$99', time: '1d ago' },
                { buyer: 'Emma R.', design: 'Luxury Penthouse', amount: '$399', time: '2d ago' },
              ].map((sale, i) => (
                <div key={i} className={s.saleRow}>
                  <span className={s.saleBuyer}>{sale.buyer}</span>
                  <span className={s.saleDesign}>{sale.design}</span>
                  <span className={s.saleAmount}>{sale.amount}</span>
                  <span className={s.saleTime}>{sale.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'listings' && (
          <div className={`${s.listingsTable} glass-card`}>
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
          <div className={`${s.analyticsPlaceholder} glass-card`}>
            <BarChart3 size={48} color="var(--text-muted)" />
            <h3 className={s.analyticsTitle}>Advanced Analytics</h3>
            <p className={s.analyticsDesc}>Detailed analytics with traffic sources, conversion rates, and customer demographics coming soon.</p>
          </div>
        )}
      </div>
    </div>
  );
}
