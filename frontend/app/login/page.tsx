"use client";

import { useState } from "react";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const payload = {
      email: form.get("email"),
      password: form.get("password"),
    };

    try {
      const res = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        setError("Invalid credentials");
        setLoading(false);
        return;
      }

      const data = await res.json();
      if (typeof window !== "undefined") {
        localStorage.setItem("goodones_token", data.accessToken);
      }

      window.location.href = "/";
    } catch (err) {
      console.error(err);
      setError("Unexpected error");
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        maxWidth: 360,
        margin: "40px auto",
        padding: 24,
        borderRadius: 16,
        border: "1px solid #23273c",
        background:
          "radial-gradient(circle at top, #151a2a 0, #0f1117 55%, #0b0d14 100%)",
      }}
    >
      <h1 style={{ fontSize: 20, marginBottom: 8 }}>Login</h1>
      <p style={{ fontSize: 13, color: "#9ea4c2", marginBottom: 18 }}>
        Enter your demo credentials to access the GOOD ONES backend.
      </p>

      <form
        onSubmit={handleSubmit}
        style={{ display: "grid", gap: 12, marginTop: 10 }}
      >
        <div style={{ display: "grid", gap: 4 }}>
          <label style={{ fontSize: 12 }}>Email</label>
          <input
            name="email"
            type="email"
            placeholder="demo@goodones.ai"
            required
            style={{
              padding: "8px 10px",
              borderRadius: 8,
              border: "1px solid #2b3043",
              background: "#0f1117",
              color: "#f5f5f7",
              fontSize: 13,
            }}
          />
        </div>

        <div style={{ display: "grid", gap: 4 }}>
          <label style={{ fontSize: 12 }}>Password</label>
          <input
            name="password"
            type="password"
            placeholder="demo123"
            required
            style={{
              padding: "8px 10px",
              borderRadius: 8,
              border: "1px solid #2b3043",
              background: "#0f1117",
              color: "#f5f5f7",
              fontSize: 13,
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: 6,
            padding: "8px 10px",
            borderRadius: 999,
            border: "none",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
            background:
              "linear-gradient(135deg, #ff4b6a 0%, #ff8c4b 50%, #ffd15c 100%)",
            color: "#0b0d14",
          }}
        >
          {loading ? "Logging in…" : "Log in"}
        </button>

        {error && (
          <p style={{ color: "#ff8a8a", fontSize: 12, marginTop: 4 }}>
            {error}
          </p>
        )}

        <p
          style={{
            marginTop: 8,
            fontSize: 11,
            color: "#7f85a3",
            lineHeight: 1.5,
          }}
        >
          Default demo user (once seeded):
          <br />
          <code>demo@goodones.ai</code> / <code>demo123</code>
        </p>
      </form>
    </div>
  );
}
