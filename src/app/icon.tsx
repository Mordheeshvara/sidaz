import { ImageResponse } from 'next/og'
 
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'
 
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'transparent',
        }}
      >
        {/* Perfect Infinity Symbol */}
        <svg
          width="28"
          height="14"
          viewBox="0 0 80 40"
          fill="none"
        >
          <path
            d="M15 20 C15 12, 8 8, 3 12 C-2 16, -2 24, 3 28 C8 32, 15 28, 15 20 L15 20 C15 12, 22 8, 40 20 C58 8, 65 12, 72 20 C79 28, 79 16, 72 12 C65 8, 58 12, 40 20 C22 32, 15 28, 15 20 Z"
            fill="#8b5cf6"
            fillRule="evenodd"
          />
          <path
            d="M15 20 C15 16, 12 14, 9 16 C6 18, 6 22, 9 24 C12 26, 15 24, 15 20 C15 16, 18 14, 40 20 C62 14, 65 16, 68 20 C71 24, 71 20, 68 20 C65 20, 62 26, 40 20 C18 26, 15 24, 15 20 Z"
            fill="rgba(255, 255, 255, 0.3)"
          />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  )
}