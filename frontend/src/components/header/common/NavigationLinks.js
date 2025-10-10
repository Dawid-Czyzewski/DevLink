import { useTranslation } from "react-i18next";

const NavigationLinks = ({ variant = "desktop", onLinkClick }) => {
  const { t } = useTranslation();
  const links = [
    { href: "#find-projects", key: "header.findProjects" },
    { href: "#post-offer", key: "header.postOffer" },
    { href: "#about", key: "header.about" },
  ];

  if (variant === "mobile") {
    return (
      <>
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="block text-gray-300 hover:text-yellow-400 hover:bg-gray-800/50 px-3 py-2.5 rounded-lg transition-all duration-200 font-medium cursor-pointer"
            onClick={onLinkClick}
          >
            {t(link.key)}
          </a>
        ))}
      </>
    );
  }

  return (
    <nav className="hidden lg:flex items-center space-x-8">
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className="relative text-gray-300 hover:text-yellow-400 transition-all duration-300 font-medium text-sm group cursor-pointer"
        >
          {t(link.key)}
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
        </a>
      ))}
    </nav>
  );
};

export default NavigationLinks;
