import { useState, useEffect } from "react";
import { useLanguage } from "../../../contexts/LanguageContext";

const LanguageDropdown = () => {
  const { language, changeLanguage, languages } = useLanguage();
  const [isLangOpen, setIsLangOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isLangOpen && !event.target.closest('.language-selector')) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isLangOpen]);

  return (
    <div className="relative ml-2 language-selector">
      <button 
        onClick={() => setIsLangOpen(!isLangOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-full hover:bg-gray-700 hover:border-yellow-400 hover:scale-105 transition-all duration-300 text-sm font-medium cursor-pointer"
      >
        <span className="text-xl">{languages.find((lang) => lang.code === language)?.flag}</span>
        <span className="text-gray-200">{language.toUpperCase()}</span>
        <svg 
          className={`w-4 h-4 transition-transform duration-300 ${isLangOpen ? "rotate-180" : ""}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isLangOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl shadow-2xl overflow-hidden animate-fadeIn z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`flex items-center justify-between w-full text-left px-4 py-3 transition-all duration-200 cursor-pointer group ${
                language === lang.code 
                  ? "bg-yellow-400/20 text-yellow-400" 
                  : "text-gray-200 hover:bg-gray-700 hover:text-yellow-400"
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl transform group-hover:scale-110 transition-transform duration-200">{lang.flag}</span>
                <span className="font-medium text-sm">{lang.label}</span>
              </div>
              {language === lang.code && (
                <svg 
                  className="w-5 h-5 text-yellow-400 animate-fadeIn" 
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
      )}
    </div>
  );
};

export default LanguageDropdown;
