"use client";

import { useState } from "react";

export default function EmailWriterPage() {
  const [emailType, setEmailType] = useState("Sales Email");
  const [tone, setTone] = useState("Professional");
  const [topic, setTopic] = useState("");
  const [generatedEmail, setGeneratedEmail] = useState("");

  const generateEmail = () => {
    setGeneratedEmail(`Hello,

I hope you're doing well.

I'm reaching out regarding ${topic || "your business growth"}.

Our AI Business Assistant Platform can help automate customer management, emails, analytics, and workflows so your team saves time and works smarter.

Would you be open to a quick demo?

Best regards,
Aditya`);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(generatedEmail);
  };

  return (
    <div style={{ padding: 30, color: "white" }}>
      <h1 style={titleStyle}>AI Email Writer</h1>
      <p style={subtitleStyle}>Generate business emails for sales, support, and follow-ups.</p>

      <div style={cardStyle}>
        <div style={formGrid}>
          <select value={emailType} onChange={(e) => setEmailType(e.target.value)} style={inputStyle}>
            <option>Sales Email</option>
            <option>Follow-up Email</option>
            <option>Support Reply</option>
          </select>

          <select value={tone} onChange={(e) => setTone(e.target.value)} style={inputStyle}>
            <option>Professional</option>
            <option>Friendly</option>
            <option>Short</option>
          </select>

          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Email topic or purpose"
            style={inputStyle}
          />
        </div>

        <button onClick={generateEmail} style={buttonStyle}>
          Generate Email
        </button>
      </div>

      <div style={outputCard}>
        <h2>Generated Email</h2>
        <pre style={{ whiteSpace: "pre-wrap", color: "#e4e4e7" }}>
          {generatedEmail || "Your generated email will appear here..."}
        </pre>

        {generatedEmail && (
          <button onClick={copyEmail} style={buttonStyle}>
            Copy Email
          </button>
        )}
      </div>
    </div>
  );
}

const titleStyle = { fontSize: 36, fontWeight: "bold", marginBottom: 10 };
const subtitleStyle = { color: "#a1a1aa", marginBottom: 30 };
const cardStyle = { background: "#18181b", border: "1px solid #27272a", borderRadius: 16, padding: 24 };
const outputCard = { ...cardStyle, marginTop: 24, minHeight: 250 };
const formGrid = { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 16 };

const inputStyle = {
  padding: 14,
  borderRadius: 10,
  border: "1px solid #3f3f46",
  background: "#09090b",
  color: "white",
};

const buttonStyle = {
  padding: "12px 20px",
  borderRadius: 10,
  border: "none",
  background: "#2563eb",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
};