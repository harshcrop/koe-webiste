import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#141414" }}>
        <svg width="180" height="180" viewBox="0 0 32 32">
          <rect width="32" height="32" fill="#141414" />
          <rect x="10.5" y="7" width="11" height="2.6" rx="1.3" fill="#d9472b" />
          <circle cx="16" cy="19.2" r="6.1" fill="none" stroke="#fff" strokeWidth="2.8" />
        </svg>
      </div>
    ),
    size,
  );
}
