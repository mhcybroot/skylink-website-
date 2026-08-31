import { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import LoadingScreen from './components/UI/LoadingScreen';
import ScrollProgress from './components/UI/ScrollProgress';
import BackToTop from './components/UI/BackToTop';
import CursorSpotlight from './components/UI/CursorSpotlight';
import RedirectManager from './components/UI/RedirectManager';

// Route Code Splitting (Lazy-loaded chunks)
const Home = lazy(() => import('./pages/Home'));
const PropertyServices = lazy(() => import('./pages/PropertyServices'));
const ITESServices = lazy(() => import('./pages/ITESServices'));
const About = lazy(() => import('./pages/About'));
const Culture = lazy(() => import('./pages/Culture'));
const Careers = lazy(() => import('./pages/Careers'));
const Contact = lazy(() => import('./pages/Contact'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));
const NotFound = lazy(() => import('./pages/NotFound'));

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

      {/* URL Normalizer & Typo Redirect Manager */}
      <RedirectManager />

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
                  {/* Primary Verified Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/services/:serviceSlug" element={<ServiceDetail />} />
                  <Route path="/property" element={<PropertyServices />} />
                  <Route path="/ites" element={<ITESServices />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/culture" element={<Culture />} />
                  <Route path="/gallery" element={<Culture />} />
                  <Route path="/careers" element={<Careers />} />
                  <Route path="/contact" element={<Contact />} />

                  {/* Explicit Typo & Alias Redirections */}
                  <Route path="/about-us" element={<Navigate to="/about" replace />} />
                  <Route path="/company" element={<Navigate to="/about" replace />} />
                  <Route path="/who-we-are" element={<Navigate to="/about" replace />} />
                  <Route path="/life-at-skylink" element={<Navigate to="/culture" replace />} />
                  <Route path="/our-culture" element={<Navigate to="/culture" replace />} />
                  <Route path="/photos" element={<Navigate to="/culture" replace />} />
                  
                  <Route path="/contact-us" element={<Navigate to="/contact" replace />} />
                  <Route path="/get-in-touch" element={<Navigate to="/contact" replace />} />
                  <Route path="/reach-us" element={<Navigate to="/contact" replace />} />
                  
                  <Route path="/career" element={<Navigate to="/careers" replace />} />
                  <Route path="/jobs" element={<Navigate to="/careers" replace />} />
                  <Route path="/job" element={<Navigate to="/careers" replace />} />
                  <Route path="/join-us" element={<Navigate to="/careers" replace />} />
                  <Route path="/hiring" element={<Navigate to="/careers" replace />} />
                  
                  <Route path="/property-preservation" element={<Navigate to="/property" replace />} />
                  <Route path="/preservation" element={<Navigate to="/property" replace />} />
                  <Route path="/reo" element={<Navigate to="/property" replace />} />
                  <Route path="/us-property" element={<Navigate to="/property" replace />} />
                  
                  <Route path="/bpo" element={<Navigate to="/ites" replace />} />
                  <Route path="/bpo-services" element={<Navigate to="/ites" replace />} />
                  <Route path="/ites-services" element={<Navigate to="/ites" replace />} />
                  <Route path="/ites-bpo" element={<Navigate to="/ites" replace />} />
                  
                  <Route path="/services" element={<Navigate to="/#services" replace />} />
                  <Route path="/service" element={<Navigate to="/#services" replace />} />

                  {/* 404 Cyber Fallback Catch-All */}
                  <Route path="*" element={<NotFound />} />
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
