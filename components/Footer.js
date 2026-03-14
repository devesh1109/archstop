'use client';
import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="footer-logo">
              <span className="logo-icon">◆</span>
              <span>UrbanMarket</span>
            </Link>
            <p className="footer-desc">The premier marketplace for architectural resources. Connecting designers with the tools they need to bring their visions to life.</p>
            <div className="footer-social">
              <a href="#" className="social-icon">𝕏</a>
              <a href="#" className="social-icon">in</a>
              <a href="#" className="social-icon">ig</a>
              <a href="#" className="social-icon">yt</a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Marketplace</h4>
            <Link href="/browse">Browse All</Link>
            <Link href="/browse?category=house-plans">House Plans</Link>
            <Link href="/browse?category=3d-models">3D Models</Link>
            <Link href="/browse?category=cad-files">CAD Files</Link>
            <Link href="/browse?category=revit-files">Revit Files</Link>
          </div>
          <div className="footer-col">
            <h4>For Vendors</h4>
            <Link href="/dashboard">Start Selling</Link>
            <Link href="/dashboard">Vendor Dashboard</Link>
            <a href="#">Pricing & Fees</a>
            <a href="#">Seller Guidelines</a>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <a href="#" className="footer-contact"><Mail size={14} /> hello@urbanmarket.com</a>
            <a href="#" className="footer-contact"><Phone size={14} /> +1 (555) 123-4567</a>
            <a href="#" className="footer-contact"><MapPin size={14} /> San Francisco, CA</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 UrbanMarket. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background: var(--bg-secondary);
          border-top: 1px solid var(--border);
          padding: var(--space-3xl) 0 var(--space-lg);
          margin-top: var(--space-4xl);
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1fr;
          gap: var(--space-2xl);
        }
        .footer-logo {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          font-family: var(--font-display);
          font-weight: 700;
          font-size: var(--text-xl);
          margin-bottom: var(--space-md);
        }
        .logo-icon { color: var(--accent); font-size: var(--text-2xl); }
        .footer-desc {
          color: var(--text-muted);
          font-size: var(--text-sm);
          line-height: 1.7;
          margin-bottom: var(--space-lg);
        }
        .footer-social {
          display: flex;
          gap: var(--space-sm);
        }
        .social-icon {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-md);
          background: var(--bg-tertiary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: var(--text-sm);
          font-weight: 700;
          color: var(--text-muted);
          transition: all var(--transition-fast);
        }
        .social-icon:hover {
          background: var(--accent);
          color: var(--text-inverse);
        }
        .footer-col {
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
        }
        .footer-col h4 {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: var(--text-sm);
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--text-primary);
          margin-bottom: var(--space-xs);
        }
        .footer-col a {
          font-size: var(--text-sm);
          color: var(--text-muted);
          transition: color var(--transition-fast);
        }
        .footer-col a:hover { color: var(--accent); }
        .footer-contact {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
        }
        .footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: var(--space-xl);
          margin-top: var(--space-2xl);
          border-top: 1px solid var(--border);
          font-size: var(--text-sm);
          color: var(--text-muted);
        }
        .footer-bottom-links {
          display: flex;
          gap: var(--space-lg);
        }
        .footer-bottom-links a {
          color: var(--text-muted);
          transition: color var(--transition-fast);
        }
        .footer-bottom-links a:hover { color: var(--accent); }

        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: var(--space-xl);
          }
          .footer-bottom {
            flex-direction: column;
            gap: var(--space-md);
            text-align: center;
          }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </footer>
  );
}
