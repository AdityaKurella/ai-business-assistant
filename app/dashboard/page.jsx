import Link from "next/link";

export default function DashboardPage() {
  const totalCustomers = 124;
  const aiRequests = 842;
  const totalRevenue = 45000;
  const totalAutomations = 37;

  const cards = [
    { icon: "👥", title: "Total Customers", value: totalCustomers, color: "#2563eb" },
    { icon: "🤖", title: "AI Requests", value: aiRequests, color: "#7c3aed" },
    { icon: "💰", title: "Revenue", value: `₹${totalRevenue}`, color: "#16a34a" },
    { icon: "⚡", title: "Automations", value: totalAutomations, color: "#ea580c" },
  ];

  return (
    <div style={page}>
      <div style={hero}>
        <p style={badge}>🚀 Portfolio SaaS MVP</p>

        <h1 style={title}>AI Business Assistant</h1>

        <p style={subtitle}>
          Manage customers, invoices, AI tools, automation and analytics from one clean dashboard.
        </p>
      </div>

      <div style={cardGrid}>
        {cards.map((card, index) => (
          <div
            key={index}
            style={{
              ...statCard,
              boxShadow: `0 0 25px ${card.color}25`,
            }}
          >
            <div style={{ ...iconBox, background: card.color }}>
              {card.icon}
            </div>

            <p style={cardLabel}>{card.title}</p>
            <h2 style={cardValue}>{card.value}</h2>
          </div>
        ))}
      </div>

      <div style={contentGrid}>
        <div style={sectionCard}>
          <h2 style={sectionTitle}>Recent Activity</h2>

          <div style={activityList}>
            <div>✅ New customer added to CRM</div>
            <div>📧 AI generated 12 emails today</div>
            <div>🤖 Workflow automation triggered</div>
            <div>📈 Revenue analytics updated</div>
          </div>
        </div>

        <div style={sectionCard}>
          <h2 style={sectionTitle}>System Status</h2>

          <div style={activityList}>
            <div>🟢 Database connected</div>
            <div>🟢 Authentication active</div>
            <div>🟢 CRM persistence enabled</div>
            <div>🟡 Demo AI mode enabled</div>
          </div>
        </div>
      </div>

      <div style={quickGrid}>
        <Link href="/dashboard/crm" style={actionCard}>
          <h3>👥 Add Customer</h3>
          <p>Create and manage CRM contacts.</p>
        </Link>

        <Link href="/dashboard/email-writer" style={actionCard}>
          <h3>✉️ Generate Email</h3>
          <p>Create sales and follow-up emails.</p>
        </Link>

        <Link href="/dashboard/automations" style={actionCard}>
          <h3>⚡ Create Automation</h3>
          <p>Build workflow automation rules.</p>
        </Link>
      </div>
    </div>
  );
}

const page = {
  padding: 30,
  color: "white",
};

const hero = {
  background: "linear-gradient(135deg, rgba(37,99,235,0.18), rgba(124,58,237,0.18))",
  border: "1px solid #27272a",
  borderRadius: 24,
  padding: 32,
  marginBottom: 28,
};

const badge = {
  display: "inline-block",
  background: "rgba(37,99,235,0.25)",
  border: "1px solid #2563eb",
  padding: "8px 14px",
  borderRadius: 999,
  color: "#bfdbfe",
  marginBottom: 16,
};

const title = {
  fontSize: 46,
  fontWeight: "bold",
  margin: 0,
};

const subtitle = {
  color: "#a1a1aa",
  fontSize: 18,
  maxWidth: 760,
  lineHeight: 1.6,
};

const cardGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: 20,
};

const statCard = {
  background: "rgba(24,24,27,0.9)",
  border: "1px solid #27272a",
  borderRadius: 20,
  padding: 22,
  transition: "0.2s",
};

const iconBox = {
  width: 42,
  height: 42,
  borderRadius: 14,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 16,
};

const cardLabel = {
  color: "#a1a1aa",
  margin: 0,
};

const cardValue = {
  fontSize: 34,
  margin: "10px 0 0",
};

const contentGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 20,
  marginTop: 28,
};

const sectionCard = {
  background: "#18181b",
  border: "1px solid #27272a",
  borderRadius: 20,
  padding: 24,
};

const sectionTitle = {
  fontSize: 24,
  marginBottom: 18,
};

const activityList = {
  display: "grid",
  gap: 14,
  color: "#e4e4e7",
};

const quickGrid = {
  marginTop: 28,
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: 20,
};

const actionCard = {
  background: "linear-gradient(135deg, #18181b, #111827)",
  border: "1px solid #27272a",
  borderRadius: 20,
  padding: 22,
  color: "white",
  textDecoration: "none",
  transition: "0.2s",
};