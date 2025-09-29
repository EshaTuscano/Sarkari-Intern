import { useState, useEffect } from 'react';

const CandidateForm = ({ onSubmit, onSaveDraft, onExport, language, prefillData, currentApplication }) => {
  const [formData, setFormData] = useState({
    education: '',
    skills: [],
    sectors: [],
    location: '',
    currentSkill: ''
  });

  const [step, setStep] = useState(1);

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
      submit: "Get Recommendations",
      saveDraft: "Save Draft",
      exportApplication: "Export Application",
      skillPlaceholder: "Type a skill and press Enter",
      locationPlaceholder: "Enter your preferred city or state",
      steps: ["Education", "Skills", "Sectors", "Location"],
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
      }
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
      submit: "सिफारिशें प्राप्त करें",
      saveDraft: "ड्राफ्ट सहेजें",
      exportApplication: "आवेदन निर्यात करें",
      skillPlaceholder: "कौशल टाइप करें और एंटर दबाएं",
      locationPlaceholder: "अपना पसंदीदा शहर या राज्य दर्ज करें",
      steps: ["शिक्षा", "कौशल", "क्षेत्र", "स्थान"],
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
      }
    }
  };

  // Auto-fill form when resume data is available
  useEffect(() => {
    if (prefillData) {
      setFormData(prev => ({
        ...prev,
        education: prefillData.education || '',
        skills: prefillData.skills || [],
        sectors: prefillData.sectors || [],
        location: prefillData.location || ''
      }));
    }
  }, [prefillData]);

  // Load existing application data
  useEffect(() => {
    if (currentApplication) {
      setFormData(currentApplication.formData);
      // Optionally set the step based on completed fields
      if (currentApplication.formData.location) setStep(4);
      else if (currentApplication.formData.sectors.length > 0) setStep(3);
      else if (currentApplication.formData.skills.length > 0) setStep(2);
    }
  }, [currentApplication]);

  const t = translations[language];

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

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
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

  const renderStep = () => {
    switch (step) {
      case 1:
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

      case 2:
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

      case 3:
        return (
          <div className="space-y-4">
            <label className="block text-lg font-medium text-gray-700">
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
        );

      case 4:
        return (
          <div className="space-y-4">
            <label className="block text-lg font-medium text-gray-700">
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
        );

      default:
        return null;
    }
  };

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
            style={{ width: `${(step / 4) * 100}%` }}
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

            {/* Save Draft Button */}
            {step < 4 && onSaveDraft && (
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
            {/* Export Button in the final step */}
            {step === 4 && currentApplication && onExport && (
              <button
                type="button"
                onClick={handleExport}
                className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors font-medium"
              >
                {t.exportApplication}
              </button>
            )}

            {step < 4 ? (
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