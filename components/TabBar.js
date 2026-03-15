'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, ShoppingCart, LayoutGrid, User } from 'lucide-react';
import { useCart } from '@/lib/CartContext';
import { useAuth } from '@/lib/AuthContext';

const tabs = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/browse', icon: Search, label: 'Browse' },
  { href: '/cart', icon: ShoppingCart, label: 'Cart', badge: true },
  { href: '/dashboard', icon: LayoutGrid, label: 'Dashboard' },
  { href: '/auth', icon: User, label: 'Profile' },
];

export default function TabBar() {
  const pathname = usePathname();
  const { itemCount } = useCart();
  const { isAuthenticated, user } = useAuth();

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav className="ios-tab-bar">
      {tabs.map(({ href, icon: Icon, label, badge }) => {
        const active = isActive(href);
        const profileHref = isAuthenticated ? (user?.isVendor ? '/dashboard' : '/auth') : '/auth';
        const finalHref = label === 'Profile' ? profileHref : href;

        return (
          <Link key={label} href={finalHref} className={`ios-tab ${active ? 'ios-tab-active' : ''}`}>
            <span className="ios-tab-icon-wrap">
              <Icon size={22} strokeWidth={active ? 2.2 : 1.6} />
              {badge && itemCount > 0 && (
                <span className="ios-tab-badge">{itemCount > 9 ? '9+' : itemCount}</span>
              )}
            </span>
            <span className="ios-tab-label">{label === 'Profile' && isAuthenticated ? user.name.split(' ')[0] : label}</span>
          </Link>
        );
      })}

      <style jsx>{`
        .ios-tab-bar {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 200;
          display: flex;
          align-items: stretch;
          justify-content: space-around;
          height: calc(49px + env(safe-area-inset-bottom, 0px));
          padding-bottom: env(safe-area-inset-bottom, 0px);
          background: var(--ios-bar-bg);
          backdrop-filter: saturate(180%) blur(20px);
          -webkit-backdrop-filter: saturate(180%) blur(20px);
          border-top: 0.5px solid var(--ios-separator);
        }
        .ios-tab {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2px;
          flex: 1;
          color: var(--ios-tab-inactive);
          text-decoration: none;
          -webkit-tap-highlight-color: transparent;
          padding-top: 5px;
          transition: color 0.15s ease;
        }
        .ios-tab-active {
          color: var(--ios-tint);
        }
        .ios-tab-icon-wrap {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 24px;
        }
        .ios-tab-badge {
          position: absolute;
          top: -4px;
          right: -10px;
          min-width: 18px;
          height: 18px;
          border-radius: 9px;
          background: #ff3b30;
          color: white;
          font-size: 11px;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 4px;
          line-height: 1;
        }
        .ios-tab-label {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.01em;
        }

        @media (min-width: 769px) {
          .ios-tab-bar {
            display: none;
          }
        }
      `}</style>
    </nav>
  );
}
