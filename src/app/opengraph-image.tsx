import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Avendano Shintaro — AI Creative Developer Portfolio";
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
            "radial-gradient(circle at 30% 30%, rgba(229,229,229,0.16) 0%, transparent 55%), linear-gradient(135deg, #050505 0%, #111111 100%)",
          color: "#F5F5F5",
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
            color: "#E5E5E5",
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: 9999,
              background: "#E5E5E5",
              display: "block",
            }}
          />
          Portfolio · Volume 02
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 36,
              letterSpacing: 8,
              textTransform: "uppercase",
              color: "#C0C0C0",
              marginBottom: 24,
            }}
          >
            Avendano Shintaro
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
            color: "rgba(245,245,245,0.7)",
          }}
        >
          <div style={{ display: "flex", gap: 24 }}>
            <span>AI</span>
            <span>Web</span>
            <span>Branding</span>
            <span>Direction</span>
          </div>
          <div style={{ color: "#E5E5E5" }}>AI Creative Developer</div>
        </div>
      </div>
    ),
    size
  );
}
