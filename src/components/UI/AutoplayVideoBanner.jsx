import { useState } from 'react';
import { Maximize2, Sparkles, Image as ImageIcon, Video as VideoIcon } from 'lucide-react';
import VideoModal from './VideoModal';

/**
 * AutoplayVideoBanner Component
 * Renders a perfectly aligned 2-column media showcase:
 * - Section header spanning full width on top
 * - Pixel-perfect matching 16:9 Photo & 16:9 Video side by side
 */
const AutoplayVideoBanner = ({
    videoId,
    posterImg,
    tag = 'FEATURE SHOWCASE',
    tagIcon: TagIcon = Sparkles,
    title,
    subtitle
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
            <div className="mb-28 p-6 md:p-10 rounded-3xl border border-white/15 bg-zinc-950/80 shadow-2xl relative overflow-hidden backdrop-blur-xl">
                {/* Ambient Radial Spotlight */}
                <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[500px] h-[350px] bg-[#00E5BE]/10 rounded-full blur-[160px] pointer-events-none -z-0" />

                <div className="relative z-10">
                    {/* Header Row: Badge, Title & Subtitle */}
                    <div className="max-w-3xl mb-8">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-[#00E5BE]/30 text-[#00E5BE] text-xs font-mono font-bold mb-4 shadow-sm">
                            <TagIcon size={13} className="text-[#00E5BE] animate-pulse" />
                            <span>{tag}</span>
                        </div>

                        {title && (
                            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-2.5 leading-tight">
                                {title}
                            </h3>
                        )}

                        {subtitle && (
                            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                                {subtitle}
                            </p>
                        )}
                    </div>

                    {/* Media Grid: Pixel-Perfect 16:9 Alignment */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                        {/* Column 1: High-Resolution Photo Card (16:9) */}
                        <div className="flex flex-col">
                            <div className="relative w-full aspect-video rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 bg-black shadow-xl group/photo">
                                {posterImg ? (
                                    <>
                                        <img
                                            src={posterImg}
                                            alt={title || tag}
                                            className="w-full h-full object-cover object-center group-hover/photo:scale-105 transition-transform duration-700 brightness-95"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                                        
                                        <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-xl bg-black/70 backdrop-blur-md border border-white/15 text-xs text-white font-mono">
                                            <ImageIcon size={13} className="text-[#00E5BE]" />
                                            <span>Executive Visual</span>
                                        </div>

                                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-slate-300">
                                            <span className="text-[#00E5BE] font-bold">VERIFIED INSTITUTIONAL ASSET</span>
                                            <span>High-Definition Capture</span>
                                        </div>
                                    </>
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-500 text-sm font-mono">
                                        Visual asset loading...
                                    </div>
                                )}
                            </div>

                            <div className="mt-2.5 px-2 flex items-center justify-between text-xs font-mono text-slate-400">
                                <span className="flex items-center gap-1.5 text-slate-300">
                                    <span className="w-2 h-2 rounded-full bg-[#00E5BE]" />
                                    16:9 High-Fidelity Still
                                </span>
                                <span>Official Imagery</span>
                            </div>
                        </div>

                        {/* Column 2: 16:9 Motion Video Player (16:9) */}
                        <div className="flex flex-col">
                            <div className="relative w-full aspect-video rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 bg-black shadow-xl group/video">
                                {cleanId ? (
                                    <div className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center pointer-events-none">
                                        <iframe
                                            src={`https://www.youtube-nocookie.com/embed/${cleanId}?autoplay=1&mute=1&loop=1&playlist=${cleanId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&disablekb=1&fs=0`}
                                            title={title || tag}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            className="w-[145%] h-[145%] max-w-none pointer-events-none object-cover scale-125"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-500 text-sm font-mono">
                                        Video stream unavailable
                                    </div>
                                )}

                                {/* Top Left Video Tag */}
                                <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1 rounded-xl bg-black/70 backdrop-blur-md border border-white/15 text-xs text-white font-mono pointer-events-none">
                                    <VideoIcon size={13} className="text-[#00E5BE] animate-pulse" />
                                    <span>Motion Reel</span>
                                </div>

                                {/* Fullscreen Action Button */}
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-xl bg-black/80 hover:bg-[#00E5BE] hover:text-black text-white text-xs font-semibold backdrop-blur-md border border-white/20 hover:border-[#00E5BE] transition-all flex items-center gap-1.5 shadow-lg group/btn cursor-pointer"
                                    aria-label="Expand Video"
                                >
                                    <Maximize2 size={13} className="group-hover/btn:scale-110 transition-transform" />
                                    <span>Fullscreen View</span>
                                </button>
                            </div>

                            <div className="mt-2.5 px-2 flex items-center justify-between text-xs font-mono text-slate-400">
                                <span className="flex items-center gap-1.5 text-[#00E5BE]">
                                    <span className="w-2 h-2 rounded-full bg-[#00E5BE] animate-ping" />
                                    16:9 Continuous Motion Loop
                                </span>
                                <span>HD Video Playback</span>
                            </div>
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
