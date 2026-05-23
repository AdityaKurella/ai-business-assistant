"use client";

import { useEffect, useState } from "react";

const defaultMessage = {
  role: "assistant",
  content:
    "Hello Aditya 👋 I’m your AI business assistant. How can I help you today?",
};

export default function ChatPage() {
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [messages, setMessages] = useState([defaultMessage]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const savedChats = JSON.parse(localStorage.getItem("ai-chats")) || [];

    if (savedChats.length > 0) {
      setChats(savedChats);
      setActiveChatId(savedChats[0].id);
      setMessages(savedChats[0].messages);
    }
  }, []);

  const saveChats = (updatedChats) => {
    setChats(updatedChats);
    localStorage.setItem("ai-chats", JSON.stringify(updatedChats));
  };

  const createNewChat = () => {
    const newChat = {
      id: Date.now().toString(),
      title: "New Chat",
      messages: [defaultMessage],
    };

    const updatedChats = [newChat, ...chats];

    saveChats(updatedChats);
    setActiveChatId(newChat.id);
    setMessages(newChat.messages);
  };

  const openChat = (chat) => {
    setActiveChatId(chat.id);
    setMessages(chat.messages);
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = {
      role: "user",
      content: input,
    };

    const aiMessage = {
      role: "assistant",
      content:
        "Demo AI response: Later this can be connected to OpenAI, Gemini, or your own backend AI model.",
    };

    const updatedMessages = [...messages, userMessage, aiMessage];

    let updatedChats = chats;

    if (!activeChatId) {
      const newChat = {
        id: Date.now().toString(),
        title: input.slice(0, 28),
        messages: updatedMessages,
      };

      updatedChats = [newChat, ...chats];
      setActiveChatId(newChat.id);
    } else {
      updatedChats = chats.map((chat) =>
        chat.id === activeChatId
          ? {
              ...chat,
              title:
                chat.title === "New Chat"
                  ? input.slice(0, 28)
                  : chat.title,
              messages: updatedMessages,
            }
          : chat
      );
    }

    saveChats(updatedChats);
    setMessages(updatedMessages);
    setInput("");
  };

  const deleteChat = (id) => {
    const updatedChats = chats.filter((chat) => chat.id !== id);

    saveChats(updatedChats);

    if (activeChatId === id) {
      if (updatedChats.length > 0) {
        setActiveChatId(updatedChats[0].id);
        setMessages(updatedChats[0].messages);
      } else {
        setActiveChatId(null);
        setMessages([defaultMessage]);
      }
    }
  };

  return (
    <div style={container}>
      <div style={sidebar}>
        <div style={sidebarTop}>
          <h2 style={sidebarTitle}>AI Workspace</h2>

          <button onClick={createNewChat} style={newChatBtn}>
            ＋ New Chat
          </button>
        </div>

        <div style={historyList}>
          {chats.length === 0 ? (
            <p style={emptyText}>No chat history yet.</p>
          ) : (
            chats.map((chat) => (
              <div
                key={chat.id}
                style={{
                  ...historyItem,
                  border:
                    activeChatId === chat.id
                      ? "1px solid #60a5fa"
                      : "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <button onClick={() => openChat(chat)} style={historyButton}>
                  {chat.title}
                </button>

                <button onClick={() => deleteChat(chat.id)} style={deleteBtn}>
                  ×
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      <div style={chatArea}>
        <div style={chatHeader}>
          <div>
            <p style={headerLabel}>AI MODEL</p>
            <h1 style={headerTitle}>AssistFlow AI</h1>
          </div>

          <div style={status}>
            <div style={dot}></div>
            Demo Mode
          </div>
        </div>

        <div style={messagesContainer}>
          {messages.map((message, index) => (
            <div
              key={index}
              style={{
                ...messageBox,
                alignSelf:
                  message.role === "user" ? "flex-end" : "flex-start",
                background:
                  message.role === "user"
                    ? "linear-gradient(135deg, #2563eb, #7c3aed)"
                    : "rgba(255,255,255,0.06)",
              }}
            >
              <p style={messageRole}>
                {message.role === "user" ? "You" : "AI Assistant"}
              </p>

              <p style={messageText}>{message.content}</p>
            </div>
          ))}
        </div>

        <div style={inputArea}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ask anything about business, AI, analytics..."
            style={inputBox}
          />

          <button onClick={sendMessage} style={sendBtn}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

const container = {
  display: "grid",
  gridTemplateColumns: "320px 1fr",
  gap: 24,
  height: "calc(100vh - 160px)",
};

const sidebar = {
  borderRadius: 28,
  padding: 24,
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  display: "flex",
  flexDirection: "column",
};

const sidebarTop = {
  display: "flex",
  flexDirection: "column",
  gap: 18,
};

const sidebarTitle = {
  margin: 0,
  fontSize: 26,
};

const newChatBtn = {
  border: "none",
  padding: "14px",
  borderRadius: 16,
  color: "white",
  cursor: "pointer",
  fontWeight: 600,
  background:
    "linear-gradient(135deg, rgba(37,99,235,1), rgba(124,58,237,1))",
};

const historyList = {
  marginTop: 28,
  display: "grid",
  gap: 14,
};

const historyItem = {
  padding: 12,
  borderRadius: 16,
  background: "rgba(255,255,255,0.03)",
  color: "#d4d4d8",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const historyButton = {
  background: "transparent",
  border: "none",
  color: "white",
  cursor: "pointer",
  textAlign: "left",
  flex: 1,
};

const deleteBtn = {
  background: "rgba(239,68,68,0.18)",
  color: "#fca5a5",
  border: "1px solid rgba(239,68,68,0.25)",
  borderRadius: 10,
  cursor: "pointer",
  width: 28,
  height: 28,
};

const emptyText = {
  color: "#a1a1aa",
};

const chatArea = {
  borderRadius: 28,
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
};

const chatHeader = {
  height: 90,
  padding: "0 28px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  borderBottom: "1px solid rgba(255,255,255,0.08)",
};

const headerLabel = {
  margin: 0,
  color: "#60a5fa",
  fontSize: 12,
  letterSpacing: "0.08em",
};

const headerTitle = {
  margin: "8px 0 0",
  fontSize: 30,
};

const status = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  padding: "12px 18px",
  borderRadius: 999,
  background: "rgba(255,255,255,0.05)",
};

const dot = {
  width: 10,
  height: 10,
  borderRadius: 999,
  background: "#22c55e",
  boxShadow: "0 0 12px #22c55e",
};

const messagesContainer = {
  flex: 1,
  padding: 28,
  display: "flex",
  flexDirection: "column",
  gap: 18,
  overflowY: "auto",
};

const messageBox = {
  maxWidth: "70%",
  padding: 20,
  borderRadius: 24,
};

const messageRole = {
  margin: 0,
  fontSize: 12,
  color: "#d4d4d8",
};

const messageText = {
  margin: "10px 0 0",
  lineHeight: 1.7,
  color: "white",
};

const inputArea = {
  padding: 24,
  borderTop: "1px solid rgba(255,255,255,0.08)",
  display: "flex",
  gap: 16,
};

const inputBox = {
  flex: 1,
  border: "none",
  outline: "none",
  borderRadius: 18,
  padding: "18px 20px",
  background: "rgba(255,255,255,0.06)",
  color: "white",
  fontSize: 15,
};

const sendBtn = {
  border: "none",
  padding: "0 26px",
  borderRadius: 18,
  cursor: "pointer",
  color: "white",
  fontWeight: 700,
  background:
    "linear-gradient(135deg, rgba(37,99,235,1), rgba(124,58,237,1))",
};