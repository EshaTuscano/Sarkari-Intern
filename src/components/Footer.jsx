import React from "react";
import { FaBrain, FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  const footerSections = [
    {
      title: "Platform",
      links: [
        { label: "How It Works", href: "#how-it-works" },
        { label: "Browse Internships", href: "#internships" },
        { label: "Success Stories", href: "#testimonials" },
        { label: "AI Mentor", href: "#" }
      ]
    },
    {
      title: "Resources",
      links: [
        { label: "Skill Development", href: "#" },
        { label: "Career Guidance", href: "#" },
        { label: "Interview Tips", href: "#" },
        { label: "Resume Builder", href: "#" }
      ]
    },
    {
      title: "Support",
      links: [
        { label: "Help Center", href: "#" },
        { label: "Contact Us", href: "#contact" },
        { label: "FAQ", href: "#faq" },
        { label: "Live Chat", href: "#" }
      ]
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
        { label: "Cookie Policy", href: "#" },
        { label: "Data Protection", href: "#" }
      ]
    }
  ];

  const socialLinks = [
    { icon: <FaFacebook />, href: "#", label: "Facebook" },
    { icon: <FaTwitter />, href: "#", label: "Twitter" },
    { icon: <FaLinkedin />, href: "#", label: "LinkedIn" },
    { icon: <FaInstagram />, href: "#", label: "Instagram" }
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand Section */}
        <div className="footer-brand">
          <div className="footer-logo">
            <FaBrain className="logo-icon" />
            <div>
              <h3 className="brand-title">Sarkari Intern</h3>
              <p className="brand-subtitle">Smart Career Discovery</p>
            </div>
          </div>
          <p className="brand-desc">
            Empowering students across India to find their perfect internships through AI-powered matching and career guidance.
          </p>

          {/* Newsletter */}
          <div className="newsletter">
            <h4>Stay Updated</h4>
            <div className="newsletter-form">
              <input type="email" placeholder="Enter your email" />
              <button>Subscribe</button>
            </div>
          </div>
        </div>

        {/* Links */}
        {footerSections.map((section, index) => (
          <div key={index} className="footer-links">
            <h4>{section.title}</h4>
            <ul>
              {section.links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Contact Info */}
      <div className="footer-contact">
        <div><FaEnvelope /> support@aiinternship.in</div>
        <div><FaPhone /> +91 1800-123-4567</div>
        <div><FaMapMarkerAlt /> New Delhi, India</div>
      </div>

      {/* Bottom Footer */}
      <div className="footer-bottom">
        <p>© 2024 AI Internship Platform. All rights reserved. | A PM Internship Scheme Partner</p>
        <div className="social-links">
          {socialLinks.map((social, index) => (
            <a key={index} href={social.href} aria-label={social.label}>
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
