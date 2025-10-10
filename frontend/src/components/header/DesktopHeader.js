import Logo from "./common/Logo";
import NavigationLinks from "./common/NavigationLinks";
import AuthButtons from "./common/AuthButtons";
import LanguageDropdown from "./common/LanguageDropdown";

const DesktopHeader = () => {
  return (
    <>
      <Logo />
      <NavigationLinks variant="desktop" />
      <div className="hidden lg:flex items-center space-x-3">
        <AuthButtons variant="desktop" />
        <LanguageDropdown />
      </div>
    </>
  );
};

export default DesktopHeader;
