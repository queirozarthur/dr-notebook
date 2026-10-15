import { ImageResponse } from "next/og";

// Ícone da tela inicial do iPhone: o mesmo desenho do favicon (icon.svg), em PNG,
// porque o iOS não usa SVG para isso. Rota com extensão pelo mesmo motivo da og.png.
export const dynamic = "force-static";

const LADO = 180;

export const GET = () => {
  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", backgroundColor: "#061430" }}>
        <svg width={LADO} height={LADO} viewBox="0 0 32 32">
          <rect x={6.5} y={7.5} width={19} height={13} rx={2} fill="none" stroke="#9fb0cf" strokeWidth={2} />
          <path
            d="M8.5 14.5H12l1.5-4.5 2 8 1.5-3.5h6"
            fill="none"
            stroke="#4d94ff"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M4 24h24" stroke="#9fb0cf" strokeWidth={2} strokeLinecap="round" />
        </svg>
      </div>
    ),
    { width: LADO, height: LADO },
  );
};
