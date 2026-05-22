import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#06101f",
          borderRadius: 14,
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            border: "3px solid #22d3ee",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
