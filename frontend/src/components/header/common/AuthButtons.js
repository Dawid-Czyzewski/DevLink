import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { useToast } from "../../../contexts/ToastContext";

const AuthButtons = ({ variant = "desktop" }) => {
  const { t } = useTranslation();
  const { isAuthenticated, user, logout } = useAuth();
  const { showSuccess } = useToast();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    showSuccess(t("logout.successMessage"));
    navigate('/');
  };

  if (variant === "mobile") {
    if (isAuthenticated && user) {
      return (
        <div className="pt-2 space-y-2">
          <div className="px-4 py-2 text-sm text-gray-300 text-center">
            {t("header.welcome")} {user.nickname}
          </div>
          <Link to="/profile" className="block w-full px-4 py-2.5 text-sm font-semibold text-yellow-400 border-2 border-yellow-400 rounded-full hover:bg-yellow-400 hover:text-gray-900 transition-all duration-300 cursor-pointer text-center">
            {t("header.profile")}
          </Link>
          <button
            onClick={handleLogout}
            className="block w-full px-4 py-2.5 text-sm font-semibold text-gray-900 bg-red-500 rounded-full hover:bg-red-600 transition-all duration-300 cursor-pointer text-center"
          >
            {t("header.logout")}
          </button>
        </div>
      );
    }

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

  if (isAuthenticated && user) {
    return (
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-300">
          {t("header.welcome")} <span className="font-semibold text-yellow-400">{user.nickname}</span>
        </span>
        <Link to="/profile" className="px-5 py-2 text-sm font-semibold text-yellow-400 border-2 border-yellow-400 rounded-full hover:bg-yellow-400 hover:text-gray-900 hover:shadow-lg hover:shadow-yellow-400/50 transition-all duration-300 transform hover:scale-105 cursor-pointer">
          {t("header.profile")}
        </Link>
        <button
          onClick={handleLogout}
          className="px-5 py-2 text-sm font-semibold text-gray-900 bg-red-500 rounded-full hover:bg-red-600 hover:shadow-lg hover:shadow-red-500/50 transition-all duration-300 transform hover:scale-105 cursor-pointer"
        >
          {t("header.logout")}
        </button>
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
