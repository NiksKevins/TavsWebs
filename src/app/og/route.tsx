import { ImageResponse } from "next/og";
import { site } from "@/lib/data";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? site.name;
  const subtitle =
    searchParams.get("subtitle") ?? "Premium digital craft";
  const agencyLabel = searchParams.get("agency") ?? "Web Agency";
  const craftLabel = searchParams.get("craft") ?? "Premium digital craft";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "linear-gradient(145deg, #05070c 0%, #0a1220 48%, #0c1a2e 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 78% 22%, rgba(59,130,246,0.35), transparent 42%), radial-gradient(circle at 18% 78%, rgba(103,232,249,0.18), transparent 40%)",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          <div style={{ display: "flex", fontSize: 28, fontWeight: 700, letterSpacing: -0.5 }}>
            {site.name}
            <span style={{ color: "#60a5fa" }}>.</span>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 18,
              color: "#94a3b8",
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            {agencyLabel}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20, position: "relative" }}>
          <div
            style={{
              display: "flex",
              fontSize: title.length > 42 ? 54 : 68,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -2,
              maxWidth: 980,
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              color: "#94a3b8",
              maxWidth: 760,
              lineHeight: 1.35,
            }}
          >
            {subtitle}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "relative",
            color: "#64748b",
            fontSize: 20,
          }}
        >
          <span>{site.url.replace("https://", "")}</span>
          <span style={{ color: "#67e8f9" }}>{craftLabel}</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
