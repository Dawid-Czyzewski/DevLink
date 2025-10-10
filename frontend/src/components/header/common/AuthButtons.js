import { useTranslation } from "react-i18next";

const AuthButtons = ({ variant = "desktop" }) => {
  const { t } = useTranslation();

  if (variant === "mobile") {
    return (
      <div className="pt-4 space-y-3">
        <button className="w-full px-5 py-3 text-sm font-semibold text-yellow-400 border-2 border-yellow-400 rounded-full hover:bg-yellow-400 hover:text-gray-900 transition-all duration-300 cursor-pointer">
          {t("header.login")}
        </button>
        <button className="w-full px-5 py-3 text-sm font-semibold text-gray-900 bg-yellow-400 rounded-full hover:bg-yellow-500 transition-all duration-300 cursor-pointer">
          {t("header.register")}
        </button>
      </div>
    );
  }

  return (
    <>
      <button className="px-5 py-2 text-sm font-semibold text-yellow-400 border-2 border-yellow-400 rounded-full hover:bg-yellow-400 hover:text-gray-900 hover:shadow-lg hover:shadow-yellow-400/50 transition-all duration-300 transform hover:scale-105 cursor-pointer">
        {t("header.login")}
      </button>
      <button className="px-5 py-2 text-sm font-semibold text-gray-900 bg-yellow-400 rounded-full hover:bg-yellow-500 hover:shadow-lg hover:shadow-yellow-500/50 transition-all duration-300 transform hover:scale-105 cursor-pointer">
        {t("header.register")}
      </button>
    </>
  );
};

export default AuthButtons;
