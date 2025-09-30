import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Login = ({ onClose, onSwitchToSignup, language }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const translations = {
    en: {
      welcomeBack: "Welcome to Smart Placement",
      subtitle: "Login to continue your AI-powered internship journey",
      email: "Email Address",
      password: "Password",
      forgotPassword: "Forgot Password?",
      login: "Login to Smart Portal",
      error: "Invalid email or password",
      demoHint: "Quick demo access:",
      noAccount: "New to Smart Placement?",
      signup: "Create Smart Account",
      loading: "Accessing Smart System...",
      success: "Welcome to PM Internship Smart Placement!",
      emailPlaceholder: "Enter your registered email",
      passwordPlaceholder: "Enter your password",
      close: "Close",
      smartFeatures: "Smart Features Await You:",
      feature1: "AI-Powered Matching",
      feature2: "Personalized Recommendations",
      feature3: "Progress Tracking",
      feature4: "Smart Applications"
    },
    hi: {
      welcomeBack: "स्मार्ट प्लेसमेंट में स्वागत है",
      subtitle: "अपनी AI-पावर्ड इंटर्नशिप यात्रा जारी रखने के लिए लॉगिन करें",
      email: "ईमेल पता",
      password: "पासवर्ड",
      forgotPassword: "पासवर्ड भूल गए?",
      login: "स्मार्ट पोर्टल में लॉगिन करें",
      error: "अमान्य ईमेल या पासवर्ड",
      demoHint: "त्वरित डेमो एक्सेस:",
      noAccount: "स्मार्ट प्लेसमेंट में नए हैं?",
      signup: "स्मार्ट खाता बनाएं",
      loading: "स्मार्ट सिस्टम एक्सेस किया जा रहा है...",
      success: "PM इंटर्नशिप स्मार्ट प्लेसमेंट में स्वागत है!",
      emailPlaceholder: "अपना रजिस्टर्ड ईमेल दर्ज करें",
      passwordPlaceholder: "अपना पासवर्ड दर्ज करें",
      close: "बंद करें",
      smartFeatures: "स्मार्ट फीचर्स आपका इंतजार कर रहे हैं:",
      feature1: "AI-पावर्ड मिलान",
      feature2: "व्यक्तिगत सिफारिशें",
      feature3: "प्रगति ट्रैकिंग",
      feature4: "स्मार्ट आवेदन"
    }
  };

  const t = translations[language];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!formData.email || !formData.password) {
      setError(t.error);
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(
        u => u.email === formData.email && u.password === formData.password
      );

      if (user) {
        login(user);
        // Show success message
        alert(t.success);
        onClose();
      } else {
        setError(t.error);
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleDemoLogin = () => {
    setFormData({
      email: 'demo@pminternship.com',
      password: 'password123'
    });
  };

  const handleAdminDemo = () => {
    setFormData({
      email: 'admin@pminternship.com',
      password: 'admin123'
    });
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden flex">
        {/* Left Side - Branding & Features */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-600 to-purple-700 p-8 text-white flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <span className="text-blue-600 font-bold text-lg">PM</span>
              </div>
              <div>
                <h1 className="text-xl font-bold">PM Internship</h1>
                <p className="text-blue-200 text-sm">Smart Placement</p>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold mb-6">{t.welcomeBack}</h2>
            <p className="text-blue-100 mb-8 leading-relaxed">{t.subtitle}</p>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-blue-200 text-sm uppercase tracking-wide">
                {t.smartFeatures}
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">🤖</span>
                  </div>
                  <span className="text-white">{t.feature1}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">🎯</span>
                  </div>
                  <span className="text-white">{t.feature2}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">📊</span>
                  </div>
                  <span className="text-white">{t.feature3}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">🚀</span>
                  </div>
                  <span className="text-white">{t.feature4}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-500/20 rounded-lg p-4 border border-blue-400/30">
            <p className="text-blue-100 text-sm text-center">
              {language === 'en' 
                ? 'Powered by AI • Government Certified • Secure Platform'
                : 'AI द्वारा संचालित • सरकार प्रमाणित • सुरक्षित प्लेटफॉर्म'
              }
            </p>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="max-w-sm mx-auto">
            {/* Mobile Branding */}
            <div className="md:hidden flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">PM</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">PM Internship</h1>
                <p className="text-gray-600 text-sm">Smart Placement</p>
              </div>
            </div>

            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {language === 'en' ? 'Welcome Back' : 'वापस स्वागत है'}
              </h2>
              <p className="text-gray-600">{t.subtitle}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  {t.email}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t.emailPlaceholder}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  required
                />
              </div>

              {/* Password Input */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    {t.password}
                  </label>
                  <button type="button" className="text-sm text-blue-600 hover:text-blue-500">
                    {t.forgotPassword}
                  </button>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder={t.passwordPlaceholder}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  required
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm text-center">{error}</p>
                </div>
              )}

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    {t.loading}
                  </>
                ) : (
                  <>
                    <span>🔐</span>
                    {t.login}
                  </>
                )}
              </button>
            </form>

            {/* Demo Access Section */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600 text-center mb-3">{t.demoHint}</p>
              <div className="flex gap-2">
                <button
                  onClick={handleDemoLogin}
                  className="flex-1 bg-blue-500 text-white py-2 rounded text-sm hover:bg-blue-600 transition-colors"
                >
                  {language === 'en' ? 'Student Demo' : 'छात्र डेमो'}
                </button>
                <button
                  onClick={handleAdminDemo}
                  className="flex-1 bg-purple-500 text-white py-2 rounded text-sm hover:bg-purple-600 transition-colors"
                >
                  {language === 'en' ? 'Admin Demo' : 'एडमिन डेमो'}
                </button>
              </div>
            </div>

            {/* Signup Link */}
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                {t.noAccount}{' '}
                <button
                  onClick={onSwitchToSignup}
                  className="text-blue-600 hover:text-blue-500 font-semibold"
                >
                  {t.signup}
                </button>
              </p>
            </div>

            {/* Security Badge */}
            <div className="mt-8 flex items-center justify-center gap-2 text-xs text-gray-500">
              <span>🔒</span>
              <span>
                {language === 'en' 
                  ? 'Secure & Encrypted Login' 
                  : 'सुरक्षित और एन्क्रिप्टेड लॉगिन'
                }
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Blob Animation */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Login;