'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  X,
  ArrowUp,
  ArrowDown,
  Search,
  ClipboardList,
  FileText,
  LayoutDashboard,
  CheckCircle,
  AlertTriangle,
  Info,
  CalendarDays,
  Tag,
  MessageSquare,
  User,
  Phone,
  Mail,
  Clock,
} from 'lucide-react';
import { Button, Modal, Badge, Input, cn, Avatar } from '@/components/ui';

// Helper for formatting
const formatValue = (key: string, value: unknown): React.ReactNode => {
  if (value === null || value === undefined) {
    return <span className="text-zinc-400 italic">N/A</span>;
  }
  if (key.toLowerCase().includes('date') && typeof value === 'string' && !isNaN(new Date(value).getTime())) {
    try {
      return new Date(value).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch (e) {
      return String(value);
    }
  }
  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No';
  }
  if (typeof value === 'object' && !Array.isArray(value)) {
    return <pre className="text-xs bg-zinc-50 p-2 rounded-md overflow-x-auto">{JSON.stringify(value, null, 2)}</pre>;
  }
  return String(value);
};

// Helper for status badge color
const getStatusBadgeVariant = (status: string): 'default' | 'success' | 'warning' | 'danger' | 'info' | 'secondary' => {
  const lowerStatus = status.toLowerCase();
  if (lowerStatus === 'processed' || lowerStatus === 'completed' || lowerStatus === 'active') return 'success';
  if (lowerStatus === 'pending' || lowerStatus === 'in progress' || lowerStatus === 'ready for follow-up') return 'info';
  if (lowerStatus === 'overdue' || lowerStatus === 'urgent' || lowerStatus === 'requires action' || lowerStatus === 'blocked') return 'danger';
  if (lowerStatus === 'archived' || lowerStatus === 'inactive') return 'secondary';
  return 'default';
};

interface EntityDetailModalProps {
  item: Record<string, unknown> | null;
  open: boolean;
  onClose: () => void;
  title: string;
}

export function EntityDetailModal({ item, open, onClose, title }: EntityDetailModalProps): JSX.Element {
  if (!item) return <Modal open={open} onClose={onClose} title={title} />;

  const displayFields = Object.entries(item).filter(([key]) => key !== 'id' && key !== 'clientId' && key !== 'clinicLocationId');
  const status = typeof item.status === 'string' ? item.status : 'Unknown';

  return (
    <Modal open={open} onClose={onClose} title={title}>
      <div className="flex justify-end mb-4">
        <Badge variant={getStatusBadgeVariant(status)}>{status}</Badge>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-6">
        {displayFields.map(([key, value]) => (
          <div key={key} className="flex flex-col">
            <span className="font-semibold text-zinc-700 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
            <span className="text-zinc-600">{formatValue(key, value)}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-end gap-2 pt-4 border-t border-zinc-100">
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="info" onClick={() => { console.log('Simulating action: Approve'); onClose(); }}>
          Approve
        </Button>
        <Button variant="secondary" onClick={() => { console.log('Simulating action: Archive'); onClose(); }}>
          Archive
        </Button>
        <Button variant="danger" onClick={() => { console.log('Simulating action: Delete'); onClose(); }}>
          Delete
        </Button>
      </div>
    </Modal>
  );
}

interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  message: string;
  onConfirm: () => void;
  confirmLabel?: string;
  variant?: 'danger' | 'info';
}

export function ConfirmModal({
  open,
  onClose,
  title,
  message,
  onConfirm,
  confirmLabel = 'Confirm',
  variant = 'info',
}: ConfirmModalProps): JSX.Element {
  return (
    <Modal open={open} onClose={onClose} title={title}>
      <p className="text-zinc-600 mb-6">{message}</p>
      <div className="flex justify-end gap-2">
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant={variant === 'danger' ? 'danger' : 'primary'} onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}

interface CommandPaletteItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  description?: string;
}

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  items: CommandPaletteItem[];
}

export function CommandPalette({ open, onClose, items }: CommandPaletteProps): JSX.Element {
  const [search, setSearch] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const filteredItems = items.filter(item =>
    item.label.toLowerCase().includes(search.toLowerCase()) ||
    (item.description && item.description.toLowerCase().includes(search.toLowerCase()))
  );

  useEffect(() => {
    if (open) {
      setSearch('');
      setActiveIndex(0);
      // Timeout needed to ensure modal is rendered before attempting to focus
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex(prev => (prev + 1) % filteredItems.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex(prev => (prev - 1 + filteredItems.length) % filteredItems.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[activeIndex]) {
          router.push(filteredItems[activeIndex].href);
          onClose();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, activeIndex, filteredItems, onClose, router]);

  return (
    <Modal open={open} onClose={onClose} title="Search & Navigate" size="lg">
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
        <Input
          ref={inputRef}
          type="text"
          placeholder="Type to search..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-10 pr-4 py-2 w-full"
        />
      </div>
      <div className="max-h-80 overflow-y-auto">
        {filteredItems.length === 0 ? (
          <p className="text-zinc-500 p-4 text-center">No results found.</p>
        ) : (
          <ul className="space-y-1">
            {filteredItems.map((item, index) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    'flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors',
                    'hover:bg-zinc-100',
                    activeIndex === index ? 'bg-zinc-100' : 'bg-white'
                  )}
                >
                  <span className="text-zinc-500">{item.icon || <Tag size={18} />}</span>
                  <div>
                    <span className="font-medium text-zinc-800">{item.label}</span>
                    {item.description && <p className="text-sm text-zinc-500">{item.description}</p>}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Modal>
  );
}