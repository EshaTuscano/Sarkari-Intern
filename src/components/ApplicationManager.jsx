import { useState } from 'react';

const ApplicationManager = ({ applications, onExport, onContinue, language }) => {
  const [showManager, setShowManager] = useState(false);
  const [selectedType, setSelectedType] = useState('all'); // 'all', 'draft', 'completed'

  const translations = {
    en: {
      title: "Your Smart Applications",
      draft: "Draft Applications",
      completed: "Completed Applications",
      all: "All Applications",
      continue: "Continue Editing",
      export: "Export PDF",
      delete: "Delete",
      noApplications: "No saved applications found",
      lastSaved: "Last saved",
      resume: "Resume Application",
      exportResume: "Export Enhanced Resume",
      applicationId: "Application ID",
      status: "Status",
      matchScore: "Match Score",
      actions: "Actions",
      viewDetails: "View Details",
      createdOn: "Created on",
      completedOn: "Completed on",
      smartPlacement: "PM Internship Smart Placement",
      applicationSummary: "Application Summary",
      skills: "Skills",
      location: "Location Preference",
      category: "Category",
      background: "Background",
      pastInternship: "Past Internship",
      filterBy: "Filter by status",
      totalApplications: "Total Applications",
      averageScore: "Avg. Match Score"
    },
    hi: {
      title: "आपके स्मार्ट आवेदन",
      draft: "ड्राफ्ट आवेदन",
      completed: "पूर्ण आवेदन",
      all: "सभी आवेदन",
      continue: "संपादन जारी रखें",
      export: "PDF निर्यात करें",
      delete: "हटाएं",
      noApplications: "कोई सहेजे गए आवेदन नहीं मिले",
      lastSaved: "अंतिम सहेजा गया",
      resume: "आवेदन जारी रखें",
      exportResume: "एन्हांस्ड रिज्यूमे निर्यात करें",
      applicationId: "आवेदन आईडी",
      status: "स्थिति",
      matchScore: "मेल स्कोर",
      actions: "कार्य",
      viewDetails: "विवरण देखें",
      createdOn: "बनाया गया",
      completedOn: "पूर्ण हुआ",
      smartPlacement: "PM इंटर्नशिप स्मार्ट प्लेसमेंट",
      applicationSummary: "आवेदन सारांश",
      skills: "कौशल",
      location: "स्थान वरीयता",
      category: "श्रेणी",
      background: "पृष्ठभूमि",
      pastInternship: "पिछला इंटर्नशिप",
      filterBy: "स्थिति के अनुसार फ़िल्टर करें",
      totalApplications: "कुल आवेदन",
      averageScore: "औसत मेल स्कोर"
    }
  };

  const t = translations[language];

  const draftApplications = applications.filter(app => !app.isComplete);
  const completedApplications = applications.filter(app => app.isComplete);

  const filteredApplications = selectedType === 'all' 
    ? applications 
    : selectedType === 'draft' 
    ? draftApplications 
    : completedApplications;

  // Calculate average match score for completed applications
  const averageMatchScore = completedApplications.length > 0
    ? Math.round(completedApplications.reduce((sum, app) => sum + (app.matchScore || 0), 0) / completedApplications.length)
    : 0;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(language === 'en' ? 'en-IN' : 'hi-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (isComplete, matchScore) => {
    if (!isComplete) {
      return <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">{t.draft}</span>;
    }
    
    if (matchScore >= 80) {
      return <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">Excellent Match</span>;
    } else if (matchScore >= 60) {
      return <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">Good Match</span>;
    } else {
      return <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">Average Match</span>;
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-blue-600';
    return 'text-gray-600';
  };

  const handleDelete = (appId, e) => {
    e.stopPropagation();
    if (window.confirm(language === 'en' ? 'Delete this application?' : 'क्या इस आवेदन को हटाना है?')) {
      const updated = applications.filter(app => app.id !== appId);
      localStorage.setItem('pmInternshipApplications', JSON.stringify(updated));
      window.location.reload(); // Refresh to update state
    }
  };

  const ApplicationCard = ({ app }) => (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h4 className="font-semibold text-gray-900">
              {app.formData.education ? 
                `${app.formData.education} - ${app.formData.sectorInterest || app.formData.sectors?.[0] || 'Multiple Sectors'}` 
                : 'New Application'}
            </h4>
            {getStatusBadge(app.isComplete, app.matchScore)}
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-600 mb-3">
            <div>
              <span className="font-medium">{t.skills}:</span>
              <span className="ml-1">{app.formData.skills?.slice(0, 2).join(', ')}</span>
              {app.formData.skills?.length > 2 && <span className="text-xs"> +{app.formData.skills.length - 2} more</span>}
            </div>
            <div>
              <span className="font-medium">{t.location}:</span>
              <span className="ml-1">{app.formData.locationPreference || 'Not specified'}</span>
            </div>
            <div>
              <span className="font-medium">{t.category}:</span>
              <span className="ml-1">{app.formData.category || 'Not specified'}</span>
            </div>
            <div>
              <span className="font-medium">{t.background}:</span>
              <span className="ml-1">{app.formData.background || 'Not specified'}</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>
              {app.isComplete ? t.completedOn : t.createdOn}: {formatDate(app.timestamp)}
            </span>
            {app.matchScore && (
              <span className={`font-bold ${getScoreColor(app.matchScore)}`}>
                {t.matchScore}: {app.matchScore}%
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-2 pt-3 border-t border-gray-100">
        {!app.isComplete && (
          <button
            onClick={() => onContinue(app)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition-colors flex items-center gap-1"
          >
            <span>✏️</span>
            {t.continue}
          </button>
        )}
        
        <button
          onClick={() => onExport(app)}
          className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-600 transition-colors flex items-center gap-1"
        >
          <span>📄</span>
          {t.export}
        </button>

        <button
          onClick={(e) => handleDelete(app.id, e)}
          className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition-colors flex items-center gap-1"
        >
          <span>🗑️</span>
          {t.delete}
        </button>

        {app.isComplete && (
          <button
            onClick={() => onContinue(app)}
            className="bg-purple-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-600 transition-colors flex items-center gap-1"
          >
            <span>👁️</span>
            {t.viewDetails}
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">{t.title}</h3>
          <p className="text-gray-600 text-sm mt-1">{t.smartPlacement}</p>
        </div>
        <button
          onClick={() => setShowManager(!showManager)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
        >
          <span>{showManager ? '▲' : '▼'}</span>
          {showManager ? 
            (language === 'en' ? 'Hide Applications' : 'आवेदन छुपाएं') : 
            (language === 'en' ? 'Show Applications' : 'आवेदन दिखाएं')
          }
        </button>
      </div>

      {showManager && (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          {/* Statistics Header */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{applications.length}</div>
              <div className="text-sm text-gray-600">{t.totalApplications}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{completedApplications.length}</div>
              <div className="text-sm text-gray-600">{t.completed}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{averageMatchScore}%</div>
              <div className="text-sm text-gray-600">{t.averageScore}</div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 mb-6 border-b border-gray-200">
            {['all', 'draft', 'completed'].map(type => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-t-lg font-medium transition-colors ${
                  selectedType === type
                    ? 'bg-blue-500 text-white border-b-2 border-blue-500'
                    : 'text-gray-600 hover:text-blue-500 hover:bg-blue-50'
                }`}
              >
                {t[type]} ({type === 'all' ? applications.length : type === 'draft' ? draftApplications.length : completedApplications.length})
              </button>
            ))}
          </div>

          {/* Applications List */}
          {filteredApplications.length > 0 ? (
            <div className="space-y-4">
              {filteredApplications.map(app => (
                <ApplicationCard key={app.id} app={app} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-gray-400 text-6xl mb-4">📝</div>
              <p className="text-gray-500 text-lg mb-2">{t.noApplications}</p>
              <p className="text-gray-400 text-sm">
                {language === 'en' 
                  ? 'Start by filling out the application form above'
                  : 'ऊपर दिए गए आवेदन फॉर्म को भरकर शुरू करें'
                }
              </p>
            </div>
          )}

          {/* Quick Actions */}
          {applications.length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="font-medium text-gray-700 mb-3">{language === 'en' ? 'Quick Actions' : 'त्वरित कार्य'}</h4>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    const allCompleted = applications.filter(app => app.isComplete);
                    if (allCompleted.length > 0) {
                      onExport(allCompleted[0]);
                    }
                  }}
                  className="bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-600 transition-colors"
                >
                  {language === 'en' ? 'Export Latest Application' : 'नवीनतम आवेदन निर्यात करें'}
                </button>
                <button
                  onClick={() => {
                    const latestDraft = draftApplications[draftApplications.length - 1];
                    if (latestDraft) {
                      onContinue(latestDraft);
                    }
                  }}
                  className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-orange-600 transition-colors"
                >
                  {language === 'en' ? 'Continue Latest Draft' : 'नवीनतम ड्राफ्ट जारी रखें'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ApplicationManager;