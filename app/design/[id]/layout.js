import { designs } from '@/lib/data';

export function generateStaticParams() {
  return designs.map((design) => ({
    id: String(design.id),
  }));
}

export default function DesignLayout({ children }) {
  return <>{children}</>;
}
