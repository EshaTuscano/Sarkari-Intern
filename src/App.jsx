import { useState } from "react";
import Header from "./components/Header";
import CandidateForm from "./components/CandidateForm";
import ResumeUpload from "./components/ResumeUpload";
import InternshipCard from "./components/InternshipCard";
import Chatbot from "./components/Chatbot";

function App() {
  const [recommendations, setRecommendations] = useState([]);
  const [resume, setResume] = useState(null);

  // Sample internship data
  const internships = [
    {
      title: "Frontend Developer Intern",
      company: "Tech Solutions",
      sector: "IT",
      location: "Mumbai",
      stipend: "₹10,000",
      duration: "2 months",
      skills: ["React", "HTML", "CSS"]
    },
    {
      title: "Marketing Intern",
      company: "MarketPro",
      sector: "Marketing",
      location: "Delhi",
      stipend: "₹8,000",
      duration: "3 months",
      skills: ["Social Media", "Content Creation"]
    },
    {
      title: "Finance Intern",
      company: "FinCorp",
      sector: "Finance",
      location: "Bangalore",
      stipend: "₹12,000",
      duration: "3 months",
      skills: ["Excel", "Accounting"]
    }
  ];

  // Rule-based matching
  const handleFormSubmit = (formData) => {
    const matched = internships.filter((intern) => {
      const skillMatch = formData.skills.some((s) => intern.skills.includes(s));
      const sectorMatch = formData.sectors.includes(intern.sector);
      const locationMatch = intern.location.toLowerCase().includes(formData.location.toLowerCase());
      return skillMatch && sectorMatch && locationMatch;
    });
    setRecommendations(matched.slice(0, 5));
  };

  const handleStartJourney = () => {
    document.getElementById("candidate-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header onStartJourney={handleStartJourney} />

      <main className="container mx-auto px-4 pt-32 pb-16">
        <ResumeUpload onFile={(file) => setResume(file)} />
        {resume && <p className="mb-4 text-center">Uploaded: {resume.name}</p>}

        <div id="candidate-form">
          <CandidateForm onSubmit={handleFormSubmit} />
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {recommendations.map((intern) => (
            <InternshipCard key={intern.title} intern={intern} />
          ))}
        </div>
      </main>

      <Chatbot />
    </div>
  );
}

export default App;
