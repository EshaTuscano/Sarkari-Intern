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

  // Define translations here
  const translations = {
    en: {
      welcomeBack: "Welcome Back",
      subtitle: "Login to access your account",
      email: "Email",
      password: "Password",
      forgotPassword: "Forgot Password?",
      login: "Login",
      error: "Invalid email or password",
      demoHint: "Use demo credentials:",
      noAccount: "Don't have an account?",
      signup: "Sign Up"
    },
    hi: {
      welcomeBack: "वापस स्वागत है",
      subtitle: "अपने खाते में लॉगिन करें",
      email: "ईमेल",
      password: "पासवर्ड",
      forgotPassword: "पासवर्ड भूल गए?",
      login: "लॉगिन करें",
      error: "अमान्य ईमेल या पासवर्ड",
      demoHint: "डेमो क्रेडेंशियल्स का उपयोग करें:",
      noAccount: "खाता नहीं है?",
      signup: "साइन अप करें"
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
      email: 'test@example.com',
      password: 'password123'
    });
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center z-50 p-4">
      {/* Background blobs and modal content here */}
      {/* ... your existing JSX ... */}
      <h2 className="text-3xl font-bold mb-2">{t.welcomeBack}</h2>
      <p className="text-blue-100 text-sm opacity-90">{t.subtitle}</p>
      {/* Inputs, buttons, error messages using t.email, t.password, t.login etc. */}
    </div>
  );
};

export default Login;
