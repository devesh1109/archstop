import { vendors } from '@/lib/data';

export function generateStaticParams() {
  return vendors.map((vendor) => ({
    id: String(vendor.id),
  }));
}

export default function VendorLayout({ children }) {
  return <>{children}</>;
}
