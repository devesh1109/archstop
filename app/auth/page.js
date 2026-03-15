'use client';
import { useState } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, ArrowRight, Eye, EyeOff, ChevronLeft, LogOut, Settings, ShoppingBag, Heart } from 'lucide-react';
import Link from 'next/link';

export default function AuthPage() {
  const [tab, setTab] = useState('signin');
  const [showPass, setShowPass] = useState(false);
  const { signIn, signOut, isAuthenticated, user } = useAuth();
  const router = useRouter();

  const handleSignIn = (asVendor) => {
    signIn(asVendor);
    router.push(asVendor ? '/dashboard' : '/');
  };

  // If authenticated, show iOS-style profile screen
  if (isAuthenticated) {
    return (
      <div className="profile-page">
        <div className="ios-profile-nav">
          <div style={{ width: 60 }} />
          <span className="ios-nav-title">Profile</span>
          <div style={{ width: 60 }} />
        </div>
        <div className="container">
          <div className="profile-header">
            <h1 className="ios-page-title" style={{ display: 'none' }}>Profile</h1>
            <div className="profile-avatar">{user.avatar}</div>
            <h2 className="profile-name">{user.name}</h2>
            <p className="profile-email">{user.email}</p>
            {user.isVendor && <span className="badge badge-accent">Vendor</span>}
          </div>

          <div className="ios-group" style={{ marginTop: 20 }}>
            <Link href="/cart" className="ios-row profile-row">
              <ShoppingBag size={20} color="var(--ios-tint)" />
              <span style={{ flex: 1 }}>My Orders</span>
              <ChevronLeft size={18} color="var(--text-muted)" style={{ opacity: 0.5, transform: 'rotate(180deg)' }} />
            </Link>
            <Link href="/browse" className="ios-row profile-row">
              <Heart size={20} color="#ff3b30" />
              <span style={{ flex: 1 }}>Wishlist</span>
              <ChevronLeft size={18} color="var(--text-muted)" style={{ opacity: 0.5, transform: 'rotate(180deg)' }} />
            </Link>
            {user.isVendor && (
              <Link href="/dashboard" className="ios-row profile-row">
                <Settings size={20} color="var(--text-muted)" />
                <span style={{ flex: 1 }}>Vendor Dashboard</span>
                <ChevronLeft size={18} color="var(--text-muted)" style={{ opacity: 0.5, transform: 'rotate(180deg)' }} />
              </Link>
            )}
          </div>

          <div className="ios-group" style={{ marginTop: 16 }}>
            <button onClick={signOut} className="ios-row signout-row">
              <LogOut size={20} color="#ff3b30" />
              <span style={{ flex: 1, color: '#ff3b30' }}>Sign Out</span>
            </button>
          </div>
        </div>

        <style jsx>{`
          .profile-page { padding-bottom: var(--space-2xl); }
          .ios-profile-nav { display: none; }
          .profile-header {
            text-align: center;
            padding: var(--space-xl) 0;
          }
          .profile-avatar {
            font-size: 64px;
            margin-bottom: 8px;
          }
          .profile-name {
            font-family: var(--font-display);
            font-size: var(--text-2xl);
            font-weight: 700;
            letter-spacing: -0.02em;
          }
          .profile-email {
            color: var(--text-muted);
            font-size: var(--text-base);
            margin-bottom: 8px;
          }
          .profile-row {
            text-decoration: none;
            cursor: pointer;
            font-size: var(--text-base);
          }
          .signout-row {
            cursor: pointer;
            font-size: var(--text-base);
            width: 100%;
          }

          @media (max-width: 768px) {
            .ios-profile-nav {
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 8px 16px;
              padding-top: calc(8px + env(safe-area-inset-top, 0px));
              background: var(--ios-bar-bg);
              backdrop-filter: saturate(180%) blur(20px);
              -webkit-backdrop-filter: saturate(180%) blur(20px);
              border-bottom: 0.5px solid var(--ios-separator);
              min-height: 44px;
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="auth-page">
      {/* iOS Nav */}
      <div className="ios-auth-nav">
        <Link href="/" className="ios-nav-back">
          <ChevronLeft size={22} /><span>Home</span>
        </Link>
        <span className="ios-nav-title">Sign In</span>
        <div style={{ width: 60 }} />
      </div>

      <div className="auth-container">
        <div className="auth-inner">
          <div className="auth-header">
            <span className="auth-logo">◆</span>
            <h1 className="auth-title">Welcome to ArchStop</h1>
            <p className="auth-subtitle">{tab === 'signin' ? 'Sign in to your account' : 'Create a new account'}</p>
          </div>

          {/* iOS Segmented Control */}
          <div className="ios-segmented" style={{ marginBottom: 20 }}>
            <button className={`ios-segment ${tab === 'signin' ? 'ios-segment-active' : ''}`} onClick={() => setTab('signin')}>Sign In</button>
            <button className={`ios-segment ${tab === 'signup' ? 'ios-segment-active' : ''}`} onClick={() => setTab('signup')}>Sign Up</button>
          </div>

          <div className="auth-form">
            {tab === 'signup' && (
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" className="input" placeholder="John Doe" />
              </div>
            )}
            <div className="form-group">
              <label>Email</label>
              <input type="email" className="input" placeholder="you@example.com" />
            </div>
            <div className="form-group">
              <label>Password</label>
              <div style={{ position: 'relative' }}>
                <input type={showPass ? 'text' : 'password'} className="input" placeholder="••••••••" />
                <button className="pass-toggle" onClick={() => setShowPass(!showPass)}>
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button className="btn btn-primary btn-lg" style={{ width: '100%' }} onClick={() => handleSignIn(false)}>
              {tab === 'signin' ? 'Sign In' : 'Create Account'} <ArrowRight size={16} />
            </button>

            <div className="auth-divider"><span>or</span></div>

            <div className="social-buttons">
              <button className="social-btn" onClick={() => handleSignIn(false)}>
                <span style={{ fontSize: 18, fontWeight: 700 }}>G</span> Google
              </button>
              <button className="social-btn" onClick={() => handleSignIn(false)}>
                <span style={{ fontSize: 18 }}>🍎</span> Apple
              </button>
            </div>

            <div className="demo-section">
              <p style={{ fontSize: 'var(--text-sm)', fontWeight: 600, marginBottom: 10, color: 'var(--ios-tint)' }}>Quick Demo Access</p>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn btn-primary btn-sm" style={{ flex: 1 }} onClick={() => handleSignIn(false)}>Buyer</button>
                <button className="btn btn-secondary btn-sm" style={{ flex: 1 }} onClick={() => handleSignIn(true)}>Vendor</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .auth-page {
          min-height: calc(100vh - var(--nav-height));
          min-height: calc(100dvh - var(--nav-height));
          background: var(--bg-primary);
        }
        .ios-auth-nav { display: none; }
        .auth-container {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: calc(100vh - var(--nav-height) - 52px);
          padding: var(--space-lg);
        }
        .auth-inner { width: 100%; max-width: 400px; }
        .auth-header { text-align: center; margin-bottom: var(--space-lg); }
        .auth-logo { font-size: 40px; color: var(--ios-tint); display: block; margin-bottom: 12px; }
        .auth-title {
          font-family: var(--font-display);
          font-size: var(--text-2xl);
          font-weight: 700;
          letter-spacing: -0.02em;
        }
        .auth-subtitle { color: var(--text-muted); font-size: var(--text-base); margin-top: 4px; }
        .auth-form { display: flex; flex-direction: column; gap: 14px; }
        .form-group { display: flex; flex-direction: column; gap: 6px; }
        .form-group label { font-size: var(--text-sm); font-weight: 500; color: var(--text-secondary); }
        .pass-toggle { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); color: var(--text-muted); display: flex; }
        .auth-divider {
          text-align: center;
          color: var(--text-muted);
          font-size: var(--text-sm);
          position: relative;
        }
        .auth-divider span {
          background: var(--bg-primary);
          padding: 0 12px;
          position: relative;
          z-index: 1;
        }
        .auth-divider::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 0.5px;
          background: var(--ios-separator-light);
        }
        .social-buttons { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 11px;
          border-radius: var(--radius-md);
          background: var(--bg-card);
          box-shadow: var(--ios-card-shadow);
          font-weight: 500;
          font-size: var(--text-base);
          transition: transform 0.15s ease;
        }
        .social-btn:active { transform: scale(0.97); }
        .demo-section {
          text-align: center;
          padding: var(--space-md);
          background: var(--ios-tint-light);
          border-radius: var(--radius-md);
        }

        @media (max-width: 768px) {
          .ios-auth-nav {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 8px 16px;
            padding-top: calc(8px + env(safe-area-inset-top, 0px));
            background: var(--ios-bar-bg);
            backdrop-filter: saturate(180%) blur(20px);
            -webkit-backdrop-filter: saturate(180%) blur(20px);
            border-bottom: 0.5px solid var(--ios-separator);
            min-height: 44px;
          }
          .auth-container { align-items: flex-start; padding-top: var(--space-xl); }
        }
      `}</style>
    </div>
  );
}
