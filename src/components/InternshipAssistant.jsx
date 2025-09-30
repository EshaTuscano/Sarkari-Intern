// components/InternshipAssistant.jsx
import { useState, useRef, useEffect } from 'react';

const InternshipAssistant = () => {
  // ... (same state as above)

  const predefinedQuestions = [
    "What internships are available?",
    "How do I apply for an internship?",
    "What skills are required?",
    "Tell me about the application process"
  ];

  return (
    <>
      {/* Chat interface */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute bottom-16 right-0 w-80 bg-white rounded-2xl shadow-xl border border-gray-200">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">Internship Assistant</h3>
                  <p className="text-blue-100 text-sm">AI-powered help</p>
                </div>
              </div>
            </div>

            {/* Quick Questions */}
            <div className="p-4 border-b">
              <p className="text-sm text-gray-600 mb-2">Quick questions:</p>
              <div className="flex flex-wrap gap-2">
                {predefinedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setInputMessage(question);
                      // Auto-send after a short delay
                      setTimeout(() => {
                        document.querySelector('form button[type="submit"]').click();
                      }, 100);
                    }}
                    className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>

            {/* Messages & Input (same as before) */}
            {/* ... */}
          </div>
        )}
      </div>
    </>
  );
};

export default InternshipAssistant;