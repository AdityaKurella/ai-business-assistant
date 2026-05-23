"use client";

import { useState } from "react";

export default function EmailWriterPage() {
  const [emailType, setEmailType] = useState("Cold Outreach");
  const [tone, setTone] = useState("Professional");
  const [length, setLength] = useState("Medium");
  const [recipient, setRecipient] = useState("");
  const [company, setCompany] = useState("");
  const [topic, setTopic] = useState("");
  const [goal, setGoal] = useState("");
  const [generatedEmail, setGeneratedEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function generateEmail() {
    if (!topic.trim()) {
      alert("Please enter the email topic or purpose.");
      return;
    }

    setLoading(true);
    setGeneratedEmail("");
    setSubject("");

    const prompt = `
Generate a high-quality business email.

Email Type: ${emailType}
Tone: ${tone}
Length: ${length}
Recipient Name: ${recipient || "there"}
Company/Client: ${company || "the client"}
Topic/Purpose: ${topic}
Goal: ${goal || "get a positive response"}

Return format:
Subject: <subject line>

Email:
<email body>

Rules:
- Make it professional and natural.
- Keep it clear and useful.
- Avoid sounding spammy.
- Add a strong but polite call-to-action.
- Do not use fake claims.
`;

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: prompt }),
      });

      const data = await res.json();
      const output = data.reply || data.error || "Failed to generate email.";

      const subjectMatch = output.match(/Subject:\s*(.*)/i);
      const emailMatch = output.split(/Email:\s*/i);

      setSubject(subjectMatch ? subjectMatch[1].trim() : "Generated Email");
      setGeneratedEmail(emailMatch[1]?.trim() || output);
    } catch (error) {
      console.error(error);
      setGeneratedEmail("AI email generation failed. Please check your API.");
    } finally {
      setLoading(false);
    }
  }

  function copyEmail() {
    const fullEmail = `Subject: ${subject}\n\n${generatedEmail}`;
    navigator.clipboard.writeText(fullEmail);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  }

  function clearForm() {
    setRecipient("");
    setCompany("");
    setTopic("");
    setGoal("");
    setGeneratedEmail("");
    setSubject("");
    setCopied(false);
  }

  return (
    <div style={container}>
      <section style={hero}>
        <div>
          <p style={badge}>AI EMAIL GENERATOR</p>
          <h1 style={title}>Smart Email Writer</h1>
          <p style={subtitle}>
            Generate professional sales, follow-up, support, invoice and
            outreach emails using your AI business assistant.
          </p>
        </div>

        <div style={heroCard}>
          <p style={heroLabel}>Writing Mode</p>
          <h2 style={heroValue}>{emailType}</h2>
          <p style={heroText}>
            Tone: {tone} • Length: {length}
          </p>
        </div>
      </section>

      <section style={grid}>
        <div style={card}>
          <div style={cardHeader}>
            <div>
              <p style={smallLabel}>Input</p>
              <h2 style={sectionTitle}>Email Details</h2>
            </div>
            <button style={ghostButton} onClick={clearForm}>
              Clear
            </button>
          </div>

          <div style={formGrid}>
            <label style={field}>
              Email Type
              <select
                value={emailType}
                onChange={(e) => setEmailType(e.target.value)}
                style={selectStyle}
              >
                <option style={optionStyle}>Cold Outreach</option>
                <option style={optionStyle}>Sales Email</option>
                <option style={optionStyle}>Follow-up Email</option>
                <option style={optionStyle}>Invoice Reminder</option>
                <option style={optionStyle}>Client Proposal</option>
                <option style={optionStyle}>Support Reply</option>
                <option style={optionStyle}>Meeting Request</option>
                <option style={optionStyle}>Internship Application</option>
              </select>
            </label>

            <label style={field}>
              Tone
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                style={selectStyle}
              >
                <option style={optionStyle}>Professional</option>
                <option style={optionStyle}>Friendly</option>
                <option style={optionStyle}>Confident</option>
                <option style={optionStyle}>Persuasive</option>
                <option style={optionStyle}>Short and Direct</option>
                <option style={optionStyle}>Polite</option>
              </select>
            </label>

            <label style={field}>
              Length
              <select
                value={length}
                onChange={(e) => setLength(e.target.value)}
                style={selectStyle}
              >
                <option style={optionStyle}>Short</option>
                <option style={optionStyle}>Medium</option>
                <option style={optionStyle}>Detailed</option>
              </select>
            </label>

            <label style={field}>
              Recipient Name
              <input
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="Example: Mr. Rahul"
                style={input}
              />
            </label>

            <label style={field}>
              Company / Client
              <input
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Example: ABC Agency"
                style={input}
              />
            </label>

            <label style={field}>
              Goal
              <input
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="Example: book a demo call"
                style={input}
              />
            </label>
          </div>

          <label style={field}>
            Email Topic / Purpose
            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Example: Offer website development service to a local restaurant and ask for a quick meeting."
              style={textarea}
            />
          </label>

          <button style={primaryButton} onClick={generateEmail} disabled={loading}>
            {loading ? "Generating..." : "Generate AI Email"}
          </button>
        </div>

        <div style={outputCard}>
          <div style={cardHeader}>
            <div>
              <p style={smallLabel}>Output</p>
              <h2 style={sectionTitle}>Generated Email</h2>
            </div>

            {generatedEmail && (
              <button style={ghostButton} onClick={copyEmail}>
                {copied ? "Copied ✅" : "Copy"}
              </button>
            )}
          </div>

          <div style={emailPreview}>
            {loading ? (
              <p style={placeholder}>AI is writing your email...</p>
            ) : generatedEmail ? (
              <>
                <div style={subjectBox}>
                  <span style={subjectLabel}>Subject</span>
                  <h3 style={subjectText}>{subject}</h3>
                </div>

                <pre style={emailText}>{generatedEmail}</pre>
              </>
            ) : (
              <div style={emptyState}>
                <div style={emptyIcon}>✉️</div>
                <h3 style={emptyTitle}>Your AI email will appear here</h3>
                <p style={placeholder}>
                  Fill the details and generate a professional email.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

const container = {
  display: "grid",
  gap: 28,
  color: "white",
};

const hero = {
  display: "grid",
  gridTemplateColumns: "1.4fr .8fr",
  gap: 24,
};

const badge = {
  margin: 0,
  color: "#60a5fa",
  fontSize: 13,
  fontWeight: 800,
  letterSpacing: ".12em",
};

const title = {
  fontSize: 52,
  margin: "12px 0",
  letterSpacing: "-0.05em",
};

const subtitle = {
  maxWidth: 680,
  color: "#a1a1aa",
  fontSize: 17,
  lineHeight: 1.7,
};

const heroCard = {
  padding: 28,
  borderRadius: 28,
  background:
    "linear-gradient(135deg, rgba(37,99,235,.2), rgba(124,58,237,.2))",
  border: "1px solid rgba(255,255,255,.1)",
};

const heroLabel = {
  margin: 0,
  color: "#93c5fd",
};

const heroValue = {
  fontSize: 36,
  margin: "12px 0",
};

const heroText = {
  color: "#a1a1aa",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 24,
};

const card = {
  padding: 28,
  borderRadius: 28,
  background: "rgba(255,255,255,.045)",
  border: "1px solid rgba(255,255,255,.09)",
};

const outputCard = {
  ...card,
  minHeight: 580,
};

const cardHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 22,
};

const smallLabel = {
  margin: 0,
  color: "#60a5fa",
  fontSize: 13,
  fontWeight: 700,
};

const sectionTitle = {
  margin: "6px 0 0",
  fontSize: 24,
};

const formGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: 16,
  marginBottom: 16,
};

const field = {
  display: "grid",
  gap: 8,
  color: "#d4d4d8",
  fontSize: 14,
};

const input = {
  padding: "14px 16px",
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,.1)",
  background: "#111827",
  color: "white",
  outline: "none",
};

