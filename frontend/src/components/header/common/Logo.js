import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link
      to="/"
      className="text-3xl md:text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-500 font-display cursor-pointer hover:scale-110 transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]"
    >
      DevLink
    </Link>
  );
};

export default Logo;
