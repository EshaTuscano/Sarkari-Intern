const Features = () => {
  const features = [
    {
      icon: "🤖",
      title: "AI-Powered Matching",
      description: "Smart algorithm matches your skills and interests with the perfect government internships"
    },
    {
      icon: "⚡",
      title: "Quick Application",
      description: "Apply to multiple internships with pre-filled information and automated processes"
    },
    {
      icon: "🎯",
      title: "Personalized Recommendations",
      description: "Get tailored suggestions based on your education, skills, and career goals"
    },
    {
      icon: "📊",
      title: "Real-time Tracking",
      description: "Track your application status and get updates on new opportunities"
    },
    {
      icon: "🏛️",
      title: "Government Verified",
      description: "All internships are verified and sourced directly from government departments"
    },
    {
      icon: "💼",
      title: "Career Growth",
      description: "Build your career with prestigious government internships and references"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose Sarkari Intern?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We make finding and applying for government internships simple, smart, and efficient
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;