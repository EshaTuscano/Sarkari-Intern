import { useState, useEffect } from "react";
import { useAuth } from "./context/AuthContext";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import CandidateForm from "./components/CandidateForm";
import ResumeUpload from "./components/ResumeUpload";
import InternshipCard from "./components/InternshipCard";
import Testimonials from "./components/Testimonials";
import Chatbot from "./components/Chatbot";
import Footer from "./components/Footer";
import AdminDashboard from "./components/AdminDashboard";
import ApplicationManager from "./components/ApplicationManager";
import Login from "./components/Login";
import Signup from "./components/Signup";
import "./App.css";
import { useTranslation } from "./context/TranslationContext";

function App() {
  // ------------------- STATES -------------------
  const [recommendations, setRecommendations] = useState([]);
  const [resume, setResume] = useState(null);
  const { t } = useTranslation();
  const [extractedData, setExtractedData] = useState(null);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);
  const [currentApplication, setCurrentApplication] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const [language, setLanguage] = useState("en"); // default language

  const { currentUser, getUserApplications, saveUserApplication } = useAuth();

  // Load user's applications when user changes
  const savedApplications = currentUser ? getUserApplications() : [];

  // ------------------- INTERNSHIPS DATA -------------------
  const internships = [
    {
      id: 1,
      title: "Digital India Internship",
      company: "Ministry of Electronics & IT",
      sector: "Technology",
      location: "Delhi, Bangalore, Hyderabad",
      stipend: "₹15,000/month",
      duration: "3 months",
      skills: ["React", "Python", "JavaScript", "Digital Governance"],
      education: ["Bachelors", "Masters"],
      description: "Work on digital governance projects and citizen services",
      deadline: "2024-03-15",
      matchScore: 0
    },
    {
      id: 2,
      title: "Health Research Fellowship",
      company: "Ministry of Health & Family Welfare",
      sector: "Healthcare",
      location: "Delhi, Mumbai, Chennai",
      stipend: "₹20,000/month",
      duration: "6 months",
      skills: ["Research", "Data Analysis", "Biology", "Public Health"],
      education: ["Masters", "PhD"],
      description: "Research in public health and healthcare systems",
      deadline: "2024-04-01",
      matchScore: 0
    },
    {
      id: 3,
      title: "Agricultural Development Intern",
      company: "Ministry of Agriculture",
      sector: "Agriculture",
      location: "Punjab, Maharashtra, Karnataka",
      stipend: "₹12,000/month",
      duration: "4 months",
      skills: ["Agriculture", "Research", "Field Work", "Sustainability"],
      education: ["Bachelors", "Masters"],
      description: "Field research and agricultural development projects",
      deadline: "2024-03-30",
      matchScore: 0
    },
    {
      id: 4,
      title: "Education Policy Research",
      company: "Ministry of Education",
      sector: "Education",
      location: "Delhi, Kolkata",
      stipend: "₹18,000/month",
      duration: "5 months",
      skills: ["Research", "Policy Analysis", "Education", "Writing"],
      education: ["Masters", "PhD"],
      description: "Research on education policies and implementation",
      deadline: "2024-04-10",
      matchScore: 0
    },
    {
      id: 5,
      title: "Financial Analysis Intern",
      company: "Ministry of Finance",
      sector: "Finance",
      location: "Delhi, Mumbai",
      stipend: "₹16,000/month",
      duration: "3 months",
      skills: ["Excel", "Analysis", "Accounting", "Economics"],
      education: ["Bachelors", "Masters"],
      description: "Financial data analysis and reporting",
      deadline: "2024-03-25",
      matchScore: 0
    },
    {
      id: 6,
      title: "Environmental Research Intern",
      company: "Ministry of Environment",
      sector: "Environment",
      location: "Delhi, Chennai",
      stipend: "₹14,000/month",
      duration: "4 months",
      skills: ["Environmental Science", "Research", "Data Collection"],
      education: ["Bachelors", "Masters"],
      description: "Environmental research and conservation projects",
      deadline: "2024-04-05",
      matchScore: 0
    }
  ];

  // Save application to user's data
  const saveApplication = (formData, resumeFile = null, isComplete = false) => {
    if (!currentUser) {
      setShowLogin(true);
      return null;
    }

    const application = {
      id: Date.now().toString(),
      formData,
      resume: resumeFile ? resumeFile.name : null,
      timestamp: new Date().toISOString(),
      isComplete,
      matchScore: 0,
      recommendations: [],
      userId: currentUser.id,
      userName: currentUser.name
    };

    const savedApp = saveUserApplication(application);
    setCurrentApplication(savedApp);

    if (!isComplete) {
      scheduleReminder(savedApp);
    }

    return savedApp;
  };

  // Schedule email/SMS reminder
  const scheduleReminder = (application) => {
    console.log('Reminder scheduled for application:', application.id);
    
    setTimeout(() => {
      if (!application.isComplete) {
        sendReminder(application);
      }
    }, 24 * 60 * 60 * 1000);
  };

  // Send reminder notification
  const sendReminder = (application) => {
    const message = language === 'en' 
      ? `Reminder: Complete your application for government internships. Continue where you left off!`
      : `अनुस्मारक: सरकारी इंटर्नशिप के लिए अपना आवेदन पूरा करें। जहाँ से छोड़ा था, वहाँ से जारी रखें!`;

    alert(message);
    console.log('Reminder sent for application:', application.id);
  };

  // Resume parsing simulation
  const parseResume = (file) => {
    const sampleData = {
      education: "Bachelors",
      skills: ["JavaScript", "React", "Python", "Data Analysis", "Web Development"],
      experience: "1-2 years",
      sectors: ["Technology", "Finance"],
      location: "Delhi"
    };
    
    setTimeout(() => {
      setExtractedData(sampleData);
      alert(language === 'en' 
        ? 'Resume parsed successfully! Form fields have been pre-filled.' 
        : 'रिज्यूमे सफलतापूर्वक पार्स किया गया! फॉर्म फील्ड्स पहले से भर दी गई हैं।'
      );
    }, 2000);
    
    return sampleData;
  };

  const handleResumeUpload = (file) => {
    setResume(file);
    const extracted = parseResume(file);
    return extracted;
  };

  // Enhanced rule-based matching with scoring
  const handleFormSubmit = (formData, saveAsDraft = false) => {
    if (!currentUser) {
      setShowLogin(true);
      return;
    }

    if (saveAsDraft) {
      const application = saveApplication(formData, resume, false);
      if (application) {
        alert(language === 'en' 
          ? 'Application saved as draft! You can continue later.' 
          : 'आवेदन ड्राफ्ट के रूप में सहेजा गया! आप बाद में जारी रख सकते हैं।'
        );
      }
      return;
    }

    const scoredInternships = internships.map(intern => {
      let score = 0;
      const matchedSkills = [];
      
      // Skill matching (40% weight)
      formData.skills.forEach(skill => {
        if (intern.skills.some(internSkill => 
          internSkill.toLowerCase().includes(skill.toLowerCase()) ||
          skill.toLowerCase().includes(internSkill.toLowerCase())
        )) {
          score += 10;
          matchedSkills.push(skill);
        }
      });
      
      // Sector matching (30% weight)
      if (formData.sectors.some(sector => 
        intern.sector.toLowerCase().includes(sector.toLowerCase()) ||
        sector.toLowerCase().includes(intern.sector.toLowerCase())
      )) {
        score += 30;
      }
      
      // Location matching (20% weight)
      if (formData.location && intern.location.toLowerCase().includes(formData.location.toLowerCase())) {
        score += 20;
      }
      
      // Education matching (10% weight)
      if (formData.education && intern.education.includes(formData.education)) {
        score += 10;
      }
      
      return {
        ...intern,
        matchScore: Math.min(score, 100),
        matchedSkills
      };
    });
    
    // Sort by score and get top 5
    const matched = scoredInternships
      .filter(intern => intern.matchScore > 0)
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 5);
    
    setRecommendations(matched);
    
    // Save as complete application
    const application = saveApplication(formData, resume, true);
    setCurrentApplication(application);
  };

  const handleStartJourney = () => {
    if (!currentUser) {
      setShowLogin(true);
    } else {
      document.getElementById("discover-section")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNavigation = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Export application data
  const exportApplication = (application) => {
    const data = {
      candidate: application.formData,
      user: {
        name: application.userName,
        id: application.userId
      },
      resume: application.resume,
      generatedResume: generateEnhancedResume(application),
      timestamp: application.timestamp,
      matchScore: application.matchScore
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `internship-application-${application.id}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Generate AI-enhanced resume
  const generateEnhancedResume = (application) => {
    const formData = application.formData;
    return {
      personal: {
        education: formData.education,
        skills: formData.skills,
        preferredSectors: formData.sectors,
        location: formData.location
      },
      aiSuggestions: {
        recommendedSkills: ["Project Management", "Communication", "Teamwork"],
        careerPath: `${formData.sectors[0]} Specialist`,
        improvementAreas: ["Certifications", "Portfolio Projects"]
      },
      generatedOn: new Date().toISOString()
    };
  };

  // Auto-fill form when resume data is extracted
  useEffect(() => {
    if (extractedData) {
      console.log('Extracted data available:', extractedData);
    }
  }, [extractedData]);

  // Initialize demo user data
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.length === 0) {
      // Create demo user
      const demoUser = {
        name: "Demo User",
        email: "test@example.com",
        password: "password123"
      };
      users.push(demoUser);
      localStorage.setItem('users', JSON.stringify(users));
    }
  }, []);

  // Helper function to get all applications from all users (for admin)
  const getAllApplications = () => {
    const applications = [];
    const keys = Object.keys(localStorage);
    
    keys.forEach(key => {
      if (key.startsWith('applications_')) {
        const userApplications = JSON.parse(localStorage.getItem(key) || '[]');
        applications.push(...userApplications);
      }
    });
    
    return applications;
  };

  return (
    <div className="min-h-screen bg-white">
      <Header 
        onStartJourney={handleStartJourney} 
        onNavigate={handleNavigation} 
      />
      
      {/* Admin Dashboard Toggle */}
      <div className="fixed top-20 right-4 z-40">
        <button
          onClick={() => setShowAdminDashboard(!showAdminDashboard)}
          className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium"
        >
          {showAdminDashboard ? 'User View' : 'Admin View'}
        </button>
      </div>

      {/* Auth Modals */}
      {showLogin && (
        <Login 
          onClose={() => setShowLogin(false)}
          onSwitchToSignup={() => {
            setShowLogin(false);
            setShowSignup(true);
          }}
          language={language}
        />
      )}
      
      {showSignup && (
        <Signup 
          onClose={() => setShowSignup(false)}
          onSwitchToLogin={() => {
            setShowSignup(false);
            setShowLogin(true);
          }}
          language={language}
        />
      )}

      {showAdminDashboard ? (
        <AdminDashboard 
          applications={getAllApplications()}
          internships={internships}
          language={language}
          onToggleView={() => setShowAdminDashboard(false)}
        />
      ) : (
        <>
          <section id="home">
            <Hero onStartJourney={handleStartJourney} />
          </section>
          
          <section id="how-it-works">
            <Features />
          </section>
          
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            {/* Welcome Message for Logged-in Users */}
            {currentUser && (
              <div className="mb-8 p-6 bg-blue-50 border border-blue-200 rounded-xl">
                <h2 className="text-2xl font-bold text-blue-900 mb-2">
                  {language === 'en' ? `Welcome back, ${currentUser.name}!` : `वापसी पर स्वागत है, ${currentUser.name}!`}
                </h2>
                <p className="text-blue-700">
                  {language === 'en' 
                    ? 'Continue your internship search or start a new application.'
                    : 'अपनी इंटर्नशिप खोज जारी रखें या एक नया आवेदन शुरू करें।'
                  }
                </p>
              </div>
            )}

            {/* Application Manager */}
            {savedApplications.length > 0 && (
              <ApplicationManager
                applications={savedApplications}
                onExport={exportApplication}
                onContinue={(app) => setCurrentApplication(app)}
                language={language}
              />
            )}

            <section id="discover-section" className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  {language === 'en' ? 'Discover Your Perfect Internship' : 'अपनी परफेक्ट इंटर्नशिप खोजें'}
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  {language === 'en' 
                    ? 'Tell us about your skills, interests, and preferences. Our AI-powered system will match you with the most suitable government internships.'
                    : 'अपने कौशल, रुचियों और प्राथमिकताओं के बारे में बताएं। हमारी AI-पावर्ड प्रणाली आपको सबसे उपयुक्त सरकारी इंटर्नशिप से मिलाएगी।'
                  }
                </p>
              </div>

              {/* Login Prompt for Anonymous Users */}
              {!currentUser && (
                <div className="max-w-2xl mx-auto mb-8 p-6 bg-yellow-50 border border-yellow-200 rounded-xl text-center">
                  <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                    {language === 'en' ? 'Login to Save Your Progress' : 'अपनी प्रगति सहेजने के लिए लॉगिन करें'}
                  </h3>
                  <p className="text-yellow-700 mb-4">
                    {language === 'en' 
                      ? 'Create an account to save your applications and get personalized recommendations.'
                      : 'अपने आवेदन सहेजने और व्यक्तिगत सिफारिशें प्राप्त करने के लिए एक खाता बनाएं।'
                    }
                  </p>
                  <button
                    onClick={() => setShowLogin(true)}
                    className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition-colors font-medium"
                  >
                    {language === 'en' ? 'Login / Sign Up' : 'लॉगिन / साइन अप'}
                  </button>
                </div>
              )}

              <ResumeUpload 
                onFile={handleResumeUpload} 
                language={language} 
              />
              
              {resume && (
                <p className="text-center text-green-600 mb-6">
                  ✅ {language === 'en' ? 'Resume uploaded successfully:' : 'रिज्यूमे सफलतापूर्वक अपलोड हुआ:'} {resume.name}
                </p>
              )}

              {extractedData && (
                <div className="max-w-2xl mx-auto mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-blue-700 text-center">
                    {language === 'en' 
                      ? '✓ Resume data extracted and form pre-filled automatically'
                      : '✓ रिज्यूमे डेटा निकाला गया और फॉर्म स्वचालित रूप से भर दिया गया'
                    }
                  </p>
                </div>
              )}

              <div className="max-w-4xl mx-auto">
                <CandidateForm 
                  onSubmit={handleFormSubmit}
                  onSaveDraft={(data) => handleFormSubmit(data, true)}
                  onExport={exportApplication}
                  language={language}
                  prefillData={extractedData}
                  currentApplication={currentApplication}
                />
              </div>
            </section>

            {recommendations.length > 0 && (
              <section id="internships" className="mb-20">
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">
                    {language === 'en' ? 'Your Personalized Recommendations' : 'आपकी व्यक्तिगत सिफारिशें'}
                  </h2>
                  <p className="text-xl text-gray-600">
                    {language === 'en' 
                      ? 'Based on your profile, we found these perfect matches for you'
                      : 'आपकी प्रोफाइल के आधार पर, हमें आपके लिए ये उत्तम मैच मिले'
                    }
                  </p>
                </div>
                
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {recommendations.map((intern) => (
                    <InternshipCard 
                      key={intern.id} 
                      intern={intern} 
                      language={language} 
                      onExport={() => exportApplication(currentApplication)}
                    />
                  ))}
                </div>
              </section>
            )}

            <section id="about">
              <Testimonials language={language} />
            </section>

            <section id="contact" className="py-20">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  {language === 'en' ? 'Contact Us' : 'हमसे संपर्क करें'}
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  {language === 'en' 
                    ? 'Have questions? Get in touch with our team for support and guidance.'
                    : 'कोई प्रश्न हैं? समर्थन और मार्गदर्शन के लिए हमारी टीम से संपर्क करें।'
                  }
                </p>
              </div>
              <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {language === 'en' ? 'Get in Touch' : 'संपर्क में रहें'}
                    </h3>
                    <div className="space-y-3">
                      <p className="text-gray-600">📧 contact@sarkariintern.com</p>
                      <p className="text-gray-600">📞 +91-9876543210</p>
                      <p className="text-gray-600">📍 New Delhi, India</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {language === 'en' ? 'Quick Support' : 'त्वरित सहायता'}
                    </h3>
                    <p className="text-gray-600">
                      {language === 'en' 
                        ? 'Our support team is available Monday to Friday, 9 AM to 6 PM.'
                        : 'हमारी सहायता टीम सोमवार से शुक्रवार, सुबह 9 बजे से शाम 6 बजे तक उपलब्ध है।'
                      }
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </main>

          <Chatbot language={language} />
          <Footer language={language} />
        </>
      )}
    </div>
  );
}

export default App;