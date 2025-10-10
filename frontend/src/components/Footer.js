import DesktopFooter from "./footer/DesktopFooter";
import MobileFooter from "./footer/MobileFooter";

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-b from-gray-900 to-black text-gray-200 border-t border-gray-800">
      <div className="hidden lg:block">
        <DesktopFooter />
      </div>

      <div className="lg:hidden">
        <MobileFooter />
      </div>
    </footer>
  );
};

export default Footer;
