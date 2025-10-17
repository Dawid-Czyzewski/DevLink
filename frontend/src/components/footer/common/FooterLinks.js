import { useTranslation } from "react-i18next";

const FooterLinks = ({ variant = "desktop" }) => {
  const { t } = useTranslation();
  const links = [
    { href: "#find-projects", key: "header.findProjects" },
    { href: "#post-announcement", key: "header.postAnnouncement" },
    { href: "#about", key: "header.about" },
  ];

  const containerClass = variant === "mobile" 
    ? "flex flex-wrap justify-center gap-x-4 gap-y-2" 
    : "flex space-x-6";

  const linkClass = variant === "mobile"
    ? "text-gray-400 hover:text-yellow-400 transition-colors duration-200 text-xs cursor-pointer"
    : "text-gray-400 hover:text-yellow-400 transition-colors duration-200 text-sm cursor-pointer";

  return (
    <div className={containerClass}>
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className={linkClass}
        >
          {t(link.key)}
        </a>
      ))}
    </div>
  );
};

export default FooterLinks;
