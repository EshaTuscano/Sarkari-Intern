import { useState } from 'react';

const ApplicationManager = ({ applications, onExport, onContinue, language }) => {
  const [showManager, setShowManager] = useState(false);

  const translations = {
    en: {
      title: "Your Applications",
      draft: "Draft",
      completed: "Completed",
      continue: "Continue",
      export: "Export",
      delete: "Delete",
      noApplications: "No saved applications",
      lastSaved: "Last saved",
      resume: "Resume Application",
      exportResume: "Export Enhanced Resume"
    },
    hi: {
      title: "आपके आवेदन",
      draft: "ड्राफ्ट",
      completed: "पूर्ण",
      continue: "जारी रखें",
      export: "निर्यात करें",
      delete: "हटाएं",
      noApplications: "कोई सहेजे गए आवेदन नहीं",
      lastSaved: "अंतिम सहेजा गया",
      resume: "आवेदन जारी रखें",
      exportResume: "एन्हांस्ड रिज्यूमे निर्यात करें"
    }
  };

  const t = translations[language];

  const draftApplications = applications.filter(app => !app.isComplete);
  const completedApplications = applications.filter(app => app.isComplete);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const handleDelete = (appId, e) => {
    e.stopPropagation();
    if (window.confirm(language === 'en' ? 'Delete this application?' : 'क्या इस आवेदन को हटाना है?')) {
      const updated = applications.filter(app => app.id !== appId);
      localStorage.setItem('sarkariInternApplications', JSON.stringify(updated));
      window.location.reload(); // Refresh to update state
    }
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bold text-gray-900">{t.title}</h3>
        <button
          onClick={() => setShowManager(!showManager)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          {showManager ? '▲' : '▼'} {showManager ? 'Hide' : 'Show'} Applications
        </button>
      </div>

      {showManager && (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          {/* Draft Applications */}
          {draftApplications.length > 0 && (
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-yellow-600 mb-3">
                {t.draft} ({draftApplications.length})
              </h4>
              <div className="space-y-3">
                {draftApplications.map(app => (
                  <div key={app.id} className="flex justify-between items-center p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div>
                      <p className="font-medium">
                        {app.formData.education ? `${app.formData.education} in ${app.formData.sectors?.[0] || 'Multiple sectors'}` : 'New Application'}
                      </p>
                      <p className="text-sm text-gray-600">
                        {t.lastSaved}: {formatDate(app.timestamp)}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => onContinue(app)}
                        className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                      >
                        {t.continue}
                      </button>
                      <button
                        onClick={() => onExport(app)}
                        className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
                      >
                        {t.export}
                      </button>
                      <button
                        onClick={(e) => handleDelete(app.id, e)}
                        className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                      >
                        {t.delete}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Completed Applications */}
          {completedApplications.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold text-green-600 mb-3">
                {t.completed} ({completedApplications.length})
              </h4>
              <div className="space-y-3">
                {completedApplications.map(app => (
                  <div key={app.id} className="flex justify-between items-center p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div>
                      <p className="font-medium">
                        {app.formData.education} - {app.formData.sectors?.join(', ')}
                      </p>
                      <p className="text-sm text-gray-600">
                        Completed: {formatDate(app.timestamp)}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => onExport(app)}
                        className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
                      >
                        {t.exportResume}
                      </button>
                      <button
                        onClick={(e) => handleDelete(app.id, e)}
                        className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                      >
                        {t.delete}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {applications.length === 0 && (
            <p className="text-center text-gray-500 py-4">{t.noApplications}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ApplicationManager;