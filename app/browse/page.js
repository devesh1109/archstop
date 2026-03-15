'use client';
import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal, X, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
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
      {/* iOS inline nav for mobile */}
      <div className="ios-browse-nav">
        <Link href="/" className="ios-nav-back">
          <ChevronLeft size={22} />
          <span>Home</span>
        </Link>
        <span className="ios-nav-title">Browse</span>
        <div style={{ width: 60 }} />
      </div>

      <div className="container">
        {/* Large title */}
        <div className="browse-header">
          <h1 className="ios-page-title">
            {selectedCategory ? categories.find(c => c.id === selectedCategory)?.name || 'Browse' : 'Browse'}
          </h1>
          <p className="ios-page-subtitle">{filtered.length} designs found</p>
        </div>

        {/* iOS search + sort row */}
        <div className="browse-toolbar">
          <div className="ios-search-bar" style={{ flex: 1 }}>
            <Search size={16} />
            <input
              type="text" placeholder="Search designs..."
              value={query} onChange={e => setQuery(e.target.value)}
            />
            {query && <button onClick={() => setQuery('')} className="search-clear"><X size={16} /></button>}
          </div>
          <button
            className="filter-btn"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal size={18} />
          </button>
        </div>

        {/* Category pills (horizontal scroll) */}
        <div className="category-pills">
          <button
            onClick={() => setSelectedCategory('')}
            className={`pill ${!selectedCategory ? 'pill-active' : ''}`}
          >All</button>
          {categories.map(c => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`pill ${selectedCategory === c.id ? 'pill-active' : ''}`}
            >{c.name}</button>
          ))}
        </div>

        {/* Sort + Filters panel */}
        {showFilters && (
          <div className="filters-panel animate-fadeIn">
            <div className="ios-group" style={{ marginBottom: 12 }}>
              <div className="ios-row" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 8 }}>
                <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>Sort By</span>
                <div className="ios-segmented">
                  {[
                    ['popular', 'Popular'],
                    ['rating', 'Rating'],
                    ['price-low', 'Price ↑'],
                    ['price-high', 'Price ↓'],
                  ].map(([val, label]) => (
                    <button
                      key={val}
                      onClick={() => setSortBy(val)}
                      className={`ios-segment ${sortBy === val ? 'ios-segment-active' : ''}`}
                    >{label}</button>
                  ))}
                </div>
              </div>
            </div>
            <div className="ios-group">
              <div className="ios-row" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 8 }}>
                <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>Price Range</span>
                <div className="ios-segmented">
                  {[
                    ['all', 'All'],
                    ['0-100', '<$100'],
                    ['100-250', '$100-250'],
                    ['250-500', '$250-500'],
                    ['500-99999', '$500+'],
                  ].map(([val, label]) => (
                    <button
                      key={val}
                      onClick={() => setPriceRange(val)}
                      className={`ios-segment ${priceRange === val ? 'ios-segment-active' : ''}`}
                    >{label}</button>
                  ))}
                </div>
              </div>
            </div>
            {(selectedCategory || priceRange !== 'all' || query) && (
              <button onClick={clearFilters} className="btn btn-ghost" style={{ width: '100%', marginTop: 12 }}>
                <X size={14} /> Clear All Filters
              </button>
            )}
          </div>
        )}

        {/* Results Grid */}
        <div className="browse-results">
          {filtered.length > 0 ? (
            <div className="browse-grid">
              {filtered.map((d, i) => (
                <DesignCard key={d.id} design={d} index={i} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p style={{ fontSize: 48, marginBottom: 12 }}>🔍</p>
              <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 6 }}>No designs found</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: 16 }}>Try adjusting your filters</p>
              <button onClick={clearFilters} className="btn btn-primary">Clear Filters</button>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .browse-page { padding-bottom: var(--space-xl); }

        /* iOS nav */
        .ios-browse-nav {
          display: none;
        }

        .browse-header { margin-bottom: var(--space-md); padding-top: var(--space-lg); }

        .browse-toolbar {
          display: flex;
          gap: 8px;
          margin-bottom: 12px;
          align-items: center;
        }
        .search-clear {
          color: var(--text-muted);
          display: flex;
          padding: 2px;
        }
        .filter-btn {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: rgba(142, 142, 147, 0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
          flex-shrink: 0;
          -webkit-tap-highlight-color: transparent;
        }
        .filter-btn:active { background: var(--bg-tertiary); }

        /* Category pills */
        .category-pills {
          display: flex;
          gap: 6px;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          padding-bottom: 4px;
          margin-bottom: var(--space-md);
          margin: 0 -16px 12px;
          padding: 0 16px 4px;
        }
        .category-pills::-webkit-scrollbar { display: none; }
        .pill {
          padding: 7px 16px;
          border-radius: var(--radius-full);
          font-size: var(--text-sm);
          font-weight: 500;
          white-space: nowrap;
          background: var(--bg-tertiary);
          color: var(--text-secondary);
          transition: all 0.15s ease;
          flex-shrink: 0;
          -webkit-tap-highlight-color: transparent;
        }
        .pill:active { transform: scale(0.95); }
        .pill-active {
          background: var(--ios-tint);
          color: white;
        }

        .filters-panel {
          margin-bottom: var(--space-md);
        }

        .browse-results { }
        .browse-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        }
        .empty-state {
          text-align: center;
          padding: var(--space-2xl);
        }

        @media (max-width: 768px) {
          .ios-browse-nav {
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
        }

        @media (min-width: 769px) {
          .browse-header { padding-top: var(--space-xl); }
          .browse-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: var(--space-md);
          }
          .category-pills {
            margin: 0 0 16px;
            padding: 0 0 4px;
          }
        }

        @media (min-width: 1024px) {
          .browse-grid { grid-template-columns: repeat(4, 1fr); }
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
