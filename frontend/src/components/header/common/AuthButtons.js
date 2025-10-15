import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const AuthButtons = ({ variant = "desktop" }) => {
  const { t } = useTranslation();

  if (variant === "mobile") {
    return (
      <div className="pt-2 space-y-2">
        <Link to="/login" className="block w-full px-4 py-2.5 text-sm font-semibold text-yellow-400 border-2 border-yellow-400 rounded-full hover:bg-yellow-400 hover:text-gray-900 transition-all duration-300 cursor-pointer text-center">
          {t("header.login")}
        </Link>
        <Link to="/register" className="block w-full px-4 py-2.5 text-sm font-semibold text-gray-900 bg-yellow-400 rounded-full hover:bg-yellow-500 transition-all duration-300 cursor-pointer text-center">
          {t("header.register")}
        </Link>
      </div>
    );
  }

  return (
    <>
      <Link to="/login" className="px-5 py-2 text-sm font-semibold text-yellow-400 border-2 border-yellow-400 rounded-full hover:bg-yellow-400 hover:text-gray-900 hover:shadow-lg hover:shadow-yellow-400/50 transition-all duration-300 transform hover:scale-105 cursor-pointer">
        {t("header.login")}
      </Link>
      <Link to="/register" className="px-5 py-2 text-sm font-semibold text-gray-900 bg-yellow-400 rounded-full hover:bg-yellow-500 hover:shadow-lg hover:shadow-yellow-500/50 transition-all duration-300 transform hover:scale-105 cursor-pointer">
        {t("header.register")}
      </Link>
    </>
  );
};

export default AuthButtons;
