import { motion } from 'framer-motion';

const ImageMarquee = () => {
    // Dynamically import all JPG photos from the assets folder
    const imagesGlob = import.meta.glob('../../assets/Photos/*.jpg', { eager: true });
    // Extract URLs
    const images = Object.values(imagesGlob).map(module => module.default);
    // Take the first 15 images for the marquee (ensure enough for loop)
    const displayImages = images.slice(0, 15);

    return (
        <section className="py-12 bg-slate-900 overflow-hidden border-y border-slate-800">
            <div className="flex">
                <motion.div
                    className="flex space-x-8 flex-shrink-0"
                    initial={{ x: 0 }}
                    animate={{ x: "-50%" }} // Scroll half way (the length of the original set)
                    transition={{ repeat: Infinity, ease: "linear", duration: 60 }}
                >
                    {/* Render Double Set for Infinite Loop */}
                    {[...displayImages, ...displayImages].map((src, index) => (
                        <div key={index} className="w-96 h-60 flex-shrink-0 rounded-xl overflow-hidden shadow-2xl border border-slate-700/50 relative group">
                            <div className="absolute inset-0 bg-skylink-blue/10 group-hover:bg-transparent transition duration-300"></div>
                            <img src={src} alt={`Project gallery ${index}`} className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700" />
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default ImageMarquee;
