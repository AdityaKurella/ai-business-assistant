"use client";

import { useState } from "react";

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Hi! I’m your AI business assistant. Ask me about customers, emails, automation, or analytics.",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    setMessages((prev) => [...prev, { role: "user", text: trimmed }]);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "Demo AI response: I can help you automate emails, manage customers, and analyze business workflows.",
        },
      ]);
      setLoading(false);
    }, 700);
  };

  return (
    <div style={{ padding: 30, color: "white", height: "100vh" }}>
      <h1 style={titleStyle}>AI Chat Assistant</h1>
      <p style={subtitleStyle}>Ask business questions and get AI-style guidance.</p>

      <div style={chatBox}>
        {messages.map((message, index) => (
          <div
            key={index}
            style={{
              ...bubbleStyle,
              alignSelf: message.role === "user" ? "flex-end" : "flex-start",
              background: message.role === "user" ? "#2563eb" : "#27272a",
            }}
          >
            {message.text}
          </div>
        ))}

        {loading && <div style={{ ...bubbleStyle, background: "#27272a" }}>AI is typing...</div>}
      </div>

      <div style={inputRow}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Ask AI something..."
          style={inputStyle}
        />

        <button onClick={sendMessage} style={buttonStyle}>
          Send
        </button>
      </div>
    </div>
  );
}

const titleStyle = { fontSize: 36, fontWeight: "bold", marginBottom: 10 };
const subtitleStyle = { color: "#a1a1aa", marginBottom: 24 };

const chatBox = {
  height: "65vh",
  background: "#18181b",
  border: "1px solid #27272a",
  borderRadius: 16,
  padding: 20,
  display: "flex",
  flexDirection: "column",
  gap: 14,
  overflowY: "auto",
};

const bubbleStyle = {
  padding: "14px 18px",
  borderRadius: 16,
  maxWidth: "75%",
  lineHeight: 1.5,
};

const inputRow = {
  display: "flex",
  gap: 12,
  marginTop: 18,
};

const inputStyle = {
  flex: 1,
  padding: 16,
  borderRadius: 12,
  border: "1px solid #3f3f46",
  background: "#18181b",
  color: "white",
};

const buttonStyle = {
  padding: "14px 22px",
  borderRadius: 12,
  border: "none",
  background: "#2563eb",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
};