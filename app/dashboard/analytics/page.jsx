"use client";

import { useEffect, useState } from "react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  Tooltip,
} from "recharts";

export default function AnalyticsPage() {
  const [stats, setStats] = useState({
    customers: 0,
    totalInvoices: 0,
    unpaidInvoices: 0,
    totalRevenue: 0,
  });

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  async function fetchAnalytics() {
    try {
      const statsRes = await fetch("/api/dashboard-stats");
      const statsData = await statsRes.json();

      setStats(statsData);

      const chartRes = await fetch("/api/chart");
      const chart = await chartRes.json();

      setChartData(chart);
    } catch (error) {
      console.error(error);
    }
  }

  const pieData = [
    {
      name: "Paid",
      value:
        stats.totalInvoices - stats.unpaidInvoices > 0
          ? stats.totalInvoices - stats.unpaidInvoices
          : 0,
    },
    {
      name: "Unpaid",
      value: stats.unpaidInvoices,
    },
  ];

  const cards = [
    {
      title: "Revenue",
      value: `₹${Number(stats.totalRevenue).toLocaleString("en-IN")}`,
      icon: "💰",
      growth: "+18%",
    },
    {
      title: "Customers",
      value: stats.customers,
      icon: "👥",
      growth: "+12%",
    },
    {
      title: "Invoices",
      value: stats.totalInvoices,
      icon: "🧾",
      growth: "+9%",
    },
    {
      title: "Pending",
      value: stats.unpaidInvoices,
      icon: "⚠️",
      growth: "Live",
    },
  ];

  return (
    <div style={container}>
      <section style={hero}>
        <div>
          <p style={badge}>ADVANCED ANALYTICS</p>

          <h1 style={title}>Business Intelligence</h1>

          <p style={subtitle}>
            Monitor revenue growth, invoice performance, customer activity and
            real-time SaaS business metrics.
          </p>
        </div>

        <div style={heroCard}>
          <p style={heroLabel}>Business Performance</p>

          <h2 style={heroValue}>
            {stats.totalRevenue > 0 ? "Growing 🚀" : "Starting"}
          </h2>

          <p style={heroText}>
            Revenue analytics and customer tracking are connected live to your
            database.
          </p>
        </div>
      </section>

      <section style={statsGrid}>
        {cards.map((card) => (
          <div key={card.title} style={cardStyle}>
            <div style={cardTop}>
              <div style={iconBox}>{card.icon}</div>

              <span style={growth}>{card.growth}</span>
            </div>

            <h2 style={value}>{card.value}</h2>

            <p style={label}>{card.title}</p>
          </div>
        ))}
      </section>

      <section style={chartsGrid}>
        <div style={chartCard}>
          <div style={chartHeader}>
            <div>
              <p style={smallLabel}>Revenue</p>
              <h2 style={chartTitle}>Monthly Revenue</h2>
            </div>

            <button style={button} onClick={fetchAnalytics}>
              Refresh
            </button>
          </div>

          <div style={chartArea}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <XAxis dataKey="month" stroke="#a1a1aa" />

                <Tooltip
                  contentStyle={{
                    background: "#111827",
                    border: "1px solid rgba(255,255,255,.08)",
                    borderRadius: 12,
                  }}
                />

                <Bar
                  dataKey="revenue"
                  radius={[12, 12, 0, 0]}
                  fill="#7c3aed"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div style={chartCard}>
          <div style={chartHeader}>
            <div>
              <p style={smallLabel}>Finance</p>
              <h2 style={chartTitle}>Invoice Status</h2>
            </div>
          </div>

          <div style={chartArea}>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  outerRadius={100}
                  innerRadius={60}
                >
                  <Cell fill="#22c55e" />
                  <Cell fill="#ef4444" />
                </Pie>

                <Tooltip
                  contentStyle={{
                    background: "#111827",
                    border: "1px solid rgba(255,255,255,.08)",
                    borderRadius: 12,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div style={legend}>
            <div style={legendItem}>
              <span style={greenDot}></span>
              Paid Invoices
            </div>

            <div style={legendItem}>
              <span style={redDot}></span>
              Unpaid Invoices
            </div>
          </div>
        </div>
      </section>

      <section style={bottomGrid}>
        <div style={chartCard}>
          <div style={chartHeader}>
            <div>
              <p style={smallLabel}>Growth</p>
              <h2 style={chartTitle}>Revenue Trend</h2>
            </div>
          </div>

          <div style={chartArea}>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={chartData}>
                <XAxis dataKey="month" stroke="#a1a1aa" />

                <Tooltip
                  contentStyle={{
                    background: "#111827",
                    border: "1px solid rgba(255,255,255,.08)",
                    borderRadius: 12,
                  }}
                />

                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#2563eb"
                  strokeWidth={4}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div style={summaryCard}>
          <p style={smallLabel}>AI Insights</p>

          <h2 style={chartTitle}>Business Summary</h2>

          <div style={summaryList}>
            <div style={summaryItem}>
              💰 Revenue tracked: ₹
              {Number(stats.totalRevenue).toLocaleString("en-IN")}
            </div>

            <div style={summaryItem}>
              👥 Total customers: {stats.customers}
            </div>

            <div style={summaryItem}>
              🧾 Total invoices generated: {stats.totalInvoices}
            </div>

            <div style={summaryItem}>
              ⚠️ Pending invoices: {stats.unpaidInvoices}
            </div>

            <div style={summaryItem}>
              📈 Analytics connected to live database
            </div>
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

const cardStyle = {
  padding: 24,
  borderRadius: 24,
  background: "rgba(255,255,255,.045)",
  border: "1px solid rgba(255,255,255,.08)",
};

const cardTop = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const iconBox = {
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

const growth = {
  color: "#4ade80",
  fontWeight: 700,
};

const value = {
  fontSize: 38,
  margin: "18px 0 8px",
};

const label = {
  color: "#a1a1aa",
  margin: 0,
};

const chartsGrid = {
  display: "grid",
  gridTemplateColumns: "1.2fr .8fr",
  gap: 24,
};

const bottomGrid = {
  display: "grid",
  gridTemplateColumns: "1.1fr .9fr",
  gap: 24,
};

const chartCard = {
  padding: 28,
  borderRadius: 28,
  background: "rgba(255,255,255,.045)",
  border: "1px solid rgba(255,255,255,.08)",
};

const summaryCard = {
  padding: 28,
  borderRadius: 28,
  background:
    "linear-gradient(180deg, rgba(37,99,235,.12), rgba(124,58,237,.12))",
  border: "1px solid rgba(255,255,255,.08)",
};

const chartHeader = {
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

const chartTitle = {
  margin: "6px 0 0",
  fontSize: 24,
};

const chartArea = {
  width: "100%",
  height: 300,
};

const button = {
  border: "none",
  padding: "12px 18px",
  borderRadius: 14,
  background: "linear-gradient(135deg, #2563eb, #7c3aed)",
  color: "white",
  cursor: "pointer",
};

const legend = {
  display: "flex",
  gap: 20,
  justifyContent: "center",
};

const legendItem = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  color: "#d4d4d8",
};

const greenDot = {
  width: 12,
  height: 12,
  borderRadius: 999,
  background: "#22c55e",
};

const redDot = {
  width: 12,
  height: 12,
  borderRadius: 999,
  background: "#ef4444",
};

const summaryList = {
  display: "grid",
  gap: 14,
  marginTop: 20,
};

const summaryItem = {
  padding: 16,
  borderRadius: 18,
  background: "rgba(255,255,255,.05)",
  color: "#e4e4e7",
};