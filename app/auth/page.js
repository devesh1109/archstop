'use client';
import { useState } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, ArrowRight, Eye, EyeOff } from 'lucide-react';

export default function AuthPage() {
  const [tab, setTab] = useState('signin');
  const [showPass, setShowPass] = useState(false);
  const { signIn } = useAuth();
  const router = useRouter();

  const handleSignIn = (asVendor) => {
    signIn(asVendor);
    router.push(asVendor ? '/dashboard' : '/');
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card glass-card">
          <div className="auth-header">
            <span className="auth-logo">◆</span>
            <h1 className="auth-title">Welcome to UrbanMarket</h1>
            <p className="auth-subtitle">{tab === 'signin' ? 'Sign in to your account' : 'Create a new account'}</p>
          </div>

          <div className="auth-tabs">
            <button className={`auth-tab ${tab === 'signin' ? 'active' : ''}`} onClick={() => setTab('signin')}>Sign In</button>
            <button className={`auth-tab ${tab === 'signup' ? 'active' : ''}`} onClick={() => setTab('signup')}>Sign Up</button>
          </div>

          <div className="auth-form">
            {tab === 'signup' && (
              <div className="form-group">
                <label><User size={14} /> Full Name</label>
                <input type="text" className="input" placeholder="John Doe" />
              </div>
            )}
            <div className="form-group">
              <label><Mail size={14} /> Email</label>
              <input type="email" className="input" placeholder="you@example.com" />
            </div>
            <div className="form-group">
              <label><Lock size={14} /> Password</label>
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

            <div className="auth-divider">
              <span>or continue with</span>
            </div>

            <div className="social-buttons">
              <button className="btn btn-secondary social-btn" onClick={() => handleSignIn(false)}>
                <span style={{ fontSize: 18 }}>G</span> Google
              </button>
              <button className="btn btn-secondary social-btn" onClick={() => handleSignIn(false)}>
                <span style={{ fontSize: 18 }}>🍎</span> Apple
              </button>
            </div>

            <div className="demo-hint glass-card">
              <p style={{ fontSize: 'var(--text-sm)', fontWeight: 600, marginBottom: 8 }}>✦ Quick Demo Access</p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <button className="btn btn-primary btn-sm" onClick={() => handleSignIn(false)}>Sign in as Buyer</button>
                <button className="btn btn-secondary btn-sm" onClick={() => handleSignIn(true)}>Sign in as Vendor</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .auth-page { min-height: calc(100vh - var(--nav-height)); display: flex; align-items: center; justify-content: center; padding: var(--space-2xl); background: var(--gradient-hero); }
        .auth-container { width: 100%; max-width: 440px; }
        .auth-card { padding: var(--space-2xl); }
        .auth-header { text-align: center; margin-bottom: var(--space-xl); }
        .auth-logo { font-size: 36px; color: var(--accent); display: block; margin-bottom: var(--space-md); }
        .auth-title { font-family: var(--font-display); font-size: var(--text-2xl); font-weight: 700; }
        .auth-subtitle { color: var(--text-muted); font-size: var(--text-sm); margin-top: 4px; }
        .auth-tabs { display: flex; background: var(--bg-tertiary); border-radius: var(--radius-md); padding: 4px; margin-bottom: var(--space-xl); }
        .auth-tab { flex: 1; padding: var(--space-sm); border-radius: var(--radius-sm); font-size: var(--text-sm); font-weight: 500; color: var(--text-muted); transition: all var(--transition-fast); }
        .auth-tab.active { background: var(--bg-card); color: var(--accent); box-shadow: var(--shadow-sm); }
        .auth-form { display: flex; flex-direction: column; gap: var(--space-md); }
        .form-group { display: flex; flex-direction: column; gap: 6px; }
        .form-group label { font-size: var(--text-sm); font-weight: 500; color: var(--text-secondary); display: flex; align-items: center; gap: 6px; }
        .pass-toggle { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); color: var(--text-muted); display: flex; }
        .auth-divider { text-align: center; color: var(--text-muted); font-size: var(--text-sm); position: relative; margin: var(--space-md) 0; }
        .auth-divider span { background: var(--glass-bg); padding: 0 12px; position: relative; z-index: 1; }
        .auth-divider::before { content: ''; position: absolute; top: 50%; left: 0; right: 0; height: 1px; background: var(--border); }
        .social-buttons { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-md); }
        .social-btn { justify-content: center; }
        .demo-hint { padding: var(--space-md); margin-top: var(--space-sm); text-align: center; background: rgba(212,168,83,0.05); border-color: var(--border-accent); }
      `}</style>
    </div>
  );
}
