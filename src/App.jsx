import { useState, useEffect } from "react";
import { useAuth } from "./context/AuthContext";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import CandidateForm from "./components/CandidateForm";
import InternshipCard from "./components/InternshipCard";
import Testimonials from "./components/Testimonials";
import Chatbot from "./components/Chatbot";
import Footer from "./components/Footer";
import AdminDashboard from "./components/AdminDashboard";
import ApplicationManager from "./components/ApplicationManager";
import Login from "./components/Login";
import Signup from "./components/Signup";
import "./App.css";
import { internships, getSortedInternshipsForCandidate } from "./data/internships";

function App() {
  // Initialize demo user data
useEffect(() => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  
  // Create admin user if it doesn't exist
  const adminUserExists = users.find(user => user.email === 'admin@pminternship.com');
  if (!adminUserExists) {
    const adminUser = {
      id: 'admin-user-001',
      name: "Admin User",
      email: "admin@pminternship.com",
      password: "admin123",
      role: "admin",
      enrollmentId: "PM-2024-ADMIN",
      createdAt: new Date().toISOString(),
      profileComplete: true
    };
    users.push(adminUser);
    localStorage.setItem('users', JSON.stringify(users));
    console.log('Admin user created successfully');
  }
  
  // Create demo user if it doesn't exist
  if (users.length === 0 || !users.find(user => user.email === 'demo@pminternship.com')) {
    const demoUser = {
      id: 'demo-user-001',
      name: "Demo User",
      email: "demo@pminternship.com",
      password: "password123",
      enrollmentId: "PM-2024-0001",
      createdAt: new Date().toISOString(),
      profileComplete: false
    };
    users.push(demoUser);
    localStorage.setItem('users', JSON.stringify(users));
  }
}, []);
  // ------------------- STATES -------------------
  const [recommendations, setRecommendations] = useState([]);
  const [resume, setResume] = useState(null);
  const [extractedData, setExtractedData] = useState(null);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);
  const [currentApplication, setCurrentApplication] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [language, setLanguage] = useState("en");

  const { currentUser, getUserApplications, saveUserApplication } = useAuth();

  // Load user's applications when user changes
  const savedApplications = currentUser ? getUserApplications() : [];

  // Save application to user's data
  const saveApplication = (formData, resumeFile = null, isComplete = false, matchScore = 0) => {
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
      matchScore,
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
    console.log('Smart reminder scheduled for application:', application.id);
    
    setTimeout(() => {
      if (!application.isComplete) {
        sendReminder(application);
      }
    }, 24 * 60 * 60 * 1000);
  };

  // Send reminder notification
  const sendReminder = (application) => {
    const message = language === 'en' 
      ? `Smart Reminder: Complete your application for PM Internship Smart Placement. Continue your journey to the perfect internship!`
      : `स्मार्ट अनुस्मारक: PM इंटर्नशिप स्मार्ट प्लेसमेंट के लिए अपना आवेदन पूरा करें। सही इंटर्नशिप की ओर अपनी यात्रा जारी रखें!`;

    alert(message);
    console.log('Smart reminder sent for application:', application.id);
  };

  // Resume parsing simulation with enhanced data extraction
  const parseResume = (file) => {
    const sampleData = {
      name: "Aarav Sharma",
      email: "aarav.sharma@example.com",
      education: "bachelors",
      skills: ["JavaScript", "React", "Python", "Data Analysis", "Web Development", "HTML", "CSS", "Git"],
      experience: "1-2 years",
      sectors: ["Technology", "Finance"],
      location: "Delhi",
      locationPreference: "metro",
      sectorInterest: "it",
      category: "general",
      background: "urban",
      pastInternship: "no"
    };
    
    setTimeout(() => {
      setExtractedData(sampleData);
      alert(language === 'en' 
        ? 'Resume analyzed successfully! Personal details and skills have been auto-filled using AI.' 
        : 'रिज्यूमे सफलतापूर्वक विश्लेषित किया गया! व्यक्तिगत विवरण और कौशल AI का उपयोग करके स्वचालित रूप से भर दिए गए हैं।'
      );
    }, 2000);
    
    return sampleData;
  };

  const handleResumeUpload = (file) => {
    setResume(file);
    const extracted = parseResume(file);
    return extracted;
  };

  // Enhanced AI-powered matching with weighted scoring
  const handleFormSubmit = (formData, saveAsDraft = false) => {
    if (!currentUser) {
      setShowLogin(true);
      return;
    }

    if (saveAsDraft) {
      const application = saveApplication(formData, resume, false);
      if (application) {
        alert(language === 'en' 
          ? 'Application saved as draft! Your progress is secured in our smart system.' 
          : 'आवेदन ड्राफ्ट के रूप में सहेजा गया! आपकी प्रगति हमारी स्मार्ट प्रणाली में सुरक्षित है।'
        );
      }
      return;
    }

    // Use AI matchmaking to get sorted internships
    const matchedInternships = getSortedInternshipsForCandidate(formData);
    
    // Get top recommendations
    const topRecommendations = matchedInternships.slice(0, 6);
    
    setRecommendations(topRecommendations);
    
    // Calculate average match score for the application
    const averageMatchScore = topRecommendations.length > 0 
      ? Math.round(topRecommendations.reduce((sum, intern) => sum + intern.matchScore, 0) / topRecommendations.length)
      : 0;

    // Save as complete application with match score
    const application = saveApplication(formData, resume, true, averageMatchScore);
    setCurrentApplication(application);

    // Show success message
    alert(language === 'en'
      ? `Smart matching complete! Found ${topRecommendations.length} perfect internships for you with AI-powered precision.`
      : `स्मार्ट मिलान पूरा! AI-पावर्ड सटीकता के साथ आपके लिए ${topRecommendations.length} उत्तम इंटर्नशिप मिलीं।`
    );
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

  // Export application data with enhanced resume
  const exportApplication = (application) => {
    const enhancedResume = generateEnhancedResume(application);
    
    const data = {
      candidate: application.formData,
      user: {
        name: application.userName,
        id: application.userId
      },
      resume: application.resume,
      generatedResume: enhancedResume,
      timestamp: application.timestamp,
      matchScore: application.matchScore,
      aiAnalysis: {
        strengths: enhancedResume.aiSuggestions.strengths,
        recommendations: enhancedResume.aiSuggestions.improvementAreas,
        careerPath: enhancedResume.aiSuggestions.careerPath
      },
      platform: "PM Internship Smart Placement"
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `smart-internship-application-${application.id}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    alert(language === 'en'
      ? 'Application exported with AI-enhanced resume and smart matching analysis!'
      : 'आवेदन AI-एन्हांस्ड रिज्यूमे और स्मार्ट मिलान विश्लेषण के साथ निर्यात किया गया!'
    );
  };

  // Generate AI-enhanced resume with smart insights
  const generateEnhancedResume = (application) => {
    const formData = application.formData;
    
    // AI-generated insights based on candidate profile
    const strengths = [];
    const improvementAreas = [];
    
    if (formData.skills.length >= 5) {
      strengths.push("Strong technical skill diversity");
    }
    if (formData.background === 'rural') {
      strengths.push("Rural background - eligible for special initiatives");
    }
    if (formData.category === 'sc' || formData.category === 'st') {
      strengths.push("Diversity candidate - priority consideration");
    }
    if (formData.pastInternship === 'no') {
      strengths.push("Fresh candidate - no prior internship experience");
    }

    if (formData.skills.length < 3) {
      improvementAreas.push("Develop additional technical skills");
    }
    if (!formData.locationPreference) {
      improvementAreas.push("Specify location preferences for better matches");
    }

    return {
      personal: {
        name: formData.name,
        email: formData.email,
        education: formData.education,
        skills: formData.skills,
        preferredSectors: formData.sectors,
        locationPreference: formData.locationPreference,
        category: formData.category,
        background: formData.background,
        pastInternship: formData.pastInternship
      },
      aiSuggestions: {
        strengths,
        improvementAreas,
        careerPath: `${formData.sectorInterest ? formData.sectorInterest.toUpperCase() : formData.sectors[0]} Specialist`,
        recommendedSkills: getRecommendedSkills(formData),
        matchOptimization: "Consider adding more specific skills for higher match scores"
      },
      generatedOn: new Date().toISOString(),
      platform: "PM Internship Smart Placement"
    };
  };

  // Get AI-recommended skills based on profile
  const getRecommendedSkills = (formData) => {
    const recommendations = [];
    
    if (formData.sectorInterest === 'it') {
      recommendations.push("Python", "SQL", "Cloud Computing", "Data Structures");
    } else if (formData.sectorInterest === 'finance') {
      recommendations.push("Financial Modeling", "Excel Advanced", "Accounting", "Risk Analysis");
    } else if (formData.sectorInterest === 'marketing') {
      recommendations.push("Digital Marketing", "SEO", "Content Strategy", "Analytics");
    }
    
    // Always recommend soft skills
    recommendations.push("Communication", "Teamwork", "Problem Solving", "Project Management");
    
    return recommendations;
  };

  // Auto-fill form when resume data is extracted
  useEffect(() => {
    if (extractedData) {
      console.log('AI-extracted resume data available:', extractedData);
    }
  }, [extractedData]);

  // Initialize demo user data
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.length === 0) {
      // Create demo user
      const demoUser = {
        id: 'demo-user-001',
        name: "Demo User",
        email: "demo@pminternship.com",
        password: "password123",
        createdAt: new Date().toISOString()
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
        language={language}
        onLanguageChange={setLanguage}
      />
      
      {/* Admin Dashboard Toggle */}
      {currentUser && currentUser.email === 'admin@pminternship.com' && (
        <div className="fixed top-20 right-4 z-40">
          <button
            onClick={() => setShowAdminDashboard(!showAdminDashboard)}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg hover:from-purple-700 hover:to-blue-700 transition-all"
          >
            {showAdminDashboard ? 
              (language === 'en' ? '👤 User View' : '👤 यूजर व्यू') : 
              (language === 'en' ? '⚙️ Admin Dashboard' : '⚙️ एडमिन डैशबोर्ड')
            }
          </button>
        </div>
      )}

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
            <Hero onStartJourney={handleStartJourney} language={language} />
          </section>
          
          <section id="how-it-works">
            <Features language={language} />
          </section>
          
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            {/* Welcome Message for Logged-in Users */}
            {currentUser && (
              <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl shadow-sm">
                <h2 className="text-2xl font-bold text-blue-900 mb-2">
                  {language === 'en' ? `Welcome to Smart Placement, ${currentUser.name}!` : `स्मार्ट प्लेसमेंट में स्वागत है, ${currentUser.name}!`}
                </h2>
                <p className="text-blue-700">
                  {language === 'en' 
                    ? 'Your AI-powered journey to the perfect government internship starts here.'
                    : 'सही सरकारी इंटर्नशिप की ओर आपकी AI-पावर्ड यात्रा यहाँ से शुरू होती है।'
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
                  {language === 'en' ? 'AI-Powered Smart Placement' : 'AI-पावर्ड स्मार्ट प्लेसमेंट'}
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  {language === 'en' 
                    ? 'Our intelligent system uses weighted AI matching (Skills 40%, Location 20%, Diversity 20%, Experience 20%) to find your perfect internship.'
                    : 'हमारी बुद्धिमान प्रणाली भारित AI मिलान (कौशल 40%, स्थान 20%, विविधता 20%, अनुभव 20%) का उपयोग करके आपकी परफेक्ट इंटर्नशिप ढूंढती है।'
                  }
                </p>
              </div>

              {/* Login Prompt for Anonymous Users */}
              {!currentUser && (
                <div className="max-w-2xl mx-auto mb-8 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl text-center shadow-sm">
                  <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                    {language === 'en' ? '🔐 Smart Account Required' : '🔐 स्मार्ट खाता आवश्यक'}
                  </h3>
                  <p className="text-yellow-700 mb-4">
                    {language === 'en' 
                      ? 'Create your PM Internship Smart Placement account to access AI matching, save applications, and get personalized recommendations.'
                      : 'AI मिलान, आवेदन सहेजने और व्यक्तिगत सिफारिशें प्राप्त करने के लिए अपना PM इंटर्नशिप स्मार्ट प्लेसमेंट खाता बनाएं।'
                    }
                  </p>
                  <button
                    onClick={() => setShowLogin(true)}
                    className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all font-medium shadow-md"
                  >
                    {language === 'en' ? '🚀 Start Smart Journey' : '🚀 स्मार्ट यात्रा शुरू करें'}
                  </button>
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
                  onResumeParse={handleResumeUpload}
                />
              </div>
            </section>

            {recommendations.length > 0 && (
              <section id="internships" className="mb-20">
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">
                    {language === 'en' ? '🎯 Your AI-Matched Opportunities' : '🎯 आपके AI-मिलाए गए अवसर'}
                  </h2>
                  <p className="text-xl text-gray-600">
                    {language === 'en' 
                      ? `Smart algorithm found ${recommendations.length} perfect matches based on your profile`
                      : `स्मार्ट एल्गोरिदम ने आपकी प्रोफाइल के आधार पर ${recommendations.length} उत्तम मैच ढूंढे`
                    }
                  </p>
                </div>
                
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {recommendations.map((intern) => (
                    <InternshipCard 
                      key={intern.id} 
                      intern={intern} 
                      language={language}
                      showScoreBreakdown={true}
                    />
                  ))}
                </div>

                {/* Match Quality Summary */}
                <div className="mt-12 max-w-4xl mx-auto bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                    {language === 'en' ? '📊 Your Match Analysis' : '📊 आपका मिलान विश्लेषण'}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-green-600">{recommendations.filter(r => r.matchScore >= 80).length}</div>
                      <div className="text-sm text-gray-600">{language === 'en' ? 'Excellent Matches' : 'उत्कृष्ट मेल'}</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600">{recommendations.filter(r => r.matchScore >= 60 && r.matchScore < 80).length}</div>
                      <div className="text-sm text-gray-600">{language === 'en' ? 'Good Matches' : 'अच्छे मेल'}</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-yellow-600">{recommendations.filter(r => r.matchScore >= 40 && r.matchScore < 60).length}</div>
                      <div className="text-sm text-gray-600">{language === 'en' ? 'Average Matches' : 'औसत मेल'}</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">{Math.round(recommendations.reduce((sum, r) => sum + r.matchScore, 0) / recommendations.length)}%</div>
                      <div className="text-sm text-gray-600">{language === 'en' ? 'Avg. Match Score' : 'औसत मेल स्कोर'}</div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            <section id="about">
              <Testimonials language={language} />
            </section>

            <section id="contact" className="py-20">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  {language === 'en' ? 'Contact PM Internship Team' : 'PM इंटर्नशिप टीम से संपर्क करें'}
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  {language === 'en' 
                    ? 'Need help with smart placement? Our dedicated team is here to support your journey.'
                    : 'स्मार्ट प्लेसमेंट में सहायता चाहिए? आपकी यात्रा का समर्थन करने के लिए हमारी समर्पित टीम यहाँ है।'
                  }
                </p>
              </div>
              <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {language === 'en' ? 'Smart Support' : 'स्मार्ट सहायता'}
                    </h3>
                    <div className="space-y-3">
                      <p className="text-gray-600">📧 support@pminternship.gov.in</p>
                      <p className="text-gray-600">📞 +91-1800-123-4567</p>
                      <p className="text-gray-600">📍 PM Internship Smart Placement, New Delhi</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {language === 'en' ? 'AI Assistance Hours' : 'AI सहायता घंटे'}
                    </h3>
                    <p className="text-gray-600">
                      {language === 'en' 
                        ? 'Our AI-powered support is available 24/7. Human assistance: Mon-Fri, 9 AM - 6 PM.'
                        : 'हमारी AI-पावर्ड सहायता 24/7 उपलब्ध है। मानव सहायता: सोम-शुक्र, सुबह 9 - शाम 6 बजे।'
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