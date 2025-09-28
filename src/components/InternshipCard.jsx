import "../components/InternshipCard.css";

const InternshipCard = ({ intern }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <h3 className="font-bold text-lg mb-1">{intern.title}</h3>
      <p className="text-gray-600 mb-1">{intern.company} • {intern.sector}</p>
      <p className="text-gray-500 text-sm">{intern.location} • {intern.duration}</p>
      <p className="text-gray-500 text-sm mb-2">Stipend: {intern.stipend}</p>
      <button className="w-full bg-blue-500 text-white py-1 rounded-lg hover:bg-blue-600 transition-colors">
        Apply Now
      </button>
    </div>
  );
};

export default InternshipCard;
