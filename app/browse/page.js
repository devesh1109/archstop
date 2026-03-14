'use client';
import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import DesignCard from '@/components/DesignCard';
import { designs, categories } from '@/lib/data';
import { Suspense, useEffect } from 'react';

function BrowseContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  const initialQuery = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setSelectedCategory(searchParams.get('category') || '');
    setQuery(searchParams.get('q') || '');
  }, [searchParams]);

  const filtered = useMemo(() => {
    let result = [...designs];
    if (query) {
      const q = query.toLowerCase();
      result = result.filter(d => d.title.toLowerCase().includes(q) || d.description.toLowerCase().includes(q));
    }
    if (selectedCategory) {
      result = result.filter(d => d.category === selectedCategory);
    }
    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number);
      result = result.filter(d => d.price >= min && (max ? d.price <= max : true));
    }
    switch (sortBy) {
      case 'price-low': result.sort((a, b) => a.price - b.price); break;
      case 'price-high': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'newest': result.sort((a, b) => b.downloads - a.downloads); break;
      default: result.sort((a, b) => b.downloads - a.downloads);
    }
    return result;
  }, [query, selectedCategory, priceRange, sortBy]);

  const clearFilters = () => {
    setQuery(''); setSelectedCategory(''); setPriceRange('all'); setSortBy('popular');
  };

  return (
    <div className="browse-page">
      <div className="container">
        <div className="browse-header">
          <h1 className="browse-title">
            {selectedCategory ? categories.find(c => c.id === selectedCategory)?.name || 'Browse' : 'Browse All Designs'}
          </h1>
          <p className="browse-subtitle">{filtered.length} designs found</p>
        </div>

        <div className="browse-toolbar">
          <div className="search-bar">
            <Search size={18} />
            <input
              type="text" placeholder="Search designs, vendors, file types..."
              value={query} onChange={e => setQuery(e.target.value)}
              className="search-input"
            />
            {query && <button onClick={() => setQuery('')} className="search-clear"><X size={16} /></button>}
          </div>
          <div className="toolbar-right">
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="sort-select input">
              <option value="popular">Most Popular</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low → High</option>
              <option value="price-high">Price: High → Low</option>
              <option value="rating">Highest Rated</option>
            </select>
            <button className="btn btn-secondary filter-toggle" onClick={() => setShowFilters(!showFilters)}>
              <SlidersHorizontal size={16} /> Filters
            </button>
          </div>
        </div>

        <div className="browse-layout">
          <aside className={`filters-sidebar ${showFilters ? 'show' : ''}`}>
            <div className="filter-section">
              <h3 className="filter-title">Category</h3>
              <button onClick={() => setSelectedCategory('')} className={`filter-option ${!selectedCategory ? 'active' : ''}`}>All Categories</button>
              {categories.map(c => (
                <button key={c.id} onClick={() => setSelectedCategory(c.id)} className={`filter-option ${selectedCategory === c.id ? 'active' : ''}`}>
                  {c.name} <span className="filter-count">{c.count}</span>
                </button>
              ))}
            </div>
            <div className="filter-section">
              <h3 className="filter-title">Price Range</h3>
              {[
                ['all', 'All Prices'],
                ['0-100', 'Under $100'],
                ['100-250', '$100 – $250'],
                ['250-500', '$250 – $500'],
                ['500-99999', '$500+'],
              ].map(([val, label]) => (
                <button key={val} onClick={() => setPriceRange(val)} className={`filter-option ${priceRange === val ? 'active' : ''}`}>
                  {label}
                </button>
              ))}
            </div>
            {(selectedCategory || priceRange !== 'all' || query) && (
              <button onClick={clearFilters} className="btn btn-ghost" style={{ width: '100%', marginTop: '16px' }}>
                <X size={14} /> Clear All Filters
              </button>
            )}
          </aside>

          <div className="browse-grid">
            {filtered.length > 0 ? (
              <div className="grid-3">
                {filtered.map((d, i) => (
                  <DesignCard key={d.id} design={d} index={i} />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p className="empty-icon">🔍</p>
                <h3>No designs found</h3>
                <p>Try adjusting your filters or search query</p>
                <button onClick={clearFilters} className="btn btn-secondary">Clear Filters</button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .browse-page { padding: var(--space-2xl) 0; }
        .browse-header { margin-bottom: var(--space-xl); }
        .browse-title {
          font-family: var(--font-display);
          font-size: var(--text-3xl);
          font-weight: 700;
          margin-bottom: var(--space-xs);
        }
        .browse-subtitle { color: var(--text-muted); }
        .browse-toolbar {
          display: flex;
          gap: var(--space-md);
          margin-bottom: var(--space-xl);
          flex-wrap: wrap;
        }
        .search-bar {
          flex: 1;
          min-width: 280px;
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          background: var(--bg-tertiary);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 0 var(--space-md);
          transition: border-color var(--transition-fast);
        }
        .search-bar:focus-within { border-color: var(--accent); }
        .search-bar svg { color: var(--text-muted); flex-shrink: 0; }
        .search-input {
          flex: 1;
          border: none;
          background: none;
          color: var(--text-primary);
          padding: var(--space-md) 0;
          font-size: var(--text-sm);
          outline: none;
        }
        .search-clear {
          color: var(--text-muted);
          display: flex;
          padding: 4px;
          border-radius: 50%;
          transition: all var(--transition-fast);
        }
        .search-clear:hover { background: var(--bg-card-hover); }
        .toolbar-right { display: flex; gap: var(--space-md); }
        .sort-select { width: 180px; padding: var(--space-sm) var(--space-md); }
        .browse-layout {
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: var(--space-xl);
        }
        .filters-sidebar {
          display: flex;
          flex-direction: column;
          gap: var(--space-xl);
        }
        .filter-section { display: flex; flex-direction: column; gap: 4px; }
        .filter-title {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: var(--text-sm);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--text-primary);
          margin-bottom: var(--space-sm);
        }
        .filter-option {
          display: flex;
          justify-content: space-between;
          padding: var(--space-sm) var(--space-md);
          border-radius: var(--radius-sm);
          font-size: var(--text-sm);
          color: var(--text-secondary);
          transition: all var(--transition-fast);
          text-align: left;
        }
        .filter-option:hover { background: var(--bg-tertiary); color: var(--text-primary); }
        .filter-option.active {
          background: rgba(212,168,83,0.1);
          color: var(--accent);
          font-weight: 500;
        }
        .filter-count { color: var(--text-muted); font-size: var(--text-xs); }
        .browse-grid { min-width: 0; }
        .empty-state {
          text-align: center;
          padding: var(--space-4xl);
          color: var(--text-muted);
        }
        .empty-icon { font-size: 48px; margin-bottom: var(--space-md); }
        .empty-state h3 { font-size: var(--text-xl); margin-bottom: var(--space-sm); color: var(--text-primary); }
        .empty-state p { margin-bottom: var(--space-lg); }

        .filter-toggle { display: none; }

        @media (max-width: 768px) {
          .browse-layout { grid-template-columns: 1fr; }
          .filters-sidebar { display: none; }
          .filters-sidebar.show {
            display: flex;
            background: var(--bg-secondary);
            border: 1px solid var(--border);
            border-radius: var(--radius-lg);
            padding: var(--space-lg);
          }
          .filter-toggle { display: inline-flex; }
          .sort-select { width: 140px; }
        }
      `}</style>
    </div>
  );
}

export default function BrowsePage() {
  return (
    <Suspense fallback={<div className="container" style={{padding: '80px 0', textAlign:'center', color:'var(--text-muted)'}}>Loading...</div>}>
      <BrowseContent />
    </Suspense>
  );
}
