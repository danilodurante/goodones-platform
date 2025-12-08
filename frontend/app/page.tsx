"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [tokenPresent, setTokenPresent] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("goodones_token");
      setTokenPresent(!!token);
    }
  }, []);

  return (
    <div style={{ maxWidth: 900 }}>
      <h1 style={{ fontSize: 24, marginBottom: 8 }}>Dashboard</h1>
      <p style={{ fontSize: 14, color: "#9ea4c2", marginBottom: 24 }}>
        Overview of your GOOD ONES workspace (MVP).
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
        }}
      >
        <div
          style={{
            padding: 18,
            borderRadius: 12,
            border: "1px solid #23273c",
            background:
              "radial-gradient(circle at top, #1c2138 0, #111320 45%, #0b0d14 100%)",
          }}
        >
          <div
            style={{ fontSize: 13, color: "#9ea4c2", marginBottom: 6 }}
          >
            Auth status
          </div>
          <div style={{ fontSize: 16, fontWeight: 600 }}>
            {tokenPresent === null
              ? "Checking..."
              : tokenPresent
              ? "Authenticated (token present)"
              : "Not authenticated"}
          </div>
          <p
            style={{
              fontSize: 12,
              marginTop: 8,
              color: "#a8b0d0",
              lineHeight: 1.5,
            }}
          >
            Log in from the <strong>Login</strong> section to obtain an API
            token from the backend and start creating releases & campaigns.
          </p>
        </div>

        <div
          style={{
            padding: 18,
            borderRadius: 12,
            border: "1px solid #23273c",
            background: "#111320",
          }}
        >
          <div
            style={{ fontSize: 13, color: "#9ea4c2", marginBottom: 6 }}
          >
            Next steps
          </div>
          <ul
            style={{
              margin: 0,
              paddingLeft: 18,
              fontSize: 13,
              lineHeight: 1.6,
              color: "#cfd3e5",
            }}
          >
            <li>Implement releases creation UI</li>
            <li>Implement radio campaign UI</li>
            <li>Add analytics chart for radio opens/plays/downloads</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
