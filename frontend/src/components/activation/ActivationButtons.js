const ActivationButtons = ({ type, onPrimaryClick, onSecondaryClick, primaryText, secondaryText }) => {
    const getButtonConfig = () => {
        switch (type) {
            case 'success':
                return {
                    primary: {
                        className: "group relative w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold py-4 px-8 rounded-2xl hover:from-emerald-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg cursor-pointer",
                        text: primaryText || "Go to Login"
                    },
                    secondary: {
                        className: "group relative w-full bg-white/10 backdrop-blur-sm text-white font-semibold py-4 px-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-xl cursor-pointer",
                        text: secondaryText || "Back to Home"
                    }
                };
            case 'error':
                return {
                    primary: {
                        className: "group relative w-full bg-gradient-to-r from-rose-500 to-red-600 text-white font-bold py-4 px-8 rounded-2xl hover:from-rose-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg cursor-pointer",
                        text: primaryText || "Try Again"
                    },
                    secondary: {
                        className: "group relative w-full bg-white/10 backdrop-blur-sm text-white font-semibold py-4 px-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-xl cursor-pointer",
                        text: secondaryText || "Back to Home"
                    }
                };
            default:
                return {
                    primary: {
                        className: "group relative w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold py-4 px-8 rounded-2xl hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg cursor-pointer",
                        text: primaryText || "Continue"
                    },
                    secondary: {
                        className: "group relative w-full bg-white/10 backdrop-blur-sm text-white font-semibold py-4 px-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-xl cursor-pointer",
                        text: secondaryText || "Cancel"
                    }
                };
        }
    };

    const config = getButtonConfig();

    return (
        <div className="space-y-4">
            {onPrimaryClick && (
                <button
                    onClick={onPrimaryClick}
                    className={config.primary.className}
                >
                    <span className="relative z-10 flex items-center justify-center">
                        {config.primary.text}
                        <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
            )}
            {onSecondaryClick && (
                <button
                    onClick={onSecondaryClick}
                    className={config.secondary.className}
                >
                    <span className="relative z-10 flex items-center justify-center">
                        {config.secondary.text}
                        <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                    </span>
                </button>
            )}
        </div>
    );
};

export default ActivationButtons;
