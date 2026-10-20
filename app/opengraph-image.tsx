import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 96px",
          background: "linear-gradient(150deg, #0e0b09 0%, #241610 45%, #6e3410 78%, #e07b28 100%)",
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <svg width="120" height="120" viewBox="0 0 32 32">
            <rect width="32" height="32" rx="8.5" fill="#fff" />
            <rect x="10.5" y="7" width="11" height="2.6" rx="1.3" fill="#d9472b" />
            <circle cx="16" cy="19.2" r="6.1" fill="none" stroke="#141414" strokeWidth="2.8" />
          </svg>
          <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: -3 }}>{site.name}</div>
        </div>
        <div style={{ marginTop: 48, fontSize: 64, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05 }}>
          {`Speak. ${site.name} types.`}
        </div>
        <div style={{ marginTop: 20, fontSize: 32, color: "rgba(255,247,240,0.75)" }}>
          Private, on-device speech to text for Mac.
        </div>
      </div>
    ),
    size,
  );
}
