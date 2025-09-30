// src/components/Header.jsx
import { useState } from "react";
import { useAuth } from "../context/AuthContext";


const Header = ({ onStartJourney, onNavigate, language, onLanguageChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { currentUser, logout } = useAuth();

  const translations = {
    en: {
      home: "Home",
      howItWorks: "How It Works",
      browseInternships: "Smart Matches",
      aboutUs: "About Us",
      contact: "Contact",
      getStarted: "Start Smart Journey",
      logout: "Logout",
      adminDashboard: "Admin Dashboard",
      myApplications: "My Applications",
      profile: "Profile",
      welcome: "Welcome",
      smartPlacement: "PM Internship Smart Placement"
    },
    hi: {
      home: "होम",
      howItWorks: "कैसे काम करता है",
      browseInternships: "स्मार्ट मैच",
      aboutUs: "हमारे बारे में",
      contact: "संपर्क करें",
      getStarted: "स्मार्ट यात्रा शुरू करें",
      logout: "लॉगआउट",
      adminDashboard: "एडमिन डैशबोर्ड",
      myApplications: "मेरे आवेदन",
      profile: "प्रोफाइल",
      welcome: "स्वागत है",
      smartPlacement: "PM इंटर्नशिप स्मार्ट प्लेसमेंट"
    }
  };

  const t = translations[language];

  const navItems = [
    { label: t.home, href: "home" },
    { label: t.howItWorks, href: "how-it-works" },
    { label: t.browseInternships, href: "internships" },
    { label: t.aboutUs, href: "about" },
    { label: t.contact, href: "contact" }
  ];

  const handleNavClick = (sectionId) => {
    if (onNavigate) {
      onNavigate(sectionId);
    }
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    setIsOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-xl shadow-lg">
              <span className="text-white font-bold text-lg">PM</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                PM Internship
              </h1>
              <p className="text-xs text-gray-500 -mt-1">{t.smartPlacement}</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium bg-transparent border-none cursor-pointer relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
              </button>
            ))}
          </nav>

          {/* Desktop CTA & Language & User Menu */}
          <div className="hidden md:flex items-center gap-4">
            {/* Language Selector */}
            <div className="relative">
              <select 
                value={language}
                onChange={onLanguageChange}
                className="appearance-none border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white cursor-pointer"
              >
                <option value="en">🇺🇸 English</option>
                <option value="hi">🇮🇳 हिन्दी</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-3 bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 rounded-xl hover:from-blue-100 hover:to-purple-100 transition-all border border-blue-100 shadow-sm"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium shadow-md">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-900">{currentUser.name}</p>
                    <p className="text-xs text-gray-500">{t.welcome}</p>
                  </div>
                  <svg 
                    className={`w-4 h-4 text-gray-500 transition-transform ${showUserMenu ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 py-2 backdrop-blur-sm">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900">{currentUser.name}</p>
                      <p className="text-xs text-gray-500 truncate">{currentUser.email}</p>
                      {currentUser.education && (
                        <p className="text-xs text-blue-600 mt-1">{currentUser.education}</p>
                      )}
                    </div>
                    
                    <div className="py-1">
                      <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 flex items-center gap-2">
                        <span>👤</span>
                        {t.profile}
                      </button>
                      <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 flex items-center gap-2">
                        <span>📄</span>
                        {t.myApplications}
                      </button>
                      {currentUser.email === 'admin@pminternship.com' && (
                        <button className="w-full text-left px-4 py-2 text-sm text-blue-700 hover:bg-blue-50 flex items-center gap-2">
                          <span>⚙️</span>
                          {t.adminDashboard}
                        </button>
                      )}
                    </div>
                    
                    <div className="border-t border-gray-100 pt-1">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                      >
                        <span>🚪</span>
                        {t.logout}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onStartJourney}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2"
              >
                <span>🚀</span>
                {t.getStarted}
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            {/* Mobile Language Selector */}
            <select 
              value={language}
              onChange={onLanguageChange}
              className="border border-gray-300 rounded-lg px-2 py-1 text-sm focus:outline-none focus:border-blue-500"
            >
              <option value="en">EN</option>
              <option value="hi">HI</option>
            </select>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-sm shadow-xl border-t border-gray-200">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {/* User Info in Mobile Menu */}
            {currentUser && (
              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg mb-2">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium shadow-md">
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">{currentUser.name}</p>
                  <p className="text-xs text-gray-500">{currentUser.email}</p>
                </div>
              </div>
            )}

            {/* Navigation Items */}
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className="w-full text-left text-gray-700 hover:text-blue-600 font-medium py-3 px-4 rounded-lg hover:bg-blue-50 transition-colors bg-transparent border-none flex items-center gap-3"
              >
                <span className="text-blue-500">•</span>
                {item.label}
              </button>
            ))}

            {/* Mobile User Actions */}
            {currentUser ? (
              <div className="border-t border-gray-200 pt-3 mt-3">
                <button className="w-full text-left text-gray-700 hover:text-blue-600 font-medium py-3 px-4 rounded-lg hover:bg-blue-50 transition-colors bg-transparent border-none flex items-center gap-3">
                  <span>👤</span>
                  {t.profile}
                </button>
                <button className="w-full text-left text-gray-700 hover:text-blue-600 font-medium py-3 px-4 rounded-lg hover:bg-blue-50 transition-colors bg-transparent border-none flex items-center gap-3">
                  <span>📄</span>
                  {t.myApplications}
                </button>
                {currentUser.email === 'admin@pminternship.com' && (
                  <button className="w-full text-left text-blue-700 hover:text-blue-800 font-medium py-3 px-4 rounded-lg hover:bg-blue-50 transition-colors bg-transparent border-none flex items-center gap-3">
                    <span>⚙️</span>
                    {t.adminDashboard}
                  </button>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full text-left text-red-600 hover:text-red-700 font-medium py-3 px-4 rounded-lg hover:bg-red-50 transition-colors bg-transparent border-none flex items-center gap-3 mt-2"
                >
                  <span>🚪</span>
                  {t.logout}
                </button>
              </div>
            ) : (
              <button
                onClick={() => { onStartJourney(); setIsOpen(false); }}
                className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-semibold shadow-lg flex items-center justify-center gap-2"
              >
                <span>🚀</span>
                {t.getStarted}
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;