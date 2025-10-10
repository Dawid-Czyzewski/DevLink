import FooterLogo from "./common/FooterLogo";
import FooterLinks from "./common/FooterLinks";
import Copyright from "./common/Copyright";

const MobileFooter = () => {
  return (
    <div className="w-full px-4 py-4">
      <div className="space-y-3">
        <div className="text-center">
          <FooterLogo />
        </div>
        
        <div className="flex justify-center">
          <FooterLinks variant="mobile" />
        </div>
        
        <div className="text-center">
          <Copyright variant="mobile" />
        </div>
      </div>
    </div>
  );
};

export default MobileFooter;
