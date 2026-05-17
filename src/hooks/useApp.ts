'use client';

import React, { useState, useEffect, useRef } from 'react';

// SSR-safe localStorage hook
export function useLocalStorage<T>(key: string, initial: T): [T, (v: T) => void] {
  const [value, setValue] = useState<T>(() => {
    // During SSR, localStorage is not available, so return initial value
    if (typeof window === 'undefined') {
      return initial;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initial;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return initial;
    }
  });

  const setStoredValue = (newValue: T) => {
    try {
      setValue(newValue);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(newValue));
      }
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  };

  return [value, setStoredValue];
}

// Filter hook for tables with search and status
export function useFilter<T extends Record<string, unknown>>(
  items: T[],
  fields: (keyof T)[]
): {
  filtered: T[];
  search: string;
  setSearch: (s: string) => void;
  status: string;
  setStatus: (s: string) => void;
} {
  const [search, setSearch] = useState<string>('');
  const [status, setStatus] = useState<string>('');

  const filtered = React.useMemo(() => {
    let result = items;

    if (status !== '') {
      result = result.filter(item => {
        if (typeof item.status === 'string') {
          return item.status.toLowerCase() === status.toLowerCase();
        }
        return false;
      });
    }

    if (search.trim() !== '') {
      const lowercasedSearch = search.toLowerCase();
      result = result.filter(item =>
        fields.some(field => {
          const value = item[field];
          if (typeof value === 'string' || typeof value === 'number') {
            return String(value).toLowerCase().includes(lowercasedSearch);
          }
          return false;
        })
      );
    }
    return result;
  }, [items, fields, search, status]);

  return { filtered, search, setSearch, status, setStatus };
}

// Modal management hook
export function useModal<T = unknown>(): {
  isOpen: boolean;
  open: (item?: T) => void;
  close: () => void;
  activeItem: T | null;
} {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<T | null>(null);

  const open = (item?: T) => {
    setActiveItem(item || null);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setActiveItem(null); // Clear active item on close
  };

  return { isOpen, open, close, activeItem };
}

// Demo toast notification hook
export function useDemoToast(): {
  message: string;
  type: 'success' | 'error' | 'info';
  visible: boolean;
  show: (msg: string, type?: 'success' | 'error' | 'info') => void;
} {
  const [message, setMessage] = useState('');
  const [type, setType] = useState<'success' | 'error' | 'info'>('info');
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const show = (msg: string, msgType: 'success' | 'error' | 'info' = 'info') => {
    // Clear any existing timer to allow new toast to show immediately
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    setMessage(msg);
    setType(msgType);
    setVisible(true);

    timerRef.current = setTimeout(() => {
      setVisible(false);
      setMessage('');
      timerRef.current = null;
    }, 2500); // Auto-hide after 2.5 seconds
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return { message, type, visible, show };
}