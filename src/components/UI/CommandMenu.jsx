import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, Home, Info, Briefcase, Phone, Terminal, Server, Shield, X, ArrowRight } from 'lucide-react';

const commands = [
    { id: 'home', label: 'Home Node', icon: Home, path: '/', category: 'Navigation' },
    { id: 'about', label: 'Global Footprint (About)', icon: Info, path: '/about', category: 'Navigation' },
    { id: 'property', label: 'Property Preservation', icon: Briefcase, path: '/services/property-preservation', category: 'Services' },
    { id: 'ites', label: 'IT & Engineering (ITES)', icon: Server, path: '/services/ites', category: 'Services' },
    { id: 'careers', label: 'Careers Roster', icon: Terminal, path: '/careers', category: 'Navigation' },
    { id: 'contact', label: 'Secure Transmission (Contact)', icon: Phone, path: '/contact', category: 'Navigation' },
];

export default function CommandMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef(null);
    const navigate = useNavigate();

    // Toggle on Ctrl+K or Cmd+K
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen((prev) => !prev);
            }
            if (e.key === 'Escape') {
                setIsOpen(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Focus input when opened
    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => inputRef.current.focus(), 100);
            setQuery('');
            setSelectedIndex(0);
        }
    }, [isOpen]);

    const filteredCommands = query === '' 
        ? commands 
        : commands.filter(c => c.label.toLowerCase().includes(query.toLowerCase()) || c.category.toLowerCase().includes(query.toLowerCase()));

    // Keyboard navigation
    useEffect(() => {
        const handleNavigation = (e) => {
            if (!isOpen) return;

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedIndex((prev) => (prev + 1) % Math.max(filteredCommands.length, 1));
            }
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % Math.max(filteredCommands.length, 1));
            }
            if (e.key === 'Enter' && filteredCommands.length > 0) {
                e.preventDefault();
                executeCommand(filteredCommands[selectedIndex]);
            }
        };

        window.addEventListener('keydown', handleNavigation);
        return () => window.removeEventListener('keydown', handleNavigation);
    }, [isOpen, selectedIndex, filteredCommands]);

    const executeCommand = (command) => {
        if (command.path) {
            navigate(command.path);
        }
        setIsOpen(false);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[10000] flex items-start justify-center pt-[15vh]">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
                    />

                    {/* Command Palette */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="relative w-full max-w-2xl bg-slate-900 border border-tech-cyan/30 rounded-2xl shadow-[0_0_50px_rgba(6,182,212,0.15)] overflow-hidden flex flex-col"
                    >
                        {/* Search Input Header */}
                        <div className="flex items-center px-4 py-4 border-b border-white/10 relative">
                            <Search className="text-tech-cyan mr-3" size={20} />
                            <input
                                ref={inputRef}
                                type="text"
                                placeholder="Search nodes or commands..."
                                className="flex-1 bg-transparent text-white font-mono placeholder:text-slate-500 focus:outline-none"
                                value={query}
                                onChange={(e) => {
                                    setQuery(e.target.value);
                                    setSelectedIndex(0);
                                }}
                            />
                            <div className="absolute right-4 text-[10px] text-slate-500 font-mono tracking-widest uppercase flex gap-2">
                                <span className="bg-white/5 px-2 py-1 rounded border border-white/10">ESC to close</span>
                            </div>
                        </div>

                        {/* Command List */}
                        <div className="max-h-[60vh] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-tech-cyan/20">
                            {filteredCommands.length === 0 ? (
                                <div className="text-center py-10 text-slate-500 font-mono text-sm">
                                    No direct match found.
                                </div>
                            ) : (
                                Object.entries(
                                    filteredCommands.reduce((acc, cmd) => {
                                        if (!acc[cmd.category]) acc[cmd.category] = [];
                                        acc[cmd.category].push(cmd);
                                        return acc;
                                    }, {})
                                ).map(([category, items], categoryIndex) => (
                                    <div key={category} className="mb-4 last:mb-0">
                                        <div className="px-3 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                                            {category}
                                        </div>
                                        {items.map((cmd) => {
                                            const isSelected = filteredCommands[selectedIndex]?.id === cmd.id;
                                            const Icon = cmd.icon;
                                            
                                            return (
                                                <div
                                                    key={cmd.id}
                                                    onMouseEnter={() => setSelectedIndex(filteredCommands.findIndex(c => c.id === cmd.id))}
                                                    onClick={() => executeCommand(cmd)}
                                                    className={`group flex items-center justify-between px-3 py-3 mx-1 my-1 rounded-xl cursor-pointer transition-colors ${
                                                        isSelected ? 'bg-tech-cyan/10 border border-tech-cyan/30' : 'hover:bg-white/5 border border-transparent'
                                                    }`}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className={`p-2 rounded-lg ${isSelected ? 'bg-tech-cyan/20 text-tech-cyan' : 'bg-slate-800 text-slate-400'}`}>
                                                            <Icon size={16} />
                                                        </div>
                                                        <span className={`font-mono text-sm ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                                                            {cmd.label}
                                                        </span>
                                                    </div>
                                                    
                                                    {isSelected && (
                                                        <ArrowRight size={14} className="text-tech-cyan" />
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                ))
                            )}
                        </div>
                        
                        {/* Footer details */}
                        <div className="bg-slate-950 px-4 py-3 border-t border-white/5 flex justify-between items-center text-[10px] text-slate-500 font-mono">
                            <div className="flex gap-4">
                                <span className="flex items-center gap-1"><kbd className="bg-white/5 px-1 rounded">↑↓</kbd> to navigate</span>
                                <span className="flex items-center gap-1"><kbd className="bg-white/5 px-1 rounded">↵</kbd> to select</span>
                            </div>
                            <span className="text-tech-cyan/50 tracking-widest uppercase">Skylink SYS_CMD</span>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
