// Enhanced allocation engine with fairness and optimization
export class SmartAllocationEngine {
  constructor() {
    this.weights = {
      skills: 0.40,
      location: 0.20,
      diversity: 0.20,
      experience: 0.10,
      education: 0.10
    };
  }

  // Calculate comprehensive match score
  calculateMatchScore(candidate, internship) {
    const scores = {
      skills: this.calculateSkillsMatch(candidate.skills, internship.requiredSkills),
      location: this.calculateLocationMatch(candidate.locationPreference, internship.locationType),
      diversity: this.calculateDiversityBoost(candidate),
      experience: this.calculateExperienceMatch(candidate.pastInternship, internship.minExperience),
      education: this.calculateEducationMatch(candidate.education, internship.minEducation)
    };

    // Apply weights
    let totalScore = 0;
    Object.keys(scores).forEach(key => {
      totalScore += scores[key] * this.weights[key];
    });

    return {
      ...scores,
      total: Math.round(totalScore * 100),
      breakdown: this.getScoreBreakdown(scores)
    };
  }

  calculateSkillsMatch(candidateSkills, requiredSkills) {
    if (!candidateSkills || !requiredSkills) return 0;
    
    const candidateSkillSet = new Set(candidateSkills.map(s => s.toLowerCase()));
    const requiredSkillSet = new Set(requiredSkills.map(s => s.toLowerCase()));
    
    const intersection = [...requiredSkillSet].filter(skill => candidateSkillSet.has(skill));
    return intersection.length / requiredSkillSet.size;
  }

  calculateLocationMatch(candidatePreference, internshipLocation) {
    const locationMatrix = {
      metro: { metro: 1.0, tier2: 0.7, tier3: 0.4, rural: 0.2 },
      tier2: { metro: 0.7, tier2: 1.0, tier3: 0.8, rural: 0.5 },
      tier3: { metro: 0.4, tier2: 0.8, tier3: 1.0, rural: 0.7 },
      rural: { metro: 0.2, tier2: 0.5, tier3: 0.7, rural: 1.0 }
    };

    return locationMatrix[candidatePreference]?.[internshipLocation] || 0.1;
  }

  calculateDiversityBoost(candidate) {
    let boost = 0;
    
    // Rural background boost
    if (candidate.background === 'rural') boost += 0.3;
    
    // Category-based diversity boost
    const categoryBoost = {
      sc: 0.4,
      st: 0.4,
      obc: 0.2,
      general: 0.0
    };
    boost += categoryBoost[candidate.category] || 0;
    
    // First-time applicant boost
    if (candidate.pastInternship === 'no') boost += 0.3;
    
    return Math.min(boost, 1.0);
  }

  calculateExperienceMatch(hasExperience, minExperience) {
    if (!minExperience) return 1.0;
    if (hasExperience === 'yes') return 1.0;
    return 0.5; // Reduced but not eliminated for fresh candidates
  }

  calculateEducationMatch(candidateEducation, minEducation) {
    const educationLevels = {
      highschool: 1,
      bachelors: 2,
      masters: 3,
      phd: 4
    };
    
    const candidateLevel = educationLevels[candidateEducation] || 0;
    const requiredLevel = educationLevels[minEducation] || 0;
    
    if (candidateLevel >= requiredLevel) return 1.0;
    return candidateLevel / requiredLevel;
  }

  getScoreBreakdown(scores) {
    return Object.keys(scores).map(key => ({
      factor: key,
      score: Math.round(scores[key] * 100),
      weight: Math.round(this.weights[key] * 100),
      weightedScore: Math.round(scores[key] * this.weights[key] * 100)
    }));
  }

