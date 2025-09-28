import { useState } from "react";
import "../components/ResumeUpload.css";

const ResumeUpload = ({ onFile }) => {
  const [dragActive, setDragActive] = useState(false);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) onFile(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div
      className={`upload-box border-2 border-dashed p-6 text-center mb-6 rounded-lg ${
        dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white"
      }`}
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
    >
      <input type="file" accept=".pdf,.doc,.docx" onChange={handleChange} className="hidden" id="resumeInput"/>
      <label htmlFor="resumeInput" className="cursor-pointer">
        {dragActive ? "Drop your file here" : "Drag & drop your resume here, or click to upload"}
      </label>
    </div>
  );
};

export default ResumeUpload;
