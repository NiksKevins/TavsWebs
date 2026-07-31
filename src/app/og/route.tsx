import { ImageResponse } from "next/og";
import { site } from "@/lib/data";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? site.name;
  const subtitle =
    searchParams.get("subtitle") ??
    "Ātri, kvalitatīvi un pielāgots tavām prasībām";
  const agencyLabel = searchParams.get("agency") ?? "Mājaslapu izstrāde";
  const craftLabel = searchParams.get("craft") ?? "CRM · Web · Apps";

  const titleSize =
    title.length > 52 ? 48 : title.length > 36 ? 56 : title.length > 24 ? 64 : 72;

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
          background:
            "linear-gradient(145deg, #05070c 0%, #0a1220 48%, #0c1a2e 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 78% 22%, rgba(59,130,246,0.38), transparent 42%), radial-gradient(circle at 18% 78%, rgba(103,232,249,0.16), transparent 40%)",
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <svg width="42" height="42" viewBox="0 0 64 64">
              <path
                fill="#3B82F6"
                d="M32 2.2c1.1 0 2 .5 2.9 1.3l2.2 2.1c.6.5 1.4.7 2.2.6l3-.2c1.3-.1 2.4.6 3 1.8l1.4 2.7c.3.7.9 1.3 1.7 1.5l2.9 1.1c1.2.4 1.9 1.5 1.9 2.8v3c0 .8.3 1.6.9 2.1l2.2 2.1c.9.8 1.2 2 .8 3.1l-1.1 2.9c-.3.7-.3 1.5 0 2.2l1.1 2.9c.4 1.1.1 2.3-.8 3.1l-2.2 2.1c-.6.5-.9 1.3-.9 2.1v3c0 1.3-.7 2.4-1.9 2.8l-2.9 1.1c-.8.3-1.4.8-1.7 1.5l-1.4 2.7c-.6 1.2-1.7 1.9-3 1.8l-3-.2c-.8-.1-1.6.1-2.2.6l-2.2 2.1c-.9.8-2.1.8-3 0l-2.2-2.1c-.6-.5-1.4-.7-2.2-.6l-3 .2c-1.3.1-2.4-.6-3-1.8l-1.4-2.7c-.3-.7-.9-1.3-1.7-1.5l-2.9-1.1c-1.2-.4-1.9-1.5-1.9-2.8v-3c0-.8-.3-1.6-.9-2.1l-2.2-2.1c-.9-.8-1.2-2-.8-3.1l1.1-2.9c.3-.7.3-1.5 0-2.2l-1.1-2.9c-.4-1.1-.1-2.3.8-3.1l2.2-2.1c.6-.5.9-1.3.9-2.1v-3c0-1.3.7-2.4 1.9-2.8l2.9-1.1c.8-.3 1.4-.8 1.7-1.5l1.4-2.7c.6-1.2 1.7-1.9 3-1.8l3 .2c.8.1 1.6-.1 2.2-.6l2.2-2.1c.9-.8 1.8-1.3 2.9-1.3z"
              />
              <path
                stroke="#FFFFFF"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20 33.5 28.2 41.5 44.5 23"
                fill="none"
              />
            </svg>
            <div
              style={{
                display: "flex",
                fontSize: 28,
                fontWeight: 700,
                letterSpacing: -0.5,
              }}
            >
              {site.name}
              <span style={{ color: "#60a5fa" }}>.</span>
            </div>
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

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: titleSize,
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
              maxWidth: 780,
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
