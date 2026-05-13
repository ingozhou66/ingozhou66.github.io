import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2 } from 'lucide-react';
import type { Project } from '@/data/projects';

interface IframePreviewModalProps {
  project: Project | null;
  open: boolean;
  onClose: () => void;
}

export function IframePreviewModal({
  project,
  open,
  onClose,
}: IframePreviewModalProps) {
  const [loading, setLoading] = useState(true);

  // Reset loading state when project changes
  useEffect(() => {
    if (open) {
      setLoading(true);
    }
  }, [open, project?.id]);

  // Handle ESC key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) {
      window.addEventListener('keydown', handleKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!project || project.type !== 'iframe') return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/85 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-[90vw] h-[90vh] bg-surface rounded-xl border border-border overflow-hidden flex flex-col"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 h-14 border-b border-border flex-shrink-0">
              <div className="flex items-center gap-3">
                <h3 className="text-sm font-semibold text-txt-primary">
                  {project.title}
                </h3>
              </div>

              <div className="flex items-center gap-3">
                {/* Tech tags */}
                <div className="hidden sm:flex items-center gap-2">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="tech-tag text-[11px] py-0.5">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Close button */}
                <button
                  onClick={onClose}
                  className="ghost-btn p-2"
                  title="关闭 (ESC)"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Iframe Container */}
            <div className="flex-1 relative bg-surface-primary">
              {/* Loading skeleton */}
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-surface-primary z-10">
                  <div className="flex flex-col items-center gap-3">
                    <Loader2 className="w-8 h-8 text-gold animate-spin" />
                    <span className="text-sm text-txt-muted font-mono">
                      加载中...
                    </span>
                  </div>
                </div>
              )}

              {/* Iframe */}
              {project.iframeSrc && (
                <iframe
                  src={project.iframeSrc}
                  title={project.title}
                  className="w-full h-full border-0"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-downloads"
                  onLoad={() => setLoading(false)}
                  loading="lazy"
                />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
