const MobileMenuButton = ({ isOpen, onClick }) => {
  return (
    <button
      className="lg:hidden text-gray-200 focus:outline-none p-2 hover:bg-gray-700/50 rounded-lg transition-all duration-300 cursor-pointer"
      onClick={onClick}
      aria-label="Toggle menu"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
        />
      </svg>
    </button>
  );
};

export default MobileMenuButton;
