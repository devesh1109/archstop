'use client';
import { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext();

const demoUser = {
  id: 'u1',
  name: 'Demo User',
  email: 'demo@urbanmarket.com',
  avatar: '👤',
  isVendor: false,
};

const demoVendor = {
  id: 'v1',
  name: 'Studio Arcana',
  email: 'studio@arcana.com',
  avatar: '🏛️',
  isVendor: true,
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const signIn = useCallback((asVendor = false) => {
    setUser(asVendor ? demoVendor : demoUser);
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
  }, []);

  const isAuthenticated = !!user;
  const isVendor = user?.isVendor || false;

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, isAuthenticated, isVendor }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
