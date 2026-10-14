import { ImageResponse } from "next/og";

export const alt = "Secure Life Agency — Your Next Chapter Starts Here.";
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
          justifyContent: "space-between",
          background: "#000",
          color: "#fff",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 30, fontWeight: 700 }}>Secure Life Agency</div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 104, fontWeight: 800, lineHeight: 0.95, letterSpacing: -3 }}>
          <span>Your Next Chapter</span>
          <span>Starts Here.</span>
        </div>
        <div style={{ fontSize: 28, color: "#b9bdc3" }}>Independent life insurance agent opportunities</div>
      </div>
    ),
    size,
  );
}
