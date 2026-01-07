import { X, CheckCircle2, XCircle, Info } from 'lucide-react';
import { useToastStore } from '../store/useToastStore';
import { motion, AnimatePresence } from 'motion/react';

const variantClasses: Record<string, string> = {
  default: 'bg-zinc-900 text-white border-zinc-700',
  success: 'bg-zinc-900 text-white border-lime-400',
  error: 'bg-zinc-900 text-white border-red-500',
};

const variantIcons: Record<string, JSX.Element> = {
  default: <Info className="w-5 h-5 text-zinc-400" />,
  success: <CheckCircle2 className="w-5 h-5 text-lime-400" />,
  error: <XCircle className="w-5 h-5 text-red-500" />,
};

export function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed bottom-4 right-4 z-[9999] flex flex-col-reverse gap-3 w-[320px] max-w-[90vw]">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 100, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={`border-2 backdrop-blur-sm bg-zinc-900/95 p-4 pr-10 relative ${variantClasses[toast.variant || 'default']} shadow-[0_8px_30px_rgba(0,0,0,0.8)]`}
          >
            <button
              onClick={() => removeToast(toast.id)}
              className="absolute top-3 right-3 text-zinc-500 hover:text-white transition-colors"
              aria-label="Fechar aviso"
            >
              <X className="w-4 h-4" />
            </button>
            
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                {variantIcons[toast.variant || 'default']}
              </div>
              <div className="flex-1">
                <div className="font-black text-sm uppercase tracking-wide leading-tight">{toast.title}</div>
                {toast.description && (
                  <div className="text-xs text-zinc-400 mt-1.5 leading-snug">{toast.description}</div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
