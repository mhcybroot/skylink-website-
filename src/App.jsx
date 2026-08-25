import { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import LoadingScreen from './components/UI/LoadingScreen';
import ScrollProgress from './components/UI/ScrollProgress';
import BackToTop from './components/UI/BackToTop';
import CursorSpotlight from './components/UI/CursorSpotlight';

// Route Code Splitting (Lazy-loaded chunks)
const Home = lazy(() => import('./pages/Home'));
const PropertyServices = lazy(() => import('./pages/PropertyServices'));
const ITESServices = lazy(() => import('./pages/ITESServices'));
const About = lazy(() => import('./pages/About'));
const Careers = lazy(() => import('./pages/Careers'));
const Contact = lazy(() => import('./pages/Contact'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));

// Smooth Page transition variants
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.2,
      ease: [0.25, 0.1, 0.25, 1],
    }
  },
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  // Initial load simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Loading Screen */}
      <LoadingScreen isLoading={isLoading} minDuration={1200} />

      {/* Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Interactive Mouse-Tracked Cyber Cursor Spotlight */}
      <CursorSpotlight />

      <div className="min-h-screen flex flex-col font-sans text-slate-200 bg-black relative selection:bg-[#00E5BE] selection:text-black">
        <Navbar />
        
        <main className="flex-grow relative z-10">
          <Suspense fallback={
            <div className="min-h-[70vh] flex items-center justify-center">
              <div className="w-8 h-8 rounded-full border-2 border-[#00E5BE]/20 border-t-[#00E5BE] animate-spin" />
            </div>
          }>
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <Routes location={location}>
                  <Route path="/" element={<Home />} />
                  <Route path="/services/:serviceSlug" element={<ServiceDetail />} />
                  <Route path="/services" element={<Navigate to="/#services" replace />} />
                  <Route path="/property" element={<PropertyServices />} />
                  <Route path="/ites" element={<ITESServices />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/careers" element={<Careers />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </motion.div>
            </AnimatePresence>
          </Suspense>
        </main>

        <Footer />

        {/* Back to Top Button with Progress */}
        <BackToTop showAfter={400} showProgress={true} />
      </div>
    </>
  );
}

export default App;
