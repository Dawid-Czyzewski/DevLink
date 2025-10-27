import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const FooterLinks = ({ variant = "desktop" }) => {
  const { t } = useTranslation();
  const links = [
    { href: "/", key: "header.homePage", isRouter: true },
    { href: "#post-announcement", key: "header.postAnnouncement", isRouter: false },
    { href: "/about", key: "header.about", isRouter: true },
    { href: "/terms", key: "footer.legal.terms", isRouter: true },
    { href: "/privacy", key: "footer.legal.privacy", isRouter: true },
  ];

  const containerClass = variant === "mobile" 
    ? "flex flex-wrap justify-center gap-x-4 gap-y-2" 
    : "flex space-x-6";

  const linkClass = variant === "mobile"
    ? "text-gray-400 hover:text-yellow-400 transition-colors duration-200 text-xs cursor-pointer"
    : "text-gray-400 hover:text-yellow-400 transition-colors duration-200 text-sm cursor-pointer";

  return (
    <div className={containerClass}>
      {links.map((link) => {
        if (link.isRouter) {
          return (
            <Link
              key={link.href}
              to={link.href}
              className={linkClass}
            >
              {t(link.key)}
            </Link>
          );
        } else {
          return (
            <a
              key={link.href}
              href={link.href}
              className={linkClass}
            >
              {t(link.key)}
            </a>
          );
        }
      })}
    </div>
  );
};

export default FooterLinks;
