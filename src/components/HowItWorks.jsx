import React from "react";
import { User, Brain, Target, BookOpen, ArrowRight, Rocket, Shield, Users, Zap } from "lucide-react";

const HowItWorks = ({ language = 'en' }) => {
  const translations = {
    en: {
      title: "Smart Placement Process",
      subtitle: "From profile creation to internship success - our AI guides you every step of the way",
      aiPowered: "AI-Powered Smart Process",
      step1: "Create Smart Profile",
      step1Desc: "Tell us about your skills, education, interests, and career goals with AI-assisted form filling",
      step1Details: [
        "Personal information",
        "Educational background",
        "Skills & competencies",
        "Career preferences",
        "Location preferences",
        "Diversity information"
      ],
      step2: "AI Analysis & Smart Matching",
      step2Desc: "Our intelligent system uses weighted scoring (Skills 40%, Location 20%, Diversity 20%, Experience 20%)",
      step2Details: [
        "Weighted skill matching",
        "Location preference alignment",
        "Diversity & inclusion scoring",
        "Past experience evaluation"
      ],
      step3: "Get Smart Recommendations",
      step3Desc: "Receive AI-curated internship matches with transparent score breakdown and skill gap analysis",
      step3Details: [
        "AI-curated opportunities",
        "Transparent match scores",
        "Skill gap insights",
        "Application readiness"
      ],
      step4: "Smart Skill Development",
      step4Desc: "Access personalized learning paths to bridge skill gaps and enhance your candidacy",
      step4Details: [
        "Personalized learning paths",
        "SWAYAM courses integration",
        "Skill India programs",
        "Industry certifications"
      ],
      benefits: {
        accuracy: "95% Smart Match Accuracy",
        accuracyDesc: "Our AI provides highly accurate matches using weighted scoring algorithms",
        mentor: "24/7 AI Career Guide",
        mentorDesc: "Get instant smart guidance on applications, skill development, and career decisions",
        development: "Free Smart Skill Development",
        developmentDesc: "Access curated courses from government and industry partners",
        placement: "Government Certified",
        placementDesc: "Official PM Internship Smart Placement initiative with verified opportunities"
      },
      cta: "Start Your Smart Journey",
      trust: "Trusted by thousands of students across India"
    },
    hi: {
      title: "स्मार्ट प्लेसमेंट प्रक्रिया",
      subtitle: "प्रोफाइल बनाने से लेकर इंटर्नशिप सफलता तक - हमारी AI आपको हर कदम पर मार्गदर्शन करती है",
      aiPowered: "AI-पावर्ड स्मार्ट प्रक्रिया",
      step1: "स्मार्ट प्रोफाइल बनाएं",
      step1Desc: "AI-सहायक फॉर्म भरने के साथ अपने कौशल, शिक्षा, रुचियों और करियर लक्ष्यों के बारे में बताएं",
      step1Details: [
        "व्यक्तिगत जानकारी",
        "शैक्षिक पृष्ठभूमि",
        "कौशल और क्षमताएं",
        "करियर प्राथमिकताएं",
        "स्थान वरीयताएं",
        "विविधता जानकारी"
      ],
      step2: "AI विश्लेषण और स्मार्ट मिलान",
      step2Desc: "हमारी बुद्धिमान प्रणाली भारित स्कोरिंग (कौशल 40%, स्थान 20%, विविधता 20%, अनुभव 20%) का उपयोग करती है",
      step2Details: [
        "भारित कौशल मिलान",
        "स्थान वरीयता संरेखण",
        "विविधता और समावेशन स्कोरिंग",
        "पिछले अनुभव मूल्यांकन"
      ],
      step3: "स्मार्ट सिफारिशें प्राप्त करें",
      step3Desc: "पारदर्शी स्कोर ब्रेकडाउन और कौशल अंतर विश्लेषण के साथ AI-क्यूरेटेड इंटर्नशिप मैच प्राप्त करें",
      step3Details: [
        "AI-क्यूरेटेड अवसर",
        "पारदर्शी मैच स्कोर",
        "कौशल अंतर अंतर्दृष्टि",
        "आवेदन तत्परता"
      ],
      step4: "स्मार्ट कौशल विकास",
      step4Desc: "कौशल अंतर को पाटने और अपनी उम्मीदवारी बढ़ाने के लिए व्यक्तिगत सीखने के रास्ते तक पहुंचें",
      step4Details: [
        "व्यक्तिगत सीखने के रास्ते",
        "SWAYAM पाठ्यक्रम एकीकरण",
        "स्किल इंडिया कार्यक्रम",
        "उद्योग प्रमाणपत्र"
      ],
      benefits: {
        accuracy: "95% स्मार्ट मैच सटीकता",
        accuracyDesc: "हमारी AI भारित स्कोरिंग एल्गोरिदम का उपयोग करके अत्यधिक सटीक मैच प्रदान करती है",
        mentor: "24/7 AI करियर गाइड",
        mentorDesc: "आवेदन, कौशल विकास और करियर निर्णयों पर तत्काल स्मार्ट मार्गदर्शन प्राप्त करें",
        development: "मुफ्त स्मार्ट कौशल विकास",
        developmentDesc: "सरकार और उद्योग भागीदारों से क्यूरेटेड पाठ्यक्रमों तक पहुंचें",
        placement: "सरकार प्रमाणित",
        placementDesc: "सत्यापित अवसरों के साथ आधिकारिक PM इंटर्नशिप स्मार्ट प्लेसमेंट पहल"
      },
      cta: "अपनी स्मार्ट यात्रा शुरू करें",
      trust: "पूरे भारत में हजारों छात्रों द्वारा विश्वसनीय"
    }
  };

  const t = translations[language];

  const steps = [
    {
      icon: User,
      step: "01",
      title: t.step1,
      description: t.step1Desc,
      details: t.step1Details,
      gradient: "from-blue-500 to-cyan-400"
    },
    {
      icon: Brain,
      step: "02",
      title: t.step2,
      description: t.step2Desc,
      details: t.step2Details,
      gradient: "from-purple-500 to-pink-400"
    },
    {
      icon: Target,
      step: "03",
      title: t.step3,
      description: t.step3Desc,
      details: t.step3Details,
      gradient: "from-green-500 to-emerald-400"
    },
    {
      icon: BookOpen,
      step: "04",
      title: t.step4,
      description: t.step4Desc,
      details: t.step4Details,
      gradient: "from-orange-500 to-yellow-400"
    },
  ];

  const benefits = [
    {
      icon: Target,
      title: t.benefits.accuracy,
      description: t.benefits.accuracyDesc,
      color: "green",
      bgColor: "bg-green-100",
      iconColor: "text-green-500"
    },
    {
      icon: Zap,
      title: t.benefits.mentor,
      description: t.benefits.mentorDesc,
      color: "yellow",
      bgColor: "bg-yellow-100",
      iconColor: "text-yellow-500"
    },
    {
      icon: BookOpen,
      title: t.benefits.development,
      description: t.benefits.developmentDesc,
      color: "blue",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-500"
    },
    {
      icon: Shield,
      title: t.benefits.placement,
      description: t.benefits.placementDesc,
      color: "purple",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-500"
    }
  ];

  return (
    <section id="how-it-works" className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
              <Rocket className="h-6 w-6 text-white" />
            </div>
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-600 border border-blue-200">
              <Brain className="h-3 w-3 mr-2" />
              {t.aiPowered}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {t.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Flow line for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 transform -translate-y-1/2 z-0 shadow-lg" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                <div className="bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 p-6 text-center z-10 relative hover:-translate-y-2">
                  {/* Step number with gradient */}
                  <div className={`bg-gradient-to-r ${step.gradient} text-white rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4 font-bold text-lg shadow-lg`}>
                    {step.step}
                  </div>

                  {/* Icon */}
                  <div className="relative">
                    <step.icon className="h-12 w-12 mx-auto mb-4 text-gray-700" />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-10 rounded-full transition-opacity duration-300" />
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-xl mb-4 text-gray-800">{step.title}</h3>

                  {/* Description */}
                  <p className="text-gray-600 mb-6 text-sm leading-relaxed min-h-[60px]">
                    {step.description}
                  </p>

                  {/* Details */}
                  <ul className="space-y-2 text-sm text-gray-500">
                    {step.details.map((detail, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 hover:bg-blue-50 transition-colors"
                      >
                        <div className={`w-2 h-2 bg-gradient-to-r ${step.gradient} rounded-full flex-shrink-0`} />
                        <span className="text-left">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Mobile arrow */}
                {index < steps.length - 1 && (
                  <div className="flex justify-center lg:hidden mt-6 mb-2">
                    <ArrowRight className="h-6 w-6 text-blue-500 animate-pulse" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Smart Benefits */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              {language === 'en' ? 'Why Choose Smart Placement?' : 'स्मार्ट प्लेसमेंट क्यों चुनें?'}
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t.trust}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className={`${benefit.bgColor} rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>
                <benefit.icon className={`h-10 w-10 mx-auto mb-4 ${benefit.iconColor}`} />
                <h4 className="font-bold text-lg mb-3 text-gray-800">{benefit.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-2xl">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              {language === 'en' ? 'Ready to Start Your Smart Journey?' : 'अपनी स्मार्ट यात्रा शुरू करने के लिए तैयार हैं?'}
            </h3>
            <p className="text-blue-100 mb-6 text-lg max-w-2xl mx-auto">
              {language === 'en' 
                ? 'Join thousands of students who have found their perfect internships through AI-powered matching'
                : 'AI-पावर्ड मिलान के माध्यम से अपनी परफेक्ट इंटर्नशिप ढूंढने वाले हजारों छात्रों में शामिल हों'
              }
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2 mx-auto">
              <Rocket className="h-5 w-5" />
              {t.cta}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;