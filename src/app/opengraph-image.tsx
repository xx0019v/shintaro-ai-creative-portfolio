import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Shintaro Avendano — AI Creative Developer Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "radial-gradient(circle at 30% 30%, rgba(200,169,106,0.18) 0%, transparent 55%), linear-gradient(135deg, #0B0B0B 0%, #141414 100%)",
          color: "#F5F1EA",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            letterSpacing: 6,
            textTransform: "uppercase",
            fontSize: 18,
            color: "#C8A96A",
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: 9999,
              background: "#C8A96A",
              display: "block",
            }}
          />
          Portfolio · Volume 01
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 36,
              letterSpacing: 8,
              textTransform: "uppercase",
              color: "#C8A96A",
              marginBottom: 24,
            }}
          >
            Shintaro Avendano
          </div>
          <div
            style={{
              fontSize: 112,
              lineHeight: 1.02,
              letterSpacing: -2,
              maxWidth: 1040,
            }}
          >
            Turning Ideas into{" "}
            <span style={{ fontStyle: "italic", opacity: 0.85 }}>Systems,</span>{" "}
            Visuals, &amp; Experiences.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 20,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "rgba(245,241,234,0.7)",
          }}
        >
          <div style={{ display: "flex", gap: 24 }}>
            <span>AI</span>
            <span>Web</span>
            <span>Branding</span>
            <span>Direction</span>
          </div>
          <div style={{ color: "#C8A96A" }}>AI Creative Developer</div>
        </div>
      </div>
    ),
    size
  );
}
