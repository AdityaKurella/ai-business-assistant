"use client";

import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
} from "recharts";

export default function DashboardPage() {
  const [data, setData] = useState({
    customers: 0,
    totalInvoices: 0,
    unpaidInvoices: 0,
    totalRevenue: 0,
  });

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  async function fetchDashboardData() {
    try {
      const statsRes = await fetch("/api/dashboard-stats");
      const stats = await statsRes.json();
      setData(stats);

      const chartRes = await fetch("/api/chart");
      const chart = await chartRes.json();
      setChartData(chart);
    } catch (error) {
      console.error("Dashboard data error:", error);
    }
  }

  const stats = [
    {
      title: "Total Customers",
      value: data.customers,
      icon: "👥",
      growth: "Live",
    },
    {
      title: "Total Invoices",
      value: data.totalInvoices,
      icon: "🧾",
      growth: "Live",
    },
    {
      title: "Unpaid Invoices",
      value: data.unpaidInvoices,
      icon: "⚠️",
      growth: "Live",
    },
    {
      title: "Revenue",
      value: `₹${Number(data.totalRevenue).toLocaleString("en-IN")}`,
      icon: "💰",
      growth: "Live",
    },
  ];

  return (
    <div style={container}>
      <section style={hero}>
        <div>
          <p style={badge}>AI BUSINESS DASHBOARD</p>
          <h1 style={title}>Welcome back 👋</h1>
          <p style={subtitle}>
            Track your CRM, invoices, revenue and AI business workflows from one
            professional SaaS dashboard.
          </p>
        </div>

        <div style={heroCard}>
          <p style={heroLabel}>Business Health</p>
          <h2 style={heroValue}>
            {data.totalInvoices > 0 ? "Growing" : "Starting"}
          </h2>
          <p style={heroText}>
            You have {data.customers} customers and ₹
            {Number(data.totalRevenue).toLocaleString("en-IN")} total revenue
            tracked.
          </p>
        </div>
      </section>

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
            <button style={button} onClick={fetchDashboardData}>
              Refresh
            </button>
          </div>

          <div style={chartArea}>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={chartData}>
                <XAxis dataKey="month" stroke="#a1a1aa" />
                <Tooltip
                  contentStyle={{
                    background: "#111827",
                    border: "1px solid rgba(255,255,255,.08)",
                    borderRadius: 12,
                    color: "white",
                  }}
                  labelStyle={{ color: "white" }}
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

        <div style={activityCard}>
          <p style={smallLabel}>Business Analysis</p>
          <h3 style={sectionTitle}>Work Summary</h3>

          <div style={activityList}>
            <div style={activityItem}>👥 Customers: {data.customers}</div>
            <div style={activityItem}>
              🧾 Total Invoices: {data.totalInvoices}
            </div>
            <div style={activityItem}>
              ⚠️ Pending Payments: {data.unpaidInvoices}
            </div>
            <div style={activityItem}>
              💰 Revenue Tracked: ₹
              {Number(data.totalRevenue).toLocaleString("en-IN")}
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
  fontWeight: 800,
  letterSpacing: "0.12em",
};

const title = {
  fontSize: 54,
  margin: "12px 0",
  letterSpacing: "-0.05em",
};

const subtitle = {
  maxWidth: 650,
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

const heroLabel = { color: "#93c5fd", margin: 0 };

const heroValue = {
  fontSize: 46,
  margin: "12px 0",
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
  background: "rgba(255,255,255,.045)",
  border: "1px solid rgba(255,255,255,.09)",
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
    "linear-gradient(135deg, rgba(37,99,235,.3), rgba(124,58,237,.3))",
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
  gridTemplateColumns: "1.4fr .8fr",
  gap: 24,
};

const largeCard = {
  padding: 28,
  borderRadius: 28,
  background: "rgba(255,255,255,.045)",
  border: "1px solid rgba(255,255,255,.09)",
};

const activityCard = {
  padding: 28,
  borderRadius: 28,
  background: "rgba(255,255,255,.045)",
  border: "1px solid rgba(255,255,255,.09)",
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
  margin: "6px 0 20px",
  fontSize: 24,
};

const button = {
  border: "none",
  padding: "12px 18px",
  borderRadius: 14,
  color: "white",
  cursor: "pointer",
  background: "linear-gradient(135deg, #2563eb, #7c3aed)",
};

const chartArea = {
  width: "100%",
  height: 260,
};

const activityList = {
  display: "grid",
  gap: 14,
};

const activityItem = {
  padding: 16,
  borderRadius: 18,
  background: "rgba(255,255,255,.04)",
  color: "#d4d4d8",
};