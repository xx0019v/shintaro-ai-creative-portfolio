import { ImageResponse } from "next/og";

export const alt = "Avendaño Shintaro — Creative Technologist";
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
          padding: "58px 66px",
          background: "#F3F0E8",
          color: "#171713",
          fontFamily: "sans-serif",
          border: "20px solid #3157FF",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, letterSpacing: 2 }}>
          <span style={{ fontWeight: 700 }}>AVENDAÑO SHINTARO</span>
          <span>PORTFOLIO / 2026</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 88, lineHeight: 0.96, letterSpacing: -5, fontWeight: 700 }}>
            <span>Think with AI.</span>
            <span>Build for the web.</span>
          </div>
          <div style={{ marginTop: 22, color: "#3157FF", fontSize: 42, fontWeight: 700 }}>
            Shape the whole experience.
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 17, letterSpacing: 2 }}>
          <span>AI · WEB · VISUAL DIRECTION</span>
          <span>CREATIVE TECHNOLOGIST</span>
        </div>
      </div>
    ),
    size
  );
}
