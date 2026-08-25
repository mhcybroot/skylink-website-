import { useState } from 'react';
import { Play, Maximize2, Sparkles } from 'lucide-react';
import VideoModal from './VideoModal';

/**
 * AutoplayVideoBanner Component
 * Autoplays YouTube video inline in a muted continuous loop with no bulky center play button.
 */
const AutoplayVideoBanner = ({
    videoId,
    posterImg,
    tag = 'FEATURE SHOWCASE',
    tagIcon: TagIcon = Sparkles,
    title,
    subtitle,
    heightClass = 'h-72 sm:h-96 md:h-[440px]'
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Clean YouTube ID extraction
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

    return (
        <>
            <div className={`mb-28 rounded-3xl overflow-hidden border border-white/15 bg-zinc-950 relative group shadow-2xl ${heightClass}`}>
                {/* Fallback Poster Image */}
                {posterImg && (
                    <img
                        src={posterImg}
                        alt={title || tag}
                        className="absolute inset-0 w-full h-full object-cover object-center brightness-75 -z-0"
                    />
                )}

                {/* Inline Looping Autoplay YouTube Video */}
                {cleanId && (
                    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden scale-125 md:scale-110">
                        <iframe
                            src={`https://www.youtube-nocookie.com/embed/${cleanId}?autoplay=1&mute=1&loop=1&playlist=${cleanId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&disablekb=1&fs=0`}
                            title={title || tag}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            className="w-full h-full object-cover pointer-events-none opacity-85"
                        />
                    </div>
                )}

                {/* Subtle Cinematic Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/50 pointer-events-none" />

                {/* Top Left Live Tag */}
                <div className="absolute top-6 left-6 z-10 flex items-center gap-2">
                    <div className="px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-[#00E5BE]/40 text-[#00E5BE] text-xs font-mono font-bold flex items-center gap-2 shadow-lg">
                        <TagIcon size={13} className="text-[#00E5BE] animate-pulse" />
                        <span>{tag}</span>
                    </div>
                </div>

                {/* Bottom Bar: Title, Subtitle, and Fullscreen Expand Button */}
                <div className="absolute bottom-6 left-6 right-6 z-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
                    <div>
                        {title && (
                            <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight drop-shadow-md">
                                {title}
                            </h3>
                        )}
                        {subtitle && (
                            <p className="text-xs sm:text-sm text-slate-300 font-mono mt-1 drop-shadow">
                                {subtitle}
                            </p>
                        )}
                    </div>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-4 py-2 rounded-xl bg-white/10 hover:bg-[#00E5BE] hover:text-black text-white text-xs font-semibold backdrop-blur-md border border-white/20 hover:border-[#00E5BE] transition-all flex items-center gap-2 shadow-lg group/btn shrink-0"
                    >
                        <Maximize2 size={13} className="group-hover/btn:scale-110 transition-transform" />
                        <span>Expand with Audio</span>
                    </button>
                </div>
            </div>

            {/* High-Resolution Fullscreen Video Modal */}
            <VideoModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                videoId={cleanId}
                title={title || tag}
            />
        </>
    );
};

export default AutoplayVideoBanner;
