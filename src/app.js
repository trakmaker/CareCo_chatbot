import React from "react";
import HealthcareChatbot from "./components/Chatbot";

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">Healthcare Chatbot</h1>
      <HealthcareChatbot />
    </div>
  );
}

export default App;
