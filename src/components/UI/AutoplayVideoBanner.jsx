import { useState } from 'react';
import { Maximize2, Sparkles, Play, CheckCircle2 } from 'lucide-react';
import VideoModal from './VideoModal';

/**
 * AutoplayVideoBanner Component
 * Shows both the high-res photo and the natural 16:9 YouTube video side by side.
 */
const AutoplayVideoBanner = ({
    videoId,
    posterImg,
    tag = 'FEATURE SHOWCASE',
    tagIcon: TagIcon = Sparkles,
    title,
    subtitle,
    highlights = []
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
            <div className="mb-28 p-6 md:p-8 rounded-3xl border border-white/15 bg-zinc-950/80 shadow-2xl relative overflow-hidden backdrop-blur-xl">
                {/* Ambient Glow */}
                <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#00E5BE]/10 rounded-full blur-[140px] pointer-events-none -z-0" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                    {/* Left Column: High-Resolution Photo & Strategic Info */}
                    <div className="lg:col-span-5 flex flex-col justify-between h-full">
                        <div>
                            {/* Live Badge */}
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-[#00E5BE]/30 text-[#00E5BE] text-xs font-mono font-bold mb-5 shadow-sm">
                                <TagIcon size={13} className="text-[#00E5BE] animate-pulse" />
                                <span>{tag}</span>
                            </div>

                            {title && (
                                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3 leading-snug">
                                    {title}
                                </h3>
                            )}

                            {subtitle && (
                                <p className="text-sm text-slate-300 leading-relaxed mb-6 font-normal">
                                    {subtitle}
                                </p>
                            )}
                        </div>

                        {/* Photo Card Container */}
                        {posterImg && (
                            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-lg relative group/photo aspect-[16/10] w-full bg-black">
                                <img
                                    src={posterImg}
                                    alt={title || tag}
                                    className="w-full h-full object-cover object-center group-hover/photo:scale-105 transition-transform duration-500 brightness-95"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-slate-300">
                                    <span className="text-[#00E5BE] font-bold">VERIFIED VISUAL</span>
                                    <span>Skylink Institutional Asset</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Natural 16:9 YouTube Video Player */}
                    <div className="lg:col-span-7 flex flex-col">
                        <div className="relative w-full aspect-video rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 bg-black shadow-2xl group/video">
                            {cleanId ? (
                                <iframe
                                    src={`https://www.youtube-nocookie.com/embed/${cleanId}?autoplay=1&mute=1&loop=1&playlist=${cleanId}&controls=1&modestbranding=1&playsinline=1&rel=0`}
                                    title={title || tag}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="w-full h-full border-0"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-500 text-sm">
                                    Video source unavailable
                                </div>
                            )}

                            {/* Corner Fullscreen Action */}
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-xl bg-black/80 hover:bg-[#00E5BE] hover:text-black text-white text-xs font-semibold backdrop-blur-md border border-white/20 hover:border-[#00E5BE] transition-all flex items-center gap-1.5 shadow-lg group/btn"
                                aria-label="Expand Video"
                            >
                                <Maximize2 size={13} className="group-hover/btn:scale-110 transition-transform" />
                                <span>Fullscreen View</span>
                            </button>
                        </div>

                        {/* Player Metadata Bar */}
                        <div className="mt-3 px-2 flex items-center justify-between text-xs font-mono text-slate-400">
                            <span className="flex items-center gap-2 text-[#00E5BE]">
                                <span className="w-2 h-2 rounded-full bg-[#00E5BE] animate-ping" />
                                16:9 HD STREAMING PLAYBACK
                            </span>
                            <span>YouTube Embed Player</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Fullscreen Video Modal */}
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
