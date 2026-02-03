import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download } from 'lucide-react';

// ============================================
// LIGHTBOX GALLERY
// Fullscreen image gallery with zoom and gestures
// ============================================

const LightboxGallery = ({
    images = [], // Array of { src, alt, caption }
    isOpen,
    onClose,
    initialIndex = 0,
}) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [isZoomed, setIsZoomed] = useState(false);
    const [touchStart, setTouchStart] = useState(null);

    useEffect(() => {
        setCurrentIndex(initialIndex);
    }, [initialIndex, isOpen]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleKeyDown = useCallback((e) => {
        if (!isOpen) return;

        switch (e.key) {
            case 'Escape':
                onClose();
                break;
            case 'ArrowLeft':
                goToPrevious();
                break;
            case 'ArrowRight':
                goToNext();
                break;
            default:
                break;
        }
    }, [isOpen, onClose]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
        setIsZoomed(false);
    };

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
        setIsZoomed(false);
    };

    const handleTouchStart = (e) => {
        setTouchStart(e.touches[0].clientX);
    };

    const handleTouchEnd = (e) => {
        if (!touchStart) return;

        const touchEnd = e.changedTouches[0].clientX;
        const diff = touchStart - touchEnd;

        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                goToNext();
            } else {
                goToPrevious();
            }
        }
        setTouchStart(null);
    };

    if (!isOpen || images.length === 0) return null;

    const currentImage = images[currentIndex];

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm"
                onClick={onClose}
            >
                {/* Close button */}
                <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    onClick={onClose}
                    className="absolute top-4 right-4 z-50 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
                >
                    <X size={24} />
                </motion.button>

                {/* Control buttons */}
                <div className="absolute top-4 left-4 z-50 flex gap-2">
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsZoomed(!isZoomed);
                        }}
                        className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
                    >
                        {isZoomed ? <ZoomOut size={20} /> : <ZoomIn size={20} />}
                    </motion.button>
                </div>

                {/* Navigation arrows */}
                {images.length > 1 && (
                    <>
                        <motion.button
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            onClick={(e) => {
                                e.stopPropagation();
                                goToPrevious();
                            }}
                            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
                        >
                            <ChevronLeft size={28} />
                        </motion.button>
                        <motion.button
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            onClick={(e) => {
                                e.stopPropagation();
                                goToNext();
                            }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
                        >
                            <ChevronRight size={28} />
                        </motion.button>
                    </>
                )}

                {/* Image container */}
                <div
                    className="absolute inset-0 flex items-center justify-center p-4 md:p-16"
                    onClick={(e) => e.stopPropagation()}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className="relative max-w-full max-h-full"
                        >
                            <motion.img
                                src={currentImage.src}
                                alt={currentImage.alt || ''}
                                className={`max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl transition-transform duration-300 ${isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'
                                    }`}
                                onClick={() => setIsZoomed(!isZoomed)}
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Caption and counter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6"
                >
                    <div className="max-w-4xl mx-auto text-center">
                        {currentImage.caption && (
                            <p className="text-white text-lg mb-2">{currentImage.caption}</p>
                        )}
                        <p className="text-white/60 text-sm">
                            {currentIndex + 1} / {images.length}
                        </p>
                    </div>
                </motion.div>

                {/* Thumbnail strip */}
                {images.length > 1 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 p-2 bg-black/50 rounded-lg backdrop-blur-sm"
                    >
                        {images.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setCurrentIndex(idx);
                                    setIsZoomed(false);
                                }}
                                className={`w-16 h-12 rounded overflow-hidden transition-all ${idx === currentIndex
                                        ? 'ring-2 ring-white scale-110'
                                        : 'opacity-50 hover:opacity-100'
                                    }`}
                            >
                                <img
                                    src={img.src}
                                    alt=""
                                    className="w-full h-full object-cover"
                                />
                            </button>
                        ))}
                    </motion.div>
                )}
            </motion.div>
        </AnimatePresence>
    );
};

// ============================================
// IMAGE GALLERY GRID
// Responsive grid with lightbox integration
// ============================================

export const ImageGalleryGrid = ({
    images = [],
    columns = 3,
    className = '',
}) => {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const openLightbox = (index) => {
        setSelectedIndex(index);
        setLightboxOpen(true);
    };

    const gridCols = {
        1: 'grid-cols-1',
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
    };

    return (
        <>
            <div className={`grid ${gridCols[columns] || gridCols[3]} gap-4 ${className}`}>
                {images.map((image, index) => (
                    <motion.button
                        key={index}
                        onClick={() => openLightbox(index)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="relative aspect-video overflow-hidden rounded-xl group cursor-pointer"
                    >
                        <img
                            src={image.src}
                            alt={image.alt || ''}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute bottom-4 left-4 right-4">
                                <p className="text-white font-medium text-sm truncate">
                                    {image.caption || image.alt}
                                </p>
                            </div>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                <ZoomIn className="text-white" size={24} />
                            </div>
                        </div>
                    </motion.button>
                ))}
            </div>

            <LightboxGallery
                images={images}
                isOpen={lightboxOpen}
                onClose={() => setLightboxOpen(false)}
                initialIndex={selectedIndex}
            />
        </>
    );
};

export default LightboxGallery;
