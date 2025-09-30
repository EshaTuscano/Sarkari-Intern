import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Signup = ({ onClose, onSwitchToLogin, language }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    education: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();

  const translations = {
    en: {
      title: "Join Smart Placement",
      subtitle: "Start your AI-powered internship journey with us",
      name: "Full Name",
      email: "Email Address",
      phone: "Phone Number",
      education: "Current Education Level",
      password: "Password",
      confirmPassword: "Confirm Password",
      signup: "Create Smart Account",
      haveAccount: "Already have a smart account?",
      login: "Sign in to Smart Portal",
      passwordMismatch: "Passwords do not match",
      userExists: "User already exists with this email",
      strength: "Password strength",
      weak: "Weak",
      medium: "Medium",
      strong: "Strong",
      loading: "Creating your smart account...",
      success: "Welcome to PM Internship Smart Placement!",
      benefits: "Your Smart Benefits:",
      benefit1: "AI-Powered Matching",
      benefit2: "Personalized Recommendations",
      benefit3: "Progress Tracking",
      benefit4: "Smart Applications",
      benefit5: "Government Certified",
      benefit6: "24/7 AI Support",
      phonePlaceholder: "Enter your WhatsApp number",
      educationPlaceholder: "Select your education level",
      namePlaceholder: "Enter your full name",
      emailPlaceholder: "Enter your email address",
      passwordPlaceholder: "Create a strong password",
      confirmPasswordPlaceholder: "Re-enter your password",
      security: "Your data is secure with us",
      terms: "By creating an account, you agree to our Terms and Privacy Policy",
      enrollmentId: "Enrollment ID",
      enrollmentGenerated: "Your unique enrollment ID will be generated automatically",
      welcomeMessage: "Welcome to the PM Internship Smart Placement program!"
    },
    hi: {
      title: "स्मार्ट प्लेसमेंट में शामिल हों",
      subtitle: "हमारे साथ अपनी AI-पावर्ड इंटर्नशिप यात्रा शुरू करें",
      name: "पूरा नाम",
      email: "ईमेल पता",
      phone: "फोन नंबर",
      education: "वर्तमान शिक्षा स्तर",
      password: "पासवर्ड",
      confirmPassword: "पासवर्ड की पुष्टि करें",
      signup: "स्मार्ट खाता बनाएं",
      haveAccount: "पहले से ही स्मार्ट खाता है?",
      login: "स्मार्ट पोर्टल में साइन इन करें",
      passwordMismatch: "पासवर्ड मेल नहीं खाते",
      userExists: "इस ईमेल से उपयोगकर्ता पहले से मौजूद है",
      strength: "पासवर्ड सुरक्षा",
      weak: "कमज़ोर",
      medium: "मध्यम",
      strong: "मज़बूत",
      loading: "आपका स्मार्ट खाता बनाया जा रहा है...",
      success: "PM इंटर्नशिप स्मार्ट प्लेसमेंट में स्वागत है!",
      benefits: "आपके स्मार्ट लाभ:",
      benefit1: "AI-पावर्ड मिलान",
      benefit2: "व्यक्तिगत सिफारिशें",
      benefit3: "प्रगति ट्रैकिंग",
      benefit4: "स्मार्ट आवेदन",
      benefit5: "सरकार प्रमाणित",
      benefit6: "24/7 AI सहायता",
      phonePlaceholder: "अपना व्हाट्सएप नंबर दर्ज करें",
      educationPlaceholder: "अपना शिक्षा स्तर चुनें",
      namePlaceholder: "अपना पूरा नाम दर्ज करें",
      emailPlaceholder: "अपना ईमेल पता दर्ज करें",
      passwordPlaceholder: "एक मजबूत पासवर्ड बनाएं",
      confirmPasswordPlaceholder: "अपना पासवर्ड दोबारा दर्ज करें",
      security: "आपका डेटा हमारे साथ सुरक्षित है",
      terms: "खाता बनाकर, आप हमारे नियम और गोपनीयता नीति से सहमत होते हैं",
      enrollmentId: "नामांकन आईडी",
      enrollmentGenerated: "आपकी अद्वितीय नामांकन आईडी स्वचालित रूप से जनरेट की जाएगी",
      welcomeMessage: "PM इंटर्नशिप स्मार्ट प्लेसमेंट कार्यक्रम में आपका स्वागत है!"
    }
  };

  const t = translations[language];

  const educationOptions = {
    en: {
      highschool: "High School",
      bachelors: "Bachelor's Degree",
      masters: "Master's Degree",
      phd: "PhD"
    },
    hi: {
      highschool: "हाई स्कूल",
      bachelors: "स्नातक",
      masters: "परास्नातक",
      phd: "डॉक्टरेट"
    }
  };

  // Generate unique enrollment ID
  const generateEnrollmentId = () => {
    const currentYear = new Date().getFullYear();
    
    // Get the last used enrollment number from localStorage
    const lastEnrollmentData = localStorage.getItem('lastEnrollmentData');
    let lastNumber = 1;
    
    if (lastEnrollmentData) {
      const data = JSON.parse(lastEnrollmentData);
      // If it's the same year, increment the number, otherwise start from 1
      if (data.year === currentYear) {
        lastNumber = data.lastNumber + 1;
      }
    }
    
    // Update the last enrollment data
    localStorage.setItem('lastEnrollmentData', JSON.stringify({
      year: currentYear,
      lastNumber: lastNumber
    }));
    
    // Format the number with leading zeros (0001, 0002, etc.)
    const formattedNumber = lastNumber.toString().padStart(4, '0');
    
    return `PM-${currentYear}-${formattedNumber}`;
  };

  const getPasswordStrength = (password) => {
    if (password.length === 0) return { strength: 0, label: '' };
    if (password.length < 6) return { strength: 1, label: t.weak };
    if (password.length < 8) return { strength: 2, label: t.medium };
    
    // Check for strong password criteria
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    const strengthScore = [hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChar].filter(Boolean).length;
    
    if (strengthScore >= 3 && password.length >= 8) return { strength: 3, label: t.strong };
    if (strengthScore >= 2) return { strength: 2, label: t.medium };
    return { strength: 1, label: t.weak };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError(t.passwordMismatch);
      setIsLoading(false);
      return;
    }

    // Check password strength
    if (passwordStrength.strength < 2) {
      setError(language === 'en' ? 'Please use a stronger password' : 'कृपया एक मजबूत पासवर्ड का उपयोग करें');
      setIsLoading(false);
      return;
    }

    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.email === formData.email)) {
      setError(t.userExists);
      setIsLoading(false);
      return;
    }

    // Create new user with enrollment ID
    setTimeout(() => {
      const enrollmentId = generateEnrollmentId();
      
      const newUser = {
        id: 'user_' + Date.now(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        education: formData.education,
        password: formData.password,
        enrollmentId: enrollmentId,
        createdAt: new Date().toISOString(),
        profileComplete: false
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      
      signup(newUser);
      
      // Show success message with enrollment ID
      alert(
        language === 'en' 
          ? `${t.success}\n\nYour Enrollment ID: ${enrollmentId}\n\n${t.welcomeMessage}`
          : `${t.success}\n\nआपकी नामांकन आईडी: ${enrollmentId}\n\n${t.welcomeMessage}`
      );
      
      onClose();
      setIsLoading(false);
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleDemoFill = () => {
    setFormData({
      name: 'Aarav Sharma',
      email: 'demo@pminternship.com',
      phone: '+91 9876543210',
      education: 'bachelors',
      password: 'SmartPass123!',
      confirmPassword: 'SmartPass123!'
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

      <div className="relative w-full max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden flex">
        {/* Left Side - Benefits & Branding */}
        <div className="hidden lg:flex lg:w-2/5 bg-gradient-to-br from-blue-600 to-purple-700 p-8 text-white flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                <span className="text-blue-600 font-bold text-xl">PM</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">PM Internship</h1>
                <p className="text-blue-200 text-sm">Smart Placement</p>
              </div>
            </div>
            
            <h2 className="text-3xl font-bold mb-6">{t.title}</h2>
            <p className="text-blue-100 mb-8 leading-relaxed text-lg">{t.subtitle}</p>
            
            <div className="space-y-6">
              <h3 className="font-semibold text-blue-200 text-sm uppercase tracking-wide">
                {t.benefits}
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">🤖</span>
                  </div>
                  <div>
                    <span className="text-white font-medium">{t.benefit1}</span>
                    <p className="text-blue-200 text-sm">Weighted AI matching algorithm</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">🎯</span>
                  </div>
                  <div>
                    <span className="text-white font-medium">{t.benefit2}</span>
                    <p className="text-blue-200 text-sm">Personalized internship matches</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">📊</span>
                  </div>
                  <div>
                    <span className="text-white font-medium">{t.benefit3}</span>
                    <p className="text-blue-200 text-sm">Track your application journey</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">🚀</span>
                  </div>
                  <div>
                    <span className="text-white font-medium">{t.benefit4}</span>
                    <p className="text-blue-200 text-sm">Smart form filling & exports</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-500/20 rounded-lg p-4 border border-blue-400/30">
            <p className="text-blue-100 text-sm text-center">
              {language === 'en' 
                ? '🔒 Secure & Encrypted • 🇮🇳 Government Certified • 🤖 AI-Powered'
                : '🔒 सुरक्षित और एन्क्रिप्टेड • 🇮🇳 सरकार प्रमाणित • 🤖 AI-पावर्ड'
              }
            </p>
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="w-full lg:w-3/5 p-8 lg:p-12">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="max-w-md mx-auto">
            {/* Mobile Branding */}
            <div className="lg:hidden flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">PM</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">PM Internship</h1>
                <p className="text-gray-600 text-sm">Smart Placement</p>
              </div>
            </div>

            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                {language === 'en' ? 'Create Smart Account' : 'स्मार्ट खाता बनाएं'}
              </h2>
              <p className="text-gray-600 text-lg">{t.subtitle}</p>
              
              {/* Enrollment ID Info */}
              <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 text-blue-700 text-sm">
                  <span>🆔</span>
                  <span>{t.enrollmentGenerated}</span>
                </div>
              </div>
            </div>

            {/* Demo Fill Button */}
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <button
                onClick={handleDemoFill}
                className="w-full bg-blue-500 text-white py-2 rounded-lg text-sm hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
              >
                <span>🎯</span>
                {language === 'en' ? 'Fill with Demo Data' : 'डेमो डेटा से भरें'}
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Input */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  {t.name}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t.namePlaceholder}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  required
                />
              </div>

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

              {/* Phone Input */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  {t.phone}
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={t.phonePlaceholder}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>

              {/* Education Level */}
              <div>
                <label htmlFor="education" className="block text-sm font-medium text-gray-700 mb-2">
                  {t.education}
                </label>
                <select
                  id="education"
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="">{t.educationPlaceholder}</option>
                  {Object.entries(educationOptions[language]).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  {t.password}
                </label>
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
                {formData.password && (
                  <div className="mt-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">{t.strength}</span>
                      <span className={`font-medium ${
                        passwordStrength.strength === 1 ? 'text-red-600' :
                        passwordStrength.strength === 2 ? 'text-yellow-600' : 'text-green-600'
                      }`}>
                        {passwordStrength.label}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          passwordStrength.strength === 1 ? 'bg-red-500 w-1/3' :
                          passwordStrength.strength === 2 ? 'bg-yellow-500 w-2/3' : 'bg-green-500 w-full'
                        }`}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  {t.confirmPassword}
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder={t.confirmPasswordPlaceholder}
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

              {/* Terms Agreement */}
              <div className="text-center text-xs text-gray-500">
                <p>{t.terms}</p>
              </div>

              {/* Signup Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    {t.loading}
                  </>
                ) : (
                  <>
                    <span className="text-xl">🚀</span>
                    {t.signup}
                  </>
                )}
              </button>
            </form>

            {/* Login Link */}
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                {t.haveAccount}{' '}
                <button
                  onClick={onSwitchToLogin}
                  className="text-blue-600 hover:text-blue-500 font-semibold"
                >
                  {t.login}
                </button>
              </p>
            </div>

            {/* Security Badge */}
            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500">
              <span>🛡️</span>
              <span>{t.security}</span>
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

export default Signup;