"use client";

import { useState } from "react";

const automationTemplates = [
  {
    title: "Customer Welcome Flow",
    trigger: "New customer added",
    action: "Send welcome email",
    status: "Active",
    category: "CRM",
    priority: "High",
    runs: 24,
    successRate: "98%",
    icon: "👥",
  },
  {
    title: "Invoice Alert System",
    trigger: "Invoice created",
    action: "Notify admin and track payment",
    status: "Active",
    category: "Finance",
    priority: "High",
    runs: 18,
    successRate: "96%",
    icon: "🧾",
  },
  {
    title: "Follow-up Generator",
    trigger: "Customer inactive for 7 days",
    action: "Generate follow-up email",
    status: "Draft",
    category: "Sales",
    priority: "Medium",
    runs: 0,
    successRate: "Ready",
    icon: "📩",
  },
  {
    title: "Revenue Summary",
    trigger: "Every Monday morning",
    action: "Create weekly revenue report",
    status: "Active",
    category: "Analytics",
    priority: "Medium",
    runs: 7,
    successRate: "100%",
    icon: "📊",
  },
];

export default function AutomationsPage() {
  const [automations, setAutomations] = useState(automationTemplates);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [newAutomation, setNewAutomation] = useState({
    title: "",
    trigger: "",
    action: "",
    category: "CRM",
  });

  const filteredAutomations =
    selectedCategory === "All"
      ? automations
      : automations.filter((item) => item.category === selectedCategory);

  const activeCount = automations.filter((item) => item.status === "Active").length;
  const draftCount = automations.filter((item) => item.status === "Draft").length;
  const totalRuns = automations.reduce((sum, item) => sum + item.runs, 0);

  function toggleAutomation(index) {
    setAutomations((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              status: item.status === "Active" ? "Paused" : "Active",
            }
          : item
      )
    );
  }

  function addAutomation() {
    if (
      !newAutomation.title.trim() ||
      !newAutomation.trigger.trim() ||
      !newAutomation.action.trim()
    ) {
      alert("Please fill title, trigger, and action.");
      return;
    }

    const automation = {
      ...newAutomation,
      status: "Draft",
      priority: "Medium",
      runs: 0,
      successRate: "Ready",
      icon: "⚙️",
    };

    setAutomations((prev) => [automation, ...prev]);

    setNewAutomation({
      title: "",
      trigger: "",
      action: "",
      category: "CRM",
    });
  }

  return (
    <div style={container}>
      <section style={hero}>
        <div>
          <p style={badge}>AI WORKFLOW AUTOMATION</p>
          <h1 style={title}>Task Automations</h1>
          <p style={subtitle}>
            Build smart workflows that connect CRM, invoices, email generation,
            analytics and business operations.
          </p>
        </div>

        <div style={heroCard}>
          <p style={heroLabel}>Automation Health</p>
          <h2 style={heroValue}>{activeCount} Active</h2>
          <p style={heroText}>
            {totalRuns} workflow executions tracked across your business system.
          </p>
        </div>
      </section>

      <section style={statsGrid}>
        <div style={statCard}>
          <div style={statIcon}>⚡</div>
          <h2 style={statValue}>{activeCount}</h2>
          <p style={statLabel}>Active Workflows</p>
        </div>

        <div style={statCard}>
          <div style={statIcon}>📝</div>
          <h2 style={statValue}>{draftCount}</h2>
          <p style={statLabel}>Draft Automations</p>
        </div>

        <div style={statCard}>
          <div style={statIcon}>🔁</div>
          <h2 style={statValue}>{totalRuns}</h2>
          <p style={statLabel}>Total Runs</p>
        </div>

        <div style={statCard}>
          <div style={statIcon}>🤖</div>
          <h2 style={statValue}>AI</h2>
          <p style={statLabel}>Workflow Engine</p>
        </div>
      </section>

      <section style={mainGrid}>
        <div style={leftPanel}>
          <div style={sectionHeader}>
            <div>
              <p style={smallLabel}>Create</p>
              <h2 style={sectionTitle}>New Automation</h2>
            </div>
          </div>

          <div style={form}>
            <label style={field}>
              Automation Name
              <input
                style={input}
                value={newAutomation.title}
                onChange={(e) =>
                  setNewAutomation({
                    ...newAutomation,
                    title: e.target.value,
                  })
                }
                placeholder="Example: Lead follow-up flow"
              />
            </label>

            <label style={field}>
              Trigger
              <input
                style={input}
                value={newAutomation.trigger}
                onChange={(e) =>
                  setNewAutomation({
                    ...newAutomation,
                    trigger: e.target.value,
                  })
                }
                placeholder="Example: New lead added"
              />
            </label>

            <label style={field}>
              Action
              <input
                style={input}
                value={newAutomation.action}
                onChange={(e) =>
                  setNewAutomation({
                    ...newAutomation,
                    action: e.target.value,
                  })
                }
                placeholder="Example: Generate follow-up email"
              />
            </label>

            <label style={field}>
              Category
              <select
                style={input}
                value={newAutomation.category}
                onChange={(e) =>
                  setNewAutomation({
                    ...newAutomation,
                    category: e.target.value,
                  })
                }
              >
                <option>CRM</option>
                <option>Finance</option>
                <option>Sales</option>
                <option>Analytics</option>
              </select>
            </label>

            <button style={primaryButton} onClick={addAutomation}>
              Create Automation
            </button>
          </div>
        </div>

        <div style={rightPanel}>
          <div style={sectionHeader}>
            <div>
              <p style={smallLabel}>Library</p>
              <h2 style={sectionTitle}>Workflow Templates</h2>
            </div>

            <select
              style={filterSelect}
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option>All</option>
              <option>CRM</option>
              <option>Finance</option>
              <option>Sales</option>
              <option>Analytics</option>
            </select>
          </div>

          <div style={automationList}>
            {filteredAutomations.map((item, index) => (
              <div key={index} style={automationCard}>
                <div style={automationTop}>
                  <div style={automationIcon}>{item.icon}</div>

                  <div>
                    <h3 style={automationTitle}>{item.title}</h3>
                    <p style={automationCategory}>{item.category}</p>
                  </div>

                  <span
                    style={{
                      ...statusBadge,
                      background:
                        item.status === "Active"
                          ? "rgba(34,197,94,.16)"
                          : item.status === "Paused"
                          ? "rgba(239,68,68,.16)"
                          : "rgba(245,158,11,.16)",
                      color:
                        item.status === "Active"
                          ? "#4ade80"
                          : item.status === "Paused"
                          ? "#f87171"
                          : "#fbbf24",
                    }}
                  >
                    {item.status}
                  </span>
                </div>

                <div style={ruleBox}>
                  <p style={ruleText}>
                    <strong>If:</strong> {item.trigger}
                  </p>
                  <p style={ruleText}>
                    <strong>Then:</strong> {item.action}
                  </p>
                </div>

                <div style={automationMeta}>
                  <span>Priority: {item.priority}</span>
                  <span>Runs: {item.runs}</span>
                  <span>Success: {item.successRate}</span>
                </div>

                <button
                  style={
                    item.status === "Active" ? pauseButton : activateButton
                  }
                  onClick={() => toggleAutomation(index)}
                >
                  {item.status === "Active" ? "Pause Workflow" : "Activate"}
                </button>
              </div>
            ))}
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
  gridTemplateColumns: "1.5fr .8fr",
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
  fontSize: 54,
  margin: "12px 0",
  letterSpacing: "-0.05em",
};

