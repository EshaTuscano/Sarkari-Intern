export const internships = [
  {
    id: 1,
    title: "Python Developer Intern",
    company: "Tech Solutions India",
    skills: ["Python", "Django", "React", "JavaScript", "SQL", "Git"],
    requiredSkills: ["Python", "Django", "React"],
    sector: "it",
    location: "Mumbai",
    locationType: "metro",
    stipend: "₹15,000/month",
    duration: "3 months",
    description: "Work on cutting-edge web applications using Python and React.",
    minEducation: "bachelors",
    backgroundPreference: ["Urban", "Rural"],
    categoryPreference: ["General", "OBC", "SC", "ST"]
  },
  {
    id: 2,
    title: "Marketing Analytics Intern",
    company: "Digital Marketing Pro",
    skills: ["Marketing", "Analytics", "Excel", "SEO", "Google Analytics"],
    requiredSkills: ["Marketing", "Analytics", "Excel"],
    sector: "marketing",
    location: "Delhi",
    locationType: "metro",
    stipend: "₹12,000/month",
    duration: "3 months",
    description: "Analyze marketing campaigns and optimize digital strategies.",
    minEducation: "bachelors",
    backgroundPreference: ["Urban"],
    categoryPreference: ["General", "OBC"]
  },
  {
    id: 3,
    title: "Rural Development Intern",
    company: "PM Internship Smart Placement",
    skills: ["Community Development", "Communication", "Project Management"],
    requiredSkills: ["Communication", "Community Development"],
    sector: "education",
    location: "Rural Maharashtra",
    locationType: "rural",
    stipend: "₹8,000/month + Accommodation",
    duration: "6 months",
    description: "Work on rural development projects and community outreach.",
    minEducation: "highschool",
    backgroundPreference: ["Rural"],
    categoryPreference: ["SC", "ST", "OBC"],
    governmentInitiative: true
  },
  {
    id: 4,
    title: "Finance Research Intern",
    company: "FinanceCorp Global",
    skills: ["Finance", "Research", "Excel", "Data Analysis"],
    requiredSkills: ["Finance", "Research", "Excel"],
    sector: "finance",
    location: "Bangalore",
    locationType: "metro",
    stipend: "₹14,000/month",
    duration: "4 months",
    description: "Conduct financial research and analysis for investment decisions.",
    minEducation: "masters",
    backgroundPreference: ["Urban"],
    categoryPreference: ["General", "OBC"]
  },
  {
    id: 5,
    title: "Healthcare Outreach Intern",
    company: "MediCare Foundation",
    skills: ["Healthcare", "Communication", "Community Service"],
    requiredSkills: ["Communication", "Healthcare"],
    sector: "healthcare",
    location: "Chennai",
    locationType: "metro",
    stipend: "₹10,000/month",
    duration: "3 months",
    description: "Assist in healthcare awareness programs and patient education.",
    minEducation: "bachelors",
    backgroundPreference: ["Urban", "Rural"],
    categoryPreference: ["General", "OBC", "SC", "ST"]
  },
  {
    id: 6,
    title: "Data Science Intern",
    company: "Analytics Pro",
    skills: ["Python", "Machine Learning", "SQL", "Statistics"],
    requiredSkills: ["Python", "Machine Learning", "SQL"],
    sector: "it",
    location: "Hyderabad",
    locationType: "tier2",
    stipend: "₹18,000/month",
    duration: "4 months",
    description: "Build machine learning models and analyze complex datasets.",
    minEducation: "masters",
    backgroundPreference: ["Urban"],
    categoryPreference: ["General", "OBC"]
  },
  {
    id: 7,
    title: "Content Writing Intern",
    company: "Creative Studio",
    skills: ["Writing", "SEO", "Content Strategy", "Research"],
    requiredSkills: ["Writing", "SEO", "Research"],
    sector: "marketing",
    location: "Remote",
    locationType: "tier3",
    stipend: "₹9,000/month",
    duration: "3 months",
    description: "Create engaging content for digital platforms and websites.",
    minEducation: "bachelors",
    backgroundPreference: ["Urban", "Rural"],
    categoryPreference: ["General", "OBC", "SC", "ST"]
  },
  {
    id: 8,
    title: "Environmental Research Intern",
    company: "Green Earth Foundation",
    skills: ["Research", "Environmental Science", "Data Collection"],
    requiredSkills: ["Research", "Environmental Science"],
    sector: "environment",
    location: "Pune",
    locationType: "tier2",
    stipend: "₹11,000/month",
    duration: "5 months",
    description: "Research environmental issues and sustainability practices.",
    minEducation: "bachelors",
    backgroundPreference: ["Urban", "Rural"],
    categoryPreference: ["General", "OBC", "SC", "ST"]
  }
];


// Utility function to calculate match score for a candidate
export const calculateInternshipMatch = (candidate, internship) => {
  let skillsScore = 0;
  let locationScore = 0;
  let categoryBoost = 0;
  let pastPenalty = 0;

  // Skills Match (40 points)
  const candidateSkills = candidate.skills.map(skill => skill.toLowerCase());
  const internshipSkills = internship.requiredSkills.map(skill => skill.toLowerCase());
  const commonSkills = candidateSkills.filter(skill => internshipSkills.includes(skill));
  skillsScore = (commonSkills.length / internshipSkills.length) * 40;

  // Location Match (20 points)
  if (candidate.locationPreference === internship.locationType) {
    locationScore = 20;
  } else if (
    (candidate.locationPreference === 'metro' && internship.locationType === 'tier2') ||
    (candidate.locationPreference === 'tier2' && internship.locationType === 'metro') ||
    (candidate.locationPreference === 'tier2' && internship.locationType === 'tier3') ||
    (candidate.locationPreference === 'tier3' && internship.locationType === 'tier2')
  ) {
    locationScore = 15;
  } else if (candidate.locationPreference === 'rural' && internship.locationType === 'tier3') {
    locationScore = 18;
  } else {
    locationScore = 5;
  }

  // Category + Rural Boost (20 points)
  // SC/ST candidates get higher boost
  if (candidate.category === 'sc' || candidate.category === 'st') {
    categoryBoost += 12;
  } else if (candidate.category === 'obc') {
    categoryBoost += 8;
  } else {
    categoryBoost += 4;
  }

  // Rural background boost
  if (candidate.background === 'rural') {
    categoryBoost += 8;
  }

  // Cap category boost at 20
  categoryBoost = Math.min(categoryBoost, 20);

  // Past Participation Penalty (20 points)
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

// Filter internships by sector
export const getInternshipsBySector = (sector) => {
  return internships.filter(intern => intern.sector === sector);
};

// Get internships with high diversity focus
export const getDiversityFocusedInternships = () => {
  return internships.filter(intern => 
    intern.categoryPreference.includes('SC') || 
    intern.categoryPreference.includes('ST') ||
    intern.backgroundPreference.includes('Rural')
  );
};

// Get government initiative internships
export const getGovernmentInternships = () => {
  return internships.filter(intern => intern.governmentInitiative);
};

// Sort internships by match score for a candidate
export const getSortedInternshipsForCandidate = (candidate) => {
  return internships
    .map(intern => ({
      ...intern,
      matchedSkills: intern.requiredSkills.filter(skill => 
        candidate.skills.map(s => s.toLowerCase()).includes(skill.toLowerCase())
      ),
      score: calculateInternshipMatch(candidate, intern),
      matchScore: calculateInternshipMatch(candidate, intern).finalScore
    }))
    .sort((a, b) => b.matchScore - a.matchScore);
};