import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'NEXUS Admin',
  description: 'NEXUS Commerce Admin Panel',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-background text-text-primary min-h-screen font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
