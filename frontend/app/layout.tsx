export const metadata = {
  title: "GOOD ONES Platform",
  description: "Distribution + Radio Promo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily:
            "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
          background: "#0f1117",
          color: "#f5f5f7",
        }}
      >
        <div style={{ display: "flex", minHeight: "100vh" }}>
          <aside
            style={{
              width: 230,
              borderRight: "1px solid #1e2230",
              padding: "20px 18px",
              background: "#111322",
            }}
          >
            <div style={{ marginBottom: 32 }}>
              <div
                style={{
                  fontWeight: 700,
                  letterSpacing: 1,
                  fontSize: 16,
                }}
              >
                GOOD ONES
              </div>
              <div style={{ fontSize: 12, color: "#8f9bb3" }}>
                Distribution + Radio Promo
              </div>
            </div>
            <nav
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                fontSize: 14,
              }}
            >
              <a
                href="/"
                style={{ color: "#a3c6ff", textDecoration: "none" }}
              >
                Dashboard
              </a>
              <a
                href="/login"
                style={{ color: "#cfb3ff", textDecoration: "none" }}
              >
                Login
              </a>
            </nav>
          </aside>
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <header
              style={{
                height: 56,
                borderBottom: "1px solid #1e2230",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 24px",
                background: "#111320",
              }}
            >
              <div style={{ fontSize: 14, color: "#8f9bb3" }}>
                GOOD ONES · Demo workspace
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "#cfd3e5",
                  opacity: 0.9,
                }}
              >
                Frontend MVP
              </div>
            </header>
            <main style={{ flex: 1, padding: "24px 32px" }}>{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
