const Hero = ({ onStartJourney }) => {
  return (
    <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center">
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            Find Your
            <span className="block text-yellow-300">Government Internship</span>
          </h1>
          <p className="text-xl lg:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
            AI-powered platform connecting students with perfect government internship opportunities across India
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={onStartJourney}
              className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition-colors shadow-lg"
            >
              🚀 Start Your Journey
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-blue-900 transition-colors">
              📋 Browse Internships
            </button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-300">500+</div>
              <div className="text-blue-100">Internship Opportunities</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-300">50+</div>
              <div className="text-blue-100">Government Departments</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-300">10K+</div>
              <div className="text-blue-100">Students Placed</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Wave SVG */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" className="fill-current text-white">
          <path d="M0,64L80,58.7C160,53,320,43,480,48C640,53,800,75,960,74.7C1120,75,1280,53,1360,42.7L1440,32L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;