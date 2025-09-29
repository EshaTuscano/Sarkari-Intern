import { useState } from "react";

const Header = ({ onStartJourney, onLanguageChange, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "home" },
    { label: "How It Works", href: "how-it-works" },
    { label: "Browse Internships", href: "internships" },
    { label: "About Us", href: "about" },
    { label: "Contact", href: "contact" }
  ];

  const handleNavClick = (sectionId) => {
    onNavigate(sectionId);
    setIsOpen(false); // Close mobile menu after click
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="bg-blue-500 p-2 rounded-lg">
            <span className="text-white font-bold text-lg">SI</span>
          </div>
          <div>
            <h1 className="font-bold text-xl bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Sarkari Intern
            </h1>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.href)}
              className="text-gray-700 hover:text-blue-500 transition-colors font-medium bg-transparent border-none cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Desktop CTA & Language */}
        <div className="hidden md:flex items-center gap-4">
          <select 
            className="border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:border-blue-500"
            onChange={(e) => onLanguageChange(e.target.value)}
          >
            <option value="en">English</option>
            <option value="hi">हिन्दी</option>
          </select>
          <button
            onClick={onStartJourney}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium shadow-sm"
          >
            Get Started
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 hover:text-blue-500 focus:outline-none p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg border-t">
          <nav className="flex flex-col gap-2 p-4">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className="text-gray-700 hover:text-blue-500 font-medium py-3 px-4 rounded-lg hover:bg-blue-50 transition-colors text-left bg-transparent border-none"
              >
                {item.label}
              </button>
            ))}
            <select 
              className="border border-gray-300 rounded-lg px-3 py-2 my-2 focus:outline-none focus:border-blue-500"
              onChange={(e) => onLanguageChange(e.target.value)}
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
            </select>
            <button
              onClick={() => { onStartJourney(); setIsOpen(false); }}
              className="mt-2 bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium"
            >
              Get Started
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;