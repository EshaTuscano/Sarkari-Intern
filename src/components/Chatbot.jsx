import { useState, useRef, useEffect } from 'react';

const Chatbot = ({ language = 'en' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  const translations = {
    en: {
      title: "Internship Assistant",
      placeholder: "Ask about internships, eligibility, or application process...",
      suggestions: [
        "What internships are available for engineering students?",
        "How to apply for government internships?",
        "What documents are required?",
        "Tell me about stipend details"
      ]
    },
    hi: {
      title: "इंटर्नशिप सहायक",
      placeholder: "इंटर्नशिप, योग्यता, या आवेदन प्रक्रिया के बारे में पूछें...",
      suggestions: [
        "इंजीनियरिंग छात्रों के लिए कौन सी इंटर्नशिप उपलब्ध हैं?",
        "सरकारी इंटर्नशिप के लिए आवेदन कैसे करें?",
        "कौन से दस्तावेज़ आवश्यक हैं?",
        "मुझे वजीफे का विवरण बताएं"
      ]
    }
  };

  const t = translations[language];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    const userMessage = { text: inputMessage, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse = getBotResponse(inputMessage);
      setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
    }, 1000);
  };

  const getBotResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('engineering') || lowerMessage.includes('engineer')) {
      return language === 'en' 
        ? "Engineering students can apply for internships in Ministry of Electronics & IT, Ministry of Agriculture, and various technology roles. Check the Digital India Internship for tech roles."
        : "इंजीनियरिंग के छात्र इलेक्ट्रॉनिक्स और आईटी मंत्रालय, कृषि मंत्रालय और विभिन्न प्रौद्योगिकी भूमिकाओं में इंटर्नशिप के लिए आवेदन कर सकते हैं। तकनीकी भूमिकाओं के लिए डिजिटल इंडिया इंटर्नशिप देखें।";
    }
    
    if (lowerMessage.includes('apply') || lowerMessage.includes('application')) {
      return language === 'en'
        ? "To apply for government internships: 1) Fill the candidate form 2) Upload your resume 3) Check eligibility 4) Apply directly through the internship card. Most applications require basic documents and educational certificates."
        : "सरकारी इंटर्नशिप के लिए आवेदन करने के लिए: 1) उम्मीदवार फॉर्म भरें 2) अपना रिज्यूमे अपलोड करें 3) पात्रता जांचें 4) इंटर्नशिप कार्ड के माध्यम से सीधे आवेदन करें। अधिकांश आवेदनों के लिए बुनियादी दस्तावेज और शैक्षिक प्रमाण पत्र आवश्यक हैं।";
    }
    
    if (lowerMessage.includes('stipend') || lowerMessage.includes('payment')) {
      return language === 'en'
        ? "Stipends vary by internship and ministry. Typically range from ₹10,000 to ₹20,000 per month. The amount depends on the role, duration, and ministry guidelines. Specific stipend details are mentioned in each internship card."
        : "वजीफा इंटर्नशिप और मंत्रालय के अनुसार अलग-अलग होता है। आमतौर पर प्रति माह ₹10,000 से ₹20,000 तक होता है। राशि भूमिका, अवधि और मंत्रालय के दिशानिर्देशों पर निर्भर करती है। विशिष्ट वजीफा विवरण प्रत्येक इंटर्नशिप कार्ड में उल्लेखित है।";
    }
    
    return language === 'en'
      ? "I can help you with information about government internships, eligibility criteria, application process, and stipend details. Please ask specific questions for better assistance."
      : "मैं आपकी सरकारी इंटर्नशिप, पात्रता मानदंड, आवेदन प्रक्रिया और वजीफा विवरण के बारे में जानकारी में मदद कर सकता हूं। बेहतर सहायता के लिए कृपया विशिष्ट प्रश्न पूछें।";
  };

  const handleSuggestionClick = (suggestion) => {
    setInputMessage(suggestion);
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-colors z-40"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 h-96 bg-white rounded-lg shadow-xl border z-50 flex flex-col">
          {/* Header */}
          <div className="bg-blue-500 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">{t.title}</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 text-sm">
                <p>{language === 'en' ? 'Ask me about internships!' : 'मुझसे इंटर्नशिप के बारे में पूछें!'}</p>
                <div className="mt-3 space-y-2">
                  {t.suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="block w-full text-left p-2 bg-white rounded border text-xs hover:bg-gray-100 transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-3 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}
                >
                  <div
                    className={`inline-block p-3 rounded-lg max-w-[80%] ${
                      message.sender === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-white text-gray-800 border'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={t.placeholder}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 text-sm"
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-500 text-white px-4 rounded-lg hover:bg-blue-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;