import React from "react";
import { User, Brain, Target, BookOpen, ArrowRight } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: User,
      step: "01",
      title: "Create Your Profile",
      description:
        "Tell us about your skills, education, interests, and career goals in just 2 minutes",
      details: [
        "Basic information",
        "Educational background",
        "Skills & interests",
        "Career preferences",
      ],
    },
    {
      icon: Brain,
      step: "02",
      title: "AI Analysis & Matching",
      description:
        "Our AI analyzes your profile and matches you with the most relevant internship opportunities",
      details: [
        "Skill matching",
        "Location preferences",
        "Company culture fit",
        "Growth potential",
      ],
    },
    {
      icon: Target,
      step: "03",
      title: "Get Recommendations",
      description:
        "Receive personalized internship recommendations with match scores and skill gap analysis",
      details: [
        "Curated opportunities",
        "Match percentages",
        "Skill gap insights",
        "Application deadlines",
      ],
    },
    {
      icon: BookOpen,
      step: "04",
      title: "Skill Development",
      description:
        "Access free courses and resources to bridge skill gaps and improve your candidacy",
      details: [
        "SWAYAM courses",
        "Skill India programs",
        "YouTube tutorials",
        "Certification paths",
      ],
    },
  ];

  return (
    <section id="how-it-works" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-600 border border-blue-200 mb-4">
            <Brain className="h-3 w-3 mr-1" />
            AI-Powered Process
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From profile creation to internship success - our AI guides you
            every step of the way
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Flow line for desktop */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-green-500 to-yellow-500 transform -translate-y-1/2 z-0" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-shadow p-6 text-center z-10 relative">
                  {/* Step number */}
                  <div className="bg-gradient-to-r from-blue-500 to-green-400 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 font-bold">
                    {step.step}
                  </div>

                  {/* Icon */}
                  <step.icon className="h-10 w-10 mx-auto mb-4 text-blue-500" />

                  {/* Title */}
                  <h3 className="font-semibold text-lg mb-3">{step.title}</h3>

                  {/* Description */}
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {step.description}
                  </p>

                  {/* Details */}
                  <ul className="space-y-1 text-xs text-gray-500">
                    {step.details.map((detail, i) => (
                      <li
                        key={i}
                        className="flex items-center justify-center gap-1"
                      >
                        <div className="w-1 h-1 bg-blue-500 rounded-full" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Mobile arrow */}
                {index < steps.length - 1 && (
                  <div className="flex justify-center md:hidden mt-4 mb-4">
                    <ArrowRight className="h-6 w-6 text-blue-500" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Extra benefits */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <div className="bg-green-100 rounded-xl p-6 text-center shadow-sm">
            <Target className="h-8 w-8 mx-auto mb-3 text-green-500" />
            <h4 className="font-semibold mb-2">92% Match Accuracy</h4>
            <p className="text-sm text-gray-600">
              Our AI provides highly accurate matches based on comprehensive
              profile analysis
            </p>
          </div>

          <div className="bg-yellow-100 rounded-xl p-6 text-center shadow-sm">
            <Brain className="h-8 w-8 mx-auto mb-3 text-yellow-500" />
            <h4 className="font-semibold mb-2">24/7 AI Mentor</h4>
            <p className="text-sm text-gray-600">
              Get instant guidance on applications, skill development, and
              career decisions
            </p>
          </div>

          <div className="bg-blue-100 rounded-xl p-6 text-center shadow-sm">
            <BookOpen className="h-8 w-8 mx-auto mb-3 text-blue-500" />
            <h4 className="font-semibold mb-2">Free Skill Development</h4>
            <p className="text-sm text-gray-600">
              Access curated courses from SWAYAM, Skill India, and other trusted
              platforms
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
