import { useState } from "react";
import Logo from "./common/Logo";
import MobileMenuButton from "./common/MobileMenuButton";
import NavigationLinks from "./common/NavigationLinks";
import AuthButtons from "./common/AuthButtons";
import LanguageButtons from "./common/LanguageButtons";

const MobileHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <Logo />
      <MobileMenuButton isOpen={isMenuOpen} onClick={() => setIsMenuOpen(!isMenuOpen)} />

      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 lg:hidden">
          <div 
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="bg-gray-900/95 backdrop-blur-lg border-t border-gray-700 py-6 px-4 space-y-4">
              <NavigationLinks variant="mobile" onLinkClick={() => setIsMenuOpen(false)} />
              <AuthButtons variant="mobile" />
              <LanguageButtons />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileHeader;
