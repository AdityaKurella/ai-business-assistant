const automations = [
    {
      trigger: "New customer added",
      action: "Send welcome email",
      status: "Active",
    },
    {
      trigger: "Invoice created",
      action: "Notify admin",
      status: "Active",
    },
    {
      trigger: "Customer inactive",
      action: "Generate follow-up email",
      status: "Draft",
    },
  ];
  
  export default function AutomationsPage() {
    return (
      <div
        style={{
          padding: 30,
          color: "white",
        }}
      >
        <h1
          style={{
            fontSize: 36,
            fontWeight: "bold",
            marginBottom: 10,
          }}
        >
          Task Automations
        </h1>
  
        <p
          style={{
            color: "#a1a1aa",
            marginBottom: 30,
          }}
        >
          Create business workflows using AI automation.
        </p>
  
        <div
          style={{
            display: "grid",
            gap: 18,
          }}
        >
          {automations.map((item, index) => (
            <div
              key={index}
              style={{
                background: "#18181b",
                border: "1px solid #27272a",
                borderRadius: 16,
                padding: 20,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h2
                  style={{
                    fontSize: 20,
                    marginBottom: 8,
                  }}
                >
                  If: {item.trigger}
                </h2>
  
                <p
                  style={{
                    color: "#a1a1aa",
                  }}
                >
                  Then: {item.action}
                </p>
              </div>
  
              <span
                style={{
                  background:
                    item.status === "Active"
                      ? "#166534"
                      : "#854d0e",
  
                  padding: "6px 12px",
                  borderRadius: 999,
                  fontSize: 14,
                }}
              >
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }