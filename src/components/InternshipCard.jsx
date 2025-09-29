const InternshipCard = ({ intern, language = 'en' }) => {
  const translations = {
    en: {
      apply: "Apply Now",
      match: "Match",
      skills: "Skills Required",
      location: "Location",
      duration: "Duration",
      stipend: "Stipend",
      deadline: "Deadline",
      description: "Description",
      matchedSkills: "Your matched skills"
    },
    hi: {
      apply: "अभी आवेदन करें",
      match: "मेल",
      skills: "आवश्यक कौशल",
      location: "स्थान",
      duration: "अवधि",
      stipend: "वजीफा",
      deadline: "आखिरी तारीख",
      description: "विवरण",
      matchedSkills: "आपके मेल खाते कौशल"
    }
  };

  const t = translations[language];

  const getMatchColor = (score) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const handleApply = () => {
    alert(language === 'en' 
      ? `Applying for ${intern.title} at ${intern.company}` 
      : `${intern.company} में ${intern.title} के लिए आवेदन किया जा रहा है`
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="p-6">
        {/* Header with Match Score */}
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-800 flex-1 mr-2 leading-tight">
            {intern.title}
          </h3>
          {intern.matchScore && (
            <div className={`${getMatchColor(intern.matchScore)} text-white px-3 py-1 rounded-full text-sm font-bold`}>
              {t.match}: {intern.matchScore}%
            </div>
          )}
        </div>

        {/* Company */}
        <p className="text-blue-600 font-semibold mb-3 text-lg">{intern.company}</p>

        {/* Description */}
        {intern.description && (
          <div className="mb-4">
            <p className="text-gray-700 text-sm leading-relaxed">{intern.description}</p>
          </div>
        )}

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <span className="font-medium mr-2">📍</span>
            <span>{intern.location}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <span className="font-medium mr-2">⏱️</span>
            <span>{intern.duration}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <span className="font-medium mr-2">💰</span>
            <span>{intern.stipend}</span>
          </div>
          {intern.deadline && (
            <div className="flex items-center text-sm text-gray-600">
              <span className="font-medium mr-2">📅</span>
              <span>{intern.deadline}</span>
            </div>
          )}
        </div>

        {/* Matched Skills */}
        {intern.matchedSkills && intern.matchedSkills.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-medium text-green-700 mb-2">✅ {t.matchedSkills}</p>
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
          </div>
        )}

        {/* Required Skills */}
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-700 mb-2">{t.skills}:</p>
          <div className="flex flex-wrap gap-1">
            {intern.skills.map((skill, index) => (
              <span
                key={index}
                className={`px-2 py-1 rounded text-xs border ${
                  intern.matchedSkills && intern.matchedSkills.includes(skill)
                    ? 'bg-blue-100 text-blue-800 border-blue-200'
                    : 'bg-gray-100 text-gray-700 border-gray-200'
                }`}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Apply Button */}
        <button
          onClick={handleApply}
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold shadow-md hover:shadow-lg"
        >
          {t.apply}
        </button>

        {/* Match Reasons */}
        {intern.matchReasons && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs text-blue-700 font-medium mb-1">
              {language === 'en' ? 'Why this matches you:' : 'यह आपसे क्यों मेल खाता है:'}
            </p>
            <ul className="text-xs text-blue-600 list-disc list-inside">
              {intern.matchReasons.slice(0, 3).map((reason, index) => (
                <li key={index}>{reason}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default InternshipCard;