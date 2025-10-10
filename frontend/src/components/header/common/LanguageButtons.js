import { useLanguage } from "../../../contexts/LanguageContext";

const LanguageButtons = () => {
  const { language, changeLanguage, languages } = useLanguage();

  return (
    <div className="flex justify-center gap-2 pt-3 border-t border-gray-700">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => changeLanguage(lang.code)}
          className={`flex items-center space-x-1.5 px-3 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 cursor-pointer relative ${
            language === lang.code 
              ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 shadow-lg shadow-yellow-400/50" 
              : "bg-gray-700 text-gray-200 hover:bg-gray-600"
          }`}
        >
          <span className="text-base">{lang.flag}</span>
          <span className="text-xs font-semibold">{lang.label}</span>
          {language === lang.code && (
            <svg 
              className="w-3 h-3 absolute -top-0.5 -right-0.5 text-gray-900 bg-yellow-400 rounded-full p-0.5" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path 
                fillRule="evenodd" 
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                clipRule="evenodd" 
              />
            </svg>
          )}
        </button>
      ))}
    </div>
  );
};

export default LanguageButtons;
