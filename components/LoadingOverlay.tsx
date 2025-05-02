import { Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

export function LoadingOverlay({ isLoading }: { isLoading: boolean }) {
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
          <div className="flex flex-col items-center">
            <Loader2 className="h-10 w-10 animate-spin text-white" />
            <p className="text-white mt-4">Procesando tu cita...</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}