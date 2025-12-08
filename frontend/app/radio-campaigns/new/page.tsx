"use client";

import { useState } from "react";

export default function NewRadioCampaignPage() {
  const [releaseId, setReleaseId] = useState("");
  const [title, setTitle] = useState("");
  const [radioDate, setRadioDate] = useState("");
  const [promoText, setPromoText] = useState("");
  const [targetListId, setTargetListId] = useState("");

  const [payload, setPayload] = useState<any>(null);
  const [sendResult, setSendResult] = useState<any>(null);
  const [campaignId, setCampaignId] = useState<string | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [loadingSend, setLoadingSend] = useState(false);

  function getToken() {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("goodones_token");
  }

  async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPayload(null);
    setSendResult(null);
    setCampaignId(null);
    setLoadingCreate(true);

    const token = getToken();
    if (!token) {
      setError("Missing token. Please login first.");
      setLoadingCreate(false);
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:3001/releases/${releaseId}/radio-campaigns`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title,
            radioDate,
            promoText,
            targetListId: targetListId || undefined,
          }),
        }
      );

      if (!res.ok) {
        const text = await res.text();
        setError(`Error ${res.status}: ${text}`);
        setLoadingCreate(false);
        return;
      }

      const data = await res.json();
      setCampaignId(data.id);

      // ora fetch payload
      const payloadRes = await fetch(
        `http://localhost:3001/releases/${releaseId}/radio-campaigns/${data.id}/payload`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const payloadJson = await payloadRes.json();
      setPayload(payloadJson);

      setLoadingCreate(false);
    } catch (err) {
      console.error(err);
      setError("Unexpected error");
      setLoadingCreate(false);
    }
  }

  async function handleSend() {
    if (!campaignId) return;
    setError(null);
    setLoadingSend(true);

    const token = getToken();
    if (!token) {
      setError("Missing token. Please login first.");
      setLoadingSend(false);
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:3001/releases/${releaseId}/radio-campaigns/${campaignId}/send`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        const text = await res.text();
        setError(`Error ${res.status}: ${text}`);
        setLoadingSend(false);
        return;
      }

      const data = await res.json();
      setSendResult(data);
      setLoadingSend(false);
    } catch (err) {
      console.error(err);
      setError("Unexpected error");
      setLoadingSend(false);
    }
  }

  return (
    <div style={{ maxWidth: 900 }}>
      <h1 style={{ fontSize: 22, marginBottom: 8 }}>Radio Campaign</h1>
      <p style={{ fontSize: 13, color: "#9ea4c2", marginBottom: 20 }}>
        Create a radio campaign for an existing release and send it to the
        fake PlayMPE client.
      </p>

      <form
        onSubmit={handleCreate}
        style={{ display: "grid", gap: 14, fontSize: 13 }}
      >
        <div style={{ display: "grid", gap: 4 }}>
          <label>Release ID</label>
          <input
            value={releaseId}
            onChange={(e) => setReleaseId(e.target.value)}
            placeholder="Paste release UUID"
            required
            style={inputStyle}
          />
        </div>

        <div style={{ display: "grid", gap: 4 }}>
          <label>Campaign title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={inputStyle}
          />
        </div>

        <div style={{ display: "grid", gap: 4 }}>
          <label>Radio date</label>
          <input
            type="date"
            value={radioDate}
            onChange={(e) => setRadioDate(e.target.value)}
            required
            style={inputStyle}
          />
        </div>

        <div style={{ display: "grid", gap: 4 }}>
          <label>Promo text</label>
          <textarea
            value={promoText}
            onChange={(e) => setPromoText(e.target.value)}
            rows={4}
            style={{ ...inputStyle, resize: "vertical" }}
          />
        </div>

        <div style={{ display: "grid", gap: 4 }}>
          <label>Target list ID (optional)</label>
          <input
            value={targetListId}
            onChange={(e) => setTargetListId(e.target.value)}
            style={inputStyle}
          />
        </div>

        <button
          type="submit"
          disabled={loadingCreate}
          style={primaryButtonStyle}
        >
          {loadingCreate ? "Creating…" : "Create & preview payload"}
        </button>

        {error && (
          <p style={{ color: "#ff8a8a", fontSize: 12 }}>{error}</p>
        )}
      </form>

      {payload && (
        <div
          style={{
            marginTop: 24,
            padding: 14,
            borderRadius: 12,
            border: "1px solid #23273c",
            background: "#111320",
          }}
        >
          <div
            style={{ fontSize: 13, color: "#9ea4c2", marginBottom: 6 }}
          >
            PlayMPE payload (preview)
          </div>
          <pre
            style={{
              margin: 0,
              fontSize: 12,
              whiteSpace: "pre-wrap",
            }}
          >
            {JSON.stringify(payload, null, 2)}
          </pre>

          <button
            onClick={handleSend}
            disabled={loadingSend}
            style={{ ...primaryButtonStyle, marginTop: 10 }}
          >
            {loadingSend ? "Sending…" : "Send to Fake PlayMPE"}
          </button>
        </div>
      )}

      {sendResult && (
        <pre
          style={{
            marginTop: 18,
            fontSize: 12,
            background: "#0b0d14",
            borderRadius: 10,
            padding: 12,
            border: "1px solid #23273c",
            whiteSpace: "pre-wrap",
          }}
        >
          {JSON.stringify(sendResult, null, 2)}
        </pre>
      )}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  padding: "8px 10px",
  borderRadius: 8,
  border: "1px solid #2b3043",
  background: "#0f1117",
  color: "#f5f5f7",
  fontSize: 13,
};

const primaryButtonStyle: React.CSSProperties = {
  marginTop: 6,
  padding: "9px 12px",
  borderRadius: 999,
  border: "none",
  fontSize: 13,
  fontWeight: 600,
  cursor: "pointer",
  background:
    "linear-gradient(135deg, #ff4b6a 0%, #ff8c4b 50%, #ffd15c 100%)",
  color: "#0b0d14",
};
