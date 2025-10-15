const ActivationIcon = ({ type, size = "w-20 h-20" }) => {
    const getIconConfig = () => {
        switch (type) {
            case 'loading':
                return {
                    className: `relative mx-auto mb-6`,
                    children: (
                        <div className="relative">
                            <div className="w-16 h-16 border-4 border-white/20 rounded-full animate-spin border-t-purple-400"></div>
                            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent rounded-full animate-spin border-t-pink-400 animation-delay-150"></div>
                            <div className="absolute inset-2 w-12 h-12 border-2 border-transparent rounded-full animate-spin border-t-yellow-400 animation-delay-300"></div>
                        </div>
                    )
                };
            case 'success':
                return {
                    className: `relative mx-auto mb-6`,
                    children: (
                        <div className="relative">
                            <div className={`${size} bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-2xl transform transition-all duration-500 hover:scale-110`}>
                                <svg className="w-10 h-10 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        </div>
                    )
                };
            case 'error':
                return {
                    className: `relative mx-auto mb-6`,
                    children: (
                        <div className="relative">
                            <div className={`${size} bg-gradient-to-br from-red-400 to-rose-500 rounded-full flex items-center justify-center mx-auto shadow-2xl transform transition-all duration-500 hover:scale-110`}>
                                <svg className="w-10 h-10 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                        </div>
                    )
                };
            default:
                return {
                    className: `relative mx-auto mb-6`,
                    children: (
                        <div className={`${size} bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center mx-auto shadow-2xl`}>
                            <div className="w-6 h-6 bg-white rounded-full"></div>
                        </div>
                    )
                };
        }
    };

    const config = getIconConfig();

    return (
        <div className={config.className}>
            {config.children}
        </div>
    );
};

export default ActivationIcon;
