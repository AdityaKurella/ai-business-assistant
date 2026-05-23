"use client";

import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

export default function ChatPage() {
  const welcomeMessage = {
    role: "assistant",
    content:
      "Hello Aditya 👋 I’m your AI business assistant. How can I help you today?",
  };

  const [messages, setMessages] = useState([welcomeMessage]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  async function fetchMessages() {
    try {
      const res = await fetch("/api/save-message");
      const data = await res.json();

      if (Array.isArray(data) && data.length > 0) {
        setMessages(data);
      }
    } catch (error) {
      console.error("Fetch messages error:", error);
    }
  }

  async function saveMessage(role, content) {
    try {
      await fetch("/api/save-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role, content }),
      });
    } catch (error) {
      console.error("Save message error:", error);
    }
  }

  async function clearHistory() {
    try {
      await fetch("/api/save-message", {
        method: "DELETE",
      });

      setMessages([welcomeMessage]);
    } catch (error) {
      console.error("Clear history error:", error);
    }
  }

  async function sendMessage() {
    if (!input.trim() || loading) return;

    const currentInput = input.trim();

    const userMessage = {
      role: "user",
      content: currentInput,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    await saveMessage("user", currentInput);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: currentInput,
        }),
      });

      const data = await res.json();
      const aiReply = data.reply || data.error || "No response generated.";

      const aiMessage = {
        role: "assistant",
        content: aiReply,
      };

      setMessages((prev) => [...prev, aiMessage]);
      await saveMessage("assistant", aiReply);
    } catch (error) {
      console.error("AI request error:", error);

      const failedMessage = {
        role: "assistant",
        content: "AI request failed. Please check your OpenRouter API route.",
      };

      setMessages((prev) => [...prev, failedMessage]);
      await saveMessage("assistant", failedMessage.content);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={container}>
      <div style={header}>
        <div>
          <p style={badge}>OPENROUTER POWERED</p>
          <h1 style={title}>AssistFlow AI</h1>
          <p style={subtitle}>
            Ask business, CRM, invoice, automation and SaaS growth questions.
          </p>
        </div>

        <div style={headerActions}>
          <button style={clearButton} onClick={clearHistory}>
            Clear History
          </button>
          <div style={status}>Live AI</div>
        </div>
      </div>

      <div style={chatShell}>
        <div style={chatBox}>
          {messages.map((message, index) => (
            <div
              key={index}
              style={message.role === "user" ? userBubble : aiBubble}
            >
              <p style={role}>
                {message.role === "user" ? "You" : "AI Assistant"}
              </p>

              <div style={markdownWrapper}>
                <ReactMarkdown>{message.content}</ReactMarkdown>
              </div>
            </div>
          ))}

          {loading && (
            <div style={thinkingBubble}>
              <span style={pulseDot}></span>
              AI is thinking...
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        <div style={inputRow}>
          <input
            style={inputStyle}
            value={input}
            placeholder="Ask your AI business assistant..."
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
          />

          <button style={button} onClick={sendMessage} disabled={loading}>
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}

const container = {
  display: "grid",
  gap: 24,
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: 28,
  borderRadius: 28,
  background:
    "linear-gradient(135deg, rgba(15,23,42,.92), rgba(17,24,39,.78))",
  border: "1px solid rgba(255,255,255,.08)",
  boxShadow: "0 20px 60px rgba(0,0,0,.25)",
};

const badge = {
  margin: 0,
  color: "#60a5fa",
  fontSize: 13,
  fontWeight: 800,
  letterSpacing: ".12em",
};

const title = {
  fontSize: 44,
  margin: "10px 0",
  letterSpacing: "-0.04em",
};

const subtitle = {
  color: "#a1a1aa",
  margin: 0,
};

const headerActions = {
  display: "flex",
  alignItems: "center",
  gap: 12,
};

const clearButton = {
  padding: "10px 16px",
  borderRadius: 999,
  border: "1px solid rgba(255,255,255,.12)",
  background: "rgba(255,255,255,.06)",
  color: "#e5e7eb",
  cursor: "pointer",
};

const status = {
  padding: "10px 16px",
  borderRadius: 999,
  background: "rgba(34,197,94,.15)",
  color: "#4ade80",
  fontWeight: 700,
};

const chatShell = {
  padding: 24,
  borderRadius: 28,
  background:
    "linear-gradient(180deg, rgba(255,255,255,.045), rgba(124,58,237,.08))",
  border: "1px solid rgba(255,255,255,.08)",
};

const chatBox = {
  height: "65vh",
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  gap: 18,
  padding: 8,
  paddingBottom: 80,
};

const aiBubble = {
  maxWidth: "85%",
  padding: 18,
  borderRadius: 22,
  background: "rgba(255,255,255,.06)",
  border: "1px solid rgba(255,255,255,.06)",
  color: "#e5e7eb",
};

const userBubble = {
  maxWidth: "70%",
  marginLeft: "auto",
  padding: 18,
  borderRadius: 22,
  background: "linear-gradient(135deg, #2563eb, #7c3aed)",
  color: "white",
  boxShadow: "0 16px 40px rgba(79,70,229,.28)",
};

const thinkingBubble = {
  maxWidth: "75%",
  padding: 18,
  borderRadius: 22,
  background: "rgba(255,255,255,.06)",
  color: "#cbd5e1",
  display: "flex",
  alignItems: "center",
  gap: 10,
};

const pulseDot = {
  width: 10,
  height: 10,
  borderRadius: 999,
  background: "#22c55e",
  boxShadow: "0 0 16px #22c55e",
};

const role = {
  margin: "0 0 8px",
  fontSize: 13,
  fontWeight: 700,
  opacity: 0.8,
};

const markdownWrapper = {
  lineHeight: 1.8,
  fontSize: 16,
};

const inputRow = {
  display: "flex",
  gap: 14,
  position: "sticky",
  bottom: 0,
  background: "#050816",
  paddingTop: 14,
};

const inputStyle = {
  flex: 1,
  padding: "16px 18px",
  borderRadius: 18,
  border: "1px solid rgba(255,255,255,.1)",
  background: "rgba(255,255,255,.05)",
  color: "white",
  outline: "none",
};

const button = {
  padding: "0 26px",
  borderRadius: 18,
  border: "none",
  color: "white",
  cursor: "pointer",
  background: "linear-gradient(135deg, #2563eb, #7c3aed)",
};