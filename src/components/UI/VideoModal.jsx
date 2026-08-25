import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play } from 'lucide-react';

/**
 * VideoModal Component
 * Reusable modal for embedding responsive 16:9 YouTube videos.
 * 
 * Props:
 * - isOpen: boolean
 * - onClose: function
 * - videoId: string (e.g. "fWEPPlzMV-U" or full YouTube URL)
 * - title: string
 */
const VideoModal = ({ isOpen, onClose, videoId, title = "Skylink Video Showcase" }) => {
    // Extract video ID if full URL passed
    const extractVideoId = (urlOrId) => {
        if (!urlOrId) return '';
        if (urlOrId.includes('youtube.com/watch?v=')) {
            return urlOrId.split('v=')[1]?.split('&')[0];
        }
        if (urlOrId.includes('youtu.be/')) {
            return urlOrId.split('youtu.be/')[1]?.split('?')[0];
        }
        return urlOrId;
    };

    const cleanId = extractVideoId(videoId);

    // Close on Escape key press
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleKeyDown);
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-10">
                    {/* Backdrop Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/90 backdrop-blur-2xl transition-opacity"
                    />

                    {/* Video Player Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="relative z-10 w-full max-w-5xl bg-zinc-950 border border-white/15 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col"
                    >
                        {/* Header Bar */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/60">
                            <div className="flex items-center gap-2 text-sm font-semibold text-white">
                                <div className="w-2 h-2 rounded-full bg-[#00E5BE] animate-pulse" />
                                <span className="truncate">{title}</span>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-slate-300 hover:text-white transition-all active:scale-95"
                                aria-label="Close Video"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        {/* 16:9 Aspect Ratio Responsive Video Frame */}
                        <div className="relative w-full aspect-video bg-black">
                            {cleanId ? (
                                <iframe
                                    src={`https://www.youtube-nocookie.com/embed/${cleanId}?autoplay=1&rel=0&modestbranding=1`}
                                    title={title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="absolute inset-0 w-full h-full border-0"
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-slate-500 text-sm">
                                    Video source unavailable
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default VideoModal;
