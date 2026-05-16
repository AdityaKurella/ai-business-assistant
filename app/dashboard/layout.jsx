"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "🏠 Dashboard", href: "/dashboard" },
  { name: "🤖 AI Chat", href: "/dashboard/chat" },
  { name: "👥 CRM", href: "/dashboard/crm" },
  { name: "✉️ Email Writer", href: "/dashboard/email-writer" },
  { name: "📊 Analytics", href: "/dashboard/analytics" },
  { name: "⚡ Automations", href: "/dashboard/automations" },
  { name: "🧾 Invoices", href: "/dashboard/invoices" },
  { name: "⚙️ Settings", href: "/dashboard/settings" },
];

export default function DashboardLayout({ children }) {
  const pathname = usePathname();

  return (
    <div style={layout}>
      <aside style={sidebar}>
        <div style={logoBox}>
          <div style={logoIcon}>AI</div>
          <div>
            <h1 style={logoTitle}>AI Assistant</h1>
            <p style={logoText}>Business Platform</p>
          </div>
        </div>

        <nav style={nav}>
          {links.map((link) => {
            const active = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  ...navLink,
                  background: active
                    ? "linear-gradient(135deg, #2563eb, #7c3aed)"
                    : "#18181b",
                  border: active
                    ? "1px solid #3b82f6"
                    : "1px solid #27272a",
                  boxShadow: active
                    ? "0 0 18px rgba(37, 99, 235, 0.35)"
                    : "none",
                }}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div style={contentArea}>
        <header style={header}>
          <div>
            <h2 style={headerTitle}>AI Business Platform</h2>
            <p style={headerText}>Manage your AI-powered business tools</p>
          </div>

          <div style={userBox}>
            <span style={statusDot}></span>
            <p style={{ color: "#d4d4d8" }}>Aditya</p>
          </div>
        </header>

        <main style={main}>{children}</main>
      </div>
    </div>
  );
}

const layout = {
  display: "flex",
  minHeight: "100vh",
  background: "linear-gradient(135deg, #050505, #09090b, #111827)",
  color: "white",
};

const sidebar = {
  width: 280,
  padding: 24,
  borderRight: "1px solid #27272a",
  background: "rgba(17, 17, 17, 0.95)",
};

const logoBox = {
  display: "flex",
  alignItems: "center",
  gap: 14,
  marginBottom: 40,
};

const logoIcon = {
  width: 46,
  height: 46,
  borderRadius: 14,
  background: "linear-gradient(135deg, #2563eb, #7c3aed)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "bold",
};

const logoTitle = {
  fontSize: 22,
  margin: 0,
};

const logoText = {
  margin: 0,
  color: "#a1a1aa",
  fontSize: 13,
};

const nav = {
  display: "flex",
  flexDirection: "column",
  gap: 12,
};

const navLink = {
  padding: "14px 16px",
  borderRadius: 14,
  color: "white",
  textDecoration: "none",
  transition: "0.2s",
};

const contentArea = {
  flex: 1,
};

const header = {
  height: 76,
  borderBottom: "1px solid #27272a",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 30px",
  background: "rgba(17, 17, 17, 0.8)",
};

const headerTitle = {
  margin: 0,
  fontSize: 20,
};

const headerText = {
  margin: 0,
  color: "#a1a1aa",
  fontSize: 13,
};

const userBox = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  background: "#18181b",
  border: "1px solid #27272a",
  padding: "10px 14px",
  borderRadius: 999,
};

const statusDot = {
  width: 10,
  height: 10,
  borderRadius: 999,
  background: "#22c55e",
};

const main = {
  padding: 0,
};