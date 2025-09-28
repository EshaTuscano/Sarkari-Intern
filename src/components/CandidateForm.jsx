import { useState } from "react";
import "../components/Candidateform.css";

const CandidateForm = ({ onSubmit }) => {
  const [education, setEducation] = useState("");
  const [skills, setSkills] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [location, setLocation] = useState("");

  const allSkills = ["React", "Python", "Excel", "Marketing", "Accounting"];
  const allSectors = ["IT", "Finance", "Marketing", "HR", "Engineering"];
  const allEducation = ["High School", "Diploma", "Bachelor", "Master", "PhD"];

  const toggleArrayItem = (arr, value, setArr) => {
    if (arr.includes(value)) setArr(arr.filter((i) => i !== value));
    else setArr([...arr, value]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ education, skills, sectors, location });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto"
    >
      <h2 className="text-xl font-bold mb-4">Candidate Details</h2>

      {/* Education */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Education</label>
        <select
          value={education}
          onChange={(e) => setEducation(e.target.value)}
          className="w-full border rounded px-3 py-2"
        >
          <option value="">Select Education</option>
          {allEducation.map((ed) => (
            <option key={ed} value={ed}>
              {ed}
            </option>
          ))}
        </select>
      </div>

      {/* Skills */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Skills</label>
        <div className="flex flex-wrap gap-2">
          {allSkills.map((skill) => (
            <button
              type="button"
              key={skill}
              onClick={() => toggleArrayItem(skills, skill, setSkills)}
              className={`px-3 py-1 rounded-full border ${
                skills.includes(skill) ? "bg-blue-500 text-white" : "bg-gray-100"
              }`}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>

      {/* Sectors */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Sectors</label>
        <div className="flex flex-wrap gap-2">
          {allSectors.map((sector) => (
            <button
              type="button"
              key={sector}
              onClick={() => toggleArrayItem(sectors, sector, setSectors)}
              className={`px-3 py-1 rounded-full border ${
                sectors.includes(sector) ? "bg-blue-500 text-white" : "bg-gray-100"
              }`}
            >
              {sector}
            </button>
          ))}
        </div>
      </div>

      {/* Location */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Location</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter city"
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
      >
        Find Internships
      </button>
    </form>
  );
};

export default CandidateForm;
