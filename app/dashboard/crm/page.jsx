"use client";

import { useEffect, useState } from "react";

export default function CRMPage() {
  const [customers, setCustomers] = useState([]);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [value, setValue] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState("Active");
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [editingCustomerId, setEditingCustomerId] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const res = await fetch("/api/customers");
    const data = await res.json();
    setCustomers(data);
  };

  const resetForm = () => {
    setName("");
    setCompany("");
    setEmail("");
    setValue("");
    setNotes("");
    setStatus("Active");
    setEditingCustomerId(null);
  };

  const saveCustomer = async () => {
    if (!name || !company || !email) return;

    const customerData = {
      id: editingCustomerId,
      name,
      company,
      email,
      status,
      value,
      notes,
    };

    await fetch("/api/customers", {
      method: editingCustomerId ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customerData),
    });

    resetForm();
    fetchCustomers();
  };

  const editCustomer = (customer) => {
    setName(customer.name);
    setCompany(customer.company);
    setEmail(customer.email);
    setValue(customer.value || "");
    setNotes(customer.notes || "");
    setStatus(customer.status);
    setEditingCustomerId(customer.id);
  };

  const deleteCustomer = async (id) => {
    await fetch("/api/customers", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    fetchCustomers();
  };

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(search.toLowerCase()) ||
      customer.company.toLowerCase().includes(search.toLowerCase()) ||
      customer.email.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      filterStatus === "All" || customer.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const activeCustomers = customers.filter((c) => c.status === "Active").length;
  const pendingCustomers = customers.filter((c) => c.status === "Pending").length;

  const totalValue = customers.reduce(
    (sum, customer) => sum + Number(customer.value || 0),
    0
  );

  return (
    <div style={{ padding: 30, color: "white" }}>
      <h1 style={titleStyle}>CRM Dashboard</h1>

      <p style={subtitleStyle}>
        Manage customers, leads, notes and sales opportunities.
      </p>

      <div style={statsGrid}>
        <div style={statCard}>
          <p>Total Customers</p>
          <h2>{customers.length}</h2>
        </div>

        <div style={statCard}>
          <p>Active Leads</p>
          <h2>{activeCustomers}</h2>
        </div>

        <div style={statCard}>
          <p>Pending Leads</p>
          <h2>{pendingCustomers}</h2>
        </div>

        <div style={statCard}>
          <p>Pipeline Value</p>
          <h2>₹{totalValue}</h2>
        </div>
      </div>

      <div style={formCard}>
        <h2 style={{ marginBottom: 16 }}>
          {editingCustomerId ? "Edit Customer" : "Add Customer"}
        </h2>

        <div style={formGrid}>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Customer Name" style={inputStyle} />
          <input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company" style={inputStyle} />
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" style={inputStyle} />
          <input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Lead Value" style={inputStyle} />

          <select value={status} onChange={(e) => setStatus(e.target.value)} style={inputStyle}>
            <option>Active</option>
            <option>Pending</option>
            <option>Closed</option>
          </select>

          <input value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Notes" style={inputStyle} />
        </div>

        <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
          <button onClick={saveCustomer} style={buttonStyle}>
            {editingCustomerId ? "Update Customer" : "Add Customer"}
          </button>

          {editingCustomerId && (
            <button onClick={resetForm} style={secondaryButton}>
              Cancel
            </button>
          )}
        </div>
      </div>

      <div style={toolbar}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search customers..."
          style={searchStyle}
        />

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          style={filterStyle}
        >
          <option>All</option>
          <option>Active</option>
          <option>Pending</option>
          <option>Closed</option>
        </select>
      </div>

      <div style={customerGrid}>

  {filteredCustomers.length === 0 && (
    <div style={emptyState}>
      No customers found. Add your first customer.
    </div>
  )}

  {filteredCustomers.map((customer) => (
          <div key={customer.id} style={customerCard}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h2 style={{ fontSize: 22 }}>{customer.name}</h2>

              <span
                style={{
                  ...statusBadge,
                  background:
                    customer.status === "Active"
                      ? "#166534"
                      : customer.status === "Pending"
                      ? "#854d0e"
                      : "#334155",
                }}
              >
                {customer.status}
              </span>
            </div>

            <p style={{ color: "#a1a1aa", marginTop: 8 }}>
              {customer.company}
            </p>

            <p style={{ marginTop: 10 }}>{customer.email}</p>

            <p style={{ marginTop: 10 }}>
              Lead Value: ₹{customer.value || "0"}
            </p>

            <p style={{ color: "#a1a1aa", marginTop: 10 }}>
              Notes: {customer.notes || "No notes"}
            </p>

            <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
              <button onClick={() => editCustomer(customer)} style={editButton}>
                Edit
              </button>

              <button onClick={() => deleteCustomer(customer.id)} style={deleteButton}>
                Delete
              </button>
            </div>
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
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: 16,
  marginBottom: 24,
};

const statCard = {
  background: "#18181b",
  border: "1px solid #27272a",
  borderRadius: 16,
  padding: 20,
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
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: 12,
};

const toolbar = {
  display: "flex",
  gap: 12,
  marginBottom: 24,
};

const customerGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: 20,
};

const inputStyle = {
  padding: 12,
  borderRadius: 10,
  border: "1px solid #3f3f46",
  background: "#09090b",
  color: "white",
};

const searchStyle = {
  ...inputStyle,
  flex: 1,
};

const filterStyle = {
  ...inputStyle,
  width: 180,
};

const buttonStyle = {
  padding: "12px 20px",
  borderRadius: 10,
  border: "none",
  background: "#2563eb",
  color: "white",
  cursor: "pointer",
};

const secondaryButton = {
  ...buttonStyle,
  background: "#3f3f46",
};

const editButton = {
  ...buttonStyle,
  background: "#2563eb",
};

const deleteButton = {
  ...buttonStyle,
  background: "#dc2626",
};

const statusBadge = {
  padding: "6px 12px",
  borderRadius: 999,
  fontSize: 14,
};

const customerCard = {
  background: "#18181b",
  border: "1px solid #27272a",
  borderRadius: 16,
  padding: 20,
};

const emptyState = {
  background: "#18181b",
  border: "1px dashed #3f3f46",
  borderRadius: 16,
  padding: 30,
  color: "#a1a1aa",
};