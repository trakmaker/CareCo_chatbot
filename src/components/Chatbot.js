import { useState } from "react";
import { Send } from "lucide-react";


import "./Chatbot.css";  // Add a CSS file for styling

export default function HealthcareChatbot() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Welcome! How can I assist with your healthcare needs today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);
    setInput("");

    setTimeout(() => {
      let botResponse = "I'm sorry, I don't have that information.";
      if (input.toLowerCase().includes("deductible")) {
        botResponse = "Your current deductible balance is $500.";
      } else if (input.toLowerCase().includes("claim")) {
        botResponse = "Your last claim for a physical exam was approved on Jan 15, 2024.";
      } else if (input.toLowerCase().includes("doctor")) {
        botResponse = "Dr. Smith (Cardiologist) in Houston is in-network for your plan.";
      } else if (input.toLowerCase().includes("schedule appointment")) {
        botResponse = "I can schedule an appointment for you. What date and time do you prefer?";
      }
      setMessages((prev) => [...prev, { sender: "bot", text: botResponse }]);
    }, 1500);
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-bubble ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about claims, providers, etc..."
          className="chat-input"
        />
        <button onClick={handleSend} className="send-button">
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
