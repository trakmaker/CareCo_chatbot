import { useState } from "react";
import { Send } from "lucide-react";
import OpenAI from "openai";
import "./Chatbot.css";

// Initialize OpenAI API
const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY, // Store this in .env file
  dangerouslyAllowBrowser: true, // Required for browser-based requests
});

export default function HealthcareChatbot() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Welcome! How can I assist with your healthcare needs today?" },
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
      // Call OpenAI API
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "system", content: "You are a healthcare assistant chatbot." }, { role: "user", content: input }],
        max_tokens: 100,
      });

      const botResponse = response.choices[0].message.content || "I'm sorry, I don't have that information.";
      setMessages((prev) => [...prev, { sender: "bot", text: botResponse }]);
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
        {loading && <div className="chat-bubble bot">Thinking...</div>}
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
