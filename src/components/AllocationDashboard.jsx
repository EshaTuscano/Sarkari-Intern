import React, { useState, useEffect } from 'react';
import { allocationEngine } from '../utils/allocationEngine';

const AllocationDashboard = ({ applications, internships, language }) => {
  const [allocations, setAllocations] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [selectedView, setSelectedView] = useState('overview');

  useEffect(() => {
    if (applications.length > 0 && internships.length > 0) {
      const newAllocations = allocationEngine.allocateCandidates(
        applications.map(app => app.formData),
        internships,
        {
          maxAllocationsPerInternship: 15,
          enableFairness: true,
          diversityQuota: 0.3
        }
      );
      
      setAllocations(newAllocations);
      setAnalytics(allocationEngine.getAllocationAnalytics(
        newAllocations,
        applications.map(app => app.formData),
        internships
      ));
    }
  }, [applications, internships]);

  const translations = {
    en: {
      title: "Smart Allocation Dashboard",
      overview: "Overview",
      allocations: "Allocations",
      analytics: "Analytics",
      fairness: "Fairness Metrics",
      totalAllocations: "Total Allocations",
      allocationRate: "Allocation Rate",
      avgMatchScore: "Avg Match Score",
      ruralAllocations: "Rural Allocations",
      scStAllocations: "SC/ST Allocations",
      firstTimeAllocations: "First-time Candidates",
      candidate: "Candidate",
      internship: "Internship",
      matchScore: "Match Score",
      status: "Status",
      allocationId: "Allocation ID",
      viewDetails: "View Details",
      runAllocation: "Run Smart Allocation",
      allocationSettings: "Allocation Settings",
      diversityQuota: "Diversity Quota",
      maxPerInternship: "Max per Internship",
      enableFairness: "Enable Fairness Algorithm"
    },
    hi: {
      title: "स्मार्ट आवंटन डैशबोर्ड",
      overview: "अवलोकन",
      allocations: "आवंटन",
      analytics: "विश्लेषण",
      fairness: "निष्पक्षता मेट्रिक्स",
      totalAllocations: "कुल आवंटन",
      allocationRate: "आवंटन दर",
      avgMatchScore: "औसत मैच स्कोर",
      ruralAllocations: "ग्रामीण आवंटन",
      scStAllocations: "एससी/एसटी आवंटन",
      firstTimeAllocations: "पहली बार उम्मीदवार",
      candidate: "उम्मीदवार",
      internship: "इंटर्नशिप",
      matchScore: "मैच स्कोर",
      status: "स्थिति",
      allocationId: "आवंटन आईडी",
      viewDetails: "विवरण देखें",
      runAllocation: "स्मार्ट आवंटन चलाएं",
      allocationSettings: "आवंटन सेटिंग्स",
      diversityQuota: "विविधता कोटा",
      maxPerInternship: "प्रति इंटर्नशिप अधिकतम",
      enableFairness: "निष्पक्षता एल्गोरिदम सक्षम करें"
    }
  };

  const t = translations[language];

  if (!analytics) {
    return (
      <div className="p-6 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">
          {language === 'en' ? 'Running smart allocation...' : 'स्मार्ट आवंटन चल रहा है...'}
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">{t.title}</h2>

          {/* Navigation Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex space-x-8">
              {['overview', 'allocations', 'analytics', 'fairness'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setSelectedView(tab)}
                  className={`py-3 px-1 border-b-2 font-medium text-sm ${
                    selectedView === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {t[tab]}
                </button>
              ))}
            </nav>
          </div>

          {/* Overview Tab */}
          {selectedView === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h3 className="text-lg font-semibold text-blue-800">{t.totalAllocations}</h3>
                <p className="text-3xl font-bold text-blue-600">{analytics.totalAllocations}</p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h3 className="text-lg font-semibold text-green-800">{t.allocationRate}</h3>
                <p className="text-3xl font-bold text-green-600">
                  {analytics.allocationRate.toFixed(1)}%
                </p>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                <h3 className="text-lg font-semibold text-purple-800">{t.avgMatchScore}</h3>
                <p className="text-3xl font-bold text-purple-600">
                  {analytics.averageMatchScore.toFixed(1)}%
                </p>
              </div>
              <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
                <h3 className="text-lg font-semibold text-orange-800">{t.ruralAllocations}</h3>
                <p className="text-3xl font-bold text-orange-600">
                  {analytics.diversityMetrics.ruralCandidates}
                </p>
              </div>
            </div>
          )}

          {/* Allocations Tab */}
          {selectedView === 'allocations' && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      {t.allocationId}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      {t.candidate}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      {t.internship}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      {t.matchScore}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      {t.status}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {allocations.slice(0, 50).map(allocation => (
                    <tr key={allocation.allocationId} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500">
                        {allocation.allocationId.slice(0, 12)}...
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {allocation.candidate.name || 'Anonymous'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {allocation.candidate.education}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {allocation.internship.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {allocation.internship.company}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          allocation.matchScore.total >= 80 ? 'bg-green-100 text-green-800' :
                          allocation.matchScore.total >= 60 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {allocation.matchScore.total}%
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {allocation.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Analytics Tab */}
          {selectedView === 'analytics' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Sector Distribution</h3>
                <div className="space-y-3">
                  {Object.entries(analytics.sectorDistribution).map(([sector, count]) => (
                    <div key={sector} className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 capitalize">{sector}</span>
                      <div className="flex items-center gap-3">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ 
                              width: `${(count / analytics.totalAllocations) * 100}%` 
                            }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-blue-600">{count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Location Distribution</h3>
                <div className="space-y-3">
                  {Object.entries(analytics.locationDistribution).map(([location, count]) => (
                    <div key={location} className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 capitalize">{location}</span>
                      <div className="flex items-center gap-3">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ 
                              width: `${(count / analytics.totalAllocations) * 100}%` 
                            }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-green-600">{count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Fairness Tab */}
          {selectedView === 'fairness' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h3 className="text-lg font-semibold text-green-800 mb-2">
                  {t.ruralAllocations}
                </h3>
                <p className="text-3xl font-bold text-green-600">
                  {analytics.diversityMetrics.ruralCandidates}
                </p>
                <p className="text-sm text-green-600 mt-2">
                  {((analytics.diversityMetrics.ruralCandidates / analytics.totalAllocations) * 100).toFixed(1)}% of total
                </p>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                <h3 className="text-lg font-semibold text-purple-800 mb-2">
                  {t.scStAllocations}
                </h3>
                <p className="text-3xl font-bold text-purple-600">
                  {analytics.diversityMetrics.scStCandidates}
                </p>
                <p className="text-sm text-purple-600 mt-2">
                  {((analytics.diversityMetrics.scStCandidates / analytics.totalAllocations) * 100).toFixed(1)}% of total
                </p>
              </div>

              <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
                <h3 className="text-lg font-semibold text-orange-800 mb-2">
                  {t.firstTimeAllocations}
                </h3>
                <p className="text-3xl font-bold text-orange-600">
                  {analytics.diversityMetrics.firstTimeCandidates}
                </p>
                <p className="text-sm text-orange-600 mt-2">
                  {((analytics.diversityMetrics.firstTimeCandidates / analytics.totalAllocations) * 100).toFixed(1)}% of total
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllocationDashboard;
