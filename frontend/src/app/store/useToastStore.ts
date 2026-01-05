import { create } from 'zustand';

export type ToastVariant = 'default' | 'success' | 'error';

export interface ToastItem {
  id: string;
  title: string;
  description?: string;
  variant?: ToastVariant;
}

interface ToastState {
  toasts: ToastItem[];
  showToast: (toast: Omit<ToastItem, 'id'> & { durationMs?: number }) => void;
  removeToast: (id: string) => void;
}

const DEFAULT_DURATION = 3500;

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  showToast: ({ title, description, variant = 'default', durationMs = DEFAULT_DURATION }) => {
    const id = crypto.randomUUID();
    set((state) => ({ toasts: [...state.toasts, { id, title, description, variant }] }));

    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((toast) => toast.id !== id) }));
    }, durationMs);
  },
  removeToast: (id: string) =>
    set((state) => ({ toasts: state.toasts.filter((toast) => toast.id !== id) })),
}));
