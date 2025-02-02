import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Send } from "lucide-react";

export default function HealthcareChatbot() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Welcome! How can I assist with your healthcare needs today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
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
    <div className="max-w-xl mx-auto p-4">
      <Card className="shadow-md p-4">
        <CardContent>
          <div className="h-96 overflow-y-auto border rounded-lg p-2 bg-gray-100">
            {messages.map((msg, index) => (
              <div key={index} className={`mb-2 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                <span className={`inline-block p-2 rounded-lg ${msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-300"}`}>
                  {msg.text}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-2">
            <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about claims, providers, etc..." />
            <Button onClick={handleSend} className="bg-blue-500 text-white">
              <Send size={18} />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
