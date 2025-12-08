"use client";

import { useState } from "react";

type TrackInput = {
  title: string;
  isrc: string;
  trackNumber: number;
};

export default function NewReleasePage() {
  const [labelId, setLabelId] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState<"single" | "ep" | "album">("single");
  const [primaryArtist, setPrimaryArtist] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [upc, setUpc] = useState("");
  const [tracks, setTracks] = useState<TrackInput[]>([
    { title: "", isrc: "", trackNumber: 1 },
  ]);

  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function updateTrack(index: number, field: keyof TrackInput, value: string) {
    setTracks((prev) =>
      prev.map((t, i) =>
        i === index ? { ...t, [field]: field === "trackNumber" ? Number(value) : value } : t
      )
    );
  }

  function addTrack() {
    setTracks((prev) => [
      ...prev,
      { title: "", isrc: "", trackNumber: prev.length + 1 },
    ]);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setResult(null);
    setLoading(true);

    const token = typeof window !== "undefined"
      ? localStorage.getItem("goodones_token")
      : null;

    if (!token) {
      setError("Missing token. Please login first.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:3001/labels/${labelId}/releases`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title,
            type,
            primaryArtist,
            releaseDate,
            upc: upc || undefined,
            tracks,
          }),
        }
      );

      if (!res.ok) {
        const text = await res.text();
        setError(`Error ${res.status}: ${text}`);
        setLoading(false);
        return;
      }

      const data = await res.json();
      setResult(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Unexpected error");
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 900 }}>
      <h1 style={{ fontSize: 22, marginBottom: 8 }}>New Release</h1>
      <p style={{ fontSize: 13, color: "#9ea4c2", marginBottom: 20 }}>
        Minimal upload form that calls the GOOD ONES backend
        <code> POST /labels/:labelId/releases</code>.
      </p>

      <form
        onSubmit={handleSubmit}
        style={{ display: "grid", gap: 14, fontSize: 13 }}
      >
        <div style={{ display: "grid", gap: 4 }}>
          <label>Label ID</label>
          <input
            value={labelId}
            onChange={(e) => setLabelId(e.target.value)}
            placeholder="Paste label UUID"
            required
            style={inputStyle}
          />
        </div>

        <div style={{ display: "grid", gap: 4 }}>
          <label>Release title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={inputStyle}
          />
        </div>

        <div style={{ display: "grid", gap: 4 }}>
          <label>Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as any)}
            style={inputStyle}
          >
            <option value="single">Single</option>
            <option value="ep">EP</option>
            <option value="album">Album</option>
          </select>
        </div>

        <div style={{ display: "grid", gap: 4 }}>
          <label>Primary artist</label>
          <input
            value={primaryArtist}
            onChange={(e) => setPrimaryArtist(e.target.value)}
            required
            style={inputStyle}
          />
        </div>

        <div style={{ display: "grid", gap: 4 }}>
          <label>Release date</label>
          <input
            type="date"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
            required
            style={inputStyle}
          />
        </div>

        <div style={{ display: "grid", gap: 4 }}>
          <label>UPC (optional)</label>
          <input
            value={upc}
            onChange={(e) => setUpc(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div
          style={{
            marginTop: 10,
            padding: 12,
            borderRadius: 12,
            border: "1px solid #23273c",
            background: "#111320",
          }}
        >
          <div
            style={{ fontSize: 12, color: "#9ea4c2", marginBottom: 10 }}
          >
            Tracks
          </div>
          {tracks.map((track, idx) => (
            <div
              key={idx}
              style={{
                display: "grid",
                gridTemplateColumns: "1.5fr 1fr 80px",
                gap: 8,
                marginBottom: 8,
              }}
            >
              <input
                placeholder="Title"
                value={track.title}
                onChange={(e) =>
                  updateTrack(idx, "title", e.target.value)
                }
                style={inputStyle}
              />
              <input
                placeholder="ISRC"
                value={track.isrc}
                onChange={(e) =>
                  updateTrack(idx, "isrc", e.target.value)
                }
                style={inputStyle}
              />
              <input
                type="number"
                min={1}
                value={track.trackNumber}
                onChange={(e) =>
                  updateTrack(idx, "trackNumber", e.target.value)
                }
                style={inputStyle}
              />
            </div>
          ))}

          <button
            type="button"
            onClick={addTrack}
            style={secondaryButtonStyle}
          >
            + Add track
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={primaryButtonStyle}
        >
          {loading ? "Saving…" : "Create release"}
        </button>

        {error && (
          <p style={{ color: "#ff8a8a", fontSize: 12 }}>{error}</p>
        )}
      </form>

      {result && (
        <pre
          style={{
            marginTop: 24,
            fontSize: 12,
            background: "#0b0d14",
            borderRadius: 10,
            padding: 12,
            border: "1px solid #23273c",
            whiteSpace: "pre-wrap",
          }}
        >
          {JSON.stringify(result, null, 2)}
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
  marginTop: 4,
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

const secondaryButtonStyle: React.CSSProperties = {
  marginTop: 6,
  padding: "6px 10px",
  borderRadius: 999,
  border: "1px solid #2b3043",
  fontSize: 12,
  cursor: "pointer",
  background: "#0f1117",
  color: "#f5f5f7",
};
