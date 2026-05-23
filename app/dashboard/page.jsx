export default function DashboardPage() {
  const stats = [
    {
      title: "Total Customers",
      value: "24",
      icon: "👥",
      growth: "+12%",
    },
    {
      title: "Invoices",
      value: "18",
      icon: "🧾",
      growth: "+8%",
    },
    {
      title: "AI Automations",
      value: "7",
      icon: "⚡",
      growth: "+21%",
    },
    {
      title: "Revenue",
      value: "$12.4K",
      icon: "💰",
      growth: "+18%",
    },
  ];

  const activities = [
    "New CRM customer added",
    "Invoice generated successfully",
    "AI workflow executed",
    "Analytics dashboard updated",
  ];

  return (
    <div style={container}>
      <div style={hero}>
        <div>
          <p style={badge}>AI POWERED BUSINESS OS</p>

          <h1 style={title}>
            Welcome back,
            <br />
            Aditya 👋
          </h1>

          <p style={subtitle}>
            Manage CRM, invoices, AI workflows and business analytics
            from one intelligent dashboard.
          </p>
        </div>

        <div style={heroCard}>
          <p style={heroLabel}>System Status</p>

          <h2 style={heroValue}>98.2%</h2>

          <p style={heroText}>
            All AI services operational and dashboard performance stable.
          </p>
        </div>
      </div>

      <section style={statsGrid}>
        {stats.map((item) => (
          <div key={item.title} style={card}>
            <div style={cardTop}>
              <div style={icon}>{item.icon}</div>

              <span style={growth}>{item.growth}</span>
            </div>

            <h2 style={value}>{item.value}</h2>

            <p style={label}>{item.title}</p>
          </div>
        ))}
      </section>

      <section style={bottomGrid}>
        <div style={largeCard}>
          <div style={sectionHeader}>
            <div>
              <p style={smallLabel}>Analytics</p>
              <h3 style={sectionTitle}>Revenue Overview</h3>
            </div>

            <button style={button}>Export</button>
          </div>

          <div style={chartArea}>
            <div style={bar1}></div>
            <div style={bar2}></div>
            <div style={bar3}></div>
            <div style={bar4}></div>
            <div style={bar5}></div>
            <div style={bar6}></div>
          </div>
        </div>

        <div style={activityCard}>
          <div style={sectionHeader}>
            <div>
              <p style={smallLabel}>Realtime</p>
              <h3 style={sectionTitle}>Recent Activity</h3>
            </div>
          </div>

          <div style={activityList}>
            {activities.map((activity, index) => (
              <div key={index} style={activityItem}>
                <div style={activityDot}></div>

                <span>{activity}</span>
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
};

const hero = {
  display: "grid",
  gridTemplateColumns: "1.5fr 0.8fr",
  gap: 24,
};

const badge = {
  margin: 0,
  color: "#60a5fa",
  fontSize: 13,
  fontWeight: 700,
  letterSpacing: "0.08em",
};

const title = {
  fontSize: 52,
  lineHeight: 1,
  margin: "14px 0",
  letterSpacing: "-0.06em",
};

const subtitle = {
  maxWidth: 620,
  color: "#a1a1aa",
  fontSize: 17,
  lineHeight: 1.7,
};

const heroCard = {
  padding: 28,
  borderRadius: 28,
  background:
    "linear-gradient(135deg, rgba(37,99,235,0.18), rgba(124,58,237,0.18))",
  border: "1px solid rgba(255,255,255,0.08)",
  backdropFilter: "blur(16px)",
};

const heroLabel = {
  color: "#93c5fd",
  margin: 0,
  fontSize: 14,
};

const heroValue = {
  fontSize: 56,
  margin: "10px 0",
};

const heroText = {
  color: "#a1a1aa",
  lineHeight: 1.6,
};

const statsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: 22,
};

const card = {
  padding: 24,
  borderRadius: 24,
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  backdropFilter: "blur(14px)",
};

const cardTop = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const icon = {
  width: 52,
  height: 52,
  borderRadius: 16,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 24,
  background:
    "linear-gradient(135deg, rgba(37,99,235,0.28), rgba(124,58,237,0.28))",
};

const growth = {
  color: "#4ade80",
  fontWeight: 700,
};

const value = {
  fontSize: 38,
  margin: "20px 0 8px",
};

const label = {
  color: "#a1a1aa",
  margin: 0,
};

const bottomGrid = {
  display: "grid",
  gridTemplateColumns: "1.4fr 0.8fr",
  gap: 24,
};

const largeCard = {
  padding: 28,
  borderRadius: 28,
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
};

const activityCard = {
  padding: 28,
  borderRadius: 28,
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
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
};

const sectionTitle = {
  margin: "6px 0 0",
  fontSize: 24,
};

const button = {
  border: "none",
  padding: "12px 18px",
  borderRadius: 14,
  color: "white",
  cursor: "pointer",
  background:
    "linear-gradient(135deg, rgba(37,99,235,0.95), rgba(124,58,237,0.95))",
};

const chartArea = {
  height: 260,
  display: "flex",
  alignItems: "flex-end",
  gap: 18,
};

const commonBar = {
  flex: 1,
  borderRadius: 18,
  background:
    "linear-gradient(180deg, rgba(37,99,235,1), rgba(124,58,237,1))",
};

const bar1 = { ...commonBar, height: "40%" };
const bar2 = { ...commonBar, height: "65%" };
const bar3 = { ...commonBar, height: "52%" };
const bar4 = { ...commonBar, height: "88%" };
const bar5 = { ...commonBar, height: "70%" };
const bar6 = { ...commonBar, height: "96%" };

const activityList = {
  display: "grid",
  gap: 18,
};

const activityItem = {
  display: "flex",
  alignItems: "center",
  gap: 14,
  padding: 16,
  borderRadius: 18,
  background: "rgba(255,255,255,0.03)",
};

const activityDot = {
  width: 10,
  height: 10,
  borderRadius: 999,
  background: "#22c55e",
  boxShadow: "0 0 12px #22c55e",
};  