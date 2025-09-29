import { useState } from 'react';

const AdminDashboard = ({ applications, internships, language, onToggleView }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const translations = {
    en: {
      title: "Admin Dashboard",
      overview: "Overview",
      applications: "Applications",
      internships: "Internships",
      analytics: "Analytics",
      totalApplications: "Total Applications",
      completedApplications: "Completed",
      draftApplications: "Drafts",
      averageMatchScore: "Avg Match Score",
      popularSectors: "Popular Sectors",
      topSkills: "Top Skills",
      viewDetails: "View Details",
      candidate: "Candidate",
      matchScore: "Match Score",
      status: "Status",
      actions: "Actions",
      date: "Date",
      backToUser: "Back to User View"
    },
    hi: {
      title: "एडमिन डैशबोर्ड",
      overview: "अवलोकन",
      applications: "आवेदन",
      internships: "इंटर्नशिप",
      analytics: "विश्लेषण",
      totalApplications: "कुल आवेदन",
      completedApplications: "पूर्ण",
      draftApplications: "ड्राफ्ट",
      averageMatchScore: "औसत मैच स्कोर",
      popularSectors: "लोकप्रिय क्षेत्र",
      topSkills: "शीर्ष कौशल",
      viewDetails: "विवरण देखें",
      candidate: "उम्मीदवार",
      matchScore: "मैच स्कोर",
      status: "स्थिति",
      actions: "कार्रवाई",
      date: "तारीख",
      backToUser: "यूजर व्यू पर वापस जाएं"
    }
  };

  const t = translations[language];

  // Analytics data
  const totalApplications = applications.length;
  const completedApplications = applications.filter(app => app.isComplete).length;
  const draftApplications = applications.filter(app => !app.isComplete).length;

  const averageMatchScore = applications.length
    ? Math.round(applications.reduce((acc, app) => acc + (app.matchScore || 0), 0) / applications.length)
    : 0;

  const sectorCounts = applications.reduce((acc, app) => {
    app.formData.sectors?.forEach(sector => {
      acc[sector] = (acc[sector] || 0) + 1;
    });
    return acc;
  }, {});

  const popularSectors = Object.entries(sectorCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const skillCounts = applications.reduce((acc, app) => {
    app.formData.skills?.forEach(skill => {
      acc[skill] = (acc[skill] || 0) + 1;
    });
    return acc;
  }, {});

  const topSkills = Object.entries(skillCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  const formatDate = (dateString) => new Date(dateString).toLocaleDateString();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold">Sarkari Intern - Admin</h1>
              <p className="text-gray-300 text-sm">Management Dashboard</p>
            </div>
            <button
              onClick={onToggleView}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              {t.backToUser}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t.title}</h2>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
              <nav className="flex space-x-8">
                {['overview', 'applications', 'internships', 'analytics'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm cursor-pointer ${
                      activeTab === tab
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {t[tab]}
                  </button>
                ))}
              </nav>
            </div>

            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                  <h3 className="text-lg font-semibold text-blue-800">{t.totalApplications}</h3>
                  <p className="text-3xl font-bold text-blue-600">{totalApplications}</p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                  <h3 className="text-lg font-semibold text-green-800">{t.completedApplications}</h3>
                  <p className="text-3xl font-bold text-green-600">{completedApplications}</p>
                </div>
                <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                  <h3 className="text-lg font-semibold text-yellow-800">{t.draftApplications}</h3>
                  <p className="text-3xl font-bold text-yellow-600">{draftApplications}</p>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                  <h3 className="text-lg font-semibold text-purple-800">{t.averageMatchScore}</h3>
                  <p className="text-3xl font-bold text-purple-600">{averageMatchScore}%</p>
                </div>
              </div>
            )}

            {/* Applications Tab */}
            {activeTab === 'applications' && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t.candidate}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t.matchScore}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t.status}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t.date}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t.actions}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {applications.map(app => (
                      <tr key={app.id}>
                        {/* User Info + Education + Skills */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {app.userId ? `User: ${app.userId}` : 'Anonymous User'}
                          </div>
                          <div className="text-sm text-gray-500">
                            {app.formData.education || 'New Candidate'}
                          </div>
                          <div className="text-sm mt-1 text-gray-600">
                            {app.formData.skills?.slice(0, 3).join(', ')}
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {app.matchScore || 0}%
                          </span>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            app.isComplete ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {app.isComplete ? t.completedApplications : t.draftApplications}
                          </span>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(app.timestamp)}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900">
                            {t.viewDetails}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.popularSectors}</h3>
                  <div className="space-y-3">
                    {popularSectors.map(([sector, count]) => (
                      <div key={sector} className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">{sector}</span>
                        <span className="text-sm font-medium text-blue-600">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.topSkills}</h3>
                  <div className="space-y-2">
                    {topSkills.map(([skill, count]) => (
                      <div key={skill} className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">{skill}</span>
                        <span className="text-sm font-medium text-green-600">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
