import { useState, useEffect } from "react";
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
import "./App.css";

function App() {
  const [recommendations, setRecommendations] = useState([]);
  const [resume, setResume] = useState(null);
  const [language, setLanguage] = useState('en');
  const [extractedData, setExtractedData] = useState(null);
  const [savedApplications, setSavedApplications] = useState([]);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);
  const [currentApplication, setCurrentApplication] = useState(null);

  // Load saved applications from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('sarkariInternApplications');
    if (saved) {
      setSavedApplications(JSON.parse(saved));
    }
  }, []);

  // Enhanced internship dataset
  const internships = [
    {
      id: 1,
      title: "Digital India Internship",
      company: "Ministry of Electronics & IT",
      sector: "Technology",
      location: "Delhi, Bangalore, Hyderabad",
      stipend: "₹15,000/month",
      duration: "3 months",
      skills: ["React", "Python", "JavaScript", "Digital Governance", "Web Development"],
      education: ["Bachelors", "Masters"],
      description: "Work on digital governance projects and citizen services",
      deadline: "2024-03-15",
      applyLink: "#",
      applicants: 45
    },
    {
      id: 2,
      title: "Health Research Fellowship",
      company: "Ministry of Health & Family Welfare",
      sector: "Healthcare",
      location: "Delhi, Mumbai, Chennai",
      stipend: "₹20,000/month",
      duration: "6 months",
      skills: ["Research", "Data Analysis", "Biology", "Public Health", "Statistics"],
      education: ["Masters", "PhD"],
      description: "Research in public health and healthcare systems",
      deadline: "2024-04-01",
      applyLink: "#",
      applicants: 32
    },
    // ... other internships (same as before)
  ];

  // Save application to localStorage
  const saveApplication = (formData, resumeFile = null, isComplete = false) => {
    const application = {
      id: Date.now().toString(),
      formData,
      resume: resumeFile ? resumeFile.name : null,
      timestamp: new Date().toISOString(),
      isComplete,
      matchScore: 0,
      recommendations: []
    };

    const updatedApplications = [...savedApplications, application];
    setSavedApplications(updatedApplications);
    localStorage.setItem('sarkariInternApplications', JSON.stringify(updatedApplications));

    // Schedule reminder for incomplete applications
    if (!isComplete) {
      scheduleReminder(application);
    }

    return application;
  };

  // Schedule email/SMS reminder
  const scheduleReminder = (application) => {
    // In a real app, this would call your backend API
    console.log('Reminder scheduled for application:', application.id);
    
    // Simulate reminder after 24 hours
    setTimeout(() => {
      if (!application.isComplete) {
        sendReminder(application);
      }
    }, 24 * 60 * 60 * 1000); // 24 hours
  };

  // Send reminder notification
  const sendReminder = (application) => {
    // Simulate sending email/SMS
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

  // Enhanced rule-based matching algorithm
  const findMatchingInternships = (formData) => {
    const scoredInternships = internships.map(intern => {
      let score = 0;
      const matchedSkills = [];
      const matchReasons = [];

      // Skill matching (40% weight)
      formData.skills.forEach(skill => {
        if (intern.skills.some(internSkill => 
          internSkill.toLowerCase().includes(skill.toLowerCase()) ||
          skill.toLowerCase().includes(internSkill.toLowerCase())
        )) {
          score += 8;
          matchedSkills.push(skill);
          matchReasons.push(`Skill: ${skill}`);
        }
      });

      // Sector matching (30% weight)
      if (formData.sectors.some(sector => 
        intern.sector.toLowerCase().includes(sector.toLowerCase()) ||
        sector.toLowerCase().includes(intern.sector.toLowerCase())
      )) {
        score += 30;
        matchReasons.push(`Sector: ${intern.sector}`);
      }

      // Location matching (20% weight)
      if (formData.location && intern.location.toLowerCase().includes(formData.location.toLowerCase())) {
        score += 20;
        matchReasons.push(`Location: ${intern.location}`);
      }

      // Education matching (10% weight)
      if (formData.education && intern.education.includes(formData.education)) {
        score += 10;
        matchReasons.push(`Education: ${formData.education}`);
      }

      return {
        ...intern,
        matchScore: Math.min(score, 100),
        matchedSkills,
        matchReasons
      };
    });

    return scoredInternships
      .filter(intern => intern.matchScore > 0)
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 5);
  };

  const handleFormSubmit = (formData, saveAsDraft = false) => {
    if (saveAsDraft) {
      const application = saveApplication(formData, resume, false);
      setCurrentApplication(application);
      alert(language === 'en' 
        ? 'Application saved as draft! You can continue later.' 
        : 'आवेदन ड्राफ्ट के रूप में सहेजा गया! आप बाद में जारी रख सकते हैं।'
      );
      return;
    }

    const matched = findMatchingInternships(formData);
    setRecommendations(matched);
    
    // Save as complete application
    const application = saveApplication(formData, resume, true);
    setCurrentApplication(application);
  };

  const handleStartJourney = () => {
    document.getElementById("discover-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
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

  return (
    <div className="min-h-screen bg-white">
      <Header 
        onStartJourney={handleStartJourney} 
        onLanguageChange={handleLanguageChange} 
        onNavigate={handleNavigation} 
      />
      
      {/* Admin Dashboard Toggle (Hidden in production) */}
      <div className="fixed top-20 right-4 z-40">
        <button
          onClick={() => setShowAdminDashboard(!showAdminDashboard)}
          className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium"
        >
          {showAdminDashboard ? 'User View' : 'Admin View'}
        </button>
      </div>

      {showAdminDashboard ? (
       // In your App.jsx, update the AdminDashboard component call:
<AdminDashboard 
  applications={savedApplications}
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