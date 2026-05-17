'use client';

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Loader2,
  X,
  ArrowUp,
  ArrowDown,
  Minus,
  AlertTriangle,
  ClipboardList,
  FileText,
  LayoutDashboard,
} from 'lucide-react';
import Link from 'next/link';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  href?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  onClick,
  className,
  href,
  ...props
}: ButtonProps): JSX.Element {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-900';
  const disabledStyles = 'opacity-50 cursor-not-allowed';

  const variantStyles = {
    primary: 'bg-zinc-900 text-white hover:bg-zinc-700',
    secondary: 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200 border border-zinc-200',
    outline: 'border border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-50',
    ghost: 'hover:bg-zinc-100 text-zinc-700',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };

  const sizeStyles = {
    sm: 'h-8 px-3 text-sm rounded-md',
    md: 'h-10 px-4 text-sm rounded-lg',
    lg: 'h-12 px-5 text-base rounded-lg',
  };

  const content = (
    <>
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </>
  );

  const classes = cn(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    (disabled || loading) && disabledStyles,
    className
  );

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        onClick={onClick}
        aria-disabled={disabled || loading}
        tabIndex={(disabled || loading) ? -1 : undefined}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {content}
    </button>
  );
}

export function Card({ className, children }: { className?: string; children: React.ReactNode }): JSX.Element {
  return (
    <div className={cn('bg-white border border-zinc-200 rounded-xl shadow-sm', className)}>
      {children}
    </div>
  );
}

export function CardHeader({ className, children }: { className?: string; children: React.ReactNode }): JSX.Element {
  return (
    <div className={cn('flex flex-col space-y-1.5 p-6', className)}>
      {children}
    </div>
  );
}

export function CardTitle({ className, children }: { className?: string; children: React.ReactNode }): JSX.Element {
  return (
    <h3 className={cn('font-bold text-zinc-900 tracking-tight text-lg', className)}>
      {children}
    </h3>
  );
}

export function CardContent({ className, children }: { className?: string; children: React.ReactNode }): JSX.Element {
  return (
    <div className={cn('p-6 pt-0', className)}>
      {children}
    </div>
  );
}

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'purple';
}

export function Badge({ children, variant = 'default' }: BadgeProps): JSX.Element {
  const variantStyles = {
    default: 'bg-zinc-100 text-zinc-700',
    success: 'bg-emerald-50 text-emerald-600 border border-emerald-200',
    warning: 'bg-amber-50 text-amber-600 border border-amber-200',
    error: 'bg-red-50 text-red-600 border border-red-200',
    info: 'bg-blue-50 text-blue-600 border border-blue-200',
    purple: 'bg-purple-50 text-purple-600 border border-purple-200',
  };

  return (
    <span className={cn('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium', variantStyles[variant])}>
      {children}
    </span>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export function Input({ label, error, icon, className, ...props }: InputProps): JSX.Element {
  return (
    <div className="flex flex-col space-y-1">
      {label && <label className="text-sm font-medium text-zinc-700">{label}</label>}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            {React.isValidElement(icon) ? React.cloneElement(icon, { className: 'h-4 w-4 text-zinc-400' }) : icon}
          </div>
        )}
        <input
          className={cn(
            'flex h-10 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            icon ? 'pl-10' : '',
            error && 'border-red-500 focus-visible:ring-red-500',
            className
          )}
          {...props}
        />
      </div>
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  );
}

export function Spinner({ className }: { className?: string }): JSX.Element {
  return (
    <Loader2 className={cn('h-4 w-4 animate-spin text-zinc-500', className)} />
  );
}

interface AvatarProps {
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
}

