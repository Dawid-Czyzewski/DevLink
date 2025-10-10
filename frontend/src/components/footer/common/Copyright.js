import { useTranslation } from "react-i18next";

const Copyright = ({ variant = "desktop" }) => {
  const { t } = useTranslation();

  if (variant === "mobile") {
    return (
      <div className="text-center space-y-1">
        <p className="text-gray-400 text-xs">
          {t("footer.copyright")}
        </p>
        <p className="text-gray-500 text-xs">
          {t("footer.madeWith")}
        </p>
      </div>
    );
  }

  return (
    <div className="text-right space-y-1">
      <p className="text-gray-400 text-xs">
        {t("footer.copyright")}
      </p>
      <p className="text-gray-500 text-xs">
        {t("footer.madeWith")}
      </p>
    </div>
  );
};

export default Copyright;
