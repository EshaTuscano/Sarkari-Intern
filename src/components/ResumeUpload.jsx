import { useState } from 'react';

const ResumeUpload = ({ onFile, language = 'en' }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isParsing, setIsParsing] = useState(false);

  const translations = {
    en: {
      title: "Upload Your Resume (Optional)",
      dragDrop: "Drag & drop your resume here",
      or: "or",
      browse: "Browse Files",
      supported: "Supported formats: PDF, DOC, DOCX - Max 5MB",
      note: "Uploading your resume helps us provide better recommendations",
      parsing: "Analyzing your resume...",
      success: "Resume analyzed successfully!"
    },
    hi: {
      title: "अपना रिज्यूमे अपलोड करें (वैकल्पिक)",
      dragDrop: "अपना रिज्यूमे यहाँ खींच कर छोड़ें",
      or: "या",
      browse: "फ़ाइलें चुनें",
      supported: "समर्थित प्रारूप: PDF, DOC, DOCX - अधिकतम 5MB",
      note: "रिज्यूमे अपलोड करने से हमें बेहतर सिफारिशें प्रदान करने में मदद मिलती है",
      parsing: "आपका रिज्यूमे विश्लेषण किया जा रहा है...",
      success: "रिज्यूमे सफलतापूर्वक विश्लेषित किया गया!"
    }
  };

  const t = translations[language];

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && isValidFileType(file) && isValidFileSize(file)) {
      processFile(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    if (file && isValidFileType(file) && isValidFileSize(file)) {
      processFile(file);
    }
  };

  const isValidFileType = (file) => {
    const validTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    return validTypes.includes(file.type);
  };

  const isValidFileSize = (file) => {
    return file.size <= 5 * 1024 * 1024; // 5MB
  };

  const processFile = (file) => {
    setIsParsing(true);
    // Simulate file processing and parsing
    setTimeout(() => {
      onFile(file);
      setIsParsing(false);
    }, 2000);
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
        {t.title}
      </h2>
      
      <div
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ${
          isDragging 
            ? 'border-blue-500 bg-blue-50 scale-105' 
            : isParsing
            ? 'border-yellow-500 bg-yellow-50'
            : 'border-gray-300 bg-white hover:border-blue-400 hover:bg-blue-50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !isParsing && document.getElementById('resume-input').click()}
      >
        {isParsing ? (
          <div className="flex flex-col items-center justify-center gap-3">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="text-lg text-yellow-600">{t.parsing}</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-3">
            <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="text-lg text-gray-600">{t.dragDrop}</p>
            <p className="text-sm text-gray-500">{t.or}</p>
            <button
              type="button"
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium"
              disabled={isParsing}
            >
              {t.browse}
            </button>
            <p className="text-xs text-gray-500 mt-2">{t.supported}</p>
          </div>
        )}
        
        <input
          id="resume-input"
          type="file"
          className="hidden"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          disabled={isParsing}
        />
      </div>
      
      <p className="text-center text-sm text-gray-600 mt-3">
        {t.note}
      </p>
    </div>
  );
};

export default ResumeUpload;