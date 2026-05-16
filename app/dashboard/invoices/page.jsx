"use client";

import { useEffect, useState } from "react";

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState([]);
  const [client, setClient] = useState("");
  const [service, setService] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    const res = await fetch("/api/invoices");
    const data = await res.json();
    setInvoices(data);
  };

  const createInvoice = async () => {
    if (!client || !service || !amount) return;

    await fetch("/api/invoices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ client, service, amount }),
    });

    setClient("");
    setService("");
    setAmount("");
    fetchInvoices();
  };

  const deleteInvoice = async (id) => {
    await fetch("/api/invoices", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    fetchInvoices();
  };

  const totalAmount = invoices.reduce(
    (sum, invoice) => sum + Number(invoice.amount || 0),
    0
  );

  return (
    <div style={{ padding: 30, color: "white" }}>
      <h1 style={titleStyle}>Invoice Generator</h1>

      <p style={subtitleStyle}>
        Create and manage client invoices.
      </p>

      <div style={statsGrid}>
        <div style={cardStyle}>
          <p>Total Invoices</p>
          <h2>{invoices.length}</h2>
        </div>

        <div style={cardStyle}>
          <p>Total Value</p>
          <h2>₹{totalAmount}</h2>
        </div>
      </div>

      <div style={formCard}>
        <h2>Create Invoice</h2>

        <div style={formGrid}>
          <input
            value={client}
            onChange={(e) => setClient(e.target.value)}
            placeholder="Client Name"
            style={inputStyle}
          />

          <input
            value={service}
            onChange={(e) => setService(e.target.value)}
            placeholder="Service"
            style={inputStyle}
          />

          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
            style={inputStyle}
          />

          <button onClick={createInvoice} style={buttonStyle}>
            Create
          </button>
        </div>
      </div>

      <div style={invoiceGrid}>

  {invoices.length === 0 && (
    <div style={emptyState}>
      No invoices yet. Create your first invoice.
    </div>
  )}

  {invoices.map((invoice) => (
          <div key={invoice.id} style={cardStyle}>
            <h2>{invoice.client}</h2>
            <p style={{ color: "#a1a1aa" }}>{invoice.service}</p>
            <p>Amount: ₹{invoice.amount}</p>
            <p>Status: {invoice.status}</p>

            <button
              onClick={() => deleteInvoice(invoice.id)}
              style={deleteButton}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const titleStyle = {
  fontSize: 36,
  fontWeight: "bold",
  marginBottom: 10,
};

const subtitleStyle = {
  color: "#a1a1aa",
  marginBottom: 30,
};

const statsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: 20,
  marginBottom: 24,
};

const formCard = {
  background: "#18181b",
  border: "1px solid #27272a",
  borderRadius: 16,
  padding: 24,
  marginBottom: 24,
};

const formGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr auto",
  gap: 12,
  marginTop: 16,
};

const invoiceGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: 20,
};

const cardStyle = {
  background: "#18181b",
  border: "1px solid #27272a",
  borderRadius: 16,
  padding: 20,
};

const inputStyle = {
  padding: 12,
  borderRadius: 10,
  border: "1px solid #3f3f46",
  background: "#09090b",
  color: "white",
};

const buttonStyle = {
  padding: "12px 20px",
  borderRadius: 10,
  border: "none",
  background: "#2563eb",
  color: "white",
  cursor: "pointer",
};

const deleteButton = {
  ...buttonStyle,
  background: "#dc2626",
  marginTop: 16,
};

const emptyState = {
    background: "#18181b",
    border: "1px dashed #3f3f46",
    borderRadius: 16,
    padding: 30,
    color: "#a1a1aa",
  };