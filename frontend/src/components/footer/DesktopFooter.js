import FooterLogo from "./common/FooterLogo";
import FooterLinks from "./common/FooterLinks";
import Copyright from "./common/Copyright";

const DesktopFooter = () => {
  return (
    <div className="w-full px-8 py-6">
      <div className="flex items-center justify-between">
        <div className="flex-shrink-0">
          <FooterLogo />
        </div>
        
        <div className="flex-shrink-0">
          <FooterLinks variant="desktop" />
        </div>
        
        <div className="flex-shrink-0">
          <Copyright variant="desktop" />
        </div>
      </div>
    </div>
  );
};

export default DesktopFooter;
