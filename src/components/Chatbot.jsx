import { useState } from "react";
import "../components/Chatbot.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! I’m your internship assistant. Ask me about skills, sectors, or resume help." }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = { from: "user", text: input };
    const botMessage = { from: "bot", text: getBotResponse(input) };
    setMessages([...messages, userMessage, botMessage]);
    setInput("");
  };

  const getBotResponse = (msg) => {
    const text = msg.toLowerCase();
    if (text.includes("skills")) return "Popular skills: Python, React, Excel, Marketing, Accounting.";
    if (text.includes("sectors")) return "Explore IT, Finance, Marketing, HR, or Engineering.";
    if (text.includes("resume")) return "Upload your resume in PDF or Word format.";
    return "Ask me about skills, sectors, or resume upload.";
  };

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white border rounded-lg shadow-lg p-2 z-50">
      <div className="h-64 overflow-y-auto mb-2 p-2 border-b">
        {messages.map((msg, i) => (
          <div key={i} className={`mb-1 ${msg.from === "bot" ? "text-left" : "text-right"}`}>
            <span className={`inline-block p-1 rounded ${msg.from === "bot" ? "bg-gray-200" : "bg-blue-500 text-white"}`}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 border p-1 rounded"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend} className="ml-1 bg-blue-500 text-white px-2 rounded">Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
