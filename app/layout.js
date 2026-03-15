import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TabBar from '@/components/TabBar';
import DemoProtection from '@/components/DemoProtection';
import DemoWatermark from '@/components/DemoWatermark';
import { CartProvider } from '@/lib/CartContext';
import { AuthProvider } from '@/lib/AuthContext';
import { ThemeProvider } from '@/lib/ThemeContext';

export const metadata = {
  title: 'ArchStop — Architectural Design Marketplace',
  description: 'Premium marketplace for architects and designers. Buy and sell house plans, 3D models, CAD files, Revit templates, and more.',
  keywords: 'architecture, house plans, CAD files, 3D models, interior design, blueprints, Revit',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'ArchStop',
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="apple-touch-icon" href="/images/hero_banner.png" />
      </head>
      <body>
        <ThemeProvider>
          <AuthProvider>
            <CartProvider>
              <Navbar />
              <main>
                {children}
              </main>
              <Footer />
              <TabBar />
              <DemoProtection />
              <DemoWatermark />
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
