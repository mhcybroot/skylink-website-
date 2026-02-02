const Button = ({ children, variant = 'primary', className = '', ...props }) => {
    const baseStyles = "inline-flex items-center justify-center px-6 py-3 border text-base font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300";

    const variants = {
        primary: "border-transparent text-white bg-skylink-blue hover:bg-blue-800 focus:ring-skylink-blue",
        secondary: "border-transparent text-white bg-slate-600 hover:bg-slate-700 focus:ring-slate-500",
        outline: "border-skylink-blue text-skylink-blue bg-transparent hover:bg-blue-50 focus:ring-skylink-blue",
        tech: "border-transparent text-slate-900 bg-tech-cyan hover:bg-cyan-400 focus:ring-tech-cyan text-white",
        property: "border-transparent text-white bg-skylink-blue hover:bg-blue-800 focus:ring-skylink-blue",
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant] || variants.primary} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
