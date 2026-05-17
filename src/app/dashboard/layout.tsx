'use client';

import { AppSidebar } from '@/components/layout';
import { ClipboardList, LayoutDashboard, FileText } from 'lucide-react';
import React from 'react';

interface NavItem {
  icon: React.ReactElement;
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { icon: <ClipboardList size={16} />, label: 'Intake Queue', href: '/dashboard/intake-queue' },
  { icon: <LayoutDashboard size={16} />, label: 'Follow-up Dashboard', href: '/dashboard/follow-up-dashboard' },
  { icon: <FileText size={16} />, label: 'ROI Reports', href: '/dashboard/roi-reports' },
];

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <div className="flex min-h-screen bg-zinc-50">
      <AppSidebar items={navItems} projectName="Clinic Follow-up Queue" />
      <div className="flex-1 ml-64 flex flex-col min-h-full">
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}