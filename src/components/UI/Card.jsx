const Card = ({ title, description, icon: Icon, className = '' }) => {
    return (
        <div className={`bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 ${className}`}>
            {Icon && (
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-50 text-skylink-blue mb-4">
                    <Icon size={24} />
                </div>
            )}
            <h3 className="text-lg font-medium text-slate-900 mb-2">{title}</h3>
            <p className="text-slate-600">{description}</p>
        </div>
    );
};

export default Card;
