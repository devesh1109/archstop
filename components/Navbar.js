'use client';
import Link from 'next/link';
import { Search, ShoppingCart, Menu, X, LogOut, LayoutDashboard, Sun, Moon } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/lib/CartContext';
import { useAuth } from '@/lib/AuthContext';
import { useTheme } from '@/lib/ThemeContext';
import s from './Navbar.module.css';

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { itemCount } = useCart();
  const { user, isAuthenticated, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className={s.navbar}>
      <div className={`container ${s.navbarInner}`}>
        <Link href="/" className={s.navbarLogo}>
          <span className={s.logoIcon}>◆</span>
          <span>ArchStop</span>
        </Link>

        <div className={s.navbarLinks}>
          <Link href="/browse" className={s.navLink}>Browse</Link>
          <Link href="/browse?category=house-plans" className={s.navLink}>House Plans</Link>
          <Link href="/browse?category=3d-models" className={s.navLink}>3D Models</Link>
          <Link href="/browse?category=cad-files" className={s.navLink}>CAD Files</Link>
        </div>

        <div className={s.navbarActions}>
          {searchOpen ? (
            <div className={s.navSearchExpanded}>
              <Search size={16} />
              <input
                type="text"
                placeholder="Search designs..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && searchQuery.trim()) {
                    window.location.href = `/browse?q=${encodeURIComponent(searchQuery)}`;
                  }
                }}
                autoFocus
                className={s.navSearchInput}
              />
              <button onClick={() => { setSearchOpen(false); setSearchQuery(''); }} className={s.navSearchClose}>
                <X size={16} />
              </button>
            </div>
          ) : (
            <button onClick={() => setSearchOpen(true)} className={s.navIconBtn} aria-label="Search">
              <Search size={20} />
            </button>
          )}

          <button onClick={toggleTheme} className={s.navIconBtn} aria-label="Toggle theme">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <Link href="/cart" className={`${s.navIconBtn} ${s.cartBtn}`} aria-label="Cart">
            <ShoppingCart size={20} />
            {itemCount > 0 && <span className={s.cartBadge}>{itemCount}</span>}
          </Link>

          {isAuthenticated ? (
            <div className={s.navUserMenu}>
              <button className={s.navUserBtn}>
                <span className={s.navAvatar}>{user.avatar}</span>
                <span className={s.navUsername}>{user.name}</span>
              </button>
              <div className={s.navDropdown}>
                {user.isVendor && (
                  <Link href="/dashboard" className={s.navDropdownItem}>
                    <LayoutDashboard size={16} /> Dashboard
                  </Link>
                )}
                <button onClick={signOut} className={s.navDropdownItem}>
                  <LogOut size={16} /> Sign Out
                </button>
              </div>
            </div>
          ) : (
            <Link href="/auth" className={`btn btn-primary btn-sm ${s.navSignin}`}>Sign In</Link>
          )}

          <Link href="/dashboard" className={`btn btn-sm ${s.sellBtn}`}>Sell</Link>
        </div>
      </div>
    </nav>
  );
}
