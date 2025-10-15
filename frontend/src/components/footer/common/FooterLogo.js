import { Link } from "react-router-dom";

const FooterLogo = () => {
  return (
    <Link 
      to="/"
      className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-500 font-display hover:scale-105 transition-transform duration-300 cursor-pointer inline-block"
    >
      DevLnk
    </Link>
  );
};

export default FooterLogo;
