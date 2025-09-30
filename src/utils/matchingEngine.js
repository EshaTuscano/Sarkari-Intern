// Enhanced matching engine that actually uses form data
export class SmartMatchingEngine {
  constructor() {
    this.weights = {
      skills: 0.40,
      location: 0.20,
      sector: 0.15,
      education: 0.10,
      diversity: 0.15
    };
  }

  // Main matching function
  findBestMatches(candidate, internships, limit = 6) {
    if (!candidate || !internships.length) return [];

    console.log('Matching candidate:', candidate);
    console.log('Available internships:', internships.length);

    // Calculate scores for all internships
    const scoredInternships = internships.map(internship => {
      const score = this.calculateMatchScore(candidate, internship);
      const matchedSkills = this.findMatchedSkills(candidate.skills, internship.requiredSkills);
      
      return {
        ...internship,
        matchScore: score.total,
        scoreBreakdown: score.breakdown,
        matchedSkills,
        matchReasons: this.generateMatchReasons(candidate, internship, score)
      };
    });

    // Filter out low matches and sort by score
    const filteredMatches = scoredInternships
      .filter(intern => intern.matchScore >= 40) // Minimum 40% match
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, limit);

    console.log('Filtered matches:', filteredMatches.length);
    return filteredMatches;
  }

  calculateMatchScore(candidate, internship) {
    const scores = {
      skills: this.calculateSkillsMatch(candidate.skills, internship.requiredSkills),
      location: this.calculateLocationMatch(candidate.locationPreference, internship.locationType),
      sector: this.calculateSectorMatch(candidate.sectorInterest, candidate.sectors, internship.sector),
      education: this.calculateEducationMatch(candidate.education, internship.minEducation),
      diversity: this.calculateDiversityBoost(candidate, internship)
    };

    // Apply weights and calculate total
    let totalScore = 0;
    Object.keys(scores).forEach(key => {
      totalScore += scores[key] * this.weights[key];
    });

    return {
      total: Math.round(totalScore * 100),
      breakdown: {
        skills: Math.round(scores.skills * this.weights.skills * 100),
        location: Math.round(scores.location * this.weights.location * 100),
        sector: Math.round(scores.sector * this.weights.sector * 100),
        education: Math.round(scores.education * this.weights.education * 100),
        diversity: Math.round(scores.diversity * this.weights.diversity * 100)
      }
    };
  }

  calculateSkillsMatch(candidateSkills = [], requiredSkills = []) {
    if (!candidateSkills.length || !requiredSkills.length) return 0;
    
    const candidateSkillSet = new Set(candidateSkills.map(s => s.toLowerCase().trim()));
    const requiredSkillSet = new Set(requiredSkills.map(s => s.toLowerCase().trim()));
    
    const intersection = [...requiredSkillSet].filter(skill => 
      candidateSkillSet.has(skill)
    );
    
    return intersection.length / requiredSkillSet.size;
  }

  calculateLocationMatch(candidatePreference, internshipLocation) {
    if (!candidatePreference) return 0.5; // Neutral if no preference
    
    const locationMatrix = {
      metro: { metro: 1.0, tier2: 0.6, tier3: 0.3, rural: 0.1 },
      tier2: { metro: 0.6, tier2: 1.0, tier3: 0.7, rural: 0.4 },
      tier3: { metro: 0.3, tier2: 0.7, tier3: 1.0, rural: 0.6 },
      rural: { metro: 0.1, tier2: 0.4, tier3: 0.6, rural: 1.0 }
    };

    return locationMatrix[candidatePreference]?.[internshipLocation] || 0.1;
  }

  calculateSectorMatch(candidateSectorInterest, candidateSectors = [], internshipSector) {
    // Check primary sector interest
    if (candidateSectorInterest && candidateSectorInterest === internshipSector) {
      return 1.0;
    }
    
    // Check preferred sectors
    if (candidateSectors && candidateSectors.includes(internshipSector)) {
      return 0.8;
    }
    
    // Partial match for related sectors
    const sectorGroups = {
      it: ['technology', 'software', 'development', 'programming'],
      finance: ['banking', 'accounting', 'economics', 'investment'],
      marketing: ['advertising', 'branding', 'digital', 'social media'],
      healthcare: ['medical', 'pharmacy', 'nursing', 'public health'],
      education: ['teaching', 'research', 'academic', 'training']
    };
    
    for (const [group, keywords] of Object.entries(sectorGroups)) {
      if (candidateSectorInterest === group && 
          keywords.some(keyword => internshipSector.toLowerCase().includes(keyword))) {
        return 0.6;
      }
    }
    
    return 0.2; // Default low score for unrelated sectors
  }

  calculateEducationMatch(candidateEducation, minEducation) {
    if (!minEducation) return 1.0; // No requirement = perfect match
    
    const educationLevels = {
      highschool: 1,
      bachelors: 2,
      masters: 3,
      phd: 4
    };
    
    const candidateLevel = educationLevels[candidateEducation] || 0;
    const requiredLevel = educationLevels[minEducation] || 0;
    
    if (candidateLevel >= requiredLevel) return 1.0;
    return Math.max(0.1, candidateLevel / requiredLevel); // At least 10% match
  }

  calculateDiversityBoost(candidate, internship) {
    let boost = 0;
    
    // Rural background preference
    if (candidate.background === 'rural' && internship.backgroundPreference?.includes('rural')) {
      boost += 0.8;
    }
    
    // Category preference
    if (candidate.category && internship.categoryPreference?.includes(candidate.category)) {
      boost += 0.6;
    }
    
    // First-time applicant boost
    if (candidate.pastInternship === 'no') {
      boost += 0.4;
    }
    
    return Math.min(boost, 1.0);
  }

  findMatchedSkills(candidateSkills = [], requiredSkills = []) {
    if (!candidateSkills.length || !requiredSkills.length) return [];
    
    const candidateSkillSet = new Set(candidateSkills.map(s => s.toLowerCase().trim()));
    return requiredSkills.filter(skill => 
      candidateSkillSet.has(skill.toLowerCase().trim())
    );
  }

  generateMatchReasons(candidate, internship, score) {
    const reasons = [];
    
    // Skills match reason
    if (score.breakdown.skills > 30) {
      reasons.push(`Strong skills match (${score.breakdown.skills}%)`);
    }
    
    // Location match reason
    if (score.breakdown.location > 15) {
      reasons.push(`Perfect location alignment (${score.breakdown.location}%)`);
    }
    
    // Sector match reason
    if (score.breakdown.sector > 10) {
      reasons.push(`Ideal sector fit (${score.breakdown.sector}%)`);
    }
    
    // Diversity boost reason
    if (score.breakdown.diversity > 10) {
      if (candidate.background === 'rural') {
        reasons.push('Rural background preference');
      }
      if (candidate.category === 'sc' || candidate.category === 'st') {
        reasons.push('Diversity inclusion boost');
      }
      if (candidate.pastInternship === 'no') {
        reasons.push('First-time applicant support');
      }
    }
    
    // Education match reason
    if (score.breakdown.education > 8) {
      reasons.push('Education requirements met');
    }
    
    // Ensure we have at least one reason
    if (reasons.length === 0) {
      reasons.push('Good overall profile match');
    }
    
    return reasons.slice(0, 3); // Return top 3 reasons
  }
}

export const matchingEngine = new SmartMatchingEngine();