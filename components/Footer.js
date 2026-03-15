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
              <span>ArchStop</span>
            </Link>
            <p className="footer-desc">The premier marketplace for architectural resources. Connecting designers with the tools they need.</p>
          </div>
          <div className="footer-col">
            <h4>Marketplace</h4>
            <Link href="/browse">Browse All</Link>
            <Link href="/browse?category=house-plans">House Plans</Link>
            <Link href="/browse?category=3d-models">3D Models</Link>
            <Link href="/browse?category=cad-files">CAD Files</Link>
          </div>
          <div className="footer-col">
            <h4>For Vendors</h4>
            <Link href="/dashboard">Start Selling</Link>
            <Link href="/dashboard">Vendor Dashboard</Link>
            <a href="#">Pricing & Fees</a>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <a href="#" className="footer-contact"><Mail size={14} /> hello@archstop.com</a>
            <a href="#" className="footer-contact"><Phone size={14} /> +1 (555) 123-4567</a>
            <a href="#" className="footer-contact"><MapPin size={14} /> San Francisco, CA</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 ArchStop. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background: var(--bg-secondary);
          border-top: 0.5px solid var(--ios-separator-light);
          padding: var(--space-2xl) 0 var(--space-lg);
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
          letter-spacing: -0.02em;
        }
        .logo-icon { color: var(--ios-tint); font-size: var(--text-2xl); }
        .footer-desc {
          color: var(--text-muted);
          font-size: var(--text-sm);
          line-height: 1.6;
        }
        .footer-col {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .footer-col h4 {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: var(--text-sm);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--text-primary);
          margin-bottom: 4px;
        }
        .footer-col a {
          font-size: var(--text-sm);
          color: var(--text-muted);
          transition: color 0.15s ease;
        }
        .footer-col a:hover { color: var(--ios-tint); }
        .footer-contact {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
        }
        .footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: var(--space-lg);
          margin-top: var(--space-xl);
          border-top: 0.5px solid var(--ios-separator-light);
          font-size: var(--text-sm);
          color: var(--text-muted);
        }
        .footer-bottom-links {
          display: flex;
          gap: var(--space-lg);
        }
        .footer-bottom-links a {
          color: var(--text-muted);
          transition: color 0.15s ease;
        }
        .footer-bottom-links a:hover { color: var(--ios-tint); }

        @media (max-width: 768px) {
          .footer { display: none; }
        }
      `}</style>
    </footer>
  );
}
