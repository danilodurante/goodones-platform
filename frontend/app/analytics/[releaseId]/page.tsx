"use client";

import { useEffect, useState } from "react";

type Point = {
  date: string;
  opens: number;
  plays: number;
  downloads: number;
};

export default function AnalyticsReleasePage({
  params,
}: {
  params: { releaseId: string };
}) {
  const { releaseId } = params;
  const [data, setData] = useState<{
    totals: { opens: number; plays: number; downloads: number };
    series: Point[];
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);

      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("goodones_token")
          : null;

      if (!token) {
        setError("Missing token. Please login first.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `http://localhost:3001/analytics/releases/${releaseId}/radio`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          const text = await res.text();
          setError(`Error ${res.status}: ${text}`);
          setLoading(false);
          return;
        }

        const json = await res.json();
        setData({
          totals: json.totals,
          series: json.series,
        });
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Unexpected error");
        setLoading(false);
      }
    }

    fetchData();
  }, [releaseId]);

  return (
    <div style={{ maxWidth: 900 }}>
      <h1 style={{ fontSize: 22, marginBottom: 6 }}>Analytics</h1>
      <p style={{ fontSize: 13, color: "#9ea4c2", marginBottom: 16 }}>
        Radio performance for release <code>{releaseId}</code>.
      </p>

      {loading && <p style={{ fontSize: 13 }}>Loading…</p>}
      {error && (
        <p style={{ fontSize: 13, color: "#ff8a8a" }}>{error}</p>
      )}

      {data && (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 12,
              marginBottom: 20,
            }}
          >
            <MetricCard label="Opens" value={data.totals.opens} />
            <MetricCard label="Plays" value={data.totals.plays} />
            <MetricCard label="Downloads" value={data.totals.downloads} />
          </div>

          <div
            style={{
              borderRadius: 12,
              border: "1px solid #23273c",
              background: "#111320",
              padding: 14,
            }}
          >
            <div
              style={{ fontSize: 13, color: "#9ea4c2", marginBottom: 8 }}
            >
              Daily trend (mock data from backend)
            </div>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: 12,
              }}
            >
              <thead>
                <tr style={{ color: "#a8aed9" }}>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "4px 6px",
                      borderBottom: "1px solid #23273c",
                    }}
                  >
                    Date
                  </th>
                  <th
                    style={{
                      textAlign: "right",
                      padding: "4px 6px",
                      borderBottom: "1px solid #23273c",
                    }}
                  >
                    Opens
                  </th>
                  <th
                    style={{
                      textAlign: "right",
                      padding: "4px 6px",
                      borderBottom: "1px solid #23273c",
                    }}
                  >
                    Plays
                  </th>
                  <th
                    style={{
                      textAlign: "right",
                      padding: "4px 6px",
                      borderBottom: "1px solid #23273c",
                    }}
                  >
                    Downloads
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.series.map((p, idx) => (
                  <tr key={idx}>
                    <td
                      style={{
                        padding: "4px 6px",
                        borderBottom: "1px solid #1b1f30",
                      }}
                    >
                      {p.date}
                    </td>
                    <td
                      style={{
                        padding: "4px 6px",
                        borderBottom: "1px solid #1b1f30",
                        textAlign: "right",
                      }}
                    >
                      {p.opens}
                    </td>
                    <td
                      style={{
                        padding: "4px 6px",
                        borderBottom: "1px solid #1b1f30",
                        textAlign: "right",
                      }}
                    >
                      {p.plays}
                    </td>
                    <td
                      style={{
                        padding: "4px 6px",
                        borderBottom: "1px solid #1b1f30",
                        textAlign: "right",
                      }}
                    >
                      {p.downloads}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: number }) {
  return (
    <div
      style={{
        padding: 14,
        borderRadius: 12,
        border: "1px solid #23273c",
        background:
          "radial-gradient(circle at top, #1c2138 0, #111320 45%, #0b0d14 100%)",
      }}
    >
      <div
        style={{ fontSize: 12, color: "#9ea4c2", marginBottom: 4 }}
      >
        {label}
      </div>
      <div style={{ fontSize: 18, fontWeight: 600 }}>{value}</div>
    </div>
  );
}
