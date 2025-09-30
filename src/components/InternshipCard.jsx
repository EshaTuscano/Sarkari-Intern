const InternshipCard = ({ intern, language = 'en', showScoreBreakdown = true }) => {
  const translations = {
    en: {
      apply: "Apply Now",
      match: "Smart Match",
      skills: "Skills Required",
      location: "Location",
      duration: "Duration",
      stipend: "Stipend",
      deadline: "Deadline",
      description: "Description",
      matchedSkills: "Your matched skills",
      scoreBreakdown: "AI Match Score Breakdown",
      skillsMatch: "Skills Match",
      locationMatch: "Location Match",
      categoryBoost: "Category Boost",
      pastPenalty: "Past Internship",
      finalScore: "Final Score",
      viewDetails: "View Smart Details",
      smartPlacement: "PM Internship Smart Placement",
      excellentMatch: "Excellent Match",
      goodMatch: "Good Match",
      averageMatch: "Average Match",
      whyThisMatches: "Why this is a smart match for you:",
      sector: "Sector",
      eligibility: "Eligibility Boost",
      ruralBoost: "Rural Background Boost",
      diversityBoost: "Diversity Inclusion"
    },
    hi: {
      apply: "अभी आवेदन करें",
      match: "स्मार्ट मेल",
      skills: "आवश्यक कौशल",
      location: "स्थान",
      duration: "अवधि",
      stipend: "वजीफा",
      deadline: "आखिरी तारीख",
      description: "विवरण",
      matchedSkills: "आपके मेल खाते कौशल",
      scoreBreakdown: "AI मेल स्कोर विवरण",
      skillsMatch: "कौशल मेल",
      locationMatch: "स्थान मेल",
      categoryBoost: "श्रेणी बूस्ट",
      pastPenalty: "पिछला इंटर्नशिप",
      finalScore: "अंतिम स्कोर",
      viewDetails: "स्मार्ट विवरण देखें",
      smartPlacement: "PM इंटर्नशिप स्मार्ट प्लेसमेंट",
      excellentMatch: "उत्कृष्ट मेल",
      goodMatch: "अच्छा मेल",
      averageMatch: "औसत मेल",
      whyThisMatches: "यह आपके लिए स्मार्ट मैच क्यों है:",
      sector: "क्षेत्र",
      eligibility: "पात्रता बूस्ट",
      ruralBoost: "ग्रामीण पृष्ठभूमि बूस्ट",
      diversityBoost: "विविधता समावेशन"
    }
  };

  const t = translations[language];

  const getMatchColor = (score) => {
    if (score >= 80) return 'bg-gradient-to-r from-green-500 to-green-600';
    if (score >= 60) return 'bg-gradient-to-r from-yellow-500 to-yellow-600';
    if (score >= 40) return 'bg-gradient-to-r from-orange-500 to-orange-600';
    return 'bg-gradient-to-r from-red-500 to-red-600';
  };

  const getMatchText = (score) => {
    if (score >= 80) return t.excellentMatch;
    if (score >= 60) return t.goodMatch;
    if (score >= 40) return t.averageMatch;
    return language === 'en' ? 'Needs Improvement' : 'सुधार की आवश्यकता';
  };

  const getScoreColor = (score) => {
    if (score > 0) return 'text-green-600';
    if (score < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getScoreIcon = (score) => {
    if (score > 0) return '✅';
    if (score < 0) return '❌';
    return '➖';
  };

  const handleApply = () => {
    alert(language === 'en' 
      ? `Applying for ${intern.title} at ${intern.company} through PM Internship Smart Placement` 
      : `PM इंटर्नशिप स्मार्ट प्लेसमेंट के माध्यम से ${intern.company} में ${intern.title} के लिए आवेदन किया जा रहा है`
    );
  };

  const handleViewDetails = () => {
    // In a real app, this would open a modal or navigate to details page
    console.log('Viewing details for:', intern.id);
  };

  // Score Breakdown Component
  const ScoreBreakdown = ({ score }) => (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
        <span>📊</span>
        {t.scoreBreakdown}
      </h4>
      
      <div className="space-y-2 text-sm">
        {/* Skills Match */}
        <div className="flex justify-between items-center">
          <span className="text-gray-700">{t.skillsMatch}:</span>
          <span className={`font-medium ${getScoreColor(score.skills)}`}>
            {getScoreIcon(score.skills)} +{score.skills}/40
          </span>
        </div>
        
        {/* Location Match */}
        <div className="flex justify-between items-center">
          <span className="text-gray-700">{t.locationMatch}:</span>
          <span className={`font-medium ${getScoreColor(score.location)}`}>
            {getScoreIcon(score.location)} +{score.location}/20
          </span>
        </div>
        
        {/* Category & Diversity Boost */}
        <div className="flex justify-between items-center">
          <span className="text-gray-700">{t.categoryBoost}:</span>
          <span className={`font-medium ${getScoreColor(score.categoryBoost)}`}>
            {getScoreIcon(score.categoryBoost)} +{score.categoryBoost}/20
          </span>
        </div>
        
        {/* Past Internship Penalty */}
        <div className="flex justify-between items-center">
          <span className="text-gray-700">{t.pastPenalty}:</span>
          <span className={`font-medium ${getScoreColor(score.pastPenalty)}`}>
            {getScoreIcon(score.pastPenalty)} {score.pastPenalty}/20
          </span>
        </div>
        
        {/* Final Score */}
        <div className="flex justify-between items-center pt-2 border-t border-gray-300">
          <span className="font-bold text-gray-900">{t.finalScore}:</span>
          <span className="font-bold text-lg text-blue-600">
            {score.finalScore}/100
          </span>
        </div>
      </div>

      {/* Match Quality Indicator */}
      <div className="mt-3 flex items-center justify-between">
        <span className="text-xs text-gray-600">{getMatchText(score.finalScore)}</span>
        <div className="w-24 bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full ${getMatchColor(score.finalScore)}`}
            style={{ width: `${score.finalScore}%` }}
          ></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Smart Placement Badge */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 text-sm font-medium text-center">
        {t.smartPlacement}
      </div>

      <div className="p-6">
        {/* Header with Enhanced Match Score */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1 mr-3">
            <h3 className="text-xl font-bold text-gray-800 leading-tight mb-1">
              {intern.title}
            </h3>
            <p className="text-blue-600 font-semibold text-lg">{intern.company}</p>
          </div>
          {intern.matchScore && (
            <div className={`${getMatchColor(intern.matchScore)} text-white px-4 py-2 rounded-lg text-center min-w-20`}>
              <div className="text-lg font-bold">{intern.matchScore}%</div>
              <div className="text-xs opacity-90">{t.match}</div>
            </div>
          )}
        </div>

        {/* Sector Tag */}
        {intern.sector && (
          <div className="mb-3">
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-medium border border-purple-200">
              🏷️ {intern.sector}
            </span>
          </div>
        )}

        {/* Description */}
        {intern.description && (
          <div className="mb-4">
            <p className="text-gray-700 text-sm leading-relaxed">{intern.description}</p>
          </div>
        )}

        {/* Enhanced Details Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <span className="font-medium mr-2 text-blue-500">📍</span>
            <div>
              <div className="font-medium">{intern.location}</div>
              {intern.locationType && (
                <div className="text-xs text-gray-500">{intern.locationType}</div>
              )}
            </div>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <span className="font-medium mr-2 text-green-500">⏱️</span>
            <span>{intern.duration}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <span className="font-medium mr-2 text-yellow-500">💰</span>
            <span className="font-semibold">{intern.stipend}</span>
          </div>
          {intern.deadline && (
            <div className="flex items-center text-sm text-gray-600">
              <span className="font-medium mr-2 text-red-500">📅</span>
              <span>{intern.deadline}</span>
            </div>
          )}
        </div>

        {/* Matched Skills with Progress */}
        {intern.matchedSkills && intern.matchedSkills.length > 0 && (
          <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm font-medium text-green-800 mb-2 flex items-center gap-2">
              <span>🎯</span>
              {t.matchedSkills} ({intern.matchedSkills.length}/{intern.skills.length})
            </p>
            <div className="flex flex-wrap gap-1">
              {intern.matchedSkills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium border border-green-200"
                >
                  {skill}
                </span>
              ))}
            </div>
            {/* Skills Match Progress */}
            <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
              <div 
                className="bg-green-500 h-1.5 rounded-full" 
                style={{ width: `${(intern.matchedSkills.length / intern.skills.length) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Required Skills */}
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <span>🛠️</span>
            {t.skills}:
          </p>
          <div className="flex flex-wrap gap-1">
            {intern.skills.map((skill, index) => (
              <span
                key={index}
                className={`px-2 py-1 rounded text-xs border ${
                  intern.matchedSkills && intern.matchedSkills.includes(skill)
                    ? 'bg-blue-100 text-blue-800 border-blue-200 font-semibold'
                    : 'bg-gray-100 text-gray-700 border-gray-200'
                }`}
              >
                {skill}
                {intern.matchedSkills && intern.matchedSkills.includes(skill) && ' ✓'}
              </span>
            ))}
          </div>
        </div>

        {/* AI Score Breakdown */}
        {showScoreBreakdown && intern.score && (
          <ScoreBreakdown score={intern.score} />
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={handleApply}
            className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all font-semibold shadow-md hover:shadow-lg transform hover:scale-105"
          >
            {t.apply}
          </button>
          <button
            onClick={handleViewDetails}
            className="px-4 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium border border-gray-300"
          >
            {t.viewDetails}
          </button>
        </div>

        {/* Enhanced Match Reasons */}
        {intern.matchReasons && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm font-medium text-blue-800 mb-2 flex items-center gap-2">
              <span>💡</span>
              {t.whyThisMatches}
            </p>
            <ul className="text-sm text-blue-700 space-y-1">
              {intern.matchReasons.slice(0, 3).map((reason, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default InternshipCard;