export function Avatar({ name, size = 'md', className }: AvatarProps): JSX.Element {
  const initials = name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();

  const colorClasses = [
    'bg-blue-200 text-blue-800',
    'bg-green-200 text-green-800',
    'bg-purple-200 text-purple-800',
    'bg-yellow-200 text-yellow-800',
    'bg-red-200 text-red-800',
    'bg-indigo-200 text-indigo-800',
  ];

  const charCode = name.charCodeAt(0) % colorClasses.length;
  const bgColor = colorClasses[charCode];

  const sizeStyles = {
    xs: 'h-6 w-6 text-xs',
    sm: 'h-8 w-8 text-sm',
    md: 'h-10 w-10 text-base',
    lg: 'h-12 w-12 text-lg',
  };

  return (
    <div
      className={cn(
        'relative flex items-center justify-center rounded-full font-medium',
        bgColor,
        sizeStyles[size],
        className
      )}
    >
      {initials}
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string | number;
  changeType?: 'up' | 'down' | 'neutral';
  icon?: React.ReactNode;
  sparkline?: number[];
}

export function StatCard({ title, value, change, changeType = 'neutral', icon, sparkline }: StatCardProps): JSX.Element {
  const changeColor = {
    up: 'text-emerald-600',
    down: 'text-red-500',
    neutral: 'text-zinc-500',
  };

  const ChangeIcon = changeType === 'up' ? ArrowUp : changeType === 'down' ? ArrowDown : Minus;

  const SparklineComponent = ({ data, width = 40, height = 20 }: { data: number[]; width?: number; height?: number }): JSX.Element | null => {
    if (data.length < 2) return null;

    const maxVal = Math.max(...data);
    const minVal = Math.min(...data);

    const points = data.map((val, i) => {
      const x = (i / (data.length - 1)) * width;
      let y;
      if (maxVal === minVal) { // Handle flat line
        y = height / 2;
      } else {
        y = height - ((val - minVal) / (maxVal - minVal)) * height;
      }
      return `${x},${y}`;
    }).join(' ');

    return (
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="block">
        <polyline
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          points={points}
          className="text-indigo-500"
        />
      </svg>
    );
  };

  return (
    <Card className="p-4">
      <div className="flex items-start justify-between">
        <div>
          <CardTitle className="text-sm font-medium text-zinc-500">{title}</CardTitle>
          <div className="mt-1 text-2xl font-bold text-zinc-900">{value}</div>
        </div>
        {icon && (
          <div className="rounded-md bg-zinc-100 p-2 text-zinc-600">
            {React.isValidElement(icon) ? React.cloneElement(icon, { className: 'h-5 w-5' }) : icon}
          </div>
        )}
      </div>
      {(change !== undefined || sparkline) && (
        <div className="mt-3 flex items-center justify-between text-sm">
          {change !== undefined && (
            <div className={cn('flex items-center font-medium', changeColor[changeType])}>
              <ChangeIcon className="mr-1 h-4 w-4" />
              {change}
            </div>
          )}
          {sparkline && <SparklineComponent data={sparkline} />}
        </div>
      )}
    </Card>
  );
}

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Modal({ open, onClose, title, children, size = 'md' }: ModalProps): JSX.Element | null {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleEscape = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleEscape);
    } else {
      document.removeEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open, handleEscape]);

  if (!open) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 animate-fadein">
      <div
        ref={modalRef}
        className={cn(
          'relative bg-white rounded-2xl shadow-xl w-full animate-slideup',
          sizeClasses[size]
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-zinc-200">
          <h3 className="text-lg font-bold text-zinc-900">{title}</h3>
          <Button variant="ghost" size="sm" onClick={onClose} aria-label="Close">
            <X className="h-4 w-4 text-zinc-500" />
          </Button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="rounded-xl bg-zinc-100 p-4 text-zinc-500">
        {React.isValidElement(icon) ? React.cloneElement(icon, { className: 'h-8 w-8' }) : icon}
      </div>
      <h3 className="mt-4 text-xl font-bold text-zinc-900 tracking-tight">{title}</h3>
      <p className="mt-2 text-base text-zinc-600 max-w-md">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

interface TableProps<T> {
  columns: Array<{ key: string; label: string; render?: (row: T) => React.ReactNode }>;
  data: T[];
  onRowClick?: (row: T) => void;
}

export function Table<T extends { id: string }>({ columns, data, onRowClick }: TableProps<T>): JSX.Element {
  return (
    <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-zinc-200">
        <thead className="bg-zinc-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-200">
          {data.map((row, index) => (
            <tr
              key={row.id}
              className={cn(
                index % 2 === 0 ? 'bg-white' : 'bg-zinc-50',
                onRowClick && 'cursor-pointer hover:bg-zinc-100 transition-colors'
              )}
              onClick={() => onRowClick?.(row)}
            >
              {columns.map((column) => (
                <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm text-zinc-600">
                  {column.render ? column.render(row) : (row as any)[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}