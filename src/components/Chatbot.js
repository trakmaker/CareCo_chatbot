import { useState } from "react";
import { Send } from "lucide-react";
import "./Chatbot.css";

export default function HealthcareChatbot() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Hi there! How can I assist with your healthcare needs today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();

      if (data.reply) {
        setMessages((prev) => [...prev, { sender: "bot", text: data.reply }]);
      } else {
        setMessages((prev) => [...prev, { sender: "bot", text: "I couldn't find an answer to that." }]);
      }
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setMessages((prev) => [...prev, { sender: "bot", text: "Error: Unable to get response. Please try again later." }]);
    }

    setLoading(false);
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-bubble ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        {loading && <div className="chat-bubble bot">🤖 Typing...</div>}
      </div>
      <div className="chat-input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about claims, providers, etc..."
          className="chat-input"
        />
        <button onClick={handleSend} className="send-button" disabled={loading}>
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
