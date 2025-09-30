import { useState, useEffect } from 'react';

const CandidateForm = ({ onSubmit, onSaveDraft, onExport, language, prefillData, currentApplication, onResumeParse }) => {
  const [formData, setFormData] = useState({
    education: '',
    skills: [],
    sectors: [],
    location: '',
    currentSkill: '',
    // New fields
    locationPreference: '',
    sectorInterest: '',
    category: '',
    background: '',
    pastInternship: '',
    // Personal info fields for resume parsing
    name: '',
    email: ''
  });

  const [step, setStep] = useState(1);
  const [resumeFile, setResumeFile] = useState(null);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [recommendations, setRecommendations] = useState([]);

  const translations = {
    en: {
      title: "Tell Us About Yourself",
      education: "Education Level",
      skills: "Your Skills",
      sectors: "Preferred Sectors",
      location: "Preferred Location",
      addSkill: "Add Skill",
      next: "Next",
      previous: "Previous",
      submit: "Get Smart Recommendations",
      saveDraft: "Save Draft",
      exportApplication: "Export Application",
      skillPlaceholder: "Type a skill and press Enter",
      locationPlaceholder: "Enter your preferred city or state",
      steps: ["Personal Info", "Education", "Skills", "Background", "Location"],
      educationOptions: {
        highschool: "High School",
        bachelors: "Bachelor's Degree",
        masters: "Master's Degree",
        phd: "PhD"
      },
      sectorOptions: {
        technology: "Technology",
        healthcare: "Healthcare",
        education: "Education",
        agriculture: "Agriculture",
        finance: "Finance",
        environment: "Environment",
        marketing: "Marketing"
      },
      // New translations
      name: "Full Name",
      email: "Email Address",
      locationPreference: "Location Preference",
      sectorInterest: "Sector Interest",
      category: "Category",
      background: "Rural/Urban Background",
      pastInternship: "Past Internship Experience",
      uploadResume: "Upload Your Resume (Optional)",
      resumeHelp: "Uploading your resume helps us provide better recommendations",
      dragDrop: "Drag & drop your resume here",
      or: "or",
      browseFiles: "Browse Files",
      supportedFormats: "Supported formats: PDF, DOC, DOCX - Max 5MB",
      personalInfo: "Personal Information",
      locationOptions: {
        metro: "Metro City",
        tier2: "Tier 2 City",
        tier3: "Tier 3 City",
        rural: "Rural Area"
      },
      sectorInterestOptions: {
        it: "Information Technology",
        finance: "Finance",
        marketing: "Marketing",
        healthcare: "Healthcare",
        education: "Education",
        engineering: "Engineering",
        design: "Design",
        research: "Research"
      },
      categoryOptions: {
        general: "General",
        obc: "OBC",
        sc: "SC",
        st: "ST"
      },
      backgroundOptions: {
        rural: "Rural",
        urban: "Urban"
      },
      internshipOptions: {
        yes: "Yes",
        no: "No"
      },
      // Recommendations translations
      recommendations: "Smart Recommended Internships",
      noRecommendations: "No recommendations found. Please try different criteria.",
      applyNow: "Apply Now",
      stipend: "Stipend",
      duration: "Duration",
      location: "Location",
      viewDetails: "View Details",
      scoreBreakdown: "Score Breakdown",
      skillsScore: "Skills Match",
      locationScore: "Location Match",
      categoryBoost: "Category Boost",
      pastPenalty: "Past Internship",
      finalScore: "Final Score"
    },
    hi: {
      title: "अपने बारे में बताएं",
      education: "शैक्षिक स्तर",
      skills: "आपके कौशल",
      sectors: "पसंदीदा क्षेत्र",
      location: "पसंदीदा स्थान",
      addSkill: "कौशल जोड़ें",
      next: "अगला",
      previous: "पिछला",
      submit: "स्मार्ट सिफारिशें प्राप्त करें",
      saveDraft: "ड्राफ्ट सहेजें",
      exportApplication: "आवेदन निर्यात करें",
      skillPlaceholder: "कौशल टाइप करें और एंटर दबाएं",
      locationPlaceholder: "अपना पसंदीदा शहर या राज्य दर्ज करें",
      steps: ["व्यक्तिगत जानकारी", "शिक्षा", "कौशल", "पृष्ठभूमि", "स्थान"],
      educationOptions: {
        highschool: "हाई स्कूल",
        bachelors: "स्नातक",
        masters: "परास्नातक",
        phd: "डॉक्टरेट"
      },
      sectorOptions: {
        technology: "प्रौद्योगिकी",
        healthcare: "स्वास्थ्य सेवा",
        education: "शिक्षा",
        agriculture: "कृषि",
        finance: "वित्त",
        environment: "पर्यावरण",
        marketing: "मार्केटिंग"
      },
      // New Hindi translations
      name: "पूरा नाम",
      email: "ईमेल पता",
      locationPreference: "स्थान वरीयता",
      sectorInterest: "क्षेत्र रुचि",
      category: "श्रेणी",
      background: "ग्रामीण/शहरी पृष्ठभूमि",
      pastInternship: "पिछला इंटर्नशिप अनुभव",
      uploadResume: "अपना रिज्यूमे अपलोड करें (वैकल्पिक)",
      resumeHelp: "अपना रिज्यूमे अपलोड करने से हमें बेहतर सिफारिशें प्रदान करने में मदद मिलती है",
      dragDrop: "अपना रिज्यूमे यहाँ खींचें और छोड़ें",
      or: "या",
      browseFiles: "फ़ाइलें ब्राउज़ करें",
      supportedFormats: "समर्थित प्रारूप: PDF, DOC, DOCX - अधिकतम 5MB",
      personalInfo: "व्यक्तिगत जानकारी",
      locationOptions: {
        metro: "मेट्रो शहर",
        tier2: "टियर 2 शहर",
        tier3: "टियर 3 शहर",
        rural: "ग्रामीण क्षेत्र"
      },
      sectorInterestOptions: {
        it: "सूचना प्रौद्योगिकी",
        finance: "वित्त",
        marketing: "मार्केटिंग",
        healthcare: "स्वास्थ्य सेवा",
        education: "शिक्षा",
        engineering: "इंजीनियरिंग",
        design: "डिजाइन",
        research: "अनुसंधान"
      },
      categoryOptions: {
        general: "सामान्य",
        obc: "ओबीसी",
        sc: "एससी",
        st: "एसटी"
      },
      backgroundOptions: {
        rural: "ग्रामीण",
        urban: "शहरी"
      },
      internshipOptions: {
        yes: "हाँ",
        no: "नहीं"
      },
      // Recommendations Hindi translations
      recommendations: "स्मार्ट सुझाए गए इंटर्नशिप",
      noRecommendations: "कोई सिफारिश नहीं मिली। कृपया अलग मानदंड आज़माएं।",
      applyNow: "अभी आवेदन करें",
      stipend: "वजीफा",
      duration: "अवधि",
      location: "स्थान",
      viewDetails: "विवरण देखें",
      scoreBreakdown: "स्कोर विवरण",
      skillsScore: "कौशल मेल",
      locationScore: "स्थान मेल",
      categoryBoost: "श्रेणी बूस्ट",
      pastPenalty: "पिछला इंटर्नशिप",
      finalScore: "अंतिम स्कोर"
    }
  };

  // Auto-fill form when resume data is available
  useEffect(() => {
    if (prefillData) {
      setFormData(prev => ({
        ...prev,
        name: prefillData.name || '',
        email: prefillData.email || '',
        education: prefillData.education || '',
        skills: prefillData.skills || [],
        sectors: prefillData.sectors || [],
        location: prefillData.location || '',
        locationPreference: prefillData.locationPreference || '',
        sectorInterest: prefillData.sectorInterest || '',
        category: prefillData.category || '',
        background: prefillData.background || '',
        pastInternship: prefillData.pastInternship || ''
      }));
    }
  }, [prefillData]);

  // Load existing application data
  useEffect(() => {
    if (currentApplication) {
      setFormData(currentApplication.formData);
      if (currentApplication.formData.location) setStep(5);
      else if (currentApplication.formData.background) setStep(4);
      else if (currentApplication.formData.skills.length > 0) setStep(3);
      else if (currentApplication.formData.education) setStep(2);
      else setStep(1);
    }
  }, [currentApplication]);

  const t = translations[language] || translations.en;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSkillAdd = () => {
    if (formData.currentSkill.trim() && !formData.skills.includes(formData.currentSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, prev.currentSkill.trim()],
        currentSkill: ''
      }));
    }
  };

  const handleSkillRemove = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSkillAdd();
    }
  };

  const handleSectorToggle = (sector) => {
    setFormData(prev => ({
      ...prev,
      sectors: prev.sectors.includes(sector)
        ? prev.sectors.filter(s => s !== sector)
        : [...prev.sectors, sector]
    }));
  };

  // Enhanced matching algorithm with weighted scoring
  const calculateMatchScore = (candidate, internship) => {
    let skillsScore = 0;
    let locationScore = 0;
    let categoryBoost = 0;
    let pastPenalty = 0;

    // Skills Match (40%)
    const candidateSkills = candidate.skills.map(skill => skill.toLowerCase());
    const internshipSkills = internship.requiredSkills.map(skill => skill.toLowerCase());
    const commonSkills = candidateSkills.filter(skill => internshipSkills.includes(skill));
    skillsScore = internshipSkills.length > 0 ? (commonSkills.length / internshipSkills.length) * 40 : 0;

    // Location Match (20%)
    if (candidate.locationPreference === internship.locationType) {
      locationScore = 20;
    } else if (
      (candidate.locationPreference === 'metro' && internship.locationType === 'tier2') ||
      (candidate.locationPreference === 'tier2' && internship.locationType === 'metro')
    ) {
      locationScore = 15;
    } else {
      locationScore = 5;
    }

    // Category + Rural Boost (20%)
    if (candidate.category === 'sc' || candidate.category === 'st') {
      categoryBoost += 10;
    }
    if (candidate.background === 'rural') {
      categoryBoost += 10;
    }

    // Past Participation Penalty (20%)
    if (candidate.pastInternship === 'yes') {
      pastPenalty = -20;
    }

    const finalScore = Math.min(100, Math.max(0, skillsScore + locationScore + categoryBoost + pastPenalty));

    return {
      skills: Math.round(skillsScore),
      location: Math.round(locationScore),
      categoryBoost: Math.round(categoryBoost),
      pastPenalty: Math.round(pastPenalty),
      finalScore: Math.round(finalScore)
    };
  };

  // Generate mock recommendations with AI matchmaking
  const generateRecommendations = (data) => {
    const mockInternships = [
      {
        id: 1,
        title: language === 'hi' ? "फ्रंटएंड डेवलपर इंटर्न" : "Frontend Developer Intern",
        company: "Tech Solutions Inc.",
        stipend: "₹15,000/month",
        duration: "3 months",
        location: "Delhi",
        locationType: "metro",
        description: language === 'hi' 
          ? "React.js प्रोजेक्ट्स और आधुनिक वेब डेवलपमेंट पर काम करें"
          : "Work on React.js projects and modern web development",
        requiredSkills: ["JavaScript", "React", "HTML", "CSS", "Tailwind CSS"],
        sector: "it"
      },
      {
        id: 2,
        title: language === 'hi' ? "मार्केटिंग इंटर्न" : "Marketing Intern",
        company: "Digital Marketing Pro",
        stipend: "₹12,000/month",
        duration: "6 months",
        location: "Mumbai",
        locationType: "metro",
        description: language === 'hi'
          ? "सोशल मीडिया प्रबंधन और कंटेंट क्रिएशन"
          : "Social media management and content creation",
        requiredSkills: ["Marketing", "Social Media", "Content Writing", "SEO"],
        sector: "marketing"
      },
      {
        id: 3,
        title: language === 'hi' ? "डेटा एनालिस्ट इंटर्न" : "Data Analyst Intern",
        company: "Analytics Corp",
        stipend: "₹18,000/month",
        duration: "4 months",
        location: "Remote",
        locationType: "tier2",
        description: language === 'hi'
          ? "Python और SQL का उपयोग करके डेटा विश्लेषण और विज़ुअलाइज़ेशन"
          : "Data analysis and visualization using Python and SQL",
        requiredSkills: ["Python", "SQL", "Data Analysis", "Excel"],
        sector: "it"
      },
      {
        id: 4,
        title: language === 'hi' ? "ग्रामीण विकास इंटर्न" : "Rural Development Intern",
        company: "PM Internship Smart Placement",
        stipend: "₹10,000/month",
        duration: "6 months",
        location: "Rural Maharashtra",
        locationType: "rural",
        description: language === 'hi'
          ? "ग्रामीण विकास परियोजनाओं और सामुदायिक आउटरीच पर काम करें"
          : "Work on rural development projects and community outreach",
        requiredSkills: ["Community Development", "Communication", "Project Management"],
        sector: "education"
      }
    ];

    return mockInternships
      .map(internship => ({
        ...internship,
        score: calculateMatchScore(data, internship)
      }))
      .filter(rec => rec.score.finalScore > 40)
      .sort((a, b) => b.score.finalScore - a.score.finalScore);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Generate recommendations
    const newRecommendations = generateRecommendations(formData);
    setRecommendations(newRecommendations);
    setShowRecommendations(true);
    
    // Call the onSubmit prop if provided (for existing functionality)
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 5));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleSaveDraft = () => {
    if (onSaveDraft) {
      onSaveDraft(formData);
    }
  };

  const handleExport = () => {
    if (onExport && currentApplication) {
      onExport(currentApplication);
    }
  };

  // Resume upload handler with enhanced parsing
  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeFile(file);
      
      // Simulate resume parsing
      if (onResumeParse) {
        const parsedData = await parseResume(file);
        onResumeParse(parsedData);
        
        // Auto-fill form with parsed data
        setFormData(prev => ({
          ...prev,
          name: parsedData.name || prev.name,
          email: parsedData.email || prev.email,
          skills: parsedData.skills || prev.skills,
          education: parsedData.education || prev.education
        }));
      }
    }
  };

  // Enhanced resume parsing function
  const parseResume = async (file) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockParsedData = {
          name: "John Doe",
          email: "john.doe@example.com",
          skills: ["JavaScript", "React", "Node.js", "Python", "Tailwind CSS", "HTML", "CSS", "Git"],
          education: "bachelors"
        };
        resolve(mockParsedData);
      }, 1000);
    });
  };

  // Drag and drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleResumeUpload({ target: { files } });
    }
  };

  // Score breakdown component
  const ScoreBreakdown = ({ score }) => (
    <div className="bg-gray-50 rounded-lg p-4 mt-3">
      <h4 className="font-medium text-gray-700 mb-2">{t.scoreBreakdown}</h4>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="flex justify-between">
          <span>{t.skillsScore}:</span>
          <span className="font-medium text-green-600">+{score.skills}</span>
        </div>
        <div className="flex justify-between">
          <span>{t.locationScore}:</span>
          <span className="font-medium text-blue-600">+{score.location}</span>
        </div>
        <div className="flex justify-between">
          <span>{t.categoryBoost}:</span>
          <span className="font-medium text-purple-600">+{score.categoryBoost}</span>
        </div>
        <div className="flex justify-between">
          <span>{t.pastPenalty}:</span>
          <span className="font-medium text-red-600">{score.pastPenalty}</span>
        </div>
        <div className="col-span-2 border-t pt-2 mt-1">
          <div className="flex justify-between font-bold">
            <span>{t.finalScore}:</span>
            <span className="text-lg">{score.finalScore}/100</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                {t.name}
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder={language === 'en' ? 'Enter your full name' : 'अपना पूरा नाम दर्ज करें'}
                required
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                {t.email}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder={language === 'en' ? 'Enter your email address' : 'अपना ईमेल पता दर्ज करें'}
                required
              />
            </div>

            {/* Single Resume Upload Section - Clean Design */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                {t.uploadResume}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {t.resumeHelp}
              </p>
              
              <div
                className="border-2 border-dashed border-gray-400 rounded-lg p-6 mb-4 cursor-pointer hover:border-blue-500 transition-colors"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <p className="text-gray-600 mb-2">{t.dragDrop}</p>
                <p className="text-gray-500 text-sm mb-3">{t.or}</p>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleResumeUpload}
                  className="hidden"
                  id="resume-upload"
                />
                <label
                  htmlFor="resume-upload"
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors cursor-pointer inline-block"
                >
                  {t.browseFiles}
                </label>
              </div>
              
              <p className="text-xs text-gray-500 mb-4">
                {t.supportedFormats}
              </p>
              
              {resumeFile && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 inline-flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span className="text-green-700 text-sm">{resumeFile.name}</span>
                </div>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <label className="block text-lg font-medium text-gray-700">
              {t.education}
            </label>
            <select
              name="education"
              value={formData.education}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">{language === 'en' ? 'Select Education Level' : 'शैक्षिक स्तर चुनें'}</option>
              {Object.entries(t.educationOptions).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <label className="block text-lg font-medium text-gray-700">
              {t.skills}
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={formData.currentSkill}
                onChange={(e) => setFormData(prev => ({ ...prev, currentSkill: e.target.value }))}
                onKeyPress={handleKeyPress}
                placeholder={t.skillPlaceholder}
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="button"
                onClick={handleSkillAdd}
                className="bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition-colors"
              >
                {t.addSkill}
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-2"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleSkillRemove(skill)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                {t.locationPreference}
              </label>
              <select
                name="locationPreference"
                value={formData.locationPreference}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">{language === 'en' ? 'Select Location Preference' : 'स्थान वरीयता चुनें'}</option>
                {Object.entries(t.locationOptions).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                {t.sectorInterest}
              </label>
              <select
                name="sectorInterest"
                value={formData.sectorInterest}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">{language === 'en' ? 'Select Sector Interest' : 'क्षेत्र रुचि चुनें'}</option>
                {Object.entries(t.sectorInterestOptions).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                {t.category}
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">{language === 'en' ? 'Select Category' : 'श्रेणी चुनें'}</option>
                {Object.entries(t.categoryOptions).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                {t.background}
              </label>
              <div className="flex gap-4">
                {Object.entries(t.backgroundOptions).map(([value, label]) => (
                  <label key={value} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="background"
                      value={value}
                      checked={formData.background === value}
                      onChange={handleInputChange}
                      className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-700">{label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                {t.pastInternship}
              </label>
              <div className="flex gap-4">
                {Object.entries(t.internshipOptions).map(([value, label]) => (
                  <label key={value} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="pastInternship"
                      value={value}
                      checked={formData.pastInternship === value}
                      onChange={handleInputChange}
                      className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-700">{label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                {t.sectors}
              </label>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(t.sectorOptions).map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => handleSectorToggle(value)}
                    className={`p-3 border rounded-lg text-left transition-colors ${
                      formData.sectors.includes(value)
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                {t.location}
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder={t.locationPlaceholder}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderRecommendations = () => {
    if (!showRecommendations) return null;

    return (
      <div className="mt-8 bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          {t.recommendations}
        </h3>
        
        {recommendations.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">{t.noRecommendations}</p>
          </div>
        ) : (
          <div className="space-y-6">
            {recommendations.map((internship) => (
              <div key={internship.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900">{internship.title}</h4>
                    <p className="text-gray-600">{internship.company}</p>
                  </div>
                  <div className="text-right">
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      {internship.score.finalScore}% Match
                    </span>
                    <ScoreBreakdown score={internship.score} />
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4">{internship.description}</p>
                
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <span>💰</span>
                    <span><strong>{t.stipend}:</strong> {internship.stipend}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>⏱️</span>
                    <span><strong>{t.duration}:</strong> {internship.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>📍</span>
                    <span><strong>{t.location}:</strong> {internship.location}</span>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                    {t.applyNow}
                  </button>
                  <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                    {t.viewDetails}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <button
          onClick={() => setShowRecommendations(false)}
          className="mt-6 bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
        >
          {language === 'en' ? 'Back to Form' : 'फॉर्म पर वापस जाएं'}
        </button>
      </div>
    );
  };

  if (showRecommendations) {
    return renderRecommendations();
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
        {t.title}
      </h2>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {t.steps.map((stepLabel, index) => (
            <span
              key={index}
              className={`text-sm font-medium ${
                index + 1 <= step ? 'text-blue-600' : 'text-gray-400'
              }`}
            >
              {stepLabel}
            </span>
          ))}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(step / 5) * 100}%` }}
          ></div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {renderStep()}

        <div className="flex justify-between mt-8">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={prevStep}
              disabled={step === 1}
              className={`px-6 py-3 rounded-lg font-medium ${
                step === 1
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-500 text-white hover:bg-gray-600'
              }`}
            >
              {t.previous}
            </button>

            {step < 5 && onSaveDraft && (
              <button
                type="button"
                onClick={handleSaveDraft}
                className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors font-medium"
              >
                {t.saveDraft}
              </button>
            )}
          </div>

          <div className="flex gap-3">
            {step === 5 && currentApplication && onExport && (
              <button
                type="button"
                onClick={handleExport}
                className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors font-medium"
              >
                {t.exportApplication}
              </button>
            )}

            {step < 5 ? (
              <button
                type="button"
                onClick={nextStep}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium"
              >
                {t.next}
              </button>
            ) : (
              <button
                type="submit"
                className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors font-medium"
              >
                {t.submit}
              </button>
            )}
          </div>
        </div>
      </form>

      {prefillData && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-700 text-sm text-center">
            {language === 'en' 
              ? '✓ Form pre-filled with resume data'
              : '✓ रिज्यूमे डेटा के साथ फॉर्म पहले से भरा हुआ'
            }
          </p>
        </div>
      )}

      {currentApplication && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-700 text-sm text-center">
            {language === 'en' 
              ? '✓ Continuing from saved application'
              : '✓ सहेजे गए आवेदन से जारी रखा जा रहा है'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default CandidateForm;