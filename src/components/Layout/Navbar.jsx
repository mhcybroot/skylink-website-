import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Phone, Mail } from 'lucide-react';
import logo from '../../assets/logo.webp';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white shadow-md fixed w-full z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center">
                            <img className="h-12 w-auto" src={logo} alt="Skylink Innovations" />
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-gray-700 hover:text-skylink-blue font-medium transition">Home</Link>
                        <Link to="/property" className="text-gray-700 hover:text-skylink-blue font-medium transition">Property Services</Link>
                        <Link to="/ites" className="text-gray-700 hover:text-tech-cyan font-medium transition">ITES & BPO</Link>
                        <Link to="/about" className="text-gray-700 hover:text-skylink-blue font-medium transition">About Us</Link>
                        <Link to="/careers" className="text-gray-700 hover:text-skylink-blue font-medium transition">Careers</Link>
                        <Link to="/contact" className="bg-skylink-blue text-white px-4 py-2 rounded-md hover:bg-blue-800 transition">Contact Us</Link>
                    </div>

                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 hover:text-skylink-blue focus:outline-none">
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white shadow-lg">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link to="/" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-skylink-blue hover:bg-gray-50">Home</Link>
                        <Link to="/property" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-skylink-blue hover:bg-gray-50">Property Services</Link>
                        <Link to="/ites" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-tech-cyan hover:bg-gray-50">ITES & BPO</Link>
                        <Link to="/about" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-skylink-blue hover:bg-gray-50">About Us</Link>
                        <Link to="/careers" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-skylink-blue hover:bg-gray-50">Careers</Link>
                        <Link to="/contact" className="block px-3 py-2 text-base font-medium text-skylink-blue hover:bg-gray-50">Contact Us</Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
