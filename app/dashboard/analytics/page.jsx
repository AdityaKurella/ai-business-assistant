const stats = [
  { label: "Weekly AI Requests", value: "1,284" },
  { label: "New Customers", value: "38" },
  { label: "Emails Generated", value: "214" },
  { label: "Tasks Automated", value: "76" },
];

const bars = [40, 70, 55, 90, 65, 100, 80];

export default function AnalyticsPage() {
  return (
    <div style={{ padding: 30, color: "white" }}>
      <h1 style={titleStyle}>Analytics</h1>
      <p style={subtitleStyle}>
        Track AI usage, customer growth, and automation performance.
      </p>

      <div style={statsGrid}>
        {stats.map((item, index) => (
          <div key={index} style={cardStyle}>
            <p style={{ color: "#a1a1aa" }}>{item.label}</p>
            <h2 style={{ fontSize: 30, marginTop: 10 }}>{item.value}</h2>
          </div>
        ))}
      </div>

      <div style={chartCard}>
        <h2 style={{ fontSize: 24, marginBottom: 20 }}>Performance Overview</h2>

        <div style={barChart}>
          {bars.map((height, index) => (
            <div key={index} style={{ ...barStyle, height: `${height}%` }} />
          ))}
        </div>

        <p style={{ color: "#a1a1aa", marginTop: 20 }}>
          Demo chart showing weekly automation activity.
        </p>
      </div>
    </div>
  );
}

const titleStyle = { fontSize: 36, fontWeight: "bold", marginBottom: 10 };
const subtitleStyle = { color: "#a1a1aa", marginBottom: 30 };
const statsGrid = { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, marginBottom: 30 };

const cardStyle = {
  background: "#18181b",
  border: "1px solid #27272a",
  borderRadius: 16,
  padding: 20,
};

const chartCard = {
  background: "#18181b",
  border: "1px solid #27272a",
  borderRadius: 16,
  padding: 24,
};

const barChart = {
  display: "flex",
  alignItems: "end",
  gap: 14,
  height: 220,
};

const barStyle = {
  width: 42,
  background: "linear-gradient(to top, #2563eb, #7c3aed)",
  borderRadius: 8,
};