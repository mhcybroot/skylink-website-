import globeImg from '../../assets/cyber-global-globe.jpg';
import synapseImg from '../../assets/cyber-neural-synapse.jpg';
import circuitImg from '../../assets/cyber-circuit-security.jpg';
import hexImg from '../../assets/cyber-hex-matrix.jpg';
import highwayImg from '../../assets/cyber-data-highway.jpg';
import wavesImg from '../../assets/cyber-fluid-waves.jpg';

const variantImages = {
    globe: globeImg,
    synapse: synapseImg,
    circuit: circuitImg,
    hex: hexImg,
    highway: highwayImg,
    waves: wavesImg
};

/**
 * CyberBackground Component
 * Renders rich, high-definition cybernetic patterns with ambient cyan/teal lighting.
 * 
 * @param {'globe'|'synapse'|'circuit'|'hex'|'highway'|'waves'} variant Pattern variant
 * @param {'top'|'center'|'bottom'|'both'} glowPosition Spotlight placement
 * @param {string} meshOpacity Tailwind opacity class (e.g. 'opacity-25')
 * @param {string} className Additional classes
 */
const CyberBackground = ({
    variant = 'synapse',
    showMesh = true,
    meshOpacity = 'opacity-25',
    glowPosition = 'top',
    className = ''
}) => {
    const selectedImg = variantImages[variant] || synapseImg;

    return (
        <div className={`absolute inset-0 pointer-events-none overflow-hidden select-none -z-0 ${className}`}>
            {/* 1. Cybernetic Artwork Layer with Vignette Blending */}
            {showMesh && (
                <div className={`absolute inset-0 ${meshOpacity} mix-blend-screen overflow-hidden pointer-events-none`}>
                    <img
                        src={selectedImg}
                        alt=""
                        aria-hidden="true"
                        className="w-full h-full object-cover object-center scale-105"
                    />
                    {/* Dark gradient masks for WCAG text legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/85" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-transparent to-black/85" />
                </div>
            )}

            {/* 2. Layered Ambient Cyan & Teal Spotlights */}
            {(glowPosition === 'top' || glowPosition === 'both') && (
                <>
                    <div className="absolute -top-28 left-1/2 -translate-x-1/2 w-[600px] md:w-[950px] h-[380px] md:h-[500px] bg-gradient-to-b from-[#00E5BE]/20 via-[#00E5BE]/5 to-transparent rounded-full blur-[140px] pointer-events-none" />
                    <div className="absolute top-12 left-1/3 w-[350px] h-[350px] bg-[#00F5C4]/15 rounded-full blur-[100px] pointer-events-none" />
                </>
            )}

            {glowPosition === 'center' && (
                <>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] md:w-[1000px] h-[450px] md:h-[600px] bg-gradient-to-b from-[#00E5BE]/18 via-[#2DD4BF]/5 to-transparent rounded-full blur-[160px] pointer-events-none" />
                    <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-[#38BDF8]/15 rounded-full blur-[120px] pointer-events-none" />
                </>
            )}

            {(glowPosition === 'bottom' || glowPosition === 'both') && (
                <>
                    <div className="absolute -bottom-28 left-1/2 -translate-x-1/2 w-[600px] md:w-[950px] h-[380px] md:h-[500px] bg-gradient-to-t from-[#00E5BE]/18 via-[#00E5BE]/5 to-transparent rounded-full blur-[140px] pointer-events-none" />
                    <div className="absolute bottom-12 right-1/4 w-[380px] h-[380px] bg-[#38BDF8]/15 rounded-full blur-[110px] pointer-events-none" />
                </>
            )}

            {/* 3. High-Tech Cyber Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-80" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#00e5be05_1px,transparent_1px),linear-gradient(to_bottom,#00e5be05_1px,transparent_1px)] bg-[size:96px_96px] pointer-events-none" />
        </div>
    );
};

export default CyberBackground;
