import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Secure Life Agency — Your Next Chapter Starts Here.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const mark = await readFile(join(process.cwd(), "public/brand/mark-white.png"));
  const markSrc = `data:image/png;base64,${mark.toString("base64")}`;

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
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <img src={markSrc} width={53} height={80} alt="" />
          <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: 2 }}>SECURE LIFE AGENCY</div>
        </div>
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