  // Batch allocation for multiple candidates
  allocateCandidates(candidates, internships, options = {}) {
    const {
      maxAllocationsPerInternship = 10,
      enableFairness = true,
      diversityQuota = 0.3 // 30% diversity quota
    } = options;

    const allocations = [];
    const internshipCapacity = {};
    const diversityAllocations = {};

    // Initialize capacity tracking
    internships.forEach(intern => {
      internshipCapacity[intern.id] = 0;
      diversityAllocations[intern.id] = 0;
    });

    // Sort candidates by overall potential score
    const sortedCandidates = candidates
      .map(candidate => {
        const scores = internships.map(intern => 
          this.calculateMatchScore(candidate, intern)
        );
        const maxScore = Math.max(...scores.map(s => s.total));
        return { candidate, maxScore };
      })
      .sort((a, b) => b.maxScore - a.maxScore);

    // Allocation rounds
    for (const { candidate } of sortedCandidates) {
      const candidateAllocations = [];
      
      for (const internship of internships) {
        if (internshipCapacity[internship.id] >= maxAllocationsPerInternship) continue;

        const matchScore = this.calculateMatchScore(candidate, internship);
        
        // Apply fairness constraints
        if (enableFairness) {
          const diversityRatio = diversityAllocations[internship.id] / (internshipCapacity[internship.id] || 1);
          if (diversityRatio < diversityQuota && this.isDiversityCandidate(candidate)) {
            matchScore.total *= 1.2; // Boost for diversity candidates
          }
        }

        if (matchScore.total >= 60) { // Minimum threshold
          candidateAllocations.push({
            internship,
            matchScore,
            allocationScore: this.calculateAllocationScore(candidate, internship, matchScore)
          });
        }
      }

      // Sort by allocation score and take top 3
      candidateAllocations
        .sort((a, b) => b.allocationScore - a.allocationScore)
        .slice(0, 3)
        .forEach(allocation => {
          allocations.push({
            candidate,
            internship: allocation.internship,
            matchScore: allocation.matchScore,
            allocationId: this.generateAllocationId(),
            timestamp: new Date().toISOString(),
            status: 'recommended'
          });

          internshipCapacity[allocation.internship.id]++;
          if (this.isDiversityCandidate(candidate)) {
            diversityAllocations[allocation.internship.id]++;
          }
        });
    }

    return allocations;
  }

  isDiversityCandidate(candidate) {
    return candidate.background === 'rural' || 
           candidate.category === 'sc' || 
           candidate.category === 'st' ||
           candidate.pastInternship === 'no';
  }

  calculateAllocationScore(candidate, internship, matchScore) {
    let score = matchScore.total;
    
    // Priority for high-demand sectors
    const highDemandSectors = ['it', 'healthcare', 'education'];
    if (highDemandSectors.includes(internship.sector)) {
      score *= 1.1;
    }
    
    // Priority for government initiatives
    if (internship.governmentInitiative) {
      score *= 1.15;
    }
    
    return score;
  }

  generateAllocationId() {
    return `ALLOC-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  // Analytics for allocation fairness
  getAllocationAnalytics(allocations, candidates, internships) {
    const analytics = {
      totalAllocations: allocations.length,
      totalCandidates: candidates.length,
      totalInternships: internships.length,
      allocationRate: (allocations.length / candidates.length) * 100,
      averageMatchScore: 0,
      diversityMetrics: {},
      sectorDistribution: {},
      locationDistribution: {}
    };

    // Calculate average match score
    if (allocations.length > 0) {
      analytics.averageMatchScore = allocations.reduce((sum, alloc) => 
        sum + alloc.matchScore.total, 0) / allocations.length;
    }

    // Diversity metrics
    analytics.diversityMetrics = {
      ruralCandidates: allocations.filter(a => a.candidate.background === 'rural').length,
      scStCandidates: allocations.filter(a => 
        a.candidate.category === 'sc' || a.candidate.category === 'st'
      ).length,
      firstTimeCandidates: allocations.filter(a => 
        a.candidate.pastInternship === 'no'
      ).length
    };

    // Sector distribution
    internships.forEach(intern => {
      const count = allocations.filter(a => a.internship.id === intern.id).length;
      analytics.sectorDistribution[intern.sector] = (analytics.sectorDistribution[intern.sector] || 0) + count;
    });

    // Location distribution
    allocations.forEach(allocation => {
      const location = allocation.candidate.locationPreference;
      analytics.locationDistribution[location] = (analytics.locationDistribution[location] || 0) + 1;
    });

    return analytics;
  }
}

export const allocationEngine = new SmartAllocationEngine();