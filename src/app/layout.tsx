import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Clinic Follow-up Queue — Streamline client follow-ups, boost repeat visits.',
  description: 'The first generated app provides wellness clinic operators with a structured intake queue, a centralized dashboard to prioritize client follow-ups, and instant ROI reports to boost repeat visits.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-zinc-50 antialiased`}>
        <div className="fixed top-0 left-0 right-0 z-50 bg-zinc-900 text-zinc-100 text-xs px-4 py-2 flex justify-between items-center">
          <span>⚡ Demo Mode — Clinic Follow-up Queue · Built with NEXUS OS</span>
          <Link href="/dashboard" className="text-white hover:text-zinc-300 transition-colors">
            Open Dashboard →
          </Link>
        </div>
        <div className="pt-9">
          {children}
        </div>
      </body>
    </html>
  );
}