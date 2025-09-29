import React, { createContext, useState, useContext, useEffect } from 'react';

const TranslationContext = createContext();

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};

export const TranslationProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [translations, setTranslations] = useState({});

  // Translation dictionary
  const translationData = {
    en: {
      // Header
      home: "Home",
      howItWorks: "How It Works",
      browseInternships: "Browse Internships",
      aboutUs: "About Us",
      contact: "Contact",
      getStarted: "Get Started",
      
      // Hero Section
      heroTitle: "Find Your",
      heroHighlight: "Government Internship",
      heroSubtitle: "AI-powered platform connecting students with perfect government internship opportunities across India",
      startYourJourney: "🚀 Start Your Journey",
      browseInternshipsBtn: "📋 Browse Internships",
      
      // Stats
      internshipOpportunities: "Internship Opportunities",
      governmentDepartments: "Government Departments",
      studentsPlaced: "Students Placed",
      
      // Features
      featuresTitle: "Why Choose Sarkari Intern?",
      featuresSubtitle: "We make finding and applying for government internships simple, smart, and efficient",
      aiMatching: "AI-Powered Matching",
      aiMatchingDesc: "Smart algorithm matches your skills and interests with the perfect government internships",
      quickApplication: "Quick Application",
      quickApplicationDesc: "Apply to multiple internships with pre-filled information and automated processes",
      personalized: "Personalized Recommendations",
      personalizedDesc: "Get tailored suggestions based on your education, skills, and career goals",
      realTime: "Real-time Tracking",
      realTimeDesc: "Track your application status and get updates on new opportunities",
      governmentVerified: "Government Verified",
      governmentVerifiedDesc: "All internships are verified and sourced directly from government departments",
      careerGrowth: "Career Growth",
      careerGrowthDesc: "Build your career with prestigious government internships and references",
      
      // Candidate Form
      discoverTitle: "Discover Your Perfect Internship",
      discoverSubtitle: "Tell us about your skills, interests, and preferences. Our AI-powered system will match you with the most suitable government internships.",
      uploadResume: "Upload Your Resume (Optional)",
      dragDrop: "Drag & drop your resume here",
      or: "or",
      browseFiles: "Browse Files",
      supportedFormats: "Supported formats: PDF, DOC, DOCX - Max 5MB",
      resumeNote: "Uploading your resume helps us provide better recommendations",
      tellAboutYourself: "Tell Us About Yourself",
      educationLevel: "Education Level",
      yourSkills: "Your Skills",
      preferredSectors: "Preferred Sectors",
      preferredLocation: "Preferred Location",
      addSkill: "Add Skill",
      next: "Next",
      previous: "Previous",
      getRecommendations: "Get Recommendations",
      saveDraft: "Save Draft",
      exportApplication: "Export Application",
      skillPlaceholder: "Type a skill and press Enter",
      locationPlaceholder: "Enter your preferred city or state",
      steps: ["Education", "Skills", "Sectors", "Location"],
      selectEducation: "Select Education Level",
      
      // Education Options
      highschool: "High School",
      bachelors: "Bachelor's Degree",
      masters: "Master's Degree",
      phd: "PhD",
      
      // Sector Options
      technology: "Technology",
      healthcare: "Healthcare",
      education: "Education",
      agriculture: "Agriculture",
      finance: "Finance",
      environment: "Environment",
      marketing: "Marketing",
      
      // Recommendations
      personalizedRecs: "Your Personalized Recommendations",
      basedOnProfile: "Based on your profile, we found these perfect matches for you",
      match: "Match",
      skillsRequired: "Skills Required",
      location: "Location",
      duration: "Duration",
      stipend: "Stipend",
      deadline: "Deadline",
      description: "Description",
      matchedSkills: "Your matched skills",
      applyNow: "Apply Now",
      
      // Testimonials
      successStories: "Success Stories",
      testimonialsSubtitle: "Hear from students who found their perfect government internships through our platform",
      
      // Contact
      contactUs: "Contact Us",
      contactSubtitle: "Have questions? Get in touch with our team for support and guidance.",
      getInTouch: "Get in Touch",
      quickSupport: "Quick Support",
      supportHours: "Our support team is available Monday to Friday, 9 AM to 6 PM.",
      
      // Login/Signup
      login: "Login",
      signup: "Sign Up",
      welcomeBack: "Welcome Back",
      loginSubtitle: "Sign in to your account to continue",
      emailAddress: "Email Address",
      password: "Password",
      signIn: "Sign In",
      noAccount: "Don't have an account?",
      createAccount: "Create account",
      forgotPassword: "Forgot your password?",
      demoCredentials: "Demo credentials",
      
      // Application Manager
      yourApplications: "Your Applications",
      draft: "Draft",
      completed: "Completed",
      continue: "Continue",
      export: "Export",
      delete: "Delete",
      noApplications: "No saved applications",
      lastSaved: "Last saved",
      resumeApplication: "Resume Application",
      exportResume: "Export Enhanced Resume",
      
      // Admin
      adminDashboard: "Admin Dashboard",
      overview: "Overview",
      applications: "Applications",
      analytics: "Analytics",
      totalApplications: "Total Applications",
      completedApplications: "Completed",
      draftApplications: "Drafts",
      averageMatchScore: "Avg Match Score",
      popularSectors: "Popular Sectors",
      topSkills: "Top Skills",
      viewDetails: "View Details",
      candidate: "Candidate",
      status: "Status",
      actions: "Actions",
      date: "Date",
      backToUser: "Back to User View"
    },
    hi: {
      // Header
      home: "होम",
      howItWorks: "कैसे काम करता है",
      browseInternships: "इंटर्नशिप ब्राउज़ करें",
      aboutUs: "हमारे बारे में",
      contact: "संपर्क करें",
      getStarted: "शुरू करें",
      
      // Hero Section
      heroTitle: "ढूंढें अपनी",
      heroHighlight: "सरकारी इंटर्नशिप",
      heroSubtitle: "AI-पावर्ड प्लेटफॉर्म जो छात्रों को पूरे भारत में सही सरकारी इंटर्नशिप अवसरों से जोड़ता है",
      startYourJourney: "🚀 अपनी यात्रा शुरू करें",
      browseInternshipsBtn: "📋 इंटर्नशिप ब्राउज़ करें",
      
      // Stats
      internshipOpportunities: "इंटर्नशिप अवसर",
      governmentDepartments: "सरकारी विभाग",
      studentsPlaced: "छात्र प्लेस्ड",
      
      // Features
      featuresTitle: "सरकारी इंटर्न क्यों चुनें?",
      featuresSubtitle: "हम सरकारी इंटर्नशिप ढूंढने और आवेदन करने को सरल, स्मार्ट और कुशल बनाते हैं",
      aiMatching: "AI-पावर्ड मिलान",
      aiMatchingDesc: "स्मार्ट एल्गोरिदम आपके कौशल और रुचियों को सही सरकारी इंटर्नशिप से मिलाता है",
      quickApplication: "त्वरित आवेदन",
      quickApplicationDesc: "पहले से भरी गई जानकारी और स्वचालित प्रक्रियाओं के साथ कई इंटर्नशिप के लिए आवेदन करें",
      personalized: "व्यक्तिगत सिफारिशें",
      personalizedDesc: "आपकी शिक्षा, कौशल और करियर लक्ष्यों के आधार पर अनुरूप सुझाव प्राप्त करें",
      realTime: "रीयल-टाइम ट्रैकिंग",
      realTimeDesc: "अपने आवेदन की स्थिति को ट्रैक करें और नए अवसरों पर अपडेट प्राप्त करें",
      governmentVerified: "सरकारी सत्यापित",
      governmentVerifiedDesc: "सभी इंटर्नशिप सत्यापित हैं और सीधे सरकारी विभागों से प्राप्त की गई हैं",
      careerGrowth: "करियर ग्रोथ",
      careerGrowthDesc: "प्रतिष्ठित सरकारी इंटर्नशिप और संदर्भों के साथ अपना करियर बनाएं",
      
      // Candidate Form
      discoverTitle: "अपनी परफेक्ट इंटर्नशिप खोजें",
      discoverSubtitle: "अपने कौशल, रुचियों और प्राथमिकताओं के बारे में बताएं। हमारी AI-पावर्ड प्रणाली आपको सबसे उपयुक्त सरकारी इंटर्नशिप से मिलाएगी।",
      uploadResume: "अपना रिज्यूमे अपलोड करें (वैकल्पिक)",
      dragDrop: "अपना रिज्यूमे यहाँ खींच कर छोड़ें",
      or: "या",
      browseFiles: "फ़ाइलें चुनें",
      supportedFormats: "समर्थित प्रारूप: PDF, DOC, DOCX - अधिकतम 5MB",
      resumeNote: "रिज्यूमे अपलोड करने से हमें बेहतर सिफारिशें प्रदान करने में मदद मिलती है",
      tellAboutYourself: "अपने बारे में बताएं",
      educationLevel: "शैक्षिक स्तर",
      yourSkills: "आपके कौशल",
      preferredSectors: "पसंदीदा क्षेत्र",
      preferredLocation: "पसंदीदा स्थान",
      addSkill: "कौशल जोड़ें",
      next: "अगला",
      previous: "पिछला",
      getRecommendations: "सिफारिशें प्राप्त करें",
      saveDraft: "ड्राफ्ट सहेजें",
      exportApplication: "आवेदन निर्यात करें",
      skillPlaceholder: "कौशल टाइप करें और एंटर दबाएं",
      locationPlaceholder: "अपना पसंदीदा शहर या राज्य दर्ज करें",
      steps: ["शिक्षा", "कौशल", "क्षेत्र", "स्थान"],
      selectEducation: "शैक्षिक स्तर चुनें",
      
      // Education Options
      highschool: "हाई स्कूल",
      bachelors: "स्नातक",
      masters: "परास्नातक",
      phd: "डॉक्टरेट",
      
      // Sector Options
      technology: "प्रौद्योगिकी",
      healthcare: "स्वास्थ्य सेवा",
      education: "शिक्षा",
      agriculture: "कृषि",
      finance: "वित्त",
      environment: "पर्यावरण",
      marketing: "मार्केटिंग",
      
      // Recommendations
      personalizedRecs: "आपकी व्यक्तिगत सिफारिशें",
      basedOnProfile: "आपकी प्रोफाइल के आधार पर, हमें आपके लिए ये उत्तम मैच मिले",
      match: "मेल",
      skillsRequired: "आवश्यक कौशल",
      location: "स्थान",
      duration: "अवधि",
      stipend: "वजीफा",
      deadline: "आखिरी तारीख",
      description: "विवरण",
      matchedSkills: "आपके मेल खाते कौशल",
      applyNow: "अभी आवेदन करें",
      
      // Testimonials
      successStories: "सफलता की कहानियाँ",
      testimonialsSubtitle: "उन छात्रों से सुनें जिन्हें हमारे प्लेटफॉर्म के माध्यम से उनकी पसंद की सरकारी इंटर्नशिप मिली",
      
      // Contact
      contactUs: "हमसे संपर्क करें",
      contactSubtitle: "कोई प्रश्न हैं? समर्थन और मार्गदर्शन के लिए हमारी टीम से संपर्क करें।",
      getInTouch: "संपर्क में रहें",
      quickSupport: "त्वरित सहायता",
      supportHours: "हमारी सहायता टीम सोमवार से शुक्रवार, सुबह 9 बजे से शाम 6 बजे तक उपलब्ध है।",
      
      // Login/Signup
      login: "लॉगिन",
      signup: "साइन अप",
      welcomeBack: "वापसी पर स्वागत है",
      loginSubtitle: "जारी रखने के लिए अपने खाते में साइन इन करें",
      emailAddress: "ईमेल पता",
      password: "पासवर्ड",
      signIn: "साइन इन करें",
      noAccount: "खाता नहीं है?",
      createAccount: "खाता बनाएं",
      forgotPassword: "पासवर्ड भूल गए?",
      demoCredentials: "डेमो क्रेडेंशियल्स",
      
      // Application Manager
      yourApplications: "आपके आवेदन",
      draft: "ड्राफ्ट",
      completed: "पूर्ण",
      continue: "जारी रखें",
      export: "निर्यात करें",
      delete: "हटाएं",
      noApplications: "कोई सहेजे गए आवेदन नहीं",
      lastSaved: "अंतिम सहेजा गया",
      resumeApplication: "आवेदन जारी रखें",
      exportResume: "एन्हांस्ड रिज्यूमे निर्यात करें",
      
      // Admin
      adminDashboard: "एडमिन डैशबोर्ड",
      overview: "अवलोकन",
      applications: "आवेदन",
      analytics: "विश्लेषण",
      totalApplications: "कुल आवेदन",
      completedApplications: "पूर्ण",
      draftApplications: "ड्राफ्ट",
      averageMatchScore: "औसत मैच स्कोर",
      popularSectors: "लोकप्रिय क्षेत्र",
      topSkills: "शीर्ष कौशल",
      viewDetails: "विवरण देखें",
      candidate: "उम्मीदवार",
      status: "स्थिति",
      actions: "कार्रवाई",
      date: "तारीख",
      backToUser: "यूजर व्यू पर वापस जाएं"
    }
  };

  useEffect(() => {
    setTranslations(translationData[language]);
  }, [language]);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('preferredLanguage', lang);
  };

  // Initialize language from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
    setLanguage(savedLanguage);
  }, []);

  const t = (key) => {
    return translations[key] || key;
  };

  const value = {
    language,
    changeLanguage,
    t
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};