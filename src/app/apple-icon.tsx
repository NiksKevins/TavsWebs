import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Apple touch icon — clean blue circle with checkmark. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#05070c",
        }}
      >
        <div
          style={{
            width: 148,
            height: 148,
            borderRadius: 9999,
            background: "#3B82F6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#FFFFFF",
            fontSize: 84,
            fontWeight: 700,
            lineHeight: 1,
          }}
        >
          ✓
        </div>
      </div>
    ),
    { ...size },
  );
}
