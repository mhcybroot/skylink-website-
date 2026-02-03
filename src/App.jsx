import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import PropertyServices from './pages/PropertyServices';
import ITESServices from './pages/ITESServices';
import About from './pages/About';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import LoadingScreen from './components/UI/LoadingScreen';
import FloatingCTA from './components/UI/FloatingCTA';
import ScrollProgress from './components/UI/ScrollProgress';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Simulate initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Loading Screen */}
      <LoadingScreen isLoading={isLoading} minDuration={1800} />

      {/* Scroll Progress Indicator */}
      <ScrollProgress />

      <div className="min-h-screen flex flex-col font-sans text-slate-900">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/property" element={<PropertyServices />} />
            <Route path="/ites" element={<ITESServices />} />
            <Route path="/about" element={<About />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />

        {/* Floating CTA Button */}
        <FloatingCTA />
      </div>
    </>
  );
}

export default App;

