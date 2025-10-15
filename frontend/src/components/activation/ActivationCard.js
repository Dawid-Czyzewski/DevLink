const ActivationCard = ({ children }) => {
    return (
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 text-center border border-white/20 shadow-2xl transform transition-all duration-500 hover:scale-105 hover:shadow-3xl">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl"></div>
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
};

export default ActivationCard;