const subtitle = {
  color: "#a1a1aa",
  maxWidth: 700,
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
  color: "#93c5fd",
  margin: 0,
};

const heroValue = {
  fontSize: 42,
  margin: "12px 0",
};

const heroText = {
  color: "#a1a1aa",
  lineHeight: 1.7,
};

const statsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: 22,
};

const statCard = {
  padding: 24,
  borderRadius: 24,
  background: "rgba(255,255,255,.045)",
  border: "1px solid rgba(255,255,255,.08)",
};

const statIcon = {
  width: 52,
  height: 52,
  borderRadius: 16,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 24,
  background:
    "linear-gradient(135deg, rgba(37,99,235,.3), rgba(124,58,237,.3))",
};

const statValue = {
  fontSize: 36,
  margin: "18px 0 8px",
};

const statLabel = {
  color: "#a1a1aa",
  margin: 0,
};

const mainGrid = {
  display: "grid",
  gridTemplateColumns: ".75fr 1.25fr",
  gap: 24,
};

const leftPanel = {
  padding: 28,
  borderRadius: 28,
  background: "rgba(255,255,255,.045)",
  border: "1px solid rgba(255,255,255,.08)",
};

const rightPanel = {
  padding: 28,
  borderRadius: 28,
  background: "rgba(255,255,255,.045)",
  border: "1px solid rgba(255,255,255,.08)",
};

const sectionHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 24,
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

const form = {
  display: "grid",
  gap: 16,
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

const filterSelect = {
  ...input,
  cursor: "pointer",
};

const primaryButton = {
  marginTop: 8,
  padding: "15px 20px",
  borderRadius: 16,
  border: "none",
  color: "white",
  fontWeight: 800,
  cursor: "pointer",
  background: "linear-gradient(135deg, #2563eb, #7c3aed)",
};

const automationList = {
  display: "grid",
  gap: 18,
};

const automationCard = {
  padding: 22,
  borderRadius: 24,
  background: "rgba(0,0,0,.22)",
  border: "1px solid rgba(255,255,255,.07)",
};

const automationTop = {
  display: "grid",
  gridTemplateColumns: "52px 1fr auto",
  gap: 16,
  alignItems: "center",
};

const automationIcon = {
  width: 52,
  height: 52,
  borderRadius: 16,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 24,
  background:
    "linear-gradient(135deg, rgba(37,99,235,.3), rgba(124,58,237,.3))",
};

const automationTitle = {
  margin: 0,
  fontSize: 19,
};

const automationCategory = {
  margin: "6px 0 0",
  color: "#a1a1aa",
};

const statusBadge = {
  padding: "8px 12px",
  borderRadius: 999,
  fontSize: 13,
  fontWeight: 800,
};

const ruleBox = {
  marginTop: 18,
  padding: 16,
  borderRadius: 18,
  background: "rgba(255,255,255,.04)",
};

const ruleText = {
  margin: "6px 0",
  color: "#d4d4d8",
};

const automationMeta = {
  marginTop: 16,
  display: "flex",
  gap: 14,
  flexWrap: "wrap",
  color: "#a1a1aa",
  fontSize: 13,
};

const pauseButton = {
  marginTop: 18,
  width: "100%",
  padding: "13px 16px",
  borderRadius: 14,
  border: "1px solid rgba(239,68,68,.3)",
  background: "rgba(239,68,68,.12)",
  color: "#fca5a5",
  cursor: "pointer",
  fontWeight: 800,
};

const activateButton = {
  marginTop: 18,
  width: "100%",
  padding: "13px 16px",
  borderRadius: 14,
  border: "1px solid rgba(34,197,94,.3)",
  background: "rgba(34,197,94,.12)",
  color: "#86efac",
  cursor: "pointer",
  fontWeight: 800,
};