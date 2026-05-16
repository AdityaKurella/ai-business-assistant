"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [businessName, setBusinessName] = useState("Aditya AI Solutions");
  const [supportEmail, setSupportEmail] = useState("support@example.com");
  const [website, setWebsite] = useState("https://example.com");
  const [saved, setSaved] = useState(false);

  const saveSettings = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  return (
    <div style={{ padding: 30, color: "white" }}>
      <h1 style={titleStyle}>Settings</h1>
      <p style={subtitleStyle}>Manage your business assistant preferences.</p>

      <div style={cardStyle}>
        <h2 style={{ fontSize: 24, marginBottom: 20 }}>Business Profile</h2>

        <div style={{ display: "grid", gap: 16 }}>
          <input
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            placeholder="Business Name"
            style={inputStyle}
          />

          <input
            value={supportEmail}
            onChange={(e) => setSupportEmail(e.target.value)}
            placeholder="Support Email"
            style={inputStyle}
          />

          <input
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="Website URL"
            style={inputStyle}
          />

          <button onClick={saveSettings} style={buttonStyle}>
            Save Settings
          </button>

          {saved && <p style={{ color: "#22c55e" }}>Settings saved successfully ✅</p>}
        </div>
      </div>
    </div>
  );
}

const titleStyle = { fontSize: 36, fontWeight: "bold", marginBottom: 10 };
const subtitleStyle = { color: "#a1a1aa", marginBottom: 30 };

const cardStyle = {
  background: "#18181b",
  border: "1px solid #27272a",
  borderRadius: 16,
  padding: 24,
  maxWidth: 650,
};

const inputStyle = {
  padding: 14,
  borderRadius: 10,
  border: "1px solid #3f3f46",
  background: "#09090b",
  color: "white",
};

const buttonStyle = {
  padding: "14px 20px",
  borderRadius: 10,
  border: "none",
  background: "#2563eb",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
};