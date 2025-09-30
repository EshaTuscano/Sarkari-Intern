import React from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaRocket, FaShieldAlt, FaAward, FaUsers } from "react-icons/fa";

const Footer = ({ language = 'en' }) => {
  const translations = {
    en: {
      platform: "Smart Platform",
      howItWorks: "How It Works",
      browseInternships: "Smart Matches",
      successStories: "Success Stories",
      aiMentor: "AI Career Guide",
      resources: "Resources",
      skillDevelopment: "Skill Development",
      careerGuidance: "Career Guidance",
      interviewTips: "Interview Tips",
      resumeBuilder: "Smart Resume Builder",
      support: "Support",
      helpCenter: "Help Center",
      contactUs: "Contact Us",
      faq: "FAQ",
      liveChat: "Live Chat",
      legal: "Legal",
      privacyPolicy: "Privacy Policy",
      termsOfService: "Terms of Service",
      cookiePolicy: "Cookie Policy",
      dataProtection: "Data Protection",
      stayUpdated: "Get Smart Updates",
      enterEmail: "Enter your email",
      subscribe: "Subscribe",
      contactInfo: "Contact Information",
      rights: "All rights reserved",
      governmentPartner: "Government Certified Initiative",
      smartPlacement: "PM Internship Smart Placement",
      smartCareer: "AI-Powered Career Launchpad",
      empowering: "Empowering students across India with AI-powered internship matching and smart career guidance for the digital era.",
      email: "Email",
      phone: "Phone",
      location: "Location",
      trust: "Trust & Security",
      verified: "Verified Platform",
      secure: "Secure & Encrypted"
    },
    hi: {
      platform: "स्मार्ट प्लेटफॉर्म",
      howItWorks: "कैसे काम करता है",
      browseInternships: "स्मार्ट मैच",
      successStories: "सफलता की कहानियां",
      aiMentor: "AI करियर गाइड",
      resources: "संसाधन",
      skillDevelopment: "कौशल विकास",
      careerGuidance: "करियर मार्गदर्शन",
      interviewTips: "इंटरव्यू टिप्स",
      resumeBuilder: "स्मार्ट रिज्यूमे बिल्डर",
      support: "सहायता",
      helpCenter: "हेल्प सेंटर",
      contactUs: "संपर्क करें",
      faq: "सामान्य प्रश्न",
      liveChat: "लाइव चैट",
      legal: "कानूनी",
      privacyPolicy: "गोपनीयता नीति",
      termsOfService: "सेवा की शर्तें",
      cookiePolicy: "कुकी नीति",
      dataProtection: "डेटा संरक्षण",
      stayUpdated: "स्मार्ट अपडेट प्राप्त करें",
      enterEmail: "अपना ईमेल दर्ज करें",
      subscribe: "सब्सक्राइब करें",
      contactInfo: "संपर्क जानकारी",
      rights: "सभी अधिकार सुरक्षित",
      governmentPartner: "सरकार प्रमाणित पहल",
      smartPlacement: "PM इंटर्नशिप स्मार्ट प्लेसमेंट",
      smartCareer: "AI-पावर्ड करियर लॉन्चपैड",
      empowering: "डिजिटल युग के लिए AI-पावर्ड इंटर्नशिप मिलान और स्मार्ट करियर मार्गदर्शन के साथ पूरे भारत के छात्रों को सशक्त बनाना।",
      email: "ईमेल",
      phone: "फोन",
      location: "स्थान",
      trust: "विश्वास और सुरक्षा",
      verified: "सत्यापित प्लेटफॉर्म",
      secure: "सुरक्षित और एन्क्रिप्टेड"
    }
  };

  const t = translations[language];

  const footerSections = [
    {
      title: t.platform,
      links: [
        { label: t.howItWorks, href: "#how-it-works" },
        { label: t.browseInternships, href: "#internships" },
        { label: t.successStories, href: "#testimonials" },
        { label: t.aiMentor, href: "#" }
      ]
    },
    {
      title: t.resources,
      links: [
        { label: t.skillDevelopment, href: "#" },
        { label: t.careerGuidance, href: "#" },
        { label: t.interviewTips, href: "#" },
        { label: t.resumeBuilder, href: "#" }
      ]
    },
    {
      title: t.support,
      links: [
        { label: t.helpCenter, href: "#" },
        { label: t.contactUs, href: "#contact" },
        { label: t.faq, href: "#faq" },
        { label: t.liveChat, href: "#" }
      ]
    },
    {
      title: t.legal,
      links: [
        { label: t.privacyPolicy, href: "#" },
        { label: t.termsOfService, href: "#" },
        { label: t.cookiePolicy, href: "#" },
        { label: t.dataProtection, href: "#" }
      ]
    }
  ];

  const socialLinks = [
    { icon: <FaFacebook />, href: "#", label: "Facebook" },
    { icon: <FaTwitter />, href: "#", label: "Twitter" },
    { icon: <FaLinkedin />, href: "#", label: "LinkedIn" },
    { icon: <FaInstagram />, href: "#", label: "Instagram" }
  ];

  const trustBadges = [
    { icon: <FaShieldAlt />, text: t.secure },
    { icon: <FaAward />, text: t.verified },
    { icon: <FaUsers />, text: t.governmentPartner }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-xl shadow-lg">
                <FaRocket className="text-white text-2xl" />
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  PM Internship
                </h3>
                <p className="text-blue-300 text-sm">{t.smartPlacement}</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              {t.empowering}
            </p>

            {/* Trust Badges */}
            <div className="space-y-3 mb-6">
              {trustBadges.map((badge, index) => (
                <div key={index} className="flex items-center gap-3 text-sm text-blue-200">
                  <div className="text-blue-400">
                    {badge.icon}
                  </div>
                  <span>{badge.text}</span>
                </div>
              ))}
            </div>

            {/* Newsletter */}
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/20">
              <h4 className="font-semibold mb-3 text-blue-200">{t.stayUpdated}</h4>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder={t.enterEmail}
                  className="flex-1 px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:border-blue-400"
                />
                <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all font-medium">
                  {t.subscribe}
                </button>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          {footerSections.map((section, index) => (
            <div key={index} className="footer-links">
              <h4 className="font-semibold text-lg mb-4 text-blue-300">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href={link.href} 
                      className="text-gray-300 hover:text-white transition-colors duration-200 hover:translate-x-1 transform block py-1"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="border-t border-blue-800 pt-8 mb-6">
          <h4 className="font-semibold text-lg mb-4 text-blue-300">{t.contactInfo}</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3 text-gray-300">
              <FaEnvelope className="text-blue-400" />
              <div>
                <div className="text-sm text-blue-200">{t.email}</div>
                <div>support@pminternship.gov.in</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <FaPhone className="text-blue-400" />
              <div>
                <div className="text-sm text-blue-200">{t.phone}</div>
                <div>+91-1800-123-4567</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <FaMapMarkerAlt className="text-blue-400" />
              <div>
                <div className="text-sm text-blue-200">{t.location}</div>
                <div>PM Internship Smart Placement, New Delhi</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-blue-800 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                © 2024 PM Internship Smart Placement. {t.rights}. | {t.governmentPartner}
              </p>
              <p className="text-blue-300 text-xs mt-1">
                {t.smartCareer}
              </p>
            </div>
            
            <div className="flex items-center gap-6">
              {/* Social Links */}
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a 
                    key={index} 
                    href={social.href} 
                    aria-label={social.label}
                    className="text-gray-400 hover:text-white transition-colors duration-200 transform hover:scale-110"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
              
              {/* Government Badge */}
              <div className="hidden lg:flex items-center gap-2 bg-blue-800/50 px-3 py-1 rounded-full border border-blue-700">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-blue-200">🇮🇳 Government Certified</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Decoration */}
      <div className="relative">
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600"></div>
      </div>
    </footer>
  );
};

export default Footer;