const selectStyle = {
  ...input,
  cursor: "pointer",
};

const optionStyle = {
  background: "#111827",
  color: "white",
};

const textarea = {
  ...input,
  minHeight: 130,
  resize: "vertical",
  fontFamily: "inherit",
};

const primaryButton = {
  marginTop: 18,
  width: "100%",
  padding: "15px 20px",
  borderRadius: 16,
  border: "none",
  color: "white",
  fontWeight: 800,
  cursor: "pointer",
  background: "linear-gradient(135deg, #2563eb, #7c3aed)",
};

const ghostButton = {
  padding: "10px 16px",
  borderRadius: 999,
  border: "1px solid rgba(255,255,255,.12)",
  background: "rgba(255,255,255,.06)",
  color: "#e5e7eb",
  cursor: "pointer",
};

const emailPreview = {
  minHeight: 470,
  padding: 22,
  borderRadius: 22,
  background: "rgba(0,0,0,.22)",
  border: "1px solid rgba(255,255,255,.07)",
};

const subjectBox = {
  padding: 18,
  borderRadius: 18,
  background: "rgba(37,99,235,.12)",
  border: "1px solid rgba(96,165,250,.16)",
  marginBottom: 20,
};

const subjectLabel = {
  color: "#93c5fd",
  fontSize: 13,
  fontWeight: 700,
};

const subjectText = {
  margin: "8px 0 0",
  fontSize: 20,
};

const emailText = {
  whiteSpace: "pre-wrap",
  color: "#e4e4e7",
  lineHeight: 1.8,
  fontFamily: "inherit",
  fontSize: 15,
};

const emptyState = {
  display: "grid",
  placeItems: "center",
  textAlign: "center",
  minHeight: 390,
};

const emptyIcon = {
  fontSize: 48,
};

const emptyTitle = {
  margin: "12px 0 4px",
};

const placeholder = {
  color: "#a1a1aa",
  lineHeight: 1.6,
};