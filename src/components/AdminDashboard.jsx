import { useState } from 'react';

const AdminDashboard = ({ applications, internships, language, onToggleView }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const translations = {
    en: {
      title: "Smart Placement Admin Dashboard",
      overview: "Overview",
      applications: "Applications",
      internships: "Internships",
      analytics: "Fairness Analytics",
      totalApplications: "Total Applications",
      completedApplications: "Completed",
      draftApplications: "Drafts",
      averageMatchScore: "Avg Smart Score",
      popularSectors: "Popular Sectors",
      topSkills: "Top Skills",
      viewDetails: "View Details",
      candidate: "Candidate",
      matchScore: "Smart Score",
      status: "Status",
      actions: "Actions",
      date: "Date",
      backToUser: "Back to Smart Portal",
      fairnessMetrics: "Fairness & Diversity Metrics",
      ruralUrban: "Rural vs Urban Distribution",
      categoryDistribution: "Category Distribution",
      placementStats: "Placement Statistics",
      rural: "Rural",
      urban: "Urban",
      general: "General",
      obc: "OBC",
      sc: "SC",
      st: "ST",
      placed: "Placed",
      notPlaced: "Not Placed",
      capacity: "Capacity Utilization",
      overCapacity: "Over Capacity",
      underCapacity: "Under Capacity",
      optimal: "Optimal",
      diversityScore: "Diversity Score",
      allocationFairness: "Allocation Fairness",
      industryAnalysis: "Industry Capacity Analysis",
      availableSlots: "Available Slots",
      filledSlots: "Filled Slots",
      totalSlots: "Total Slots",
      placementRate: "Placement Rate",
      background: "Background",
      category: "Category",
      pastInternship: "Past Internship",
      locationPreference: "Location Preference",
      sectorInterest: "Sector Interest"
    },
    hi: {
      title: "स्मार्ट प्लेसमेंट एडमिन डैशबोर्ड",
      overview: "अवलोकन",
      applications: "आवेदन",
      internships: "इंटर्नशिप",
      analytics: "निष्पक्षता विश्लेषण",
      totalApplications: "कुल आवेदन",
      completedApplications: "पूर्ण",
      draftApplications: "ड्राफ्ट",
      averageMatchScore: "औसत स्मार्ट स्कोर",
      popularSectors: "लोकप्रिय क्षेत्र",
      topSkills: "शीर्ष कौशल",
      viewDetails: "विवरण देखें",
      candidate: "उम्मीदवार",
      matchScore: "स्मार्ट स्कोर",
      status: "स्थिति",
      actions: "कार्रवाई",
      date: "तारीख",
      backToUser: "स्मार्ट पोर्टल पर वापस जाएं",
      fairnessMetrics: "निष्पक्षता और विविधता मेट्रिक्स",
      ruralUrban: "ग्रामीण बनाम शहरी वितरण",
      categoryDistribution: "श्रेणी वितरण",
      placementStats: "प्लेसमेंट आंकड़े",
      rural: "ग्रामीण",
      urban: "शहरी",
      general: "सामान्य",
      obc: "ओबीसी",
      sc: "एससी",
      st: "एसटी",
      placed: "प्लेस्ड",
      notPlaced: "प्लेस्ड नहीं",
      capacity: "क्षमता उपयोग",
      overCapacity: "अधिक क्षमता",
      underCapacity: "कम क्षमता",
      optimal: "इष्टतम",
      diversityScore: "विविधता स्कोर",
      allocationFairness: "आवंटन निष्पक्षता",
      industryAnalysis: "उद्योग क्षमता विश्लेषण",
      availableSlots: "उपलब्ध स्लॉट",
      filledSlots: "भरे हुए स्लॉट",
      totalSlots: "कुल स्लॉट",
      placementRate: "प्लेसमेंट दर",
      background: "पृष्ठभूमि",
      category: "श्रेणी",
      pastInternship: "पिछला इंटर्नशिप",
      locationPreference: "स्थान वरीयता",
      sectorInterest: "क्षेत्र रुचि"
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

  // Fairness Analytics
  const ruralApplications = applications.filter(app => app.formData.background === 'rural').length;
  const urbanApplications = applications.filter(app => app.formData.background === 'urban').length;

  const categoryDistribution = applications.reduce((acc, app) => {
    const category = app.formData.category || 'general';
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

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

  // Industry Capacity Analysis
  const industryCapacity = internships.map(intern => ({
    title: intern.title,
    company: intern.company,
    capacity: intern.capacity || 10,
    currentApplications: intern.currentApplications || 0,
    availableSlots: (intern.capacity || 10) - (intern.currentApplications || 0),
    utilization: Math.round(((intern.currentApplications || 0) / (intern.capacity || 10)) * 100),
    status: (intern.currentApplications || 0) >= (intern.capacity || 10) ? t.overCapacity :
           ((intern.currentApplications || 0) / (intern.capacity || 10)) > 0.8 ? t.optimal : t.underCapacity
  }));

  // Placement Statistics (Mock data for demo)
 /* const placementStats = {
    totalCandidates: totalApplications,
    placed: Math.round(totalApplications * 0.65),
    notPlaced: Math.round(totalApplications * 0.35),
    placementRate: 65
  };*/

  // Diversity Score Calculation
  const diversityScore = Math.round(
    (Object.keys(categoryDistribution).length / 4) * 40 + // Category diversity (max 40)
    ((ruralApplications + urbanApplications) / totalApplications) * 30 + // Background diversity (max 30)
    (popularSectors.length / 5) * 30 // Sector diversity (max 30)
  );

  const formatDate = (dateString) => new Date(dateString).toLocaleDateString();

  const getStatusColor = (status) => {
    switch (status) {
      case t.overCapacity: return 'bg-red-100 text-red-800';
      case t.optimal: return 'bg-yellow-100 text-yellow-800';
      case t.underCapacity: return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Admin Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-600 to-purple-700 text-white shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
                <span className="text-white font-bold text-xl">PM</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">PM Internship Smart Placement</h1>
                <p className="text-blue-200 text-sm">AI-Powered Admin Dashboard</p>
              </div>
            </div>
            <button
              onClick={onToggleView}
              className="bg-white/20 text-white px-6 py-2 rounded-xl hover:bg-white/30 transition-all backdrop-blur-sm border border-white/30 flex items-center gap-2"
            >
              <span>👤</span>
              {t.backToUser}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-900">{t.title}</h2>
              <div className="text-right">
                <div className="text-sm text-gray-600">{t.diversityScore}</div>
                <div className="text-2xl font-bold text-purple-600">{diversityScore}/100</div>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
              <nav className="flex space-x-8">
                {['overview', 'applications', 'analytics'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-3 px-1 border-b-2 font-medium text-sm cursor-pointer transition-all ${
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
              <div className="space-y-8">
                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200 shadow-sm">
                    <h3 className="text-lg font-semibold text-blue-800">{t.totalApplications}</h3>
                    <p className="text-3xl font-bold text-blue-600">{totalApplications}</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200 shadow-sm">
                    <h3 className="text-lg font-semibold text-green-800">{t.completedApplications}</h3>
                    <p className="text-3xl font-bold text-green-600">{completedApplications}</p>
                  </div>
                  <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-xl border border-yellow-200 shadow-sm">
                    <h3 className="text-lg font-semibold text-yellow-800">{t.draftApplications}</h3>
                    <p className="text-3xl font-bold text-yellow-600">{draftApplications}</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200 shadow-sm">
                    <h3 className="text-lg font-semibold text-purple-800">{t.averageMatchScore}</h3>
                    <p className="text-3xl font-bold text-purple-600">{averageMatchScore}%</p>
                  </div>
                </div>

                {/* Fairness Metrics */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.ruralUrban}</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">{t.rural}</span>
                        <div className="flex items-center gap-3">
                          <div className="w-32 bg-gray-200 rounded-full h-3">
                            <div 
                              className="bg-green-500 h-3 rounded-full" 
                              style={{ width: `${(ruralApplications / totalApplications) * 100}%` }}
                            ></div>
                          </div>
                          <span className="font-medium text-green-600">{ruralApplications}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">{t.urban}</span>
                        <div className="flex items-center gap-3">
                          <div className="w-32 bg-gray-200 rounded-full h-3">
                            <div 
                              className="bg-blue-500 h-3 rounded-full" 
                              style={{ width: `${(urbanApplications / totalApplications) * 100}%` }}
                            ></div>
                          </div>
                          <span className="font-medium text-blue-600">{urbanApplications}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.categoryDistribution}</h3>
                    <div className="space-y-3">
                      {Object.entries(categoryDistribution).map(([category, count]) => (
                        <div key={category} className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">{t[category] || category}</span>
                          <div className="flex items-center gap-3">
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-purple-500 h-2 rounded-full" 
                                style={{ width: `${(count / totalApplications) * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium text-purple-600">{count}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Industry Capacity Analysis */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.industryAnalysis}</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t.internships}</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t.filledSlots}</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t.availableSlots}</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t.capacity}</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t.status}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {industryCapacity.map((industry, index) => (
                          <tr key={index}>
                            <td className="px-4 py-3">
                              <div className="text-sm font-medium text-gray-900">{industry.title}</div>
                              <div className="text-sm text-gray-500">{industry.company}</div>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-900">{industry.currentApplications}</td>
                            <td className="px-4 py-3 text-sm text-green-600 font-medium">{industry.availableSlots}</td>
                            <td className="px-4 py-3 text-sm text-gray-900">{industry.capacity}</td>
                            <td className="px-4 py-3">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(industry.status)}`}>
                                {industry.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Applications Tab */}
            {activeTab === 'applications' && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t.candidate}</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t.background}</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t.category}</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t.matchScore}</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t.status}</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t.date}</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t.actions}</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {applications.map(app => (
                      <tr key={app.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">
                            {app.userName || 'Anonymous User'}
                          </div>
                          <div className="text-sm text-gray-500">
                            {app.formData.education || 'New Candidate'}
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            {app.formData.sectorInterest || app.formData.sectors?.[0]}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            app.formData.background === 'rural' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {t[app.formData.background] || t.urban}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800">
                            {t[app.formData.category] || t.general}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gradient-to-r from-green-100 to-blue-100 text-green-800">
                            {app.matchScore || 0}%
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            app.isComplete ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {app.isComplete ? t.completedApplications : t.draftApplications}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {formatDate(app.timestamp)}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900 bg-blue-50 px-3 py-1 rounded-lg transition-colors">
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
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.popularSectors}</h3>
                  <div className="space-y-4">
                    {popularSectors.map(([sector, count]) => (
                      <div key={sector} className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">{sector}</span>
                        <div className="flex items-center gap-3">
                          <div className="w-32 bg-gray-200 rounded-full h-3">
                            <div 
                              className="bg-blue-500 h-3 rounded-full" 
                              style={{ width: `${(count / totalApplications) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-blue-600">{count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.topSkills}</h3>
                  <div className="space-y-3">
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


// Add new tab to navigation
//{['overview', 'applications', 'allocations', 'analytics', 'fairness'].map(tab => (
  // ... existing tab code
//))}

// Add Allocation Dashboard component
//{activeTab === 'allocations' && (
  //<AllocationDashboard 
    //applications={applications}
    //internships={internships}
    //language={language}
 // />
//)}