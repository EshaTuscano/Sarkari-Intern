// src/components/Header.jsx
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "../context/TranslationContext";

const Header = ({ onStartJourney, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { currentUser, logout } = useAuth();
  const { language, changeLanguage, t } = useTranslation();

  const navItems = [
    { label: t('home'), href: "home" },
    { label: t('howItWorks'), href: "how-it-works" },
    { label: t('browseInternships'), href: "internships" },
    { label: t('aboutUs'), href: "about" },
    { label: t('contact'), href: "contact" }
  ];

  const handleNavClick = (sectionId) => {
    if (onNavigate) {
      onNavigate(sectionId);
    }
    setIsOpen(false);
  };

  const handleLanguageChange = (e) => {
    changeLanguage(e.target.value);
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

        {/* Desktop CTA & Language & User Menu */}
        <div className="hidden md:flex items-center gap-4">
          <select 
            value={language}
            onChange={handleLanguageChange}
            className="border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:border-blue-500"
          >
            <option value="en">English</option>
            <option value="hi">हिन्दी</option>
          </select>
          
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-gray-700">{currentUser.name}</span>
              </button>
              
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">{currentUser.name}</p>
                    <p className="text-xs text-gray-500">{currentUser.email}</p>
                  </div>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {language === 'en' ? 'Logout' : 'लॉगआउट'}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onStartJourney}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium shadow-sm"
            >
              {t('getStarted')}
            </button>
          )}
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
              value={language}
              onChange={handleLanguageChange}
              className="border border-gray-300 rounded-lg px-3 py-2 my-2 focus:outline-none focus:border-blue-500"
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
            </select>
            {currentUser ? (
              <div className="flex items-center gap-3 p-3 border-t">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-medium">{currentUser.name}</p>
                  <button
                    onClick={logout}
                    className="text-sm text-red-600 hover:text-red-800"
                  >
                    {language === 'en' ? 'Logout' : 'लॉगआउट'}
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => { onStartJourney(); setIsOpen(false); }}
                className="mt-2 bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium"
              >
                {t('getStarted')}
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;