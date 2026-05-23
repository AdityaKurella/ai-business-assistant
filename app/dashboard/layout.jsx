"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "Dashboard", icon: "⌘", href: "/dashboard" },
  { name: "AI Chat", icon: "✦", href: "/dashboard/chat" },
  { name: "CRM", icon: "◈", href: "/dashboard/crm" },
  { name: "Email Writer", icon: "✉", href: "/dashboard/email-writer" },
  { name: "Analytics", icon: "▣", href: "/dashboard/analytics" },
  { name: "Automations", icon: "⚡", href: "/dashboard/automations" },
  { name: "Invoices", icon: "▤", href: "/dashboard/invoices" },
  { name: "Settings", icon: "⚙", href: "/dashboard/settings" },
];

export default function DashboardLayout({ children }) {
  const pathname = usePathname();

  return (
    <div style={layout}>
      <aside style={sidebar}>
        <div style={brand}>
          <div style={brandIcon}>AI</div>
          <div>
            <h1 style={brandTitle}>AssistFlow</h1>
            <p style={brandSub}>AI Business OS</p>
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
                    ? "linear-gradient(135deg, rgba(37,99,235,0.95), rgba(124,58,237,0.95))"
                    : "rgba(255,255,255,0.04)",
                  border: active
                    ? "1px solid rgba(147,197,253,0.5)"
                    : "1px solid rgba(255,255,255,0.06)",
                  boxShadow: active
                    ? "0 0 28px rgba(37,99,235,0.35)"
                    : "none",
                }}
              >
                <span style={navIcon}>{link.icon}</span>
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>

        <div style={upgradeCard}>
          <p style={{ margin: 0, color: "#c4b5fd", fontSize: 13 }}>
            Demo AI Mode
          </p>
          <h3 style={{ margin: "8px 0", fontSize: 16 }}>
            Portfolio SaaS MVP
          </h3>
          <p style={{ margin: 0, color: "#a1a1aa", fontSize: 13 }}>
            CRM, invoices, automations and AI workflows.
          </p>
        </div>
      </aside>

      <section style={mainArea}>
        <header style={topbar}>
          <div>
            <p style={eyebrow}>AI Dashboard</p>
            <h2 style={topbarTitle}>Business Command Center</h2>
          </div>

          <div style={topActions}>
            <div style={searchBox}>Search workspace...</div>
            <div style={userPill}>
              <span style={onlineDot}></span>
              Aditya
            </div>
          </div>
        </header>

        <main style={content}>{children}</main>
      </section>
    </div>
  );
}

const layout = {
  minHeight: "100vh",
  display: "flex",
  background:
    "radial-gradient(circle at top left, rgba(37,99,235,0.28), transparent 35%), radial-gradient(circle at bottom right, rgba(124,58,237,0.2), transparent 35%), #050509",
  color: "white",
  fontFamily: "Inter, system-ui, sans-serif",
};

const sidebar = {
  width: 290,
  padding: 22,
  display: "flex",
  flexDirection: "column",
  gap: 24,
  borderRight: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(10,10,16,0.82)",
  backdropFilter: "blur(18px)",
};

const brand = {
  display: "flex",
  alignItems: "center",
  gap: 14,
};

const brandIcon = {
  width: 48,
  height: 48,
  borderRadius: 16,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 800,
  background: "linear-gradient(135deg, #2563eb, #7c3aed)",
  boxShadow: "0 0 30px rgba(37,99,235,0.55)",
};

const brandTitle = {
  margin: 0,
  fontSize: 23,
  letterSpacing: "-0.04em",
};

const brandSub = {
  margin: 0,
  color: "#9ca3af",
  fontSize: 13,
};

const nav = {
  display: "grid",
  gap: 11,
};

const navLink = {
  height: 46,
  padding: "0 14px",
  borderRadius: 15,
  display: "flex",
  alignItems: "center",
  gap: 12,
  color: "white",
  textDecoration: "none",
  transition: "0.2s ease",
};

const navIcon = {
  width: 24,
  height: 24,
  borderRadius: 8,
  background: "rgba(255,255,255,0.08)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 13,
};

const upgradeCard = {
  marginTop: "auto",
  padding: 18,
  borderRadius: 20,
  border: "1px solid rgba(124,58,237,0.35)",
  background:
    "linear-gradient(135deg, rgba(37,99,235,0.12), rgba(124,58,237,0.12))",
};

const mainArea = {
  flex: 1,
  minWidth: 0,
};

const topbar = {
  height: 86,
  padding: "0 34px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  borderBottom: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(5,5,9,0.55)",
  backdropFilter: "blur(16px)",
};

const eyebrow = {
  margin: 0,
  color: "#60a5fa",
  fontSize: 13,
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
};

const topbarTitle = {
  margin: "4px 0 0",
  fontSize: 22,
  letterSpacing: "-0.03em",
};

const topActions = {
  display: "flex",
  alignItems: "center",
  gap: 14,
};

const searchBox = {
  width: 260,
  padding: "12px 16px",
  borderRadius: 999,
  color: "#71717a",
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.08)",
};

const userPill = {
  display: "flex",
  alignItems: "center",
  gap: 9,
  padding: "12px 15px",
  borderRadius: 999,
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.08)",
  color: "#d4d4d8",
};

const onlineDot = {
  width: 9,
  height: 9,
  borderRadius: 99,
  background: "#22c55e",
  boxShadow: "0 0 12px #22c55e",
};

const content = {
  padding: 34,
};