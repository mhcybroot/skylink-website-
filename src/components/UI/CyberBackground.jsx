import heroNetworkImg from '../../assets/hero-network.jpg';

/**
 * CyberBackground Component
 * Renders the signature deep black background with glowing cyan/teal cybernetic 
 * data mesh network, multi-layer radial aura spotlights, and high-tech grid overlay.
 */
const CyberBackground = ({
    showMesh = true,
    meshOpacity = 'opacity-20',
    glowPosition = 'top', // 'top' | 'center' | 'bottom' | 'both'
    className = ''
}) => {
    return (
        <div className={`absolute inset-0 pointer-events-none overflow-hidden select-none -z-0 ${className}`}>
            {/* 1. Cybernetic Data Nodes & Fiber Network Pattern */}
            {showMesh && (
                <div className={`absolute inset-0 ${meshOpacity} mix-blend-screen overflow-hidden pointer-events-none`}>
                    <img
                        src={heroNetworkImg}
                        alt=""
                        aria-hidden="true"
                        className="w-full h-full object-cover object-center scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/90" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80" />
                </div>
            )}

            {/* 2. Layered Ambient Cyan & Teal Spotlights */}
            {(glowPosition === 'top' || glowPosition === 'both') && (
                <>
                    <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] md:w-[900px] h-[380px] md:h-[500px] bg-gradient-to-b from-[#00E5BE]/15 via-[#00E5BE]/5 to-transparent rounded-full blur-[140px] pointer-events-none" />
                    <div className="absolute top-12 left-1/3 w-[350px] h-[350px] bg-[#00F5C4]/10 rounded-full blur-[100px] pointer-events-none" />
                </>
            )}

            {glowPosition === 'center' && (
                <>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] md:w-[1000px] h-[450px] md:h-[600px] bg-gradient-to-b from-[#00E5BE]/15 via-[#2DD4BF]/5 to-transparent rounded-full blur-[160px] pointer-events-none" />
                    <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-[#38BDF8]/10 rounded-full blur-[120px] pointer-events-none" />
                </>
            )}

            {(glowPosition === 'bottom' || glowPosition === 'both') && (
                <>
                    <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[600px] md:w-[900px] h-[380px] md:h-[500px] bg-gradient-to-t from-[#00E5BE]/15 via-[#00E5BE]/5 to-transparent rounded-full blur-[140px] pointer-events-none" />
                    <div className="absolute bottom-12 right-1/4 w-[380px] h-[380px] bg-[#38BDF8]/10 rounded-full blur-[110px] pointer-events-none" />
                </>
            )}

            {/* 3. Subtle Cyber Grid Backdrop */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-80" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#00e5be04_1px,transparent_1px),linear-gradient(to_bottom,#00e5be04_1px,transparent_1px)] bg-[size:96px_96px] pointer-events-none" />
        </div>
    );
};

export default CyberBackground;
