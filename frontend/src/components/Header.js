import { useState, useEffect } from "react";
import DesktopHeader from "./header/DesktopHeader";
import MobileHeader from "./header/MobileHeader";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-200 fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "shadow-2xl backdrop-blur-md bg-opacity-95 py-3" : "shadow-lg py-4"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between">
        <div className="hidden lg:contents">
          <DesktopHeader scrolled={scrolled} />
        </div>

        <div className="lg:hidden contents">
          <MobileHeader scrolled={scrolled} />
        </div>
      </div>
    </header>
  );
};

export default Header;
