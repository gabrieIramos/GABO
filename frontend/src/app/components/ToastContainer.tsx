import { X } from 'lucide-react';
import { useToastStore } from '../store/useToastStore';
import { motion, AnimatePresence } from 'motion/react';

const variantClasses: Record<string, string> = {
  default: 'bg-white text-black border-gray-200',
  success: 'bg-green-50 text-green-900 border-green-200',
  error: 'bg-red-50 text-red-900 border-red-200',
};

export function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-3 w-[320px] max-w-[90vw]">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`border shadow-lg rounded-md p-4 pr-10 relative ${variantClasses[toast.variant || 'default']}`}
          >
            <button
              onClick={() => removeToast(toast.id)}
              className="absolute top-3 right-3 text-sm text-gray-500 hover:text-black"
              aria-label="Fechar aviso"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="font-semibold text-sm leading-tight">{toast.title}</div>
            {toast.description && (
              <div className="text-xs text-gray-600 mt-1 leading-snug">{toast.description}</div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
