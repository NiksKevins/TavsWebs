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
            <svg width="42" height="42" viewBox="0 0 24 24">
              <path fill="#3B82F6" d="M12.000 0.800 L12.715 1.096 L13.331 1.887 L13.810 2.901 L14.226 3.693 L14.982 3.215 L15.904 2.576 L16.833 2.200 L17.600 2.301 L18.071 2.914 L18.210 3.907 L18.117 5.025 L18.081 5.919 L18.975 5.883 L20.093 5.790 L21.086 5.929 L21.699 6.400 L21.800 7.167 L21.424 8.096 L20.785 9.018 L20.307 9.774 L21.099 10.190 L22.113 10.669 L22.904 11.285 L23.200 12.000 L22.904 12.715 L22.113 13.331 L21.099 13.810 L20.307 14.226 L20.785 14.982 L21.424 15.904 L21.800 16.833 L21.699 17.600 L21.086 18.071 L20.093 18.210 L18.975 18.117 L18.081 18.081 L18.117 18.975 L18.210 20.093 L18.071 21.086 L17.600 21.699 L16.833 21.800 L15.904 21.424 L14.982 20.785 L14.226 20.307 L13.810 21.099 L13.331 22.113 L12.715 22.904 L12.000 23.200 L11.285 22.904 L10.669 22.113 L10.190 21.099 L9.774 20.307 L9.018 20.785 L8.096 21.424 L7.167 21.800 L6.400 21.699 L5.929 21.086 L5.790 20.093 L5.883 18.975 L5.919 18.081 L5.025 18.117 L3.907 18.210 L2.914 18.071 L2.301 17.600 L2.200 16.833 L2.576 15.904 L3.215 14.982 L3.693 14.226 L2.901 13.810 L1.887 13.331 L1.096 12.715 L0.800 12.000 L1.096 11.285 L1.887 10.669 L2.901 10.190 L3.693 9.774 L3.215 9.018 L2.576 8.096 L2.200 7.167 L2.301 6.400 L2.914 5.929 L3.907 5.790 L5.025 5.883 L5.919 5.919 L5.883 5.025 L5.790 3.907 L5.929 2.914 L6.400 2.301 L7.167 2.200 L8.096 2.576 L9.018 3.215 L9.774 3.693 L10.190 2.901 L10.669 1.887 L11.285 1.096 Z" />
              <path
                stroke="#FFFFFF"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 12.2 10.3 15.4 17.1 8.3"
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
